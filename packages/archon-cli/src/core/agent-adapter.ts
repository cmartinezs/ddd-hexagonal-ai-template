import { execSync } from 'node:child_process';

export interface AgentDetectionResult {
  available: boolean;
  version?: string;
  error?: string;
}

export interface AgentCapabilities {
  supportsRun: boolean;
  supportsFileAttachment: boolean;
  supportsAttach: boolean;
  supportsStdinPrompt: boolean;
}

export interface AgentDoctorResult {
  status: 'available' | 'unavailable' | 'partial';
  version?: string;
  capabilities: AgentCapabilities;
  recommendedTransport: 'file-attachment' | 'attach' | 'stdin' | 'none';
  diagnostics: string[];
}

export interface AgentExecutionRequest {
  cwd: string;
  promptFile: string;
  contextFiles: string[];
  title?: string;
  model?: string;
  remoteAgent?: string;
  session?: string;
  continueSession?: boolean;
  attachUrl?: string;
  dryRun?: boolean;
  outputFormat?: 'default' | 'json';
  transport?: 'file-attachment' | 'attach' | 'stdin';
  confirm?: boolean;
}

export interface AgentExecutionResult {
  success: boolean;
  exitCode?: number;
  duration?: number;
  runId: string;
  outputFiles?: string[];
  error?: string;
}

export interface AgentAdapter {
  id: string;
  displayName: string;
  detect(): Promise<AgentDetectionResult>;
  doctor(): Promise<AgentDoctorResult>;
  execute(request: AgentExecutionRequest): Promise<AgentExecutionResult>;
  buildCommand(request: AgentExecutionRequest): string[];
}

export class OpencodeAdapter implements AgentAdapter {
  readonly id = 'opencode';
  readonly displayName = 'Opencode';

  async detect(): Promise<AgentDetectionResult> {
    try {
      const v = execSync('opencode --version 2>/dev/null || opencode -v 2>/dev/null || echo "unknown"', {
        encoding: 'utf-8',
        timeout: 5000,
      }).trim();
      return { available: v !== 'unknown' && v !== '', version: v || undefined };
    } catch {
      return { available: false, error: 'opencode not found in PATH' };
    }
  }

  async doctor(): Promise<AgentDoctorResult> {
    const detection = await this.detect();
    if (!detection.available) {
      return {
        status: 'unavailable',
        capabilities: {
          supportsRun: false,
          supportsFileAttachment: false,
          supportsAttach: false,
          supportsStdinPrompt: false,
        },
        recommendedTransport: 'none',
        diagnostics: [detection.error ?? 'opencode not found'],
      };
    }

    const diagnostics: string[] = [];

    try {
      execSync('opencode run --help 2>/dev/null | head -1', { encoding: 'utf-8', timeout: 5000 });
      diagnostics.push('opencode run command available');
    } catch {
      diagnostics.push('opencode run command not verified');
    }

    try {
      execSync('opencode serve --help 2>/dev/null | head -1', { encoding: 'utf-8', timeout: 5000 });
      diagnostics.push('opencode serve (persistent mode) available');
    } catch {
      diagnostics.push('opencode serve not found — attach mode unavailable');
    }

    return {
      status: 'available',
      version: detection.version,
      capabilities: {
        supportsRun: true,
        supportsFileAttachment: true,
        supportsAttach: diagnostics.some((d) => d.includes('serve')),
        supportsStdinPrompt: true,
      },
      recommendedTransport: 'file-attachment',
      diagnostics,
    };
  }

  buildCommand(request: AgentExecutionRequest): string[] {
    const cmd: string[] = ['opencode', 'run'];

    cmd.push('--title', request.title ?? 'Archon Task');

    if (request.transport === 'attach' && request.attachUrl) {
      cmd.push('--attach', request.attachUrl);
    }

    if (request.transport === 'stdin') {
      cmd.push('--stdin');
    }

    if (request.session) {
      cmd.push('--session', request.session);
    }

    if (request.continueSession) {
      cmd.push('--continue');
    }

    if (request.model) {
      cmd.push('--model', request.model);
    }

    cmd.push('--dir', request.cwd);

    for (const file of request.contextFiles) {
      cmd.push('--file', file);
    }
    cmd.push('--file', request.promptFile);

    if (request.outputFormat === 'json') {
      cmd.push('--output', 'json');
    }

    cmd.push('Execute the Archon task described in the attached files.');

    return cmd;
  }

