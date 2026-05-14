# 🔍 DEEPENING: Scope 02 — Archon Versioning & Upgrade Fix (010)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 010, execute all its scopes, and archive it as completed. This scope makes template versioning fully reproducible and leaves upgrade locks in a consistent state.

**Child planning:** [`010-archon-versioning-and-upgrade`](../../../010-archon-versioning-and-upgrade/00-initial.md)

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Promote 010 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/010-archon-versioning-and-upgrade/01-expansion.md` |
| 2 | Execute scope: fix `templates pull` to parse `id@version` and checkout tag | GENERATE-DOCUMENT | DONE | `src/commands/templates.ts` corrected |
| 3 | Execute scope: fix `upgrade` to write full `TemplateLock` | GENERATE-DOCUMENT | DONE | `src/core/migration-manager.ts` corrected |
| 4 | Archive 010 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/010-archon-versioning-and-upgrade/` |
| 5 | Update indexes | ADVANCE-PLANNING | DONE | `planning/README.md` updated |

---

## Done Criteria

- [ ] `archon templates pull id@version` parses `id@version` correctly
- [ ] After pull, `git checkout refs/tags/v<version>` is executed and `commitSha` is stored
- [ ] Pull fails with a clear error if the tag does not exist
- [ ] `archon upgrade` updates all fields: `version`, `ref`, `source`, `commitSha`, `cachePath`, `resolvedAt`
- [ ] Upgrade fails if target version is not in cache
- [ ] Planning 010 archived to `finished/`
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
