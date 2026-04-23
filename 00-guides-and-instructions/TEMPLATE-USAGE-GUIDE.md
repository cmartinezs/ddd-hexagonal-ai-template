# Template Usage Guide

## How to Use This Template

This guide explains how to fill in each section of the DDD Hexagonal AI Template.

## General Rules

### Phase Discipline
- **Discovery & Requirements (Phases 1-2)**: Focus on "WHAT" and "WHY"
  - ✅ User needs, business constraints, capabilities
  - ❌ Technology names, frameworks, implementation details
  
- **Design & Beyond (Phases 3+)**: Include "HOW"
  - ✅ Architecture, technology choices, implementation patterns
  - ❌ Unresolved business questions from earlier phases

### Completable Sections
Each template includes sections marked:
- `[ COMPLETABLE BY HUMAN ]` — Easy to fill manually
- `[ COMPLETABLE BY AI ]` — AI can generate drafts, human reviews
- `[ RECOMMENDED BY AI ]` — AI agents can help explore

### Example Sections
Each template includes a "EXAMPLE" subsection showing what a filled-in version looks like. Use these as templates.

---

## Phase 1: Discovery

**Duration**: 1-2 weeks  
**Participants**: Product, UX, business stakeholders  
**Output**: Vision, scope, actors, needs

### Files to Complete

**`01-templates/01-discovery/README.md`**
- [ ] Copy template structure
- [ ] Add project name and brief description
- [ ] List key files to complete

**`01-templates/01-discovery/TEMPLATE-context-motivation.md`**
- [ ] **Vision**: 1-2 sentence vision statement
- [ ] **Mission**: Why does this project exist?
- [ ] **Motivation**: What problem does it solve?
- [ ] **Success Criteria**: How will we know it's successful?
- [ ] **Constraints**: Legal, compliance, technical constraints
- [ ] **Timeline**: Expected timeline

**`01-templates/01-discovery/actors-and-personas.md`**
- [ ] Identify all user types and system actors
- [ ] For each actor:
  - [ ] Name and description
  - [ ] Goals and pain points
  - [ ] Key needs
  - [ ] How they interact with the system

**`01-templates/01-discovery/scope-and-boundaries.md`**
- [ ] **In Scope**: What will the system do?
- [ ] **Out of Scope**: What it won't do (with rationale)
- [ ] **Phase 1 Goals**: What's the MVP?
- [ ] **Future Phases**: What comes later?

---

## Phase 2: Requirements

**Duration**: 1-2 weeks  
**Participants**: Product, Engineering, UX  
**Output**: Functional & non-functional requirements

### Files to Complete

**`01-templates/02-requirements/README.md`**
- [ ] Copy template structure
- [ ] Link to discovery documents
- [ ] Overview of requirements organization

**`01-templates/02-requirements/functional-requirements.md`**

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

**`01-templates/02-requirements/non-functional-requirements.md`**

For each NFR:
```
## [NFR-001] Performance

**Category**: Performance, Security, Scalability, Usability, Maintainability, etc.

**Requirement**: Specific, measurable target

**Rationale**: Why this matters

**Measurement**: How we'll verify it
```

**`01-templates/02-requirements/scope-boundaries.md`**

Create a matrix:
```
| Requirement | Phase 1 | Phase 2 | Phase 3 | Notes |
|-------------|---------|---------|---------|-------|
| Feature X   | In      |         |         | MVP   |
| Feature Y   |         | In      |         |       |
| Feature Z   |         |         | In      | Future|
```

**`01-templates/02-requirements/traceability-matrix.md`**

Link requirements to discovery:
```
| Requirement | Actor | Business Need | Priority |
|-------------|-------|---------------|----------|
| FR-001      | User  | Need X        | Must     |
```

---

## Phase 3: Design

**Duration**: 1-2 weeks  
**Participants**: UX/UI, Architecture, Product  
**Output**: System flows, wireframes, design decisions

### Files to Complete

**`01-templates/03-design/system-flows.md`**

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

**`01-templates/03-design/ui-ux-design.md`**

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

**`01-templates/03-design/process-decisions.md`**

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

**Duration**: 1 week  
**Participants**: Architects, Backend leads  
**Output**: ERD, data flows, validation rules

### Files to Complete

**`01-templates/04-data-model/entities-and-relationships.md`**

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

