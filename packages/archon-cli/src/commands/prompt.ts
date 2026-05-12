import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';

const PHASES = [
  { name: 'Documentation Planning', description: 'Define documentation scope, goals, and structure for the project.' },
  { name: 'Discovery', description: 'Understand the problem domain, context, and stakeholder needs.' },
  { name: 'Requirements', description: 'Define functional and non-functional requirements.' },
  { name: 'Design', description: 'Define strategic design, bounded contexts, and UI approach.' },
  { name: 'Data Model', description: 'Define entities, relationships, and ERD.' },
  { name: 'Planning', description: 'Create roadmap, epics, and sprint planning.' },
  { name: 'Development', description: 'Implement code following DDD + Hexagonal Architecture.' },
  { name: 'Testing', description: 'Define test strategy and test cases.' },
  { name: 'Deployment', description: 'Define CI/CD, environments, and release process.' },
  { name: 'Operations', description: 'Define runbooks and incident response procedures.' },
  { name: 'Monitoring', description: 'Define metrics, alerts, and dashboards.' },
  { name: 'Feedback', description: 'Define retrospective and user feedback collection.' },
];

export class PromptCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const contextOpt = this.getArg(args, 'context') ?? (opts['context'] as string | undefined);
    const copy = opts['copy'] === true;
    const phaseArg = this.getArg(args, 'phase');

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const phase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase;

    const contextLevel = (contextOpt ?? 'full') as 'full' | 'summary' | 'none';

    console.log(chalk.cyan('\n  Generating prompt for Phase ' + phase + ' (' + contextLevel + ')...'));

    const lines: string[] = [];
    lines.push('# AI Prompt - Phase ' + phase + ': ' + PHASES[phase]!.name);
    lines.push('');

    if (contextLevel === 'full') {
      lines.push('**Project:** ' + state.projectName);
      lines.push('**Template:** DDD + Hexagonal Architecture');
      lines.push('**Phase:** ' + phase + ' - ' + PHASES[phase]!.name);
      lines.push('');
      lines.push('## Project Structure');
      lines.push('Reference the template at `../ddd-hexagonal-ai-template/` for structure and conventions.');
      lines.push('');
    } else if (contextLevel === 'summary') {
      lines.push('**Project:** ' + state.projectName + ' | **Phase:** ' + phase + ': ' + PHASES[phase]!.name);
      lines.push('');
    }

    lines.push('## Task');
    lines.push('');
    lines.push(PHASES[phase]!.description);
    lines.push('');
    lines.push('## Instructions');
    lines.push('');
    if (contextLevel === 'none') {
      lines.push('Execute this phase independently.');
    } else {
      lines.push('Use the template at `../ddd-hexagonal-ai-template/` as your guide.');
    }
    lines.push('Output the required documentation in the appropriate folder.');
    lines.push('Follow the template structure and conventions.');

    const promptText = lines.join('\n');

    console.log(chalk.green('\n  Prompt generated:\n'));
    console.log(promptText);
    console.log();

    if (copy) {
      console.log(chalk.dim('  Copy the above prompt and paste it into your AI agent.'));
    }
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}