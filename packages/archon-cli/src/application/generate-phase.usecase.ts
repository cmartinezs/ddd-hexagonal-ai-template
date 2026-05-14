import { join } from 'node:path';
import { existsSync, readdirSync, copyFileSync, mkdirSync } from 'node:fs';
import { phaseEngine } from '../domain/phase/phase-engine.js';
import { templateResolver } from '../infrastructure/cache/index.js';

export interface GeneratePhaseInput {
  projectPath: string;
  phase: number;
  force?: boolean;
}

export interface GeneratedFile {
  file: string;
  action: 'created' | 'skipped' | 'overwritten';
}

export interface GeneratePhaseOutput {
  phase: number;
  phaseName: string;
  phaseFolder: string;
  files: GeneratedFile[];
  error?: string;
}

export class GeneratePhaseUseCase {
  execute(input: GeneratePhaseInput): GeneratePhaseOutput {
    const { projectPath, phase, force = false } = input;

    if (phase < 0 || phase > 11) {
      return { phase, phaseName: '', phaseFolder: '', files: [], error: 'Invalid phase: ' + phase + '. Must be 0-11.' };
    }

    const phaseDef = phaseEngine.getPhase(phase);
    const phaseFolder = phaseDef.folder;

    const templatePath = templateResolver.getLockedTemplatePath(projectPath);
    if (!templatePath) {
      return { phase, phaseName: phaseDef.name, phaseFolder, files: [], error: 'No template lock found. Run `archon init` or `archon templates pull` first.' };
    }

    const templatePhaseDir = join(templatePath, '01-templates', phaseFolder);
    if (!existsSync(templatePhaseDir)) {
      return { phase, phaseName: phaseDef.name, phaseFolder, files: [], error: 'Template folder not found for phase ' + phase + ': ' + templatePhaseDir };
    }

    const destDir = join(projectPath, 'docs', phaseFolder);
    mkdirSync(destDir, { recursive: true });

    const templateFiles = this.collectTemplateFiles(templatePhaseDir);
    const results: GeneratedFile[] = [];

    for (const relPath of templateFiles) {
      const src = join(templatePhaseDir, relPath);
      const dest = join(destDir, relPath);

      mkdirSync(join(dest, '..'), { recursive: true });

      if (existsSync(dest) && !force) {
        results.push({ file: relPath, action: 'skipped' });
      } else {
        const action = existsSync(dest) ? 'overwritten' : 'created';
        copyFileSync(src, dest);
        results.push({ file: relPath, action });
      }
    }

    return { phase, phaseName: phaseDef.name, phaseFolder, files: results };
  }

  private collectTemplateFiles(dir: string, rel = ''): string[] {
    const results: string[] = [];
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const entryRel = rel ? rel + '/' + entry.name : entry.name;
        if (entry.isDirectory()) {
          results.push(...this.collectTemplateFiles(join(dir, entry.name), entryRel));
        } else if (entry.name.endsWith('.md')) {
          results.push(entryRel);
        }
      }
    } catch { /* skip unreadable dirs */ }
    return results;
  }
}
