# archon status

> Show current phase and overall project progress.

## Usage

```bash
archon status
archon status --json
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output status as JSON (for scripting or CI). |

## Behaviour

Reads `.archon/state.json` and renders the current project state:

- Current phase number and name
- Status of each phase: `pending`, `in_progress`, `complete`, `skipped`
- Visual progress bar across the 12 phases (0–11)
- Configured AI agent and context level

With `--json`, outputs a machine-readable object:

```json
{
  "currentPhase": 2,
  "phases": [
    { "phase": 0, "name": "Documentation Planning", "status": "complete" },
    { "phase": 1, "name": "Discovery", "status": "complete" },
    { "phase": 2, "name": "Requirements", "status": "in_progress" }
  ],
  "agent": "opencode"
}
```

**Error:** exits with a non-zero code if run outside a project directory (no `.archon/state.json` found).

## Examples

```bash
# Human-readable output
archon status

# Machine-readable for scripting
archon status --json | jq '.currentPhase'
```

## See Also

- [`archon check`](check.md) — validate the current phase before advancing
- [`archon next`](next.md) — advance to the next phase
- [`archon guide`](guide.md) — get contextual help for the current phase
