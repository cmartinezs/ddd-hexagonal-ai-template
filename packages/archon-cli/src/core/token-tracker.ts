import { execSync } from 'node:child_process';

export interface TokenStats {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheRead: number;
  cacheWrite: number;
  messages: number;
  sessions: number;
  modelContextWindow: number;
  percentage: number;
  modelId: string;
}

export interface ModelStats {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheRead: number;
  cacheWrite: number;
  messages: number;
}

export interface TokenThresholds {
  warn: number;
  critical: number;
}

export const DEFAULT_THRESHOLDS: TokenThresholds = {
  warn: 70,
  critical: 90,
};

export const DEFAULT_CONTEXT_WINDOW = 200_000;

export class TokenTracker {
  getContextWindow(modelId: string): number {
    const knownModels: Record<string, number> = {
      'minimax-m2.5-free': 200_000,
      'minimax-m2.1-flash': 200_000,
      'claude-3-5-sonnet': 200_000,
      'claude-3-5-haiku': 200_000,
      'gpt-4o': 128_000,
      'gpt-4o-mini': 128_000,
      'gemini-2.0-flash': 1_000_000,
      'gemini-2.5-flash': 1_000_000,
    };

    const lower = modelId.toLowerCase();
    for (const [key, window] of Object.entries(knownModels)) {
      if (lower.includes(key)) return window;
    }
    return DEFAULT_CONTEXT_WINDOW;
  }

  getCurrentSessionId(): string | null {
    if (process.env.OPENCODE_SESSION_ID) return process.env.OPENCODE_SESSION_ID;
    try {
      const output = execSync('opencode session list --format json --max-count 1 2>/dev/null', {
        encoding: 'utf-8',
        timeout: 5000,
      });
      const jsonStart = output.indexOf('[');
      if (jsonStart < 0) return null;
      const sessions = JSON.parse(output.slice(jsonStart));
      return sessions[0]?.id ?? null;
    } catch {
      return null;
    }
  }

  getPerModelStats(): ModelStats[] {
    try {
      const output = execSync('opencode stats --models --project 2>&1', { encoding: 'utf-8', timeout: 10000 });
      return this.parseModelStats(output);
    } catch {
      return [];
    }
  }

  private parseModelStats(output: string): ModelStats[] {
    const results: ModelStats[] = [];
    const lines = output.split('\n');
    let currentModel: string | null = null;
    let currentStats: Partial<ModelStats> = {};

    const tokenRe = /([\d.]+)\s*([KMGT])?/;
    const parseTokens = (s: string): number => {
      const m = s.replace(/,/g, '').match(tokenRe);
      if (!m) return 0;
      const num = parseFloat(m[1]!);
      const unit = m[2];
      const mult: Record<string, number> = { K: 1e3, M: 1e6, G: 1e9, T: 1e12 };
      return Math.round(num * (unit ? (mult[unit] ?? 1) : 1));
    };

    for (const line of lines) {
      const clean = line.replace(/│|┌|┐|└|┘|├|┤|┼|─|\x1b\[\d+m/g, '').trim();
      if (!clean) continue;

      if (clean.startsWith('opencode/') || clean.startsWith('/opencode/')) {
        if (currentModel && currentStats.inputTokens !== undefined) {
          currentStats.totalTokens = (currentStats.inputTokens ?? 0) + (currentStats.outputTokens ?? 0);
          results.push({
            modelId: currentModel,
            inputTokens: currentStats.inputTokens,
            outputTokens: currentStats.outputTokens ?? 0,
            totalTokens: currentStats.totalTokens,
            cacheRead: currentStats.cacheRead ?? 0,
            cacheWrite: currentStats.cacheWrite ?? 0,
            messages: currentStats.messages ?? 0,
          });
        }
        currentModel = clean.replace(/^\//, '').replace(/\s+(\d+)?\s*$/, '').trim();
        currentModel = currentModel.replace(/^opencode\//, '').trim();
        currentStats = {};
      } else if (currentModel) {
        const parts = clean.split(/\s{2,}/);
        if (parts.length >= 2) {
          const label = parts[0]!.trim();
          const rawVal = parts.slice(1).join(' ').trim();
          switch (label) {
            case 'Input Tokens': currentStats.inputTokens = parseTokens(rawVal); break;
            case 'Output Tokens': currentStats.outputTokens = parseTokens(rawVal); break;
            case 'Messages': currentStats.messages = parseInt(rawVal.replace(/,/g, ''), 10) || 0; break;
            case 'Cache Read': currentStats.cacheRead = parseTokens(rawVal); break;
            case 'Cache Write': currentStats.cacheWrite = parseTokens(rawVal); break;
          }
        }
      }
    }

    if (currentModel && currentStats.inputTokens !== undefined) {
      currentStats.totalTokens = (currentStats.inputTokens ?? 0) + (currentStats.outputTokens ?? 0);
      results.push({
        modelId: currentModel,
        inputTokens: currentStats.inputTokens,
        outputTokens: currentStats.outputTokens ?? 0,
        totalTokens: currentStats.totalTokens,
        cacheRead: currentStats.cacheRead ?? 0,
        cacheWrite: currentStats.cacheWrite ?? 0,
        messages: currentStats.messages ?? 0,
      });
    }

    return results;
  }

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
      const cleaned = output.replace(/│|┌|┐|└|┘|├|┤|┼|─|\x1b\[\d+m/g, '').trim();
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

      if (inputTokens === 0 && outputTokens === 0) {
        const perModel = this.getPerModelStats();
        const modelStats = perModel[0];
        if (modelStats) {
          inputTokens = modelStats.inputTokens;
          outputTokens = modelStats.outputTokens;
        } else {
          return null;
        }
      }

      const perModel = this.getPerModelStats();
      const modelStats = perModel[0];
      const modelId = modelStats?.modelId ?? 'minimax-m2.5-free';
      const contextWindow = this.getContextWindow(modelId);
      const totalTokens = inputTokens + outputTokens;
      const percentage = Math.min(100, Math.round((totalTokens / contextWindow) * 100));

      return {
        inputTokens,
        outputTokens,
        totalTokens,
        cacheRead,
        cacheWrite,
        messages,
        sessions,
        modelContextWindow: contextWindow,
        percentage,
        modelId,
      };
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
    if (stats.percentage >= thresholds.critical) {
      return {
        severity: 'critical',
        message: 'Token usage is critical (' + stats.percentage + '% — ' + this.fmtNumber(stats.totalTokens) + ' of ' + this.fmtNumber(stats.modelContextWindow) + '). Session will be compacted before execution.',
      };
    }
    if (stats.percentage >= thresholds.warn) {
      return {
        severity: 'warn',
        message: 'Token usage is high (' + stats.percentage + '% — ' + this.fmtNumber(stats.totalTokens) + ' of ' + this.fmtNumber(stats.modelContextWindow) + '). Consider running `archon session compact` to compact the session.',
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

  fmtTokens(n: number): string {
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  buildTokenBar(percentage: number, width = 10): string {
    const capped = Math.min(100, Math.max(0, percentage));
    const filled = Math.round((capped / 100) * width);
    const empty = width - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
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