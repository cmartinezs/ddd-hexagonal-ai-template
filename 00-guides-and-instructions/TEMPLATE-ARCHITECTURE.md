# Template Architecture

## Overview

This template implements a complete SDLC (Software Development Lifecycle) framework organized into 12 phases, each with a specific focus and deliverables.

## Phase Structure

### Phase 0: Planning & Framework (`01-templates/00-documentation-planning/`)
**Purpose**: Establish the framework and conventions for documentation

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
**Purpose**: Understand context, vision, scope, actors, and business needs

**Discipline**: Focus on "WHAT" — never mention technologies, frameworks, or implementation

**Key Files**:
- `README.md` — Discovery overview and structure
- `TEMPLATE-context-motivation.md` — Project context and motivation
- `actors-and-personas.md` — Key actors and their goals
- `scope-and-boundaries.md` — What's in/out of scope

**Deliverables**:
- [ ] Vision and mission statement
- [ ] Key actors and personas identified
- [ ] Business needs and constraints documented
- [ ] Assumptions and dependencies listed

---

### Phase 2: Requirements (`01-templates/02-requirements/`)
**Purpose**: Define what the system must do (functional) and non-functional characteristics

**Discipline**: Focus on "WHAT" — no technology-specific details

**Key Files**:
- `README.md` — Requirements overview
- `functional-requirements.md` — RF with examples and acceptance criteria
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
**Purpose**: Define system flows, process decisions, and UI/UX

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
**Purpose**: Define entities, relationships, and data flows

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
**Purpose**: Define roadmap, epics, sprints, and versioning strategy

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
**Purpose**: Define architecture, APIs, coding standards, and implementation guidelines

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
**Purpose**: Define testing strategy, test plans, and security testing

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
**Purpose**: Define CI/CD pipelines, environments, and release processes

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
**Purpose**: Define runbooks, incident response, and SLAs

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
**Purpose**: Define metrics, alerts, and dashboards

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
**Purpose**: Collect and analyze feedback, retrospectives, and lessons learned

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
**Purpose**: Store historical material and reference documents

**Usage**:
- Previous project specifications
- Old architectural decisions
- Historical context for current decisions
- Reference implementations or examples

---

## Relationships & Dependencies

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

1. **Progression**: Each phase builds on previous deliverables
2. **Phase Discipline**: Respect the phase focus (e.g., no code in Discovery)
3. **Completeness**: Don't move to next phase until deliverables are done
4. **Traceability**: Link requirements through design → development → testing
5. **Single Source of Truth**: All docs live here; other repos link/submodule

---

**Next**: TEMPLATE-USAGE-GUIDE.md — How to fill in each section
