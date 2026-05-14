import { phaseEngine } from '../domain/phase/phase-engine.js';
import { ReviewPhaseUseCase } from './review-phase.usecase.js';
import type { ReviewResult } from '../domain/quality/quality.types.js';

export interface QualityScoreInput {
  projectPath: string;
  phases?: number[];
}

export interface PhaseQuality {
  phase: number;
  phaseName: string;
  score: number;
  errors: number;
  warnings: number;
  fileCount: number;
}

export interface QualityScoreOutput {
  overallScore: number;
  phases: PhaseQuality[];
  totalErrors: number;
  totalWarnings: number;
  totalFiles: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

function toGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export class QualityScoreUseCase {
  execute(input: QualityScoreInput): QualityScoreOutput {
    const { projectPath, phases: phaseFilter } = input;
    const allPhases = phaseEngine.getAllPhases();
    const targetPhases = phaseFilter
      ? allPhases.filter((p) => phaseFilter.includes(p.index))
      : allPhases;

    const reviewUc = new ReviewPhaseUseCase();
    const phaseResults: Array<ReviewResult & { fileCount: number }> = [];

    for (const phase of targetPhases) {
      const result = reviewUc.execute({ projectPath, phase: phase.index });
      if (result.files.length > 0) {
        phaseResults.push({ ...result, fileCount: result.files.length });
      }
    }

    if (phaseResults.length === 0) {
      return { overallScore: 0, phases: [], totalErrors: 0, totalWarnings: 0, totalFiles: 0, grade: 'F' };
    }

    const phaseQuality: PhaseQuality[] = phaseResults.map((r) => ({
      phase: r.phase,
      phaseName: r.phaseName,
      score: r.overallScore,
      errors: r.errors,
      warnings: r.warnings,
      fileCount: r.fileCount,
    }));

    const overallScore = Math.round(
      phaseQuality.reduce((s, p) => s + p.score, 0) / phaseQuality.length
    );

    const totalErrors = phaseQuality.reduce((s, p) => s + p.errors, 0);
    const totalWarnings = phaseQuality.reduce((s, p) => s + p.warnings, 0);
    const totalFiles = phaseQuality.reduce((s, p) => s + p.fileCount, 0);

    return {
      overallScore,
      phases: phaseQuality,
      totalErrors,
      totalWarnings,
      totalFiles,
      grade: toGrade(overallScore),
    };
  }
}
