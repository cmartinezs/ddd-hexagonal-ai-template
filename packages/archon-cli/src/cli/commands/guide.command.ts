import chalk from 'chalk';
import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

import { StateManager } from '../../core/state-manager.js';
import { detectMode } from '../../core/mode-detector.js';
import { PHASES } from '../../core/phase-engine.js';
import { templateResolver } from '../../core/global-cache/index.js';

const PITFALLS: Record<number, string[]> = {
  0: [
    'Starting too many phases at once — focus on documentation first',
    'Not defining clear success criteria upfront',
  ],
  1: [
    'Confusing symptoms with root causes in problem analysis',
    'Not involving enough stakeholders in actor identification',
    'Skipping the "why" — jumping to solutions before understanding the problem',
  ],
  2: [
    'Writing requirements that are too implementation-specific',
    'Forgetting non-functional requirements (performance, security, usability)',
    'Not prioritizing requirements — everything seems "critical"',
  ],
  3: [
    'Defining too many bounded contexts — start with 2-3',
    'Using technology terms instead of domain language',
    'Forgetting Mermaid diagrams for context map',
    'Not validating bounded context boundaries with stakeholders',
  ],
  4: [
    'Creating entities that are really value objects (and vice versa)',
    'Missing aggregate boundaries — putting unrelated entities in the same aggregate',
    'Not drawing ERD diagrams for visual clarity',
    'Forgetting to define relationships cardinalities',
  ],
  5: [
    'Roadmap too detailed \u2014 don\u2019t plan sprints, plan milestones',
    'Not aligning releases with business objectives',
    'Underestimating complexity of "simple" features',
  ],
  6: [
    'Violating the dependency rule (adapters depending on other adapters)',
    'Putting business logic in application services',
    'Not using value objects for validation',
    'Skipping ADR documentation for architectural decisions',
  ],
  7: [
    'Testing implementation details instead of behavior',
    'Not defining test data strategy upfront',
    'Missing negative/happy path coverage balance',
  ],
  8: [
    'No rollback procedures documented',
    'Environment configurations that differ between dev and prod',
    'Missing secrets management strategy',
  ],
  9: [
    'Runbooks that assume operator knowledge — be self-documenting',
    'Not testing incident response procedures',
    'Missing escalation matrix',
  ],
  10: [
    'Defining metrics without correlating to business outcomes',
    'Alert fatigue — too many alerts, not enough signal',
    'Not defining SLOs before setting alerts',
  ],
  11: [
    'Retrospectives that produce no action items',
    'Collecting feedback but not acting on it',
    'Not closing the loop — not telling users what changed',
  ],
};

