import { Validator } from '../core/validator.js';
import type { Constraint } from '../domain/validation/validation.types.js';

export interface CheckPhaseInput {
  projectPath: string;
  phase: number;
  strict?: boolean;
  omit?: string[];
}

export interface CheckPhaseOutput {
  phase: number;
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  constraints: Constraint[];
}

export class CheckPhaseUseCase {
  execute(input: CheckPhaseInput): CheckPhaseOutput {
    const { projectPath, phase, strict = false, omit = [] } = input;
    const v = new Validator({ basePath: projectPath, strict, omit });
    const result = v.validate(phase);

    return {
      phase: result.phase,
      valid: result.errors.length === 0,
      errors: result.errors,
      warnings: result.warnings,
      suggestions: result.suggestions,
      constraints: result.constraints,
    };
  }
}
