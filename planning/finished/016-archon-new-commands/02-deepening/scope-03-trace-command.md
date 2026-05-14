# 🔍 DEEPENING: Scope 03 — `archon trace`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Add `archon trace` that scans `docs/` for declared terms, IDs, and references, then builds a cross-phase traceability matrix. Output: markdown table or `--json`.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/domain/traceability/traceability.types.ts` — `TraceTerm`, `TraceMatrix`, `TraceLink` | GENERATE-DOCUMENT | PENDING | `domain/traceability/traceability.types.ts` |
| 2 | Create `src/application/trace-project.usecase.ts` — scan docs for IDs/terms/references, build matrix | GENERATE-DOCUMENT | PENDING | `application/trace-project.usecase.ts` |
| 3 | Create `src/cli/commands/trace.command.ts` — call use case, render markdown table or JSON | GENERATE-DOCUMENT | PENDING | `cli/commands/trace.command.ts` |
| 4 | Register `trace` in `cli/router.ts` and `cli/program.ts` | GENERATE-DOCUMENT | PENDING | Router + program updated |
| 5 | Create `docs/commands/trace.md` — reference documentation | GENERATE-DOCUMENT | PENDING | `docs/commands/trace.md` |
| 6 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon trace` outputs a markdown traceability matrix
- [ ] `archon trace --json` outputs JSON
- [ ] Matrix maps: Discovery → Requirements → Design → Development → Tests → Monitoring
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
