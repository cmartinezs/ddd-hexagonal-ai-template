import chalk from 'chalk';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { detectMode } from '../../core/mode-detector.js';
import { StateManager } from '../../core/state-manager.js';
import { contextScanner } from '../../core/context-scanner.js';

export class ContextCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0] ?? 'scan';

    if (subcommand === 'inject') {
      await this.injectGuides(args);
      return;
    }

    if (subcommand !== 'scan') {
      console.error(chalk.red(`\n  Unknown subcommand: ${subcommand}`));
      console.error(chalk.yellow('\n  Usage: archon context scan [--output <dir>]\n'));
      process.exit(1);
    }

    await this.scanContext();
  }

  private async injectGuides(args: string[]): Promise<void> {
    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project context. Run `archon init` first.\n'));
      process.exit(1);
    }

    const guidesDir = join(mode.projectPath!, '.archon', 'guides');
    const agentsPath = join(mode.projectPath!, '.archon', 'AGENTS.md');
    const contextPath = join(mode.projectPath!, '.archon', 'context', 'context.md');

    if (!existsSync(guidesDir) && !existsSync(agentsPath)) {
      console.log(chalk.yellow('\n  No guides found. Run `archon init` or upgrade the project.\n'));
      process.exit(1);
    }

    const lines: string[] = [
      '# AI Agent Guides Reference',
      '',
      '## Project-Specific Context',
      '',
      '_This section provides AI agent guidance specific to this project._',
      '',
    ];

    if (existsSync(agentsPath)) {
      lines.push('### AGENTS.md (Root Instructions)');
      lines.push('');
      lines.push('```markdown');
      lines.push(readFileSync(agentsPath, 'utf-8'));
      lines.push('```');
      lines.push('');
    }

    if (existsSync(guidesDir)) {
      lines.push('### Core Guides');
      lines.push('');

      const keyGuides = [
        'INSTRUCTIONS-FOR-AI.md',
        'AI-WORKFLOW-GUIDE.md',
        'SKILLS-AND-PLUGINS-GUIDE.md',
        'TEMPLATE-ARCHITECTURE.md',
      ];

      for (const guide of keyGuides) {
        const guidePath = join(guidesDir, guide);
        if (existsSync(guidePath)) {
          lines.push(`#### ${guide.replace('.md', '')}`);
          lines.push('');
          lines.push('```markdown');
          const content = readFileSync(guidePath, 'utf-8');
          lines.push(content.slice(0, 3000) + (content.length > 3000 ? '\n\n[...truncated]' : ''));
          lines.push('```');
          lines.push('');
        }
      }

      const otherFiles = readdirSync(guidesDir).filter(f => f.endsWith('.md') && !keyGuides.includes(f));
      if (otherFiles.length > 0) {
        lines.push('#### Other Guides Available');
        lines.push('');
        for (const f of otherFiles) {
          lines.push(`- \`${f}\` (see \`.archon/guides/${f}\`)`);
        }
        lines.push('');
      }
    }

    const outputPath = args[2] === '--output' && args[3] ? args[3] : contextPath;
    writeFileSync(outputPath, lines.join('\n'), 'utf-8');

    console.log(chalk.green('\n  ✅ Guides injected into context:'));
    console.log('    ' + outputPath);
    console.log(chalk.dim('\n  These guides will be included in the next `archon run` or `archon prompt`.\n'));
  }

  private async scanContext(): Promise<void> {
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
