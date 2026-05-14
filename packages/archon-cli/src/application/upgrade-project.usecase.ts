import semver from 'semver';
import { MigrationManager, type UpgradeType } from '../infrastructure/template-registry/migration-manager.js';

export interface UpgradeProjectInput {
  projectPath: string;
  targetVersion?: string;
  dryRun?: boolean;
  rollbackVersion?: string;
  info?: boolean;
}

export interface MigrationRecord {
  date: string;
  fromVersion: string;
  toVersion: string;
  type: UpgradeType;
  autoApplied: boolean;
  notes: string;
  backupPath?: string;
}

export interface VersionInfoOutput {
  current: string;
  latest: string;
  backups: string[];
  migrationHistory: MigrationRecord[];
}

export interface UpgradeAnalysisOutput {
  fromVersion: string;
  toVersion: string;
  type: UpgradeType;
  breakingChanges: string[];
  nonBreakingChanges: string[];
  changelogPreview?: string;
  migrationGuidePreview?: string;
  dryRun: boolean;
  applied: boolean;
  backupPath?: string;
  requiresManualMigration: boolean;
  error?: string;
}

export interface RollbackOutput {
  fromVersion: string;
  toVersion: string;
  dryRun: boolean;
  success: boolean;
  error?: string;
}

export type UpgradeProjectOutput =
  | { action: 'info'; result: VersionInfoOutput }
  | { action: 'upToDate'; currentVersion: string; reason: string }
  | { action: 'upgrade'; result: UpgradeAnalysisOutput }
  | { action: 'rollback'; result: RollbackOutput }
  | { action: 'error'; error: string };

export class UpgradeProjectUseCase {
  execute(input: UpgradeProjectInput): UpgradeProjectOutput {
    const { projectPath, targetVersion, dryRun = false, rollbackVersion, info = false } = input;

    const mm = new MigrationManager(projectPath);

    if (info) {
      const current = mm.getProjectVersion();
      const latest = mm.getLatestVersion();
      const backups = mm.listBackups();
      const migrationHistory = mm.getMigrationLog() as MigrationRecord[];
      return { action: 'info', result: { current, latest, backups, migrationHistory } };
    }

    if (rollbackVersion) {
      return { action: 'rollback', result: this.rollback(mm, rollbackVersion, dryRun) };
    }

    const currentVersion = mm.getProjectVersion();
    const latestVersion = mm.getLatestVersion();

    const canUpgrade = mm.canUpgrade(currentVersion, latestVersion);
    if (!canUpgrade.can) {
      return { action: 'upToDate', currentVersion, reason: canUpgrade.reason ?? 'Already up to date.' };
    }

    const resolvedTarget = targetVersion ?? latestVersion;

    if (targetVersion && !semver.valid(targetVersion)) {
      return { action: 'error', error: 'Invalid version format: ' + targetVersion };
    }

    return { action: 'upgrade', result: this.performUpgrade(mm, currentVersion, resolvedTarget, dryRun) };
  }

  private performUpgrade(mm: MigrationManager, from: string, to: string, dryRun: boolean): UpgradeAnalysisOutput {
    const analysis = mm.analyzeUpgrade(from, to);

    if (dryRun) {
      return {
        fromVersion: from,
        toVersion: to,
        type: analysis.type,
        breakingChanges: analysis.breakingChanges,
        nonBreakingChanges: analysis.nonBreakingChanges,
        changelogPreview: analysis.changelog?.split('\n').slice(0, 10).join('\n'),
        migrationGuidePreview: analysis.migrationGuide?.split('\n').slice(0, 30).join('\n'),
        dryRun: true,
        applied: false,
        requiresManualMigration: analysis.type === 'major',
      };
    }

    if (analysis.type === 'major') {
      mm.logMigration({
        date: new Date().toISOString(),
        fromVersion: from,
        toVersion: to,
        type: 'major',
        autoApplied: false,
        notes: 'Major upgrade — manual migration required',
      });
      mm.updateTemplateLock(to);
      return {
        fromVersion: from,
        toVersion: to,
        type: 'major',
        breakingChanges: analysis.breakingChanges,
        nonBreakingChanges: analysis.nonBreakingChanges,
        migrationGuidePreview: analysis.migrationGuide?.split('\n').slice(0, 30).join('\n'),
        dryRun: false,
        applied: true,
        requiresManualMigration: true,
      };
    }

    const backupPath = mm.createBackup(from);
    mm.updateTemplateLock(to);
    mm.logMigration({
      date: new Date().toISOString(),
      fromVersion: from,
      toVersion: to,
      type: analysis.type,
      autoApplied: analysis.type === 'patch',
      notes: analysis.type === 'patch' ? 'Auto-applied patch' : 'User-confirmed upgrade',
      backupPath,
    });

    return {
      fromVersion: from,
      toVersion: to,
      type: analysis.type,
      breakingChanges: analysis.breakingChanges,
      nonBreakingChanges: analysis.nonBreakingChanges,
      dryRun: false,
      applied: true,
      backupPath,
      requiresManualMigration: false,
    };
  }

  private rollback(mm: MigrationManager, version: string, dryRun: boolean): RollbackOutput {
    const backups = mm.listBackups();
    const cleanVersion = version.replace(/^v/, '');
    const currentVersion = mm.getProjectVersion();

    if (!backups.some((b) => b.replace(/^v/, '') === cleanVersion)) {
      return {
        fromVersion: currentVersion,
        toVersion: cleanVersion,
        dryRun,
        success: false,
        error: 'No backup found for version: ' + version + '. Available: ' + (backups.length > 0 ? backups.join(', ') : 'none'),
      };
    }

    if (dryRun) {
      return { fromVersion: currentVersion, toVersion: cleanVersion, dryRun: true, success: true };
    }

    const restored = mm.restoreBackup(cleanVersion);
    if (!restored) {
      return { fromVersion: currentVersion, toVersion: cleanVersion, dryRun: false, success: false, error: 'Rollback failed.' };
    }

    mm.updateTemplateLock(cleanVersion);
    mm.logMigration({
      date: new Date().toISOString(),
      fromVersion: currentVersion,
      toVersion: cleanVersion,
      type: 'minor',
      autoApplied: false,
      notes: 'Rollback',
    });

    return { fromVersion: currentVersion, toVersion: cleanVersion, dryRun: false, success: true };
  }
}
