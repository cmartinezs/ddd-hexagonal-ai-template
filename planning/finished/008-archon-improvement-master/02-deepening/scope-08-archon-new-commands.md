# 🔍 DEEPENING: Scope 08 — Archon New Commands (016)

> **Status:** COMPLETED
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 016, execute all its scopes, and archive it as completed. This scope extends Archon with six high-value commands that automate quality assessment, traceability, and upgrade analysis.

**Child planning:** [`016-archon-new-commands`](../../../finished/016-archon-new-commands/README.md)

**Dependency:** Scope 07 (015) is DONE.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Confirm scope 07 (015) is DONE | ADVANCE-PLANNING | ✅ DONE | 015 archived to `finished/` |
| 2 | Promote 016 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | ✅ DONE | `active/016-archon-new-commands/01-expansion.md` created |
| 3 | Execute scope: `archon generate phase <N>` | GENERATE-DOCUMENT | ✅ DONE | Command + use case + docs/commands/generate.md |
| 4 | Execute scope: `archon review --phase <N>` | GENERATE-DOCUMENT | ✅ DONE | Command + use case + docs/commands/review.md |
| 5 | Execute scope: `archon trace` | GENERATE-DOCUMENT | ✅ DONE | Command + use case + docs/commands/trace.md |
| 6 | Execute scope: `archon diff --template <from>..<to>` | GENERATE-DOCUMENT | ✅ DONE | Command + use case + docs/commands/diff.md |
| 7 | Execute scope: `archon quality` | GENERATE-DOCUMENT | ✅ DONE | Command + use case + docs/commands/quality.md |
| 8 | Execute scope: `archon doctor --ci` (non-interactive, JSON output) | GENERATE-DOCUMENT | ✅ DONE | `src/commands/doctor.ts` updated + docs/commands/doctor.md updated |
| 9 | Update `packages/archon-cli/README.md` — document all new commands | EXPAND-ELEMENT | ✅ DONE | README updated |
| 10 | Archive 016 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | ✅ DONE | `finished/016-archon-new-commands/` |
| 11 | Update `planning/README.md` and `active/README.md` — remove 016 from active | ADVANCE-PLANNING | ✅ DONE | Indexes updated |

---

## Done Criteria

- [x] Scope 07 (015) is DONE (prerequisite gate)
- [x] `archon generate phase <N>` creates base files in `docs/<phase-folder>/` without overwriting existing
- [x] `archon review --phase <N>` outputs a scored report per file with completeness, ambiguity, and traceability issues
- [x] `archon trace` outputs a cross-phase traceability matrix (markdown + `--json` option)
- [x] `archon diff --template <from>..<to>` shows added/removed/changed sections between template versions (cache-only)
- [x] `archon quality` outputs project health score + breakdown by phase + prioritized issue list
- [x] `archon doctor --ci` exits 0 (healthy) or 1 (issues), supports `--json`
- [x] Each new command has a corresponding `docs/commands/<name>.md` reference file
- [x] `packages/archon-cli/README.md` lists all new commands
- [x] `npm run typecheck` and `npm run build` exit 0
- [x] Planning 016 archived to `finished/`
- [x] TRACEABILITY.md updated with any new terms from this scope

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
