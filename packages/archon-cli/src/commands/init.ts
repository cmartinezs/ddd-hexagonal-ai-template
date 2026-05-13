import chalk from 'chalk';
import { resolve, join } from 'node:path';
import { existsSync, mkdirSync, readFileSync, readdirSync, copyFileSync } from 'node:fs';
import inquirer from 'inquirer';
import { detectMode } from '../core/mode-detector.js';
import { StateManager } from '../core/state-manager.js';
import { ConfigManager } from '../core/config-manager.js';
import { templateResolver } from '../core/global-cache/index.js';

function findLocalTemplate(cwd: string): string | null {
  const markers = ['01-templates', '.git', 'AGENTS.md', '00-guides-and-instructions'];
  let dir = cwd;
  for (let i = 0; i < 10; i++) {
    const found = markers.filter((m) => existsSync(join(dir, m)));
    if (found.length >= 2) {
      const templatesDir = join(dir, '01-templates');
      if (existsSync(templatesDir) && readdirSync(templatesDir, { withFileTypes: true }).some((e) => e.isDirectory())) {
        return dir;
      }
    }
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

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

    const localPath = findLocalTemplate(process.cwd());
    if (localPath) {
      templatePath = localPath;
      try {
        const pkgPath = join(templatePath, 'package.json');
        if (existsSync(pkgPath)) {
          const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string };
          templateVersion = pkg.version ?? '0.1.0';
        }
      } catch {
        // use default
      }
    } else {
      try {
        const resolved = templateResolver.resolve(templateId, templateVersion);
        templatePath = resolved.path;
        templateVersion = resolved.version;
      } catch {
        console.error(chalk.red('\n  Template not found in cache.'));
        console.error(chalk.yellow('  Run `archon templates pull` to download the template first.\n'));
        process.exit(1);
      }
    }

    console.log(chalk.cyan('\n  Initializing Archon project...\n'));
    console.log('  Project: ' + projectName);
    console.log('  Slug:    ' + slug);
    console.log('  Agent:   ' + agent);
    console.log('  Path:    ./' + slug + '/');

    mkdirSync(projectPath, { recursive: true });

    const templateDocs = join(templatePath, '01-templates');
    const projectDocs = join(projectPath, 'docs');
    mkdirSync(projectDocs, { recursive: true });

    if (existsSync(templateDocs)) {
      const phaseDirs = readdirSync(templateDocs, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();

      for (const dir of phaseDirs) {
        mkdirSync(join(projectDocs, dir), { recursive: true });
      }

      console.log(chalk.dim('  Copied ' + phaseDirs.length + ' phase directories from template.\n'));
    } else {
      mkdirSync(join(projectDocs, '00-documentation-planning'), { recursive: true });
    }

    const guidesDir = join(projectPath, '.archon', 'guides');
    mkdirSync(guidesDir, { recursive: true });

    const templateGuides = join(templatePath, '00-guides-and-instructions');
    if (existsSync(templateGuides)) {
      this.copyDirRecursive(templateGuides, guidesDir);
      console.log(chalk.dim('  Copied AI guides to .archon/guides/\n'));
    }

    const rootAgents = join(templatePath, 'AGENTS.md');
    if (existsSync(rootAgents)) {
      const destAgents = join(projectPath, '.archon', 'AGENTS.md');
      copyFileSync(rootAgents, destAgents);
      console.log(chalk.dim('  Copied AGENTS.md to .archon/\n'));
    }

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

  private copyDirRecursive(src: string, dest: string): void {
    if (!existsSync(src)) return;
    mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      if (entry.isDirectory()) {
        this.copyDirRecursive(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
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