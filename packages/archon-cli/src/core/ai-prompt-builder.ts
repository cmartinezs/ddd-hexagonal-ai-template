import { join } from 'node:path';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import type { ArchonState, AgentType, TransportMode } from './types.js';
import { phaseEngine } from './phase-engine.js';
import { templateResolver } from './global-cache/index.js';

export interface PromptOptions {
  phase: number;
  context: 'full' | 'summary' | 'none';
  projectPath: string;
  state: ArchonState;
  agent: AgentType;
  transport: TransportMode;
}

export interface PromptResult {
  content: string;
  filePath: string;
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  id: string;
  phase: number;
  phaseName: string;
  context: string;
  agent: AgentType;
  transport: TransportMode;
  createdAt: string;
  fileSize: number;
  projectName: string;
  projectSlug: string;
}

export class AiPromptBuilder {
  build(options: PromptOptions): PromptResult {
    const { phase, context, projectPath, state, agent, transport } = options;
    const phaseDef = phaseEngine.getPhase(phase);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z';
    const id = `phase-${String(phase).padStart(2, '0')}-${timestamp}`;
    const fileName = `${id}.md`;

    const templateRoot = templateResolver.getLockedTemplatePath(projectPath) ?? this.getFallbackTemplateRoot(projectPath);
    const outputFiles = phaseEngine.resolveOutputFiles(phase, templateRoot);
    const templatePrompt = this.loadPhaseTemplate(phase, templateRoot);

    const lines: string[] = [];

    lines.push(`# AI Prompt — Phase ${phase}: ${phaseDef.name}`);
    lines.push('');
    lines.push(`**Project:** ${state.projectName}`);
    lines.push(`**Slug:** ${state.projectSlug}`);
    lines.push(`**Phase:** ${phase} — ${phaseDef.name}`);
    lines.push(`**Mode:** ${phaseDef.isAgnostic ? 'Agnostic (no technology constraints)' : 'Technology-specific'}`);
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push(`**Agent:** ${agent} | **Transport:** ${transport}`);
    lines.push('');

    if (context === 'full') {
      const templateInfo = this.getTemplateInfo(projectPath);
      if (templateInfo) {
        lines.push('## Template Source');
        lines.push('');
        lines.push(`- Template: ${templateInfo.id}`);
        lines.push(`- Version: ${templateInfo.version}`);
        lines.push(`- Resolved at: ${templateInfo.resolvedAt}`);
        lines.push(`- Cache: ${templateInfo.cachePath}`);
        lines.push('');
      }

      const projectMap = this.getProjectMap(projectPath);
      if (projectMap) {
        lines.push('## Project Structure');
        lines.push('');
        lines.push('```');
        lines.push(projectMap);
        lines.push('```');
        lines.push('');
      }

      lines.push('## Phase Dependencies');
      lines.push('');
      const deps = phaseEngine.getDependencies(phase);
      if (deps.length === 0) {
        lines.push('No dependencies — this is the first phase.');
      } else {
        for (const dep of deps) {
          const depStatus = state.phases[`phase-${String(dep.index).padStart(2, '0')}`];
          const statusMark = depStatus?.status === 'complete' ? '✅' : depStatus?.status === 'in_progress' ? '🔄' : '⏳';
          lines.push(`- ${statusMark} Phase ${dep.index} (${dep.name}) — ${depStatus?.status ?? 'not started'}`);
        }
      }
      lines.push('');

      lines.push('## Current Phase Progress');
      lines.push('');
      const phaseStatus = state.phases[`phase-${String(phase).padStart(2, '0')}`];
      lines.push(`- Status: ${phaseStatus?.status ?? 'not started'}`);
      if (phaseStatus?.startedAt) lines.push(`- Started: ${phaseStatus.startedAt}`);
      if (phaseStatus?.completedAt) lines.push(`- Completed: ${phaseStatus.completedAt}`);
      lines.push(`- Files: ${phaseStatus?.files.length ?? 0} tracked`);
      if (phaseStatus?.files.length) {
        for (const f of phaseStatus.files) {
          lines.push(`  - ${f}`);
        }
      }
      lines.push('');

      lines.push('## Warnings');
      lines.push('');
      if (state.warnings.length === 0) {
        lines.push('No warnings for this phase.');
      } else {
        for (const w of state.warnings) {
          const mark = w.severity === 'error' ? '❌' : w.severity === 'warn' ? '⚠️' : 'ℹ️';
          lines.push(`- ${mark} [${w.severity}] ${w.message}`);
        }
      }
      lines.push('');
    } else if (context === 'summary') {
      const completedPhases = Object.entries(state.phases)
        .filter(([, v]) => v.status === 'complete')
        .map(([k]) => k);
      lines.push(`**Completed phases:** ${completedPhases.length}/12`);
      lines.push('');
    }

    lines.push('## Task');
    lines.push('');
    lines.push(phaseDef.description);
    lines.push('');

    if (templatePrompt) {
      lines.push('## Phase Template Reference');
      lines.push('');
      lines.push('Use the following template guidance for this phase:');
      lines.push('');
      lines.push('```markdown');
      lines.push(templatePrompt.trim());
      lines.push('```');
      lines.push('');
    }

    lines.push('## Required Outputs');
    lines.push('');
    for (const output of outputFiles) {
      lines.push(`- \`${output}\``);
    }
    lines.push('');

    lines.push('## Instructions');
    lines.push('');
    if (context !== 'none') {
      lines.push('1. Review the template source and project structure above.');
      lines.push('2. Follow the phase template reference for document structure.');
      lines.push('3. Output files should follow the DDD + Hexagonal Architecture conventions.');
      lines.push('');
    }
    lines.push('1. Create or update the required output files for this phase.');
    lines.push('2. All documentation must be in English unless otherwise specified.');
    lines.push('3. Use Mermaid diagrams for visual representations (e.g., flows, architecture).');
    lines.push('4. Keep lines under 120 characters for readability.');
    lines.push('');
    lines.push('## Transport Instructions');
    lines.push('');
    if (transport === 'file-attachment') {
      lines.push('This prompt was generated by Archon CLI and saved as a file attachment.');
      lines.push('Attach the following files to your AI session:');
      lines.push(`- This prompt: \`.archon/prompts/${fileName}\``);
      lines.push('- Project context: `.archon/context/project-context.md`');
      lines.push('- Project map: `.archon/context/project-map.json`');
    } else if (transport === 'attach') {
      lines.push('Use the persistent server mode (--attach) to avoid cold boot of MCPs/plugins.');
      lines.push('Connect to the server URL provided when starting the session.');
    } else {
      lines.push('This prompt is provided via stdin. Process it directly.');
    }
    lines.push('');

    lines.push('---');
    lines.push(`*Generated by Archon CLI v${state.archonVersion} | Phase ${phase} | ${new Date().toISOString()}*`);

    const content = lines.join('\n');
    const promptsDir = join(projectPath, '.archon', 'prompts');

    return {
      content,
      filePath: join(promptsDir, fileName),
      metadata: {
        id,
        phase,
        phaseName: phaseDef.name,
        context,
        agent,
        transport,
        createdAt: new Date().toISOString(),
        fileSize: Buffer.byteLength(content, 'utf-8'),
        projectName: state.projectName,
        projectSlug: state.projectSlug,
      },
    };
  }

