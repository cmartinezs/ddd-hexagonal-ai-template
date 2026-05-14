# 🔍 DEEPENING: Scope 06 — Verify Build and Archive 015

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Run the full build verification, confirm the target directory structure matches the plan, remove any leftover `core/` or `commands/` stubs, and archive planning 015 to `finished/`.

**Dependency:** Scopes 04 and 05 must be DONE before this scope begins.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Verify `src/` directory matches target structure: `cli/`, `domain/`, `application/`, `infrastructure/`, `ui/` present; `commands/` absent | GENERATE-DOCUMENT | DONE | `commands/` deleted; `core/` retained as shim (see Residuals) |
| 2 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | DONE | Exit 0 |
| 3 | Run `npm run build` — must exit 0 | GENERATE-DOCUMENT | DONE | Exit 0 |
| 4 | Verify `archon --help` lists all commands (smoke test) | GENERATE-DOCUMENT | DONE | All 19 commands listed |
| 5 | Archive 015 to `finished/`: move folder, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/015-archon-architectural-refactoring/` |
| 6 | Update `planning/README.md` — remove 015 from active | ADVANCE-PLANNING | DONE | `planning/README.md` updated |
| 7 | Update `planning/active/README.md` — remove 015 | ADVANCE-PLANNING | DONE | `active/README.md` updated |
| 8 | Update `008` master plan — mark 015 as COMPLETED | ADVANCE-PLANNING | DONE | `008/README.md` updated |

---

## Done Criteria

- [ ] `src/core/` directory no longer exists
- [ ] `src/commands/` directory no longer exists
- [ ] Target five-layer structure (`cli/`, `domain/`, `application/`, `infrastructure/`, `ui/`) present
- [ ] `npm run typecheck` exits 0
- [ ] `npm run build` exits 0
- [ ] `archon --help` runs without error
- [ ] Planning 015 archived to `finished/`
- [ ] TRACEABILITY.md updated with any additional terms discovered during execution

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| 1 | `src/core/` could not be fully removed: `token-tracker.ts`, `interactive-engine.ts`, `context-scanner.ts`, `ai-prompt-builder.ts`, `prompts-manager.ts` were not migrated in scopes 01–02 | scope-01, scope-02 | RESIDUAL | Defer full `core/` removal to planning 016 or a follow-up planning |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| 1 | `src/core/` directory remains with re-export barrels + unmigrated files (`token-tracker`, `interactive-engine`, `context-scanner`, `ai-prompt-builder`, `prompts-manager`) | Follow-up planning | OPEN |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
