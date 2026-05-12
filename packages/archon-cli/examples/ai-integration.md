# AI Agent Integration

Archon is agent-agnostic. It generates structured prompts and can execute them through adapters for opencode, Claude Code, and other agents.

## Supported Agents

| Agent | Transport | Status |
|-------|-----------|--------|
| `opencode` | file-attachment, attach, stdin | Primary |
| `claude` | file-attachment | Fully supported |
| `cursor` | file-attachment | Detected |
| `gemini` | file-attachment | Detected |
| `manual` | none | Prompts only |

## Setting Up Your Agent

```bash
# Set your preferred agent
archon agent --set opencode

# Test availability
archon agent --doctor --agent opencode

# List all detected agents
archon agent ls
```

## Transport Modes

### file-attachment (default, recommended)

Prompts are written to `.archon/prompts/` and attached as files. Works with all agents.

```bash
archon prompt --phase 3 --context full
archon run --agent opencode --phase 3
```

### attach (persistent server)

Avoids cold boot of MCPs/plugins by connecting to a persistent server.

```bash
# Terminal 1: Start server
opencode serve

# Terminal 2: Run with attach mode
archon run --agent opencode --phase 3 --attach http://localhost:4096
```

### stdin (experimental)

Passes prompt directly via stdin. Test first:

```bash
archon agent --doctor --agent opencode
# Check "supports stdin prompt" in output
```

## Agent Adapter Interface

To add a new agent, implement the `AgentAdapter` interface:

```typescript
interface AgentAdapter {
  id: string;
  displayName: string;
  detect(): Promise<AgentDetectionResult>;
  doctor(): Promise<AgentDoctorResult>;
  execute(request: AgentExecutionRequest): Promise<AgentExecutionResult>;
  buildCommand(request: AgentExecutionRequest): string[];
}
```

Register in `AgentAdapterFactory`:

```typescript
AgentAdapterFactory.register(new MyAgentAdapter());
```

## Execution Flow

```
archon run --agent opencode --phase 3
    │
    ├── 1. Generate context (contextScanner.saveContext)
    │       → .archon/context/project-context.md
    │       → .archon/context/project-map.json
    │
    ├── 2. Generate prompt (aiPromptBuilder.build)
    │       → .archon/prompts/phase-3-YYYY-MM-DD.md
    │
    ├── 3. Create run record (runTracker.createRunRecord)
    │       → .archon/runs/<timestamp>-opencode/run.json
    │
    ├── 4. Execute agent (opencodeAdapter.execute)
    │       → opencode run --file <prompt> --file <context> --dir .
    │
    └── 5. Complete record (runTracker.completeRun)
            → .archon/runs/<timestamp>-opencode/run.json (updated)
            → .archon/runs/<timestamp>-opencode/stdout.log
            → .archon/runs/<timestamp>-opencode/stderr.log
```

## Prompt Library

All generated prompts are saved in `.archon/prompts/`:

```bash
# List all prompts
archon prompts ls

# Rank by size
archon prompts rank size

# Compress a prompt (remove intermediate sections)
archon prompts compress phase-3-2026-05-12

# Merge two prompts
archon prompts merge phase-2-xxx phase-3-xxx

# Export for sharing
archon prompts export phase-3-xxx --to ~/prompts/phase3.md
```

## Best Practices

1. **Use `--context full`** for the first prompt in each phase
2. **Use `--dry-run`** before first execution to verify the command
3. **Use `--confirm`** for destructive operations
4. **Review prompts** before sending to agent — Archon generates, you review
5. **Track runs** — all executions are logged in `.archon/runs/`
