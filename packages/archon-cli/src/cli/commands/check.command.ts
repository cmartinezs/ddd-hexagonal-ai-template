import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { StateManager } from '../../core/state-manager.js';
import { renderWarnings } from '../../ui/render-warnings.js';
import { CheckPhaseUseCase } from '../../application/check-phase.usecase.js';

export class CheckCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;
    const fixFlag = opts['fix'] === true;
    const noStrict = opts['no-strict'] === true;
    const omitRaw = opts['omit'] as string | undefined;
    const omit = omitRaw ? omitRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const phaseArg = this.getArg(args, 'phase');

    if (fixFlag) {
      console.log(chalk.yellow('  [experimental] --fix is not yet implemented. Displaying issues only.\n'));
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    let phase: number;
    try {
      const sm = new StateManager(mode.projectPath!);
      const state = sm.load();
      phase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase;
    } catch {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const uc = new CheckPhaseUseCase();
    const result = uc.execute({
      projectPath: mode.projectPath!,
      phase: phase!,
      strict: !noStrict,
      omit,
    });

    if (json) {
      console.log(JSON.stringify({
        phase: result.phase,
        valid: result.valid,
        errors: result.errors,
        warnings: result.warnings,
        suggestions: result.suggestions,
      }, null, 2));
      return;
    }

    if (noStrict) {
      console.log(chalk.dim('  Non-strict mode — violations are warnings.\n'));
    }
    console.log(chalk.cyan('\n  Checking Phase ' + result.phase + '...\n'));
    renderWarnings(result.constraints);
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
