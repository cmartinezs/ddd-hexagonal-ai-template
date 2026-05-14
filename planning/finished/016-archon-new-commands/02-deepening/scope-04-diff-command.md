# 🔍 DEEPENING: Scope 04 — `archon diff --template <from>..<to>`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Add `archon diff --template <from>..<to>` that compares two template versions in the global cache and shows what would change: added files, removed files, modified sections, breaking changes. No network call required if both versions are cached.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/domain/diff/diff.types.ts` — `FileDiff`, `SectionDiff`, `TemplateDiff`, `DiffSeverity` | GENERATE-DOCUMENT | PENDING | `domain/diff/diff.types.ts` |
| 2 | Create `src/application/diff-template.usecase.ts` — resolve both versions from cache, compare file trees and section headers | GENERATE-DOCUMENT | PENDING | `application/diff-template.usecase.ts` |
| 3 | Create `src/cli/commands/diff.command.ts` — parse `--template X..Y` arg, call use case, render diff | GENERATE-DOCUMENT | PENDING | `cli/commands/diff.command.ts` |
| 4 | Register `diff` in `cli/router.ts` and `cli/program.ts` | GENERATE-DOCUMENT | PENDING | Router + program updated |
| 5 | Create `docs/commands/diff.md` — reference documentation | GENERATE-DOCUMENT | PENDING | `docs/commands/diff.md` |
| 6 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon diff --template 0.1.0..0.2.0` outputs added/removed/changed files
- [ ] Exits with clear error if either version is not in cache
- [ ] `--json` flag outputs machine-readable JSON
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
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
