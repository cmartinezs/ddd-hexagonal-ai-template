import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { phaseEngine } from '../../core/phase-engine.js';
import { NextPhaseUseCase } from '../../application/next-phase.usecase.js';

export class NextCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const force = opts['force'] === true;
    const phaseArg = this.getArg(args, 'phase');

    if (opts['help'] === true || args.includes('--help') || args.includes('-h')) {
      console.log(`
  Usage: archon next [options]

  Options:
    --phase <N>   Target phase (0-11). Default: current phase + 1
    --force       Skip confirmation prompts

  Example:
    archon next           # Advance to next phase
    archon next --force   # Advance without confirmation
    archon next --phase 3 # Jump to phase 3 (warning if not next phase)
`);
      return;
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const uc = new NextPhaseUseCase();
    const targetPhase = phaseArg !== undefined ? parseInt(phaseArg, 10) : undefined;

    const result = await uc.execute({
      projectPath: mode.projectPath!,
      targetPhase,
    });

    if (result.error) {
      console.error(chalk.red('\n  ' + result.error + '\n'));
      process.exit(1);
    }

    console.log(chalk.cyan(`\n  Moving from Phase ${result.fromPhase} → ${result.toPhase}`));
    console.log(chalk.bold(`  ${phaseEngine.getPhase(result.toPhase).name}`));

    if (result.requiresConfirmation && !force) {
      if (result.skippedPhases.length > 0) {
        console.log(chalk.yellow('\n  ⚠️  Jump detected: skipping phases ' + (result.fromPhase + 1) + ' to ' + (result.toPhase - 1)));
      }
      const inquirer = (await import('inquirer')).default;
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: result.confirmationReason ?? 'Proceed?',
        default: result.skippedPhases.length === 0,
      }]);
      if (!confirm) {
        console.log(chalk.dim('\n  Cancelled.\n'));
        return;
      }
    }

    if (result.validationResult) {
      if (result.validationResult.warnings.length > 0) {
        console.log(chalk.yellow('  Warnings found:\n'));
        for (const warn of result.validationResult.warnings) {
          console.log(chalk.yellow('    - ' + warn));
        }
      }
      console.log(chalk.green('  ✅ Validation passed.\n'));
    }

    uc.confirmAdvance(mode.projectPath!, result.fromPhase, result.toPhase, result.skippedPhases);

    if (result.skippedPhases.length > 0) {
      console.log(chalk.cyan('\n  Skipped phases:\n'));
      for (const p of result.skippedPhases) {
        console.log(chalk.dim('  - Phase ' + p + ' (' + phaseEngine.getPhase(p).name + ') marked as skipped'));
      }
    }

    console.log(chalk.green(`\n  ✅ Now at Phase ${result.toPhase}: ${phaseEngine.getPhase(result.toPhase).name}\n`));

    const { StatusCommand } = await import('./status.command.js');
    await new StatusCommand().run([], {});
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
