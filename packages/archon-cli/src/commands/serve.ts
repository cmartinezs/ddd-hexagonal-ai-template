import chalk from 'chalk';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const PID_FILE = join(homedir(), '.local', 'state', 'opencode', 'serve.pid');
const URL_FILE = join(homedir(), '.local', 'state', 'opencode', 'serve.url');

export class ServeCommand {
  private pid: number | null = null;
  private url: string | null = null;

  async run(args: string[], _opts: Record<string, unknown>): Promise<void> {
    this.loadState();

    const subcommand = args[0] ?? 'status';

    switch (subcommand) {
      case 'start':
        this.start();
        break;
      case 'stop':
        this.stop();
        break;
      case 'status':
        this.status();
        break;
      case 'url':
        this.showUrl();
        break;
      default:
        console.error(chalk.red('\n  Unknown subcommand: ' + subcommand));
        console.log(chalk.yellow('  Usage: archon serve start|stop|status|url\n'));
    }
  }

  private start(): void {
    if (this.pid && this.isRunning(this.pid)) {
      console.log(chalk.yellow('\n  Server already running (PID ' + this.pid + ')\n'));
      if (this.url) console.log('  URL: ' + chalk.cyan(this.url) + '\n');
      return;
    }

    console.log(chalk.cyan('\n  Starting opencode server...\n'));

    const child = spawn('opencode', ['serve', '--port', '0'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: true,
      shell: true,
    });

    let urlOutput = '';
    let started = false;

    child.stdout?.on('data', (data) => {
      const text = data.toString();
      process.stdout.write(text);
      urlOutput += text;
      if (!started && text.includes('http://')) {
        started = true;
      }
    });

    child.stderr?.on('data', (data) => {
      process.stderr.write(data.toString());
    });

    child.on('error', (err) => {
      console.error(chalk.red('\n  Failed to start server: ' + err.message + '\n'));
    });

    setTimeout(() => {
      try {
        process.kill(this.pid ?? 0, 0);
      } catch {
        this.pid = child.pid ?? null;
        const url = this.extractUrl(urlOutput);
        this.url = url ?? 'http://localhost:4096';
        this.saveState();
        console.log(chalk.green('\n  Server started (PID ' + this.pid + ')\n'));
        console.log('  URL: ' + chalk.cyan(this.url) + '\n');
        console.log('  Run:  ' + chalk.dim('archon run --agent opencode --phase 0 --attach ' + this.url) + '\n');
      }
    }, 2000);
  }

  private stop(): void {
    if (!this.pid || !this.isRunning(this.pid)) {
      this.pid = null;
      this.saveState();
      console.log(chalk.yellow('\n  Server not running.\n'));
      return;
    }

    try {
      process.kill(this.pid, 'SIGTERM');
      setTimeout(() => {
        try {
          process.kill(this.pid!,  0);
          process.kill(this.pid!, 'SIGKILL');
        } catch {
          // already dead
        }
        this.pid = null;
        this.url = null;
        this.saveState();
        console.log(chalk.green('\n  Server stopped.\n'));
      }, 1000);
    } catch (err) {
      console.error(chalk.red('\n  Failed to stop server: ' + (err instanceof Error ? err.message : err) + '\n'));
    }
  }

  private status(): void {
    if (this.pid && this.isRunning(this.pid)) {
      console.log(chalk.green('\n  Server running'));
      console.log('    PID: ' + this.pid);
      if (this.url) console.log('    URL: ' + chalk.cyan(this.url));
      console.log();
      console.log('  ' + chalk.dim('archon run --agent opencode --phase <N> --attach ' + (this.url ?? '<url>')) + '\n');
    } else {
      console.log(chalk.yellow('\n  Server not running.\n'));
      console.log('  Start: ' + chalk.cyan('archon serve start') + '\n');
    }
  }

  private showUrl(): void {
    if (this.pid && this.isRunning(this.pid) && this.url) {
      console.log('\n  ' + this.url + '\n');
    } else if (this.url) {
      console.log(chalk.yellow('\n  Server not running. Last known URL: ' + this.url + '\n'));
    } else {
      console.log(chalk.yellow('\n  No URL known. Start server first.\n'));
    }
  }

  private isRunning(pid: number): boolean {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  }

  private extractUrl(output: string): string | null {
    const match = output.match(/http:\/\/[^\s]+/);
    return match ? match[0]! : null;
  }

  private loadState(): void {
    try {
      if (existsSync(PID_FILE)) {
        this.pid = parseInt(readFileSync(PID_FILE, 'utf-8').trim(), 10) || null;
      }
      if (existsSync(URL_FILE)) {
        this.url = readFileSync(URL_FILE, 'utf-8').trim() || null;
      }
    } catch {
      // ignore
    }
  }

  private saveState(): void {
    try {
      if (this.pid) {
        writeFileSync(PID_FILE, String(this.pid), 'utf-8');
      }
      if (this.url) {
        writeFileSync(URL_FILE, this.url, 'utf-8');
      }
    } catch {
      // ignore
    }
  }
}