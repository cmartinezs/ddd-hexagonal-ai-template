import chalk from 'chalk';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';


export class AgentCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const setOpt = opts['set'] as string | undefined;
    const doctorFlag = opts['doctor'] === true;
    const agentName = opts['agent'] as string | undefined;

    const mode = detectMode();
    const cm = new ConfigManager(mode.mode === 'project' ? mode.projectPath : process.cwd());

    if (setOpt) {
      const validAgents = ['opencode', 'claude', 'cursor', 'gemini', 'manual'];
      if (!validAgents.includes(setOpt)) {
        console.error(chalk.red(`\n❌ Invalid agent: ${setOpt}`));
        console.error(chalk.yellow(`Valid agents: ${validAgents.join(', ')}\n`));
        process.exit(1);
      }
      cm.setAgent(setOpt as 'opencode' | 'claude' | 'cursor' | 'manual');
      console.log(chalk.green(`\n✅ Agent set to ${setOpt}`));
      if (setOpt === 'opencode') {
        console.log(chalk.dim('   Prompts will be formatted for opencode (markdown, copy-paste format)'));
        console.log(chalk.dim('   Run `archon prompt` to generate your first prompt\n'));
      }
      return;
    }

    if (doctorFlag || args.includes('doctor')) {
      const target = agentName ?? cm.getAgent();
      console.log(chalk.cyan(`\n🔍 Running agent diagnostics: ${target}\n`));

      const result = await this.doctorAgent(target);

      console.log(chalk.bold('Agent:') + ` ${target}`);
      console.log(
        chalk.bold('Status:') + ` ${
          result.status === 'available'
            ? chalk.green('available')
            : result.status === 'partial'
            ? chalk.yellow('partial')
            : chalk.red('unavailable')
        }`
      );

      if (result.version) {
        console.log(chalk.bold('Version:') + ` ${result.version}`);
      }

      console.log(chalk.bold('\nCapabilities:'));
      console.log(
        `  supports run: ${result.capabilities.supportsRun ? chalk.green('yes') : chalk.red('no')}`
      );
      console.log(
        `  supports file attachments: ${result.capabilities.supportsFileAttachment ? chalk.green('yes') : chalk.red('no')}`
      );
      console.log(
        `  supports attach: ${result.capabilities.supportsAttach ? chalk.green('yes') : chalk.red('no')}`
      );
      console.log(
        `  supports stdin: ${result.capabilities.supportsStdin ? chalk.green('yes') : chalk.yellow('unknown')}`
      );

      console.log(chalk.bold('\nRecommended transport:') + ` ${chalk.cyan(result.recommendedTransport)}`);

      if (result.diagnostics.length > 0) {
        console.log(chalk.bold('\nDiagnostics:'));
        result.diagnostics.forEach((d: string) => console.log(chalk.dim(`  - ${d}`)));
      }
      console.log();
      return;
    }

    const currentAgent = cm.getAgent();
    console.log(chalk.cyan('\n🤖 Current agent:') + ` ${currentAgent}`);
    console.log(chalk.dim('\nAvailable agents: opencode, claude, cursor, gemini, manual'));
    console.log(chalk.dim('To change: archon agent --set <agent>\n'));
  }

  private async doctorAgent(
    agent: string
  ): Promise<{
    status: 'available' | 'partial' | 'unavailable';
    version?: string;
    capabilities: {
      supportsRun: boolean;
      supportsFileAttachment: boolean;
      supportsAttach: boolean;
      supportsStdin: boolean;
    };
    recommendedTransport: string;
    diagnostics: string[];
  }> {
    const diagnostics: string[] = [];

    if (agent === 'opencode') {
      const { execSync } = await import('node:child_process');
      try {
        const v = execSync('opencode --version 2>/dev/null || echo "unknown"', {
          encoding: 'utf-8',
          timeout: 5000,
        }).trim();
        return {
          status: 'available',
          version: v,
          capabilities: {
            supportsRun: true,
            supportsFileAttachment: true,
            supportsAttach: true,
            supportsStdin: true,
          },
          recommendedTransport: 'file-attachment',
          diagnostics: [],
        };
      } catch {
        diagnostics.push('opencode not found in PATH');
        return {
          status: 'unavailable',
          capabilities: {
            supportsRun: false,
            supportsFileAttachment: false,
            supportsAttach: false,
            supportsStdin: false,
          },
          recommendedTransport: 'none',
          diagnostics,
        };
      }
    }

    if (agent === 'claude') {
      try {
        const { execSync } = await import('node:child_process');
        execSync('claude --version 2>/dev/null || echo "unknown"', {
          encoding: 'utf-8',
          timeout: 5000,
        }).trim();
        return {
          status: 'available',
          capabilities: {
            supportsRun: true,
            supportsFileAttachment: true,
            supportsAttach: false,
            supportsStdin: false,
          },
          recommendedTransport: 'file-attachment',
          diagnostics: [],
        };
      } catch {
        diagnostics.push('claude not found in PATH');
        return {
          status: 'unavailable',
          capabilities: {
            supportsRun: false,
            supportsFileAttachment: false,
            supportsAttach: false,
            supportsStdin: false,
          },
          recommendedTransport: 'none',
          diagnostics,
        };
      }
    }

    return {
      status: 'available',
      capabilities: {
        supportsRun: false,
        supportsFileAttachment: false,
        supportsAttach: false,
        supportsStdin: false,
      },
      recommendedTransport: 'none',
      diagnostics: [`Agent ${agent} diagnostic not yet implemented`],
    };
  }
}