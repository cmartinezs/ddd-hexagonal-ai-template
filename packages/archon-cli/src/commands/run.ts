import chalk from 'chalk';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

import { StateManager } from '../core/state-manager.js';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { aiPromptBuilder } from '../core/ai-prompt-builder.js';
import { contextScanner } from '../core/context-scanner.js';
import { RunTracker } from '../core/run-tracker.js';
import { AgentAdapterFactory, type AgentExecutionRequest } from '../core/agent-adapter.js';
import { FirstInteractive } from '../core/interactive-engine.js';
import { phaseEngine } from '../core/phase-engine.js';
import { tokenTracker, DEFAULT_THRESHOLDS } from '../core/token-tracker.js';
import type { AgentType, TransportMode } from '../core/types.js';
import inquirer from 'inquirer';

export class RunCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const agentOpt = this.getArg(args, 'agent') ?? (opts['agent'] as string | undefined);
    const phaseArg = this.getArg(args, 'phase') ?? (opts['phase'] as string | undefined);
    const dryRun = opts['dry-run'] === true || opts['dryRun'] === true;
    const confirm = opts['confirm'] === true;
    const attachUrl = (opts['attach'] as string | undefined) ?? this.getArg(args, 'attach');
    const transportOpt = (opts['transport'] as string | undefined) ?? this.getArg(args, 'transport');

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const cm = new ConfigManager(mode.projectPath!);
    const fi = new FirstInteractive(mode.projectPath!);

    const answers = await fi.collect(
      [
        {
          key: 'agent',
          label: 'Select AI agent:',
          type: 'select',
          options: ['opencode', 'claude', 'cursor', 'gemini', 'manual'],
          default: agentOpt ?? cm.getAgent(),
        },
        {
          key: 'phase',
          label: 'Phase number (0-11):',
          type: 'number',
          default: phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase,
          validate: (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 11) || 'Must be 0-11',
        },
      ],
      { agent: agentOpt, phase: phaseArg }
    );

    const agent = (attachUrl && !agentOpt) ? 'opencode' : (answers['agent'] as AgentType);
    const phase = answers['phase'] as number;

    if (!['opencode', 'claude', 'cursor', 'gemini', 'manual'].includes(agent)) {
      console.error(chalk.red('\n  Invalid agent: ' + agent + '\n'));
      process.exit(1);
    }

    if (agent === 'manual') {
      console.error(chalk.yellow('\n  Agent "manual" does not support execution. Use `archon prompt` instead.\n'));
      process.exit(1);
    }

    if (agent !== 'opencode' && attachUrl) {
      console.error(chalk.red('\n  Only opencode supports --attach (persistent server).\n'));
      process.exit(1);
    }

    const adapter = AgentAdapterFactory.get(agent);
    if (!adapter) {
      console.error(chalk.red('\n  No adapter found for agent: ' + agent + '\n'));
      process.exit(1);
    }

    const transport: TransportMode = (transportOpt as TransportMode) ?? cm.getTransport();

    console.log(chalk.cyan('\n  Configuration:'));
    console.log('    Agent:     ' + agent);
    console.log('    Phase:     ' + phase + ' — ' + phaseEngine.getPhase(phase).name);
    console.log('    Transport: ' + transport);
    console.log('    Project:   ' + state.projectName);
    console.log();

    contextScanner.saveContext(mode.projectPath!, state);
    const contextPath = join(mode.projectPath!, '.archon', 'context', 'project-context.md');
    const mapPath = join(mode.projectPath!, '.archon', 'context', 'project-map.json');

    const promptResult = aiPromptBuilder.build({
      phase,
      context: 'full',
      projectPath: mode.projectPath!,
      state,
      agent,
      transport,
    });

    const { writeFileSync, mkdirSync } = await import('node:fs');
    mkdirSync(join(mode.projectPath!, '.archon', 'prompts'), { recursive: true });
    writeFileSync(promptResult.filePath, promptResult.content, 'utf-8');

    const metaPath = promptResult.filePath.replace('.md', '.json');
    writeFileSync(metaPath, JSON.stringify(promptResult.metadata, null, 2), 'utf-8');

    const archonSessionId = 'archon-' + new Date().toISOString().replace(/[:.]/g, '-') + '-' + randomUUID().slice(0, 8);

    const request: AgentExecutionRequest = {
      cwd: mode.projectPath!,
      promptFile: promptResult.filePath,
      contextFiles: [contextPath, mapPath].filter((f) => existsSync(f)),
      title: '[' + state.projectName + '] Phase ' + phase + ': ' + phaseEngine.getPhase(phase).name,
      transport,
      attachUrl: attachUrl ?? undefined,
      dryRun,
      archonSessionId,
    };

    console.log(chalk.green('  ✅ Context saved'));
    console.log(chalk.green('  ✅ Prompt generated'));
    console.log();

    const doctorResult = await adapter.doctor();

    console.log(chalk.cyan('  Files:'));
    for (const f of request.contextFiles) {
      let size = 0;
      try { size = statSync(f).size; } catch { /* ok */ }
      const rel = f.replace(mode.projectPath! + '/', './');
      console.log('    ' + rel + ' ' + chalk.dim('(' + this.formatBytes(size) + ')'));
    }
    let promptSize = 0;
    try { promptSize = statSync(promptResult.filePath).size; } catch { /* ok */ }
    console.log('    ' + promptResult.filePath.replace(mode.projectPath! + '/', './') + ' ' + chalk.dim('(' + this.formatBytes(promptSize) + ')'));

    console.log();
    console.log(chalk.cyan('  Agent:'));
    console.log('    Status:     ' + (doctorResult.status === 'available' ? chalk.green('available') : chalk.red(doctorResult.status)));
    if (doctorResult.version) console.log('    Version:    ' + doctorResult.version);
    if (doctorResult.capabilities.supportsRun)     console.log('    Transport:  ' + chalk.green(transport));
    if (doctorResult.model) console.log('    Model:      ' + doctorResult.model);
    console.log('    File-attach: ' + (doctorResult.capabilities.supportsFileAttachment ? chalk.green('yes') : chalk.dim('no')));
    console.log('    Attach:     ' + (doctorResult.capabilities.supportsAttach ? chalk.green('yes') : chalk.dim('no')));

    if (doctorResult.diagnostics.length > 0) {
      console.log();
      console.log(chalk.dim('    Diagnostics:'));
      for (const d of doctorResult.diagnostics) {
        console.log(chalk.dim('      - ' + d));
      }
    }

