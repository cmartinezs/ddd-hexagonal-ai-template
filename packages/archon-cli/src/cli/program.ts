import { Command } from 'commander';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export function createProgram(): Command {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const require = createRequire(import.meta.url);

  let version = '0.1.0';
  try {
    const pkg = require(join(__dirname, '../../package.json')) as { version?: string };
    version = pkg.version ?? '0.1.0';
  } catch { /* use default */ }

  const program = new Command();

  program
    .name('archon')
    .description('Archon — DDD Template CLI')
    .version(version, '-v, --version')
    .enablePositionalOptions();

  const templates = program
    .command('templates')
    .description('Manage global template cache')
    .enablePositionalOptions();

  templates
    .command('ls', { isDefault: true })
    .description('List installed templates')
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .passThroughOptions()
    .argument('[args...]')
    .action(async function(this: Command, _opts: Record<string, unknown>) {
      const rawArgs: string[] = this.args;
      const { runCommand } = await import('./router.js');
      await runCommand('templates', rawArgs, _opts);
    });

  templates
    .command('dev')
    .description('Development commands')
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .passThroughOptions()
    .argument('[args...]')
    .action(async function(this: Command, _opts: Record<string, unknown>) {
      const rawArgs: string[] = this.args;
      const { runCommand } = await import('./router.js');
      await runCommand('dev', rawArgs, _opts);
    });

  program
    .command('dev')
    .description('Development commands (link-template, unlink)')
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .passThroughOptions()
    .argument('[args...]')
    .action(async function(this: Command, _opts: Record<string, unknown>) {
      const rawArgs: string[] = this.args;
      const { runCommand } = await import('./router.js');
      await runCommand('dev', rawArgs, _opts);
    });

  const commandDefs: [name: string, description: string, options?: string[]][] = [
    ['init', 'Initialize new project from template', ['--name <name>', '--agent <agent>']],
    ['generate', 'Scaffold phase documentation files from template', ['--phase <phase>', '--force']],
    ['status', 'Show current phase and progress', ['--json', '--verbose']],
    ['next', 'Advance to next phase', ['--phase <phase>']],
    ['complete', 'Mark current or specified phase as complete', ['--phase <phase>']],
    ['check', 'Validate current phase constraints', ['--phase <phase>', '--force', '--json']],
    ['prompt', 'Generate AI prompt for current or specified phase', ['--phase <phase>', '--context <context>', '--output <output>']],
    ['context', 'Scan project and generate context files', ['--force']],
    ['run', 'Execute AI agent via adapter', ['--agent <agent>', '--phase <phase>', '--attach <attach>', '--transport <transport>', '--dry-run']],
    ['agent', 'Manage AI agent configuration', ['--agent <agent>']],
    ['config', 'Manage configuration defaults', ['--key <key>', '--value <value>']],
    ['guide', 'Interactive help for current or specified phase', ['--phase <phase>']],
    ['tutorial', 'Guided tutorial mode', ['--step <step>']],
    ['doctor', 'Health check and integrity validation', ['--fix']],
    ['upgrade', 'Upgrade template to newer version', ['--target <target>', '--rollback <rollback>', '--guide']],
    ['prompts', 'Manage accumulated prompt library', ['--file <file>', '--from <from>', '--to <to>']],
    ['models', 'List or set AI agent models', ['--set <set>']],
    ['serve', 'Manage opencode persistent server'],
    ['review', 'Review documentation quality for a phase', ['--phase <phase>', '--format <format>']],
    ['trace', 'Show traceability matrix across phases', ['--term <term>']],
    ['diff', 'Diff template versions', ['--from <from>', '--to <to>']],
    ['quality', 'Overall documentation quality score', ['--phase <phase>', '--format <format>']],
  ];

  for (const [name, description, options = []] of commandDefs) {
    if (name === 'dev') continue;

    const cmd = program.command(name).description(description);

    for (const opt of options) {
      cmd.option(opt);
    }

    cmd.action(async (opts: Record<string, unknown>, cmd: Command) => {
      const rawArgs: string[] = cmd.args;
      const { runCommand } = await import('./router.js');
      await runCommand(name, rawArgs, opts);
    });
  }

  return program;
}