# 🔍 DEEPENING: Scope 01 — Archon Critical Bugs (009)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 009, execute all its scopes, and archive it as completed. This scope covers three compilation and runtime bugs that affect core Archon infrastructure.

**Child planning:** [`009-archon-critical-bugs`](../../../009-archon-critical-bugs/00-initial.md)

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Promote 009 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/009-archon-critical-bugs/01-expansion.md` |
| 2 | Execute scope: fix `migration-manager.ts` parameter naming + RegExp | GENERATE-DOCUMENT | DONE | `src/migration-manager.ts` corrected |
| 3 | Execute scope: fix `Validator.checkDependencies()` path logic | GENERATE-DOCUMENT | DONE | `src/validator.ts` corrected |
| 4 | Execute scope: fix `StateManager` checksum circularity | GENERATE-DOCUMENT | DONE | `src/state-manager.ts`, `src/types.ts` corrected |
| 5 | Verify build passes: `npm run typecheck` | GENERATE-DOCUMENT | DONE | Exit 0 |
| 6 | Archive 009 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/009-archon-critical-bugs/` |
| 7 | Update `planning/README.md` — remove 009 from active | ADVANCE-PLANNING | DONE | `planning/README.md` updated |

---

## Done Criteria

- [ ] `migration-manager.ts` compiles under strict TypeScript (no parameter name mismatch)
- [ ] `Validator.checkDependencies()` checks `state.phases` or `docs/<folder>`, not `<project>/<folder>/.status`
- [ ] `ArchonState` has no `checksum` field; only `state.checksum` (external file) exists
- [ ] Checksum is computed from canonical normalized JSON (deterministic, no trailing newline)
- [ ] `npm run typecheck` exits 0
- [ ] Planning 009 archived to `finished/`
- [ ] TRACEABILITY.md updated with any new terms from this scope

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
