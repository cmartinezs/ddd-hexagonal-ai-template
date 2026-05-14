# 🔍 DEEPENING: Scope 01 — Remove ancestor-walk from `init` production path

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Remove the filesystem ancestor-walk that detects a local template repo from the default `archon init` flow, so production users cannot accidentally use a local clone.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Locate the ancestor-walk / marker-detection logic in `src/commands/init.ts` (or template resolver) | GENERATE-DOCUMENT | PENDING | — (analysis) |
| 2 | Delete the ancestor-walk code block | GENERATE-DOCUMENT | PENDING | `src/commands/init.ts` updated |
| 3 | Update template resolution order: `ARCHON_DEV_TEMPLATE_PATH` → global cache → error | GENERATE-DOCUMENT | PENDING | Template resolver updated |
| 4 | Error path: "No template found. Run `archon templates pull <id>` first." | GENERATE-DOCUMENT | PENDING | Error message added |
| 5 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] No `01-templates`, `AGENTS.md`, or `00-guides-and-instructions` marker checks remain in `init` production path
- [ ] Template resolution in production: `ARCHON_DEV_TEMPLATE_PATH` (if set) → `~/.archon/templates/` → fail
- [ ] Missing template exits with actionable error message
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
