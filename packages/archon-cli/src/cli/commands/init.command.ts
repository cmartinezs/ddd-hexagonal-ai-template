import chalk from 'chalk';
import { detectMode } from '../../core/mode-detector.js';
import { InitProjectUseCase } from '../../application/init-project.usecase.js';
import type { AgentType } from '../../core/types.js';
import { AGENT_TIERS } from '../../infrastructure/agents/index.js';

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
    const agent = (agentOpt ?? await this.askAgent()) as AgentType;

    console.log(chalk.cyan('\n  Initializing Archon project...\n'));

    const uc = new InitProjectUseCase();
    const result = uc.execute({ projectName, agent });

    if (result.error) {
      console.error(chalk.red('\n  ' + result.error + '\n'));
      process.exit(1);
    }

    console.log('  Project: ' + projectName);
    console.log('  Slug:    ' + result.slug);
    console.log('  Agent:   ' + agent);
    console.log('  Path:    ./' + result.slug + '/');

    if (result.isDev) {
      console.log(chalk.yellow('  [dev mode] Using linked template.\n'));
    }

    if (result.phaseDirsCount > 0) {
      console.log(chalk.dim('  Copied ' + result.phaseDirsCount + ' phase directories from template.\n'));
    }

    console.log(chalk.dim('  Copied AI guides to .archon/guides/\n'));
    console.log(chalk.dim('  Copied AGENTS.md to .archon/\n'));

    console.log(chalk.green('\n  Project created successfully!\n'));
    console.log(chalk.bold('  Next steps:\n'));
    console.log('    cd ' + result.slug);
    console.log('    archon status');
    console.log('    archon guide');
    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }

  private async askProjectName(): Promise<string> {
    const inquirer = (await import('inquirer')).default;
    const { name } = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name:',
      validate: (v: string) => /^[a-zA-Z0-9\s_-]{1,100}$/.test(v.trim()) || 'Invalid project name',
    }]);
    return name;
  }

  private async askAgent(): Promise<string> {
    const inquirer = (await import('inquirer')).default;

    const agentTierIcon = (tier: string): string => {
      switch (tier) {
        case 'supported': return chalk.green('✅');
        case 'prompt-only': return chalk.yellow('📝');
        case 'planned': return chalk.gray('⏳');
        default: return chalk.gray('❓');
      }
    };

    const agentTierLabel = (tier: string): string => {
      switch (tier) {
        case 'supported': return 'supported';
        case 'prompt-only': return 'prompt-only';
        case 'planned': return 'planned (not executable yet)';
        default: return tier;
      }
    };

    const choices = Object.entries(AGENT_TIERS).map(([id, tier]) => ({
      name: `${agentTierIcon(tier)} ${id} — ${agentTierLabel(tier)}`,
      value: id,
    }));

    const { agent } = await inquirer.prompt([{
      type: 'list',
      name: 'agent',
      message: 'Which AI agent are you using?',
      choices,
      default: 'opencode',
    }]);

    const selectedTier = AGENT_TIERS[agent] ?? 'planned';
    if (selectedTier === 'planned') {
      console.log(chalk.yellow('\n  ⚠️  ' + agent + ' is planned but not yet executable.'));
      console.log(chalk.dim('  Only opencode, claude, and manual are currently supported.\n'));
      process.exit(1);
    }

    return agent;
  }
}
