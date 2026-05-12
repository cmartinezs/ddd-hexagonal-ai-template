import chalk from 'chalk';
import { resolve } from 'node:path';
import { detectMode } from '../core/mode-detector.js';
import { StateManager } from '../core/state-manager.js';
import { renderStatus } from '../ui/render-status.js';
import { existsSync, readFileSync } from 'node:fs';

export class StatusCommand {
  async run(_args: string[], opts: Record<string, unknown>): Promise<void> {
    const json = opts['json'] === true;
    const mode = detectMode();

    if (mode.mode !== 'project') {
      if (json) {
        console.log(JSON.stringify({ mode: mode.mode }, null, 2));
        return;
      }
      console.log(chalk.cyan('\n  Archon CLI v0.1.0\n'));
      console.log('  Mode: ' + mode.mode);
      console.log(chalk.dim('  Run `archon init --name <project>` to start a new project.\n'));
      return;
    }

    const projectPath = mode.projectPath!;

    let state;
    try {
      const sm = new StateManager(projectPath);
      state = sm.load();
    } catch {
      console.error(chalk.red('\n  No project state found.\n'));
      process.exit(1);
    }

    if (json) {
      console.log(JSON.stringify(state, null, 2));
      return;
    }

    const lockPath = resolve(projectPath, '.archon', 'template.lock.json');
    let templateInfo: { id: string; version: string; source: string } | null = null;
    if (existsSync(lockPath)) {
      try {
        const lock = JSON.parse(readFileSync(lockPath, 'utf-8'));
        templateInfo = lock.template;
      } catch {
        // no lock
      }
    }

    renderStatus(state, templateInfo ?? undefined);
  }
}