# archon generate

> Scaffold documentation files for a phase from the locked template version.

## Usage

```bash
archon generate phase <N>
archon generate phase <N> --force
archon generate phase <N> --json
```

## Options

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing files instead of skipping them. |
| `--json` | Output scaffold results as JSON. |

## Behaviour

Copies template `.md` files from the locked template version into `docs/<phaseFolder>/`. Files that already exist are skipped unless `--force` is passed.

Output shows one line per file:

- `+` created (green)
- `~` overwritten (yellow)
- `=` skipped (dim)

With `--json`:

```json
{
  "phase": 2,
  "phaseName": "Requirements",
  "files": [
    { "file": "user-stories.md", "action": "created" },
    { "file": "nfr.md", "action": "skipped" }
  ]
}
```

## Examples

```bash
# Scaffold phase 3 documentation
archon generate phase 3

# Overwrite all existing files
archon generate phase 3 --force

# Machine-readable output
archon generate phase 3 --json
```

## See Also

- [`archon review`](review.md) — review quality of generated files
- [`archon check`](check.md) — validate phase constraints
- [`archon status`](status.md) — show current phase and progress
