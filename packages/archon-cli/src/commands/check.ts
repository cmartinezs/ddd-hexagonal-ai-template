import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { validator } from '../core/validator.js';
import { renderWarnings } from '../ui/render-warnings.js';

export class CheckCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;
    const _fix = opts['fix'] === true;
    const phaseArg = this.getArg(args, 'phase');

    if (_fix) {
      // TODO: implement auto-fix
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    let sm: StateManager;
    try {
      sm = new StateManager(mode.projectPath!);
      sm.load();
    } catch {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const state = sm.load();
    const phase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase;

    const results = validator.validate(phase);

    if (json) {
      console.log(
        JSON.stringify(
          {
            phase,
            valid: results.errors.length === 0,
            errors: results.errors,
            warnings: results.warnings,
            suggestions: results.suggestions,
          },
          null,
          2
        )
      );
      return;
    }

    console.log(chalk.cyan('\n  Checking Phase ' + phase + '...\n'));
    renderWarnings(results.constraints);
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}