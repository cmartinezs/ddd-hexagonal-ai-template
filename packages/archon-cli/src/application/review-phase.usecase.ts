import { join } from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { phaseEngine } from '../domain/phase/phase-engine.js';
import type { ReviewResult, FileReviewResult, ReviewIssue } from '../domain/quality/quality.types.js';

export interface ReviewPhaseInput {
  projectPath: string;
  phase: number;
}

export type { ReviewResult };

const AMBIGUITY_PATTERNS = [
  { pattern: /\bTBD\b/gi, code: 'AMBIGUOUS_TBD', message: 'Contains "TBD" placeholder' },
  { pattern: /\bTODO\b/gi, code: 'AMBIGUOUS_TODO', message: 'Contains "TODO" placeholder' },
  { pattern: /\[placeholder\]/gi, code: 'AMBIGUOUS_PLACEHOLDER', message: 'Contains "[placeholder]" text' },
  { pattern: /Lorem ipsum/gi, code: 'AMBIGUOUS_LOREM', message: 'Contains Lorem ipsum text' },
  { pattern: /\[insert[^\]]*\]/gi, code: 'AMBIGUOUS_INSERT', message: 'Contains "[insert...]" placeholder' },
  { pattern: /\[YOUR[^\]]*\]/gi, code: 'AMBIGUOUS_YOURTEXT', message: 'Contains "[YOUR...]" placeholder' },
];

export class ReviewPhaseUseCase {
  execute(input: ReviewPhaseInput): ReviewResult {
    const { projectPath, phase } = input;
    const phaseDef = phaseEngine.getPhase(phase);
    const phaseDir = join(projectPath, 'docs', phaseDef.folder);

    if (!existsSync(phaseDir)) {
      return {
        phase,
        phaseName: phaseDef.name,
        overallScore: 0,
        files: [],
        totalIssues: 1,
        errors: 1,
        warnings: 0,
      };
    }

    const mdFiles = this.collectMdFiles(phaseDir);
    const fileResults: FileReviewResult[] = [];

    for (const filePath of mdFiles) {
      fileResults.push(this.reviewFile(filePath, phaseDir));
    }

    const totalScore = fileResults.length > 0
      ? Math.round(fileResults.reduce((s, f) => s + f.score, 0) / fileResults.length)
      : 0;

    const allIssues = fileResults.flatMap((f) => f.issues);
    const errors = allIssues.filter((i) => i.severity === 'error').length;
    const warnings = allIssues.filter((i) => i.severity === 'warn').length;

    return {
      phase,
      phaseName: phaseDef.name,
      overallScore: totalScore,
      files: fileResults,
      totalIssues: allIssues.length,
      errors,
      warnings,
    };
  }

  private reviewFile(filePath: string, baseDir: string): FileReviewResult {
    const relPath = filePath.replace(baseDir + '/', '');
    const issues: ReviewIssue[] = [];
    const sectionsFound: string[] = [];
    const sectionsMissing: string[] = [];

    let content = '';
    try {
      content = readFileSync(filePath, 'utf-8');
    } catch {
      return { file: relPath, score: 0, issues: [{ file: relPath, severity: 'error', code: 'READ_ERROR', message: 'Cannot read file' }], sectionsFound: [], sectionsMissing: [] };
    }

    const lines = content.split('\n');

    const headers = lines.filter((l) => l.match(/^#{1,3}\s+/)).map((l) => l.replace(/^#+\s+/, '').trim());
    sectionsFound.push(...headers);

    for (const { pattern, code, message } of AMBIGUITY_PATTERNS) {
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i]!)) {
          issues.push({ file: relPath, line: i + 1, severity: 'warn', code, message });
        }
        pattern.lastIndex = 0;
      }
    }

    const isEmpty = content.trim().length < 100;
    if (isEmpty) {
      issues.push({ file: relPath, severity: 'error', code: 'EMPTY_FILE', message: 'File appears empty or has minimal content (<100 chars)' });
    }

    if (!content.includes('##')) {
      sectionsMissing.push('H2 sections');
      issues.push({ file: relPath, severity: 'warn', code: 'NO_SECTIONS', message: 'No H2 sections found — document may be incomplete' });
    }

    const hasNavLinks = content.includes('[←') || content.includes('[↑') || content.includes('[←');
    if (!hasNavLinks) {
      issues.push({ file: relPath, severity: 'info', code: 'NO_NAV_LINKS', message: 'No navigation links found' });
    }

    const errorCount = issues.filter((i) => i.severity === 'error').length;
    const warnCount = issues.filter((i) => i.severity === 'warn').length;
    const score = Math.max(0, 100 - errorCount * 30 - warnCount * 10);

    return { file: relPath, score, issues, sectionsFound, sectionsMissing };
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
