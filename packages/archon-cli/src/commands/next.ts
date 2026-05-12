import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';

const PHASES = [
  'Documentation Planning',
  'Discovery',
  'Requirements',
  'Design',
  'Data Model',
  'Planning',
  'Development',
  'Testing',
  'Deployment',
  'Operations',
  'Monitoring',
  'Feedback',
];

export class NextCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const confirm = opts['confirm'] === true;
    const phaseArg = this.getArg(args, 'phase');

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n❌ No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const targetPhase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase + 1;

    if (targetPhase < 0 || targetPhase > 11) {
      console.error(chalk.red(`\n❌ Invalid phase: ${targetPhase}. Must be 0-11.\n`));
      process.exit(1);
    }

    console.log(chalk.cyan(`\n📦 Moving from Phase ${state.currentPhase} → ${targetPhase}`));
    console.log(chalk.bold(`  ${PHASES[targetPhase] || `Phase ${targetPhase}`}`));

    if (targetPhase > state.currentPhase) {
      const currentPhaseData = state.phases[`phase-${String(state.currentPhase).padStart(2, '0')}`];
      if (currentPhaseData?.status !== 'complete') {
        console.log(chalk.yellow(`\n⚠️  Current phase (${state.currentPhase}) is not marked complete.`));
      }
    }

    if (!confirm) {
      const inquirer = (await import('inquirer')).default;
      const { proceed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: `Advance to Phase ${targetPhase}?`,
        default: true,
      }]);
      if (!proceed) {
        console.log(chalk.dim('\nCancelled.\n'));
        return;
      }
    }

    sm.updatePhase(targetPhase, {
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      files: [],
    });

    console.log(chalk.green(`\n✅ Now at Phase ${targetPhase}: ${PHASES[targetPhase] || `Phase ${targetPhase}`}`));
    console.log(chalk.dim(`\n  Run \`archon prompt --phase ${targetPhase}\` or \`archon guide --phase ${targetPhase}\`\n`));
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}