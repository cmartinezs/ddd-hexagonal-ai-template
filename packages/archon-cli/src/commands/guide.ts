import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import { detectMode } from '../core/mode-detector.js';

const PHASES = [
  { name: 'Documentation Planning', description: 'Define documentation scope, goals, and structure for the project.', outputFiles: [], requiredInputs: [] },
  { name: 'Discovery', description: 'Understand the problem domain, context, and stakeholder needs.', outputFiles: [], requiredInputs: [] },
  { name: 'Requirements', description: 'Define functional and non-functional requirements.', outputFiles: [], requiredInputs: [] },
  { name: 'Design', description: 'Define strategic design, bounded contexts, and UI approach.', outputFiles: [], requiredInputs: [] },
  { name: 'Data Model', description: 'Define entities, relationships, and ERD.', outputFiles: [], requiredInputs: [] },
  { name: 'Planning', description: 'Create roadmap, epics, and sprint planning.', outputFiles: [], requiredInputs: [] },
  { name: 'Development', description: 'Implement code following DDD + Hexagonal Architecture.', outputFiles: [], requiredInputs: [] },
  { name: 'Testing', description: 'Define test strategy and test cases.', outputFiles: [], requiredInputs: [] },
  { name: 'Deployment', description: 'Define CI/CD, environments, and release process.', outputFiles: [], requiredInputs: [] },
  { name: 'Operations', description: 'Define runbooks and incident response procedures.', outputFiles: [], requiredInputs: [] },
  { name: 'Monitoring', description: 'Define metrics, alerts, and dashboards.', outputFiles: [], requiredInputs: [] },
  { name: 'Feedback', description: 'Define retrospective and user feedback collection.', outputFiles: [], requiredInputs: [] },
];

export class GuideCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const phaseArg = this.getArg(args, 'phase');
    const mode = detectMode();

    let currentPhase = 0;
    if (mode.mode === 'project') {
      try {
        const sm = new StateManager(mode.projectPath!);
        currentPhase = sm.getCurrentPhase();
      } catch {
        currentPhase = 0;
      }
    }

    const phase = phaseArg !== undefined ? parseInt(phaseArg, 10) : currentPhase;

    if (phase < 0 || phase > 11) {
      console.error(chalk.red(`\n❌ Invalid phase: ${phase}. Must be 0-11.\n`));
      process.exit(1);
    }

    const phaseData = PHASES[phase]!;
    let phaseStatus: { status: string; completedAt?: string; files?: string[] } | null = null;

    if (mode.mode === 'project') {
      try {
        const sm = new StateManager(mode.projectPath!);
        const state = sm.load();
        phaseStatus = (state.phases[`phase-${String(phase).padStart(2, '0')}`]) ?? null;
      } catch {
        phaseStatus = null;
      }
    }

    console.log(chalk.cyan(`\n═══════════════════════════════════════════════════════`));
    console.log(chalk.bold(`PHASE ${phase}: ${phaseData.name}`));
    console.log(chalk.cyan(`═══════════════════════════════════════════════════════\n`));

    console.log(chalk.bold('Goal: ') + phaseData.description);

    console.log(chalk.bold('\nPrerequisites:'));
    if (phase === 0) {
      console.log(chalk.dim('  - Project name and problem statement'));
    } else {
      console.log(chalk.dim(`  - Phase ${phase - 1} (${PHASES[phase - 1]?.name}) complete`));
    }

    console.log(chalk.bold('\nCurrent status:'));
    if (!phaseStatus) {
      console.log(chalk.dim('  ○ pending'));
    } else if (phaseStatus.status === 'complete') {
      console.log(chalk.green(`  ✅ complete (${phaseStatus.completedAt ?? 'unknown date'})`));
    } else if (phaseStatus.status === 'in_progress') {
      console.log(chalk.cyan(`  ◉ in_progress — ${phaseStatus.files?.length ?? 0} files`));
    } else {
      console.log(chalk.dim('  ○ pending'));
    }

    console.log(chalk.bold('\nNext recommended action:'));
    console.log(chalk.dim(`  Run \`archon prompt --phase ${phase}\` to generate your AI prompt`));

    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}