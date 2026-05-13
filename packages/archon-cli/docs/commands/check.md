# archon check

> Validate that the current phase's constraints are met before advancing.

## Usage

```bash
archon check
archon check --phase <N>
archon check --json
archon check --force
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N>` | Phase to validate. Defaults to `currentPhase`. |
| `--json` | Output validation results as JSON. |
| `--force` | Skip confirmation prompts (for CI/automated workflows). |
| `--fix` | Auto-fix violations where possible. *(Not yet implemented.)* |

## Behaviour

Runs the phase validator against `.archon/state.json` and the phase definition. Reports any unmet constraints — missing documents, unfilled placeholders, required sections not present.

Output includes:
- A list of passing constraints (green)
- A list of failing constraints (red), each with a description of what is missing

With `--json`:

```json
{
  "phase": 2,
  "passed": true,
  "results": [
    { "rule": "glossary-present", "passed": true },
    { "rule": "user-stories-count", "passed": false, "message": "At least 3 user stories required" }
  ]
}
```

**Note:** `check` does not advance the phase. It is a read-only validation. Use [`archon next`](next.md) to advance after constraints are satisfied.

## Examples

```bash
# Validate current phase
archon check

# Validate a specific phase
archon check --phase 3

# Machine-readable output
archon check --json

# Validate without prompts (CI)
archon check --force
```

## See Also

- [`archon next`](next.md) — advance the phase after check passes
- [`archon status`](status.md) — see current phase and progress
- [`archon doctor`](doctor.md) — deeper integrity check across the whole project
