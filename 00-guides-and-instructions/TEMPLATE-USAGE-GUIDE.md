# Template Usage Guide

You are an AI agent generating SDLC documentation using this template framework. This guide defines the required output structure for each phase: which files you must generate, what each file must contain, the format for each section, and what a completed document looks like. Use this guide as your structural reference whenever you generate documentation for any phase.

## General Rules

These rules apply to every document you generate across all phases. Violating them is a defect, not a style choice.

### Phase Discipline

The agnostic/specific boundary is strictly enforced. Apply it without exception:

- **Discovery & Requirements (Phases 1–2)**: Focus on "WHAT" and "WHY"
  - ✅ User needs, business constraints, capabilities
  - ❌ Technology names, frameworks, implementation details

- **Design & Beyond (Phases 3+)**: Include "HOW"
  - ✅ Architecture, technology choices, implementation patterns
  - ❌ Unresolved business questions from earlier phases

### Completable Section Markers

Each template includes sections marked with one of the following labels. These labels tell you the expected source of content:

- `[ COMPLETABLE BY HUMAN ]` — Do not generate this; leave it blank for the human collaborator to fill
- `[ COMPLETABLE BY AI ]` — Generate a draft; the human reviews and approves
- `[ RECOMMENDED BY AI ]` — You may suggest content; the human decides whether to keep it

### Example Sections

Each template includes an `EXAMPLE` subsection showing what a filled-in version looks like. Use these as your calibration target for quality and specificity. Your output should be at least as specific as the example.

---

## Phase 1: Discovery

Discovery documents establish the problem, the vision, the actors, and the scope of the system. Every document you generate in this phase must be technology agnostic and traceable to a real business need.

**Output location**: `01-templates/data-output/01-discovery/`  
**Participants who review**: Product, UX, business stakeholders  
**Key outputs**: Vision, scope, actors, needs

### Files to Generate

**`01-discovery/README.md`**

This file is the navigation index for the Discovery phase. It must orient anyone reading the phase for the first time.

- [ ] Copy template structure
- [ ] Add project name and brief description
- [ ] List all files in the phase with a one-line description of each

**`01-discovery/context-motivation.md`**

This document answers: why does this project exist? It establishes the problem, the market context, and the strategic rationale.

- [ ] **Vision**: 1-2 sentence vision statement
- [ ] **Mission**: Why does this project exist?
- [ ] **Motivation**: What specific problem does it solve?
- [ ] **Success Criteria**: How will we know it succeeded?
- [ ] **Constraints**: Legal, compliance, business constraints
- [ ] **Timeline**: Expected timeline and key milestones

**`01-discovery/actors-and-personas.md`**

This document identifies every human or system actor that interacts with the product. Each actor must include enough detail to drive design decisions.

- [ ] Identify all user types and system actors
- [ ] For each actor:
  - [ ] Name and description
  - [ ] Goals and pain points
  - [ ] Key needs
  - [ ] How they interact with the system

**`01-discovery/scope-and-boundaries.md`**

This document makes the system boundary explicit. In-scope items must be traceable to requirements; out-of-scope items must have a stated rationale.

- [ ] **In Scope**: What will the system do in the current phase?
- [ ] **Out of Scope**: What it will not do (with rationale for each item)
- [ ] **Phase 1 Goals**: What defines the MVP?
- [ ] **Future Phases**: What comes after the MVP?

---

## Phase 2: Requirements

Requirements documents translate Discovery outputs into specific, verifiable conditions the system must meet. Every requirement must trace to a Discovery actor or need.

**Output location**: `01-templates/data-output/02-requirements/`  
**Participants who review**: Product, Engineering, UX  
**Key outputs**: Functional & non-functional requirements

### Files to Generate

**`02-requirements/README.md`**

The index for the Requirements phase. It must provide a complete overview of what is documented here and link to Discovery.

- [ ] Copy template structure
- [ ] Link to all Discovery documents
- [ ] Provide overview of how requirements are organized

**`02-requirements/functional-requirements.md`**

This file contains all functional requirements using a consistent format. Every requirement must specify the actor, trigger, flow, and acceptance criteria.

Format each requirement as:
```
## [FR-001] Requirement Title

**Description**: What the system must do

**Actor**: Who performs this
**Trigger**: When does it happen?
**Main Flow**: Step-by-step happy path
**Exception Flows**: Error cases and alternatives

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Assumptions**: What we assume to be true
**Dependencies**: Other requirements this depends on
```

**`02-requirements/non-functional-requirements.md`**

This file contains all non-functional requirements. Each NFR must be measurable and tied to a justification from Discovery.

For each NFR:
```
## [NFR-001] Performance

**Category**: Performance, Security, Scalability, Usability, Maintainability, etc.

**Requirement**: Specific, measurable target

**Rationale**: Why this matters

**Measurement**: How we will verify it
```

