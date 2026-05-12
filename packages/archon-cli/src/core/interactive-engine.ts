import inquirer from 'inquirer';
import chalk from 'chalk';
import type { InteractiveMode } from './types.js';
import { ConfigManager } from './config-manager.js';
import { PHASES } from './phase-engine.js';

export interface Question {
  key: string;
  label: string;
  type: 'text' | 'confirm' | 'select' | 'number';
  options?: string[];
  default?: string | number | boolean;
  validate?: (input: unknown) => boolean | string;
}

export interface CollectedAnswers {
  [key: string]: string | number | boolean | undefined;
}

export class FirstInteractive {
  private interactiveMode: InteractiveMode;

  constructor(projectPath?: string) {
    const cm = new ConfigManager(projectPath ?? process.cwd());
    this.interactiveMode = cm.getInteractiveMode();
  }

  async collect(questions: Question[], provided: Record<string, unknown> = {}): Promise<CollectedAnswers> {
    if (this.interactiveMode === 'never') {
      const missing = questions.filter((q) => provided[q.key] === undefined);
      if (missing.length > 0) {
        console.error(chalk.red('\n  Missing required parameters:\n'));
        for (const q of missing) {
          console.error('    ' + chalk.yellow('--' + q.key) + ' ' + chalk.dim('(' + q.type + ')'));
        }
        console.error();
        process.exit(1);
      }
      return provided as CollectedAnswers;
    }

    const alwaysMode = this.interactiveMode === 'always';

    const toAsk = questions.filter((q) => {
      if (alwaysMode) return true;
      return provided[q.key] === undefined;
    });

    if (toAsk.length === 0) {
      return provided as CollectedAnswers;
    }

    const answers = await (inquirer.prompt as Function)(
      toAsk.map((q) => {
        const base: Record<string, unknown> = {
          name: q.key,
          message: q.label,
        };

        switch (q.type) {
          case 'text':
            base.type = 'input';
            if (q.default !== undefined) base.default = q.default;
            if (q.validate) base.validate = q.validate;
            break;
          case 'confirm':
            base.type = 'confirm';
            if (q.default !== undefined) base.default = q.default;
            break;
          case 'select':
            base.type = 'select';
            base.choices = q.options ?? [];
            if (q.default !== undefined) base.default = q.default;
            break;
          case 'number':
            base.type = 'number';
            if (q.default !== undefined) base.default = q.default;
            if (q.validate) base.validate = q.validate;
            break;
        }

        return base;
      })
    );

    return { ...provided, ...answers } as CollectedAnswers;
  }

  async selectPhase(currentPhase: number): Promise<number> {
    const choices = PHASES.map((p, i) => ({
      name: `${String(i).padStart(2, '0')} — ${p.name}`,
      value: i,
      short: `${String(i).padStart(2, '0')} ${p.code}`,
    }));

    const { phase } = await (inquirer.prompt as Function)([{
      type: 'select',
      name: 'phase',
      message: 'Select phase:',
      choices,
      default: currentPhase,
    }]);

    return phase as number;
  }

  async selectContext(currentContext = 'full'): Promise<string> {
    const { context } = await (inquirer.prompt as Function)([{
      type: 'select',
      name: 'context',
      message: 'Context level:',
      choices: [
        { name: 'full — Include project structure, dependencies, warnings', value: 'full', short: 'full' },
        { name: 'summary — Brief project summary', value: 'summary', short: 'summary' },
        { name: 'none — Minimal prompt', value: 'none', short: 'none' },
      ],
      default: currentContext,
    }]);

    return context as string;
  }

  async confirm(message: string, defaultVal = true): Promise<boolean> {
    const { confirmed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirmed',
      message,
      default: defaultVal,
    }]);
    return (confirmed as boolean) ?? false;
  }

  async askText(label: string, defaultVal?: string, validate?: (v: string) => boolean | string): Promise<string> {
    const { value } = await inquirer.prompt([{
      type: 'input',
      name: 'value',
      message: label,
      default: defaultVal,
      validate: validate
        ? (v: string) => {
            const result = validate(v);
            return result === true || (typeof result === 'string' ? result : 'Invalid input');
          }
        : undefined,
    }]);
    return (value as string) ?? '';
  }

  setMode(mode: InteractiveMode): void {
    this.interactiveMode = mode;
  }
}

export const firstInteractive = new FirstInteractive();