**`01-templates/04-data-model/erd-diagram.md`**

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

**`01-templates/04-data-model/data-flows.md`**

How data moves:
- User enters data → Validation → Storage → Cache → Retrieval → Display

---

## Phase 5: Planning

**Duration**: 1 week  
**Participants**: Product, Engineering leads  
**Output**: Roadmap, epics, sprint plan

### Files to Complete

**`01-templates/05-planning/roadmap.md`**

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

**`01-templates/05-planning/epics.md`**

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

**Duration**: Main development phase  
**Participants**: All engineers  
**Output**: Code, architecture, APIs

### Files to Complete

**`01-templates/06-development/architecture.md`**

Hexagonal architecture focus:
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

**`01-templates/06-development/api-design.md`**

For each endpoint:
```
## [API-001] POST /users/login

**Description**: Authenticate user

**Request**:
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response** (200):
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

**Status Codes**:
- 200: Success
- 400: Invalid input
- 401: Invalid credentials
- 500: Server error
```

**`01-templates/06-development/coding-standards.md`**

Language-specific rules:
- Naming conventions
- Code organization
- Comment expectations
- Import ordering
- Error handling
- Logging standards

---

## Phase 7: Testing

**Duration**: Parallel with development  
**Participants**: QA, Backend, Frontend  
**Output**: Test plans, coverage goals

### Files to Complete

**`01-templates/07-testing/test-strategy.md`**

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

**`01-templates/07-testing/test-plan.md`**

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

**Duration**: Parallel with development  
**Participants**: DevOps, Backend leads  
**Output**: CI/CD pipelines, release process

### Files to Complete

**`01-templates/08-deployment/ci-cd-pipeline.md`**

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
- Healthcheck
- Rollback if needed
```

**`01-templates/08-deployment/release-process.md`**

```
## Release Checklist

- [ ] Code review complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Migration scripts tested
- [ ] Staging verification
- [ ] Release notes prepared
- [ ] Rollback plan ready
- [ ] Notify stakeholders
```

---

## Phase 9: Operations

**Duration**: Post-launch  
**Participants**: DevOps, SRE, Ops  
**Output**: Runbooks, SLA, incident response

### Files to Complete

**`01-templates/09-operations/runbooks.md`**

For each operational task:
```
## Runbook: Restart Service

**When to use**: Service is unresponsive or in bad state

**Procedure**:
1. Verify the issue: `systemctl status myapp`
2. Check logs: `tail -f /var/log/myapp.log`
3. Restart: `systemctl restart myapp`
4. Verify recovery: `curl http://localhost:8080/health`
5. Alert on-call if not recovered

**Rollback**: If issues persist, rollback to previous version
```

**`01-templates/09-operations/sla.md`**

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

**Duration**: Establish early, evolve  
**Participants**: DevOps, Backend, SRE  
**Output**: Metrics, alerts, dashboards

### Files to Complete

**`01-templates/10-monitoring/metrics.md`**

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

**`01-templates/10-monitoring/alerts.md`**

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

**Duration**: Continuous  
**Participants**: All team members  
**Output**: Lessons learned, improvements

### Files to Complete

**`01-templates/11-feedback/retrospectives.md`**

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

**`01-templates/11-feedback/lessons-learned.md`**

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

### Linked References
Use markdown links to connect across phases:
```markdown
See [FR-001](../01-templates/02-requirements/functional-requirements.md#fr-001) for details.
```

### Completion Tracking
Use checkboxes:
```markdown
- [ ] Item not done
- [x] Item completed
```

### Examples
Always include an "EXAMPLE" section:
```markdown
## EXAMPLE

### Example Requirement
[Show what a filled-in version looks like]
```

---

## Tips & Best Practices

1. **Start Early**: Begin documentation from day 1, update continuously
2. **Keep it Simple**: Templates are guides, not scripts; adapt to your project
3. **Use Examples**: Copy example sections and modify them
4. **Review & Validate**: Get stakeholder sign-off at each phase
5. **Version Control**: Commit docs like code, track changes
6. **Link Across Phases**: Create traceability from discovery → code → tests
7. **Automate**: Generate parts of documentation from code (APIs, schemas)
8. **Keep it Live**: Update docs when reality changes, don't let them rot

---

**Next**: AI-WORKFLOW-GUIDE.md — Use this with AI co-creation
