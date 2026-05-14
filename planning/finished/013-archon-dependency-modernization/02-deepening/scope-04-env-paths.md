# 🔍 DEEPENING: Scope 04 — Replace hardcoded `~/.archon` with `env-paths`

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Use `env-paths` to compute the global cache directory so Archon works correctly on Linux, macOS, and Windows without hardcoded `~/.archon`.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Add `env-paths` to `package.json` if not present | GENERATE-DOCUMENT | PENDING | `package.json` updated |
| 2 | Locate all occurrences of `path.join(homedir(), '.archon')` in `src/` | GENERATE-DOCUMENT | PENDING | List of hardcoded paths |
| 3 | Replace with `envPaths('archon').data` | GENERATE-DOCUMENT | PENDING | `src/global-cache.ts` and any other files updated |
| 4 | Verify the resolved path on Linux matches expected location | GENERATE-DOCUMENT | PENDING | Path verified |
| 5 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `env-paths` is in `package.json` dependencies
- [ ] Zero occurrences of `path.join(homedir(), '.archon')` in `src/`
- [ ] Global cache path is computed via `envPaths('archon').data`
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
