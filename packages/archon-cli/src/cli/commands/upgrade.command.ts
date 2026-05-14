import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { UpgradeProjectUseCase } from '../../application/upgrade-project.usecase.js';

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

    if (showGuide) {
      const uc = new UpgradeProjectUseCase();
      const parts = showGuide.split('-to-');
      if (parts.length !== 2) {
        console.error(chalk.red('\n  Invalid guide format. Use: X-to-Y (e.g., 1.0-to-2.0)\n'));
        process.exit(1);
      }
      const from = parts[0]!.trim();
      const to = parts[1]!.trim();
      const result = uc.execute({ projectPath: mode.projectPath!, targetVersion: to, dryRun: true });
      if (result.action === 'upgrade' && result.result.migrationGuidePreview) {
        console.log(chalk.cyan('\n  Migration Guide: ' + showGuide + '\n'));
        console.log(result.result.migrationGuidePreview);
        console.log();
      } else {
        console.error(chalk.red('\n  Migration guide not found: ' + from + '-to-' + to + '\n'));
      }
      return;
    }

    const uc = new UpgradeProjectUseCase();

    if (info) {
      const out = uc.execute({ projectPath: mode.projectPath!, info: true });
      if (out.action !== 'info') return;
      const r = out.result;
      console.log(chalk.cyan('\n  Version Information\n'));
      console.log('  Current:  ' + r.current);
      console.log('  Latest:    ' + r.latest);
      console.log('  Backups:   ' + (r.backups.length > 0 ? r.backups.join(', ') : 'none'));
      if (r.migrationHistory.length > 0) {
        console.log(chalk.bold('\n  Migration History:'));
        for (const record of r.migrationHistory.slice(-5)) {
          const mark = record.type === 'major' ? chalk.red('⚠️') : record.type === 'minor' ? chalk.yellow('📋') : chalk.green('✅');
          console.log('  ' + mark + ' ' + record.date + ': ' + record.fromVersion + ' → ' + record.toVersion + ' (' + record.type + ')');
        }
      }
      console.log();
      return;
    }

    if (rollbackVersion) {
      const out = dryRun
        ? uc.execute({ projectPath: mode.projectPath!, rollbackVersion, dryRun: true })
        : await this.confirmAndRollback(uc, mode.projectPath!, rollbackVersion, dryRun);

      if (out.action !== 'rollback') return;
      const r = out.result;
      if (!r.success) {
        console.error(chalk.red('\n  ❌ ' + (r.error ?? 'Rollback failed.') + '\n'));
        process.exit(1);
      }
      if (dryRun) {
        console.log(chalk.cyan('\n  📋 Would restore from backup: .archon/backups/v' + r.toVersion + '/'));
        console.log(chalk.cyan('  Would update template lock to: ' + r.toVersion + '\n'));
      } else {
        console.log(chalk.green('\n  ✅ Rolled back to v' + r.toVersion + '.\n'));
      }
      return;
    }

    const analysis = uc.execute({ projectPath: mode.projectPath!, targetVersion, dryRun: true });

    if (analysis.action === 'error') {
      console.error(chalk.red('\n  ' + analysis.error + '\n'));
      process.exit(1);
    }

    if (analysis.action === 'upToDate') {
      console.log(chalk.green('\n  ' + analysis.reason + ' (' + analysis.currentVersion + ')\n'));
      return;
    }

    if (analysis.action !== 'upgrade') return;
    const a = analysis.result;

    console.log(chalk.cyan('\n  Version Analysis\n'));
    console.log('  Current:  ' + chalk.bold(a.fromVersion));
    console.log('  Target:   ' + chalk.bold(a.toVersion));
    console.log('  Type:     ' + this.coloredType(a.type) + ' (' + this.describeType(a.type) + ')');

    if (a.breakingChanges.length > 0) {
      console.log(chalk.bold('\n  Breaking Changes:'));
      for (const change of a.breakingChanges) {
        console.log(chalk.red('    - ' + change));
      }
    }
    if (a.nonBreakingChanges.length > 0) {
      console.log(chalk.bold('\n  Changes:'));
      for (const change of a.nonBreakingChanges) {
        console.log('    - ' + change);
      }
    }
    if (a.changelogPreview) {
      console.log(chalk.bold('\n  Changelog:'));
      for (const line of a.changelogPreview.split('\n')) {
        if (line.trim()) console.log(chalk.dim('    ' + line));
      }
    }

    if (dryRun) {
      console.log(chalk.cyan('\n  📋 Dry-run mode — no changes applied.\n'));
      return;
    }

    if (a.type === 'major') {
      console.log(chalk.red('\n  ⚠️  MAJOR upgrades require manual migration.\n'));
      if (a.migrationGuidePreview) {
        console.log(chalk.bold('  Migration Guide Preview:\n'));
        for (const line of a.migrationGuidePreview.split('\n')) {
          if (line.trim()) console.log('  ' + line);
        }
        console.log();
      }
      const inquirer = (await import('inquirer')).default;
      const { proceed } = await inquirer.prompt([{ type: 'confirm', name: 'proceed', message: 'Proceed with manual migration?', default: false }]);
      if (!proceed) { console.log(chalk.dim('\n  Cancelled.\n')); return; }
    } else if (a.type === 'minor') {
      console.log(chalk.yellow('\n  MINOR upgrade — confirmation required.\n'));
      const inquirer = (await import('inquirer')).default;
      const { confirm } = await inquirer.prompt([{ type: 'confirm', name: 'confirm', message: 'Apply MINOR upgrade?', default: true }]);
      if (!confirm) { console.log(chalk.dim('\n  Cancelled.\n')); return; }
    }

    const applied = uc.execute({ projectPath: mode.projectPath!, targetVersion, dryRun: false });
    if (applied.action === 'upgrade' && applied.result.applied) {
      if (a.type === 'major') {
        console.log(chalk.green('\n  ✅ Migration guide reviewed.\n'));
      } else {
        console.log(chalk.green('\n  ✅ ' + (a.type === 'patch' ? 'Patch upgrade complete.' : 'Upgrade complete.') + '\n'));
      }
    }
  }

  private async confirmAndRollback(
    uc: UpgradeProjectUseCase,
    projectPath: string,
    rollbackVersion: string,
    dryRun: boolean,
  ) {
    const cleanVersion = rollbackVersion.replace(/^v/, '');
    console.log(chalk.cyan('\n  Rollback to v' + cleanVersion + '\n'));
    const inquirer = (await import('inquirer')).default;
    const { confirm } = await inquirer.prompt([{
      type: 'confirm', name: 'confirm',
      message: 'Rollback to v' + cleanVersion + '? This cannot be undone.',
      default: false,
    }]);
    if (!confirm) { console.log(chalk.dim('\n  Cancelled.\n')); process.exit(0); }
    return uc.execute({ projectPath, rollbackVersion, dryRun });
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
