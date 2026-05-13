# archon next

> Advance the project to the next phase (or jump to a specific phase).

## Usage

```bash
archon next
archon next --phase <N>
archon next --force
archon next --phase <N> --force
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N>` | Target phase number (0–11). Defaults to `currentPhase + 1`. |
| `--force` | Skip confirmation prompts. Designed for CI and automated workflows. |

## Behaviour

Marks the current phase as `complete` in `.archon/state.json` and sets the target phase as `in_progress`.

### Jump Detection

When `--phase N` targets a phase more than one step ahead of the current phase, Archon:

1. Prints a warning showing which phases will be skipped (e.g. "skipping phases 2 to 4")
2. Asks for interactive confirmation before proceeding
3. Marks all intermediate phases as `skipped` in `.archon/state.json`

To bypass confirmation in automated contexts:

```bash
archon next --phase 5 --force
```

### Reactivating a Skipped Phase

A skipped phase can be reactivated at any time by targeting it explicitly:

```bash
archon next --phase 2   # reactivates a previously skipped phase 2
```

Archon will warn again and ask for confirmation (bypassable with `--force`).

## Examples

```bash
# Advance to the next sequential phase
archon next

# Jump directly to phase 5 (with interactive confirmation)
archon next --phase 5

# Jump to phase 5 in CI — no prompt
archon next --phase 5 --force

# Reactivate a skipped phase
archon next --phase 2
```

## State Changes

Updates `.archon/state.json`:

| Field | Change |
|-------|--------|
| `currentPhase` | Set to target phase N |
| `phases[prev].status` | Set to `complete` |
| `phases[skipped].status` | Set to `skipped` (if jump) |
| `phases[N].status` | Set to `in_progress` |

## See Also

- [`archon status`](status.md) — check current phase before advancing
- [`archon check`](check.md) — validate constraints before advancing
- [`archon prompt`](prompt.md) — generate the AI prompt for the new phase
