import { join } from 'node:path';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, cpSync } from 'node:fs';
import semver from 'semver';
import type { TemplateLock } from './types.js';
import { globalCache, templateResolver } from './global-cache/index.js';

export type UpgradeType = 'patch' | 'minor' | 'major';

export interface VersionInfo {
  current: string;
  latest: string;
  type: UpgradeType;
  changelog?: string;
  migrationGuide?: string;
  breakingChanges: string[];
  nonBreakingChanges: string[];
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

export class MigrationManager {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  getProjectVersion(): string {
    const lock = templateResolver.readTemplateLock(this.projectPath);
    return lock?.template.version ?? '0.0.0';
  }

  getLatestVersion(): string {
    const registry = globalCache.getRegistry();
    const info = registry['ddd-hexagonal-ai-template'];
    if (!info) return '0.1.0';
    return info.defaultVersion || '0.1.0';
  }

  getUpgradeType(from: string, to: string): UpgradeType {
    const diff = semver.diff(from, to);
    if (diff === 'major') return 'major';
    if (diff === 'minor') return 'minor';
    return 'patch';
  }

  analyzeUpgrade(from: string, to: string): VersionInfo {
    const type = this.getUpgradeType(from, to);
    const breaking: string[] = [];
    const nonBreaking: string[] = [];

    if (type === 'major') {
      breaking.push('Phase structure may have changed');
      breaking.push('Some files may have been renamed or removed');
      breaking.push('Migration guide required — see UPGRADE/ folder');
    }

    if (type === 'minor') {
      nonBreaking.push('New phase templates may be available');
      nonBreaking.push('New template files added to existing phases');
      nonBreaking.push('Documentation improvements');
    }

    if (type === 'patch') {
      nonBreaking.push('Bug fixes in existing templates');
      nonBreaking.push('Documentation corrections');
      nonBreaking.push('Minor improvements');
    }

    const changelog = this.loadChangelog(from, to);
    const migrationGuide = type === 'major' ? this.loadMigrationGuide(from, to) : undefined;

    return {
      current: from,
      latest: to,
      type,
      changelog,
      migrationGuide,
      breakingChanges: breaking,
      nonBreakingChanges: nonBreaking,
    };
  }

