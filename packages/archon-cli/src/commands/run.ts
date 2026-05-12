import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';
import inquirer from 'inquirer';

export class RunCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const agentOpt = opts['agent'] as string | undefined;
    const _phaseArg = this.getArg(args, 'phase');
    const dryRun = opts['dry-run'] === true;
    const confirm = opts['confirm'] === true;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n❌ No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    if (!agentOpt) {
      console.error(chalk.red('\n❌ --agent is required (e.g., --agent opencode)\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const phase = _phaseArg !== undefined ? parseInt(_phaseArg, 10) : state.currentPhase;

    console.log(chalk.cyan(`\n🚀 Agent run configuration:`));
    console.log(chalk.bold(`  Agent: ${agentOpt}`));
    console.log(chalk.bold(`  Phase: ${phase}`));
    console.log(chalk.bold(`  Project: ${state.projectName}`));

    if (dryRun) {
      console.log(chalk.cyan('\n📋 Dry-run mode — would execute:\n'));
      console.log(chalk.bold('  opencode run --file <prompt.md> --project ' + mode.projectPath));
      console.log();
      return;
    }

    if (confirm) {
      const { proceed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Execute agent?',
        default: false,
      }]);
      if (!proceed) {
        console.log(chalk.dim('\nCancelled.\n'));
        return;
      }
    }

    console.log(chalk.yellow('\n⚠️  Full agent execution (archon run) not yet implemented.'));
    console.log(chalk.dim('For now, use `archon prompt` to generate prompts and copy them to your agent.\n'));
    console.log(chalk.dim('Alternative: run `opencode` manually from the project directory.\n'));
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}