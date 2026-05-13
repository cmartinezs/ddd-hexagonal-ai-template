import { execSync } from 'node:child_process';

export interface TokenStats {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheRead: number;
  cacheWrite: number;
  messages: number;
  sessions: number;
}

export interface TokenThresholds {
  warn: number;
  critical: number;
}

export const DEFAULT_THRESHOLDS: TokenThresholds = {
  warn: 5_000_000,
  critical: 10_000_000,
};

export class TokenTracker {
  getStats(): TokenStats | null {
    try {
      const output = execSync('opencode stats 2>&1', { encoding: 'utf-8', timeout: 10000 });
      return this.parseStats(output);
    } catch {
      return null;
    }
  }

  parseStats(output: string): TokenStats | null {
    try {
      const cleaned = output.replace(/[│┌┐└┘├┤┼─]/g, '').trim();
      const lines = cleaned.split('\n').map((l) => l.trim()).filter(Boolean);

      let inputTokens = 0;
      let outputTokens = 0;
      let cacheRead = 0;
      let cacheWrite = 0;
      let messages = 0;
      let sessions = 0;

      for (const line of lines) {
        const parts = line.split(/\s{2,}/);
        if (parts.length < 2) continue;
        const label = parts[0]!.trim();
        const rawVal = parts.slice(1).join(' ').trim();

        if (label === 'Messages') {
          messages = parseInt(rawVal.replace(/,/g, ''), 10) || 0;
        } else if (label === 'Sessions') {
          sessions = parseInt(rawVal.replace(/,/g, ''), 10) || 0;
        } else if (label === 'Input') {
          inputTokens = this.parseTokenValue(rawVal);
        } else if (label === 'Output') {
          outputTokens = this.parseTokenValue(rawVal);
        } else if (label === 'Cache Read') {
          cacheRead = this.parseTokenValue(rawVal);
        } else if (label === 'Cache Write') {
          cacheWrite = this.parseTokenValue(rawVal);
        }
      }

      if (inputTokens === 0 && outputTokens === 0) return null;

      return { inputTokens, outputTokens, totalTokens: inputTokens + outputTokens, cacheRead, cacheWrite, messages, sessions };
    } catch {
      return null;
    }
  }

  private parseTokenValue(s: string): number {
    const m = s.replace(/,/g, '').match(/([\d.]+)\s*([KMGT])?/);
    if (!m) return 0;
    const num = parseFloat(m[1]!);
    const unit = m[2];
    const mult: Record<string, number> = { K: 1e3, M: 1e6, G: 1e9, T: 1e12 };
    return Math.round(num * (unit ? (mult[unit] ?? 1) : 1));
  }

  checkThresholds(stats: TokenStats, thresholds: TokenThresholds): { severity: 'ok' | 'warn' | 'critical'; message: string } {
    if (stats.totalTokens >= thresholds.critical) {
      return {
        severity: 'critical',
        message: 'Token usage is critical (' + this.fmtNumber(stats.totalTokens) + '). Session will be compacted before execution.',
      };
    }
    if (stats.totalTokens >= thresholds.warn) {
      return {
        severity: 'warn',
        message: 'Token usage is high (' + this.fmtNumber(stats.totalTokens) + '). Consider running `archon session compact` to compact the session.',
      };
    }
    return { severity: 'ok', message: '' };
  }

  fmtNumber(n: number): string {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  async compactSession(): Promise<{ success: boolean; message: string }> {
    try {
      execSync('opencode run --compact 2>/dev/null', { stdio: 'ignore', timeout: 30000 });
      return { success: true, message: 'Session compacted.' };
    } catch {
      return { success: false, message: 'Compaction not available via --compact flag.' };
    }
  }
}

export const tokenTracker = new TokenTracker();