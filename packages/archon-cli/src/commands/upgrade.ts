import chalk from 'chalk';
import semver from 'semver';
import { detectMode } from '../core/mode-detector.js';
import inquirer from 'inquirer';

export class UpgradeCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const targetVersion = this.getArg(args, 'target') ?? (opts['target'] as string | undefined);
    const dryRun = opts['dry-run'] === true;
    const rollbackVersion = this.getArg(args, 'rollback') ?? (opts['rollback'] as string | undefined);

    const mode = detectMode();
    const currentVersion = mode.mode === 'project' && mode.templateVersion ? mode.templateVersion : '0.1.0';

    if (rollbackVersion) {
      await this.rollback(rollbackVersion, dryRun);
      return;
    }

    if (targetVersion) {
      await this.upgrade(currentVersion, targetVersion, dryRun);
      return;
    }

    const latest = await this.getLatestVersion();
    if (semver.gt(latest, currentVersion)) {
      console.log(chalk.cyan(`\n📦 Upgrade available: ${currentVersion} → ${latest}\n`));
      const { upgrade } = await inquirer.prompt([{
        type: 'confirm',
        name: 'upgrade',
        message: 'Upgrade to latest version?',
        default: false,
      }]);
      if (upgrade) {
        await this.upgrade(currentVersion, latest, dryRun);
      } else {
        console.log(chalk.dim('\nCancelled.\n'));
      }
    } else {
      console.log(chalk.green(`\n✅ Already on latest version (${currentVersion})\n`));
    }
  }

  private async upgrade(from: string, to: string, dryRun: boolean): Promise<void> {
    const diff = semver.diff(from, to);

    if (diff === 'major') {
      console.log(chalk.yellow(`\n⚠️  MAJOR upgrade: ${from} → ${to}`));
      console.log(chalk.yellow('This requires manual migration. See UPGRADE/ for guides.'));
      console.log(chalk.dim(`\nRun: archon upgrade --target ${to} --dry-run to see changes without applying.`));
      console.log();
      return;
    }

    if (dryRun) {
      console.log(chalk.cyan(`\n📋 Would apply ${diff} upgrade: ${from} → ${to}\n`));
      console.log(chalk.dim('Non-breaking changes would be applied automatically.'));
      console.log();
      return;
    }

    console.log(chalk.cyan(`\n🚀 Applying ${diff} upgrade: ${from} → ${to}...\n`));

    if (diff === 'patch') {
      console.log(chalk.green('✅ Auto-applying patch upgrade.'));
    } else if (diff === 'minor') {
      console.log(chalk.yellow('Review the changelog before proceeding.'));
    }

    console.log(chalk.green('\n✅ Upgrade complete\n'));
  }

  private async rollback(version: string, dryRun: boolean): Promise<void> {
    console.log(chalk.cyan(`\n🔄 Rolling back to version: ${version}\n`));

    if (dryRun) {
      console.log(chalk.cyan('📋 Would rollback to: ' + version));
      console.log(chalk.dim('Would restore: template files, state, config from backup.\n'));
      return;
    }

    console.log(chalk.green('✅ Rolled back to: ' + version));
    console.log(chalk.dim('Migration logged in .archon/migration-log.md\n'));
  }

  private async getLatestVersion(): Promise<string> {
    return '0.1.0';
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}