  private getTemplateInfo(projectPath: string): { id: string; version: string; resolvedAt: string; cachePath: string } | null {
    const lockPath = join(projectPath, '.archon', 'template.lock.json');
    if (!existsSync(lockPath)) return null;
    try {
      const raw = readFileSync(lockPath, 'utf-8');
      const lock = JSON.parse(raw);
      return lock.template;
    } catch {
      return null;
    }
  }

  private getProjectMap(projectPath: string): string | null {
    const mapPath = join(projectPath, '.archon', 'context', 'project-map.json');
    if (!existsSync(mapPath)) {
      return this.generateBasicMap(projectPath);
    }
    try {
      const raw = readFileSync(mapPath, 'utf-8');
      const data = JSON.parse(raw);
      return this.formatProjectMap(data);
    } catch {
      return this.generateBasicMap(projectPath);
    }
  }

  private generateBasicMap(projectPath: string): string {
    const lines: string[] = [];
    const docsPath = join(projectPath, 'docs');
    if (!existsSync(docsPath)) {
      return `${projectPath}/\n  (no docs/ directory yet)`;
    }

    lines.push(`${projectPath}/`);
    lines.push('├── docs/');

    try {
      const entries = readdirSync(docsPath, { withFileTypes: true });
      for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
        if (entry.isDirectory()) {
          lines.push(`│   ├── ${entry.name}/`);
        } else {
          lines.push(`│   ├── ${entry.name}`);
        }
      }
    } catch {
      lines.push('│   (empty)');
    }

