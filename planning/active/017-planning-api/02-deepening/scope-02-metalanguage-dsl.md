# 🔍 DEEPENING: Scope 02 — Metalanguage & DSL

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define a YAML/JSON authoring format (metalanguage) that can describe a planning in a structured way. This format compiles to the markdown files the planning system uses — humans can author in YAML for consistency, machines can emit YAML from tools.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define `planning/METALANGUAGE.md` — syntax reference (YAML keys matching schema fields) | GENERATE-DOCUMENT | PENDING | `planning/METALANGUAGE.md` |
| 2 | Define `planning/_compiler/yaml-to-markdown.ts` — transpile YAML planning to markdown files | GENERATE-DOCUMENT | PENDING | Compiler script |
| 3 | Write example: convert a small existing planning to YAML, compile to markdown, verify equivalence | GENERATE-DOCUMENT | PENDING | Test: `planning/_compiler/test-run.yaml` |
| 4 | Document authoring conventions: frontmatter, table syntax, Mermaid diagrams in YAML | GENERATE-DOCUMENT | PENDING | `METALANGUAGE.md` section on conventions |

---

## Done Criteria

- [ ] Metalanguage syntax fully documented
- [ ] Compiler script transpiles YAML planning to markdown with no information loss
- [ ] At least one existing planning converted and verified
- [ ] `planning/METALANGUAGE.md` includes authoring guide

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

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md../../../README.md)