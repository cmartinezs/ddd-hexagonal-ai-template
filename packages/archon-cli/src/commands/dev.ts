import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ARCHON_CACHE_DIR } from '../core/global-cache/index.js';
import { templateResolver } from '../core/global-cache/index.js';

const DEV_CONFIG_FILE = join(ARCHON_CACHE_DIR, 'dev.json');

interface DevConfig {
  linkedTemplatePath: string | null;
}

function readDevConfig(): DevConfig {
  if (!existsSync(DEV_CONFIG_FILE)) {
    return { linkedTemplatePath: null };
  }
  try {
    const raw = readFileSync(DEV_CONFIG_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { linkedTemplatePath: null };
  }
}

function writeDevConfig(config: DevConfig): void {
  writeFileSync(DEV_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export class DevCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0];

    switch (subcommand) {
      case 'link-template':
        this.linkTemplate(args.slice(1));
        break;
      case 'unlink-template':
        this.unlinkTemplate();
        break;
      case 'status':
        this.devStatus();
        break;
      default:
        this.devStatus();
    }
  }

  private linkTemplate(args: string[]): void {
    const path = args[0];
    if (!path) {
      console.error(chalk.red('\n  Usage: archon dev link-template <path>\n'));
      process.exit(1);
    }

    const absPath = resolve(process.cwd(), path);

    if (!existsSync(absPath)) {
      console.error(chalk.red('\n  Path does not exist: ' + absPath + '\n'));
      process.exit(1);
    }

    const requiredFiles = ['01-templates', '00-guides-and-instructions'];
    for (const f of requiredFiles) {
      if (!existsSync(join(absPath, f))) {
        console.error(chalk.red('\n  Path does not look like a template: missing `' + f + '`\n'));
        process.exit(1);
      }
    }

    const config: DevConfig = { linkedTemplatePath: absPath };
    writeDevConfig(config);

    templateResolver.setDevTemplatePath(absPath);

    console.log(chalk.green('\n  Template linked: ' + absPath));
    console.log(chalk.dim('  This overrides the global cache for `archon init` and `archon prompt`.\n'));
  }

  private unlinkTemplate(): void {
    const config: DevConfig = { linkedTemplatePath: null };
    writeDevConfig(config);

    console.log(chalk.green('\n  Template unlinked. Using global cache.\n'));
  }

  private devStatus(): void {
    const config = readDevConfig();

    console.log(chalk.cyan('\n  Archon Developer Mode\n'));

    if (config.linkedTemplatePath) {
      console.log('  Template: ' + chalk.green('linked'));
      console.log('  Path:     ' + chalk.white(config.linkedTemplatePath));
      console.log('  Exists:   ' + (existsSync(config.linkedTemplatePath) ? chalk.green('yes') : chalk.red('no')));
    } else {
      console.log('  Template: ' + chalk.yellow('using global cache'));
    }

    console.log();
    console.log('  Environment:');
    console.log('    ARCHON_DEV_TEMPLATE_PATH: ' + (process.env['ARCHON_DEV_TEMPLATE_PATH'] ? chalk.green(process.env['ARCHON_DEV_TEMPLATE_PATH']) : chalk.dim('not set')));
    console.log();

    console.log('  Commands:');
    console.log('    archon dev link-template <path>  Link local template');
    console.log('    archon dev unlink-template     Use global cache');
    console.log();
  }
}