import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { phaseEngine } from '../../core/phase-engine.js';
import { TraceProjectUseCase } from '../../application/trace-project.usecase.js';

export class TraceCommand {
  async run(_args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const uc = new TraceProjectUseCase();
    const matrix = uc.execute({ projectPath: mode.projectPath! });

    if (json) {
      console.log(JSON.stringify(matrix, null, 2));
      return;
    }

    const phases = phaseEngine.getAllPhases().filter((p) => matrix.coverage[p.index] !== undefined);

    console.log(chalk.cyan('\n  Traceability Matrix\n'));

    const pct = matrix.totalTerms > 0
      ? Math.round((matrix.tracedTerms / matrix.totalTerms) * 100)
      : 100;
    const pctColor = pct >= 80 ? chalk.green : pct >= 50 ? chalk.yellow : chalk.red;
    console.log('  Coverage: ' + pctColor(pct + '%') + ' (' + matrix.tracedTerms + '/' + matrix.totalTerms + ' terms traced across phases)');
    console.log();

    const colWidth = 18;
    const header = '  Phase'.padEnd(colWidth) + phases.map((p) => String(p.index).padStart(5)).join('') + '  Coverage';
    console.log(chalk.bold(header));
    console.log('  ' + '─'.repeat(header.length - 2));

    for (const phase of phases) {
      const termCount = matrix.terms.filter((t) => t.definedInPhase === phase.index).length;
      if (termCount === 0) continue;

      const name = ('P' + phase.index + ' ' + phase.name).substring(0, colWidth - 2).padEnd(colWidth);
      const row = phases.map((other) => {
        if (other.index === phase.index) return chalk.dim('  —  ');
        const linked = matrix.links.some((l) => l.fromPhase === phase.index && l.toPhase === other.index);
        return linked ? chalk.green('  ●  ') : chalk.dim('  ○  ');
      }).join('');

      const cov = matrix.coverage[phase.index] ?? 0;
      const covStr = cov >= 80 ? chalk.green(cov + '%') : cov >= 50 ? chalk.yellow(cov + '%') : chalk.red(cov + '%');

      console.log('  ' + name + row + '  ' + covStr);
    }

    console.log();
    if (matrix.totalTerms === 0) {
      console.log(chalk.dim('  No terms found. Complete more documentation phases to build the matrix.\n'));
    } else {
      console.log(chalk.dim('  Legend: ● = referenced, ○ = not referenced, — = same phase\n'));
    }
  }
}
