# archon diff

> Compare two template versions and show which files were added, removed, or modified.

## Usage

```bash
archon diff --from <version> --to <version>
archon diff <from>..<to>
archon diff --from <version> --to <version> --json
```

## Options

| Option | Description |
|--------|-------------|
| `--from <version>` | Source template version (e.g. `1.0.0`). |
| `--to <version>` | Target template version (e.g. `1.2.0`). |
| `--json` | Output diff results as JSON. |

## Behaviour

Reads both template versions from the global template cache (`~/.archon/templates/<version>/`) and compares their `.md` files recursively.

Status symbols:

- `+` — file added in `<to>`
- `-` — file removed in `<to>` (listed as a breaking change)
- `~` — file modified

Output summary:

```
  Template Diff: 1.0.0 → 1.2.0

  +2 added  ~4 modified  =18 unchanged

  + 06-development/coding-standards.md (+45/-0)
  ~ 01-discovery/context.md (+12/-3)

  Breaking changes:
    ✗ Removed: 07-testing/acceptance-criteria.md
```

With `--json` the full `DiffResult` object is returned.

## Examples

```bash
# Diff using flags
archon diff --from 1.0.0 --to 1.2.0

# Diff using range syntax
archon diff 1.0.0..1.2.0

# Machine-readable output
archon diff --from 1.0.0 --to 1.2.0 --json
```

## See Also

- [`archon upgrade`](upgrade.md) — apply a template upgrade
- [`archon templates`](templates.md) — manage the global template cache
