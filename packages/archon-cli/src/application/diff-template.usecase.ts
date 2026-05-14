import { join } from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import type { DiffResult, DiffFile } from '../domain/diff/diff.types.js';

export interface DiffTemplateInput {
  fromVersion: string;
  toVersion: string;
  templateBasePath: string;
}

export type { DiffResult };

export class DiffTemplateUseCase {
  execute(input: DiffTemplateInput): DiffResult {
    const { fromVersion, toVersion, templateBasePath } = input;

    const fromPath = join(templateBasePath, fromVersion);
    const toPath = join(templateBasePath, toVersion);

    const fromExists = existsSync(fromPath);
    const toExists = existsSync(toPath);

    if (!fromExists && !toExists) {
      return this.emptyResult(fromVersion, toVersion, [`Neither version '${fromVersion}' nor '${toVersion}' found at ${templateBasePath}`]);
    }

    const fromFiles = fromExists ? this.collectMdFiles(fromPath) : new Map<string, string>();
    const toFiles = toExists ? this.collectMdFiles(toPath) : new Map<string, string>();

    const allPaths = new Set([...fromFiles.keys(), ...toFiles.keys()]);
    const files: DiffFile[] = [];

    for (const rel of allPaths) {
      const fromContent = fromFiles.get(rel);
      const toContent = toFiles.get(rel);

      if (fromContent === undefined) {
        const lines = (toContent ?? '').split('\n').length;
        files.push({ relativePath: rel, status: 'added', toContent, linesAdded: lines, linesRemoved: 0 });
      } else if (toContent === undefined) {
        const lines = fromContent.split('\n').length;
        files.push({ relativePath: rel, status: 'removed', fromContent, linesAdded: 0, linesRemoved: lines });
      } else if (fromContent === toContent) {
        files.push({ relativePath: rel, status: 'unchanged', linesAdded: 0, linesRemoved: 0 });
      } else {
        const { added, removed } = this.countLineDiff(fromContent, toContent);
        files.push({ relativePath: rel, status: 'modified', fromContent, toContent, linesAdded: added, linesRemoved: removed });
      }
    }

    files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

    const breakingChanges = files
      .filter((f) => f.status === 'removed')
      .map((f) => `Removed: ${f.relativePath}`);

    return {
      fromVersion,
      toVersion,
      files,
      totalAdded: files.filter((f) => f.status === 'added').length,
      totalRemoved: files.filter((f) => f.status === 'removed').length,
      totalModified: files.filter((f) => f.status === 'modified').length,
      totalUnchanged: files.filter((f) => f.status === 'unchanged').length,
      breakingChanges,
    };
  }

  private collectMdFiles(dir: string): Map<string, string> {
    const result = new Map<string, string>();
    this.walk(dir, dir, result);
    return result;
  }

  private walk(baseDir: string, currentDir: string, out: Map<string, string>): void {
    try {
      const entries = readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const full = join(currentDir, entry.name);
        if (entry.isDirectory()) {
          this.walk(baseDir, full, out);
        } else if (entry.name.endsWith('.md')) {
          const rel = full.slice(baseDir.length + 1);
          try {
            out.set(rel, readFileSync(full, 'utf-8'));
          } catch { /* skip */ }
        }
      }
    } catch { /* skip */ }
  }

  private countLineDiff(from: string, to: string): { added: number; removed: number } {
    const fromLines = new Set(from.split('\n'));
    const toLines = new Set(to.split('\n'));
    let added = 0;
    let removed = 0;
    for (const l of toLines) { if (!fromLines.has(l)) added++; }
    for (const l of fromLines) { if (!toLines.has(l)) removed++; }
    return { added, removed };
  }

  private emptyResult(fromVersion: string, toVersion: string, breakingChanges: string[]): DiffResult {
    return { fromVersion, toVersion, files: [], totalAdded: 0, totalRemoved: 0, totalModified: 0, totalUnchanged: 0, breakingChanges };
  }
}
