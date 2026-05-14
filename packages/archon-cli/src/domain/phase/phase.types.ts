export type PhaseStatus = 'pending' | 'in_progress' | 'complete' | 'skipped';

export interface PhaseStatusEntry {
  status: PhaseStatus;
  completedAt?: string;
  startedAt?: string;
  files: string[];
}
