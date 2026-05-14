import chalk from 'chalk';
import { join } from 'node:path';
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

import { StateManager } from '../../core/state-manager.js';
import { templateResolver } from '../../core/global-cache/index.js';
import { detectMode } from '../../core/mode-detector.js';
import { PHASES } from '../../core/phase-engine.js';
import { globalCache } from '../../core/global-cache/index.js';

interface HealthCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  fixable?: boolean;
  details?: string[];
}

export class DoctorCommand {
  async run(_args: string[], opts: Record<string, unknown>): Promise<void> {
    const fix = opts['fix'] === true;
    const ci = opts['ci'] === true;
    const json = opts['json'] === true;

    if (!ci) {
      console.log(chalk.cyan('\n  🔍 Running health check...\n'));
    }

    const mode = detectMode();
    const checks: HealthCheck[] = [];

    if (mode.mode !== 'project') {
      this.checkTemplateMode(checks);
    } else {
      this.checkProjectMode(mode, checks, fix);
    }

    const passed = checks.filter((c) => c.status === 'pass').length;
    const warnings = checks.filter((c) => c.status === 'warn').length;
    const errors = checks.filter((c) => c.status === 'fail').length;
    const healthy = errors === 0;

    if (ci) {
      if (json) {
        console.log(JSON.stringify({
          healthy,
          passed,
          warnings,
          errors,
          issues: checks
            .filter((c) => c.status !== 'pass')
            .map((c) => ({ name: c.name, status: c.status, message: c.message, details: c.details })),
        }, null, 2));
      } else {
        if (!healthy) {
          for (const c of checks.filter((c) => c.status === 'fail')) {
            process.stderr.write('ERROR: ' + c.name + ': ' + c.message + '\n');
          }
          for (const c of checks.filter((c) => c.status === 'warn')) {
            process.stderr.write('WARN: ' + c.name + ': ' + c.message + '\n');
          }
        }
      }
      process.exit(healthy ? 0 : 1);
    }

    let fixableCount = 0;
    for (const check of checks) {
      const icon =
        check.status === 'pass' ? chalk.green('✅') :
        check.status === 'warn' ? chalk.yellow('⚠️') :
        chalk.red('❌');

      console.log(`${icon} ${check.name}: ${check.message}`);
      if (check.details && check.details.length > 0) {
        for (const d of check.details) {
          console.log(chalk.dim('     ' + d));
        }
      }
      if (check.fixable) {
        console.log(chalk.dim('     (fixable with --fix)'));
        fixableCount++;
      }
    }

    const sep = '─────────────────────────────';
    console.log(chalk.cyan('\n  ' + sep));
    console.log(
      '  Results: ' +
        chalk.green(`${passed} passed`) + ', ' +
        chalk.yellow(`${warnings} warnings`) + ', ' +
        (errors > 0 ? chalk.red(`${errors} errors`) : chalk.dim(`${errors} errors`))
    );

    if (fixableCount > 0 && errors === 0) {
      console.log(chalk.dim('\n  Run `archon doctor --fix` to auto-fix issues.'));
    }

    console.log();
  }

  private checkTemplateMode(checks: HealthCheck[]): void {
    const templateRoot = this.findTemplateRoot();

    const requiredFolders = ['01-templates', '00-guides-and-instructions', 'planning'];
    for (const folder of requiredFolders) {
      const exists = existsSync(join(templateRoot, folder));
      checks.push({
        name: folder + ' exists',
        status: exists ? 'pass' : 'fail',
        message: exists ? 'present' : 'missing',
      });
    }

    let phaseCount = 0;
    const templatesDir = join(templateRoot, '01-templates');
    if (existsSync(templatesDir)) {
      try {
        const entries = readdirSync(templatesDir);
        const phaseFolders = entries.filter((e) => e.match(/^\d{2}-/));
        phaseCount = phaseFolders.length;
      } catch {
        phaseCount = 0;
      }
    }

    checks.push({
      name: 'Phase folders',
      status: phaseCount === 12 ? 'pass' : phaseCount > 0 ? 'warn' : 'fail',
      message: `${phaseCount}/12 phase folders ${phaseCount === 12 ? 'complete' : phaseCount > 0 ? 'partial' : 'missing'}`,
      details: phaseCount !== 12 && phaseCount > 0
        ? [`Expected 12 (00-11), found ${phaseCount}`]
        : undefined,
    });

    const guidesDir = join(templateRoot, '00-guides-and-instructions');
    const essentialGuides = ['README.md', 'INSTRUCTIONS-FOR-AI.md', 'TEMPLATE-USAGE-GUIDE.md'];
    let guidesOk = 0;
    for (const g of essentialGuides) {
      if (existsSync(join(guidesDir, g))) guidesOk++;
    }
    checks.push({
      name: 'Essential guides',
      status: guidesOk === essentialGuides.length ? 'pass' : 'warn',
      message: `${guidesOk}/${essentialGuides.length} present`,
    });

    const planningDir = join(templateRoot, 'planning');
    const hasPlanning = existsSync(planningDir);
    checks.push({
      name: 'Planning system',
      status: hasPlanning ? 'pass' : 'warn',
      message: hasPlanning ? 'operational' : 'not found',
    });

    const globalRegistry = globalCache.getRegistry();
    const templateInfo = globalRegistry['ddd-hexagonal-ai-template'];
    if (templateInfo) {
      const versions = Object.keys(templateInfo.versions);
      checks.push({
        name: 'Template cache',
        status: versions.length > 0 ? 'pass' : 'warn',
        message: versions.length > 0 ? `${versions.length} version(s) cached` : 'no cached versions',
        details: versions.length > 0 ? versions : undefined,
      });
    }
  }

