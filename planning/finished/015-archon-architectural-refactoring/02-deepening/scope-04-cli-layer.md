# 🔍 DEEPENING: Scope 04 — Refactor `cli/` Layer

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Replace the fat command files with thin `cli/commands/*.command.ts` files that only parse arguments and delegate to application use cases. Create `cli/program.ts` as the commander root. Remove all remaining business logic from the CLI layer.

**Dependency:** Scope 03 (application layer) must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/cli/program.ts` — extract commander root setup from `bin/archon.ts`; register all sub-commands | GENERATE-DOCUMENT | DONE | `cli/program.ts` |
| 2 | Create `src/cli/commands/init.command.ts` — strip `commands/init.ts` to: parse options → call `InitProjectUseCase` → render output | GENERATE-DOCUMENT | DONE | `cli/commands/init.command.ts` |
| 3 | Create `src/cli/commands/run.command.ts` — strip `commands/run.ts` to: parse options → call `RunAgentUseCase` → render output | GENERATE-DOCUMENT | DONE | `cli/commands/run.command.ts` |
| 4 | Create `src/cli/commands/check.command.ts`, `next.command.ts`, `upgrade.command.ts` — thin wrappers | GENERATE-DOCUMENT | DONE | Three thin command files |
| 5 | Move remaining commands (agent, config, dev, doctor, etc.) to `cli/commands/` — rename to `*.command.ts` | GENERATE-DOCUMENT | DONE | All `commands/*.ts` renamed and moved |
| 6 | Update `bin/archon.ts` to import from `cli/program.ts` | GENERATE-DOCUMENT | DONE | `bin/archon.ts` updated |
| 7 | Remove the old `src/commands/` directory | GENERATE-DOCUMENT | DONE | `src/commands/` deleted |
| 8 | Run `npm run typecheck` and `npm run build` — must exit 0 | GENERATE-DOCUMENT | DONE | Clean build |

---

## Done Criteria

- [ ] `src/commands/` directory no longer exists
- [ ] `src/cli/program.ts` is the commander entry point
- [ ] All commands are in `src/cli/commands/*.command.ts`
- [ ] No command file contains business logic — only argument parsing + use case call + output rendering
- [ ] `bin/archon.ts` imports from `cli/program.ts`
- [ ] `npm run typecheck` and `npm run build` exit 0

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
