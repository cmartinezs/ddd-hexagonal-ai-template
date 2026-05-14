import chalk from 'chalk';
import { join } from 'node:path';
import { detectMode } from '../../core/mode-detector.js';
import { globalCache } from '../../core/global-cache/global-cache.js';
import { DiffTemplateUseCase } from '../../application/diff-template.usecase.js';

export class DiffCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;

    const fromArg = opts['from'] as string | undefined;
    const toArg = opts['to'] as string | undefined;

    let from = fromArg ?? '';
    let to = toArg ?? '';

    if (!from || !to) {
      const rangeArg = args.find((a) => a.includes('..'));
      if (rangeArg) {
        const parts = rangeArg.split('..');
        from = parts[0] ?? '';
        to = parts[1] ?? '';
      }
    }

    if (!from || !to) {
      console.error(chalk.red('\n  Usage: archon diff --from <version> --to <version>\n'));
      console.error(chalk.dim('  Or:    archon diff <from>..<to>\n'));
      process.exit(1);
    }

    const templateBasePath = this.resolveTemplatePath();
    const uc = new DiffTemplateUseCase();
    const result = uc.execute({ fromVersion: from, toVersion: to, templateBasePath });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    console.log(chalk.cyan(`\n  Template Diff: ${from} → ${to}\n`));

    if (result.files.length === 0 && result.breakingChanges.length > 0) {
      for (const msg of result.breakingChanges) {
        console.error(chalk.red('  ✗ ' + msg));
      }
      console.log();
      process.exit(1);
    }

    if (result.files.length === 0) {
      console.log(chalk.green('  No differences found — versions are identical.\n'));
      return;
    }

    const summary: string[] = [];
    if (result.totalAdded > 0) summary.push(chalk.green(`+${result.totalAdded} added`));
    if (result.totalRemoved > 0) summary.push(chalk.red(`-${result.totalRemoved} removed`));
    if (result.totalModified > 0) summary.push(chalk.yellow(`~${result.totalModified} modified`));
    if (result.totalUnchanged > 0) summary.push(chalk.dim(`=${result.totalUnchanged} unchanged`));

    console.log('  ' + summary.join('  ') + '\n');

    for (const file of result.files) {
      if (file.status === 'unchanged') continue;
      const icon = file.status === 'added'
        ? chalk.green('+')
        : file.status === 'removed'
          ? chalk.red('-')
          : chalk.yellow('~');
      const stats = chalk.dim(` (+${file.linesAdded}/-${file.linesRemoved})`);
      console.log(`  ${icon} ${file.relativePath}${stats}`);
    }

    if (result.breakingChanges.length > 0) {
      console.log(chalk.red('\n  Breaking changes:'));
      for (const bc of result.breakingChanges) {
        console.log(chalk.red('    ✗ ' + bc));
      }
    }

    console.log();
  }

  private resolveTemplatePath(): string {
    const mode = detectMode();
    if (mode.mode === 'project' && mode.templateId && mode.templateVersion) {
      try {
        const cached = globalCache.getTemplatePath(mode.templateId, mode.templateVersion);
        if (cached) return cached;
      } catch { /* fall through */ }
    }
    return join(process.env['HOME'] ?? '.', '.archon', 'templates');
  }
}
