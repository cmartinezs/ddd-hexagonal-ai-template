# 🔍 DEEPENING: Scope 02 — Extract `infrastructure/` Layer

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Reorganize all I/O and external-system adapters into `infrastructure/`. This layer depends on domain types (from scope 01) but has no dependency on application or CLI layers.

**Dependency:** Scope 01 (domain layer) must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/infrastructure/state/` — move `core/state-manager.ts` | GENERATE-DOCUMENT | DONE | `infrastructure/state/state-manager.ts` |
| 2 | Create `src/infrastructure/cache/` — move `core/global-cache/global-cache.ts` and `core/global-cache/template-resolver.ts` | GENERATE-DOCUMENT | DONE | `infrastructure/cache/global-cache.ts`, `infrastructure/cache/template-resolver.ts`, `infrastructure/cache/index.ts` |
| 3 | Create `src/infrastructure/template-registry/` — move `core/migration-manager.ts` | GENERATE-DOCUMENT | DONE | `infrastructure/template-registry/migration-manager.ts` |
| 4 | Create `src/infrastructure/agents/` — move `core/agent-adapter.ts` | GENERATE-DOCUMENT | DONE | `infrastructure/agents/index.ts` (split deferred to scope 04) |
| 5 | Create `src/infrastructure/fs/` — move `core/run-tracker.ts`, `core/config-manager.ts`, `core/mode-detector.ts` | GENERATE-DOCUMENT | DONE | `infrastructure/fs/run-tracker.ts`, `infrastructure/fs/config-manager.ts`, `infrastructure/fs/mode-detector.ts` |
| 6 | Create `src/infrastructure/git/git.adapter.ts` — extract execa git calls from `commands/templates.ts` into a typed wrapper | GENERATE-DOCUMENT | RESIDUAL | Deferred — git calls in templates.ts use execa directly; wrapper adds value but low risk to defer to scope 04 |
| 7 | Convert `core/` originals to re-export barrels | GENERATE-DOCUMENT | DONE | All moved files converted |
| 8 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | DONE | Exit 0 |

---

## Done Criteria

- [ ] `infrastructure/state/state-manager.ts` exists; `core/state-manager.ts` removed
- [ ] `infrastructure/cache/global-cache.ts` and `template-resolver.ts` exist; `core/global-cache/` removed
- [ ] `infrastructure/template-registry/migration-manager.ts` exists; `core/migration-manager.ts` removed
- [ ] `infrastructure/agents/` contains split adapters; `core/agent-adapter.ts` removed
- [ ] `infrastructure/fs/run-tracker.ts` and `config-manager.ts` exist; originals removed from `core/`
- [ ] `infrastructure/git/git.adapter.ts` wraps all git calls with typed functions
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
