# 🔍 DEEPENING: Scope 03 — Validation Engine & Human Gates

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the validation and governance model for the local planning contract.

The validation engine checks structure, links, dependencies, outputs and generated artifacts. Human gates control sensitive lifecycle transitions such as marking tasks done, advancing scopes or archiving plannings.

This scope defines what must be validated and how transition requests are approved. It does not require a specific runtime, CLI or implementation language.

---

## Design Constraints

- Validation must be invocable locally without a server.
- Validation reports must be emitted as structured JSON using `planning/contracts/v1/validation-report.schema.json`.
- Validation may be implemented by any tool or language.
- State-changing actions must be expressed as transition requests.
- Human approval must be explicit, auditable and stored in the repository or a documented equivalent.
- Adapter-specific commands such as Archon commands are out of scope for the core contract.

---

## Validation Rule Families

| Family | Purpose | Example rules |
|---|---|---|
| Structure | Check schemas and metadata shape | `schema-valid`, `required-field`, `version-supported` |
| Filesystem | Check expected files and paths | `file-exists`, `directory-exists`, `path-valid` |
| Markdown | Check documentation consistency | `links-valid`, `heading-exists`, `no-placeholder` |
| Planning semantics | Check lifecycle and dependencies | `status-consistent`, `dependency-satisfied`, `no-cycle` |
| Generated artifacts | Check indexes and graphs | `source-hash-current`, `graph-valid`, `manifest-valid` |
| Governance | Check approvals and policies | `approval-required`, `approval-present`, `request-idempotent` |

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define validation rule catalog | GENERATE-DOCUMENT | PENDING | Rule catalog in `planning/API.md` or `planning/WORKFLOWS/API.md` |
| 2 | Define `validation-report` payload examples | GENERATE-DOCUMENT | PENDING | Examples conforming to `validation-report.schema.json` |
| 3 | Define transition request semantics for task/scope/planning lifecycle changes | GENERATE-DOCUMENT | PENDING | Request envelope examples |
| 4 | Define human approval records and required evidence fields | GENERATE-DOCUMENT | PENDING | Approval model and examples |
| 5 | Define idempotency rules for repeated tool requests | GENERATE-DOCUMENT | PENDING | Idempotency policy |
| 6 | Define drift detection rules for generated indexes/graphs | GENERATE-DOCUMENT | PENDING | Source hash / commit validation rules |
| 7 | Document adapter boundary: core validation vs. CLI-specific wiring | GENERATE-DOCUMENT | PENDING | Adapter boundary section |
| 8 | Validate 017 itself against the newly defined rules as a pilot | VALIDATE-OUTPUT | PENDING | Validation report for 017 |

---

## Transition Request Model

Tools should produce transition requests like:

```json
{
  "apiVersion": "planning.local/v1",
  "command": "scope.advance.request",
  "planningId": "017",
  "scopeId": "03",
  "requestedBy": {
    "kind": "agent",
    "name": "adapter-name"
  },
  "evidence": [
    {
      "kind": "validation-report",
      "path": ".planning/reports/017-s03.json"
    }
  ],
  "dryRun": true
}
```

The response should indicate whether the request is valid, rejected or waiting for human approval.

---

## Done Criteria

- [ ] Validation rule families are documented.
- [ ] Validation report format is defined through the Scope 01 contract.
- [ ] Sensitive lifecycle operations use request semantics.
- [ ] Human approval records are defined.
- [ ] Idempotency and drift detection are documented.
- [ ] No core task requires `archon planning validate` or any specific CLI command.
- [ ] 017 can be validated as a pilot planning.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I05 | Previous scope text required `planning/_engine/validate.ts`, `check-links.ts` and `check-schema.ts`, coupling validation to TypeScript. | Previous `scope-03-validation-engine.md` | RESOLVED IN 017 | Define validation semantics and artifacts, not implementation files. |
| I06 | Previous scope text included `archon planning validate --scope <id>` inside 017. | Previous `scope-03-validation-engine.md`, planning 018 | RESOLVED IN 017 | Move Archon CLI wiring to 018. 017 defines the neutral validation contract only. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R03 | Reference implementation of the validator. | Future implementation planning | DEFERRED |
| R04 | Archon-specific validation command wiring. | Planning 018 | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