const NEXT_ACTIONS: Record<number, string> = {
  0: 'archon prompt --phase 0',
  1: 'archon prompt --phase 1',
  2: 'archon prompt --phase 2',
  3: 'archon prompt --phase 3',
  4: 'archon prompt --phase 4',
  5: 'archon prompt --phase 5',
  6: 'archon prompt --phase 6',
  7: 'archon prompt --phase 7',
  8: 'archon prompt --phase 8',
  9: 'archon prompt --phase 9',
  10: 'archon prompt --phase 10',
  11: 'archon prompt --phase 11',
};

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

    if (isNaN(phase) || phase < 0 || phase > 11) {
      console.error(chalk.red(`\n  Invalid phase: ${phaseArg}. Must be 0-11.\n`));
      process.exit(1);
    }

    const phaseData = PHASES[phase]!;
    let phaseStatus: { status: string; completedAt?: string; startedAt?: string; files?: string[] } | null = null;

    if (mode.mode === 'project') {
      try {
        const sm = new StateManager(mode.projectPath!);
        const state = sm.load();
        phaseStatus = (state.phases[`phase-${String(phase).padStart(2, '0')}`]) ?? null;
      } catch {
        phaseStatus = null;
      }
    }

    const sep = '═══════════════════════════════════════════════════════';
    console.log(chalk.cyan('\n' + sep));
    console.log(chalk.bold(`  PHASE ${phase}: ${phaseData.name}`));
    console.log(chalk.cyan(sep + '\n'));

    console.log(chalk.bold('Goal: ') + phaseData.description);

    console.log(chalk.bold('\nWhat this phase produces:'));
    for (const output of phaseData.outputFiles) {
      console.log(chalk.dim('  - ') + output);
    }

    console.log(chalk.bold('\nPrerequisites:'));
    if (phase === 0) {
      console.log(chalk.dim('  - Project name and problem statement'));
    } else {
      const deps = phaseData.dependencies;
      for (const dep of deps) {
        const depPhase = PHASES[dep];
        if (depPhase) {
          console.log(chalk.dim('  - Phase ' + dep + ' (' + depPhase.name + ') complete'));
        }
      }
    }

    console.log(chalk.bold('\nMode: ') + (phaseData.isAgnostic ? chalk.green('Agnostic') + chalk.dim(' (no technology constraints)') : chalk.yellow('Technology-specific') + chalk.dim(' (uses project stack)')));

    console.log(chalk.bold('\nCurrent status:'));
    if (!phaseStatus) {
      console.log(chalk.dim('  ○ pending'));
    } else if (phaseStatus.status === 'complete') {
      const date = phaseStatus.completedAt ? new Date(phaseStatus.completedAt).toLocaleDateString() : 'unknown date';
      console.log(chalk.green(`  ✅ complete (${date})`));
      if (phaseStatus.files && phaseStatus.files.length > 0) {
        console.log(chalk.dim('    Files: ') + phaseStatus.files.length);
      }
    } else if (phaseStatus.status === 'in_progress') {
      const date = phaseStatus.startedAt ? new Date(phaseStatus.startedAt).toLocaleDateString() : 'unknown';
      console.log(chalk.cyan(`  ◉ in_progress — started ${date}`));
      if (phaseStatus.files && phaseStatus.files.length > 0) {
        for (const f of phaseStatus.files.slice(0, 3)) {
          console.log(chalk.dim('    - ' + f));
        }
        if (phaseStatus.files.length > 3) {
          console.log(chalk.dim('    ... and ' + (phaseStatus.files.length - 3) + ' more'));
        }
      }
    } else {
      console.log(chalk.dim('  ○ pending'));
    }

    const pitfalls = PITFALLS[phase];
    if (pitfalls && pitfalls.length > 0) {
      console.log(chalk.bold('\nCommon pitfalls:'));
      for (const pitfall of pitfalls) {
        console.log(chalk.yellow('  ⚠️  ') + pitfall);
      }
    }

    const tutorialContent = this.loadTutorialStep(phase, mode);
    if (tutorialContent) {
      console.log(chalk.bold('\nTutorial note:'));
      const summary = tutorialContent.split('\n').find((l) => l.startsWith('**Summary:**'));
      if (summary) {
        console.log(chalk.dim('  ' + summary.replace(/\*\*/g, '')));
      }
    }

    console.log(chalk.bold('\nNext recommended action:'));
    console.log(chalk.dim('  Run `') + chalk.cyan(NEXT_ACTIONS[phase]) + chalk.dim('` to generate your AI prompt'));

    if (mode.mode === 'project') {
      console.log(chalk.dim('  Run `') + chalk.cyan('archon check --phase ' + phase) + chalk.dim('` to validate before moving forward'));
      if (phase < 11) {
        console.log(chalk.dim('  Run `') + chalk.cyan('archon next --phase ' + (phase + 1)) + chalk.dim('` to advance to the next phase'));
      }
    }

    console.log();
  }

  private loadTutorialStep(phase: number, mode: ReturnType<typeof detectMode>): string | null {
    const templateRoot = mode.mode === 'project' && mode.projectPath
      ? templateResolver.getLockedTemplatePath(mode.projectPath) ?? this.findTemplateRoot()
      : this.findTemplateRoot();

    const stepFile = join(templateRoot, 'tutorial', `step-${String(phase).padStart(2, '0')}-${PHASES[phase]!.folder}.md`);
    if (existsSync(stepFile)) {
      try {
        return readFileSync(stepFile, 'utf-8');
      } catch {
        // skip
      }
    }

    const altFile = join(templateRoot, 'tutorial', `step-${String(phase).padStart(2, '0')}.md`);
    if (existsSync(altFile)) {
      try {
        return readFileSync(altFile, 'utf-8');
      } catch {
        // skip
      }
    }

    return null;
  }

  private findTemplateRoot(): string {
    const parts = process.cwd().split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      const candidate = parts.slice(0, i + 1).join('/');
      if (existsSync(join(candidate, '01-templates'))) {
        return candidate;
      }
    }
    return process.cwd();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
