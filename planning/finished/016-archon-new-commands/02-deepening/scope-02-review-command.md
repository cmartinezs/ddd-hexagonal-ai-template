# 🔍 DEEPENING: Scope 02 — `archon review --phase <N>`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Add `archon review --phase <N>` command that analyzes documentation quality for phase N. Checks completeness, ambiguity markers (TBD/TODO/placeholder text), and traceability references.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/domain/quality/quality.types.ts` — `ReviewIssue`, `ReviewResult`, `IssueSeverity` | GENERATE-DOCUMENT | PENDING | `domain/quality/quality.types.ts` |
| 2 | Create `src/application/review-phase.usecase.ts` — scan phase docs, detect ambiguity markers, check required sections, return scored report | GENERATE-DOCUMENT | PENDING | `application/review-phase.usecase.ts` |
| 3 | Create `src/cli/commands/review.command.ts` — parse args, call use case, render scored report | GENERATE-DOCUMENT | PENDING | `cli/commands/review.command.ts` |
| 4 | Register `review` in `cli/router.ts` and `cli/program.ts` | GENERATE-DOCUMENT | PENDING | Router + program updated |
| 5 | Create `docs/commands/review.md` — reference documentation | GENERATE-DOCUMENT | PENDING | `docs/commands/review.md` |
| 6 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon review --phase 1` outputs a scored report for phase 1
- [ ] Report includes: completeness score, ambiguity issues, missing required sections
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
