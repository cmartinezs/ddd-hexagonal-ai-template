import { existsSync, statSync } from 'node:fs';
import { AgentAdapterFactory, AGENT_TIERS, type AgentExecutionRequest } from '../infrastructure/agents/index.js';
import { RunTracker } from '../infrastructure/fs/run-tracker.js';
import { tokenTracker } from '../core/token-tracker.js';
import type { AgentType, TransportMode } from '../domain/project-state/project-state.types.js';

export interface RunAgentInput {
  projectPath: string;
  agent: AgentType;
  phase: number;
  transport: TransportMode;
  promptFilePath: string;
  contextFiles: string[];
  title: string;
  archonSessionId: string;
  attachUrl?: string;
  dryRun?: boolean;
}

export interface TokenUsageSummary {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheRead: number;
  cacheWrite: number;
  deltaTokens: number;
  projectTotalTokens: number;
  contextWindow: number;
  percentage: number;
  source: string;
  snapshotBefore?: string;
  snapshotAfter?: string;
}

export interface SessionTokenInfo {
  percentage: number;
  totalTokens: number;
  contextWindow: number;
  inputTokens: number;
  outputTokens: number;
  cacheRead: number;
  cacheWrite: number;
}

export interface AgentDoctorResult {
  status: string;
  version?: string;
  model?: string;
  capabilities: {
    supportsRun: boolean;
    supportsFileAttachment: boolean;
    supportsAttach: boolean;
  };
  diagnostics: string[];
}

export interface RunAgentOutput {
  dryRun: boolean;
  dryRunCommand?: string[];
  success?: boolean;
  runId?: string;
  duration?: number;
  tokenUsage?: TokenUsageSummary;
  sessionTokensAfter?: SessionTokenInfo;
  doctor?: AgentDoctorResult;
  error?: string;
}

export class RunAgentUseCase {
  async execute(input: RunAgentInput): Promise<RunAgentOutput> {
    const { projectPath, agent, transport, promptFilePath, contextFiles, title, archonSessionId, attachUrl, dryRun = false } = input;

    const adapter = AgentAdapterFactory.get(agent);
    if (!adapter) {
      return { dryRun, error: 'No adapter found for agent: ' + agent };
    }

    const agentTier = AGENT_TIERS[agent] ?? 'planned';
    if (agentTier === 'planned') {
      return { dryRun, error: 'Agent "' + agent + '" is not yet supported. Supported agents: opencode, claude.' };
    }

    const resolvedContextFiles = contextFiles.filter((f) => existsSync(f));

    const request: AgentExecutionRequest = {
      cwd: projectPath,
      promptFile: promptFilePath,
      contextFiles: resolvedContextFiles,
      title,
      transport,
      attachUrl: attachUrl ?? undefined,
      dryRun,
      archonSessionId,
    };

    const doctorResult = await adapter.doctor();

    if (dryRun) {
      const cmd = adapter.buildCommand(request);
      return {
        dryRun: true,
        dryRunCommand: cmd,
        doctor: {
          status: doctorResult.status,
          version: doctorResult.version,
          model: doctorResult.model,
          capabilities: doctorResult.capabilities,
          diagnostics: doctorResult.diagnostics,
        },
      };
    }

    const runTracker = new RunTracker(projectPath);
    const beforeSnapshot = agent === 'opencode' ? tokenTracker.snapshot() : null;

    const record = runTracker.createRunRecord(request, agent, transport);

    const result = await adapter.execute(request);

    let tokenUsage: TokenUsageSummary | undefined;
    let sessionTokensAfter: SessionTokenInfo | undefined;

    if (agent === 'opencode' && beforeSnapshot) {
      const afterSnapshot = tokenTracker.snapshot();
      if (afterSnapshot) {
        const delta = tokenTracker.computeDelta(beforeSnapshot, afterSnapshot);
        const perModel = tokenTracker.getPerModelStats();
        const m = perModel[0];
        const contextWindow = tokenTracker.getContextWindow(m?.modelId ?? 'minimax-m2.5-free');

        tokenUsage = {
          inputTokens: delta.inputTokens,
          outputTokens: delta.outputTokens,
          totalTokens: delta.totalTokens,
          cacheRead: delta.cacheRead,
          cacheWrite: delta.cacheWrite,
          deltaTokens: delta.deltaTokens,
          projectTotalTokens: m?.totalTokens ?? 0,
          contextWindow,
          percentage: Math.min(100, Math.round((delta.totalTokens / contextWindow) * 100)),
          source: delta.source,
          snapshotBefore: beforeSnapshot.timestamp,
          snapshotAfter: afterSnapshot.timestamp,
        };

        const after = tokenTracker.getCurrentSessionTokens();
        if (after) {
          sessionTokensAfter = {
            percentage: after.percentage,
            totalTokens: after.totalTokens,
            contextWindow: after.contextWindow,
            inputTokens: after.inputTokens,
            outputTokens: after.outputTokens,
            cacheRead: after.cacheRead,
            cacheWrite: after.cacheWrite,
          };
        }
      }
    }

    const completed = runTracker.completeRun(record, result, tokenUsage);

    return {
      dryRun: false,
      success: result.success,
      runId: completed.id,
      duration: result.duration,
      tokenUsage,
      sessionTokensAfter,
      doctor: {
        status: doctorResult.status,
        version: doctorResult.version,
        model: doctorResult.model,
        capabilities: doctorResult.capabilities,
        diagnostics: doctorResult.diagnostics,
      },
      error: result.success ? undefined : (result.error ?? 'Unknown error'),
    };
  }

  getFileSizes(files: string[]): Map<string, number> {
    const sizes = new Map<string, number>();
    for (const f of files) {
      try { sizes.set(f, statSync(f).size); } catch { sizes.set(f, 0); }
    }
    return sizes;
  }
}
