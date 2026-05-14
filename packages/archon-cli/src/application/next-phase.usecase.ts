import { StateManager } from '../infrastructure/state/state-manager.js';
import { Validator } from '../core/validator.js';
import { phaseEngine } from '../domain/phase/phase-engine.js';
import type { ValidationResult } from '../domain/validation/validation.types.js';

export interface NextPhaseInput {
  projectPath: string;
  targetPhase?: number;
  omit?: string[];
}

export interface NextPhaseOutput {
  fromPhase: number;
  toPhase: number;
  skippedPhases: number[];
  validationResult?: ValidationResult;
  requiresConfirmation: boolean;
  confirmationReason?: string;
  error?: string;
}

export class NextPhaseUseCase {
  async execute(input: NextPhaseInput): Promise<NextPhaseOutput> {
    const { projectPath, targetPhase: targetPhaseOpt, omit = [] } = input;

    const sm = new StateManager(projectPath);
    const state = sm.load();
    const fromPhase = state.currentPhase;
    const toPhase = targetPhaseOpt ?? fromPhase + 1;

    if (toPhase < 0 || toPhase > 11) {
      return {
        fromPhase,
        toPhase,
        skippedPhases: [],
        requiresConfirmation: false,
        error: 'Invalid phase: ' + toPhase + '. Must be 0-11.',
      };
    }

    const isJump = toPhase > fromPhase + 1;
    const skippedPhases: number[] = [];

    if (isJump) {
      for (let p = fromPhase + 1; p < toPhase; p++) {
        skippedPhases.push(p);
      }
      return {
        fromPhase,
        toPhase,
        skippedPhases,
        requiresConfirmation: true,
        confirmationReason: 'Jumping from phase ' + fromPhase + ' to ' + toPhase + ', skipping ' + skippedPhases.join(', '),
      };
    }

    const currentPhaseKey = 'phase-' + String(fromPhase).padStart(2, '0');
    const currentPhaseData = state.phases[currentPhaseKey];

    let validationResult: ValidationResult | undefined;

    if (currentPhaseData?.status !== 'complete') {
      const v = new Validator({ basePath: projectPath, strict: true, omit });
      validationResult = v.validate(fromPhase);

      if (validationResult.errors.length > 0) {
        return {
          fromPhase,
          toPhase,
          skippedPhases: [],
          validationResult,
          requiresConfirmation: false,
          error: 'Validation failed for phase ' + fromPhase + '.',
        };
      }

      return {
        fromPhase,
        toPhase,
        skippedPhases: [],
        validationResult,
        requiresConfirmation: true,
        confirmationReason: 'Mark phase ' + fromPhase + ' (' + phaseEngine.getPhase(fromPhase).name + ') as complete?',
      };
    }

    sm.setCurrentPhase(toPhase);

    return {
      fromPhase,
      toPhase,
      skippedPhases: [],
      requiresConfirmation: false,
    };
  }

  confirmAdvance(projectPath: string, fromPhase: number, toPhase: number, skippedPhases: number[]): void {
    const sm = new StateManager(projectPath);
    const state = sm.load();

    for (const p of skippedPhases) {
      sm.updatePhase(p, {
        status: 'skipped',
        completedAt: new Date().toISOString(),
        startedAt: undefined,
        files: [],
      });
    }

    const currentPhaseKey = 'phase-' + String(fromPhase).padStart(2, '0');
    const currentPhaseData = state.phases[currentPhaseKey];

    if (currentPhaseData?.status !== 'complete') {
      sm.updatePhase(fromPhase, {
        status: 'complete',
        completedAt: new Date().toISOString(),
        startedAt: currentPhaseData?.startedAt,
        files: currentPhaseData?.files ?? [],
      });
    }

    sm.setCurrentPhase(toPhase);
  }
}
