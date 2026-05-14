# 🔍 DEEPENING: Scope 01 — Extract `domain/` Layer

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Create the `domain/` directory and move pure business logic types and the phase engine into it. No I/O, no dependencies on infrastructure. This establishes the innermost hexagonal ring.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/domain/phase/` — move `core/phase-engine.ts`; extract phase types from `core/types.ts` into `domain/phase/phase.types.ts` | GENERATE-DOCUMENT | DONE | `domain/phase/phase-engine.ts`, `domain/phase/phase.types.ts` |
| 2 | Create `src/domain/template/` — extract `TemplateLock`, `TemplateRef`, `RegistryEntry` from `core/types.ts` into `domain/template/template.types.ts` | GENERATE-DOCUMENT | DONE | `domain/template/template.types.ts` |
| 3 | Create `src/domain/project-state/` — extract `ArchonState`, `ArchonConfig`, project-state types into `domain/project-state/project-state.types.ts` | GENERATE-DOCUMENT | DONE | `domain/project-state/project-state.types.ts` |
| 4 | Create `src/domain/validation/` — extract `ValidationResult`, `CheckResult`, `PhaseStatus` into `domain/validation/validation.types.ts` | GENERATE-DOCUMENT | DONE | `domain/validation/validation.types.ts` |
| 5 | Update all importers of the moved files to use new paths | GENERATE-DOCUMENT | DONE | `core/types.ts`, `core/phase-engine.ts`, `core/validator.ts` converted to re-export barrels |
| 6 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | DONE | Exit 0 |

---

## Done Criteria

- [ ] `src/domain/phase/phase-engine.ts` exists; `core/phase-engine.ts` removed
- [ ] `src/domain/phase/phase.types.ts` contains all Phase-related types
- [ ] `src/domain/template/template.types.ts` contains TemplateLock, TemplateRef, RegistryEntry
- [ ] `src/domain/project-state/project-state.types.ts` contains ArchonState, ArchonConfig
- [ ] `src/domain/validation/validation.types.ts` contains ValidationResult, CheckResult, PhaseStatus
- [ ] `core/types.ts` either removed or contains only re-exports (no duplicate type definitions)
- [ ] `npm run typecheck` exits 0 after all imports updated

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
