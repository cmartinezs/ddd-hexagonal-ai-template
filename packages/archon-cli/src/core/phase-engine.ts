import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { PhaseStatusEntry } from './types.js';

export interface PhaseDefinition {
  index: number;
  code: string;
  name: string;
  folder: string;
  description: string;
  isAgnostic: boolean;
  requiredInputs: string[];
  outputFiles: string[];
  dependencies: number[];
}

export const PHASES: PhaseDefinition[] = [
  {
    index: 0,
    code: 'G',
    name: 'Documentation Planning',
    folder: '00-documentation-planning',
    description: 'Define documentation scope, goals, and structure for the project.',
    isAgnostic: true,
    requiredInputs: ['project name', 'problem statement'],
    outputFiles: [
      'README.md',
      'HOW-TO-USE.md',
      'PHASE-INPUT.md',
      'macro-plan.md',
      'navigation-conventions.md',
      'sdlc-framework.md',
    ],
    dependencies: [],
  },
  {
    index: 1,
    code: 'D',
    name: 'Discovery',
    folder: '01-discovery',
    description: 'Understand the problem domain, context, and stakeholder needs.',
    isAgnostic: true,
    requiredInputs: ['project name', 'problem statement'],
    outputFiles: [
      'context-motivation.md',
      'system-vision.md',
      'actors.md',
      'needs-expectations.md',
    ],
    dependencies: [0],
  },
  {
    index: 2,
    code: 'R',
    name: 'Requirements',
    folder: '02-requirements',
    description: 'Define functional and non-functional requirements.',
    isAgnostic: true,
    requiredInputs: ['Phase 1 output', 'glossary'],
    outputFiles: [
      'glossary.md',
      'fr-*.md',
      'rnf-*.md',
      'priority-matrix.md',
      'scope-boundaries.md',
    ],
    dependencies: [1],
  },
  {
    index: 3,
    code: 'S',
    name: 'Design',
    folder: '03-design',
    description: 'Define strategic design, bounded contexts, and UI approach.',
    isAgnostic: true,
    requiredInputs: ['Phase 2 output', 'bounded contexts'],
    outputFiles: [
      'strategic-design.md',
      'system-flows.md',
      'bounded-contexts/*.md',
    ],
    dependencies: [2],
  },
  {
    index: 4,
    code: 'M',
    name: 'Data Model',
    folder: '04-data-model',
    description: 'Define entities, relationships, and ERD.',
    isAgnostic: true,
    requiredInputs: ['Phase 3 output', 'aggregates'],
    outputFiles: ['entities.md', 'relationships.md', 'ERD'],
    dependencies: [3],
  },
  {
    index: 5,
    code: 'P',
    name: 'Planning',
    folder: '05-planning',
    description: 'Create roadmap, epics, and sprint planning.',
    isAgnostic: true,
    requiredInputs: ['Phase 4 output', 'entities'],
    outputFiles: [
      'roadmap.md',
      'epics.md',
      'milestones.md',
      'versioning-strategy.md',
    ],
    dependencies: [4],
  },
  {
    index: 6,
    code: 'V',
    name: 'Development',
    folder: '06-development',
    description: 'Implement code following DDD + Hexagonal Architecture.',
    isAgnostic: false,
    requiredInputs: ['Phase 5 output', 'roadmap'],
    outputFiles: [
      'architecture.md',
      'api-reference.md',
      'coding-standards.md',
      'adr/*.md',
    ],
    dependencies: [5],
  },
  {
    index: 7,
    code: 'T',
    name: 'Testing',
    folder: '07-testing',
    description: 'Define test strategy and test cases.',
    isAgnostic: false,
    requiredInputs: ['Phase 6 output', 'architecture'],
    outputFiles: [
      'test-strategy.md',
      'test-plan.md',
      'unit-tests.md',
      'integration-tests.md',
    ],
    dependencies: [6],
  },
  {
    index: 8,
    code: 'B',
    name: 'Deployment',
    folder: '08-deployment',
    description: 'Define CI/CD, environments, and release process.',
    isAgnostic: false,
    requiredInputs: ['Phase 7 output', 'test strategy'],
    outputFiles: [
      'ci-cd-pipeline.md',
      'environments.md',
      'release-process.md',
      'rollback-procedures.md',
    ],
    dependencies: [7],
  },
  {
    index: 9,
    code: 'O',
    name: 'Operations',
    folder: '09-operations',
    description: 'Define runbooks and incident response procedures.',
    isAgnostic: false,
    requiredInputs: ['Phase 8 output', 'pipeline'],
    outputFiles: [
      'runbooks/*.md',
      'incident-response.md',
      'sla.md',
      'on-call.md',
    ],
    dependencies: [8],
  },
  {
    index: 10,
    code: 'N',
    name: 'Monitoring',
    folder: '10-monitoring',
    description: 'Define metrics, alerts, and dashboards.',
    isAgnostic: false,
    requiredInputs: ['Phase 9 output', 'SLAs'],
    outputFiles: ['metrics.md', 'alerts.md', 'dashboards.md'],
    dependencies: [9],
  },
  {
    index: 11,
    code: 'F',
    name: 'Feedback',
    folder: '11-feedback',
    description: 'Define retrospective and user feedback collection.',
    isAgnostic: false,
    requiredInputs: ['All previous phases'],
    outputFiles: [
      'retrospectives/*.md',
      'user-feedback.md',
      'lessons-learned.md',
    ],
    dependencies: [10],
  },
];

