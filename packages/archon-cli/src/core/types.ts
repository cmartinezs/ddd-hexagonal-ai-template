export type { PhaseStatus, PhaseStatusEntry } from '../domain/phase/phase.types.js';
export type { TemplateVersion, TemplateLock } from '../domain/template/template.types.js';
export type {
  AgentType,
  AgentSupportTier,
  Mode,
  InteractiveMode,
  TransportMode,
  Warning,
  AgentConfig,
  ArchonConfig,
  ArchonState,
  RunMetadata,
} from '../domain/project-state/project-state.types.js';
export type { CheckResult } from '../domain/validation/validation.types.js';

// InitOptions is a use-case DTO — will move to application/ in scope 03
import type { AgentType } from '../domain/project-state/project-state.types.js';
import type { TemplateVersion } from '../domain/template/template.types.js';

export interface InitOptions {
  name: string;
  agent: AgentType;
  templateVersion?: TemplateVersion;
  interactive?: boolean;
}
