# archon context

> Scan the project or inject AI guides into the context file.

## Usage

```bash
archon context scan
archon context inject
archon context inject --output <path>
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `scan` | Scan the project state and write a structured context file. |
| `inject` | Concatenate AI guides from `.archon/guides/` into a context file for agent consumption. |

## archon context scan

Reads the current project state, phase history, tech stack, and glossary. Writes:

- `.archon/context/context.md` — human- and agent-readable context summary
- `.archon/context/context-map.json` — machine-readable structure map

Output includes: completed phases, in-progress phases, detected tech stack, glossary term count, and any warnings.

```bash
archon context scan
```

## archon context inject

Reads the AI guides copied to `.archon/guides/` during `archon init` and builds a single context file. Guides are concatenated in this order (truncated to 3 000 characters each):

1. `INSTRUCTIONS-FOR-AI.md`
2. `AI-WORKFLOW-GUIDE.md`
3. `SKILLS-AND-PLUGINS-GUIDE.md`
4. `TEMPLATE-ARCHITECTURE.md`

If `.archon/AGENTS.md` exists, it is prepended as project-specific context. Any remaining guides in `.archon/guides/` are listed as references (not inlined).

### Options

| Option | Description |
|--------|-------------|
| `--output <path>` | Write to a custom path instead of `.archon/context/context.md`. |

### Auto-injection

The generated context file is automatically included in the next invocation of:
- [`archon run`](run.md)
- [`archon prompt`](prompt.md) with `--context full`

```bash
archon context inject

# Custom output path
archon context inject --output ./my-context.md
```

## Examples

```bash
# Scan project state
archon context scan

# Inject guides (standard workflow before first run)
archon context inject

# Inject to a custom path for manual review
archon context inject --output ./review-context.md
```

## Typical Workflow

```bash
archon context inject    # load template guides
archon context scan      # add project-specific state
archon prompt --phase 1  # generate prompt with full context
```

## See Also

- [`archon prompt`](prompt.md) — generate an AI prompt using the context
- [`archon run`](run.md) — execute the agent (context injected automatically)
- [`archon init`](init.md) — populates `.archon/guides/` on project creation
