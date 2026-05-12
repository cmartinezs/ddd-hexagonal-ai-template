export type AgentType = 'opencode' | 'claude' | 'cursor' | 'gemini' | 'manual';
export type Mode = 'user' | 'project' | 'dev' | 'template-cache';
export type PhaseStatus = 'pending' | 'in_progress' | 'complete';
export type InteractiveMode = 'always' | 'missing' | 'never';
export type TransportMode = 'file-attachment' | 'attach' | 'stdin';
export type TemplateVersion = string;

export interface PhaseStatusEntry {
  status: PhaseStatus;
  completedAt?: string;
  startedAt?: string;
  files: string[];
}

export interface Warning {
  id: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warn' | 'error';
}

export interface ArchonState {
  projectName: string;
  projectSlug: string;
  createdAt: string;
  updatedAt: string;
  archonVersion: string;
  agent: AgentType;
  mode: 'project';
  currentPhase: number;
  phases: Record<string, PhaseStatusEntry>;
  warnings: Warning[];
  checksum: string;
}

export interface TemplateLock {
  template: {
    id: string;
    version: string;
    source: string;
    ref: string;
    commitSha?: string;
    cachePath: string;
    embeddedSnapshot: boolean;
    resolvedAt: string;
  };
}

export interface AgentConfig {
  type: AgentType;
  transport: TransportMode;
  preferences: Record<string, string | boolean | number>;
  doctorChecked: boolean;
  lastDoctorCheck?: string;
}

export interface ArchonConfig {
  agent: AgentConfig;
  defaults: Record<string, string | boolean | number>;
  interactiveMode: InteractiveMode;
  autoUpgrade: boolean;
  checksumValidation: 'strict' | 'warn' | 'skip';
}

export interface RunMetadata {
  runId: string;
  timestamp: string;
  agent: AgentType;
  phase: number;
  transport: TransportMode;
  duration?: number;
  exitCode?: number;
  files: string[];
  prompts: string[];
  context: string[];
}

export interface InitOptions {
  name: string;
  agent: AgentType;
  templateVersion?: TemplateVersion;
  interactive?: boolean;
}

export interface CheckResult {
  valid: boolean;
  phase: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}