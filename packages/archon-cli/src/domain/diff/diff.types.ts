export interface DiffFile {
  relativePath: string;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  fromContent?: string;
  toContent?: string;
  linesAdded: number;
  linesRemoved: number;
}

export interface DiffSection {
  heading: string;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
}

export interface DiffResult {
  fromVersion: string;
  toVersion: string;
  files: DiffFile[];
  totalAdded: number;
  totalRemoved: number;
  totalModified: number;
  totalUnchanged: number;
  breakingChanges: string[];
}
