import chalk from 'chalk';
import { resolve, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

import inquirer from 'inquirer';
import { detectMode } from '../core/mode-detector.js';
import { StateManager } from '../core/state-manager.js';
import { ConfigManager } from '../core/config-manager.js';
import { templateResolver } from '../core/global-cache/index.js';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class InitCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const nameOpt = this.getArg(args, 'name');
    const agentOpt = this.getArg(args, 'agent');

    const mode = detectMode();

    if (mode.mode === 'project') {
      console.error(chalk.red('\n  Already in an Archon project.'));
      console.error(chalk.yellow('  Run `archon status` to see current project.\n'));
      process.exit(1);
    }

    const projectName = nameOpt ?? await this.askProjectName();
    const agent = agentOpt ?? await this.askAgent();

    if (!this.validateProjectName(projectName)) {
      console.error(chalk.red('\n  Invalid project name: "' + projectName + '"'));
      console.error(chalk.yellow('  Project name must be 1-100 chars, alphanumeric, spaces, hyphens, or underscores.\n'));
      process.exit(1);
    }

    const slug = slugify(projectName);
    const projectPath = resolve(process.cwd(), slug);

    if (existsSync(projectPath)) {
      console.error(chalk.red('\n  Project directory already exists: ' + projectPath));
      console.error(chalk.yellow('  Choose a different name or remove the existing directory.\n'));
      process.exit(1);
    }

    const templateId = 'ddd-hexagonal-ai-template';
    let templateVersion = '0.1.0';
    let templatePath: string;

    try {
      const resolved = templateResolver.resolve(templateId, templateVersion);
      templatePath = resolved.path;
      templateVersion = resolved.version;
    } catch {
      console.error(chalk.red('\n  Template not found in cache.'));
      console.error(chalk.yellow('  Run `archon templates pull` to download the template first.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n  Initializing Archon project...\n'));
    console.log('  Project: ' + projectName);
    console.log('  Slug:    ' + slug);
    console.log('  Agent:   ' + agent);
    console.log('  Path:    ./' + slug + '/');

    mkdirSync(projectPath, { recursive: true });

    const docsDir = join(projectPath, 'docs');
    mkdirSync(join(docsDir, '00-documentation-planning'), { recursive: true });
    mkdirSync(join(projectPath, '.archon', 'context'), { recursive: true });
    mkdirSync(join(projectPath, '.archon', 'prompts', 'metadata'), { recursive: true });
    mkdirSync(join(projectPath, '.archon', 'runs'), { recursive: true });

    const stateManager = new StateManager(projectPath);
    stateManager.create({ projectName, projectSlug: slug, agent: agent as 'opencode' | 'claude' | 'cursor' | 'manual' });

    const configManager = new ConfigManager(projectPath);
    configManager.setAgent(agent as 'opencode' | 'claude' | 'cursor' | 'manual');

    templateResolver.createTemplateLock(projectPath, templateId, templateVersion, templatePath);

    console.log(chalk.green('\n  Project created successfully!\n'));
    console.log(chalk.bold('  Next steps:\n'));
    console.log('    cd ' + slug);
    console.log('    archon status');
    console.log('    archon guide');
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }

  private async askProjectName(): Promise<string> {
    const { name } = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name:',
      validate: (v: string) => this.validateProjectName(v) || 'Invalid project name',
    }]);
    return name;
  }

  private async askAgent(): Promise<string> {
    const { agent } = await inquirer.prompt([{
      type: 'list',
      name: 'agent',
      message: 'Which AI agent are you using?',
      choices: [
        { name: 'opencode (primary)', value: 'opencode' },
        { name: 'Claude Code', value: 'claude' },
        { name: 'Cursor', value: 'cursor' },
        { name: 'Manual (prompts only)', value: 'manual' },
      ],
      default: 'opencode',
    }]);
    return agent;
  }

  private validateProjectName(name: string): boolean {
    return /^[a-zA-Z0-9\s_-]{1,100}$/.test(name.trim());
  }
}