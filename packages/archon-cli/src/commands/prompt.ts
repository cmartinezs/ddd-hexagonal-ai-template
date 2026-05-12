import chalk from 'chalk';
import { join } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

import { StateManager } from '../core/state-manager.js';
import { ConfigManager } from '../core/config-manager.js';
import { detectMode } from '../core/mode-detector.js';
import { aiPromptBuilder } from '../core/ai-prompt-builder.js';

export class PromptCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const contextOpt = this.getArg(args, 'context') ?? (opts['context'] as string | undefined);
    const copy = opts['copy'] === true;
    const phaseArg = this.getArg(args, 'phase');

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const phase = phaseArg !== undefined ? parseInt(phaseArg, 10) : state.currentPhase;

    if (isNaN(phase) || phase < 0 || phase > 11) {
      console.error(chalk.red('\n  Invalid phase: ' + phaseArg + '. Must be 0-11.\n'));
      process.exit(1);
    }

    const cm = new ConfigManager(mode.projectPath!);
    const agent = cm.getAgent();
    const transport = cm.getTransport();

    const contextLevel = (contextOpt ?? 'full') as 'full' | 'summary' | 'none';

    console.log(chalk.cyan('\n  Generating prompt for Phase ' + phase + ' (' + contextLevel + ')...\n'));

    const result = aiPromptBuilder.build({
      phase,
      context: contextLevel,
      projectPath: mode.projectPath!,
      state,
      agent,
      transport,
    });

    mkdirSync(join(mode.projectPath!, '.archon', 'prompts'), { recursive: true });
    writeFileSync(result.filePath, result.content, 'utf-8');

    const metaPath = result.filePath.replace('.md', '.json');
    writeFileSync(metaPath, JSON.stringify(result.metadata, null, 2), 'utf-8');

    console.log(chalk.green('  ✅ Prompt written to:'));
    console.log('     ' + result.filePath);
    console.log(chalk.dim('     ' + this.formatBytes(result.metadata.fileSize)));
    console.log();

    if (copy) {
      try {
        const raw = require('node:fs').readFileSync(result.filePath, 'utf-8');
        if (process.platform === 'darwin') {
          execSync('pbcopy', { input: raw });
        } else if (process.platform === 'linux') {
          execSync('xclip -selection clipboard', { input: raw });
        } else if (process.platform === 'win32') {
          execSync('clip', { input: raw });
        } else {
          console.log(chalk.dim('  Copy not supported on this platform. Pipe manually:'));
          console.log(chalk.dim('  cat ' + result.filePath + ' | xclip -selection clipboard'));
          return;
        }
        console.log(chalk.green('  ✅ Copied to clipboard'));
      } catch {
        console.log(chalk.dim('  Could not copy to clipboard. Pipe manually:'));
        console.log(chalk.dim('  cat ' + result.filePath + ' | xclip -selection clipboard'));
      }
    } else {
      console.log(chalk.dim('  Copy to clipboard:') + ' archon prompt --phase ' + phase + ' --copy');
    }

    console.log();
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === '--' + key);
    return idx >= 0 ? args[idx + 1] : undefined;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]!;
  }
}
