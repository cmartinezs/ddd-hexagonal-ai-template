import chalk from 'chalk';
import { detectMode } from '../core/mode-detector.js';
import { StateManager } from '../core/state-manager.js';
import { contextScanner } from '../core/context-scanner.js';

export class ContextCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0] ?? 'scan';

    if (subcommand !== 'scan') {
      console.error(chalk.red(`\n  Unknown subcommand: ${subcommand}`));
      console.error(chalk.yellow('\n  Usage: archon context scan [--output <dir>]\n'));
      process.exit(1);
    }

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project context. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();

    console.log(chalk.cyan('\n  Scanning project...\n'));

    const scan = contextScanner.scan(mode.projectPath!, state);

    console.log(chalk.green('  ✅ Detected:') + ' TypeScript, Node.js, DDD structure');
    console.log(chalk.green('  ✅ Found:') + ' ' + scan.completedPhases.length + ' phases completed');
    if (scan.inProgressPhases.length > 0) {
      console.log(chalk.yellow('  🔄 In progress:') + ' ' + scan.inProgressPhases.join(', '));
    }
    console.log('  ✅ Stack: ' + (scan.techStack.length > 0 ? scan.techStack.join(', ') : 'unspecified'));

    if (scan.glossary.length > 0) {
      console.log(chalk.green('  ✅ Glossary:') + ' ' + scan.glossary.length + ' terms');
    }

    const { contextPath, mapPath } = contextScanner.saveContext(mode.projectPath!, state);

    console.log(chalk.green('\n  Context written to:'));
    console.log('    ' + contextPath);
    console.log('    ' + mapPath);

    if (scan.warnings.length > 0) {
      console.log(chalk.yellow('\n  Warnings (' + scan.warnings.length + '):'));
      for (const w of scan.warnings) {
        console.log('    ⚠️  ' + w);
      }
    }

    console.log(chalk.dim('\n  Run `archon prompt --phase ' + state.currentPhase + '` to generate your AI prompt.\n'));
  }
}
