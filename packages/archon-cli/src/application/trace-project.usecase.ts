import { join } from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { phaseEngine } from '../domain/phase/phase-engine.js';
import type { TraceMatrix, TraceTerm } from '../domain/traceability/traceability.types.js';

export interface TraceProjectInput {
  projectPath: string;
}

export type { TraceMatrix };

export class TraceProjectUseCase {
  execute(input: TraceProjectInput): TraceMatrix {
    const { projectPath } = input;
    const docsDir = join(projectPath, 'docs');

    const phases = phaseEngine.getAllPhases();
    const phaseFiles: Map<number, string[]> = new Map();

    for (const phase of phases) {
      const phaseDir = join(docsDir, phase.folder);
      if (existsSync(phaseDir)) {
        phaseFiles.set(phase.index, this.collectMdFiles(phaseDir));
      }
    }

    const termsByPhase: Map<number, Set<string>> = new Map();
    for (const [phaseIndex, files] of phaseFiles) {
      const terms = new Set<string>();
      for (const file of files) {
        this.extractTerms(file).forEach((t) => terms.add(t));
      }
      termsByPhase.set(phaseIndex, terms);
    }

    const traceTerms: TraceTerm[] = [];
    for (const [defPhase, terms] of termsByPhase) {
      const defFiles = phaseFiles.get(defPhase) ?? [];
      for (const term of terms) {
        const referencedInPhases: number[] = [];
        const referencedInFiles: string[] = [];

        for (const [otherPhase, otherFiles] of phaseFiles) {
          if (otherPhase === defPhase) continue;
          for (const file of otherFiles) {
            try {
              const content = readFileSync(file, 'utf-8');
              if (content.toLowerCase().includes(term.toLowerCase())) {
                if (!referencedInPhases.includes(otherPhase)) referencedInPhases.push(otherPhase);
                if (!referencedInFiles.includes(file)) referencedInFiles.push(file);
              }
            } catch { /* skip */ }
          }
        }

        const definedInFile = defFiles.find((f) => {
          try { return readFileSync(f, 'utf-8').toLowerCase().includes(term.toLowerCase()); } catch { return false; }
        }) ?? '';

        traceTerms.push({ term, definedInPhase: defPhase, definedInFile, referencedInPhases, referencedInFiles });
      }
    }

    const coverage: Record<number, number> = {};
    for (const phase of phases) {
      const phaseTerms = traceTerms.filter((t) => t.definedInPhase === phase.index);
      const traced = phaseTerms.filter((t) => t.referencedInPhases.length > 0).length;
      coverage[phase.index] = phaseTerms.length > 0 ? Math.round((traced / phaseTerms.length) * 100) : 100;
    }

    const tracedTerms = traceTerms.filter((t) => t.referencedInPhases.length > 0).length;

    return {
      terms: traceTerms,
      links: traceTerms.flatMap((t) =>
        t.referencedInPhases.map((rp) => ({
          fromPhase: t.definedInPhase,
          fromFile: t.definedInFile,
          toPhase: rp,
          term: t.term,
        }))
      ),
      coverage,
      totalTerms: traceTerms.length,
      tracedTerms,
    };
  }

  private extractTerms(filePath: string): string[] {
    const terms: string[] = [];
    try {
      const content = readFileSync(filePath, 'utf-8');
      const h2matches = content.match(/^##\s+(.+)$/gm) ?? [];
      for (const h of h2matches) {
        const term = h.replace(/^##\s+/, '').trim();
        if (term.length > 2 && term.length < 80 && !term.match(/^(Contents|Index|Overview|Summary|Table of)$/i)) {
          terms.push(term);
        }
      }
      const boldTerms = content.match(/\*\*([^*]{3,40})\*\*/g) ?? [];
      for (const bt of boldTerms.slice(0, 20)) {
        const term = bt.replace(/\*\*/g, '').trim();
        if (!terms.includes(term)) terms.push(term);
      }
    } catch { /* skip */ }
    return terms;
  }

  private collectMdFiles(dir: string): string[] {
    const results: string[] = [];
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...this.collectMdFiles(full));
        } else if (entry.name.endsWith('.md')) {
          results.push(full);
        }
      }
    } catch { /* skip */ }
    return results;
  }
}
