import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { QualityScoreUseCase } from '../../application/quality-score.usecase.js';

export class QualityCommand {
  async run(_args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;
    const phaseArg = opts['phase'] as string | undefined;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const phases = phaseArg
      ? phaseArg.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n))
      : undefined;

    const uc = new QualityScoreUseCase();
    const result = uc.execute({ projectPath: mode.projectPath!, phases });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    if (result.totalFiles === 0) {
      console.log(chalk.yellow('\n  No documentation files found. Run `archon generate phase <N>` first.\n'));
      return;
    }

    const gradeColor = result.grade === 'A' || result.grade === 'B'
      ? chalk.green
      : result.grade === 'C' || result.grade === 'D'
        ? chalk.yellow
        : chalk.red;

    const scoreColor = result.overallScore >= 80 ? chalk.green : result.overallScore >= 50 ? chalk.yellow : chalk.red;

    console.log(chalk.cyan('\n  Quality Report\n'));
    console.log('  Overall Score: ' + scoreColor(result.overallScore + '/100') + '  Grade: ' + gradeColor(result.grade));
    console.log(chalk.dim(`  ${result.totalFiles} files — ${result.totalErrors} error(s), ${result.totalWarnings} warning(s)\n`));

    const colPhase = 20;
    const colScore = 8;
    const colIssues = 18;

    const header = '  ' + 'Phase'.padEnd(colPhase) + 'Score'.padEnd(colScore) + 'Errors/Warnings'.padEnd(colIssues) + 'Files';
    console.log(chalk.bold(header));
    console.log('  ' + '─'.repeat(header.length - 2));

    for (const phase of result.phases) {
      const sc = phase.score >= 80 ? chalk.green : phase.score >= 50 ? chalk.yellow : chalk.red;
      const name = ('P' + phase.phase + ' ' + phase.phaseName).substring(0, colPhase - 1).padEnd(colPhase);
      const scoreStr = sc(String(phase.score).padEnd(colScore - 1) + '%');
      const issueStr = (phase.errors > 0 ? chalk.red(phase.errors + 'e') : chalk.dim('0e'))
        + ' / '
        + (phase.warnings > 0 ? chalk.yellow(phase.warnings + 'w') : chalk.dim('0w'));
      console.log('  ' + name + scoreStr + '  ' + issueStr.padEnd(colIssues + 4) + phase.fileCount);
    }

    console.log();
  }
}
