import chalk from 'chalk';

export interface Command {
  name: string;
  description: string;
  options: string;
  handler: (args: string[], opts: Record<string, unknown>) => Promise<void>;
}

export async function runCommand(
  command: string | undefined,
  args: string[],
  opts: Record<string, unknown>
): Promise<void> {
  if (!command) {
    await printHelp();
    return;
  }

  const cmd = command.toLowerCase();

  if (opts.help || cmd === 'help') {
    await printHelp();
    return;
  }

  if (cmd === 'version' || opts.version) {
    await printVersion();
    return;
  }

  const commands = await getCommands();
  const matched = commands.find((c) => c.name === cmd);

  if (!matched) {
    console.error(chalk.red(`\n❌ Unknown command: ${command}`));
    console.error(chalk.yellow(`\nRun 'archon --help' for available commands.\n`));
    process.exit(1);
  }

  await matched.handler(args, opts);
}

async function printHelp(): Promise<void> {
  const commands = await getCommands();

  console.log(`
${chalk.bold('Archon')} — DDD Template CLI

${chalk.dim('Usage:')} archon <command> [options]

${chalk.bold('Commands:')}
${commands.map((c) => `  ${chalk.cyan(c.name.padEnd(20))} ${chalk.dim(c.description)}`).join('\n')}

${chalk.bold('Options:')}
  ${chalk.cyan('-h, --help')}          Show this help
  ${chalk.cyan('-v, --version')}        Show version
  ${chalk.cyan('--debug')}             Enable debug mode

${chalk.bold('Examples:')}
  ${chalk.dim('archon init --name my-tcg --agent opencode')}
  ${chalk.dim('archon status')}
  ${chalk.dim('archon prompt --phase 3 --context full')}
  ${chalk.dim('archon run --agent opencode --phase 3')}
  ${chalk.dim('archon agent doctor opencode')}

${chalk.bold('Getting started:')}
  ${chalk.dim('archon init --name <project>')}  Initialize a new project from template
  ${chalk.dim('archon status')}                  Show current phase and progress
  ${chalk.dim('archon guide')}                   Interactive help for current phase

Run ${chalk.cyan('archon <command> --help')} for detailed help on a specific command.
`);
}

async function printVersion(): Promise<void> {
  const { readFileSync } = await import('node:fs');
  const { join, dirname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');

  let version = '0.1.0';
  try {
    const selfUrl = import.meta.url;
    const selfDir = dirname(fileURLToPath(selfUrl));
    const pkgPath = join(selfDir, '..', '..', '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    version = pkg.version ?? '0.1.0';
  } catch {
    // use default
  }

  console.log('Archon v' + version);
  console.log(chalk.dim('DDD Template CLI — Systematizing Domain-Driven Design workflows'));
}

async function getCommands(): Promise<Command[]> {
  return [
    {
      name: 'init',
      description: 'Initialize new project from template',
      options: '[--name <name>] [--agent <opencode|claude|manual>]',
      handler: async (a, o) => {
        const { InitCommand } = await import('./init.js');
        await new InitCommand().run(a, o);
      },
    },
    {
      name: 'status',
      description: 'Show current phase and progress',
      options: '[--json]',
      handler: async (a, o) => {
        const { StatusCommand } = await import('./status.js');
        await new StatusCommand().run(a, o);
      },
    },
    {
      name: 'next',
      description: 'Advance to next phase',
      options: '[--phase <N>] [--confirm]',
      handler: async (a, o) => {
        const { NextCommand } = await import('./next.js');
        await new NextCommand().run(a, o);
      },
    },
    {
      name: 'check',
      description: 'Validate current phase constraints',
      options: '[--phase <N>] [--json] [--fix]',
      handler: async (a, o) => {
        const { CheckCommand } = await import('./check.js');
        await new CheckCommand().run(a, o);
      },
    },
    {
      name: 'prompt',
      description: 'Generate AI prompt for current or specified phase',
      options: '[--phase <N>] [--context full|summary|none] [--copy]',
      handler: async (a, o) => {
        const { PromptCommand } = await import('./prompt.js');
        await new PromptCommand().run(a, o);
      },
    },
    {
      name: 'context',
      description: 'Scan project and generate context files',
      options: 'scan [--output <dir>]',
      handler: async (a, o) => {
        const { ContextCommand } = await import('./context.js');
        await new ContextCommand().run(a, o);
      },
    },
    {
      name: 'run',
      description: 'Execute AI agent via adapter',
      options: '--agent <agent> --phase <N> [--dry-run] [--confirm] [--attach <url>]',
      handler: async (a, o) => {
        const { RunCommand } = await import('./run.js');
        await new RunCommand().run(a, o);
      },
    },
    {
      name: 'agent',
      description: 'Manage AI agent configuration',
      options: '[--set <opencode|claude|manual>] [--doctor] [--agent <name>]',
      handler: async (a, o) => {
        const { AgentCommand } = await import('./agent.js');
        await new AgentCommand().run(a, o);
      },
    },
    {
      name: 'config',
      description: 'Manage configuration defaults',
      options: 'set|get|ls [--key <key>] [--value <value>]',
      handler: async (a, o) => {
        const { ConfigCommand } = await import('./config.js');
        await new ConfigCommand().run(a, o);
      },
    },
    {
      name: 'guide',
      description: 'Interactive help for current or specified phase',
      options: '[--phase <N>]',
      handler: async (a, o) => {
        const { GuideCommand } = await import('./guide.js');
        await new GuideCommand().run(a, o);
      },
    },
    {
      name: 'tutorial',
      description: 'Guided tutorial mode',
      options: '[--mode project|template] [--step <N>]',
      handler: async (a, o) => {
        const { TutorialCommand } = await import('./tutorial.js');
        await new TutorialCommand().run(a, o);
      },
    },
    {
      name: 'doctor',
      description: 'Health check and integrity validation',
      options: '[--fix]',
      handler: async (a, o) => {
        const { DoctorCommand } = await import('./doctor.js');
        await new DoctorCommand().run(a, o);
      },
    },
    {
      name: 'upgrade',
      description: 'Upgrade template to newer version',
      options: '[--target <version>] [--dry-run] [--rollback <version>]',
      handler: async (a, o) => {
        const { UpgradeCommand } = await import('./upgrade.js');
        await new UpgradeCommand().run(a, o);
      },
    },
    {
      name: 'prompts',
      description: 'Manage accumulated prompt library',
      options: 'ls|rank|compress|merge|expand|export|clean [args...]',
      handler: async (a, o) => {
        const { PromptsCommand } = await import('./prompts.js');
        await new PromptsCommand().run(a, o);
      },
    },
    {
      name: 'templates',
      description: 'Manage global template cache',
      options: 'ls|pull|update|remove|doctor',
      handler: async (a, o) => {
        const { TemplatesCommand } = await import('./templates.js');
        await new TemplatesCommand().run(a, o);
      },
    },
    {
      name: 'models',
      description: 'List or set AI agent models',
      options: 'ls|set|current <agent> [model]',
      handler: async (a, o) => {
        const { ModelsCommand } = await import('./models.js');
        await new ModelsCommand().run(a, o);
      },
    },
    {
      name: 'dev',
      description: 'Development commands (link-template, unlink)',
      options: 'link-template|unlink-template|status',
      handler: async (a, o) => {
        const { DevCommand } = await import('./dev.js');
        await new DevCommand().run(a, o);
      },
    },
  ];
}