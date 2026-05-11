# 📘 SDLC Phase Guidance for GENERATE-DOCUMENT

> [← WORKFLOWS/README.md](README.md)

Per-phase reference for executing the `GENERATE-DOCUMENT` workflow. Each section specifies inputs, boundary rules, done criteria, and key checks for that SDLC phase.

---

## Overview

`GENERATE-DOCUMENT` is the generic workflow for producing any phase output. This file extends it with phase-specific knowledge so that AI agents know exactly what to check, enforce, and produce for each of the 12 SDLC phases.

```mermaid
flowchart LR
    A[Select phase] --> B[Read phase entry below]
    B --> C[Execute GENERATE-DOCUMENT\nwith phase context]
    C --> D[Apply phase-specific done criteria]
```

---

## How to Use This File

1. Identify which phase you are generating a document for.
2. Read the corresponding section below.
3. Execute `GENERATE-DOCUMENT` with the inputs, constraints, and done criteria specified here.
4. Run the sub-workflows listed in the "Key Checks" column.

---

## Phase Quick Reference

| Phase | Code | Boundary | Template folder | Key check |
|-------|------|----------|----------------|-----------|
| 0 — Documentation Planning | W | Agnostic | `00-documentation-planning/` | `[CHECK-PHASE-CONTEXT]` |
| 1 — Discovery | D | **Agnostic** | `01-discovery/` | `[CHECK-AGNOSTIC-BOUNDARY]` |
| 2 — Requirements | R | **Agnostic** | `02-requirements/` | `[CHECK-AGNOSTIC-BOUNDARY]` + `[VALIDATE-GLOSSARY]` |
| 3 — Design | S | **Agnostic** | `03-design/` | `[CHECK-AGNOSTIC-BOUNDARY]` + `[CHECK-TRACEABILITY]` |
| 4 — Data Model | M | **Agnostic** | `04-data-model/` | `[CHECK-AGNOSTIC-BOUNDARY]` |
| 5 — Planning | P | **Agnostic** | `05-planning/` | `[CHECK-AGNOSTIC-BOUNDARY]` + `[CHECK-PHASE5-CHAIN]` |
| 6 — Development | V | **Specific** | `06-development/` | `[CHECK-PHASE-CONTEXT]` |
| 6w — Dev Workflow | V | **Specific** | `06-development/workflow/` | `[CHECK-DEVWORKFLOW-CONSISTENCY]` |
| 7 — Testing | T | Specific | `07-testing/` | `[CHECK-PHASE-CONTEXT]` |
| 8 — Deployment | B | Specific | `08-deployment/` | `[CHECK-VERSIONING-ALIGNMENT]` |
| 9 — Operations | O | Specific | `09-operations/` | `[CHECK-PHASE-CONTEXT]` |
| 10 — Monitoring | N | Specific | `10-monitoring/` | `[CHECK-PHASE-CONTEXT]` |
| 11 — Feedback | F | Specific | `11-feedback/` | `[CHECK-PHASE-CONTEXT]` |

---

## Phase 0 — Documentation Planning

**What This Phase Is**: Framework setup. Defines SDLC scope, navigation conventions, macro plan.

| Item | Value |
|------|-------|
| Required input | Project name, team context |
| Key templates | `sdlc-framework.md`, `macro-plan.md`, `navigation-conventions.md` |
| Agnostic boundary | N/A — meta-framework, not domain docs |
| Traceability | Update `TRACEABILITY-GLOBAL.md` with phase code assignments |

**Done Criteria**:
- [ ] Macro plan has all 12 phases listed with status
- [ ] Navigation conventions documented
- [ ] SDLC framework describes all phases for this project

---

## Phase 1 — Discovery

**What This Phase Is**: Problem context, vision, actors, scope boundaries. No solution, no technology.

| Item | Value |
|------|-------|
| Required input | Problem statement, known actors, rough scope |
| Key templates | `TEMPLATE-001` through `TEMPLATE-006` |
| Agnostic boundary | **Strictly enforced** — no tech, no solution names |
| Traceability | Record domain terms, actors, and bounded context candidates |

**Key Checks**: `[CHECK-AGNOSTIC-BOUNDARY]` · `[VALIDATE-GLOSSARY]`

**Done Criteria**:
- [ ] Context and motivation documented
- [ ] Actors and personas defined
- [ ] Scope and boundaries stated
- [ ] No technology names in any section

---

## Phase 2 — Requirements

