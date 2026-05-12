import { join } from 'node:path';
import { readFileSync, readdirSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import type { ArchonState } from './types.js';
import { PHASES } from './phase-engine.js';

export interface ScanResult {
  projectName: string;
  projectSlug: string;
  completedPhases: number[];
  inProgressPhases: number[];
  pendingPhases: number[];
  techStack: string[];
  glossary: string[];
  warnings: string[];
  fileCount: number;
  totalSize: number;
}

export interface ProjectMap {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: ProjectMap[];
  size?: number;
  modifiedAt?: string;
}

export class ContextScanner {
  scan(projectPath: string, state: ArchonState): ScanResult {
    const techStack = this.detectTechStack(projectPath);
    const glossary = this.extractGlossary(projectPath);
    const warnings = this.validateStructure(projectPath, state);

    const completedPhases: number[] = [];
    const inProgressPhases: number[] = [];
    const pendingPhases: number[] = [];

    for (const [key, entry] of Object.entries(state.phases)) {
      const num = parseInt(key.replace('phase-', ''), 10);
      if (isNaN(num)) continue;
      if (entry.status === 'complete') completedPhases.push(num);
      else if (entry.status === 'in_progress') inProgressPhases.push(num);
    }

    for (let i = 0; i <= 11; i++) {
      if (!completedPhases.includes(i) && !inProgressPhases.includes(i)) {
        pendingPhases.push(i);
      }
    }

    const { fileCount, totalSize } = this.countProjectFiles(projectPath);

    return {
      projectName: state.projectName,
      projectSlug: state.projectSlug,
      completedPhases,
      inProgressPhases,
      pendingPhases,
      techStack,
      glossary,
      warnings,
      fileCount,
      totalSize,
    };
  }

  private detectTechStack(projectPath: string): string[] {
    const stack: string[] = [];
    const checks: Array<[string, string]> = [
      ['package.json', 'Node.js'],
      ['Cargo.toml', 'Rust'],
      ['go.mod', 'Go'],
      ['pom.xml', 'Java'],
      ['requirements.txt', 'Python'],
      ['pyproject.toml', 'Python'],
      ['Gemfile', 'Ruby'],
      ['composer.json', 'PHP'],
      ['*.csproj', 'C#'],
      ['tsconfig.json', 'TypeScript'],
      ['docker-compose.yml', 'Docker'],
      ['Dockerfile', 'Docker'],
      ['Makefile', 'Make'],
      ['*.tf', 'Terraform'],
    ];

    const docsPath = join(projectPath, 'docs');
    if (existsSync(docsPath)) {
      for (const phase of PHASES) {
        if (!phase.isAgnostic && existsSync(join(docsPath, phase.folder))) {
          const phaseContent = this.readPhaseContent(join(docsPath, phase.folder));
          for (const [file, label] of checks) {
            if (file.includes('*')) continue;
            if (phaseContent.some((c) => c.includes(label))) {
              if (!stack.includes(label)) stack.push(label);
            }
          }
        }
      }
    }

    if (stack.length === 0) {
      stack.push('unspecified (phases 0-5 are agnostic)');
    }

    return stack;
  }

  private readPhaseContent(phasePath: string): string[] {
    const content: string[] = [];
    try {
      const entries = readdirSync(phasePath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.json'))) {
          try {
            const raw = readFileSync(join(phasePath, entry.name), 'utf-8');
            content.push(raw);
          } catch {
            // skip
          }
        }
      }
    } catch {
      // skip
    }
    return content;
  }

  private extractGlossary(projectPath: string): string[] {
    const glossary: string[] = [];
    const glossaryPath = join(projectPath, 'docs', '02-requirements', 'glossary.md');
    if (existsSync(glossaryPath)) {
      try {
        const raw = readFileSync(glossaryPath, 'utf-8');
        const terms = raw.match(/^###\s+.+$/gm);
        if (terms) {
          glossary.push(...terms.map((t) => t.replace(/^###\s+/, '')));
        }
      } catch {
        // skip
      }
    }
    return glossary;
  }

  private validateStructure(projectPath: string, state: ArchonState): string[] {
    const warnings: string[] = [];

    const docsPath = join(projectPath, 'docs');
    if (!existsSync(docsPath)) {
      warnings.push('docs/ directory not found');
    }

    const expectedFolders = PHASES.map((p) => p.folder);
    const missing: string[] = [];
    for (const folder of expectedFolders) {
      if (!existsSync(join(docsPath, folder))) {
        missing.push(folder);
      }
    }

    if (missing.length > 0 && missing.length < 12) {
      warnings.push(`Missing phase folders: ${missing.join(', ')}`);
    }

    if (state.warnings.length > 0) {
      warnings.push(...state.warnings.map((w) => `[${w.severity}] ${w.message}`));
    }

    return warnings;
  }

  private countProjectFiles(projectPath: string): { fileCount: number; totalSize: number } {
    let fileCount = 0;
    let totalSize = 0;

    const count = (dir: string): void => {
      try {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.archon') continue;
          const fullPath = join(dir, entry.name);
          if (entry.isDirectory()) {
            count(fullPath);
          } else {
            fileCount++;
            try {
              totalSize += statSync(fullPath).size;
            } catch {
              // skip
            }
          }
        }
      } catch {
        // skip
      }
    };

    count(projectPath);
    return { fileCount, totalSize };
  }

  generateContextFile(projectPath: string, state: ArchonState): string {
    const scan = this.scan(projectPath, state);
    const lines: string[] = [];

    lines.push(`# Project Context — ${scan.projectName}`);
    lines.push('');
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push(`**Project:** ${scan.projectName} (\`${scan.projectSlug}\`)`);
    lines.push(`**Current Phase:** ${state.currentPhase} — ${PHASES[state.currentPhase]?.name ?? 'Unknown'}`);
    lines.push('');

    lines.push('## Phase Status');
    lines.push('');
    lines.push('```');
    lines.push(`Completed:    ${scan.completedPhases.length}/12 (${scan.completedPhases.join(', ') || 'none'})`);
    lines.push(`In Progress:  ${scan.inProgressPhases.length} (${scan.inProgressPhases.join(', ') || 'none'})`);
    lines.push(`Pending:      ${scan.pendingPhases.length} (${scan.pendingPhases.join(', ') || 'none'})`);
    lines.push('```');
    lines.push('');

    lines.push('## Phase Overview');
    lines.push('');
    for (let i = 0; i <= 11; i++) {
      const phase = PHASES[i]!;
      const key = `phase-${String(i).padStart(2, '0')}`;
      const status = state.phases[key];
      const mark = status?.status === 'complete' ? '✅' : status?.status === 'in_progress' ? '🔄' : '⏳';
      const techNote = phase.isAgnostic ? '(agnostic)' : '(tech-specific)';
      lines.push(`- ${mark} Phase ${i}: ${phase.name} ${techNote}`);
    }
    lines.push('');

    lines.push('## Technology Stack');
    lines.push('');
    for (const tech of scan.techStack) {
      lines.push(`- ${tech}`);
    }
    lines.push('');

    if (scan.glossary.length > 0) {
      lines.push(`## Domain Glossary (${scan.glossary.length} terms)`);
      lines.push('');
      for (const term of scan.glossary.slice(0, 20)) {
        lines.push(`- ${term}`);
      }
      if (scan.glossary.length > 20) {
        lines.push(`- ... and ${scan.glossary.length - 20} more (see \`docs/02-requirements/glossary.md\`)`);
      }
      lines.push('');
    }

    lines.push('## Project Metrics');
    lines.push('');
    lines.push(`- Total files: ${scan.fileCount}`);
    lines.push(`- Total size: ${this.formatBytes(scan.totalSize)}`);
    lines.push(`- Glossary terms: ${scan.glossary.length}`);
    lines.push(`- Warnings: ${scan.warnings.length}`);
    lines.push('');

    if (scan.warnings.length > 0) {
      lines.push('## Warnings');
      lines.push('');
      for (const w of scan.warnings) {
        lines.push(`- ${w}`);
      }
      lines.push('');
    }

    lines.push('## AI Agent Guidance');
    lines.push('');
    lines.push('When working on this project:');
    lines.push('1. Check the current phase status with `archon status`');
    lines.push('2. Generate a phase prompt with `archon prompt --phase <N>`');
    lines.push('3. Run `archon check --phase <N>` to validate before moving forward');
    lines.push('4. Use `archon next --phase <N>` to advance phases');
    lines.push('');
    lines.push(`*Context generated by Archon CLI | ${new Date().toISOString()}*`);

    return lines.join('\n');
  }

  generateProjectMap(projectPath: string): ProjectMap {
    return this.buildMap(projectPath, projectPath);
  }

  private buildMap(root: string, current: string, name = 'project'): ProjectMap {
    const info: ProjectMap = {
      name,
      path: current,
      type: 'directory',
      children: [],
    };

    try {
      const entries = readdirSync(current, { withFileTypes: true });
      const sorted = entries
        .filter((e) => !e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== '__pycache__')
        .sort((a, b) => {
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        });

      for (const entry of sorted) {
        const fullPath = join(current, entry.name);
        if (entry.isDirectory()) {
          const child = this.buildMap(root, fullPath, entry.name);
          child.path = '/' + fullPath.replace(root + '/', '');
          info.children!.push(child);
        } else {
          let size: number | undefined;
          try {
            size = statSync(fullPath).size;
          } catch {
            // skip
          }
          info.children!.push({
            name: entry.name,
            path: '/' + fullPath.replace(root + '/', ''),
            type: 'file',
            size,
            modifiedAt: statSync(fullPath).mtime.toISOString(),
          });
        }
      }
    } catch {
      // skip
    }

    return info;
  }

  saveContext(projectPath: string, state: ArchonState): { contextPath: string; mapPath: string } {
    const contextDir = join(projectPath, '.archon', 'context');
    mkdirSync(contextDir, { recursive: true });

    const contextPath = join(contextDir, 'project-context.md');
    const mapPath = join(contextDir, 'project-map.json');

    const context = this.generateContextFile(projectPath, state);
    writeFileSync(contextPath, context, 'utf-8');

    const projectMap = this.generateProjectMap(projectPath);
    writeFileSync(mapPath, JSON.stringify(projectMap, null, 2), 'utf-8');

    const snapshotDir = join(contextDir, 'snapshots');
    mkdirSync(snapshotDir, { recursive: true });
    const snapshotName = new Date().toISOString().replace(/[:.]/g, '-') + '.json';
    writeFileSync(join(snapshotDir, snapshotName), JSON.stringify(projectMap, null, 2), 'utf-8');

    return { contextPath, mapPath };
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]!;
  }
}

export const contextScanner = new ContextScanner();