  private checkProjectMode(mode: ReturnType<typeof detectMode>, checks: HealthCheck[], fix: boolean): void {
    const projectPath = mode.projectPath!;

    const stateOk = existsSync(join(projectPath, '.archon', 'state.json'));
    checks.push({
      name: 'State file',
      status: stateOk ? 'pass' : 'fail',
      message: stateOk ? 'present' : 'missing',
    });

    if (stateOk) {
      try {
        const sm = new StateManager(projectPath);
        const state = sm.load();
        const checksumValid = sm.validate();
        checks.push({
          name: 'Checksum',
          status: checksumValid ? 'pass' : 'warn',
          message: checksumValid ? 'valid' : 'invalid (state may have been modified)',
          fixable: !checksumValid,
        });

        const phaseStatus = Object.entries(state.phases);
        const completed = phaseStatus.filter(([, v]) => v.status === 'complete').length;
        checks.push({
          name: 'Phase alignment',
          status: state.currentPhase >= 0 ? 'pass' : 'warn',
          message: `Current: ${state.currentPhase} (${completed} complete)`,
        });

        checks.push({
          name: 'Agent configured',
          status: state.agent ? 'pass' : 'warn',
          message: `Agent: ${state.agent}`,
        });

        const configOk = existsSync(join(projectPath, '.archon', 'config.json'));
        checks.push({
          name: 'Config file',
          status: configOk ? 'pass' : 'warn',
          message: configOk ? 'present' : 'missing',
        });

        const lockOk = existsSync(join(projectPath, '.archon', 'template.lock.json'));
        checks.push({
          name: 'Template lock',
          status: lockOk ? 'pass' : 'warn',
          message: lockOk ? 'present' : 'missing',
        });

        this.checkTemplateVersion(projectPath, checks);
        this.checkGlossary(projectPath, checks);
        this.checkPhaseChain(projectPath, checks, fix);
        this.checkNavigationLinks(projectPath, checks);

        const docsDir = join(projectPath, 'docs');
        const docsOk = existsSync(docsDir);
        checks.push({
          name: 'Docs directory',
          status: docsOk ? 'pass' : 'warn',
          message: docsOk ? 'present' : 'missing',
        });

        const promptsDir = join(projectPath, '.archon', 'prompts');
        let promptsCount = 0;
        if (existsSync(promptsDir)) {
          try {
            promptsCount = readdirSync(promptsDir).filter((f) => f.endsWith('.md')).length;
          } catch {
            promptsCount = 0;
          }
        }
        checks.push({
          name: 'Prompts library',
          status: 'pass',
          message: `${promptsCount} prompt(s) generated`,
        });

        if (fix) {
          this.applyFixes(projectPath, checks);
        }
      } catch (err) {
        checks.push({
          name: 'State validation',
          status: 'fail',
          message: 'Could not read state: ' + (err instanceof Error ? err.message : String(err)),
        });
      }
    }
  }

  private checkTemplateVersion(projectPath: string, checks: HealthCheck[]): void {
    const lock = templateResolver.readTemplateLock(projectPath);
    if (!lock) {
      checks.push({
        name: 'Template version',
        status: 'warn',
        message: 'No template lock found',
      });
      return;
    }

    const registry = globalCache.getRegistry();
    const cached = registry[lock.template.id];
    const cachedVersion = cached?.defaultVersion;
    const lockedVersion = lock.template.version;

    if (cachedVersion && cachedVersion !== lockedVersion) {
      checks.push({
        name: 'Template version',
        status: 'warn',
        message: `Outdated (locked: ${lockedVersion}, current: ${cachedVersion})`,
        details: ['Run `archon upgrade` to update'],
      });
    } else {
      checks.push({
        name: 'Template version',
        status: 'pass',
        message: `${lockedVersion} (up to date)`,
      });
    }
  }

