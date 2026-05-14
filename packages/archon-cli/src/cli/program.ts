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

  const commandNames = [
    ['generate', 'Scaffold phase documentation files from template'],
    ['init', 'Initialize new project from template'],
    ['status', 'Show current phase and progress'],
    ['next', 'Advance to next phase'],
    ['complete', 'Mark current or specified phase as complete'],
    ['check', 'Validate current phase constraints'],
    ['prompt', 'Generate AI prompt for current or specified phase'],
    ['context', 'Scan project and generate context files'],
    ['run', 'Execute AI agent via adapter'],
    ['agent', 'Manage AI agent configuration'],
    ['config', 'Manage configuration defaults'],
    ['guide', 'Interactive help for current or specified phase'],
    ['tutorial', 'Guided tutorial mode'],
    ['doctor', 'Health check and integrity validation'],
    ['upgrade', 'Upgrade template to newer version'],
    ['prompts', 'Manage accumulated prompt library'],
    ['templates', 'Manage global template cache'],
    ['models', 'List or set AI agent models'],
    ['serve', 'Manage opencode persistent server'],
    ['review', 'Review documentation quality for a phase'],
    ['trace', 'Show traceability matrix across phases'],
    ['diff', 'Diff template versions'],
    ['quality', 'Overall documentation quality score'],
    ['dev', 'Development commands (link-template, unlink)'],
  ] as const;

  for (const [name, description] of commandNames) {
    program
      .command(name)
      .description(description)
      .allowUnknownOption()
      .passThroughOptions()
      .action(async (_opts: Record<string, unknown>, cmd: Command) => {
        const rawArgs: string[] = cmd.args;
        const opts = parseOpts(rawArgs);
        const { runCommand } = await import('./router.js');
        await runCommand(name, rawArgs, opts);
      });
  }

  return program;
}

function parseOpts(args: string[]): Record<string, unknown> {
  const opts: Record<string, unknown> = {};
  const boolFlags = new Set([
    'help', 'h', 'copy', 'dry-run', 'dryRun', 'confirm', 'regenerate',
    'doctor', 'force', 'no-strict', 'json', 'fix', 'info', 'ci',
  ]);
  const valueFlags = new Set([
    'phase', 'context', 'attach', 'output', 'agent', 'name', 'target',
    'url', 'format', 'file', 'from', 'to', 'agent-name', 'id',
    'set', 'transport', 'model', 'session', 'omit', 'key', 'value',
    'rollback', 'guide',
  ]);

  let i = 0;
  while (i < args.length) {
    const arg = args[i]!;
    if (!arg.startsWith('--') && !arg.startsWith('-')) { i++; continue; }
    const key = arg.replace(/^--?/, '');
    if (boolFlags.has(key)) {
      opts[key] = true;
      i++;
    } else if (valueFlags.has(key) && args[i + 1] !== undefined && !args[i + 1]!.startsWith('-')) {
      opts[key] = args[i + 1];
      i += 2;
    } else {
      i++;
    }
  }
  return opts;
}
