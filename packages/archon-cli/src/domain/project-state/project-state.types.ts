import type { PhaseStatusEntry } from '../phase/phase.types.js';

export type AgentType = 'opencode' | 'claude' | 'cursor' | 'gemini' | 'manual';
export type AgentSupportTier = 'supported' | 'prompt-only' | 'planned';
export type Mode = 'user' | 'project' | 'dev' | 'template-cache';
export type InteractiveMode = 'always' | 'missing' | 'never';
export type TransportMode = 'file-attachment' | 'attach' | 'stdin';

export interface Warning {
  id: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warn' | 'error';
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
