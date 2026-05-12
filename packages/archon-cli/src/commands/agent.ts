import chalk from 'chalk';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { AgentAdapterFactory } from '../core/agent-adapter.js';
import type { AgentType } from '../core/types.js';

export class AgentCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const setOpt = opts['set'] as string | undefined;
    const doctorFlag = opts['doctor'] === true;
    const agentName = (opts['agent'] as string | undefined) ?? this.getArg(args, 'agent');
    const lsFlag = args.includes('ls');

    const mode = detectMode();
    const projectPath = mode.mode === 'project' ? mode.projectPath! : process.cwd();
    const cm = new ConfigManager(projectPath);

    if (setOpt) {
      const validAgents: AgentType[] = ['opencode', 'claude', 'cursor', 'gemini', 'manual'];
      if (!validAgents.includes(setOpt as AgentType)) {
        console.error(chalk.red('\n  Invalid agent: ' + setOpt));
        console.error(chalk.yellow('  Valid agents: ' + validAgents.join(', ') + '\n'));
        process.exit(1);
      }
      cm.setAgent(setOpt as AgentType);
      console.log(chalk.green('\n  Agent set to ' + setOpt));
      if (setOpt === 'opencode') {
        console.log(chalk.dim('  Prompts will be formatted for opencode (file-attachment format)'));
        console.log(chalk.dim('  Run `archon prompt` to generate your first prompt\n'));
      } else if (setOpt === 'manual') {
        console.log(chalk.dim('  Manual mode: `archon prompt` will generate prompts but not execute agents\n'));
      } else {
        console.log(chalk.dim('  Run `archon agent --doctor --agent ' + setOpt + '` to test the connection\n'));
      }
      return;
    }

    if (doctorFlag || args.includes('doctor')) {
      const target = (agentName ?? cm.getAgent()) as string;
      await this.runDoctor(target, cm);
      return;
    }

    if (lsFlag || args.includes('list')) {
      await this.listAgents();
      return;
    }

    const currentAgent = cm.getAgent();
    const currentTransport = cm.getTransport();
    console.log(chalk.cyan('\n  Current agent: ') + currentAgent);
    console.log(chalk.cyan('  Transport:     ') + currentTransport);
    console.log(chalk.dim('\n  Available agents: opencode, claude, cursor, gemini, manual'));
    console.log(chalk.dim('  To change: archon agent --set <agent>'));
    console.log(chalk.dim('  To test:   archon agent --doctor [--agent <name>]\n'));
  }

  private async runDoctor(target: string, cm: ConfigManager): Promise<void> {
    console.log(chalk.cyan('\n  Running diagnostics: ' + target + '\n'));

    const adapter = AgentAdapterFactory.get(target);
    if (!adapter) {
      console.error(chalk.red('  Unknown agent: ' + target + '\n'));
      const available = AgentAdapterFactory.list().map((a) => a.id).join(', ');
      console.log(chalk.yellow('  Available: ' + available + '\n'));
      process.exit(1);
    }

    const result = await adapter.doctor();

    console.log(chalk.bold('Agent:   ') + adapter.displayName);
    console.log(
      chalk.bold('Status:  ') + (result.status === 'available'
        ? chalk.green('available')
        : result.status === 'partial'
        ? chalk.yellow('partial')
        : chalk.red('unavailable'))
    );

    if (result.version) {
      console.log(chalk.bold('Version: ') + result.version);
    }

    console.log(chalk.bold('\nCapabilities:'));
    console.log(
      '  supports run:              ' +
      (result.capabilities.supportsRun ? chalk.green('yes') : chalk.red('no'))
    );
    console.log(
      '  supports file attachments: ' +
      (result.capabilities.supportsFileAttachment ? chalk.green('yes') : chalk.red('no'))
    );
    console.log(
      '  supports attach (server):   ' +
      (result.capabilities.supportsAttach ? chalk.green('yes') : chalk.red('no'))
    );
    console.log(
      '  supports stdin prompt:     ' +
      (result.capabilities.supportsStdinPrompt ? chalk.green('yes') : chalk.yellow('unknown'))
    );

    console.log(chalk.bold('\nRecommended transport: ') + chalk.cyan(result.recommendedTransport));

    if (result.diagnostics.length > 0) {
      console.log(chalk.bold('\nDiagnostics:'));
      for (const d of result.diagnostics) {
        console.log(chalk.dim('  - ' + d));
      }
    }

    if (result.status === 'available' && result.recommendedTransport === 'file-attachment') {
      console.log(chalk.dim('\n  For persistent server mode:'));
      console.log(chalk.dim('    1. Start server: opencode serve'));
      console.log(chalk.dim('    2. Then run: archon run --agent ' + target + ' --phase <N> --attach http://localhost:4096'));
    }

    console.log();

    cm.markDoctorChecked();
  }

  private async listAgents(): Promise<void> {
    const results = await AgentAdapterFactory.detectAll();

    console.log(chalk.cyan('\n  Available agents:\n'));
    for (const { id, detection } of results) {
      const mark = detection.available ? chalk.green('✅') : chalk.red('❌');
      const version = detection.version ? ' (' + detection.version + ')' : '';
      console.log('  ' + mark + ' ' + id + version);
      if (detection.error) {
        console.log(chalk.dim('     ' + detection.error));
      }
    }
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