**`02-requirements/scope-boundaries.md`**

This document maps each requirement to a delivery phase, making the MVP boundary explicit.

Create a matrix:
```
| Requirement | Phase 1 | Phase 2 | Phase 3 | Notes |
|-------------|---------|---------|---------|-------|
| Feature X   | In      |         |         | MVP   |
| Feature Y   |         | In      |         |       |
| Feature Z   |         |         | In      | Future|
```

**`02-requirements/traceability-matrix.md`**

This document links every requirement to its Discovery source. It must be kept in sync with any changes to requirements or actors.

Link requirements to discovery:
```
| Requirement | Actor | Business Need | Priority |
|-------------|-------|---------------|----------|
| FR-001      | User  | Need X        | Must     |
```

---

## Phase 3: Design

Design documents describe how the system flows and how the domain is structured. Flows must trace to requirements; domain models must trace to bounded contexts.

**Output location**: `01-templates/data-output/03-design/`  
**Participants who review**: UX/UI, Architecture, Product  
**Key outputs**: System flows, wireframes, design decisions

### Files to Generate

**`03-design/system-flows.md`**

This file documents the main user-facing processes as step-by-step flows with Mermaid diagrams. Every major flow must cover the happy path and at least one exception path.

For each major flow (e.g., User Login, Create Order):
```
## [SF-001] Happy Path: Login Flow

**Actors**: User, System, Auth Service
**Preconditions**: User has account, app is open
**Main Steps**:
1. User enters email/password
2. System validates credentials
3. System generates auth token
4. User is logged in

**Postconditions**: User has active session

**Exception**: Invalid credentials
1. System shows error
2. User can retry
```

**`03-design/ui-ux-design.md`**

This file documents the UI structure for each screen. It captures what components exist and how they behave — not how they look visually.

For each screen/component:
```
## [UI-001] Login Screen

**Purpose**: Allow user to authenticate

**Layout**:
- Header: App logo
- Form: Email input, password input
- Button: Login
- Link: Forgot password

**Interactions**:
- Form validation on blur
- Error messages below fields
- Loading state during submission

**Accessibility**: WCAG 2.1 AA compliant
```

**`03-design/process-decisions.md`**

This file documents each significant design decision with its rationale and alternatives considered. Every major design choice must have an entry here.

For each significant decision:
```
## [DD-001] Authentication Method

**Question**: How will users authenticate?

**Options Considered**:
1. Email/password
2. OAuth 2.0
3. SAML

**Decision**: Email/password

**Rationale**: Simplicity for MVP, can add OAuth later

**Consequences**: 
- Pro: Fast to implement
- Con: Must manage password security

**Alternatives Rejected**: OAuth (over-engineering for MVP), SAML (enterprise-only)
```

---

## Phase 4: Data Model

Data model documents define the structure, relationships, and movement of data through the system. Every entity must correspond to a domain concept from the Design phase.

**Output location**: `01-templates/data-output/04-data-model/`  
**Participants who review**: Architects, Backend leads  
**Key outputs**: ERD, data flows, validation rules

### Files to Generate

**`04-data-model/entities-and-relationships.md`**

This file defines each entity with its attributes, constraints, and relationships. It is the authoritative source of truth for the data structure.

For each entity:
```
## Entity: User

**Primary Key**: user_id (UUID)

**Attributes**:
- user_id: UUID, primary key
- email: String, unique, not null
- created_at: Timestamp

**Relationships**:
- Has many Orders (1:N)
- Has one Profile (1:1)

**Constraints**:
- Email must be unique
- Email must be valid format

**Notes**: Users soft-deleted with is_deleted flag
```

**`04-data-model/erd-diagram.md`**

This file contains the Entity Relationship Diagram (Mermaid format) and a narrative explanation of the relationships. The diagram must match the entities file exactly.

```
User
├── user_id (PK)
├── email
└── created_at

Order
├── order_id (PK)
├── user_id (FK → User)
└── created_at

OrderItem
├── order_item_id (PK)
├── order_id (FK → Order)
└── product_id (FK → Product)
```

**`04-data-model/data-flows.md`**

This file describes how data moves through the system at the process level. It connects system flows from Phase 3 to the entities defined in this phase.

How data moves:
- User enters data → Validation → Storage → Cache → Retrieval → Display

---

## Phase 5: Planning

Planning documents organize requirements into a delivery roadmap and break them into executable epics. Every epic must trace to at least one functional requirement.

**Output location**: `01-templates/data-output/05-planning/`  
**Participants who review**: Product, Engineering leads  
**Key outputs**: Roadmap, epics, sprint plan

### Files to Generate

**`05-planning/roadmap.md`**

This file defines the product roadmap at the quarter or milestone level. Each milestone must list which requirements it delivers.

