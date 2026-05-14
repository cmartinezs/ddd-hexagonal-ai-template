# 🔍 DEEPENING: Scope 05 — Interdependency Graph

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Build a machine-readable interdependency graph that maps every planning's dependencies, cross-references, and term traceability. External tools use this to answer: "which plannings are blocked by X?", "which plannings depend on Y?", "what terms are shared?".

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Generate `planning/_graph/plannings.json` — all plannings with status, phase, dependencies | GENERATE-DOCUMENT | PENDING | Dependency graph JSON |
| 2 | Generate `planning/_graph/scope-graph.json` — cross-planning scope dependencies | GENERATE-DOCUMENT | PENDING | Scope dependency JSON |
| 3 | Generate `planning/_graph/terms.json` — consolidated traceability matrix (all TRACEABILITY.md merged) | GENERATE-DOCUMENT | PENDING | Terms graph JSON |
| 4 | Generate `planning/_graph/workflow-graph.json` — workflow usage across plannings | GENERATE-DOCUMENT | PENDING | Workflow frequency map |
| 5 | Update `planning/WORKFLOWS/API.md` — document `GET-GRAPH` workflow entry | GENERATE-DOCUMENT | PENDING | Graph workflow documented |
| 6 | Write script or command to regenerate all graph JSONs on demand | GENERATE-DOCUMENT | PENDING | Rebuild script |

---

## Done Criteria

- [ ] `planning/_graph/plannings.json` exists and is valid
- [ ] `planning/_graph/scope-graph.json` captures all cross-planning scope deps
- [ ] `planning/_graph/terms.json` consolidates all terms from all plannings
- [ ] `planning/_graph/workflow-graph.json` maps workflow usage
- [ ] `GET-GRAPH` workflow documented in `planning/WORKFLOWS/API.md`

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