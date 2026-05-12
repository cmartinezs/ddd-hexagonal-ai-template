import chalk from 'chalk';

import { detectMode } from '../core/mode-detector.js';

export class PromptsCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0];

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n❌ No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const promptsDir = `${mode.projectPath}/.archon/prompts`;

    switch (subcommand) {
      case 'ls': {
        const { readdirSync, existsSync } = await import('node:fs');
        if (!existsSync(promptsDir)) {
          console.log(chalk.yellow('\n⚠️  No prompts directory found.\n'));
          return;
        }
        const files = readdirSync(promptsDir).filter((f) => f.endsWith('.md') || f.endsWith('.txt'));
        if (files.length === 0) {
          console.log(chalk.yellow('\n⚠️  No prompts found.\n'));
          return;
        }
        console.log(chalk.cyan('\n📚 Accumulated prompts:\n'));
        for (const f of files) {
          console.log(`  ${chalk.bold(f)}`);
        }
        console.log();
        break;
      }
      case 'rank':
      case 'compress':
      case 'merge':
      case 'expand':
      case 'export':
      case 'clean': {
        console.log(chalk.yellow(`\n⚠️  Subcommand '${subcommand}' not yet implemented.\n`));
        break;
      }
      default: {
        console.error(chalk.red(`\n❌ Unknown subcommand: ${subcommand}\n`));
        console.log(
          chalk.yellow('Usage: archon prompts ls|rank|compress|merge|expand|export|clean [args]\n')
        );
        process.exit(1);
      }
    }
  }
}