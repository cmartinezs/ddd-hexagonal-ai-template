export type Severity = 'error' | 'warn' | 'info';

export interface Constraint {
  id: string;
  severity: Severity;
  message: string;
  phase?: number;
}

export interface ValidationResult {
  phase: number;
  constraints: Constraint[];
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface CheckResult {
  valid: boolean;
  phase: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}
