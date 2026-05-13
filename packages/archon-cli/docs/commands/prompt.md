# archon prompt

> Generate an AI prompt for a phase, ready to paste into your AI agent.

## Usage

```bash
archon prompt
archon prompt --phase <N>
archon prompt --phase <N> --context <level>
archon prompt --phase <N> --context full --copy
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N>` | Phase to generate a prompt for (0–11). Defaults to `currentPhase`. Prompted interactively if omitted. |
| `--context <full\|summary\|none>` | Amount of project context to include. Defaults to `full` (or config default). |
| `--copy` | Copy the generated prompt to the clipboard (macOS: `pbcopy`; Linux: `xclip`/`xsel`/`wl-copy`). |

## Context Levels

| Level | What is included |
|-------|-----------------|
| `full` | Complete project context: phase goals, existing docs, glossary, tech stack, previous phase outputs. Includes content from `archon context inject` if available. |
| `summary` | Condensed context: phase goals and key decisions only. |
| `none` | Bare prompt: phase instructions only, no project context. |

## Behaviour

Generates a structured markdown prompt in `.archon/prompts/phase-<NN>-<timestamp>.md`. If a prompt file for that phase already exists, the previous file is cleared before generating the new one.

The prompt is printed to stdout. With `--copy`, it is also copied to the clipboard.

Previous prompts are accessible via [`archon prompts ls`](prompts.md).

## Examples

```bash
# Generate prompt for current phase, full context
archon prompt

# Generate for a specific phase
archon prompt --phase 3

# Generate with summary context and copy to clipboard
archon prompt --phase 1 --context summary --copy

# Generate with no context (bare instructions)
archon prompt --phase 0 --context none
```

## See Also

- [`archon context`](context.md) — enrich context before generating a prompt
- [`archon run`](run.md) — generate and immediately pass the prompt to the AI agent
- [`archon prompts`](prompts.md) — manage the accumulated prompt library
