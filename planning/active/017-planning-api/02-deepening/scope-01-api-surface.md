# 🔍 DEEPENING: Scope 01 — Contract Surface & JSON Schemas

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the versioned, transport-neutral contract surface for the local planning system.

This scope defines the JSON schemas and command envelopes that external tools can use to query, validate, request transitions and interpret planning state without depending on Archon, a server, a daemon, or a specific implementation language.

---

## Design Constraints

- The contract describes payloads and semantics, not a specific CLI command syntax.
- The contract must support file-based and `stdin`/`stdout` usage first.
- HTTP, MCP-like protocols, IDE commands or CLI wrappers are adapters only.
- Mutating actions must be represented as requests, not silent state changes.
- Generated machine-readable artifacts must be rebuildable from Markdown.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define `planning/contracts/v1/planning.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, title, phase, status, intent, source, scopes, dates, metadata version |
| 2 | Define `planning/contracts/v1/scope.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, title, status, dependsOn, tasks, outputs, doneCriteria, residuals |
| 3 | Define `planning/contracts/v1/task.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, title, workflow, status, dependencies, evidence, expectedOutput |
| 4 | Define `planning/contracts/v1/workflow.schema.json` | GENERATE-DOCUMENT | PENDING | Schema: id, name, intent, inputs, outputs, steps, approvalPolicy |
| 5 | Define `planning/contracts/v1/command-envelope.schema.json` | GENERATE-DOCUMENT | PENDING | Request/response envelope for query, validate and request commands |
| 6 | Define `planning/contracts/v1/approval.schema.json` | GENERATE-DOCUMENT | PENDING | Approval record shape for human-gated transitions |
| 7 | Define `planning/contracts/v1/validation-report.schema.json` | GENERATE-DOCUMENT | PENDING | Validation result shape: pass/fail, diagnostics, warnings, evidence |
| 8 | Create `planning/contracts/v1/index.json` | GENERATE-DOCUMENT | PENDING | Manifest of schemas, version, compatibility rules and extension policy |
| 9 | Write `planning/API.md` | GENERATE-DOCUMENT | PENDING | Contract reference with query, validate and request examples |

---

## Required Command Families

| Family | Purpose | Example commands |
|---|---|---|
| Query | Read planning state | `planning.list`, `planning.get`, `scope.get`, `task.list`, `workflow.list` |
| Validate | Check structure, semantics or generated artifacts | `planning.validate`, `task.validate`, `graph.validate`, `contract.validate` |
| Request | Propose state-changing actions | `task.done.request`, `scope.advance.request`, `planning.archive.request` |

---

## Done Criteria

- [ ] All schemas are stored under `planning/contracts/v1/`.
- [ ] `index.json` declares the contract version and compatibility policy.
- [ ] `planning/API.md` documents request/response examples for query, validate and request commands.
- [ ] No command requires Archon, TypeScript, Node, Python, Java, HTTP or a daemon.
- [ ] State-changing operations are modeled as request envelopes with optional approval requirements.
- [ ] Extension fields use a documented `x-*` convention and must be safely ignorable.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I01 | Earlier target paths used `planning/_schema/`; the revised architecture uses `planning/contracts/v1/` for canonical schemas. | `00-initial.md`, `01-expansion.md`, previous scope draft | RESOLVED IN 017 | Update all references to use `planning/contracts/v1/` for canonical contracts. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R01 | Concrete implementation of schema validation tooling. | Future implementation planning | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
