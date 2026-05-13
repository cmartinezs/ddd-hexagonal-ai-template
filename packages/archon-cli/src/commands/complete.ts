import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { phaseEngine } from '../core/phase-engine.js';

export class CompleteCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;
    const phaseArg = this.getArg(args, 'phase');
    const force = opts['force'] === true;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();

    const targetPhase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase;

    if (targetPhase < 0 || targetPhase > 11) {
      console.error(chalk.red(`\n  Invalid phase: ${targetPhase}. Must be 0-11.\n`));
      process.exit(1);
    }

    const phase = phaseEngine.getPhase(targetPhase);
    const phaseKey = 'phase-' + String(targetPhase).padStart(2, '0');
    const existingStatus = state.phases[phaseKey];

    if (existingStatus?.status === 'complete') {
      if (json) {
        console.log(JSON.stringify({ phase: targetPhase, alreadyComplete: true }, null, 2));
        return;
      }
      console.log(chalk.yellow(`\n  Phase ${targetPhase} (${phase.name}) is already complete.\n`));
      return;
    }

    if (!force) {
      const inquirer = (await import('inquirer')).default;
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Mark Phase ${targetPhase} (${phase.name}) as complete?`,
          default: true,
        },
      ]);
      if (!confirm) {
        console.log(chalk.dim('\n  Cancelled.\n'));
        return;
      }
    }

    sm.updatePhase(targetPhase, {
      status: 'complete',
      completedAt: new Date().toISOString(),
      startedAt: existingStatus?.startedAt,
      files: existingStatus?.files || [],
    });

    if (json) {
      console.log(
        JSON.stringify(
          {
            phase: targetPhase,
            status: 'complete',
            completedAt: new Date().toISOString(),
          },
          null,
          2
        )
      );
      return;
    }

    console.log(chalk.green(`\n  ✅ Phase ${targetPhase} (${phase.name}) marked as complete.\n`));
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}