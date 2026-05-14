# 🔍 DEEPENING: Scope 03 — Replace shell strings with `execa`

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Replace all shell-string subprocess calls (`exec`, `spawn` with string templates, `child_process.execSync`) with `execa` structured calls, eliminating shell injection vectors and providing consistent error handling.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Audit `src/` for all subprocess invocations using string interpolation | GENERATE-DOCUMENT | PENDING | List of call sites |
| 2 | Add `execa` to `package.json` if not present | GENERATE-DOCUMENT | PENDING | `package.json` updated |
| 3 | Replace `git clone` / `git checkout` / `git rev-parse` calls with `execa('git', [...])` | GENERATE-DOCUMENT | PENDING | `src/` updated |
| 4 | Replace `opencode`/`claude` subprocess calls with `execa` | GENERATE-DOCUMENT | PENDING | `src/` adapter files updated |
| 5 | Replace any `npm`/`npx` subprocess calls with `execa` | GENERATE-DOCUMENT | PENDING | `src/` updated |
| 6 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] Zero shell string interpolation in subprocess calls (`exec(\`git clone ${url}\`` pattern eliminated)
- [ ] All `git`, `opencode`, `claude`, `npm` calls use `execa(binary, argsArray)`
- [ ] `execa` is in `package.json` dependencies
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
