import chalk from 'chalk';
import { globalCache, templateResolver } from '../core/global-cache/index.js';
import { existsSync, cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

export class TemplatesCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0] ?? 'ls';

    switch (subcommand) {
      case 'ls':
        this.listTemplates();
        break;
      case 'pull':
        this.pullTemplate(args.slice(1));
        break;
      case 'update':
        this.updateTemplates();
        break;
      case 'remove':
        this.removeTemplate(args.slice(1));
        break;
      case 'doctor':
        this.doctorTemplates();
        break;
      default:
        console.error(chalk.red('\n  Unknown subcommand: ' + subcommand));
        console.log(chalk.yellow('  Usage: archon templates ls|pull|update|remove|doctor\n'));
    }
  }

  private listTemplates(): void {
    const registry = globalCache.getRegistry();

    console.log(chalk.cyan('\n  Global Template Cache\n'));
    console.log('  Location: ' + chalk.dim(globalCache['ARCHON_CACHE_DIR' as keyof typeof globalCache] || join(process.env['HOME'] || '', '.archon')));
    console.log('  Size:     ' + this.formatSize(globalCache.getCacheSize()));
    console.log();

    const templateIds = Object.keys(registry);

    if (templateIds.length === 0) {
      console.log(chalk.yellow('  No templates installed.\n'));
      console.log('  Run ' + chalk.cyan('archon templates pull') + ' to download a template.\n');
      return;
    }

    for (const id of templateIds) {
      const info = registry[id]!;
      const versions = Object.keys(info.versions);
      console.log(chalk.bold('  ' + info.id));
      console.log(chalk.dim('    Source: ' + info.source));
      console.log('    Versions: ' + versions.length);
      console.log('    Default:   ' + info.defaultVersion);

      for (const [version, vinfo] of Object.entries(info.versions)) {
        const isDefault = version === info.defaultVersion ? ' (default)' : '';
        console.log(
          chalk.dim('      ' + version + isDefault + ' — ' +
            (existsSync(vinfo.path) ? chalk.green('installed') : chalk.red('missing')) +
            ' [' + this.formatSize(vinfo.size) + ']')
        );
      }
      console.log();
    }
  }

  private async pullTemplate(args: string[]): Promise<void> {
    const target = args[0] ?? 'ddd-hexagonal-ai-template';
    const version = args[1] ?? '0.1.0';

    if (globalCache.isInstalled(target, version)) {
      console.log(chalk.green('\n  Template ' + target + '@' + version + ' is already installed.\n'));
      return;
    }

    const devPath = templateResolver.getDevTemplatePath();
    if (devPath) {
      console.log(chalk.cyan('\n  Dev mode: using local template at ' + devPath));
      templateResolver.installToCache(target, devPath, version);
      console.log(chalk.green('\n  Dev template installed to cache: ' + target + '@' + version + '.\n'));
      return;
    }

    const registry = globalCache.getRegistry();
    const info = registry[target];
    const sourceUrl = info?.source ?? 'github:cmartinezs/' + target;

    console.log(chalk.cyan('\n  Pulling template ' + target + '@' + version + '...\n'));
    console.log(chalk.dim('  Source: ' + sourceUrl));

    const cachePath = globalCache.getTemplatePath(target, version);
    mkdirSync(cachePath, { recursive: true });

    const ghRepo = sourceUrl.replace(/^github:/, '');
    const gitUrl = 'https://github.com/' + ghRepo + '.git';
    const tmpDir = join(cachePath, '..', '.tmp-' + target + '-' + version);

    try {
      console.log(chalk.dim('  Cloning from ' + gitUrl + '...'));
      execSync('git clone --depth 1 --branch v' + version + ' ' + gitUrl + ' ' + tmpDir, { stdio: 'pipe' });
      cpSync(tmpDir, cachePath, { recursive: true, force: true });
      execSync('rm -rf ' + tmpDir, { stdio: 'ignore' });

      globalCache.registerTemplate(target, version, {
        ref: 'v' + version,
        source: gitUrl,
      });

      console.log(chalk.green('\n  Template ' + target + '@' + version + ' installed successfully.\n'));
    } catch (err) {
      try { execSync('rm -rf ' + tmpDir, { stdio: 'ignore' }); } catch { /* ok */ }
      try { execSync('rm -rf ' + cachePath, { stdio: 'ignore' }); } catch { /* ok */ }

      console.log(chalk.red('\n  Failed to pull template from GitHub.'));
      console.log(chalk.yellow('  Make sure git is installed and you have access to the repository.'));
      console.log(chalk.dim('  URL: ' + gitUrl + '\n'));
    }
  }

  private updateTemplates(): void {
    console.log(chalk.cyan('\n  Updating templates...\n'));
    const registry = globalCache.getRegistry();
    const count = Object.values(registry).reduce((acc, info) => acc + Object.keys(info.versions).length, 0);
    console.log(chalk.green('  ' + count + ' template version(s) in cache.\n'));
    console.log(chalk.dim('  Use `archon templates pull <id>@<version>` to add specific versions.\n'));
  }

  private removeTemplate(args: string[]): void {
    const target = args[0];
    if (!target) {
      console.error(chalk.red('\n  Usage: archon templates remove <id>@<version>\n'));
      return;
    }

    const [id, version] = target.includes('@') ? target.split('@') : [target, undefined];
    if (!version) {
      console.error(chalk.red('\n  Specify version: archon templates remove ' + id + '@<version>\n'));
      return;
    }

    console.log(chalk.yellow('\n  Remove not yet implemented.\n'));
  }

  private doctorTemplates(): void {
    console.log(chalk.cyan('\n  Template Cache Doctor\n'));

    const registry = globalCache.getRegistry();
    let issues = 0;
    let ok = 0;

    for (const [id, info] of Object.entries(registry)) {
      for (const [version, vinfo] of Object.entries(info.versions)) {
        if (existsSync(vinfo.path)) {
          console.log(chalk.green('  OK   ') + id + '@' + version);
          ok++;
        } else {
          console.log(chalk.red('  MISS ') + id + '@' + version + ' — path not found');
          issues++;
        }
      }
    }

    console.log();
    console.log('  Templates: ' + ok + ' OK, ' + issues + ' issues');
    console.log('  Cache size: ' + this.formatSize(globalCache.getCacheSize()));
    console.log();
  }

  private formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]!;
  }
}