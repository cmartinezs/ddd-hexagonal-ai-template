# Template Architecture

You are an AI agent working within a 12-phase SDLC documentation framework. This document explains the architectural design of the framework: why each phase exists, what it produces, and how phases connect. Read this document when you need to make structural decisions, understand why a phase is organized the way it is, or adapt the framework for an atypical project.

## Phase Structure

The framework organizes documentation into 12 phases, each with a clear focus, a set of key files, and specific deliverables. The phases are designed to flow sequentially, with each phase's output serving as input for the next. Understanding this structure allows you to generate documentation that is coherent, traceable, and complete.

### Phase 0: Planning & Framework (`01-templates/00-documentation-planning/`)

This phase establishes the documentation conventions and SDLC framework for a specific project. It produces no product documentation — its output is the governance structure that governs all subsequent phases.

**Key Files**:
- `sdlc-framework.md` — Detailed SDLC phases and their relationships
- `macro-plan.md` — Phase-by-phase status and progress tracking
- `navigation-conventions.md` — Rules for organizing and linking documentation

**Deliverables**:
- [ ] SDLC framework customized for the project
- [ ] Navigation conventions defined
- [ ] Macro plan template initialized

---

### Phase 1: Discovery (`01-templates/01-discovery/`)

Discovery answers the question: why does this project exist and who is it for? It must remain strictly technology agnostic — no frameworks, languages, or infrastructure may appear in these documents.

**Discipline**: Focus on "WHAT" — never mention technologies, frameworks, or implementation details.

**Key Files**:
- `README.md` — Discovery overview and structure
- `TEMPLATE-context-motivation.md` — Project context and motivation
- `actors-and-personas.md` — Key actors and their goals
- `scope-and-boundaries.md` — What is in and out of scope

**Deliverables**:
- [ ] Vision and mission statement
- [ ] Key actors and personas identified
- [ ] Business needs and constraints documented
- [ ] Assumptions and dependencies listed

---

### Phase 2: Requirements (`01-templates/02-requirements/`)

Requirements translate Discovery findings into specific, verifiable conditions the system must meet. Every requirement must trace to a Discovery actor or need. This phase is still technology agnostic.

**Discipline**: Focus on "WHAT" — no technology-specific details.

**Key Files**:
- `README.md` — Requirements overview
- `functional-requirements.md` — FR with examples and acceptance criteria
- `non-functional-requirements.md` — NFRs (performance, security, scalability, etc.)
- `scope-boundaries.md` — Clear in/out scope matrix
- `traceability-matrix.md` — Link requirements to discovery

**Deliverables**:
- [ ] Functional requirements (user stories with acceptance criteria)
- [ ] Non-functional requirements (SLA, performance, security targets)
- [ ] Scope boundaries clearly defined
- [ ] Requirements prioritized (MoSCoW or similar)
- [ ] Traceability matrix created

---

### Phase 3: Design (`01-templates/03-design/`)

Design translates requirements into system flows, UI structures, and domain models. Every flow must trace to at least one requirement; every bounded context must trace to a business domain.

**Key Files**:
- `README.md` — Design overview
- `system-flows.md` — Happy paths and edge cases
- `ui-ux-design.md` — Wireframes, mockups, interaction flows
- `process-decisions.md` — Key design choices and rationale

**Deliverables**:
- [ ] System flow diagrams (happy path + exception cases)
- [ ] UI/UX mockups and interaction flows
- [ ] Design system specifications
- [ ] Design decisions documented with rationale

---

### Phase 4: Data Model (`01-templates/04-data-model/`)

The Data Model phase defines entities, relationships, and data flows. It must align exactly with the domain concepts established in Phase 3. Every entity should correspond to a concept in the ubiquitous language.

**Key Files**:
- `README.md` — Data model overview
- `entities-and-relationships.md` — Entity definitions and relationships
- `erd-diagram.md` — Entity Relationship Diagram and explanations
- `data-flows.md` — How data moves through the system

**Deliverables**:
- [ ] Entity definitions with attributes
- [ ] Relationship diagrams (ERD)
- [ ] Data flow diagrams
- [ ] Data validation rules

---

### Phase 5: Planning (`01-templates/05-planning/`)

Planning organizes the approved requirements and design into a delivery roadmap and execution structure. It bridges the "what" phases with the "how" phases.

**Key Files**:
- `README.md` — Planning overview
- `roadmap.md` — High-level roadmap and milestones
- `epics.md` — Epics broken down with user stories
- `versioning-strategy.md` — Semantic versioning and release planning

**Deliverables**:
- [ ] Product roadmap (quarterly/yearly)
- [ ] Epics and user stories
- [ ] Sprint planning template
- [ ] Versioning strategy (e.g., semver)

---

### Phase 6: Development (`01-templates/06-development/`)

Development is the first phase where you may name specific technologies. It defines the technical architecture, APIs, coding standards, and implementation guidelines. Every technical decision must reference a prior requirement or design artifact.

**Key Files**:
- `README.md` — Development overview
- `architecture.md` — System architecture (hexagonal, layers, services)
- `api-design.md` — API specifications (REST, GraphQL, gRPC, etc.)
- `coding-standards.md` — Language-specific conventions
- `adr/` — Architecture Decision Records

