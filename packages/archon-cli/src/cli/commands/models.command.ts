import chalk from 'chalk';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export class ModelsCommand {
  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    const subcommand = args[0] ?? 'ls';
    const agent = args[1];
    const model = args[2];

    switch (subcommand) {
      case 'ls':
        this.listModels(agent);
        break;
      case 'set':
        this.setModel(agent, model);
        break;
      case 'current':
        this.currentModel(agent);
        break;
      default:
        console.error(chalk.red('\n  Unknown subcommand: ' + subcommand));
        console.log(chalk.yellow('  Usage: archon models ls|set|current [agent] [model]\n'));
    }
  }

  private listModels(agent: string | undefined): void {
    if (!agent) {
      console.error(chalk.red('\n  Usage: archon models ls <agent>\n'));
      return;
    }

    if (agent === 'opencode') {
      try {
        const output = execSync('opencode models 2>&1', { encoding: 'utf-8', timeout: 10000 });
        const current = this.getOpencodeCurrentModel();
        console.log(chalk.cyan('\n  Opencode models\n'));
        if (current) {
          console.log('  Active: ' + chalk.green(current) + '\n');
        }
        const lines = output.split('\n').filter((l) => l.trim());
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed === current) {
            console.log(chalk.green('  ' + trimmed));
          } else {
            console.log('  ' + chalk.dim(trimmed));
          }
        }
        console.log();
      } catch {
        console.error(chalk.red('\n  Failed to list opencode models. Is opencode installed?\n'));
      }
    } else if (agent === 'claude') {
      const modelPath = join(homedir(), '.config', 'anthropic', 'config.json');
      try {
        const raw = readFileSync(modelPath, 'utf-8');
        const config = JSON.parse(raw) as { model?: string };
        console.log(chalk.cyan('\n  Claude Code configuration\n'));
        if (config.model) {
          console.log('  Active: ' + chalk.green(config.model) + '\n');
        } else {
          console.log('  No model set.\n');
        }
        console.log('  Known models: ' + chalk.dim('claude-sonnet-4-20250514, claude-opus-4, claude-3-5-sonnet-latest\n'));
      } catch {
        console.log(chalk.yellow('  No config found. Run `claude model set <model>` to configure.\n'));
      }
    } else {
      console.error(chalk.red('\n  Unknown agent: ' + agent + '\n'));
    }
  }

  private setModel(agent: string | undefined, model: string | undefined): void {
    if (!agent || !model) {
      console.error(chalk.red('\n  Usage: archon models set <agent> <model>\n'));
      return;
    }

    if (agent === 'opencode') {
      const modelPath = join(homedir(), '.local', 'state', 'opencode', 'model.json');
      try {
        const raw = readFileSync(modelPath, 'utf-8');
        const data = JSON.parse(raw) as {
          recent?: Array<{ providerID: string; modelID: string }>;
          favorite?: string[];
          variant?: Record<string, string>;
        };
        if (!data.recent) data.recent = [];
        const fullModel = model.startsWith('opencode/') ? model : 'opencode/' + model;
        const existingIdx = data.recent.findIndex((m) => m.providerID === 'opencode');
        if (existingIdx >= 0) {
          data.recent[existingIdx]!.modelID = fullModel;
        } else {
          data.recent.unshift({ providerID: 'opencode', modelID: fullModel });
        }
        if (!data.variant) data.variant = {};
        if (!data.variant[model]) data.variant[model] = 'default';
        writeFileSync(modelPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(chalk.green('\n  Model set: ' + model + '\n'));
      } catch (err) {
        console.error(chalk.red('\n  Failed to set opencode model: ' + (err instanceof Error ? err.message : err) + '\n'));
      }
    } else if (agent === 'claude') {
      const modelPath = join(homedir(), '.config', 'anthropic', 'config.json');
      try {
        let raw = '';
        try {
          raw = readFileSync(modelPath, 'utf-8');
        } catch {
          raw = '{}';
        }
        const config = JSON.parse(raw) as { model?: string };
        config.model = model;
        writeFileSync(modelPath, JSON.stringify(config, null, 2), 'utf-8');
        console.log(chalk.green('\n  Model set: ' + model + '\n'));
      } catch (err) {
        console.error(chalk.red('\n  Failed to set claude model: ' + (err instanceof Error ? err.message : err) + '\n'));
      }
    } else {
      console.error(chalk.red('\n  Unknown agent: ' + agent + '\n'));
    }
  }

  private currentModel(agent: string | undefined): void {
    if (!agent) {
      console.error(chalk.red('\n  Usage: archon models current <agent>\n'));
      return;
    }

    if (agent === 'opencode') {
      const model = this.getOpencodeCurrentModel();
      if (model) {
        console.log(chalk.green('\n  ' + model + '\n'));
      } else {
        console.log(chalk.yellow('\n  No active model found.\n'));
      }
    } else if (agent === 'claude') {
      const modelPath = join(homedir(), '.config', 'anthropic', 'config.json');
      try {
        const raw = readFileSync(modelPath, 'utf-8');
        const config = JSON.parse(raw) as { model?: string };
        if (config.model) {
          console.log(chalk.green('\n  ' + config.model + '\n'));
        } else {
          console.log(chalk.yellow('\n  No model configured.\n'));
        }
      } catch {
        console.log(chalk.yellow('\n  No config found.\n'));
      }
    } else {
      console.error(chalk.red('\n  Unknown agent: ' + agent + '\n'));
    }
  }

  private getOpencodeCurrentModel(): string | null {
    try {
      const modelPath = join(homedir(), '.local', 'state', 'opencode', 'model.json');
      const raw = readFileSync(modelPath, 'utf-8');
      const data = JSON.parse(raw) as { recent?: Array<{ providerID: string; modelID: string }> };
      const entry = data.recent?.find((m) => m.providerID === 'opencode');
      return entry?.modelID ?? null;
    } catch {
      return null;
    }
  }
}