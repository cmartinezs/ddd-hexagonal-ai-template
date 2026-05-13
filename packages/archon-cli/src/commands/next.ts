import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { Validator } from '../core/validator.js';

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

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();

    let targetPhase: number;
    if (phaseArg !== undefined) {
      targetPhase = parseInt(phaseArg, 10);
    } else {
      targetPhase = state.currentPhase + 1;
    }

    if (targetPhase < 0 || targetPhase > 11) {
      console.error(chalk.red(`\n  Invalid phase: ${targetPhase}. Must be 0-11.\n`));
      process.exit(1);
    }

    console.log(chalk.cyan(`\n  Moving from Phase ${state.currentPhase} → ${targetPhase}`));
    console.log(chalk.bold(`  ${PHASES[targetPhase] || `Phase ${targetPhase}`}`));

    if (targetPhase > state.currentPhase) {
      const isJump = targetPhase > state.currentPhase + 1;
      if (isJump) {
        if (!force) {
          console.log(chalk.yellow('\n  ⚠️  Jump detected: skipping phases ' + (state.currentPhase + 1) + ' to ' + (targetPhase - 1)));
          const inquirer = (await import('inquirer')).default;
          const { confirmJump } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirmJump',
              message: `Are you sure you want to jump from phase ${state.currentPhase} to ${targetPhase}?`,
              default: false,
            },
          ]);
          if (!confirmJump) {
            console.log(chalk.dim('\n  Cancelled.\n'));
            return;
          }
        }

        console.log(chalk.cyan('\n  Marking skipped phases...\n'));
        for (let p = state.currentPhase + 1; p < targetPhase; p++) {
          const skippedPhase = (await import('../core/phase-engine.js')).phaseEngine.getPhase(p);
          sm.updatePhase(p, {
            status: 'skipped',
            completedAt: new Date().toISOString(),
            startedAt: undefined,
            files: [],
          });
          console.log(chalk.dim(`  - Phase ${p} (${skippedPhase.name}) marked as skipped`));
        }
        console.log();
      }

      const currentPhaseKey = 'phase-' + String(state.currentPhase).padStart(2, '0');
      const currentPhaseData = state.phases[currentPhaseKey];

      if (currentPhaseData?.status !== 'complete') {
        console.log(chalk.cyan('\n  Step 1: Validating current phase...\n'));
        const omit = [state.projectName];
        const v = new Validator({ basePath: mode.projectPath!, strict: true, omit });
        const results = v.validate(state.currentPhase);

        if (results.errors.length > 0) {
          console.log(chalk.red('  Validation failed:\n'));
          for (const err of results.errors) {
            console.log(chalk.red('    - ' + err));
          }
          console.log(chalk.dim('\n  Fix errors before advancing.\n'));
          process.exit(1);
        }

        if (results.warnings.length > 0) {
          console.log(chalk.yellow('  Warnings found:\n'));
          for (const warn of results.warnings) {
            console.log(chalk.yellow('    - ' + warn));
          }
        }

        console.log(chalk.green('  ✅ Validation passed.\n'));

        console.log(chalk.cyan('  Step 2: Marking current phase as complete...\n'));
        const phase = (await import('../core/phase-engine.js')).phaseEngine.getPhase(
          state.currentPhase
        );

        if (!force) {
          const inquirer = (await import('inquirer')).default;
          const { confirm } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirm',
              message: `Mark Phase ${state.currentPhase} (${phase.name}) as complete?`,
              default: true,
            },
          ]);
          if (!confirm) {
            console.log(chalk.dim('\n  Cancelled.\n'));
            return;
          }
        }

        sm.updatePhase(state.currentPhase, {
          status: 'complete',
          completedAt: new Date().toISOString(),
          startedAt: currentPhaseData?.startedAt,
          files: currentPhaseData?.files || [],
        });

        console.log(
          chalk.green(
            `  ✅ Phase ${state.currentPhase} (${phase.name}) marked as complete.\n`
          )
        );
      }
    }

    console.log(chalk.cyan('  Step 3: Advancing to next phase...\n'));
    sm.setCurrentPhase(targetPhase);

    const newPhase = (await import('../core/phase-engine.js')).phaseEngine.getPhase(targetPhase);
    console.log(chalk.green(`  ✅ Now at Phase ${targetPhase}: ${newPhase.name}\n`));

    console.log(chalk.cyan('  Step 4: Current status\n'));
    const StatusCommand = (await import('./status.js')).StatusCommand;
    await new StatusCommand().run([], {});
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}