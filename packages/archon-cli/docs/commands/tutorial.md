# archon tutorial

> Guided step-by-step tutorial mode for learning the Archon + DDD workflow.

## Usage

```bash
archon tutorial
archon tutorial --mode <project|template>
archon tutorial --step <N>
```

## Options

| Option | Description |
|--------|-------------|
| `--mode <project\|template>` | Tutorial mode: `project` (default) walks through a real project; `template` explains the template structure itself. |
| `--step <N>` | Jump to a specific step. Useful for resuming a tutorial. |

## Behaviour

Runs an interactive, multi-step tutorial in the terminal. Each step:

1. Explains the concept or action
2. Shows the command to run
3. Waits for confirmation before advancing
4. Optionally executes the command directly

**`project` mode:** walks through creating and documenting a project from `archon init` to phase completion, using a sample project as context.

**`template` mode:** explains the DDD Hexagonal AI Template structure — folder layout, 12 phases, agnostic/specific boundary, traceability, and how to customise the template itself.

Progress is not persisted between sessions. Use `--step N` to resume where you left off.

## Examples

```bash
# Start the project tutorial from the beginning
archon tutorial

# Start in template mode
archon tutorial --mode template

# Resume from step 5
archon tutorial --step 5
```

## See Also

- [`archon guide`](guide.md) — phase-specific help (shorter, context-sensitive)
- [`archon doctor`](doctor.md) — check your setup before starting the tutorial
- [`archon init`](init.md) — first command covered in the project tutorial
