# archon quality

> Display an overall quality score across all documentation phases.

## Usage

```bash
archon quality
archon quality --phase 1,2,3
archon quality --json
```

## Options

| Option | Description |
|--------|-------------|
| `--phase <N[,N]>` | Comma-separated list of phases to include. Defaults to all phases. |
| `--json` | Output quality data as JSON. |

## Behaviour

Runs the review use case for every phase that has documentation files, then aggregates the results into a single quality report with a letter grade.

Grading scale:

| Score | Grade |
|-------|-------|
| 90–100 | A |
| 80–89  | B |
| 70–79  | C |
| 60–69  | D |
| < 60   | F |

Output:

```
  Quality Report

  Overall Score: 83/100  Grade: B
  24 files — 1 error(s), 7 warning(s)

  Phase                Score   Errors/Warnings   Files
  ─────────────────────────────────────────────────────
  P1 Discovery         95%     0e / 1w           3
  P2 Requirements      78%     1e / 4w           5
  P3 Design            80%     0e / 2w           6
```

With `--json` the full `QualityScoreOutput` object is returned, including `phases`, `overallScore`, `grade`, `totalErrors`, `totalWarnings`, `totalFiles`.

## Examples

```bash
# Full project quality
archon quality

# Specific phases only
archon quality --phase 1,2,3

# Machine-readable output
archon quality --json
```

## See Also

- [`archon review`](review.md) — per-phase detailed review
- [`archon trace`](trace.md) — traceability matrix
- [`archon doctor`](doctor.md) — project health check
