# archon run

> Execute an AI agent for the current phase via the adapter system.

## Usage

```bash
archon run --agent <agent> --phase <N>
archon run --agent <agent> --phase <N> --dry-run
archon run --agent <agent> --phase <N> --confirm
archon run --agent opencode --phase <N> --attach <url>
```

## Options

| Option | Description |
|--------|-------------|
| `--agent <name>` | Agent to use: `opencode`, `claude`, `cursor`, `gemini`, `manual`. Prompted interactively if omitted. |
| `--phase <N>` | Phase to run. Prompted interactively if omitted. |
| `--dry-run` | Print the resolved command without executing it. |
| `--confirm` | Ask for confirmation before executing the agent command. |
| `--attach <url>` | Attach to a running opencode persistent server (opencode only). |

## Behaviour

Resolves the agent adapter for the specified agent, generates the phase prompt (if not already generated), and invokes the agent with the prompt attached as a file. Execution is logged to `.archon/runs/<timestamp>.json`.

### Transport Priority

| Transport | Description |
|-----------|-------------|
| `file-attachment` (default) | Prompt written to `.archon/prompts/` and passed as a file argument. Most stable. |
| `attach` | Persistent server mode via `--attach <url>`. Avoids agent cold-boot. opencode only. |
| `stdin` | Passes prompt via stdin. Experimental. |

### Context Auto-injection

If `.archon/context/context.md` exists (created by [`archon context inject`](context.md)), it is prepended to the prompt automatically.

### Supported Agents

| Agent | Notes |
|-------|-------|
| `opencode` | Full support: file-attachment, attach (persistent server), stdin. |
| `claude` | File-attachment and stdin. |
| `cursor` | File-attachment. |
| `gemini` | File-attachment. |
| `manual` | Prints the prompt to stdout for copy-paste. |

## Examples

```bash
# Run opencode for phase 1
archon run --agent opencode --phase 1

# Preview the resolved command without running
archon run --agent opencode --phase 1 --dry-run

# Run with confirmation prompt before executing
archon run --agent opencode --phase 2 --confirm

# Attach to a running opencode server
archon run --agent opencode --phase 3 --attach http://localhost:3000
```

## See Also

- [`archon prompt`](prompt.md) — generate the prompt separately before running
- [`archon context`](context.md) — enrich context before running
- [`archon agent`](agent.md) — configure the default agent
- [`archon prompts`](prompts.md) — review previous run prompts
