import chalk from 'chalk';
import { detectMode } from '../core/mode-detector.js';

export class ContextCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0] ?? 'scan';

    if (subcommand !== 'scan') {
      console.error(chalk.red(`❌ Unknown subcommand: ${subcommand}`));
      console.error(chalk.yellow('\nUsage: archon context scan [--output <dir>]\n'));
      process.exit(1);
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n❌ No project context. Run `archon init` first.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n🔍 Scanning project...\n'));

    const phasesDetected: number[] = [];

    try {
      const { readdirSync } = await import('node:fs');
      const projectPath = mode.projectPath!;

      const entries = readdirSync(projectPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.match(/^\d{2}-/)) {
          const phaseNum = parseInt(entry.name.substring(0, 2), 10);
          if (!isNaN(phaseNum) && phaseNum >= 0 && phaseNum <= 11) {
            phasesDetected.push(phaseNum);
          }
        }
      }
    } catch {
      // non-fatal
    }

    console.log(chalk.green('✅ Context scan complete\n'));

    if (phasesDetected.length > 0) {
      console.log(chalk.bold('Phases detected:'));
      for (const p of phasesDetected.sort((a, b) => a - b)) {
        console.log(`  - Phase ${p}`);
      }
    } else {
      console.log(chalk.dim('No phase directories detected yet.'));
    }

    if (mode.projectName) {
      console.log(chalk.dim(`\nProject: ${mode.projectName}`));
    }

    console.log();
  }
}