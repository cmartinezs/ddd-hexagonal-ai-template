# archon guide

> Interactive contextual help for the current or a specified phase.

## Usage

```bash
archon guide
archon guide --phase <N>
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N>` | Phase to show guidance for (0–11). Defaults to `currentPhase`. |

## Behaviour

Reads the guide file for the specified phase from `.archon/guides/` (copied during `archon init`) and presents it interactively in the terminal. The guide explains:

- What the phase aims to produce
- Key questions to answer in this phase
- Typical AI prompting strategies
- Common pitfalls and how to avoid them

If `.archon/guides/` is empty or the phase guide is not found, falls back to the built-in phase description from the phase engine.

## Examples

```bash
# Guide for the current phase
archon guide

# Guide for phase 3 (Design / DDD Strategic)
archon guide --phase 3
```

## See Also

- [`archon tutorial`](tutorial.md) — step-by-step guided tutorial across all phases
- [`archon status`](status.md) — see which phase you are currently on
- [`archon prompt`](prompt.md) — generate the AI prompt after reviewing the guide
- [`archon doctor`](doctor.md) — health check if something seems wrong
