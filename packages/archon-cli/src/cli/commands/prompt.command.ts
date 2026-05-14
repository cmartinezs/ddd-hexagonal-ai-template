import chalk from 'chalk';
import { join } from 'node:path';
import { writeFileSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

import { StateManager } from '../../core/state-manager.js';
import { ConfigManager } from '../../core/config-manager.js';
import { detectMode } from '../../core/mode-detector.js';
import { aiPromptBuilder } from '../../core/ai-prompt-builder.js';
import { FirstInteractive } from '../../core/interactive-engine.js';

export class PromptCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const contextOpt = this.getArg(args, 'context') ?? (opts['context'] as string | undefined);
    const copy = opts['copy'] === true;
    const regenerate = opts['regenerate'] === true;
    const phaseArg = this.getArg(args, 'phase') ?? (opts['phase'] as string | undefined);

    const mode = detectMode();
    if (mode.mode !== 'project') {
      console.error(chalk.red('\n  No project state. Run `archon init` first.\n'));
      process.exit(1);
    }

    const sm = new StateManager(mode.projectPath!);
    const state = sm.load();
    const cm = new ConfigManager(mode.projectPath!);
    const fi = new FirstInteractive(mode.projectPath!);

    const defaultContext = (cm.getDefault('context.default') as string | undefined) ?? 'full';

    const answers = await fi.collect(
      [
        {
          key: 'phase',
          label: 'Phase number (0-11):',
          type: 'number',
          default: state.currentPhase,
          validate: (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 11) || 'Must be 0-11',
        },
        {
          key: 'context',
          label: 'Context level:',
          type: 'select',
          options: ['full', 'summary', 'none'],
          default: contextOpt ?? defaultContext,
        },
      ],
      {
        phase: phaseArg !== undefined ? parseInt(phaseArg, 10) : undefined,
        context: contextOpt ?? defaultContext,
      }
    );

    const phase = answers['phase'] as number;
    const contextLevel = (answers['context'] as string) as 'full' | 'summary' | 'none';

    if (isNaN(phase) || phase < 0 || phase > 11) {
      console.error(chalk.red('\n  Invalid phase: ' + phaseArg + '. Must be 0-11.\n'));
      process.exit(1);
    }

    const agent = cm.getAgent();
    const transport = cm.getTransport();

    if (regenerate) {
      const promptsDir = join(mode.projectPath!, '.archon', 'prompts');
      const prefix = `phase-${String(phase).padStart(2, '0')}-`;
      let removed = 0;
      try {
        const files = readdirSync(promptsDir);
        for (const f of files) {
          if (f.startsWith(prefix) && (f.endsWith('.md') || f.endsWith('.json'))) {
            rmSync(join(promptsDir, f), { force: true });
            removed++;
          }
        }
      } catch { /* dir might not exist yet */ }
      console.log(chalk.yellow('  Cleared ' + removed + ' previous prompt file(s) for Phase ' + phase + '.\n'));
    }

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
      const raw = readFileSync(result.filePath, 'utf-8');
      let copied = false;

      if (process.platform === 'darwin') {
        try { execSync('pbcopy', { input: raw }); copied = true; } catch { /* try next */ }
      }
      if (!copied && process.platform === 'linux') {
        for (const cmd of ['xclip -selection clipboard', 'xsel --clipboard', 'wl-copy']) {
          try { execSync(cmd, { input: raw, stdio: 'ignore' }); copied = true; break; } catch { /* try next */ }
        }
      }
      if (!copied && process.platform === 'win32') {
        try { execSync('clip', { input: raw }); copied = true; } catch { /* try next */ }
      }

      if (copied) {
        console.log(chalk.green('  ✅ Copied to clipboard'));
      } else {
        console.log(chalk.yellow('  ⚠  No clipboard tool found. Open the file directly:'));
        console.log(chalk.cyan('     ' + result.filePath));
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
