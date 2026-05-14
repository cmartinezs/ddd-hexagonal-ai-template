import { resolve, join } from 'node:path';
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { StateManager } from '../infrastructure/state/state-manager.js';
import { ConfigManager } from '../infrastructure/fs/config-manager.js';
import { templateResolver } from '../infrastructure/cache/index.js';
import type { AgentType } from '../domain/project-state/project-state.types.js';

export interface InitProjectInput {
  projectName: string;
  agent: AgentType;
  templateId?: string;
  templateVersion?: string;
  cwd?: string;
}

export interface InitProjectOutput {
  slug: string;
  projectPath: string;
  templateVersion: string;
  isDev: boolean;
  phaseDirsCount: number;
  error?: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function validateProjectName(name: string): boolean {
  return /^[a-zA-Z0-9\s_-]{1,100}$/.test(name.trim());
}

function copyDirRecursive(src: string, dest: string): void {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export class InitProjectUseCase {
  execute(input: InitProjectInput): InitProjectOutput {
    const { projectName, agent, templateId = 'ddd-hexagonal-ai-template', cwd = process.cwd() } = input;
    let { templateVersion = '0.1.0' } = input;

    if (!validateProjectName(projectName)) {
      return {
        slug: '',
        projectPath: '',
        templateVersion,
        isDev: false,
        phaseDirsCount: 0,
        error: 'Invalid project name: "' + projectName + '". Must be 1-100 chars, alphanumeric, spaces, hyphens, or underscores.',
      };
    }

    const slug = slugify(projectName);
    const projectPath = resolve(cwd, slug);

    if (existsSync(projectPath)) {
      return {
        slug,
        projectPath,
        templateVersion,
        isDev: false,
        phaseDirsCount: 0,
        error: 'Project directory already exists: ' + projectPath,
      };
    }

    let templatePath: string;
    let isDev = false;

    try {
      const resolved = templateResolver.resolve(templateId, templateVersion);
      templatePath = resolved.path;
      templateVersion = resolved.version;
      isDev = resolved.isDev ?? false;
    } catch {
      return {
        slug,
        projectPath,
        templateVersion,
        isDev: false,
        phaseDirsCount: 0,
        error: 'Template not found in cache. Run `archon templates pull` to download the template first.',
      };
    }

    mkdirSync(projectPath, { recursive: true });

    const templateDocs = join(templatePath, '01-templates');
    const projectDocs = join(projectPath, 'docs');
    mkdirSync(projectDocs, { recursive: true });

    let phaseDirsCount = 0;
    if (existsSync(templateDocs)) {
      const phaseDirs = readdirSync(templateDocs, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();

      for (const dir of phaseDirs) {
        mkdirSync(join(projectDocs, dir), { recursive: true });
      }
      phaseDirsCount = phaseDirs.length;
    } else {
      mkdirSync(join(projectDocs, '00-documentation-planning'), { recursive: true });
    }

    const guidesDir = join(projectPath, '.archon', 'guides');
    mkdirSync(guidesDir, { recursive: true });

    const templateGuides = join(templatePath, '00-guides-and-instructions');
    if (existsSync(templateGuides)) {
      copyDirRecursive(templateGuides, guidesDir);
    }

    const rootAgents = join(templatePath, 'AGENTS.md');
    if (existsSync(rootAgents)) {
      const destAgents = join(projectPath, '.archon', 'AGENTS.md');
      copyFileSync(rootAgents, destAgents);
    }

    mkdirSync(join(projectPath, '.archon', 'context'), { recursive: true });
    mkdirSync(join(projectPath, '.archon', 'prompts', 'metadata'), { recursive: true });
    mkdirSync(join(projectPath, '.archon', 'runs'), { recursive: true });

    const stateManager = new StateManager(projectPath);
    stateManager.create({ projectName, projectSlug: slug, agent });

    const configManager = new ConfigManager(projectPath);
    configManager.setAgent(agent);

    templateResolver.createTemplateLock(projectPath, templateId, templateVersion, templatePath);

    return { slug, projectPath, templateVersion, isDev, phaseDirsCount };
  }
}
