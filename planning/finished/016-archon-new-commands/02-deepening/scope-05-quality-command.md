# 🔍 DEEPENING: Scope 05 — `archon quality`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Add `archon quality` that produces a project health score (0–100) aggregating: phase completion, document completeness (from review), traceability coverage (from trace), broken references, and missing ADRs.

**Dependency:** Scopes 02 (review) and 03 (trace) must be DONE — quality aggregates their domain types.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/application/quality-score.usecase.ts` — run review for each complete phase, run trace scan, aggregate into a `QualityReport` | GENERATE-DOCUMENT | PENDING | `application/quality-score.usecase.ts` |
| 2 | Create `src/cli/commands/quality.command.ts` — call use case, render summary + breakdown + issue list | GENERATE-DOCUMENT | PENDING | `cli/commands/quality.command.ts` |
| 3 | Register `quality` in `cli/router.ts` and `cli/program.ts` | GENERATE-DOCUMENT | PENDING | Router + program updated |
| 4 | Create `docs/commands/quality.md` — reference documentation | GENERATE-DOCUMENT | PENDING | `docs/commands/quality.md` |
| 5 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon quality` outputs overall score + per-phase breakdown
- [ ] Score decomposes into: completion %, completeness %, traceability %, reference integrity %
- [ ] `--json` flag outputs machine-readable JSON
- [ ] `npm run typecheck` exits 0

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet* | — | — | — |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
