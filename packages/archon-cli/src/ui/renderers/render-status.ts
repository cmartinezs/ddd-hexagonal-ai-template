import chalk from 'chalk';
import { phaseEngine } from '../../core/phase-engine.js';
import type { ArchonState } from '../../core/types.js';

interface TemplateInfo {
  id: string;
  version: string;
  source: string;
}

export function renderStatus(state: ArchonState, templateInfo?: TemplateInfo): void {
  const projectPath = process.cwd();
  const progress = phaseEngine.getProgress(state.phases, projectPath);

  console.log(chalk.cyan('\n============================================================='));
  console.log(chalk.bold('  Archon Status  —  ' + state.projectName));
  console.log(chalk.cyan('=============================================================\n'));

  console.log('  Project:   ' + chalk.white(state.projectName));
  console.log('  Slug:      ' + chalk.white(state.projectSlug));
  console.log('  Phase:     ' + chalk.white(String(state.currentPhase) + '/11 — ' + phaseEngine.getPhase(state.currentPhase).name));

  if (templateInfo) {
    console.log('  Template:  ' + chalk.white(templateInfo.id + ' @ ' + templateInfo.version));
  }

  console.log('  Agent:     ' + chalk.white(state.agent));
  console.log('  Version:   ' + chalk.white('archon ' + state.archonVersion));
  console.log('  Created:   ' + chalk.white(state.createdAt));

  console.log('\n  Progress: [' + renderProgressBar(progress.percentage) + '] ' + progress.percentage + '%');
  console.log('            ' + progress.complete + ' complete  ' + progress.inProgress + ' in progress  ' + progress.pending + ' pending');

  const allPhases = phaseEngine.getAllPhases();
  console.log(chalk.bold('\n  Phases:\n'));

  const cols = [0, 3, 6, 9];
  for (const col of cols) {
    let line = '    ';
    for (let i = col; i < col + 3 && i < allPhases.length; i++) {
      const phase = allPhases[i]!;
      const key = 'phase-' + String(phase.index).padStart(2, '0');
      const status = state.phases[key];
      const icon = getStatusIcon(status?.status);
      const marker = state.currentPhase === i ? chalk.bgBlue.white(' * ') : '   ';
      const name = phase.name.substring(0, 16).padEnd(16);
      line += marker + icon + ' ' + chalk.white(String(phase.index).padStart(2) + '. ' + name) + '  ';
    }
    console.log(line);
  }

  if (state.warnings && state.warnings.length > 0) {
    console.log(chalk.yellow('\n  Warnings: ' + state.warnings.length));
    for (const w of state.warnings.slice(0, 3)) {
      console.log(chalk.yellow('    - ' + w.message));
    }
  }

  console.log(chalk.cyan('\n=============================================================\n'));
}

function renderProgressBar(percentage: number): string {
  const total = 20;
  const filled = Math.round((percentage / 100) * total);
  const empty = total - filled;
  return chalk.green('█'.repeat(filled)) + chalk.dim('░'.repeat(empty));
}

function getStatusIcon(status?: string): string {
  if (status === 'complete') return chalk.green('✓');
  if (status === 'in_progress') return chalk.cyan('●');
  if (status === 'skipped') return chalk.yellow('—');
  return chalk.dim('○');
}
