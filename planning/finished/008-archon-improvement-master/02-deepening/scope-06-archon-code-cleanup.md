# 🔍 DEEPENING: Scope 06 — Archon Code Cleanup (014)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 014, execute all its scopes, and archive it as completed. This scope removes dead code and duplicated logic left behind after scopes 01 (009) and 04 (012) are applied.

**Child planning:** [`014-archon-code-cleanup`](../../../014-archon-code-cleanup/00-initial.md)

**Dependency:** Scopes 01 (009) and 04 (012) must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Confirm scopes 01 and 04 are DONE | ADVANCE-PLANNING | DONE | 009 + 012 both in `finished/` |
| 2 | Promote 014 to `active/` and move directly to execution | ADVANCE-PLANNING | DONE | Executed inline |
| 3 | Execute scope: remove `promptForMissing()` from `state-manager.ts` | GENERATE-DOCUMENT | DONE | Function removed; `createInterface` import removed |
| 4 | Execute scope: remove local `PHASES` array from `next.ts` | GENERATE-DOCUMENT | DONE | `phaseEngine.getPhase()` used; local constant deleted |
| 5 | Execute scope: scan for `ArchonState.checksum` references | GENERATE-DOCUMENT | DONE | No lingering object-field references found (external checksum file references are correct) |
| 6 | Execute scope: dead template-fallback branches | GENERATE-DOCUMENT | DONE | Already removed in scope-04 (`findLocalTemplate` deleted from `init.ts`) |
| 7 | Archive 014 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/014-archon-code-cleanup/` |
| 8 | Update indexes | ADVANCE-PLANNING | DONE | `planning/README.md` updated |

---

## Done Criteria

- [ ] Scopes 01 (009) and 04 (012) are DONE (prerequisite gate)
- [ ] `promptForMissing()` removed from `state-manager.ts`; no callers remain
- [ ] Local `PHASES` constant removed from `next.ts`; all phase lookups use `phaseEngine`
- [ ] No `state.checksum` used as an `ArchonState` object field anywhere in source
- [ ] No unreachable local-template-path guard branches remain in `init.ts`
- [ ] `npm run typecheck` exits 0
- [ ] Planning 014 archived to `finished/`
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
