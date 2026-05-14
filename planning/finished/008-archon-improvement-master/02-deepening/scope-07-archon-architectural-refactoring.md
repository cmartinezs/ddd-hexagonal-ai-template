# 🔍 DEEPENING: Scope 07 — Archon Architectural Refactoring (015)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 015, execute all its scopes, and archive it as completed. This scope restructures `packages/archon-cli/src/` to a DDD/hexagonal layout where commands contain zero business logic.

**Child planning:** [`015-archon-architectural-refactoring`](../../015-archon-architectural-refactoring/00-initial.md)

**Dependency:** All of scopes 01–06 (plans 009–014) must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Confirm scopes 01–06 are all DONE | ADVANCE-PLANNING | DONE | 009–014 all in `finished/` |
| 2 | Promote 015 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/015-archon-architectural-refactoring/01-expansion.md` created |
| 3 | Execute scope 01: extract `domain/` layer | GENERATE-DOCUMENT | DONE | `src/domain/` structure created; `core/types.ts`, `core/phase-engine.ts`, `core/validator.ts` converted to re-export barrels |
| 4 | Execute scope 02: extract `infrastructure/` layer | GENERATE-DOCUMENT | DONE | `src/infrastructure/` created; `core/` originals converted to re-export barrels |
| 5 | Execute scope 03: create `application/` use cases | GENERATE-DOCUMENT | DONE | `src/application/` use cases created |
| 6 | Execute scope 04: refactor `cli/` layer — thin commands | GENERATE-DOCUMENT | DONE | `src/cli/` structure created |
| 7 | Execute scope 05: organize `ui/` layer | GENERATE-DOCUMENT | DONE | `src/ui/renderers/` and `src/ui/prompts/` created |
| 8 | Execute scope 06: verify build + archive 015 | ADVANCE-PLANNING | DONE | `finished/015-archon-architectural-refactoring/` |
| 9 | Update `planning/README.md` — remove 015 from active | ADVANCE-PLANNING | DONE | `planning/README.md` updated |

---

## Done Criteria

- [ ] Scopes 01–06 (009–014) are all DONE (prerequisite gate)
- [ ] Directory structure matches target: `cli/`, `domain/`, `application/`, `infrastructure/`, `ui/`
- [ ] No command file contains business logic — only `parse input → call use case → render output`
- [ ] Each use case in `application/` is independently testable without CLI context
- [ ] All import paths updated; no broken imports
- [ ] `npm run typecheck` exits 0
- [ ] `npm run build` exits 0
- [ ] Planning 015 archived to `finished/`
- [ ] TRACEABILITY.md updated with architectural layer terms

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
