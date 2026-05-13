# archon templates

> Manage the global template cache at `~/.archon/templates/`.

## Usage

```bash
archon templates ls
archon templates pull <template-name>
archon templates update <template-name>
archon templates remove <template-name>[@<version>]
archon templates doctor
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `ls` | List all cached templates and their versions. |
| `pull <name>` | Download and cache a template from the registry. |
| `update <name>` | Update a cached template to the latest version. |
| `remove <name>[@version]` | Remove a template (or a specific version) from the cache. |
| `doctor` | Check the integrity of the global cache. |

## Behaviour

Archon stores templates in `~/.archon/templates/<name>/<version>/`. When a project runs `archon init`, it resolves the template from this cache rather than requiring access to the source repository.

### Dev mode override

In `dev` mode (when running from inside the template repository), `archon templates` is replaced by [`archon dev`](dev.md) which links the local repo directly.

## Examples

```bash
# See what's in the cache
archon templates ls

# Pull the DDD Hexagonal template
archon templates pull ddd-hexagonal-ai-template

# Update to the latest version
archon templates update ddd-hexagonal-ai-template

# Remove a specific old version
archon templates remove ddd-hexagonal-ai-template@0.1.0

# Check cache integrity
archon templates doctor
```

## See Also

- [`archon upgrade`](upgrade.md) — apply a template update to a specific project
- [`archon dev`](dev.md) — link a local template repo for development
- [`archon doctor`](doctor.md) — full project health check
