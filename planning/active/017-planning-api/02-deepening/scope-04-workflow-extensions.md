# 🔍 DEEPENING: Scope 04 — Workflow Catalog Extensions

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define the tool-facing workflows that allow external consumers to interact with the planning system through the neutral local contract.

These workflows must describe intent, inputs, outputs, validation expectations and approval behavior without binding the planning core to Archon, CI, Task, just, Make or any other execution mechanism.

---

## Design Constraints

- Workflows describe behavior and payloads, not implementation-specific commands.
- Workflows must distinguish read-only operations from validation operations and transition requests.
- Workflows must support adapters that run locally through filesystem, `stdin`/`stdout`, CLI wrappers or CI jobs.
- Transition workflows must not imply automatic lifecycle advancement without human approval.

---

## Workflow Families

| Family | Workflow | Purpose | Approval |
|---|---|---|---|
| Query | `QUERY-PLANNING` | Read one planning as structured JSON | No |
| Query | `LIST-PLANNINGS` | List plannings with filters | No |
| Query | `LIST-WORKFLOWS` | List available workflow definitions | No |
| Query | `GET-GRAPH` | Read generated graph artifacts | No |
| Validate | `VALIDATE-OUTPUT` | Validate task/scope output evidence | No, but may be required before transition |
| Validate | `VALIDATE-PLANNING` | Validate planning consistency and generated artifacts | No, but may be required before archive |
| Request | `REQUEST-TASK-DONE` | Request marking a task as done | Yes, according to policy |
| Request | `REQUEST-SCOPE-ADVANCE` | Request advancing or closing a scope | Yes, according to policy |
| Request | `REQUEST-PLANNING-ARCHIVE` | Request moving a planning to finished | Yes |
| Authoring | `CREATE-PLANNING-DRAFT` | Generate a new planning draft from metadata or template | Usually yes before activation |

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Document query workflows: `QUERY-PLANNING`, `LIST-PLANNINGS`, `LIST-WORKFLOWS`, `GET-GRAPH` | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` query section |
| 2 | Document validation workflows: `VALIDATE-OUTPUT`, `VALIDATE-PLANNING` | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` validation section |
| 3 | Document request workflows: `REQUEST-TASK-DONE`, `REQUEST-SCOPE-ADVANCE`, `REQUEST-PLANNING-ARCHIVE` | GENERATE-DOCUMENT | PENDING | `planning/WORKFLOWS/API.md` request section |
| 4 | Define `CREATE-PLANNING-DRAFT` as authoring helper, not direct activation | GENERATE-DOCUMENT | PENDING | Draft creation workflow |
| 5 | Map workflows to command envelope families from Scope 01 | GENERATE-DOCUMENT | PENDING | Workflow/command mapping table |
| 6 | Define adapter examples without making them normative | GENERATE-DOCUMENT | PENDING | Examples for Archon, Task, just, Make, CI |
| 7 | Define workflow acceptance criteria and failure modes | GENERATE-DOCUMENT | PENDING | Failure/status section |

---

## Adapter Boundary Examples

| Adapter | Allowed responsibility | Forbidden responsibility |
|---|---|---|
| Archon | Expose `archon planning ...` commands over the contract | Redefine schemas or own canonical planning state |
| Task/just/Make | Invoke validators/indexers and pass JSON envelopes | Encode business rules not present in the contract |
| CI | Run validation and publish reports | Auto-archive planning without approval |
| IDE extension | Display state and create requests | Mutate lifecycle state silently |
| AI agent | Propose patches and evidence | Mark work complete without human gate when required |

---

## Done Criteria

- [ ] `planning/WORKFLOWS/API.md` documents query, validate and request workflow families.
- [ ] Workflow names reflect safe semantics, especially request-oriented state changes.
- [ ] Workflow inputs/outputs map to `planning/contracts/v1/` schemas.
- [ ] Adapter examples are clearly marked as examples, not core requirements.
- [ ] No workflow requires Archon or another specific execution tool.
- [ ] Human approval requirements are visible in workflow definitions.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I07 | Previous workflow name `ADVANCE-SCOPE` implied direct mutation by tools. | Previous `scope-04-workflow-extensions.md` | RESOLVED IN 017 | Rename state-changing operations to `REQUEST-*` workflows. |
| I08 | Previous `CREATE-PLANNING` workflow implied direct creation of active planning folders. | Previous `scope-04-workflow-extensions.md` | RESOLVED IN 017 | Reframe as `CREATE-PLANNING-DRAFT` with later activation/approval. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R05 | Concrete command names for Archon. | Planning 018 | DEFERRED |
| R06 | Shell/Task/just/Make example files. | Adapter examples or future implementation planning | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