**What This Phase Is**: Functional requirements (RF), non-functional requirements (RNF), scope matrix, traceability matrix. Traces to Discovery.

| Item | Value |
|------|-------|
| Required input | Phase 1 Discovery outputs |
| Key templates | `TEMPLATE-004` (RF), `TEMPLATE-005` (RNF), `TEMPLATE-006` (scope matrix), `TEMPLATE-007` (traceability) |
| Agnostic boundary | **Strictly enforced** — requirements describe business behavior, not implementation |
| Traceability | Every RF/RNF must reference a Discovery actor or problem statement |

**Key Checks**: `[CHECK-AGNOSTIC-BOUNDARY]` · `[CHECK-PHASE-CONTEXT]` · `[VALIDATE-GLOSSARY]`

**Done Criteria**:
- [ ] All RF/RNF have IDs (RF-01, RNF-01…)
- [ ] Traceability matrix links requirements to Discovery actors
- [ ] No implementation details, frameworks, or protocols mentioned

---

## Phase 3 — Design

**What This Phase Is**: Strategic DDD design, bounded contexts, system flows, domain events, context map, UI wireframes. Traces to Requirements.

| Item | Value |
|------|-------|
| Required input | Phase 2 requirements, glossary |
| Key templates | `TEMPLATE-008` (system flows), `TEMPLATE-009` (strategic design), `TEMPLATE-011` (ubiquitous language), `TEMPLATE-012` (domain events), `TEMPLATE-013` (context map), bounded context and API contract templates |
| Agnostic boundary | **Strictly enforced** — describe bounded contexts and flows, not frameworks |
| Traceability | Map bounded contexts to RF/RNF; record ubiquitous language terms |

**Key Checks**: `[CHECK-AGNOSTIC-BOUNDARY]` · `[CHECK-PHASE-CONTEXT]` · `[CHECK-TRACEABILITY]`

**Done Criteria**:
- [ ] All bounded contexts named and described
- [ ] Context map shows relationships
- [ ] Domain events listed
- [ ] Ubiquitous language terms defined and consistent with glossary

---

## Phase 4 — Data Model

**What This Phase Is**: Entities, aggregates, relationships, ERD, data flows. Traces to Design.

| Item | Value |
|------|-------|
| Required input | Phase 3 bounded contexts and aggregates |
| Key templates | `TEMPLATE-011` (entities), `TEMPLATE-012` (ERD), `TEMPLATE-013` (data flows) |
| Agnostic boundary | **Strictly enforced** — describe entity structures, not database schemas |
| Traceability | Map entities to bounded contexts and requirements |

**Key Checks**: `[CHECK-AGNOSTIC-BOUNDARY]` · `[CHECK-PHASE-CONTEXT]`

**Done Criteria**:
- [ ] All aggregates have entity definitions
- [ ] ERD diagram present (Mermaid preferred)
- [ ] No database-specific types or constraints

---

## Phase 5 — Planning

**What This Phase Is**: Product roadmap, epics, use cases, milestones, versioning strategy, issue mapping. Traces to Requirements and Design. This is the SDLC planning — distinct from the meta-planning system in `planning/`.

> ⚠️ **Important distinction**: `01-templates/05-planning/` documents the **product roadmap and delivery plan** for the project being documented. The `planning/` root directory is the **workflow management system** for documentation work. These are two different things.

| Item | Value |
|------|-------|
| Required input | Phase 2 requirements (scope matrix), Phase 3 bounded contexts |
| Key templates | `TEMPLATE-014` (roadmap), `TEMPLATE-015` (epics), `TEMPLATE-016` (versioning), `TEMPLATE-017` (use cases), `TEMPLATE-018` (milestones), `TEMPLATE-019` (issue mapping) |
| Agnostic boundary | **Strictly enforced** — roadmap describes capabilities, not tech stacks |
| Chain requirement | Roadmap → Epics → Use Cases → Milestones → Issue Mapping must be internally consistent |

**Key Checks**: `[CHECK-AGNOSTIC-BOUNDARY]` · `[CHECK-PHASE-CONTEXT]` · `[CHECK-PHASE5-CHAIN]`

**Done Criteria**:
- [ ] Roadmap has at least one phase defined with goal and capabilities
- [ ] Each capability traces to at least one RF/RNF
- [ ] Epics reference roadmap phases
- [ ] Use cases map to bounded contexts from Phase 3
- [ ] Milestones map to epics
- [ ] Issue mapping covers all milestones
- [ ] Versioning strategy defines MAJOR.MINOR.PATCH semantics
- [ ] No technology names anywhere

