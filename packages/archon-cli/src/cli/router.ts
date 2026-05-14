import chalk from 'chalk';

export interface CliCommand {
  name: string;
  description: string;
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
    const pkgPath = join(selfDir, '..', '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    version = pkg.version ?? '0.1.0';
  } catch { /* use default */ }

  console.log('Archon v' + version);
  console.log(chalk.dim('DDD Template CLI — Systematizing Domain-Driven Design workflows'));
}

async function getCommands(): Promise<CliCommand[]> {
  return [
    {
      name: 'generate',
      description: 'Scaffold phase documentation files from template',
      handler: async (a, o) => {
        const { GenerateCommand } = await import('./commands/generate.command.js');
        await new GenerateCommand().run(a, o);
      },
    },
    {
      name: 'init',
      description: 'Initialize new project from template',
      handler: async (a, o) => {
        const { InitCommand } = await import('./commands/init.command.js');
        await new InitCommand().run(a, o);
      },
    },
    {
      name: 'status',
      description: 'Show current phase and progress',
      handler: async (a, o) => {
        const { StatusCommand } = await import('./commands/status.command.js');
        await new StatusCommand().run(a, o);
      },
    },
    {
      name: 'next',
      description: 'Advance to next phase',
      handler: async (a, o) => {
        const { NextCommand } = await import('./commands/next.command.js');
        await new NextCommand().run(a, o);
      },
    },
    {
      name: 'complete',
      description: 'Mark current or specified phase as complete',
      handler: async (a, o) => {
        const { CompleteCommand } = await import('./commands/complete.command.js');
        await new CompleteCommand().run(a, o);
      },
    },
    {
      name: 'check',
      description: 'Validate current phase constraints',
      handler: async (a, o) => {
        const { CheckCommand } = await import('./commands/check.command.js');
        await new CheckCommand().run(a, o);
      },
    },
    {
      name: 'prompt',
      description: 'Generate AI prompt for current or specified phase',
      handler: async (a, o) => {
        const { PromptCommand } = await import('./commands/prompt.command.js');
        await new PromptCommand().run(a, o);
      },
    },
    {
      name: 'context',
      description: 'Scan project and generate context files',
      handler: async (a, o) => {
        const { ContextCommand } = await import('./commands/context.command.js');
        await new ContextCommand().run(a, o);
      },
    },
    {
      name: 'run',
      description: 'Execute AI agent via adapter',
      handler: async (a, o) => {
        const { RunCommand } = await import('./commands/run.command.js');
        await new RunCommand().run(a, o);
      },
    },
    {
      name: 'agent',
      description: 'Manage AI agent configuration',
      handler: async (a, o) => {
        const { AgentCommand } = await import('./commands/agent.command.js');
        await new AgentCommand().run(a, o);
      },
    },
    {
      name: 'config',
      description: 'Manage configuration defaults',
      handler: async (a, o) => {
        const { ConfigCommand } = await import('./commands/config.command.js');
        await new ConfigCommand().run(a, o);
      },
    },
    {
      name: 'guide',
      description: 'Interactive help for current or specified phase',
      handler: async (a, o) => {
        const { GuideCommand } = await import('./commands/guide.command.js');
        await new GuideCommand().run(a, o);
      },
    },
    {
      name: 'tutorial',
      description: 'Guided tutorial mode',
      handler: async (a, o) => {
        const { TutorialCommand } = await import('./commands/tutorial.command.js');
        await new TutorialCommand().run(a, o);
      },
    },
    {
      name: 'doctor',
      description: 'Health check and integrity validation',
      handler: async (a, o) => {
        const { DoctorCommand } = await import('./commands/doctor.command.js');
        await new DoctorCommand().run(a, o);
      },
    },
    {
      name: 'upgrade',
      description: 'Upgrade template to newer version',
      handler: async (a, o) => {
        const { UpgradeCommand } = await import('./commands/upgrade.command.js');
        await new UpgradeCommand().run(a, o);
      },
    },
    {
      name: 'prompts',
      description: 'Manage accumulated prompt library',
      handler: async (a, o) => {
        const { PromptsCommand } = await import('./commands/prompts.command.js');
        await new PromptsCommand().run(a, o);
      },
    },
    {
      name: 'templates',
      description: 'Manage global template cache',
      handler: async (a, o) => {
        const { TemplatesCommand } = await import('./commands/templates.command.js');
        await new TemplatesCommand().run(a, o);
      },
    },
    {
      name: 'models',
      description: 'List or set AI agent models',
      handler: async (a, o) => {
        const { ModelsCommand } = await import('./commands/models.command.js');
        await new ModelsCommand().run(a, o);
      },
    },
    {
      name: 'serve',
      description: 'Manage opencode persistent server',
      handler: async (a, o) => {
        const { ServeCommand } = await import('./commands/serve.command.js');
        await new ServeCommand().run(a, o);
      },
    },
    {
      name: 'review',
      description: 'Review documentation quality for a phase',
      handler: async (a, o) => {
        const { ReviewCommand } = await import('./commands/review.command.js');
        await new ReviewCommand().run(a, o);
      },
    },
    {
      name: 'trace',
      description: 'Show traceability matrix across phases',
      handler: async (a, o) => {
        const { TraceCommand } = await import('./commands/trace.command.js');
        await new TraceCommand().run(a, o);
      },
    },
    {
      name: 'diff',
      description: 'Diff template versions',
      handler: async (a, o) => {
        const { DiffCommand } = await import('./commands/diff.command.js');
        await new DiffCommand().run(a, o);
      },
    },
    {
      name: 'quality',
      description: 'Overall documentation quality score',
      handler: async (a, o) => {
        const { QualityCommand } = await import('./commands/quality.command.js');
        await new QualityCommand().run(a, o);
      },
    },
    {
      name: 'dev',
      description: 'Development commands (link-template, unlink)',
      handler: async (a, o) => {
        const { DevCommand } = await import('./commands/dev.command.js');
        await new DevCommand().run(a, o);
      },
    },
  ];
}
