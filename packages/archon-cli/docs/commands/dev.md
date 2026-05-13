# archon dev

> Development commands for linking a local template repository.

## Usage

```bash
archon dev link-template
archon dev unlink-template
archon dev status
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `link-template` | Link the current directory as the active template source (overrides global cache). |
| `unlink-template` | Remove the local link and revert to the global cache. |
| `status` | Show whether a local template link is active and where it points. |

## Behaviour

When working on the template repository itself, `archon dev link-template` registers the current directory in `~/.archon/dev-link.json`. All subsequent `archon init` and `archon upgrade` calls in any project will resolve the template from this local directory instead of the global cache.

This allows template developers to test changes immediately without publishing a new version or clearing the cache.

**Mode detection:** `archon dev` is only intended for use from inside the template repository (mode: `template-dev` or `dev`). Running it from a project directory will warn.

## Examples

```bash
# From inside the template repo root:

# Link local template
archon dev link-template

# Verify the link is active
archon dev status

# Unlink when development is done
archon dev unlink-template
```

## See Also

- [`archon templates`](templates.md) — manage the global cache (production use)
- [`archon upgrade`](upgrade.md) — test upgrades using the linked local template
- [`archon doctor`](doctor.md) — check if the dev link is interfering with a project
