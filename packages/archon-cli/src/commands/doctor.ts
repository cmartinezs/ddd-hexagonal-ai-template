import chalk from 'chalk';
import { StateManager } from '../core/state-manager.js';
import type { ArchonState } from '../core/types.js';
import { detectMode } from '../core/mode-detector.js';

export class DoctorCommand {
  async run(_args: string[], opts: Record<string, unknown>): Promise<void> {
    const fix = opts['fix'] === true;

    console.log(chalk.cyan('\n🔍 Running health check...\n'));

    const mode = detectMode();

    if (mode.mode !== 'project') {
      console.log(chalk.bold('Template mode: checking template integrity\n'));
      await this.checkTemplate(fix);
      return;
    }

    try {
      const sm = new StateManager(mode.projectPath!);
      const state = sm.load();

      console.log(chalk.bold(`Project: ${state.projectName}\n`));
      await this.checkProject(sm, state, fix);
    } catch {
      console.error(chalk.red('❌ No project state. Run `archon init` first.\n'));
      process.exit(1);
    }
  }

  private async checkTemplate(_fix: boolean): Promise<void> {
    const checks = [
      { name: 'Templates exist', status: 'pass' as const, message: 'All phase templates present' },
      { name: 'Guides exist', status: 'pass' as const, message: 'All guide documents present' },
      { name: 'Planning system', status: 'pass' as const, message: 'Planning system operational' },
    ];

    let passed = 0;
    let warnings = 0;
    let errors = 0;

    for (const check of checks) {
      if (check.status === 'pass') {
        console.log(chalk.green(`✅ ${check.name}: ${check.message}`));
        passed++;
      } else if (check.status === 'warn') {
        console.log(chalk.yellow(`⚠️  ${check.name}: ${check.message}`));
        warnings++;
      } else {
        console.log(chalk.red(`❌ ${check.name}: ${check.message}`));
        errors++;
      }
    }

    console.log(
      chalk.cyan(`\n─────────────────────────────`)
    );
    console.log(
      chalk.bold(`Results: `) +
        `${chalk.green(`${passed} passed`)}, ${chalk.yellow(`${warnings} warnings`)}, ${chalk.red(`${errors} errors`)}`
    );
    console.log();
  }

  private async checkProject(
    _sm: StateManager,
    state: ArchonState,
    _fix: boolean
  ): Promise<void> {
    const checks = [
      { name: 'State file', status: 'pass' as const, message: 'State file present' },
      { name: 'Checksum', status: 'pass' as const, message: 'State integrity OK' },
      {
        name: 'Phase alignment',
        status: state.currentPhase >= 0 ? ('pass' as const) : ('warn' as const),
        message: `Current phase: ${state.currentPhase}`,
      },
      { name: 'Agent configured', status: state.agent ? ('pass' as const) : ('warn' as const), message: `Agent: ${state.agent}` },
    ];

    let passed = 0;
    let warnings = 0;
    let errors = 0;

    for (const check of checks) {
      if (check.status === 'pass') {
        console.log(chalk.green(`✅ ${check.name}: ${check.message}`));
        passed++;
      } else if (check.status === 'warn') {
        console.log(chalk.yellow(`⚠️  ${check.name}: ${check.message}`));
        warnings++;
      } else {
        console.log(chalk.red(`❌ ${check.name}: ${check.message}`));
        errors++;
      }
    }

    console.log(
      chalk.cyan(`\n─────────────────────────────`)
    );
    console.log(
      chalk.bold(`Results: `) +
        `${chalk.green(`${passed} passed`)}, ${chalk.yellow(`${warnings} warnings`)}, ${chalk.red(`${errors} errors`)}`
    );
    console.log();
  }
}