```
## Q1 2024: MVP
- [ ] User authentication
- [ ] Basic CRUD operations
- [ ] Dashboard

## Q2 2024: Enhanced Features
- [ ] Advanced search
- [ ] Reporting
- [ ] API documentation

## Q3 2024: Scaling
- [ ] Performance optimization
- [ ] Advanced caching
- [ ] Multi-region support
```

**`05-planning/epics.md`**

This file groups functional requirements into epics. Each epic must have a clear scope boundary and estimated size.

For each epic:
```
## Epic: User Authentication

**Description**: Implement secure user authentication

**User Stories**:
- Story 1: User can sign up
- Story 2: User can log in
- Story 3: User can reset password

**Acceptance Criteria**:
- [ ] All stories completed and tested
- [ ] Security review passed

**Estimated Size**: 13 points
**Priority**: Must-have for MVP
```

---

## Phase 6: Development

Development documents are the first phase where you name specific technologies. Every architectural decision must reference prior requirements and design artifacts.

**Output location**: `01-templates/data-output/06-development/`  
**Participants who review**: All engineers  
**Key outputs**: Architecture, APIs, coding standards

### Files to Generate

**`06-development/architecture.md`**

This file defines the system architecture using the Hexagonal Architecture pattern. It must map each layer to bounded contexts from the Design phase.

Hexagonal architecture structure to document:
```
## Hexagonal Architecture

### Core (Domain)
- Entities, Value Objects, Aggregates
- Business Rules
- No external dependencies

### Ports
- Input Ports (Use Cases, Commands)
- Output Ports (Repositories, Services)

### Adapters
- Web Controllers → Input Adapters
- Database → Output Adapter
- Email Service → Output Adapter

## Layer Diagram
[Draw your architecture]
```

**`06-development/api-design.md`**

This file specifies every API endpoint the system exposes. Each endpoint must include request/response examples and status codes.

For each endpoint:
```
## [API-001] POST /users/login

**Description**: Authenticate user

**Request**:
{
  "email": "user@example.com",
  "password": "secret"
}

**Response** (200):
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}

**Status Codes**:
- 200: Success
- 400: Invalid input
- 401: Invalid credentials
- 500: Server error
```

**`06-development/coding-standards.md`**

This file defines language-specific conventions that all engineers must follow. It must be specific enough that a new team member can apply it without asking questions.

Required sections:
- Naming conventions (files, classes, functions, variables)
- Code organization (folder structure, layer separation)
- Comment standards (when and how to comment)
- Import ordering
- Error handling patterns
- Logging standards

---

## Phase 7: Testing

Testing documents define the strategy, test cases, and security approach. Every test case must trace to at least one acceptance criterion from Phase 2.

**Output location**: `01-templates/data-output/07-testing/`  
**Participants who review**: QA, Backend, Frontend  
**Key outputs**: Test plans, coverage goals

### Files to Generate

**`07-testing/test-strategy.md`**

This file defines the testing pyramid and coverage targets for the project. It is the governing document for all testing decisions.

```
## Test Pyramid

**Unit Tests** (70%)
- Individual functions and classes
- Mock external dependencies
- Target: >80% coverage

**Integration Tests** (20%)
- Component interactions
- Database integration
- API endpoint testing

**E2E Tests** (10%)
- User workflows
- Critical paths only
```

**`07-testing/test-plan.md`**

This file contains test cases for each feature. Each case must include preconditions, steps, expected results, and variation scenarios.

For each feature:
```
## Test Case: User Login

**Preconditions**: User exists with valid email/password

**Test Steps**:
1. Navigate to login page
2. Enter valid email
3. Enter valid password
4. Click login

**Expected Result**: Redirected to dashboard, session created

**Variations**:
- Invalid email → Error message
- Wrong password → Error message
- Account locked → Specific error
```

---

## Phase 8: Deployment

Deployment documents define how the system is built, tested, and released automatically. The CI/CD pipeline must cover all environments and include rollback procedures.

**Output location**: `01-templates/data-output/08-deployment/`  
**Participants who review**: DevOps, Backend leads  
**Key outputs**: CI/CD pipelines, release process

### Files to Generate

**`08-deployment/ci-cd-pipeline.md`**

This file defines every stage of the CI/CD pipeline. Each stage must specify its inputs, actions, and pass/fail conditions.

```
## Pipeline Stages

### Commit Stage
- Code checkout
- Unit tests
- Linting
- Coverage check

### Integration Stage
- Integration tests
- API contract tests
- Database migrations test

### Staging Stage
- Deploy to staging
- Smoke tests
- Performance tests

### Production
- Manual approval
- Blue-green deploy
- Health check
- Rollback if needed
```

**`08-deployment/release-process.md`**

This file provides a step-by-step release checklist. Every item must be verifiable — no ambiguous or judgment-based criteria.

