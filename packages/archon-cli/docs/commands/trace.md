# archon trace

> Show a traceability matrix illustrating how domain terms defined in one phase are referenced across other phases.

## Usage

```bash
archon trace
archon trace --json
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output the full traceability matrix as JSON. |

## Behaviour

Extracts terms from H2 headers and bold text (`**term**`) in each phase's documentation. Then checks whether each term is referenced in the docs of every other phase.

Output is a matrix table:

```
  Traceability Matrix

  Coverage: 62% (13/21 terms traced across phases)

  Phase               1    2    3    4    5    Coverage
  ─────────────────────────────────────────────────────
  P1 Discovery        —    ●    ●    ○    ●    75%
  P2 Requirements     ○    —    ●    ●    ○    50%
```

Legend:
- `●` — term referenced in that phase
- `○` — not referenced
- `—` — same phase (diagonal)

With `--json` the full `TraceMatrix` object is returned, including `terms`, `links`, `coverage`, `totalTerms`, and `tracedTerms`.

## Examples

```bash
# Show traceability matrix
archon trace

# Machine-readable output for CI integration
archon trace --json
```

## See Also

- [`archon review`](review.md) — quality review per phase
- [`archon quality`](quality.md) — overall quality score
- [`archon check`](check.md) — validate phase constraints
