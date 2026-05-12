import chalk from 'chalk';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';

export class ConfigCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0];

    const mode = detectMode();
    const cm = new ConfigManager(mode.mode === 'project' ? mode.projectPath : process.cwd());

    if (!subcommand || subcommand === 'ls') {
      const config = cm.load();
      console.log(chalk.cyan('\n⚙️  Configuration:\n'));
      console.log(`  ${chalk.bold('agent.type'.padEnd(20))} ${chalk.cyan(config.agent.type)}`);
      console.log(`  ${chalk.bold('agent.transport'.padEnd(20))} ${chalk.cyan(config.agent.transport)}`);
      console.log(`  ${chalk.bold('interactiveMode'.padEnd(20))} ${chalk.cyan(config.interactiveMode)}`);
      console.log(`  ${chalk.bold('autoUpgrade'.padEnd(20))} ${chalk.cyan(String(config.autoUpgrade))}`);
      console.log(chalk.bold('\nDefaults:'));
      const defaults = cm.listDefaults();
      if (Object.keys(defaults).length === 0) {
        console.log(chalk.dim('  (none)'));
      } else {
        for (const [key, value] of Object.entries(defaults)) {
          console.log(`  ${chalk.bold(key.padEnd(18))} ${chalk.cyan(JSON.stringify(value))}`);
        }
      }
      console.log();
      return;
    }

    switch (subcommand) {
      case 'set': {
        const key = opts['key'] as string | undefined ?? args[1];
        const value = opts['value'] as string | undefined ?? args[2];
        if (!key || value === undefined) {
          console.error(chalk.red('\n❌ Usage: archon config set <key> <value>\n'));
          process.exit(1);
        }
        const parsedValue = this.parseValue(value);
        if (key === 'defaults') {
          const [dk, dv] = args.slice(1);
          if (!dk || dv === undefined) {
            console.error(chalk.red('\n❌ Usage: archon config set defaults <key> <value>\n'));
            process.exit(1);
          }
          cm.setDefault(dk, this.parseValue(dv));
        } else {
          cm.set(key as keyof ReturnType<typeof cm.load>, parsedValue as never);
        }
        console.log(chalk.green(`\n✅ ${key} = ${value}\n`));
        break;
      }
      case 'get': {
        const key = opts['key'] as string | undefined ?? args[1];
        if (!key) {
          console.error(chalk.red('\n❌ Usage: archon config get <key>\n'));
          process.exit(1);
        }
        if (key === 'defaults') {
          console.log(JSON.stringify(cm.listDefaults(), null, 2));
        } else {
          const val = cm.get(key as 'agent' | 'interactiveMode' | 'autoUpgrade');
          console.log(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val));
        }
        break;
      }
      case 'delete': {
        const key = args[1];
        if (!key) {
          console.error(chalk.red('\n❌ Usage: archon config delete <default-key>\n'));
          process.exit(1);
        }
        cm.deleteDefault(key);
        console.log(chalk.green(`\n✅ Deleted default: ${key}\n`));
        break;
      }
      default:
        console.error(chalk.red(`\n❌ Unknown config command: ${subcommand}`));
        console.error(chalk.yellow('\nUsage: archon config set|get|ls [key] [value]\n'));
        process.exit(1);
    }
  }

  private parseValue(value: string): string | boolean | number {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(Number(value)) && value.trim() !== '') return Number(value);
    return value;
  }
}