---

## Phase 6 — Development

**What This Phase Is**: Hexagonal architecture, API contracts, coding standards, ADRs. Technology-specific — names frameworks, databases, languages.

| Item | Value |
|------|-------|
| Required input | Phase 3 design, Phase 4 data model, Phase 5 epics |
| Key templates | ADR (`TEMPLATE-020`), API endpoint templates, coding standards, architecture dimensions |
| Agnostic boundary | **Not enforced** — technology names are expected and required |
| Traceability | ADRs must reference the requirement or design decision that motivated them |

**Key Checks**: `[CHECK-PHASE-CONTEXT]`

**Done Criteria**:
- [ ] Architecture diagram shows hexagonal layers
- [ ] At least one ADR per major architecture decision
- [ ] API contracts defined for all external-facing endpoints

### Phase 6 — Dev Workflow sub-area

The `06-development/workflow/` sub-area documents git workflow conventions, commit standards, PR process, and CI/CD pipelines. This is a project-specific configuration.

| Item | Value |
|------|-------|
| Key templates | `workflow/branches/`, `workflow/commits/`, `workflow/pull-requests/`, `workflow/cicd/` |
| Agnostic boundary | **Not enforced** — specific tools (GitHub, GitLab, ArgoCD) are expected |
| Consistency requirement | Branch strategy, commit types, PR merge strategy, and CI/CD environments must be mutually consistent |

**Key Checks**: `[CHECK-DEVWORKFLOW-CONSISTENCY]` · `[CHECK-VERSIONING-ALIGNMENT]`

**Done Criteria**:
- [ ] Branch strategy defined (GitFlow or Trunk-Based)
- [ ] Commit type vocabulary matches actual PR and CI stage names
- [ ] PR merge strategy consistent with branch strategy
- [ ] CI/CD environments match deployment phase environments

---

## Phase 7 — Testing

**What This Phase Is**: Test strategy and test plans. Traces to requirements (RF/RNF) and use cases (Phase 5).

| Item | Value |
|------|-------|
| Required input | Phase 2 requirements, Phase 5 use cases |
| Key templates | `TEMPLATE-028` (test strategy), `TEMPLATE-029` (test plan) |
| Traceability | Each test case should reference a UC or RF |

**Done Criteria**:
- [ ] Test strategy defines scope, types, and tools
- [ ] Test plan has at least one case per use case
- [ ] Non-functional requirements have performance/security test cases

---

## Phase 8 — Deployment

**What This Phase Is**: CI/CD pipeline definition, environment matrix, release process. Traces to dev workflow and versioning strategy.

| Item | Value |
|------|-------|
| Required input | Phase 6 dev workflow (branch strategy, CI/CD), Phase 5 versioning strategy |
| Key templates | `TEMPLATE-031` (CI/CD pipeline) |
| Consistency requirement | Environments (dev/staging/prod) must match Phase 6 CI/CD environments; release tags must follow Phase 5 versioning |

**Key Checks**: `[CHECK-VERSIONING-ALIGNMENT]`

**Done Criteria**:
- [ ] Pipeline stages defined (lint, test, build, deploy)
- [ ] Environments mapped to branch triggers
- [ ] Release process references versioning strategy

---

## Phase 9 — Operations

**What This Phase Is**: Runbooks, incident response, SLAs. Traces to deployment.

| Item | Value |
|------|-------|
| Required input | Phase 8 environments |
| Key templates | `TEMPLATE-034` (runbooks) |

**Done Criteria**:
- [ ] At least one runbook per critical operation
- [ ] Incident severity levels defined

---

## Phase 10 — Monitoring

**What This Phase Is**: Metrics, alerts, dashboards. Traces to non-functional requirements.

| Item | Value |
|------|-------|
| Required input | Phase 2 RNF (performance, availability), Phase 9 SLAs |
| Key templates | `TEMPLATE-037` (metrics) |

**Done Criteria**:
- [ ] Each RNF has at least one metric
- [ ] Alert thresholds defined for critical metrics

---

## Phase 11 — Feedback

**What This Phase Is**: Retrospectives, user feedback collection. Closes the loop to Discovery.

| Item | Value |
|------|-------|
| Required input | Phase 1 actors, Phase 5 success criteria |
| Key templates | `TEMPLATE-040` (user feedback) |

**Done Criteria**:
- [ ] Feedback collection method defined per actor type
- [ ] Retrospective format references Phase 5 success criteria

---

> [← WORKFLOWS/README.md](README.md)
