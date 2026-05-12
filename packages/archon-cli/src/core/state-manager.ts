import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  chmodSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import type {
  ArchonState,
  PhaseStatusEntry,
  Warning,
  AgentType,
  TemplateVersion,
} from './types.js';
import { getStateFilePath, getChecksumFilePath } from './mode-detector.js';

const DEFAULT_ARCHON_VERSION = '0.1.0';

export class StateManager {
  private state: ArchonState | null = null;
  private projectPath: string;

  constructor(projectPath?: string) {
    this.projectPath = projectPath || process.cwd();
  }

  load(): ArchonState {
    if (this.state) return this.state;

    const statePath = getStateFilePath(this.projectPath);
    const checksumPath = getChecksumFilePath(this.projectPath);

    if (!existsSync(statePath)) {
      throw new Error('State file not found at ' + statePath + '. Run `archon init` first.');
    }

    const rawState = readFileSync(statePath, 'utf-8');
    const parsed = JSON.parse(rawState) as ArchonState;
    this.state = parsed;

    if (existsSync(checksumPath)) {
      const storedChecksum = readFileSync(checksumPath, 'utf-8').trim();
      const computedChecksum = this.computeChecksum(rawState);

      if (storedChecksum !== computedChecksum) {
        const warning: Warning = {
          id: 'checksum-mismatch',
          message: 'State was modified externally. Run `archon doctor` to validate.',
          timestamp: new Date().toISOString(),
          severity: 'warn',
        };
        this.state = { ...this.state, warnings: [...this.state.warnings, warning] };
        console.warn('  State integrity check failed. ' + warning.message);
      }
    }

    return this.state;
  }

  exists(): boolean {
    return existsSync(getStateFilePath(this.projectPath));
  }

  create(opts: {
    projectName: string;
    projectSlug: string;
    agent: AgentType;
    templateVersion?: TemplateVersion;
  }): ArchonState {
    const archonDir = resolve(this.projectPath, '.archon');
    mkdirSync(archonDir, { recursive: true });

    const now = new Date().toISOString();

    this.state = {
      projectName: opts.projectName,
      projectSlug: opts.projectSlug,
      createdAt: now,
      updatedAt: now,
      archonVersion: DEFAULT_ARCHON_VERSION,
      agent: opts.agent,
      mode: 'project',
      currentPhase: 0,
      phases: {},
      warnings: [],
      checksum: '',
    };

    this.save();
    return this.state;
  }

  save(): void {
    if (!this.state) {
      throw new Error('No state loaded. Call load() or create() first.');
    }

    this.state.updatedAt = new Date().toISOString();
    const statePath = getStateFilePath(this.projectPath);
    const checksumPath = getChecksumFilePath(this.projectPath);

    const rawState = JSON.stringify(this.state, null, 2);
    const checksum = this.computeChecksum(rawState);

    const stateToSave: ArchonState = { ...this.state, checksum };
    writeFileSync(statePath, JSON.stringify(stateToSave, null, 2), 'utf-8');
    chmodSync(statePath, 0o644);

    writeFileSync(checksumPath, checksum, 'utf-8');
    chmodSync(checksumPath, 0o644);
  }

  updatePhase(phaseIndex: number, status: PhaseStatusEntry): void {
    const state = this.load();
    const phaseKey = 'phase-' + String(phaseIndex).padStart(2, '0');
    state.phases[phaseKey] = status;
    if (status.status === 'in_progress' && state.currentPhase < phaseIndex) {
      state.currentPhase = phaseIndex;
    }
    this.save();
  }

  setCurrentPhase(phaseIndex: number): void {
    const state = this.load();
    state.currentPhase = phaseIndex;
    this.save();
  }

  addWarning(warning: Omit<Warning, 'id' | 'timestamp'>): void {
    const state = this.load();
    state.warnings.push({
      id: 'warn-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...warning,
    });
    this.save();
  }

  clearWarnings(): void {
    const state = this.load();
    state.warnings = [];
    this.save();
  }

  getProjectName(): string {
    return this.load().projectName;
  }

  getProjectSlug(): string {
    return this.load().projectSlug;
  }

  getAgent(): AgentType {
    return this.load().agent;
  }

  getCurrentPhase(): number {
    return this.load().currentPhase;
  }

  validate(): boolean {
    const statePath = getStateFilePath(this.projectPath);
    const checksumPath = getChecksumFilePath(this.projectPath);

    if (!existsSync(statePath) || !existsSync(checksumPath)) {
      return false;
    }

    try {
      const rawState = readFileSync(statePath, 'utf-8');
      const storedChecksum = readFileSync(checksumPath, 'utf-8').trim();
      const computedChecksum = this.computeChecksum(rawState);
      return storedChecksum === computedChecksum;
    } catch {
      return false;
    }
  }

  recalculateChecksum(): void {
    const statePath = getStateFilePath(this.projectPath);
    const checksumPath = getChecksumFilePath(this.projectPath);

    const rawState = readFileSync(statePath, 'utf-8');
    const checksum = this.computeChecksum(rawState);

    writeFileSync(checksumPath, checksum, 'utf-8');
    chmodSync(checksumPath, 0o644);
  }

  private computeChecksum(content: string): string {
    return createHash('sha256').update(content).digest('hex');
  }
}

export async function promptForMissing(
  params: {
    projectName?: string;
    agent?: AgentType;
  },
  defaults?: Record<string, string | boolean | number>
): Promise<{
  projectName: string;
  agent: AgentType;
}> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const results: Record<string, string> = {};

  if (!params.projectName) {
    const prompt = 'Project name: ' + (defaults?.projectName ? '[' + defaults.projectName + '] ' : '');
    results.projectName = await rl.question(prompt);
    if (!results.projectName.trim() && defaults?.projectName) {
      results.projectName = String(defaults.projectName);
    }
  } else {
    results.projectName = params.projectName;
  }

  if (!params.agent) {
    const agentInput = await rl.question(
      'Agent (opencode/claude/cursor/manual): ' + (defaults?.agent ? '[' + defaults.agent + '] ' : '')
    );
    results.agent = agentInput.trim() || String(defaults?.agent || 'manual');
  } else {
    results.agent = params.agent;
  }

  rl.close();

  return {
    projectName: results.projectName,
    agent: results.agent as AgentType,
  };
}