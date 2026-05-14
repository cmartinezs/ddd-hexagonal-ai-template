# 🔍 DEEPENING: Scope 05 — Replace manual version comparison with `semver`

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Use the `semver` package (already a dependency) everywhere version strings are compared, eliminating the manual `split('.')` comparison in `global-cache.ts` and any other ad-hoc version logic.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Locate all manual version comparisons in `src/` (`split('.')`, string compare on version strings) | GENERATE-DOCUMENT | PENDING | List of sites |
| 2 | Replace `global-cache.ts` manual comparison with `semver.gt()` / `semver.satisfies()` | GENERATE-DOCUMENT | PENDING | `src/global-cache.ts` updated |
| 3 | Replace any other manual version comparisons found | GENERATE-DOCUMENT | PENDING | Other files updated |
| 4 | Validate that `semver` is in `package.json` (it should already be) | GENERATE-DOCUMENT | PENDING | Confirmed |
| 5 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] Zero manual `split('.')` or string-compare version comparisons in `src/`
- [ ] All version comparisons use `semver.gt()`, `semver.lt()`, `semver.satisfies()`, etc.
- [ ] `semver` is confirmed in `package.json` dependencies
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