**Deliverables**:
- [ ] Architecture diagrams (layers, services, ports/adapters)
- [ ] API specifications with examples
- [ ] Coding standards and style guide
- [ ] Technology stack documented

---

### Phase 7: Testing (`01-templates/07-testing/`)

Testing documents define the strategy, test plans, and security testing approach. Every test case must trace to at least one acceptance criterion from Phase 2.

**Key Files**:
- `README.md` — Testing overview
- `test-strategy.md` — Testing pyramid and coverage targets
- `test-plan.md` — Detailed test cases and scenarios
- `security-testing.md` — Security and penetration testing plan

**Deliverables**:
- [ ] Test strategy (unit, integration, e2e targets)
- [ ] Test cases and scenarios
- [ ] Security testing checklist
- [ ] Coverage goals defined

---

### Phase 8: Deployment (`01-templates/08-deployment/`)

Deployment documents define the CI/CD pipeline, environment configurations, and release processes. Pipelines must cover all environments and include rollback procedures.

**Key Files**:
- `README.md` — Deployment overview
- `ci-cd-pipeline.md` — Build, test, deploy automation
- `environments.md` — Dev, staging, production setup
- `release-process.md` — Release checklist and rollback plan

**Deliverables**:
- [ ] CI/CD pipeline definition
- [ ] Environment configurations
- [ ] Release process and checklist
- [ ] Rollback and hotfix procedures

---

### Phase 9: Operations (`01-templates/09-operations/`)

Operations documents enable teams to run, monitor, and restore the system in production. Runbooks must be executable by an on-call engineer without requiring additional context.

**Key Files**:
- `README.md` — Operations overview
- `runbooks.md` — Step-by-step operational procedures
- `incident-response.md` — Incident classification and response plan
- `sla.md` — Service Level Agreements and targets

**Deliverables**:
- [ ] Operational runbooks
- [ ] Incident response playbooks
- [ ] SLA definitions
- [ ] On-call procedures documented

---

### Phase 10: Monitoring (`01-templates/10-monitoring/`)

Monitoring documents define what is measured, when alerts trigger, and how dashboards are structured. Metrics must connect to NFRs from Phase 2.

**Key Files**:
- `README.md` — Monitoring overview
- `metrics.md` — Key metrics and KPIs
- `alerts.md` — Alert rules and thresholds
- `dashboards.md` — Dashboard specifications

**Deliverables**:
- [ ] Metrics and KPIs defined
- [ ] Alert rules configured
- [ ] Dashboards created
- [ ] Monitoring architecture documented

---

### Phase 11: Feedback (`01-templates/11-feedback/`)

Feedback documents capture retrospective learnings and user input. They close the loop from Phase 1 to Phase 11 by connecting measured outcomes back to original goals.

**Key Files**:
- `README.md` — Feedback overview
- `user-feedback.md` — User feedback and feature requests
- `retrospectives.md` — Sprint and project retrospectives
- `lessons-learned.md` — What went well, what to improve

**Deliverables**:
- [ ] User feedback summary
- [ ] Retrospective notes
- [ ] Lessons learned documented
- [ ] Improvement backlog created

---

### Backup & Reference (`01-templates/data-input/`)

This folder holds historical and reference materials that inform documentation but are not project deliverables. Store external specs, prior project decisions, and research materials here.

**Usage**:
- Previous project specifications
- Old architectural decisions
- Historical context for current decisions
- Reference implementations or examples

---

## Relationships & Dependencies

The following diagram shows the dependency chain between phases. Each phase depends on the outputs of the previous phase. Do not generate a phase without verifying the required inputs from the prior phase are available and complete.

```
01-templates/00-documentation-planning (Framework)
    ↓
01-templates/01-discovery (What + Why)
    ↓
01-templates/02-requirements (What exactly)
    ↓
01-templates/03-design (How it looks/flows)
    ↓
01-templates/04-data-model (Data structure)
    ↓
01-templates/05-planning (Implementation roadmap)
    ↓
01-templates/06-development (How to build it)
    ↓
01-templates/07-testing (How to verify it)
    ↓
01-templates/08-deployment (How to release it)
    ↓
01-templates/09-operations (How to run it)
    ↓
01-templates/10-monitoring (How to measure it)
    ↓
01-templates/11-feedback (Learn from it)
```

## Key Principles

These principles explain the design decisions behind the framework. Apply them when adapting the template or resolving ambiguity about how to organize content.

### 1. Progression
Each phase builds on the previous phase's deliverables. A phase without complete prior context produces low-quality, generic output. Always verify prior phase completeness before generating.

### 2. Phase Discipline
Respect the phase focus at all times. Discovery and Requirements never contain technology names. Development never contains unresolved business questions. Crossing these boundaries creates confusion and rework.

### 3. Completeness Before Advancement
Do not move to the next phase until the current phase's deliverables are complete and approved. Parallel execution is possible for independent features, but the phase dependency chain must be respected.

### 4. Traceability
Every artifact must trace backward to its source. Requirements trace to Discovery; Designs trace to Requirements; Tests trace to Acceptance Criteria. Traceability is how the team verifies that nothing was lost between phases.

### 5. Single Source of Truth
All documentation lives here. Other repositories link or submodule to this documentation. No duplicate documentation exists in other locations.

---

**Next**: TEMPLATE-USAGE-GUIDE.md — How to generate content for each section
