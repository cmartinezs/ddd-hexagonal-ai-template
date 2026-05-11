# Phase 6 — Development

> [← README](README.md)

**What This Phase Is**: Hexagonal architecture, API contracts, coding standards, ADRs. Technology-specific — names frameworks, databases, languages.

---

| Item | Value |
|------|-------|
| Phase code | `V` |
| Required input | Phase 3 design, Phase 4 data model, Phase 5 epics |
| Key templates | ADR (`TEMPLATE-020`), API endpoint templates, coding standards, architecture dimensions |
| Agnostic boundary | **Not enforced** — technology names are expected and required |
| Traceability | ADRs must reference the requirement or design decision that motivated them |

**Key Checks**: [`[CHECK-PHASE-CONTEXT]`](../04-SUB-WORKFLOWS/CHECK-PHASE-CONTEXT.md)

---

## Done Criteria

- [ ] Architecture diagram shows hexagonal layers
- [ ] At least one ADR per major architecture decision
- [ ] API contracts defined for all external-facing endpoints

---

## Dev Workflow sub-area (`06-development/workflow/`)

The `workflow/` sub-area documents git workflow conventions, commit standards, PR process, and CI/CD pipelines.

| Item | Value |
|------|-------|
| Key templates | `workflow/branches/`, `workflow/commits/`, `workflow/pull-requests/`, `workflow/cicd/` |
| Agnostic boundary | **Not enforced** — specific tools (GitHub, GitLab, ArgoCD) are expected |
| Consistency requirement | Branch strategy, commit types, PR merge strategy, and CI/CD environments must be mutually consistent |

**Key Checks**: [`[CHECK-DEVWORKFLOW-CONSISTENCY]`](../04-SUB-WORKFLOWS/CHECK-DEVWORKFLOW-CONSISTENCY.md) · [`[CHECK-VERSIONING-ALIGNMENT]`](../04-SUB-WORKFLOWS/CHECK-VERSIONING-ALIGNMENT.md)

**Done Criteria (workflow sub-area)**:
- [ ] Branch strategy defined (GitFlow or Trunk-Based)
- [ ] Commit type vocabulary matches actual PR and CI stage names
- [ ] PR merge strategy consistent with branch strategy
- [ ] CI/CD environments match deployment phase environments

---

> [← README](README.md)
