import chalk from 'chalk';
import semver from 'semver';

import { detectMode } from '../core/mode-detector.js';
import { MigrationManager } from '../core/migration-manager.js';
import inquirer from 'inquirer';

export class UpgradeCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const targetVersion = this.getArg(args, 'target') ?? (opts['target'] as string | undefined);
    const dryRun = opts['dry-run'] === true || opts['dryRun'] === true;
    const rollbackVersion = this.getArg(args, 'rollback') ?? (opts['rollback'] as string | undefined);
    const showGuide = this.getArg(args, 'guide') ?? (opts['guide'] as string | undefined);
    const info = opts['info'] === true;

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  Upgrade requires an initialized project.\n'));
      console.error(chalk.dim('  Run `archon init --name <project>` first.\n'));
      process.exit(1);
    }

    const mm = new MigrationManager(mode.projectPath!);

    if (showGuide) {
      this.showMigrationGuide(mm, showGuide);
      return;
    }

    if (info) {
      await this.showInfo(mm);
      return;
    }

    if (rollbackVersion) {
      await this.rollback(mm, rollbackVersion, dryRun);
      return;
    }

    const currentVersion = mm.getProjectVersion();
    const latestVersion = mm.getLatestVersion();

    const canUpgrade = mm.canUpgrade(currentVersion, latestVersion);
    if (!canUpgrade.can) {
      console.log(chalk.green('\n  ' + canUpgrade.reason + ' (' + currentVersion + ')\n'));
      return;
    }

    if (targetVersion) {
      if (!semver.valid(targetVersion)) {
        console.error(chalk.red('\n  Invalid version format: ' + targetVersion + '\n'));
        process.exit(1);
      }
      await this.performUpgrade(mm, currentVersion, targetVersion, dryRun);
      return;
    }

    await this.performUpgrade(mm, currentVersion, latestVersion, dryRun);
  }

  private async showInfo(mm: MigrationManager): Promise<void> {
    const current = mm.getProjectVersion();
    const latest = mm.getLatestVersion();
    const backups = mm.listBackups();
    const migrationLog = mm.getMigrationLog();

    console.log(chalk.cyan('\n  Version Information\n'));
    console.log('  Current:  ' + current);
    console.log('  Latest:    ' + latest);
    console.log('  Backups:   ' + (backups.length > 0 ? backups.join(', ') : 'none'));

    if (migrationLog.length > 0) {
      console.log(chalk.bold('\n  Migration History:'));
      for (const record of migrationLog.slice(-5)) {
        const mark = record.type === 'major' ? chalk.red('⚠️') : record.type === 'minor' ? chalk.yellow('📋') : chalk.green('✅');
        console.log('  ' + mark + ' ' + record.date + ': ' + record.fromVersion + ' → ' + record.toVersion + ' (' + record.type + ')');
      }
    }
    console.log();
  }

  private async performUpgrade(mm: MigrationManager, from: string, to: string, dryRun: boolean): Promise<void> {
    const analysis = mm.analyzeUpgrade(from, to);

    console.log(chalk.cyan('\n  Version Analysis\n'));
    console.log('  Current:  ' + chalk.bold(from));
    console.log('  Target:   ' + chalk.bold(to));
    console.log('  Type:     ' + this.coloredType(analysis.type) + ' (' + this.describeType(analysis.type) + ')');

    if (analysis.breakingChanges.length > 0) {
      console.log(chalk.bold('\n  Breaking Changes:'));
      for (const change of analysis.breakingChanges) {
        console.log(chalk.red('    - ' + change));
      }
    }

    if (analysis.nonBreakingChanges.length > 0) {
      console.log(chalk.bold('\n  Changes:'));
      for (const change of analysis.nonBreakingChanges) {
        console.log('    - ' + change);
      }
    }

    if (analysis.changelog) {
      const summary = analysis.changelog.split('\n').slice(0, 10).join('\n');
      console.log(chalk.bold('\n  Changelog:'));
      for (const line of summary.split('\n')) {
        if (line.trim()) console.log(chalk.dim('    ' + line));
      }
    }

    if (dryRun) {
      console.log(chalk.cyan('\n  📋 Dry-run mode — no changes applied.\n'));
      return;
    }

    if (analysis.type === 'major') {
      console.log(chalk.red('\n  ⚠️  MAJOR upgrades require manual migration.\n'));
      if (analysis.migrationGuide) {
        const summary = analysis.migrationGuide.split('\n').slice(0, 30).join('\n');
        console.log(chalk.bold('  Migration Guide Preview:\n'));
        for (const line of summary.split('\n')) {
          if (line.trim()) console.log('  ' + line);
        }
        console.log();
      }
      const { proceed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Proceed with manual migration?',
        default: false,
      }]);
      if (!proceed) {
        console.log(chalk.dim('\n  Cancelled.\n'));
        return;
      }
      console.log(chalk.green('\n  ✅ Migration guide reviewed.\n'));
      mm.logMigration({
        date: new Date().toISOString(),
        fromVersion: from,
        toVersion: to,
        type: 'major',
        autoApplied: false,
        notes: 'Major upgrade — manual migration required',
      });
      mm.updateTemplateLock(to);
      return;
    }

    if (analysis.type === 'patch') {
      const backupPath = mm.createBackup(from);
      mm.updateTemplateLock(to);
      mm.logMigration({
        date: new Date().toISOString(),
        fromVersion: from,
        toVersion: to,
        type: 'patch',
        autoApplied: true,
        notes: 'Auto-applied patch',
        backupPath,
      });
      console.log(chalk.green('\n  ✅ Patch upgrade complete.\n'));
      return;
    }

    console.log(chalk.yellow('\n  MINOR upgrade — confirmation required.\n'));
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Apply MINOR upgrade?',
      default: true,
    }]);

    if (!confirm) {
      console.log(chalk.dim('\n  Cancelled.\n'));
      return;
    }

    const backupPath = mm.createBackup(from);
    mm.updateTemplateLock(to);
    mm.logMigration({
      date: new Date().toISOString(),
      fromVersion: from,
      toVersion: to,
      type: 'minor',
      autoApplied: false,
      notes: 'User-confirmed upgrade',
      backupPath,
    });
    console.log(chalk.green('\n  ✅ Upgrade complete.\n'));
  }

  private async rollback(mm: MigrationManager, version: string, dryRun: boolean): Promise<void> {
    const backups = mm.listBackups();
    const cleanVersion = version.replace(/^v/, '');

    if (!backups.some((b) => b.replace(/^v/, '') === cleanVersion)) {
      console.error(chalk.red('\n  No backup found for version: ' + version + '\n'));
      console.log(chalk.dim('  Available backups: ' + (backups.length > 0 ? backups.join(', ') : 'none') + '\n'));
      process.exit(1);
    }

    const currentVersion = mm.getProjectVersion();
    console.log(chalk.cyan('\n  Rollback: ' + currentVersion + ' → ' + cleanVersion + '\n'));

    if (dryRun) {
      console.log(chalk.cyan('  📋 Would restore from backup: .archon/backups/v' + cleanVersion + '/'));
      console.log(chalk.cyan('  Would update template lock to: ' + cleanVersion));
      console.log(chalk.cyan('  Would log rollback in migration-log.md\n'));
      return;
    }

    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Rollback to v' + cleanVersion + '? This cannot be undone.',
      default: false,
    }]);

    if (!confirm) {
      console.log(chalk.dim('\n  Cancelled.\n'));
      return;
    }

    const restored = mm.restoreBackup(cleanVersion);
    if (!restored) {
      console.error(chalk.red('\n  ❌ Rollback failed.\n'));
      process.exit(1);
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

    console.log(chalk.green('\n  ✅ Rolled back to v' + cleanVersion + '.\n'));
  }

  private showMigrationGuide(mm: MigrationManager, guideId: string): void {
    const parts = guideId.split('-to-');
    if (parts.length !== 2) {
      console.error(chalk.red('\n  Invalid guide format. Use: X-to-Y (e.g., 1.0-to-2.0)\n'));
      process.exit(1);
    }

    const from = parts[0]!;
    const to = parts[1]!;
    const guide = mm.analyzeUpgrade(from.trim(), to.trim()).migrationGuide;

    if (!guide) {
      console.error(chalk.red('\n  Migration guide not found: ' + guideId + '\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n  Migration Guide: ' + guideId + '\n'));
    console.log(guide);
    console.log();
  }

  private coloredType(type: string): string {
    if (type === 'major') return chalk.red('MAJOR');
    if (type === 'minor') return chalk.yellow('MINOR');
    return chalk.green('PATCH');
  }

  private describeType(type: string): string {
    if (type === 'major') return 'breaking changes — manual migration required';
    if (type === 'minor') return 'new features — confirmation required';
    return 'bug fixes — auto-applied';
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
