# 🔍 DEEPENING: Scope 01 — API Surface & JSON Schemas

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the JSON API surface and JSON schemas for all planning entities. External tools read these schemas to understand what data exists, what types it has, and how to navigate the planning system.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Design `planning/_schema/planning.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, name, status, phase, intent, source, scopes[], terms[], initiators, dates |
| 2 | Design `planning/_schema/scope.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, name, dependsOn, tasks[], doneCriteria[], inconsistencies[], residuals[], status |
| 3 | Design `planning/_schema/task.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: number, description, workflow, status, output, dependencies[] |
| 4 | Design `planning/_schema/workflow.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, name, description, inputs, outputs, steps[] |
| 5 | Design `planning/_schema/validation.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: type, conditions[], requiredFiles[], requiredPatterns[], expectedTerms[] |
| 6 | Create `planning/_schema/index.json` — manifest of all schemas + version | GENERATE-DOCUMENT | PENDING | `index.json` listing all schemas |
| 7 | Write `planning/API.md` — endpoints: `list`, `get`, `get-scope`, `get-tasks`, `list-workflows`, `query-state` | GENERATE-DOCUMENT | PENDING | API reference document |

---

## Done Criteria

- [ ] All 5 JSON schemas validate their respective entity types
- [ ] `index.json` manifest exists with schema version
- [ ] `planning/API.md` documents all query endpoints with input/output examples
- [ ] Every schema field has a type and a description

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