if (agent === 'opencode') {
      const sessionTokens = tokenTracker.getCurrentSessionTokens();
      const perModel = tokenTracker.getPerModelStats();
      const m = perModel[0];
      const contextWindow = tokenTracker.getContextWindow(m?.modelId ?? 'minimax-m2.5-free');

      if (sessionTokens) {
        console.log();
        console.log(chalk.cyan('  Session Tokens:'));
        console.log('    Model:     ' + 'minimax-m2.5-free' + ' (' + tokenTracker.fmtTokens(contextWindow) + ' context window)');
        console.log('    Context:   [' + tokenTracker.buildTokenBar(sessionTokens.percentage) + '] ' + sessionTokens.percentage + '% — ' + tokenTracker.fmtTokens(sessionTokens.totalTokens) + ' / ' + tokenTracker.fmtTokens(contextWindow) + ' (current session)');
        console.log('    Input:     ' + tokenTracker.fmtTokens(sessionTokens.inputTokens));
        console.log('    Output:    ' + tokenTracker.fmtTokens(sessionTokens.outputTokens));
        console.log('    Cache R:   ' + tokenTracker.fmtTokens(sessionTokens.cacheRead));
        console.log('    Cache W:   ' + tokenTracker.fmtTokens(sessionTokens.cacheWrite));

        const threshold = cm.getDefault('tokens.warn') as number ?? DEFAULT_THRESHOLDS.warn;
        const critical = cm.getDefault('tokens.critical') as number ?? DEFAULT_THRESHOLDS.critical;
        const check = tokenTracker.checkThresholds({
          percentage: sessionTokens.percentage,
          totalTokens: sessionTokens.totalTokens,
          modelContextWindow: sessionTokens.contextWindow,
          inputTokens: sessionTokens.inputTokens,
          outputTokens: sessionTokens.outputTokens,
          cacheRead: sessionTokens.cacheRead,
          cacheWrite: sessionTokens.cacheWrite,
          messages: 0,
          sessions: 0,
          modelId: 'minimax-m2.5-free',
        }, { warn: threshold, critical });

        if (check.severity === 'critical') {
          console.log();
          console.log('  ' + chalk.red('⚠ ' + check.message));
          console.log(chalk.dim('    Attempting session compaction...\n'));
          const result = await tokenTracker.compactSession();
          if (!result.success) {
            console.log(chalk.yellow('    Compaction failed: ' + result.message + '\n'));
          } else {
            const newTokens = tokenTracker.getCurrentSessionTokens();
            if (newTokens) {
              console.log('    After compact: [' + tokenTracker.buildTokenBar(newTokens.percentage) + '] ' + newTokens.percentage + '%\n');
            }
          }
        } else if (check.severity === 'warn') {
          console.log();
          console.log('  ' + chalk.yellow('⚠ ' + check.message));
          console.log();
        }
      } else if (m) {
        console.log();
        console.log(chalk.cyan('  Session Tokens:'));
        console.log('    Model:     ' + m.modelId + ' (' + tokenTracker.fmtTokens(contextWindow) + ' context window)');
        const pct = Math.min(100, Math.round((m.totalTokens / contextWindow) * 100));
        console.log('    Project:   [' + tokenTracker.buildTokenBar(pct) + '] ' + pct + '% — ' + tokenTracker.fmtTokens(m.totalTokens) + ' / ' + tokenTracker.fmtTokens(contextWindow) + ' (project accumulated)');
        console.log('    Input:     ' + tokenTracker.fmtTokens(m.inputTokens));
        console.log('    Output:    ' + tokenTracker.fmtTokens(m.outputTokens));
      }
    }
    console.log();

    if (dryRun) {
      const cmd = adapter.buildCommand(request);
      const normalizedCwd = request.cwd.replace(/\/$/, '');
      const prefix = normalizedCwd + '/';
      const rel = (p: string) => {
        if (!p.startsWith(prefix)) return p;
        let r = p.slice(prefix.length);
        if (r.startsWith('./')) r = r.slice(2);
        return r;
      };

      console.log(chalk.cyan('  📋 Dry-run — command that would be executed:\n'));

      const lines: string[] = [cmd[0]!];
      let lastFlag = '';

      for (let i = 1; i < cmd.length; i++) {
        const arg = cmd[i]!;
        if (arg.startsWith('--')) {
          lines.push('    ' + arg);
          lastFlag = arg;
        } else {
          const value = lastFlag === '--dir' ? '.' : rel(arg);
          lines[lines.length - 1] += ' ' + value;
          lastFlag = '';
        }
      }

      console.log('  ' + lines[0] + ' \\');
      for (let i = 1; i < lines.length; i++) {
        console.log(lines[i] + (i < lines.length - 1 ? ' \\' : ''));
      }
      console.log();
      return;
    }

    if (confirm) {
      const cmd = adapter.buildCommand(request);
      console.log(chalk.yellow('  ⚠️  Review before execution:\n'));
      console.log(chalk.bold('  Agent:          ') + agent);
      console.log(chalk.bold('  Session ID:    ') + archonSessionId);
      console.log(chalk.bold('  Transport:     ') + transport);
      console.log(chalk.bold('  Phase:         ') + phase);
      console.log(chalk.bold('  Prompt:        ') + promptResult.filePath);
      console.log(chalk.bold('  Context:       ') + request.contextFiles.join(', '));
      console.log(chalk.bold('\n  Command:'));
      console.log('  ' + cmd.join(' \\\n    '));

      const { proceed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Execute?',
        default: false,
      }]);
      if (!proceed) {
        console.log(chalk.dim('\n  Cancelled.\n'));
        return;
      }
    }

    const runTracker = new RunTracker(mode.projectPath!);
    const beforeSnapshot = agent === 'opencode' ? tokenTracker.snapshot() : null;

    const record = runTracker.createRunRecord(request, agent, transport);

    console.log(chalk.cyan('  🚀 Executing ' + adapter.displayName + ' (session: ' + archonSessionId + ')\n'));

    const result = await adapter.execute(request);

    let tokenUsage: ReturnType<typeof runTracker.createRunRecord>['tokenUsage'] | undefined;
    if (agent === 'opencode' && beforeSnapshot) {
      const afterSnapshot = tokenTracker.snapshot();
      if (afterSnapshot) {
        const delta = tokenTracker.computeDelta(beforeSnapshot, afterSnapshot);
        const perModel = tokenTracker.getPerModelStats();
        const m = perModel[0];
        const contextWindow = tokenTracker.getContextWindow(m?.modelId ?? 'minimax-m2.5-free');
        tokenUsage = {
          inputTokens: delta.inputTokens,
          outputTokens: delta.outputTokens,
          totalTokens: delta.totalTokens,
          cacheRead: delta.cacheRead,
          cacheWrite: delta.cacheWrite,
          deltaTokens: delta.deltaTokens,
          projectTotalTokens: m?.totalTokens ?? 0,
          contextWindow,
          percentage: Math.min(100, Math.round((delta.totalTokens / contextWindow) * 100)),
          source: delta.source,
          snapshotBefore: beforeSnapshot.timestamp,
          snapshotAfter: afterSnapshot.timestamp,
        };
      }
    }

    const completed = runTracker.completeRun(record, result, tokenUsage);

    console.log();

    if (result.success) {
console.log(chalk.green('  ✅ Run complete (' + (result.duration ? (result.duration / 1000).toFixed(1) + 's' : 'no timing') + ')'));
      console.log(chalk.dim('     Run ID:   ' + completed.id));
      if (tokenUsage) {
        const afterTokens = tokenTracker.getCurrentSessionTokens();
        if (afterTokens) {
          console.log(chalk.cyan('     Session: [' + tokenTracker.buildTokenBar(afterTokens.percentage) + '] ') +
            tokenTracker.fmtTokens(afterTokens.totalTokens) + ' / ' + tokenTracker.fmtTokens(afterTokens.contextWindow) +
            ' — ' + afterTokens.percentage + '% (current context)');
          console.log(chalk.dim('     Delta:   +' + tokenTracker.fmtTokens(tokenUsage.totalTokens) + ' tokens this run'));
        } else {
          console.log(chalk.cyan('     Delta:   +' + tokenTracker.fmtTokens(tokenUsage.totalTokens) + ' tokens (source: ' + tokenUsage.source + ')'));
        }
      }
    } else {
      console.error(chalk.red('  ❌ Run failed' + (result.error ? ': ' + result.error : '')));
      console.error(chalk.dim('     Run ID:   ' + completed.id));
      if (tokenUsage) {
        const afterTokens = tokenTracker.getCurrentSessionTokens();
        if (afterTokens) {
          console.error(chalk.cyan('     Session: [' + tokenTracker.buildTokenBar(afterTokens.percentage) + '] ') +
            tokenTracker.fmtTokens(afterTokens.totalTokens) + ' / ' + tokenTracker.fmtTokens(afterTokens.contextWindow) +
            ' — ' + afterTokens.percentage + '% (current context)');
        }
        console.error(chalk.dim('     Delta:   +' + tokenTracker.fmtTokens(tokenUsage.totalTokens) + ' tokens this run'));
      }
    }
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]!;
  }
}
