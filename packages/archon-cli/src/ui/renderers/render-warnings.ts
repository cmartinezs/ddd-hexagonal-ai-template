import chalk from 'chalk';
import type { Constraint } from '../../core/validator.js';

export interface RenderWarningsOptions {
  fix?: boolean;
}

export function renderWarnings(
  constraints: Constraint[],
  _opts?: RenderWarningsOptions
): void {
  const errors = constraints.filter((c) => c.severity === 'error');
  const warnings = constraints.filter((c) => c.severity === 'warn');
  const info = constraints.filter((c) => c.severity === 'info');

  if (errors.length === 0 && warnings.length === 0 && info.length === 0) {
    console.log(chalk.green('\n✅ All checks passed. No issues found.\n'));
    return;
  }

  if (errors.length > 0) {
    console.log(chalk.red('\n❌ Errors (' + errors.length + '):\n'));
    for (const e of errors) {
      console.log('  ' + chalk.red('✗') + ' ' + e.message);
      if (e.phase !== undefined) {
        console.log(chalk.dim('    Phase: ' + e.phase));
      }
    }
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow('\n⚠️  Warnings (' + warnings.length + '):\n'));
    for (const w of warnings) {
      console.log('  ' + chalk.yellow('⚠') + ' ' + w.message);
      if (w.phase !== undefined) {
        console.log(chalk.dim('    Phase: ' + w.phase));
      }
    }
  }

  if (info.length > 0) {
    console.log(chalk.blue('\n💡 Suggestions (' + info.length + '):\n'));
    for (const s of info) {
      console.log('  ' + chalk.blue('→') + ' ' + s.message);
    }
  }

  if (errors.length > 0) {
    console.log(chalk.red('\n❌ Fix errors before advancing to next phase.\n'));
  } else if (warnings.length > 0) {
    console.log(chalk.yellow('\n⚠️  Review warnings before advancing.\n'));
  }
}
