import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { StateManager } from '../core/state-manager.js';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { aiPromptBuilder } from '../core/ai-prompt-builder.js';
import { contextScanner } from '../core/context-scanner.js';
import { RunTracker } from '../core/run-tracker.js';
import { AgentAdapterFactory, type AgentExecutionRequest } from '../core/agent-adapter.js';
import { FirstInteractive } from '../core/interactive-engine.js';
import { phaseEngine } from '../core/phase-engine.js';
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

    const agent = answers['agent'] as AgentType;
    const phase = answers['phase'] as number;

    if (!['opencode', 'claude', 'cursor', 'gemini', 'manual'].includes(agent)) {
      console.error(chalk.red('\n  Invalid agent: ' + agent + '\n'));
      process.exit(1);
    }

    if (agent === 'manual') {
      console.error(chalk.yellow('\n  Agent "manual" does not support execution. Use `archon prompt` instead.\n'));
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

    console.log(chalk.green('  ✅ Context saved'));
    console.log(chalk.green('  ✅ Prompt generated'));
    console.log();

    const request: AgentExecutionRequest = {
      cwd: mode.projectPath!,
      promptFile: promptResult.filePath,
      contextFiles: [contextPath, mapPath].filter((f) => existsSync(f)),
      title: '[' + state.projectName + '] Phase ' + phase + ': ' + phaseEngine.getPhase(phase).name,
      transport,
      attachUrl: attachUrl ?? undefined,
      dryRun,
    };

    const runTracker = new RunTracker(mode.projectPath!);

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
      console.log(chalk.bold('  Agent:     ') + agent);
      console.log(chalk.bold('  Transport: ') + transport);
      console.log(chalk.bold('  Phase:     ') + phase);
      console.log(chalk.bold('  Prompt:    ') + promptResult.filePath);
      console.log(chalk.bold('  Context:   ') + request.contextFiles.join(', '));
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

    const record = runTracker.createRunRecord(request, agent, transport);

    console.log(chalk.cyan('  🚀 Executing ' + adapter.displayName + '...\n'));

    const result = await adapter.execute(request);
    const completed = runTracker.completeRun(record, result);

    console.log();

    if (result.success) {
      console.log(chalk.green('  ✅ Run complete (' + (result.duration ? (result.duration / 1000).toFixed(1) + 's' : 'no timing') + ')'));
      console.log(chalk.dim('     Run ID: ' + completed.id));
    } else {
      console.error(chalk.red('  ❌ Run failed' + (result.error ? ': ' + result.error : '')));
      console.error(chalk.dim('     Run ID: ' + completed.id));
    }
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
