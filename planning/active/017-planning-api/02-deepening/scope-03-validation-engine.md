# 🔍 DEEPENING: Scope 03 — Validation Engine

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Build a validation engine that checks whether task outputs match the validation schema declared in each task. External tools can call this engine to verify that AI-generated content meets the checklist criteria before marking a task done.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define validation rule types: `file-exists`, `file-matches`, `contains-term`, `links-valid`, `schema-valid`, `no-placeholder` | GENERATE-DOCUMENT | PENDING | `planning/_schema/validation.schema.json` rule catalog |
| 2 | Implement `planning/_engine/validate.ts` — read task validation schema, check files, report results | GENERATE-DOCUMENT | PENDING | `validate.ts` engine |
| 3 | Implement `planning/_engine/check-links.ts` — validate markdown links (internal only) | GENERATE-DOCUMENT | PENDING | Link checker |
| 4 | Implement `planning/_engine/check-schema.ts` — validate generated JSON against its schema | GENERATE-DOCUMENT | PENDING | Schema validator |
| 5 | Build `archon planning validate --scope <id>` — CLI command wiring to engine | GENERATE-DOCUMENT | PENDING | CLI command (018 stub) |
| 6 | Test engine on existing plannings (008, 016) — verify done criteria match real state | GENERATE-DOCUMENT | PENDING | Validation report for existing plannings |

---

## Done Criteria

- [ ] Validation engine runs against any planning's done criteria
- [ ] Each rule type produces pass/fail with details
- [ ] `archon planning validate` exits 0 (clean) or 1 (failures)
- [ ] Existing plannings pass validation or list discrepancies

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