# 🔍 DEEPENING: Scope 06 — `archon doctor --ci`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Extend the existing `archon doctor` command with a `--ci` flag that exits 0 (healthy) or 1 (issues found) and supports `--json` for machine-readable output. No interactive prompts in CI mode.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Update `src/cli/commands/doctor.command.ts` — detect `--ci` flag; if set, run all checks silently, exit 0/1, support `--json` | GENERATE-DOCUMENT | PENDING | `cli/commands/doctor.command.ts` updated |
| 2 | Update `docs/commands/doctor.md` — document `--ci` and `--json` flags | GENERATE-DOCUMENT | PENDING | `docs/commands/doctor.md` updated |
| 3 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon doctor --ci` exits 0 when healthy, 1 when issues found
- [ ] `archon doctor --ci --json` outputs `{ "healthy": true/false, "issues": [...] }`
- [ ] No interactive prompts in CI mode
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
