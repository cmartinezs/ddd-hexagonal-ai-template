# 🔍 DEEPENING: Scope 01 — Fix `templates pull` version parsing

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Make `archon templates pull id@version` reproducible: parse the `id@version` syntax, checkout the exact tag after cloning, and store `commitSha` so any future pull of the same spec yields identical content.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Locate the `templates pull` handler in `src/` | GENERATE-DOCUMENT | PENDING | — (analysis) |
| 2 | Add `id@version` parsing: split on `@`, validate both parts present | GENERATE-DOCUMENT | PENDING | `src/` updated |
| 3 | After `git clone --depth 1`, execute `git checkout refs/tags/v<version>` | GENERATE-DOCUMENT | PENDING | `src/` updated |
| 4 | Store `commitSha` via `git rev-parse HEAD` after checkout | GENERATE-DOCUMENT | PENDING | `src/` updated |
| 5 | Fail with clear error + hint if tag does not exist in the remote | GENERATE-DOCUMENT | PENDING | Error message added |
| 6 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `archon templates pull id@version` parses `id` and `version` separately
- [ ] Clone is followed by explicit `git checkout refs/tags/v<version>`
- [ ] `commitSha` is recorded in the cached template registry entry
- [ ] Pulling a non-existent tag exits non-zero with a descriptive error
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
