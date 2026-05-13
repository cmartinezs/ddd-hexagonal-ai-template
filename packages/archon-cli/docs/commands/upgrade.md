# archon upgrade

> Upgrade the project's template to a newer version.

## Usage

```bash
archon upgrade
archon upgrade --target <version>
archon upgrade --dry-run
archon upgrade --rollback <version>
```

## Options

| Option | Description |
|--------|-------------|
| `--target <version>` | Specific version to upgrade to (e.g. `0.2.0`). Defaults to the latest available. |
| `--dry-run` | Preview which files would be changed without applying them. |
| `--rollback <version>` | Roll back to a previously installed version. |

## Behaviour

Compares the project's pinned template version (`.archon/template.lock.json`) against the available versions in the global cache (`~/.archon/templates/`). Applies safe changes automatically and warns on breaking changes.

### Upgrade categories

| Category | Behaviour |
|----------|-----------|
| Safe (additive) | Applied automatically: new template files, new guide sections, new phase definitions. |
| Breaking | Shown as a diff + requires explicit confirmation. |
| Conflicts | Files modified by both the new template and the project are flagged for manual merge. |

### Dry run

With `--dry-run`, no files are written. The output shows:
- Files that would be added
- Files that would be modified (with diff summary)
- Conflicts detected

### Rollback

Reverts template files and `.archon/template.lock.json` to the specified version. Project state (`.archon/state.json`) is not affected.

```bash
archon upgrade --rollback 0.1.0
```

## Examples

```bash
# Preview what an upgrade would change
archon upgrade --dry-run

# Upgrade to the latest version
archon upgrade

# Upgrade to a specific version
archon upgrade --target 0.2.0

# Roll back to a previous version
archon upgrade --rollback 0.1.0
```

## See Also

- [`archon templates`](templates.md) — manage the global template cache
- [`archon doctor`](doctor.md) — check for version mismatches and integrity issues