  private checkGlossary(projectPath: string, checks: HealthCheck[]): void {
    const glossaryPath = join(projectPath, 'docs', '02-requirements', 'glossary.md');
    if (!existsSync(glossaryPath)) {
      checks.push({
        name: 'Glossary',
        status: 'warn',
        message: 'No glossary found (phases 0-1)',
      });
      return;
    }

    try {
      const raw = readFileSync(glossaryPath, 'utf-8');
      const terms = raw.match(/^###?\s+.+$/gm);
      const defined = terms ? terms.length : 0;
      checks.push({
        name: 'Glossary',
        status: defined > 0 ? 'pass' : 'warn',
        message: `${defined} term(s) defined`,
      });
    } catch {
      checks.push({
        name: 'Glossary',
        status: 'warn',
        message: 'Could not read glossary',
      });
    }
  }

  private checkPhaseChain(projectPath: string, checks: HealthCheck[], _fix: boolean): void {
    const docsDir = join(projectPath, 'docs');
    const present: number[] = [];
    const missing: string[] = [];

    for (let i = 0; i <= 11; i++) {
      const folder = PHASES[i]!.folder;
      if (existsSync(join(docsDir, folder))) {
        present.push(i);
      } else if (i <= 5) {
        missing.push(`Phase ${i} (${PHASES[i]!.name})`);
      }
    }

    if (missing.length === 0) {
      checks.push({
        name: 'Phase chain',
        status: 'pass',
        message: `${present.length}/12 phase folders present`,
      });
    } else {
      checks.push({
        name: 'Phase chain',
        status: 'warn',
        message: `${present.length}/12 phase folders, ${missing.length} early phases missing`,
        details: missing.slice(0, 3),
      });
    }
  }

  private checkNavigationLinks(projectPath: string, checks: HealthCheck[]): void {
    const docsDir = join(projectPath, 'docs');
    const mdFiles: string[] = [];
    const collectMd = (dir: string): void => {
      if (!existsSync(dir)) return;
      try {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = join(dir, entry.name);
          if (entry.isDirectory()) {
            collectMd(full);
          } else if (entry.name.endsWith('.md')) {
            mdFiles.push(full);
          }
        }
      } catch {
        // skip
      }
    };

    collectMd(docsDir);

    let brokenLinks = 0;
    for (const file of mdFiles) {
      try {
        const raw = readFileSync(file, 'utf-8');
        const links = raw.match(/\[.*?\]\((.*?)\)/g) ?? [];
        for (const link of links) {
          const urlMatch = link.match(/]\((https?:\/\/.*?)\)/);
          if (urlMatch) continue;
          const pathMatch = link.match(/]\((.*?)\)/);
          if (!pathMatch) continue;
          const linkPath = pathMatch[1]!;
          if (linkPath.startsWith('#')) continue;
          if (linkPath.startsWith('http')) continue;

          const abs = join(file, '..', linkPath);
          const resolved = join(abs.replace(/\?.*$/, ''));
          if (!existsSync(resolved) && !existsSync(join(file, '..', linkPath))) {
            brokenLinks++;
          }
        }
      } catch {
        // skip
      }
    }

    checks.push({
      name: 'Navigation links',
      status: brokenLinks === 0 ? 'pass' : 'warn',
      message: `${mdFiles.length} markdown file(s) checked${brokenLinks > 0 ? `, ${brokenLinks} broken link(s) found` : ''}`,
    });
  }

  private applyFixes(projectPath: string, checks: HealthCheck[]): void {
    console.log(chalk.cyan('\n  Applying fixes...\n'));

    const issues: string[] = [];

    try {
      const sm = new StateManager(projectPath);
      const valid = sm.validate();
      if (!valid) {
        sm.recalculateChecksum();
        issues.push('Recalculated state checksum');
      }
    } catch (err) {
      issues.push('State checksum: ' + (err instanceof Error ? err.message : String(err)));
    }

    const issuesDir = join(projectPath, '.archon', 'issues');
    if (issues.length > 0) {
      mkdirSync(issuesDir, { recursive: true });
      writeFileSync(
        join(issuesDir, 'doctor-' + new Date().toISOString().slice(0, 10) + '.md'),
        '# Doctor Issues\n\n' + issues.map((i) => '- ' + i).join('\n') + '\n',
        'utf-8'
      );
      checks.push({
        name: 'Auto-fix',
        status: 'pass',
        message: `${issues.length} issue(s) fixed`,
        details: issues,
      });
    } else {
      checks.push({
        name: 'Auto-fix',
        status: 'pass',
        message: 'No issues to fix',
      });
    }
  }

  private findTemplateRoot(): string {
    const parts = process.cwd().split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      const candidate = parts.slice(0, i + 1).join('/');
      if (existsSync(join(candidate, '01-templates'))) {
        return candidate;
      }
    }
    return process.cwd();
  }
}
