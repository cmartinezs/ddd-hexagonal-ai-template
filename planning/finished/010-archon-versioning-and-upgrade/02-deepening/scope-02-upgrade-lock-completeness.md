# 🔍 DEEPENING: Scope 02 — Fix `upgrade` to write full `TemplateLock`

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Make `archon upgrade` leave the project's `template.lock.json` fully consistent: all fields (`version`, `ref`, `source`, `commitSha`, `cachePath`, `resolvedAt`) updated to the target version, not just `version` and `resolvedAt`.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Locate `MigrationManager.updateTemplateLock()` in `src/migration-manager.ts` | GENERATE-DOCUMENT | PENDING | — (analysis) |
| 2 | Resolve target template version from global cache before writing lock | GENERATE-DOCUMENT | PENDING | `src/migration-manager.ts` updated |
| 3 | Fail upgrade if target version is not in cache — require user to pull first | GENERATE-DOCUMENT | PENDING | Error path added |
| 4 | Write full lock: `id`, `version`, `source`, `ref`, `commitSha`, `cachePath`, `resolvedAt` | GENERATE-DOCUMENT | PENDING | `src/migration-manager.ts` updated |
| 5 | Ensure `TemplateLock` interface in `types.ts` requires all fields | GENERATE-DOCUMENT | PENDING | `src/types.ts` updated |
| 6 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `updateTemplateLock()` resolves the target version path from global cache before writing
- [ ] Upgrade fails if target version is not cached, with hint to run `archon templates pull id@version`
- [ ] Written lock contains: `id`, `version`, `source`, `ref`, `commitSha`, `cachePath`, `resolvedAt`
- [ ] `TemplateLock` type has all fields as required (no optional fields that could be silently omitted)
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