```
## Release Checklist

- [ ] Code review complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Migration scripts tested
- [ ] Staging verification
- [ ] Release notes prepared
- [ ] Rollback plan ready
- [ ] Stakeholders notified
```

---

## Phase 9: Operations

Operations documents enable the team to run, maintain, and restore the system in production. Runbooks must be executable by an on-call engineer without additional context.

**Output location**: `01-templates/data-output/09-operations/`  
**Participants who review**: DevOps, SRE, Ops  
**Key outputs**: Runbooks, SLA, incident response

### Files to Generate

**`09-operations/runbooks.md`**

This file contains step-by-step procedures for common operational tasks. Each runbook must be independently executable without requiring knowledge of other runbooks.

For each operational task:
```
## Runbook: Restart Service

**When to use**: Service is unresponsive or in a bad state

**Procedure**:
1. Verify the issue: `systemctl status myapp`
2. Check logs: `tail -f /var/log/myapp.log`
3. Restart: `systemctl restart myapp`
4. Verify recovery: `curl http://localhost:8080/health`
5. Alert on-call if not recovered

**Rollback**: If issues persist, rollback to previous version
```

**`09-operations/sla.md`**

This file defines service level targets and response time expectations. All targets must be agreed upon by the business and engineering teams before this document is finalized.

```
## Service Level Agreement

**Availability Target**: 99.9% uptime

**Response Times**:
- Critical: 15 minutes
- High: 1 hour
- Medium: 4 hours
- Low: 1 business day

**Maintenance Windows**: 2am-4am UTC, Sundays
```

---

## Phase 10: Monitoring

Monitoring documents define what is measured, when alerts fire, and what the dashboards display. Metrics must connect to NFRs from Phase 2.

**Output location**: `01-templates/data-output/10-monitoring/`  
**Participants who review**: DevOps, Backend, SRE  
**Key outputs**: Metrics, alerts, dashboards

### Files to Generate

**`10-monitoring/metrics.md`**

This file defines the key metrics tracked across system health, application performance, and business outcomes. Each metric must have a defined target value.

```
## Key Metrics

### System Health
- CPU usage: < 80%
- Memory: < 85%
- Disk: < 90%

### Application
- Request latency p95: < 200ms
- Error rate: < 0.1%
- Throughput: > 1000 req/s

### Business
- Daily active users
- Feature adoption rate
- Error budget remaining
```

**`10-monitoring/alerts.md`**

This file defines alert rules and their escalation paths. Every alert must have a defined severity and a linked runbook.

```
## Alert Rules

### Critical
- CPU > 90% for 5 min → Page on-call
- Error rate > 5% → Page on-call
- Response latency p95 > 1s → Page on-call

### Warning
- CPU > 80% for 10 min → Notify team
- Error rate > 1% → Notify team
```

---

## Phase 11: Feedback

Feedback documents capture retrospective learnings and user input. They are primarily human-authored — your role is to provide the structure and consolidate provided inputs.

**Output location**: `01-templates/data-output/11-feedback/`  
**Participants who review**: All team members  
**Key outputs**: Lessons learned, improvements

### Files to Generate

**`11-feedback/retrospectives.md`**

This file captures the outcome of each sprint or project retrospective. Generate the template structure; the human collaborator fills in the actual content.

After each sprint:
```
## Sprint 5 Retrospective

**Date**: 2024-02-16

**What Went Well**:
- Good API design
- Smooth deployment
- Strong code review process

**What Could Improve**:
- Testing took longer than expected
- Communication between frontend/backend
- Documentation lag

**Action Items**:
- [ ] Improve test automation (assign: @john)
- [ ] Daily standups (start next sprint)
- [ ] Document as we go (all)
```

**`11-feedback/lessons-learned.md`**

This file captures significant learnings that should influence future projects. Generate the template; content comes from the team.

```
## Architectural Decision: DDD vs Traditional

**Context**: Building complex domain logic

**Decision**: Use DDD principles

**Lessons**:
- DDD helped with team communication
- Bounded contexts were crucial for scaling
- Initial learning curve, but paid off

**For Next Project**: Invest upfront in DDD training
```

---

## Common Patterns

These patterns apply across all phases and all document types. Apply them consistently to ensure coherent cross-phase documentation.

### Linked References

Connect documents across phases using markdown links with anchors:
```markdown
See [FR-001](../02-requirements/functional-requirements.md#fr-001) for details.
```

### Completion Tracking

Use checkboxes to track document completion status:
```markdown
- [ ] Item not done
- [x] Item completed
```

### Examples

Always include an `EXAMPLE` section in every document you generate:
```markdown
## EXAMPLE

### Example Requirement
[Show what a filled-in version looks like for this specific project]
```

---

**Next**: AI-WORKFLOW-GUIDE.md — Use this with AI co-creation
