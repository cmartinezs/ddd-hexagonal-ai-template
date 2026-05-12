import chalk from 'chalk';
import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

import { detectMode } from '../core/mode-detector.js';
import { StateManager } from '../core/state-manager.js';
import { PHASES } from '../core/phase-engine.js';

interface TutorialStep {
  index: number;
  phaseName: string;
  folder: string;
  content?: string;
}

export class TutorialCommand {
  private tutorialMode = 'template';
  private projectPath: string | null = null;

  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    this.tutorialMode = (opts['mode'] as string) ?? 'template';
    const startStepArg = this.getArg(args, 'step');
    let startStep = startStepArg !== undefined ? parseInt(startStepArg, 10) : 0;

    const mode = detectMode();

    if (this.tutorialMode === 'project') {
      if (mode.mode !== 'project') {
        console.error(chalk.red('\n  No project initialized. Run `archon init` first.\n'));
        process.exit(1);
      }
      this.projectPath = mode.projectPath!;
    } else {
      this.projectPath = mode.mode === 'project' ? mode.projectPath! : null;
    }

    const steps = this.buildStepList();

    const { choice } = await this.askMenu(steps, startStep);

    if (choice === 'quit') {
      console.log(chalk.dim('\n  Goodbye!\n'));
      return;
    }

    if (choice === 'overview') {
      this.showOverview(steps);
      return;
    }

    const stepIndex = parseInt(String(choice), 10);
    if (isNaN(stepIndex) || stepIndex < 0 || stepIndex > 11) {
      console.error(chalk.red('\n  Invalid step: ' + choice + '\n'));
      return;
    }

    const step = steps[stepIndex]!;
    await this.runStep(step, steps);

