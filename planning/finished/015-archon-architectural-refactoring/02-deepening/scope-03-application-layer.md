# 🔍 DEEPENING: Scope 03 — Create `application/` Use Cases

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Extract the business logic that currently lives inside command files into self-contained use cases in `application/`. Each use case receives typed input, orchestrates domain objects and infrastructure adapters, and returns typed output — no CLI parsing, no console I/O.

**Dependency:** Scopes 01 (domain) and 02 (infrastructure) must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/application/init-project.usecase.ts` — extract project initialization logic from `commands/init.ts` | GENERATE-DOCUMENT | DONE | `application/init-project.usecase.ts` |
| 2 | Create `src/application/generate-prompt.usecase.ts` — extract prompt assembly from `commands/run.ts`, `core/ai-prompt-builder.ts`, `core/context-scanner.ts` | GENERATE-DOCUMENT | DONE | `application/generate-prompt.usecase.ts` |
| 3 | Create `src/application/run-agent.usecase.ts` — extract agent dispatch, dry-run, token tracking from `commands/run.ts` | GENERATE-DOCUMENT | DONE | `application/run-agent.usecase.ts` |
| 4 | Create `src/application/check-phase.usecase.ts` — extract validation logic from `commands/check.ts` and `core/validator.ts` | GENERATE-DOCUMENT | DONE | `application/check-phase.usecase.ts` |
| 5 | Create `src/application/next-phase.usecase.ts` — extract phase advancement logic from `commands/next.ts` | GENERATE-DOCUMENT | DONE | `application/next-phase.usecase.ts` |
| 6 | Create `src/application/upgrade-project.usecase.ts` — extract upgrade logic from `commands/upgrade.ts` | GENERATE-DOCUMENT | DONE | `application/upgrade-project.usecase.ts` |
| 7 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | DONE | Clean typecheck |

---

## Done Criteria

- [ ] Six use case files exist in `src/application/`
- [ ] Each use case class has typed input DTO and typed output DTO
- [ ] No use case imports from `commander`, `process.argv`, or produces `console.log` output
- [ ] Existing command files still work (they call the use cases; full delegation happens in scope 04)
- [ ] `core/ai-prompt-builder.ts` and `core/context-scanner.ts` either merged into use case or moved to infrastructure
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
