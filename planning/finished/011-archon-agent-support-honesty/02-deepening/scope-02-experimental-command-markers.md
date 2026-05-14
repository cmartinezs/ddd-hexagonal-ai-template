# 🔍 DEEPENING: Scope 02 — Experimental command markers

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Mark partially-implemented commands explicitly in `--help` output and the README so users have accurate expectations. No hidden incomplete features.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Append `[planned]` to `templates remove` description in commander definition | GENERATE-DOCUMENT | PENDING | `src/commands/templates.ts` updated |
| 2 | Append `[experimental]` to `check --fix` option description | GENERATE-DOCUMENT | PENDING | `src/commands/check.ts` updated |
| 3 | Update `packages/archon-cli/README.md`: add "Experimental / Planned" section in command table | EXPAND-ELEMENT | PENDING | `README.md` updated |
| 4 | Run `archon templates --help` and `archon check --help` to confirm labels appear | GENERATE-DOCUMENT | PENDING | Visual confirmation |

---

## Done Criteria

- [ ] `archon templates remove --help` shows `[planned]` in the description
- [ ] `archon check --help` shows `[experimental]` next to `--fix`
- [ ] `packages/archon-cli/README.md` command table distinguishes stable vs experimental/planned commands
- [ ] No other hidden incomplete commands remain unmarked (audit all commands)

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