  private loadChangelog(_from: string, _to: string): string | undefined {
    const templateRoot = templateResolver.getLockedTemplatePath(this.projectPath);
    if (!templateRoot) return undefined;

    const changelogPath = join(templateRoot, 'CHANGELOG.md');
    if (!existsSync(changelogPath)) return undefined;

    try {
      const raw = readFileSync(changelogPath, 'utf-8');
      const lines = raw.split('\n');
      const relevant: string[] = [];
      let capturing = false;

      for (const line of lines) {
        if (line.match(/^##?\s*\[?v?"?${from}]?/i) || line.match(/^##?\s*\[?v?"?${to}]?/i)) {
          capturing = !capturing;
          if (!capturing) break;
          continue;
        }
        if (capturing) {
          relevant.push(line);
        }
      }

      return relevant.length > 0 ? relevant.join('\n').trim() : undefined;
    } catch {
      return undefined;
    }
  }

  private loadMigrationGuide(from: string, to: string): string | undefined {
    const templateRoot = templateResolver.getLockedTemplatePath(this.projectPath);
    if (!templateRoot) return undefined;

    const upgradeDir = join(templateRoot, 'UPGRADE');
    if (!existsSync(upgradeDir)) return undefined;

    const fromClean = from.replace(/^v/, '');
    const toClean = to.replace(/^v/, '');
    const guideName = `${fromClean}-to-${toClean}.md`;
    const guidePath = join(upgradeDir, guideName);

    if (existsSync(guidePath)) {
      try {
        return readFileSync(guidePath, 'utf-8');
      } catch {
        return undefined;
      }
    }

    const files = readdirSync(upgradeDir).filter((f) => f.endsWith('.md'));
    const matching = files.find((f) => f.includes(fromClean) && f.includes(toClean));
    if (matching) {
      try {
        return readFileSync(join(upgradeDir, matching), 'utf-8');
      } catch {
        return undefined;
      }
    }

    return undefined;
  }

  createBackup(version: string): string {
    const backupDir = join(this.projectPath, '.archon', 'backups', 'v' + version);
    mkdirSync(backupDir, { recursive: true });

    const docsDir = join(this.projectPath, 'docs');
    if (existsSync(docsDir)) {
      try {
        cpSync(docsDir, join(backupDir, 'docs'), { recursive: true });
      } catch {
        // skip
      }
    }

    const statePath = join(this.projectPath, '.archon', 'state.json');
    if (existsSync(statePath)) {
      try {
        cpSync(statePath, join(backupDir, 'state.json'));
      } catch {
        // skip
      }
    }

    const configPath = join(this.projectPath, '.archon', 'config.json');
    if (existsSync(configPath)) {
      try {
        cpSync(configPath, join(backupDir, 'config.json'));
      } catch {
        // skip
      }
    }

    const lockPath = join(this.projectPath, '.archon', 'template.lock.json');
    if (existsSync(lockPath)) {
      try {
        cpSync(lockPath, join(backupDir, 'template.lock.json'));
      } catch {
        // skip
      }
    }

    return backupDir;
  }

  restoreBackup(version: string): boolean {
    const backupDir = join(this.projectPath, '.archon', 'backups', 'v' + version);
    if (!existsSync(backupDir)) return false;

    try {
      const backupDocs = join(backupDir, 'docs');
      if (existsSync(backupDocs)) {
        cpSync(backupDocs, join(this.projectPath, 'docs'), { recursive: true, force: true });
      }

      const stateBackup = join(backupDir, 'state.json');
      if (existsSync(stateBackup)) {
        cpSync(stateBackup, join(this.projectPath, '.archon', 'state.json'), { force: true });
      }

      const configBackup = join(backupDir, 'config.json');
      if (existsSync(configBackup)) {
        cpSync(configBackup, join(this.projectPath, '.archon', 'config.json'), { force: true });
      }

      return true;
    } catch {
      return false;
    }
  }

  listBackups(): string[] {
    const backupsDir = join(this.projectPath, '.archon', 'backups');
    if (!existsSync(backupsDir)) return [];

    try {
      return readdirSync(backupsDir)
        .filter((d) => existsSync(join(backupsDir, d, 'state.json')))
        .sort((a, b) => {
          const va = a.replace(/^v/, '');
          const vb = b.replace(/^v/, '');
          return semver.lt(va, vb) ? 1 : -1;
        });
    } catch {
      return [];
    }
  }

  logMigration(record: MigrationRecord): void {
    const logPath = join(this.projectPath, '.archon', 'migration-log.md');
    const date = new Date().toISOString().slice(0, 10);

    let content = '';
    if (!existsSync(logPath)) {
      content = '# Archon Migration Log\n\n';
    } else {
      try {
        content = readFileSync(logPath, 'utf-8');
      } catch {
        content = '# Archon Migration Log\n\n';
      }
    }

    const entry = [
      `## ${date}: ${record.fromVersion} → ${record.toVersion}`,
      `- Type: ${record.type.toUpperCase()} (${record.autoApplied ? 'auto-applied' : 'user-confirmed'})`,
      record.notes ? `- ${record.notes}` : '',
      record.backupPath ? `- Backup: ${record.backupPath}` : '',
    ].filter((l) => l.length > 0).join('\n');

    content += entry + '\n\n';
    writeFileSync(logPath, content, 'utf-8');
  }

  getMigrationLog(): MigrationRecord[] {
    const logPath = join(this.projectPath, '.archon', 'migration-log.md');
    if (!existsSync(logPath)) return [];

    try {
      const raw = readFileSync(logPath, 'utf-8');
      const records: MigrationRecord[] = [];
      const entries = raw.split(/^## /m).filter((e) => e.trim());

      for (const entry of entries) {
        const lines = entry.trim().split('\n');
        if (lines.length < 2) continue;

        const dateMatch = lines[0]!.match(/^(\d{4}-\d{2}-\d{2}): (.+) → (.+)/);
        if (!dateMatch) continue;

        const typeMatch = lines.find((l) => l.startsWith('- Type:'));
        const notesMatch = lines.find((l) => l.startsWith('- ') && !l.startsWith('- Type:') && !l.startsWith('- Backup:'));

        records.push({
          date: dateMatch[1]!,
          fromVersion: dateMatch[2]!,
          toVersion: dateMatch[3]!,
          type: (typeMatch?.replace('- Type: ', '').replace(/\s*\(.*/, '').toLowerCase() ?? 'unknown') as UpgradeType,
          autoApplied: typeMatch?.includes('auto-applied') ?? false,
          notes: notesMatch?.replace('- ', '') ?? '',
        });
      }

      return records;
    } catch {
      return [];
    }
  }

  updateTemplateLock(newVersion: string): void {
    const lock = templateResolver.readTemplateLock(this.projectPath);
    if (!lock) return;

    const updatedLock: TemplateLock = {
      ...lock,
      template: {
        ...lock.template,
        version: newVersion,
        resolvedAt: new Date().toISOString(),
      },
    };

    const lockPath = join(this.projectPath, '.archon', 'template.lock.json');
    writeFileSync(lockPath, JSON.stringify(updatedLock, null, 2), 'utf-8');
  }

  canUpgrade(from: string, to: string): { can: boolean; reason?: string } {
    if (semver.eq(from, to)) {
      return { can: false, reason: 'Already on this version' };
    }
    if (semver.gt(from, to)) {
      return { can: false, reason: 'Project version is ahead of template version' };
    }
    return { can: true };
  }

  isVersionCached(version: string): boolean {
    return globalCache.isInstalled('ddd-hexagonal-ai-template', version);
  }
}
