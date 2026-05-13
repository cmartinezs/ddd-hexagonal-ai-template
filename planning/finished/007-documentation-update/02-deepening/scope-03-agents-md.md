# 🔍 DEEPENING: Scope 03 — AGENTS.md: Add Archon Section

> **Status:** DONE (2026-05-13)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Add an Archon CLI section to `AGENTS.md` so AI agents working in this repository know the CLI exists, where it lives, and what commands are relevant for documentation workflow.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Add `packages/archon-cli/` entry to the directory structure section | GENERATE-DOCUMENT | DONE | Updated `AGENTS.md` |
| 2 | Add "Archon CLI" section with key commands relevant to AI agents | GENERATE-DOCUMENT | DONE | Updated `AGENTS.md` |

---

## Content to Add

**Directory structure entry:**
```
├── packages/
│   └── archon-cli/    # Globally installable CLI (Node.js/TypeScript)
```

**New section — key points for AI agents:**
- `archon status` — check current phase before working
- `archon next [--phase N] [--force]` — advance phase (jump detection if N > currentPhase+1)
- `archon context inject` — build guide context file for agent injection
- `archon check` — validate phase constraints
- State in `.archon/state.json` — do not edit directly

---

## Done Criteria

- [ ] `AGENTS.md` directory structure lists `packages/archon-cli/`
- [ ] `AGENTS.md` has an Archon CLI section with at minimum: status, next, context inject, check
- [ ] `--force` flag documented for CI/automated use
- [ ] TRACEABILITY.md updated

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

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)
