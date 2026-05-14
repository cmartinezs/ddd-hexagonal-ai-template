# 🔍 DEEPENING: Scope 04 — Workflow Catalog Extensions

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the new workflows that external tools will use to interact with the planning system. These extend the existing workflow catalog with API-oriented operations.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Document `QUERY-PLANNING` workflow: inputs (planning ID), outputs (JSON planning object), steps | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` entry |
| 2 | Document `LIST-PLANNINGS` workflow: inputs (filter), outputs (JSON array), steps | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` entry |
| 3 | Document `ADVANCE-SCOPE` workflow: inputs (planning ID, scope ID, task results), outputs (updated markdown + JSON) | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` entry |
| 4 | Document `VALIDATE-OUTPUT` workflow: inputs (planning ID, scope ID, task ID), outputs (validation report JSON), steps | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` entry |
| 5 | Document `CREATE-PLANNING` workflow: inputs (YAML/JSON planning template), outputs (new planning folder + markdown files) | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` entry |
| 6 | Map existing workflow triggers to new equivalents: `GENERATE-DOCUMENT` → `CREATE-PLANNING + VALIDATE-OUTPUT` | GENERATE-DOCUMENT | PENDING | Workflow mapping table |

---

## Done Criteria

- [ ] All 5 new workflows documented with input types, output types, and step sequences
- [ ] `planning/WORKFLOWS/API.md` created with complete entries
- [ ] Existing workflows mapped to new equivalents
- [ ] Workflow IDs follow `VERB-NOUN` convention consistently

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