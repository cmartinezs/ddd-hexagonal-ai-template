import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { phaseEngine } from './phase-engine.js';
import type { PhaseStatusEntry } from './types.js';

const TECHNOLOGY_PATTERNS = [
  /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|DynamoDB|Cassandra|SQLite|Oracle)\b/i,
  /\b(React|Vue|Angular|Svelte|Next\.js|Nuxt\.js|Gatsby|Astro)\b/i,
  /\b(Node\.js|Deno|Bun|Python|Go|Rust|Java|C#|\.NET|Kotlin|Swift|Ruby)\b/i,
  /\b(Express|Fastify|Nest\.js|Django|Flask|Rails|Laravel|Spring)\b/i,
  /\b(Docker|Kubernetes|Helm|Terraform|Ansible|AWS|Azure|GCP|K8s)\b/i,
  /\b(GraphQL|REST|gRPC|WebSocket|SSE|Server-Sent)\b/i,
  /\b(Jest|Vitest|Cypress|Playwright|Selenium|Pytest|JUnit|RSpec)\b/i,
  /\b(GitHub|GitLab|Bitbucket|CI\/CD|Jenkins|CircleCI|GitHub Actions)\b/i,
  /\b(Vercel|Netlify|Cloudflare|Heroku|Fly\.io|Railway)\b/i,
  /\b(Prisma|TypeORM|Sequelize|Bookshelf|Knex)\b/i,
  /\b(Tailwind|Bootstrap|Material UI|Ant Design|Chakra)\b/i,
  /\b(HTML5|CSS3|SASS|Less|Stylus)\b/i,
  /\b(Express\.js|NestJS)\b/i,
];

export type Severity = 'error' | 'warn' | 'info';

export interface Constraint {
  id: string;
  severity: Severity;
  message: string;
  phase?: number;
}

export interface ValidationResult {
  phase: number;
  constraints: Constraint[];
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ValidatorOptions {
  basePath?: string;
  strict?: boolean;
  omit?: string[];
}

export class Validator {
  private basePath: string;
  private strict: boolean;
  private omit: string[];

  constructor(options: ValidatorOptions = {}) {
    this.basePath = options.basePath || process.cwd();
    this.strict = options.strict ?? false;
    this.omit = options.omit ?? [];
  }

  validate(phaseIndex: number): ValidationResult {
    const phase = phaseEngine.getPhase(phaseIndex);
    const constraints: Constraint[] = [];

    this.checkPhaseFiles(phase, constraints);
    this.checkDependencies(phaseIndex, constraints);
    this.checkAgnosticBoundary(phaseIndex, constraints);

    const errors = constraints.filter((c) => c.severity === 'error').map((c) => c.message);
    const warnings = constraints.filter((c) => c.severity === 'warn').map((c) => c.message);
    const suggestions = constraints.filter((c) => c.severity === 'info').map((c) => c.message);

    return { phase: phaseIndex, constraints, errors, warnings, suggestions };
  }

  private checkPhaseFiles(phase: ReturnType<typeof phaseEngine.getPhase>, constraints: Constraint[]): void {
    const phasePath = join(this.basePath, 'docs', phase.folder);

    if (!existsSync(phasePath)) {
      constraints.push({
        id: 'missing-folder',
        severity: 'warn',
        message: 'Phase folder does not exist: ' + phase.folder,
        phase: phase.index,
      });
      return;
    }

    const templateFiles = phase.outputFiles
      .filter((f) => !f.includes('*'))
      .map((f) => f.replace(/\.md$/, ''));

    if (templateFiles.length > 0) {
      try {
        const files = readdirSync(phasePath).filter((f) => f.endsWith('.md'));

        for (const pattern of templateFiles) {
          const found = files.some((f) => f.toLowerCase().includes(pattern.toLowerCase()));
          if (!found) {
            constraints.push({
              id: 'missing-file',
              severity: 'warn',
              message: 'Expected file pattern not found: ' + pattern + ' in ' + phase.folder,
              phase: phase.index,
            });
          }
        }
      } catch {
        constraints.push({
          id: 'folder-access',
          severity: 'error',
          message: 'Cannot read phase folder: ' + phase.folder,
          phase: phase.index,
        });
      }
    }
  }

  private checkDependencies(phaseIndex: number, constraints: Constraint[]): void {
    if (phaseIndex === 0) return;

    const deps = phaseEngine.getDependencies(phaseIndex);
    for (const dep of deps) {
      const phasePath = join(this.basePath, dep.folder);
      const statusFile = join(phasePath, '.status');

      if (!existsSync(phasePath)) {
        constraints.push({
          id: 'missing-dependency-folder',
          severity: 'error',
          message: 'Missing dependency folder: ' + dep.folder,
          phase: phaseIndex,
        });
      } else if (!existsSync(statusFile)) {
        constraints.push({
          id: 'incomplete-dependency',
          severity: 'warn',
          message: 'Dependency phase ' + dep.index + ' (' + dep.name + ') may not be complete',
          phase: phaseIndex,
        });
      }
    }
  }

  private checkAgnosticBoundary(phaseIndex: number, constraints: Constraint[]): void {
    if (!phaseEngine.isAgnostic(phaseIndex)) return;

    const phase = phaseEngine.getPhase(phaseIndex);
    const phasePath = join(this.basePath, 'docs', phase.folder);

    if (!existsSync(phasePath)) return;

    try {
      const files = readdirSync(phasePath).filter((f) => f.endsWith('.md'));

      for (const file of files) {
        const content = readFileSync(join(phasePath, file), 'utf-8');
        let found: string | null = null;

        for (const pattern of TECHNOLOGY_PATTERNS) {
          const match = content.match(pattern);
          if (match) {
            found = match[0]!;
            break;
          }
        }

          if (!found) continue;
        if (this.omit.some((n) => n.toLowerCase().includes(found!.toLowerCase()))) continue;

        constraints.push({
          id: 'agnostic-violation',
          severity: 'error',
          message:
            'Technology name "' +
            found +
            '" found in phase ' +
            phaseIndex +
            ' (' +
            file +
            '). Phases 0-5 must be technology-agnostic.',
          phase: phaseIndex,
        });
      }
    } catch {
      // non-fatal
    }

    if (!this.strict) {
      for (const c of constraints) {
        if (c.id === 'agnostic-violation' && c.severity === 'error') {
          c.severity = 'warn';
        }
      }
    }
  }

  validateAll(_phases: Record<string, PhaseStatusEntry>): ValidationResult[] {
    const all: ValidationResult[] = [];
    for (let i = 0; i <= 11; i++) {
      all.push(this.validate(i));
    }
    return all;
  }
}

export const validator = new Validator();