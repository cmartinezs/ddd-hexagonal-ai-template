import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { GeneratePhaseUseCase } from '../../application/generate-phase.usecase.js';

export class GenerateCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const force = opts['force'] === true;
    const subcommand = args[0];
    const phaseArg = subcommand === 'phase' ? args[1] : this.getArg(args, 'phase') ?? (opts['phase'] as string | undefined);

    if (!phaseArg || subcommand !== 'phase') {
      console.log(`
  Usage: archon generate phase <N> [options]

  Options:
    --force   Overwrite existing files

  Examples:
    archon generate phase 1      # Scaffold phase 1 docs (skip existing)
    archon generate phase 3 --force  # Scaffold phase 3, overwrite existing
`);
      return;
    }

    const phase = parseInt(phaseArg, 10);
    if (isNaN(phase)) {
      console.error(chalk.red('\n  Phase must be a number 0-11.\n'));
      process.exit(1);
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const uc = new GeneratePhaseUseCase();
    const result = uc.execute({ projectPath: mode.projectPath!, phase, force });

    if (result.error) {
      console.error(chalk.red('\n  ' + result.error + '\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n  Generating phase ' + result.phase + ': ' + result.phaseName + '\n'));
    console.log('  Target: docs/' + result.phaseFolder + '/\n');

    let created = 0, skipped = 0, overwritten = 0;
    for (const f of result.files) {
      if (f.action === 'created') {
        console.log(chalk.green('  + ') + f.file);
        created++;
      } else if (f.action === 'overwritten') {
        console.log(chalk.yellow('  ~ ') + f.file);
        overwritten++;
      } else {
        console.log(chalk.dim('  = ') + f.file + chalk.dim(' (skipped)'));
        skipped++;
      }
    }

    console.log();
    if (created + overwritten === 0) {
      console.log(chalk.dim('  All files already exist. Use --force to overwrite.\n'));
    } else {
      const parts: string[] = [];
      if (created > 0) parts.push(chalk.green(created + ' created'));
      if (overwritten > 0) parts.push(chalk.yellow(overwritten + ' overwritten'));
      if (skipped > 0) parts.push(chalk.dim(skipped + ' skipped'));
      console.log('  ' + parts.join(', ') + '\n');
    }
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
