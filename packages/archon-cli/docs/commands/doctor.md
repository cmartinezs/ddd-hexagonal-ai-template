# archon doctor

> Health check and integrity validation for the project and Archon installation.

## Usage

```bash
archon doctor
archon doctor --fix
```

## Options

| Option | Description |
|--------|-------------|
| `--fix` | Attempt to auto-repair issues found during the health check. |

## Behaviour

Runs a series of diagnostic checks and reports pass/warn/fail per item:

| Check | Description |
|-------|-------------|
| State file | `.archon/state.json` exists and parses as valid JSON |
| Checksum | `state.checksum` matches the SHA-256 of `state.json` |
| Config | `.archon/config.json` exists and has required fields |
| Template lock | `.archon/template.lock.json` exists |
| Guides | `.archon/guides/` exists and contains the key guide files |
| Agent | Configured agent is detectable (delegates to `archon agent --doctor`) |
| Docs structure | `docs/` folder exists with expected phase directories |

With `--fix`, attempts to repair common issues:
- Recreates missing directories
- Rebuilds the checksum file if state.json is intact
- Reconfigures missing config keys with defaults

If issues cannot be auto-fixed, doctor explains what to do manually.

## Examples

```bash
# Run full health check
archon doctor

# Run and attempt to fix issues automatically
archon doctor --fix
```

## See Also

- [`archon agent`](agent.md) — diagnose just the AI agent
- [`archon status`](status.md) — check phase state (lighter than doctor)
- [`archon upgrade`](upgrade.md) — if doctor reports a template version mismatch
