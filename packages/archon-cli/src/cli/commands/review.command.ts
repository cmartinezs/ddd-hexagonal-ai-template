import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { StateManager } from '../../core/state-manager.js';
import { ReviewPhaseUseCase } from '../../application/review-phase.usecase.js';

export class ReviewCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const phaseArg = this.getArg(args, 'phase') ?? (opts['phase'] as string | undefined);
    const json = opts['json'] === true;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    let phase: number;
    if (phaseArg !== undefined) {
      phase = parseInt(phaseArg, 10);
    } else {
      const sm = new StateManager(mode.projectPath!);
      phase = sm.load().currentPhase;
    }

    const uc = new ReviewPhaseUseCase();
    const result = uc.execute({ projectPath: mode.projectPath!, phase });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    const scoreColor = result.overallScore >= 80 ? chalk.green : result.overallScore >= 50 ? chalk.yellow : chalk.red;

    console.log(chalk.cyan('\n  Review — Phase ' + result.phase + ': ' + result.phaseName));
    console.log('  Overall Score: ' + scoreColor(result.overallScore + '/100') + '\n');

    if (result.files.length === 0) {
      console.log(chalk.yellow('  No documentation files found in docs/' + result.phaseName.toLowerCase() + '/'));
      console.log(chalk.dim('  Run `archon generate phase ' + result.phase + '` to scaffold files.\n'));
      return;
    }

    for (const file of result.files) {
      const fc = file.score >= 80 ? chalk.green : file.score >= 50 ? chalk.yellow : chalk.red;
      console.log('  ' + fc('[' + String(file.score).padStart(3) + '] ') + file.file);

      const errors = file.issues.filter((i) => i.severity === 'error');
      const warnings = file.issues.filter((i) => i.severity === 'warn');
      const infos = file.issues.filter((i) => i.severity === 'info');

      for (const issue of errors) {
        const loc = issue.line ? ':' + issue.line : '';
        console.log(chalk.red('         ✗ ') + chalk.dim(issue.file + loc) + ' — ' + issue.message);
      }
      for (const issue of warnings) {
        const loc = issue.line ? ':' + issue.line : '';
        console.log(chalk.yellow('         ⚠ ') + chalk.dim(issue.file + loc) + ' — ' + issue.message);
      }
      for (const issue of infos) {
        console.log(chalk.blue('         → ') + issue.message);
      }
    }

    console.log();
    const parts: string[] = [];
    if (result.errors > 0) parts.push(chalk.red(result.errors + ' error(s)'));
    if (result.warnings > 0) parts.push(chalk.yellow(result.warnings + ' warning(s)'));
    if (parts.length === 0) parts.push(chalk.green('no issues'));
    console.log('  ' + parts.join(', ') + '\n');
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
