import { join } from 'node:path';
import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import type { AgentType, TransportMode } from './types.js';
import type { AgentExecutionRequest, AgentExecutionResult } from './agent-adapter.js';

export interface RunRecord {
  id: string;
  agent: AgentType;
  transport: TransportMode;
  cwd: string;
  promptFile: string;
  contextFiles: string[];
  command: string[];
  startedAt: string;
  finishedAt?: string;
  duration?: number;
  exitCode?: number;
  success?: boolean;
  error?: string;
  git?: {
    branch: string;
    commitBefore: string;
    dirtyBefore: boolean;
    commitAfter?: string;
    dirtyAfter?: boolean;
  };
  outputFiles?: string[];
  metadata?: Record<string, unknown>;
}

export class RunTracker {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  private getRunsDir(): string {
    const dir = join(this.projectPath, '.archon', 'runs');
    mkdirSync(dir, { recursive: true });
    return dir;
  }

  private getGitInfo(): { branch: string; commit: string; dirty: boolean } {
    try {
      const branch = execSync('git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown"', {
        encoding: 'utf-8',
        timeout: 3000,
      }).trim();
      const commit = execSync('git rev-parse HEAD 2>/dev/null || echo "unknown"', {
        encoding: 'utf-8',
        timeout: 3000,
      }).trim();
      const dirty = execSync('git status --porcelain 2>/dev/null | wc -l', {
        encoding: 'utf-8',
        timeout: 3000,
      }).trim() !== '0';
      return { branch, commit, dirty };
    } catch {
      return { branch: 'unknown', commit: 'unknown', dirty: false };
    }
  }

  createRunRecord(
    request: AgentExecutionRequest,
    agent: AgentType,
    transport: TransportMode
  ): RunRecord {
    const gitBefore = this.getGitInfo();
    const id = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z-' + agent;
    const runDir = join(this.getRunsDir(), id);
    mkdirSync(runDir, { recursive: true });

    const record: RunRecord = {
      id,
      agent,
      transport,
      cwd: request.cwd,
      promptFile: request.promptFile,
      contextFiles: request.contextFiles,
      command: request.dryRun ? [] : this.buildCommandArray(request, agent),
      startedAt: new Date().toISOString(),
      git: {
        branch: gitBefore.branch,
        commitBefore: gitBefore.commit,
        dirtyBefore: gitBefore.dirty,
      },
    };

    this.saveRunRecord(record);
    return record;
  }

  private buildCommandArray(request: AgentExecutionRequest, agent: AgentType): string[] {
    if (agent === 'opencode') {
      const cmd = ['opencode', 'run', '--title', request.title ?? 'Archon Task', '--dir', request.cwd];
      for (const f of request.contextFiles) cmd.push('--file', f);
      cmd.push('--file', request.promptFile);
      cmd.push('Execute the Archon task described in the attached files.');
      return cmd;
    }
    if (agent === 'claude') {
      const cmd = ['claude'];
      for (const f of request.contextFiles) cmd.push('--file', f);
      cmd.push('--file', request.promptFile);
      cmd.push('Execute the Archon task described in the attached files.');
      return cmd;
    }
    return [agent, 'run'];
  }

  completeRun(record: RunRecord, result: AgentExecutionResult): RunRecord {
    const gitAfter = this.getGitInfo();
    record.finishedAt = new Date().toISOString();
    record.duration = result.duration;
    record.exitCode = result.exitCode;
    record.success = result.success;
    record.error = result.error;
    record.outputFiles = result.outputFiles;
    record.git!.commitAfter = gitAfter.commit;
    record.git!.dirtyAfter = gitAfter.dirty;

    this.saveRunRecord(record);
    this.saveLogs(record.id, result);
    return record;
  }

  private saveRunRecord(record: RunRecord): void {
    const runDir = join(this.getRunsDir(), record.id);
    mkdirSync(runDir, { recursive: true });
    writeFileSync(join(runDir, 'run.json'), JSON.stringify(record, null, 2), 'utf-8');

    const promptSnapshot = record.promptFile && existsSync(record.promptFile)
      ? readFileSync(record.promptFile, 'utf-8')
      : '';
    writeFileSync(join(runDir, 'prompt.md'), promptSnapshot, 'utf-8');

    const contextSnapshot = record.contextFiles
      .filter((f) => existsSync(f))
      .map((f) => `## ${f}\n\n${readFileSync(f, 'utf-8')}`)
      .join('\n\n---\n\n');
    writeFileSync(join(runDir, 'context.md'), contextSnapshot, 'utf-8');

    const commandTxt = record.command.join(' \\\n  ');
    writeFileSync(join(runDir, 'command.txt'), commandTxt, 'utf-8');
  }

  private saveLogs(id: string, result: AgentExecutionResult): void {
    const runDir = join(this.getRunsDir(), id);
    if (result.error) {
      writeFileSync(join(runDir, 'stderr.log'), result.error, 'utf-8');
    }
    writeFileSync(join(runDir, 'exit-code.txt'), String(result.exitCode ?? -1), 'utf-8');
  }

  listRuns(limit = 20): RunRecord[] {
    const runsDir = this.getRunsDir();
    if (!existsSync(runsDir)) return [];

    const dirs = readdirSync(runsDir)
      .filter((d) => d.includes('Z-'))
      .map((d) => ({ name: d, time: statSync(join(runsDir, d)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time)
      .slice(0, limit);

    return dirs
      .map(({ name }) => {
        const runPath = join(runsDir, name, 'run.json');
        if (!existsSync(runPath)) return null;
        try {
          const raw = readFileSync(runPath, 'utf-8');
          return JSON.parse(raw) as RunRecord;
        } catch {
          return null;
        }
      })
      .filter((r): r is RunRecord => r !== null);
  }

  getRun(id: string): RunRecord | null {
    const runPath = join(this.getRunsDir(), id, 'run.json');
    if (!existsSync(runPath)) return null;
    try {
      const raw = readFileSync(runPath, 'utf-8');
      return JSON.parse(raw) as RunRecord;
    } catch {
      return null;
    }
  }

  getLastRun(): RunRecord | null {
    const runs = this.listRuns(1);
    return runs[0] ?? null;
  }

  getRunStats(): { total: number; successful: number; failed: number; avgDuration: number } {
    const runs = this.listRuns(1000);
    if (runs.length === 0) {
      return { total: 0, successful: 0, failed: 0, avgDuration: 0 };
    }

    const successful = runs.filter((r) => r.success).length;
    const failed = runs.filter((r) => !r.success).length;
    const durations = runs.map((r) => r.duration ?? 0).filter((d) => d > 0);
    const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

    return { total: runs.length, successful, failed, avgDuration };
  }

  cleanOldRuns(keepCount = 50): number {
    const runsDir = this.getRunsDir();
    if (!existsSync(runsDir)) return 0;

    const dirs = readdirSync(runsDir)
      .filter((d) => d.includes('Z-'))
      .map((d) => ({ name: d, time: statSync(join(runsDir, d)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    const toRemove = dirs.slice(keepCount);
    let count = 0;

    for (const { name } of toRemove) {
      try {
        const { rmSync } = require('node:fs');
        rmSync(join(runsDir, name), { recursive: true, force: true });
        count++;
      } catch {
        // skip
      }
    }

    return count;
  }
}