export class PhaseEngine {
  getPhase(index: number): PhaseDefinition {
    const phase = PHASES[index];
    if (!phase) {
      throw new Error('Invalid phase index: ' + index + '. Must be 0-11.');
    }
    return phase;
  }

  getAllPhases(): PhaseDefinition[] {
    return PHASES;
  }

  getPhaseByCode(code: string): PhaseDefinition | undefined {
    return PHASES.find((p) => p.code === code);
  }

  getDependencies(phaseIndex: number): PhaseDefinition[] {
    const phase = this.getPhase(phaseIndex);
    return phase.dependencies.map((i) => PHASES[i]!);
  }

  canAdvanceTo(
    fromPhase: number,
    toPhase: number,
    phases: Record<string, PhaseStatusEntry>
  ): { allowed: boolean; severity: 'error' | 'warn' | 'info'; message: string } {
    if (toPhase < 0 || toPhase > 11) {
      return { allowed: false, severity: 'error', message: 'Phase index out of range (0-11).' };
    }

    if (toPhase === fromPhase) {
      return { allowed: true, severity: 'info', message: 'Already on this phase.' };
    }

    if (toPhase < fromPhase) {
      return {
        allowed: true,
        severity: 'warn',
        message: 'Moving backward. Downstream phases may need refresh.',
      };
    }

    if (toPhase > fromPhase + 1) {
      const missingDeps: number[] = [];
      for (let i = fromPhase + 1; i < toPhase; i++) {
        const key = 'phase-' + String(i).padStart(2, '0');
        const status = phases[key];
        if (!status || status.status !== 'complete') {
          missingDeps.push(i);
        }
      }
      if (missingDeps.length > 0) {
        return {
          allowed: true,
          severity: 'warn',
          message:
            'Skipping phases ' +
            missingDeps.join(', ') +
            '. Consider completing them sequentially.',
        };
      }
    }

    if (toPhase === fromPhase + 1) {
      const prevKey = 'phase-' + String(fromPhase).padStart(2, '0');
      const prevStatus = phases[prevKey];
      if (prevStatus?.status !== 'complete') {
        return {
          allowed: true,
          severity: 'warn',
          message:
            'Current phase (' +
            fromPhase +
            ') is not marked complete. Proceed anyway?',
        };
      }
    }

    return { allowed: true, severity: 'info', message: 'OK to advance.' };
  }

  isAgnostic(phaseIndex: number): boolean {
    return this.getPhase(phaseIndex).isAgnostic;
  }

  getAgnosticRange(): { start: number; end: number } {
    const agnostic = PHASES.filter((p) => p.isAgnostic);
    return { start: agnostic[0]!.index, end: agnostic[agnostic.length - 1]!.index };
  }

  getNextIncomplete(fromPhase: number, phases: Record<string, PhaseStatusEntry>): number {
    for (let i = fromPhase; i <= 11; i++) {
      const key = 'phase-' + String(i).padStart(2, '0');
      const status = phases[key];
      if (!status || status.status !== 'complete') {
        return i;
      }
    }
    return 11;
  }

  getProgress(phases: Record<string, PhaseStatusEntry>): {
    total: number;
    complete: number;
    inProgress: number;
    pending: number;
    percentage: number;
  } {
    let complete = 0;
    let inProgress = 0;
    let pending = 0;

    for (let i = 0; i <= 11; i++) {
      const key = 'phase-' + String(i).padStart(2, '0');
      const status = phases[key];
      if (!status) {
        pending++;
      } else if (status.status === 'complete') {
        complete++;
      } else if (status.status === 'in_progress') {
        inProgress++;
      } else {
        pending++;
      }
    }

    return {
      total: 12,
      complete,
      inProgress,
      pending,
      percentage: Math.round((complete / 12) * 100),
    };
  }

  resolveOutputFiles(phaseIndex: number, templateRoot: string): string[] {
    const phase = this.getPhase(phaseIndex);
    const phaseDir = join(templateRoot, '01-templates', phase.folder);
    if (!existsSync(phaseDir)) return phase.outputFiles;

    const realFiles = readdirSync(phaseDir)
      .filter((f) => f.endsWith('.md') || f.endsWith('.json'))
      .sort();

    if (realFiles.length === 0) return phase.outputFiles;
    return realFiles;
  }
}

export const phaseEngine = new PhaseEngine();