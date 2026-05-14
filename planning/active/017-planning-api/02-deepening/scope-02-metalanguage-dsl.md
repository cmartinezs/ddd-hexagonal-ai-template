# 🔍 DEEPENING: Scope 02 — Markdown Metadata & Metalanguage

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the minimal structured metadata conventions that make Markdown planning files reliably consumable by tools while preserving Markdown as the canonical human authoring format.

This scope does **not** define YAML/JSON as a replacement source of truth. YAML/JSON may exist later as import/export or adapter-friendly serialization, but not as the mandatory canonical workflow.

---

## Design Constraints

- Markdown remains the canonical planning artifact.
- Metadata must be readable by machines but unobtrusive for humans.
- Tables and Mermaid diagrams may remain human views, but should not be the only machine contract.
- The metadata model must match `planning/contracts/v1/`.
- Optional extensions must not break consumers that do not understand them.

---

## Recommended Metadata Style

Use structured metadata blocks embedded in Markdown, preferably in HTML comments to avoid polluting the visual reading experience.

Example:

```markdown
<!-- planning:meta
apiVersion: planning.local/v1
entity: scope
planningId: "017"
scopeId: "02"
status: "pending"
dependsOn: ["01"]
approvalRequiredFor:
  - advance_scope
  - archive
-->
```

Task-level example:

```markdown
<!-- planning:task
apiVersion: planning.local/v1
taskId: "T02-03"
workflow: "GENERATE-DOCUMENT"
status: "pending"
dependsOn: ["T02-01"]
expectedOutput:
  kind: "document"
  path: "planning/METALANGUAGE.md"
-->
```

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define `planning/METALANGUAGE.md` as metadata and authoring convention reference | GENERATE-DOCUMENT | PENDING | `planning/METALANGUAGE.md` |
| 2 | Specify `planning:meta`, `planning:task`, `planning:approval` and `planning:artifact` blocks | GENERATE-DOCUMENT | PENDING | Metadata block catalog |
| 3 | Map Markdown metadata blocks to `planning/contracts/v1/*.schema.json` | GENERATE-DOCUMENT | PENDING | Mapping table |
| 4 | Define optional import/export rules for YAML/JSON without making them canonical | GENERATE-DOCUMENT | PENDING | Import/export section |
| 5 | Define extension policy using `x-*` fields | GENERATE-DOCUMENT | PENDING | Extension policy |
| 6 | Annotate one existing planning file as an example | GENERATE-DOCUMENT | PENDING | Example metadata in 017 or sample planning |
| 7 | Fix existing broken footer/link conventions detected during analysis | GENERATE-DOCUMENT | PENDING | Corrected markdown links |

---

## Done Criteria

- [ ] `planning/METALANGUAGE.md` describes metadata conventions clearly.
- [ ] YAML/JSON is explicitly documented as optional import/export, not the canonical source.
- [ ] Metadata blocks map to the contract schemas defined in Scope 01.
- [ ] Tools can read core planning attributes without parsing Markdown tables.
- [ ] Human readability of planning files is preserved.
- [ ] Broken links introduced in previous drafts are fixed.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I02 | Previous scope text described YAML/JSON that compiles to Markdown, creating a second source of truth risk. | Previous `scope-02-metalanguage-dsl.md` | RESOLVED IN 017 | Reframe metalanguage as Markdown metadata + optional import/export. |
| I03 | Previous scope text referenced `planning/_compiler/yaml-to-markdown.ts`, coupling the planning to TypeScript. | Previous `scope-02-metalanguage-dsl.md` | RESOLVED IN 017 | Remove implementation-language-specific file targets from the core planning. |
| I04 | Footer link was malformed. | Previous `scope-02-metalanguage-dsl.md` | RESOLVED IN 017 | Restore correct link syntax. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R02 | A concrete importer/exporter for YAML/JSON may be useful later. | Future adapter or tooling planning | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