    lines.push('├── .archon/');
    lines.push('│   ├── context/');
    lines.push('│   ├── prompts/');
    lines.push('│   ├── runs/');
    lines.push('│   ├── config.json');
    lines.push('│   ├── state.json');
    lines.push('│   └── template.lock.json');
    return lines.join('\n');
  }

  private formatProjectMap(data: Record<string, unknown>): string {
    const lines: string[] = [];
    const formatEntry = (obj: Record<string, unknown>, prefix = ''): void => {
      const entries = Object.entries(obj);
      entries.forEach(([key, value], idx) => {
        const isLastEntry = idx === entries.length - 1;
        const connector = isLastEntry ? '└── ' : '├── ';
        const childPrefix = isLastEntry ? '    ' : '│   ';
        lines.push(`${prefix}${connector}${key}`);
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          formatEntry(value as Record<string, unknown>, prefix + childPrefix);
        }
      });
    };

    lines.push('./');
    formatEntry(data, '');
    return lines.join('\n');
  }

  private loadPhaseTemplate(phase: number, templateRoot: string): string | null {
    const phaseDef = phaseEngine.getPhase(phase);
    const templateReadme = join(templateRoot, '01-templates', phaseDef.folder, 'README.md');

    if (!existsSync(templateReadme)) {
      const templateMd = join(templateRoot, '01-templates', phaseDef.folder, 'TEMPLATE.md');
      if (existsSync(templateMd)) {
        return this.extractTemplateContent(templateMd);
      }
      return this.getDefaultPhaseTemplate(phase);
    }

    return this.extractTemplateContent(templateReadme);
  }

  private getFallbackTemplateRoot(projectPath: string): string {
    const parts = projectPath.split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      const candidate = parts.slice(0, i + 1).join('/');
      if (existsSync(join(candidate, '01-templates'))) {
        return candidate;
      }
    }
    return projectPath;
  }

  private extractTemplateContent(filePath: string): string | null {
    if (!existsSync(filePath)) return null;
    try {
      const raw = readFileSync(filePath, 'utf-8');
      const match = raw.match(/---[\s\S]*?---\n([\s\S]*)/);
      return match ? match[1]!.trim() : raw.trim();
    } catch {
      return null;
    }
  }

  private getDefaultPhaseTemplate(phase: number): string {
    const templates: Record<number, string> = {
      0: 'Define the documentation scope, goals, and structure. Identify the problem space, target audience, and success criteria. Create a macro plan with all 12 SDLC phases.',
      1: 'Analyze the problem domain. Identify stakeholders, actors, and their needs. Create context diagrams and a system vision document. Understand the motivation behind the project.',
      2: 'Define functional requirements (FR) as user stories and non-functional requirements (NFR). Create a glossary of domain terms. Define scope boundaries and priority matrix.',
      3: 'Perform strategic design using DDD patterns. Identify bounded contexts, subdomains, and context maps. Define system flows and architectural approach.',
      4: 'Define the data model: entities, value objects, aggregates, and their relationships. Create ERD diagrams. Ensure alignment with bounded contexts.',
      5: 'Create the project roadmap with epics, milestones, and versioning strategy. Plan sprints and releases. Align with business objectives.',
      6: 'Implement code following DDD + Hexagonal Architecture. Define ports, adapters, domain entities, and application services. Document API contracts.',
      7: 'Define the test strategy. Create unit, integration, and E2E test plans. Establish coverage targets and testing workflows.',
      8: 'Define CI/CD pipelines, environments (dev/staging/prod), and release procedures. Document rollback procedures and deployment automation.',
      9: 'Create operational runbooks, incident response procedures, SLAs, and on-call schedules. Document daily operations.',
      10: 'Define metrics, alerts, and dashboards. Set up monitoring for system health, performance, and business KPIs.',
      11: 'Define retrospective formats, user feedback collection methods, and lessons-learned processes. Establish continuous improvement workflows.',
    };
    return templates[phase] ?? 'No template available for this phase.';
  }
}

export const aiPromptBuilder = new AiPromptBuilder();
