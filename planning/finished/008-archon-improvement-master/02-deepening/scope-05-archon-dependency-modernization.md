# 🔍 DEEPENING: Scope 05 — Archon Dependency Modernization (013)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 013, execute all its scopes, and archive it as completed. This scope replaces manual, fragile, or inconsistent implementations with proven libraries.

**Child planning:** [`013-archon-dependency-modernization`](../../../013-archon-dependency-modernization/00-initial.md)

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Promote 013 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/013-archon-dependency-modernization/01-expansion.md` |
| 2 | Execute scope: migrate all manual flag parsing to `commander` | GENERATE-DOCUMENT | DONE | `bin/archon.ts` rewritten with Commander; sub-commands use `.passThroughOptions()` |
| 3 | Execute scope: add `zod` schemas for state/config/lock/registry | GENERATE-DOCUMENT | RESIDUAL | Deferred to 015 (Architectural Refactoring) — large cross-cutting change |
| 4 | Execute scope: replace shell string interpolations with `execa` | GENERATE-DOCUMENT | DONE | `execa` installed; `templates.ts` uses `execa` + `rmSync` |
| 5 | Execute scope: replace hardcoded `~/.archon` with `env-paths` | GENERATE-DOCUMENT | RESIDUAL | Deferred — breaking change for existing installs; needs migration strategy |
| 6 | Execute scope: replace manual `split('.')` version compare with `semver` | GENERATE-DOCUMENT | DONE | `compareVersions()` uses `semver.compare()` |
| 7 | Archive 013 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/013-archon-dependency-modernization/` |
| 8 | Update indexes | ADVANCE-PLANNING | DONE | `planning/README.md`, `active/README.md` updated |

---

## Done Criteria

- [ ] `archon.ts` / `bin.ts` contains zero manual `process.argv` parsing
- [ ] All subcommands and options declared via `commander` `.command()` / `.option()`
- [ ] `ArchonState`, `ArchonConfig`, `TemplateLock`, registry entry parsed through zod/valibot schema on read
- [ ] No shell string interpolation in subprocess calls — all use `execa`
- [ ] Global cache path uses `env-paths('archon').data` (not hardcoded `~/.archon`)
- [ ] `semver.gt()` / `semver.satisfies()` used wherever version comparisons occur
- [ ] `npm run typecheck` exits 0
- [ ] Planning 013 archived to `finished/`
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
