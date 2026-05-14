# 🔍 DEEPENING: Scope 05 — Organize `ui/` Layer

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Consolidate all console rendering and interactive prompt code under `ui/renderers/` and `ui/prompts/`. Any interactive prompt code that was extracted from commands in scope 03 lands here.

**Dependency:** Scope 03 (application layer) should be DONE so extracted prompt logic has a destination.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/ui/renderers/` — move `ui/render-status.ts` and `ui/render-warnings.ts` into `renderers/` | GENERATE-DOCUMENT | DONE | `ui/renderers/render-status.ts`, `ui/renderers/render-warnings.ts` |
| 2 | Create `src/ui/prompts/` — extract interactive prompt wrappers from commands (confirm dialogs, selection prompts) into typed wrapper functions | GENERATE-DOCUMENT | DONE | `ui/prompts/confirm.prompt.ts`, `ui/prompts/select.prompt.ts` |
| 3 | Update all importers of moved renderers to new paths | GENERATE-DOCUMENT | DONE | Originals converted to re-export barrels |
| 4 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | DONE | Clean typecheck |

---

## Done Criteria

- [ ] `ui/renderers/` contains all rendering functions (no flat `ui/*.ts` files remaining)
- [ ] `ui/prompts/` contains prompt wrappers (no prompt code in command files)
- [ ] All imports updated to new paths
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
| — | *None yet* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
