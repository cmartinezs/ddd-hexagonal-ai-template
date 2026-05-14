import chalk from 'chalk';
import { globalCache, templateResolver } from '../../core/global-cache/index.js';
import { existsSync, cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execa } from 'execa';

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
    const rawTarget = args[0] ?? 'ddd-hexagonal-ai-template';

    let id: string;
    let version: string;

    if (rawTarget.includes('@')) {
      const atIdx = rawTarget.lastIndexOf('@');
      id = rawTarget.slice(0, atIdx);
      version = rawTarget.slice(atIdx + 1);
      if (!id || !version) {
        console.error(chalk.red('\n  Invalid format. Usage: archon templates pull <id>@<version>\n'));
        process.exit(1);
      }
    } else {
      id = rawTarget;
      version = args[1] ?? '0.1.0';
    }

    if (globalCache.isInstalled(id, version)) {
      console.log(chalk.green('\n  Template ' + id + '@' + version + ' is already installed.\n'));
      return;
    }

    const devPath = templateResolver.getDevTemplatePath();
    if (devPath) {
      console.log(chalk.cyan('\n  Dev mode: using local template at ' + devPath));
      templateResolver.installToCache(id, devPath, version);
      console.log(chalk.green('\n  Dev template installed to cache: ' + id + '@' + version + '.\n'));
      return;
    }

    const registry = globalCache.getRegistry();
    const info = registry[id];
    const sourceUrl = info?.source ?? 'github:cmartinezs/' + id;

    console.log(chalk.cyan('\n  Pulling template ' + id + '@' + version + '...\n'));
    console.log(chalk.dim('  Source: ' + sourceUrl));

    const cachePath = globalCache.getTemplatePath(id, version);
    mkdirSync(cachePath, { recursive: true });

    const ghRepo = sourceUrl.replace(/^github:/, '');
    const gitUrl = 'https://github.com/' + ghRepo + '.git';
    const tagRef = 'v' + version;
    const tmpDir = join(cachePath, '..', '.tmp-' + id + '-' + version);

    try {
      console.log(chalk.dim('  Cloning tag ' + tagRef + ' from ' + gitUrl + '...'));
      await execa('git', ['clone', '--branch', tagRef, '--depth', '1', gitUrl, tmpDir], { stdio: 'inherit' });

      const { stdout: sha } = await execa('git', ['-C', tmpDir, 'rev-parse', 'HEAD']);
      const commitSha = sha.trim();

      cpSync(tmpDir, cachePath, { recursive: true, force: true });
      rmSync(tmpDir, { recursive: true, force: true });

      globalCache.registerTemplate(id, version, {
        ref: tagRef,
        source: gitUrl,
        commitSha,
      });

      console.log(chalk.green('\n  Template ' + id + '@' + version + ' installed successfully.'));
      console.log(chalk.dim('  Commit: ' + commitSha.slice(0, 7) + '\n'));
    } catch (err) {
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ok */ }
      try { rmSync(cachePath, { recursive: true, force: true }); } catch { /* ok */ }

      const errorMsg = err instanceof Error ? (err as unknown as { stderr?: string }).stderr ?? err.message : String(err);
      if (errorMsg.includes('not found') || errorMsg.includes("Remote branch '" + tagRef) || errorMsg.includes('pathspec')) {
        console.log(chalk.red('\n  Tag ' + tagRef + ' not found in ' + gitUrl + '.'));
        console.log(chalk.yellow('  Check available versions with: archon templates ls\n'));
      } else {
        console.log(chalk.red('\n  Failed to pull template from GitHub.'));
        console.log(chalk.dim('  ' + errorMsg.trim()));
        console.log(chalk.yellow('  Source: ' + sourceUrl + '\n'));
      }
      process.exit(1);
    }
  }

  private updateTemplates(): void {
    console.log(chalk.cyan('\n  Updating templates...\n'));
    const registry = globalCache.getRegistry();
    const count = Object.values(registry).reduce((acc, info) => acc + Object.keys(info.versions).length, 0);
    console.log(chalk.green('  ' + count + ' template version(s) in cache.\n'));
    console.log(chalk.dim('  Use `archon templates pull <id>@<version>` to add specific versions.\n'));
  }

  private removeTemplate(_args: string[]): void {
    console.log(chalk.yellow('\n  [planned] `archon templates remove` is not yet implemented.'));
    console.log(chalk.dim('  To remove a cached template manually, delete the version folder from the global cache.\n'));
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