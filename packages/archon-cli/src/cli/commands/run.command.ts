import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { ConfigManager } from '../../core/config-manager.js';
import { StateManager } from '../../core/state-manager.js';
import { AGENT_TIERS } from '../../core/agent-adapter.js';
import { FirstInteractive } from '../../core/interactive-engine.js';
import { phaseEngine } from '../../core/phase-engine.js';
import { tokenTracker, DEFAULT_THRESHOLDS } from '../../core/token-tracker.js';
import { GeneratePromptUseCase } from '../../application/generate-prompt.usecase.js';
import { RunAgentUseCase } from '../../application/run-agent.usecase.js';
import type { AgentType, TransportMode } from '../../core/types.js';
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

    const agentTier = AGENT_TIERS[agent] ?? 'planned';
    if (agentTier === 'planned') {
      console.error(chalk.red('\n  Agent "' + agent + '" is not yet supported.'));
      console.error(chalk.yellow('  Supported agents: opencode, claude'));
      process.exit(1);
    }

    if (agent !== 'opencode' && attachUrl) {
      console.error(chalk.red('\n  Only opencode supports --attach (persistent server).\n'));
      process.exit(1);
    }

    const transport: TransportMode = (transportOpt as TransportMode) ?? cm.getTransport();

    console.log(chalk.cyan('\n  Configuration:'));
    console.log('    Agent:     ' + agent);
    console.log('    Phase:     ' + phase + ' — ' + phaseEngine.getPhase(phase).name);
    console.log('    Transport: ' + transport);
    console.log('    Project:   ' + state.projectName);
    console.log();

    const generateUc = new GeneratePromptUseCase();
    const promptOutput = await generateUc.execute({
      projectPath: mode.projectPath!,
      phase,
      agent,
      transport,
      injectGuides: !attachUrl,
    });

    console.log(chalk.green('  ✅ Context saved'));
    console.log(chalk.green('  ✅ Prompt generated'));
    console.log();

    const runUc = new RunAgentUseCase();

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

    const contextFiles = [promptOutput.contextPath, promptOutput.mapPath];
    const fileSizes = runUc.getFileSizes([...contextFiles, promptOutput.promptFilePath]);

    console.log(chalk.cyan('  Files:'));
    for (const f of contextFiles) {
      const size = fileSizes.get(f) ?? 0;
      const rel = f.replace(mode.projectPath! + '/', './');
      console.log('    ' + rel + ' ' + chalk.dim('(' + this.formatBytes(size) + ')'));
    }
    const promptSize = fileSizes.get(promptOutput.promptFilePath) ?? 0;
    console.log('    ' + promptOutput.promptFilePath.replace(mode.projectPath! + '/', './') + ' ' + chalk.dim('(' + this.formatBytes(promptSize) + ')'));
    console.log();

    const runInput = {
      projectPath: mode.projectPath!,
      agent,
      phase,
      transport,
      promptFilePath: promptOutput.promptFilePath,
      contextFiles,
      title: promptOutput.title,
      archonSessionId: promptOutput.archonSessionId,
      attachUrl: attachUrl ?? undefined,
      dryRun,
    };

    if (dryRun) {
      const dryResult = await runUc.execute(runInput);
      const d = dryResult.doctor;
      if (d) {
        console.log(chalk.cyan('  Agent:'));
        console.log('    Status:     ' + (d.status === 'available' ? chalk.green('available') : chalk.red(d.status)));
        if (d.version) console.log('    Version:    ' + d.version);
        if (d.model) console.log('    Model:      ' + d.model);
      }

      if (dryResult.dryRunCommand) {
        const cmd = dryResult.dryRunCommand;
        const normalizedCwd = mode.projectPath!.replace(/\/$/, '');
        const prefix = normalizedCwd + '/';
        const rel = (p: string) => {
          if (!p.startsWith(prefix)) return p;
          let r = p.slice(prefix.length);
          if (r.startsWith('./')) r = r.slice(2);
          return r;
        };

        console.log(chalk.cyan('\n  📋 Dry-run — command that would be executed:\n'));
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
      }
      return;
    }

    if (confirm) {
      console.log(chalk.yellow('  ⚠️  Review before execution:\n'));
      console.log(chalk.bold('  Agent:         ') + agent);
      console.log(chalk.bold('  Session ID:    ') + promptOutput.archonSessionId);
      console.log(chalk.bold('  Transport:     ') + transport);
      console.log(chalk.bold('  Phase:         ') + phase);
      console.log(chalk.bold('  Prompt:        ') + promptOutput.promptFilePath);

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

    console.log(chalk.cyan('  🚀 Executing ' + agent + ' (session: ' + promptOutput.archonSessionId + ')\n'));

    const result = await runUc.execute(runInput);

    console.log();
    if (result.success) {
      console.log(chalk.green('  ✅ Run complete (' + (result.duration ? (result.duration / 1000).toFixed(1) + 's' : 'no timing') + ')'));
      console.log(chalk.dim('     Run ID:   ' + result.runId));
      if (result.tokenUsage && result.sessionTokensAfter) {
        const after = result.sessionTokensAfter;
        console.log(chalk.cyan('     Session: [' + tokenTracker.buildTokenBar(after.percentage) + '] ') +
          tokenTracker.fmtTokens(after.totalTokens) + ' / ' + tokenTracker.fmtTokens(after.contextWindow) +
          ' — ' + after.percentage + '% (current context)');
        console.log(chalk.dim('     Delta:   +' + tokenTracker.fmtTokens(result.tokenUsage.totalTokens) + ' tokens this run'));
      }
    } else {
      console.error(chalk.red('  ❌ Run failed' + (result.error ? ': ' + result.error : '')));
      console.error(chalk.dim('     Run ID:   ' + result.runId));
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
