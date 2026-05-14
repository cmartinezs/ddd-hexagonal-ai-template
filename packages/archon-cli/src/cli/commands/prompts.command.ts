import chalk from 'chalk';

import { detectMode } from '../../core/mode-detector.js';
import { PromptsManager } from '../../core/prompts-manager.js';
import { RunTracker } from '../../core/run-tracker.js';

export class PromptsCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0];

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const pm = new PromptsManager(mode.projectPath!);
    const rt = new RunTracker(mode.projectPath!);

    switch (subcommand) {
      case 'ls':
        this.listPrompts(pm);
        break;
      case 'rank':
        this.rankPrompts(pm, args[1]);
        break;
      case 'compress':
        this.compressPrompt(pm, args[1]);
        break;
      case 'merge':
        this.mergePrompts(pm, args[1], args[2]);
        break;
      case 'expand':
        this.expandPrompt(pm, args[1]);
        break;
      case 'export':
        this.exportPrompt(pm, args[1], args[2]);
        break;
      case 'clean':
        this.cleanPrompts(pm, args[1]);
        break;
      case 'stats':
        this.showStats(pm, rt);
        break;
      default:
        this.showHelp();
    }
  }

  private listPrompts(pm: PromptsManager): void {
    const prompts = pm.list();
    if (prompts.length === 0) {
      console.log(chalk.yellow('\n  No prompts found. Run `archon prompt` first.\n'));
      return;
    }

    console.log(chalk.cyan('\n  Accumulated prompts (' + prompts.length + '):\n'));
    console.log(
      '  ' + chalk.bold('ID').padEnd(45) +
      chalk.bold('Phase').padEnd(8) +
      chalk.bold('Size').padEnd(10) +
      chalk.bold('Context').padEnd(10) +
      chalk.bold('Agent')
    );
    console.log(chalk.dim('  ' + '─'.repeat(80)));

    for (const p of prompts) {
      const phaseStr = 'P' + String(p.phase).padStart(2, '0') + ' ' + (p.phaseName ?? 'unknown').substring(0, 12);
      const sizeStr = this.formatBytes(p.size);
      console.log(
        '  ' + p.id.substring(0, 43).padEnd(45) +
        phaseStr.padEnd(8) +
        sizeStr.padEnd(10) +
        p.context.padEnd(10) +
        p.agent
      );
    }
    console.log();
  }

  private rankPrompts(pm: PromptsManager, criteria?: string): void {
    const validCriteria = ['date', 'size', 'phase', 'access'];
    const c = (criteria ?? 'date') as 'date' | 'size' | 'phase' | 'access';
    if (!validCriteria.includes(c)) {
      console.error(chalk.red('\n  Invalid criteria: ' + criteria));
      console.error(chalk.yellow('  Valid: ' + validCriteria.join(', ') + '\n'));
      return;
    }

    const prompts = pm.rank(c);
    console.log(chalk.cyan('\n  Prompts ranked by ' + c + ':\n'));

    for (let i = 0; i < prompts.length; i++) {
      const p = prompts[i]!;
      console.log(
        '  ' + chalk.bold(String(i + 1).padStart(2) + '.') + ' ' + p.id +
        chalk.dim(' (P' + String(p.phase).padStart(2, '0') + ', ' + this.formatBytes(p.size) + ')')
      );
    }
    console.log();
  }

  private compressPrompt(pm: PromptsManager, id?: string): void {
    if (!id) {
      console.error(chalk.red('\n  Usage: archon prompts compress <id>\n'));
      return;
    }
    const ok = pm.compress(id);
    if (ok) {
      console.log(chalk.green('\n  Compressed prompt saved.\n'));
    } else {
      console.error(chalk.red('\n  Could not compress prompt: ' + id + '\n'));
    }
  }

  private mergePrompts(pm: PromptsManager, id1?: string, id2?: string): void {
    if (!id1 || !id2) {
      console.error(chalk.red('\n  Usage: archon prompts merge <id1> <id2>\n'));
      return;
    }
    const result = pm.merge(id1, id2);
    if (result) {
      console.log(chalk.green('\n  Merged prompt saved as: ' + result + '\n'));
    } else {
      console.error(chalk.red('\n  Could not merge prompts. Check IDs.\n'));
    }
  }

  private expandPrompt(pm: PromptsManager, id?: string): void {
    if (!id) {
      console.error(chalk.red('\n  Usage: archon prompts expand <id>\n'));
      return;
    }
    const ok = pm.expand(id);
    if (ok) {
      console.log(chalk.green('\n  Expanded prompt saved.\n'));
    } else {
      console.error(chalk.red('\n  Could not expand prompt: ' + id + '\n'));
    }
  }

  private exportPrompt(pm: PromptsManager, id?: string, outputPath?: string): void {
    if (!id || !outputPath) {
      console.error(chalk.red('\n  Usage: archon prompts export <id> [--to <file>]\n'));
      return;
    }
    const targetPath = this.getArg([...arguments].flat().filter(Boolean) as string[], 'to') ?? outputPath;
    const ok = pm.export(id, targetPath);
    if (ok) {
      console.log(chalk.green('\n  Exported to: ' + targetPath + '\n'));
    } else {
      console.error(chalk.red('\n  Could not export prompt: ' + id + '\n'));
    }
  }

  private cleanPrompts(pm: PromptsManager, olderThan?: string): void {
    const days = olderThan ? parseInt(olderThan, 10) : 30;
    if (isNaN(days)) {
      console.error(chalk.red('\n  Invalid days value: ' + olderThan + '\n'));
      return;
    }
    const count = pm.clean(days);
    console.log(chalk.green('\n  Removed ' + count + ' old prompt(s).\n'));
  }

  private showStats(pm: PromptsManager, rt: RunTracker): void {
    const prompts = pm.list();
    const stats = rt.getRunStats();

    console.log(chalk.cyan('\n  Prompt Library Stats:\n'));
    console.log('  Total prompts: ' + prompts.length);
    console.log('  Total size:    ' + this.formatBytes(prompts.reduce((acc, p) => acc + p.size, 0)));
    console.log(chalk.bold('\n  Run Stats:\n'));
    console.log('  Total runs:    ' + stats.total);
    console.log('  Successful:    ' + chalk.green(String(stats.successful)));
    console.log('  Failed:       ' + chalk.red(String(stats.failed)));
    if (stats.avgDuration > 0) {
      console.log('  Avg duration: ' + (stats.avgDuration / 1000).toFixed(1) + 's');
    }
    console.log();
  }

  private showHelp(): void {
    console.log(chalk.cyan('\n  Usage: archon prompts <subcommand> [args]\n'));
    console.log('  ' + chalk.bold('Subcommands:'));
    console.log('  ' + chalk.cyan('ls') + '          List all prompts');
    console.log('  ' + chalk.cyan('rank') + '        Rank prompts (date|size|phase|access)');
    console.log('  ' + chalk.cyan('compress') + '    Compress a prompt (remove intermediate steps)');
    console.log('  ' + chalk.cyan('merge') + '       Merge two prompts into one');
    console.log('  ' + chalk.cyan('expand') + '      Expand a compressed prompt');
    console.log('  ' + chalk.cyan('export') + '      Export prompt to file');
    console.log('  ' + chalk.cyan('clean') + '       Archive old prompts [--older-than <days>]');
    console.log('  ' + chalk.cyan('stats') + '       Show prompt library and run statistics');
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]!;
  }
}
