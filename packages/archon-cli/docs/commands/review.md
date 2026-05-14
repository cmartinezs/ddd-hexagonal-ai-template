# archon review

> Review documentation quality for a phase, detecting placeholders, missing sections, and incomplete content.

## Usage

```bash
archon review
archon review --phase <N>
archon review --json
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N>` | Phase to review. Defaults to `currentPhase`. |
| `--json` | Output review results as JSON. |

## Behaviour

Scans all `.md` files in `docs/<phaseFolder>/` and checks for:

- Empty or near-empty files (< 100 chars) — **error**
- TBD / TODO / `[placeholder]` / Lorem ipsum / `[insert...]` / `[YOUR...]` — **warning**
- No H2 sections — **warning**
- No navigation links (`[←`) — **info**

Each file receives a score (0–100): `100 - errors×30 - warnings×10`.

Output:

```
  [100]  context.md
  [ 70]  user-stories.md
         ⚠ user-stories.md:12 — Contains "TBD" placeholder
         → No navigation links found
```

With `--json`:

```json
{
  "phase": 2,
  "phaseName": "Requirements",
  "overallScore": 85,
  "files": [...],
  "totalIssues": 3,
  "errors": 0,
  "warnings": 2
}
```

## Examples

```bash
# Review current phase
archon review

# Review a specific phase
archon review --phase 1

# Machine-readable output
archon review --json
```

## See Also

- [`archon quality`](quality.md) — overall quality score across all phases
- [`archon trace`](trace.md) — traceability matrix across phases
- [`archon generate`](generate.md) — scaffold phase documentation files
