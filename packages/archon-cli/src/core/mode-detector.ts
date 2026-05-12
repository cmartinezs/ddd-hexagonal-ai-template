import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ARCHON_DIR = '.archon';
const STATE_FILE = 'state.json';

export type ArchonMode = 'user' | 'project' | 'dev' | 'template-cache';

export interface ModeDetectionResult {
  mode: ArchonMode;
  projectName?: string;
  projectPath?: string;
  templatePath?: string;
  templateId?: string;
  templateVersion?: string;
}

export function detectMode(): ModeDetectionResult {
  if (process.env['ARCHON_MODE'] === 'template-cache') {
    return { mode: 'template-cache' };
  }

  if (process.argv.includes('templates')) {
    return { mode: 'template-cache' };
  }

  if (process.env['ARCHON_DEV_TEMPLATE_PATH']) {
    const devPath = process.env['ARCHON_DEV_TEMPLATE_PATH'];
    return {
      mode: 'dev',
      templatePath: devPath,
      templateId: 'ddd-hexagonal-ai-template',
      templateVersion: 'dev',
    };
  }

  const project = findProjectFromState();
  if (project) {
    return {
      mode: 'project',
      projectName: project.name,
      projectPath: project.path,
      templatePath: project.templatePath,
      templateId: project.templateId,
      templateVersion: project.templateVersion,
    };
  }

  return { mode: 'user' };
}

export function detectProjectFromCwd(): ModeDetectionResult {
  const project = findProjectFromState();
  if (project) {
    return {
      mode: 'project',
      projectName: project.name,
      projectPath: project.path,
      templatePath: project.templatePath,
      templateId: project.templateId,
      templateVersion: project.templateVersion,
    };
  }

  return { mode: 'user' };
}

function findProjectFromState(): {
  name: string;
  path: string;
  templatePath?: string;
  templateId?: string;
  templateVersion?: string;
} | null {
  let current = process.cwd();
  const home = process.env['HOME'] || '/';

  while (current !== home && current !== '/') {
    const statePath = resolve(current, ARCHON_DIR, STATE_FILE);
    if (existsSync(statePath)) {
      try {
        const raw = readFileSync(statePath, 'utf-8');
        const state = JSON.parse(raw);

        let templatePath: string | undefined;
        let templateId: string | undefined;
        let templateVersion: string | undefined;

        const lockPath = resolve(current, ARCHON_DIR, 'template.lock.json');
        if (existsSync(lockPath)) {
          try {
            const lockRaw = readFileSync(lockPath, 'utf-8');
            const lock = JSON.parse(lockRaw);
            templatePath = lock.template?.cachePath;
            templateId = lock.template?.id;
            templateVersion = lock.template?.version;
          } catch {
            // no lock
          }
        }

        return {
          name: state.projectName,
          path: current,
          templatePath,
          templateId,
          templateVersion,
        };
      } catch {
        return { name: current, path: current };
      }
    }

    const parent = resolve(current, '..');
    if (parent === current) break;
    current = parent;
  }

  return null;
}

export function requireProject(): string {
  const mode = detectMode();
  if (mode.mode !== 'project' || !mode.projectPath) {
    throw new Error(
      'No Archon project found.\n\n' +
      'Run one of:\n' +
      '  archon init --name "My Project"\n' +
      '  cd <existing-project>'
    );
  }
  return mode.projectPath;
}

export function getStateFilePath(projectPath?: string): string {
  const base = projectPath || process.cwd();
  return resolve(base, ARCHON_DIR, STATE_FILE);
}

export function getChecksumFilePath(projectPath?: string): string {
  const base = projectPath || process.cwd();
  return resolve(base, ARCHON_DIR, 'state.checksum');
}

export function getProjectArchonDir(projectPath?: string): string {
  const base = projectPath || process.cwd();
  return resolve(base, ARCHON_DIR);
}