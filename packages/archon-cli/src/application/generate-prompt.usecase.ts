import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { StateManager } from '../infrastructure/state/state-manager.js';
import { contextScanner } from '../core/context-scanner.js';
import { aiPromptBuilder } from '../core/ai-prompt-builder.js';
import type { AgentType, TransportMode } from '../domain/project-state/project-state.types.js';

export interface GeneratePromptInput {
  projectPath: string;
  phase: number;
  agent: AgentType;
  transport: TransportMode;
  injectGuides?: boolean;
}

export interface GeneratePromptOutput {
  promptFilePath: string;
  metaFilePath: string;
  contextPath: string;
  mapPath: string;
  title: string;
  archonSessionId: string;
}

export class GeneratePromptUseCase {
  async execute(input: GeneratePromptInput): Promise<GeneratePromptOutput> {
    const { projectPath, phase, agent, transport, injectGuides = true } = input;

    const sm = new StateManager(projectPath);
    const state = sm.load();

    contextScanner.saveContext(projectPath, state);

    if (injectGuides) {
      await this.injectGuidesToContext(projectPath);
    }

    const promptResult = aiPromptBuilder.build({
      phase,
      context: 'full',
      projectPath,
      state,
      agent,
      transport,
    });

    mkdirSync(join(projectPath, '.archon', 'prompts'), { recursive: true });
    writeFileSync(promptResult.filePath, promptResult.content, 'utf-8');

    const metaFilePath = promptResult.filePath.replace('.md', '.json');
    writeFileSync(metaFilePath, JSON.stringify(promptResult.metadata, null, 2), 'utf-8');

    const archonSessionId = 'archon-' + new Date().toISOString().replace(/[:.]/g, '-') + '-' + randomUUID().slice(0, 8);

    const contextPath = join(projectPath, '.archon', 'context', 'project-context.md');
    const mapPath = join(projectPath, '.archon', 'context', 'project-map.json');

    const title = '[' + state.projectName + '] Phase ' + phase + ': ' + promptResult.metadata.phaseName;

    return {
      promptFilePath: promptResult.filePath,
      metaFilePath,
      contextPath,
      mapPath,
      title,
      archonSessionId,
    };
  }

  private async injectGuidesToContext(projectPath: string): Promise<void> {
    const guidesDir = join(projectPath, '.archon', 'guides');
    const agentsPath = join(projectPath, '.archon', 'AGENTS.md');
    const contextPath = join(projectPath, '.archon', 'context', 'project-context.md');

    if (!existsSync(guidesDir) && !existsSync(agentsPath)) return;

    const lines: string[] = [];
    lines.push('# AI Agent Guides Reference');
    lines.push('');
    lines.push('_This section provides AI agent guidance specific to this project._');
    lines.push('');

    if (existsSync(agentsPath)) {
      lines.push('### AGENTS.md (Root Instructions)');
      lines.push('');
      lines.push(readFileSync(agentsPath, 'utf-8').slice(0, 2000));
      lines.push('');
    }

    if (existsSync(guidesDir)) {
      const keyGuides = ['INSTRUCTIONS-FOR-AI.md', 'AI-WORKFLOW-GUIDE.md', 'SKILLS-AND-PLUGINS-GUIDE.md'];
      for (const guide of keyGuides) {
        const guidePath = join(guidesDir, guide);
        if (existsSync(guidePath)) {
          lines.push('### ' + guide.replace('.md', ''));
          lines.push('');
          lines.push(readFileSync(guidePath, 'utf-8').slice(0, 1500));
          lines.push('');
        }
      }
    }

    const guidesContent = lines.join('\n');
    const existingContent = existsSync(contextPath) ? readFileSync(contextPath, 'utf-8') : '';
    writeFileSync(contextPath, guidesContent + '\n\n---\n\n' + existingContent, 'utf-8');
  }
}
