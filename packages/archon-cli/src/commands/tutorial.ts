import chalk from 'chalk';
import { detectMode } from '../core/mode-detector.js';
import inquirer from 'inquirer';

const TUTORIAL_STEPS = [
  { value: 0, name: 'Step 0: Documentation Planning' },
  { value: 1, name: 'Step 1: Discovery' },
  { value: 2, name: 'Step 2: Requirements' },
  { value: 3, name: 'Step 3: Design' },
  { value: 4, name: 'Step 4: Data Model' },
  { value: 5, name: 'Step 5: Planning' },
  { value: 6, name: 'Step 6: Development' },
  { value: 7, name: 'Step 7: Testing' },
  { value: 8, name: 'Step 8: Deployment' },
  { value: 9, name: 'Step 9: Operations' },
  { value: 10, name: 'Step 10: Monitoring' },
  { value: 11, name: 'Step 11: Feedback' },
];

export class TutorialCommand {
  async run(args: string[], opts: Record<string, unknown>): Promise<void> {
    const mode = (opts['mode'] as string) ?? 'template';
    const startStep = parseInt(this.getArg(args, 'step') ?? '0', 10);

    console.log(chalk.cyan('\n📚 Archon Interactive Tutorial\n'));

    if (mode === 'project') {
      const detected = detectMode();
      if (detected.mode !== 'project') {
        console.error(chalk.red('❌ No project initialized. Run `archon init` first.\n'));
        process.exit(1);
      }
      console.log(chalk.bold('Project mode: guided with your project\n'));
    } else {
      console.log(chalk.bold('Template mode: learn the system (no project needed)\n'));
      console.log(chalk.dim('Reference project: URL Shortener (Keygo)\n'));
    }

    const { step } = await inquirer.prompt([{
      type: 'list',
      name: 'step',
      message: 'Select step to start from:',
      choices: TUTORIAL_STEPS,
      default: startStep,
    }]);

    console.log(chalk.green(`\n✅ Starting tutorial from Step ${step}\n`));
    console.log(chalk.dim('This tutorial will guide you through each phase interactively.'));
    console.log(chalk.dim('Use `archon guide --phase <N>` to see detailed help for any phase.\n'));
  }

  private getArg(args: string[], key: string): string | undefined {
    const idx = args.findIndex((a) => a === `--${key}`);
    return idx >= 0 ? args[idx + 1] : undefined;
  }
}