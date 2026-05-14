export type IssueSeverity = 'error' | 'warn' | 'info';

export interface ReviewIssue {
  file: string;
  line?: number;
  severity: IssueSeverity;
  code: string;
  message: string;
}

export interface FileReviewResult {
  file: string;
  score: number;
  issues: ReviewIssue[];
  sectionsFound: string[];
  sectionsMissing: string[];
}

export interface ReviewResult {
  phase: number;
  phaseName: string;
  overallScore: number;
  files: FileReviewResult[];
  totalIssues: number;
  errors: number;
  warnings: number;
}
