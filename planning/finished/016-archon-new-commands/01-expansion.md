# 🌿 EXPANSION: Archon New Commands (016)

> **Status:** EXPANSION
> [← 00-initial.md](./00-initial.md) | [← planning/README.md](../../README.md)

---

## Goal

Add six high-value commands to Archon CLI that automate quality assessment, traceability, diff analysis, and CI-friendly diagnostics. Each command follows the DDD/hexagonal pattern established by planning 015: a use case in `application/`, a thin command in `cli/commands/`, and a reference doc in `docs/commands/`.

---

## Scopes

| # | Scope | Depends On | Description |
|---|-------|------------|-------------|
| 01 | [archon generate phase \<N\>](02-deepening/scope-01-generate-command.md) | — | Scaffold phase docs from template into `docs/<phase>/` |
| 02 | [archon review --phase \<N\>](02-deepening/scope-02-review-command.md) | — | Quality analysis of phase documentation |
| 03 | [archon trace](02-deepening/scope-03-trace-command.md) | — | Cross-phase traceability matrix builder |
| 04 | [archon diff --template \<from\>..\<to\>](02-deepening/scope-04-diff-command.md) | — | Template version diff analysis |
| 05 | [archon quality](02-deepening/scope-05-quality-command.md) | S02, S03 | Project health score aggregating review + trace |
| 06 | [archon doctor --ci](02-deepening/scope-06-doctor-ci.md) | — | Non-interactive CI-friendly doctor |
| 07 | [Verify build + update docs + archive](02-deepening/scope-07-verify-and-archive.md) | S01–S06 | Final verification, README update, archive |

---

## File Targets

| Layer | Files |
|-------|-------|
| `domain/` | `domain/quality/quality.types.ts`, `domain/traceability/traceability.types.ts`, `domain/diff/diff.types.ts` |
| `application/` | `application/generate-phase.usecase.ts`, `application/review-phase.usecase.ts`, `application/trace-project.usecase.ts`, `application/diff-template.usecase.ts`, `application/quality-score.usecase.ts` |
| `cli/commands/` | `generate.command.ts`, `review.command.ts`, `trace.command.ts`, `diff.command.ts`, `quality.command.ts` (update `doctor.command.ts`) |
| `cli/router.ts` | Add new commands to router |
| `cli/program.ts` | Add new command entries |
| `docs/commands/` | `generate.md`, `review.md`, `trace.md`, `diff.md`, `quality.md` (update `doctor.md`) |

---

> [← 00-initial.md](./00-initial.md) | [← planning/README.md](../../README.md)