  async execute(request: AgentExecutionRequest): Promise<AgentExecutionResult> {
    if (request.dryRun) {
      return {
        success: true,
        runId: 'dry-run',
        exitCode: 0,
        error: undefined,
      };
    }

    const { spawn } = await import('node:child_process');
    const args = this.buildCommand(request);
    const start = Date.now();

    return new Promise((resolve) => {
      const proc = spawn(args[0]!, args.slice(1), {
        cwd: request.cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      proc.stdout?.on('data', (data) => {
        process.stdout.write(data);
        stdout += data.toString();
      });

      proc.stderr?.on('data', (data) => {
        process.stderr.write(data);
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        resolve({
          success: (code ?? 1) === 0,
          exitCode: code ?? undefined,
          duration: Date.now() - start,
          runId: new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z-opencode',
          error: code !== 0 ? stderr.trim() : undefined,
        });
      });

      proc.on('error', (err) => {
        resolve({
          success: false,
          exitCode: 1,
          duration: Date.now() - start,
          runId: new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z-opencode',
          error: err.message,
        });
      });
    });
  }
}

export class ClaudeAdapter implements AgentAdapter {
  readonly id = 'claude';
  readonly displayName = 'Claude Code';

  async detect(): Promise<AgentDetectionResult> {
    try {
      const v = execSync('claude --version 2>/dev/null || echo "unknown"', {
        encoding: 'utf-8',
        timeout: 5000,
      }).trim();
      return { available: v !== 'unknown', version: v || undefined };
    } catch {
      return { available: false, error: 'claude not found in PATH' };
    }
  }

  async doctor(): Promise<AgentDoctorResult> {
    const detection = await this.detect();
    if (!detection.available) {
      return {
        status: 'unavailable',
        capabilities: {
          supportsRun: false,
          supportsFileAttachment: false,
          supportsAttach: false,
          supportsStdinPrompt: false,
        },
        recommendedTransport: 'none',
        diagnostics: [detection.error ?? 'claude not found'],
      };
    }

    return {
      status: 'available',
      version: detection.version,
      capabilities: {
        supportsRun: true,
        supportsFileAttachment: true,
        supportsAttach: false,
        supportsStdinPrompt: false,
      },
      recommendedTransport: 'file-attachment',
      diagnostics: ['claude detected — use file-attachment transport'],
    };
  }

  buildCommand(request: AgentExecutionRequest): string[] {
    const cmd: string[] = ['claude'];

    if (request.session) {
      cmd.push('--session', request.session);
    }

    if (request.continueSession) {
      cmd.push('--continue');
    }

    if (request.transport === 'attach' && request.attachUrl) {
      cmd.push('--attach', request.attachUrl);
    }

    for (const file of request.contextFiles) {
      cmd.push('--file', file);
    }
    cmd.push('--file', request.promptFile);

    cmd.push('Execute the Archon task described in the attached files.');

    return cmd;
  }

  async execute(request: AgentExecutionRequest): Promise<AgentExecutionResult> {
    if (request.dryRun) {
      return { success: true, runId: 'dry-run', exitCode: 0 };
    }

    const { spawn } = await import('node:child_process');
    const args = this.buildCommand(request);
    const start = Date.now();

    return new Promise((resolve) => {
      const proc = spawn(args[0]!, args.slice(1), {
        cwd: request.cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      proc.stdout?.on('data', (data) => process.stdout.write(data));
      proc.stderr?.on('data', (data) => process.stderr.write(data));

      proc.on('close', (code) => {
        resolve({
          success: (code ?? 1) === 0,
          exitCode: code ?? undefined,
          duration: Date.now() - start,
          runId: new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z-claude',
          error: code !== 0 ? 'claude exited with non-zero code' : undefined,
        });
      });

      proc.on('error', (err) => {
        resolve({
          success: false,
          exitCode: 1,
          duration: Date.now() - start,
          runId: new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + 'Z-claude',
          error: err.message,
        });
      });
    });
  }
}

export class AgentAdapterFactory {
  private static adapters: Record<string, AgentAdapter> = {
    opencode: new OpencodeAdapter(),
    claude: new ClaudeAdapter(),
  };

  static get(agentId: string): AgentAdapter | null {
    return AgentAdapterFactory.adapters[agentId] ?? null;
  }

  static list(): AgentAdapter[] {
    return Object.values(AgentAdapterFactory.adapters);
  }

  static register(adapter: AgentAdapter): void {
    AgentAdapterFactory.adapters[adapter.id] = adapter;
  }

  static async detectAll(): Promise<Array<{ id: string; detection: AgentDetectionResult }>> {
    const results = await Promise.all(
      AgentAdapterFactory.list().map(async (adapter) => ({
        id: adapter.id,
        detection: await adapter.detect(),
      }))
    );
    return results;
  }
}