    console.log();
  }

  private buildStepList(): TutorialStep[] {
    return PHASES.map((p, i) => ({
      index: i,
      phaseName: p.name,
      folder: p.folder,
    }));
  }

  private async askMenu(steps: TutorialStep[], defaultStep: number): Promise<{ choice: string }> {
    const inquirer = (await import('inquirer')).default;
    const choices: Array<{ name: string; value: string }> = [];

    choices.push({ name: '📋 Overview — See all steps', value: 'overview' });
    choices.push({ name: '─'.repeat(40), value: '__separator__' });

    for (const step of steps) {
      const mark = this.isStepComplete(step.index) ? chalk.green('✅') : '  ';
      choices.push({
        name: `${mark} Step ${step.index}: ${step.phaseName}`,
        value: String(step.index),
      });
    }

    choices.push({ name: '─'.repeat(40), value: '__separator__' });
    choices.push({ name: '❌ Quit tutorial', value: 'quit' });

    const { selected } = await (inquirer.prompt as Function)([{
      type: 'select',
      name: 'selected',
      message: 'Select a step:',
      choices,
      default: String(defaultStep),
    }]);

    return { choice: selected as string };
  }

  private showOverview(steps: TutorialStep[]): void {
    const sep = '═══════════════════════════════════════════════════════';
    console.log(chalk.cyan('\n' + sep));
    console.log(chalk.bold('  Archon Tutorial — All 12 Steps'));
    console.log(chalk.cyan(sep + '\n'));

    console.log(chalk.bold('  This tutorial teaches you how to document a DDD project using the template.\n'));

    for (const step of steps) {
      const mark = this.isStepComplete(step.index) ? chalk.green('✅') : '  ';
      const agnostic = PHASES[step.index]!.isAgnostic ? chalk.dim(' (agnostic)') : '';
      console.log(`  ${mark} ${chalk.bold(String(step.index).padStart(2) + '.')} ${step.phaseName}${agnostic}`);
    }

    console.log(chalk.dim('\n  Phases 0-5: Technology-agnostic (no coding required)'));
    console.log(chalk.dim('  Phases 6-11: Technology-specific (based on your stack)\n'));

    console.log(chalk.bold('  Modes:'));
    console.log(chalk.dim('  - ') + '`archon tutorial --mode template` ' + chalk.dim('— Learn with reference project (Keygo/URL Shortener)'));
    console.log(chalk.dim('  - ') + '`archon tutorial --mode project` ' + chalk.dim('— Practice with your own project\n'));
  }

  private async runStep(step: TutorialStep, steps: TutorialStep[]): Promise<void> {
    const content = this.loadStepContent(step.index);
    const sep = '═══════════════════════════════════════════════════════';
    console.log(chalk.cyan('\n' + sep));
    console.log(chalk.bold(`  Step ${step.index}: ${step.phaseName}`));
    console.log(chalk.cyan(sep + '\n'));

    if (content) {
      const summary = content.match(/\*\*Summary:\*\*\s*(.+)/)?.[1];
      if (summary) {
        console.log('  ' + summary.trim() + '\n');
      }

      const relevantSection = content.split('##')[1];
      if (relevantSection) {
        const lines = relevantSection.trim().split('\n').slice(0, 20);
        for (const line of lines) {
          if (line.trim()) console.log('  ' + chalk.dim(line));
        }
        if (relevantSection.split('\n').length > 20) {
          console.log(chalk.dim('  ... (see tutorial step file for full content)\n'));
        }
      }
    } else {
      console.log('  ' + PHASES[step.index]!.description + '\n');
    }

    console.log(chalk.bold('  What to do:'));
    console.log(chalk.dim('  1. Run `') + chalk.cyan(`archon guide --phase ${step.index}`) + chalk.dim('` for detailed phase help'));
    console.log(chalk.dim('  2. Run `') + chalk.cyan(`archon prompt --phase ${step.index}`) + chalk.dim('` to generate your AI prompt'));
    console.log(chalk.dim('  3. Run `') + chalk.cyan(`archon check --phase ${step.index}`) + chalk.dim('` to validate output\n'));

    if (this.tutorialMode === 'project' && this.projectPath) {
      this.markStepComplete(step.index);
    }

    const { action } = await this.askStepAction(step.index, steps);
    if (action === 'next' && step.index < 11) {
      await this.runStep(steps[step.index + 1]!, steps);
    } else if (action === 'menu') {
      return;
    }
  }

  private async askStepAction(currentStep: number, steps: TutorialStep[]): Promise<{ action: string }> {
    const inquirer = (await import('inquirer')).default;
    const choices: Array<{ name: string; value: string }> = [];

    if (currentStep > 0) {
      choices.push({
        name: `◀ Previous: Step ${currentStep - 1} (${steps[currentStep - 1]!.phaseName})`,
        value: 'prev',
      });
    }
    if (currentStep < 11) {
      choices.push({
        name: `▶ Next: Step ${currentStep + 1} (${steps[currentStep + 1]!.phaseName})`,
        value: 'next',
      });
    }
    choices.push({ name: '📋 Back to menu', value: 'menu' });
    choices.push({ name: '❌ Quit', value: 'quit' });

    const { selected } = await (inquirer.prompt as Function)([{
      type: 'select',
      name: 'selected',
      message: 'What next?',
      choices,
    }]);

    return { action: selected as string };
  }

  private loadStepContent(phaseIndex: number): string | null {
    const templateRoot = this.getTemplateRoot();
    const stepFiles = [
      join(templateRoot, 'tutorial', `step-${String(phaseIndex).padStart(2, '0')}-${PHASES[phaseIndex]!.folder}.md`),
      join(templateRoot, 'tutorial', `step-${String(phaseIndex).padStart(2, '0')}.md`),
      join(templateRoot, 'tutorial', `step-${PHASES[phaseIndex]!.code.toLowerCase()}.md`),
    ];

    for (const file of stepFiles) {
      if (existsSync(file)) {
        try {
          return readFileSync(file, 'utf-8');
        } catch {
          // skip
        }
      }
    }
    return null;
  }

  private getTemplateRoot(): string {
    const parts = process.cwd().split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      const candidate = parts.slice(0, i + 1).join('/');
      if (existsSync(join(candidate, '01-templates'))) {
        return candidate;
      }
    }
    return process.cwd();
  }

  private isStepComplete(_stepIndex: number): boolean {
    if (this.tutorialMode !== 'project' || !this.projectPath) return false;
    try {
      const sm = new StateManager(this.projectPath);
      const state = sm.load();
      return state.phases[`phase-${String(_stepIndex).padStart(2, '0')}`]?.status === 'complete';
    } catch {
      return false;
    }
  }

  private markStepComplete(stepIndex: number): void {
    if (!this.projectPath) return;
    try {
      const sm = new StateManager(this.projectPath);
      sm.updatePhase(stepIndex, {
        status: 'complete',
        completedAt: new Date().toISOString(),
        files: [],
      });
    } catch {
      // skip
    }
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}
