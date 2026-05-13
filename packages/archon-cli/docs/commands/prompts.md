# archon prompts

> Manage the accumulated prompt library in `.archon/prompts/`.

## Usage

```bash
archon prompts ls
archon prompts rank [<criteria>]
archon prompts compress <id>
archon prompts merge <id1> <id2>
archon prompts expand <id>
archon prompts export <id> [<output-path>]
archon prompts clean [<id>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `ls` | List all stored prompts with ID, phase, and timestamp. |
| `rank [criteria]` | Rank prompts by a criterion: `date` (default), `phase`, or `size`. |
| `compress <id>` | Compress a prompt: reduce token count while preserving intent. |
| `merge <id1> <id2>` | Merge two prompts into one. |
| `expand <id>` | Expand a compressed prompt back to full form. |
| `export <id> [path]` | Export a prompt to a file (default: current directory). |
| `clean [id]` | Delete a specific prompt by ID, or all prompts if no ID given. |

## Behaviour

Every `archon prompt` or `archon run` invocation writes a prompt file to `.archon/prompts/`. Over a project lifecycle this library accumulates prompts from multiple phases and runs.

`archon prompts` provides tooling to navigate and maintain this library without losing history.

### Prompt IDs

Each prompt is identified by a short ID derived from its filename (e.g. `phase-01-20260513-142300`). Use `archon prompts ls` to see all IDs.

## Examples

```bash
# List all prompts
archon prompts ls

# Rank by phase number
archon prompts rank phase

# Compress a long prompt to save tokens on the next run
archon prompts compress phase-01-20260513-142300

# Merge two prompts from the same phase
archon prompts merge phase-01-20260513-142300 phase-01-20260514-090000

# Export a prompt for reuse in another project
archon prompts export phase-03-20260513-160000 ./shared-prompts/

# Delete all prompts for a fresh start
archon prompts clean
```

## See Also

- [`archon prompt`](prompt.md) — generate a new prompt
- [`archon run`](run.md) — execute the agent with a generated prompt
