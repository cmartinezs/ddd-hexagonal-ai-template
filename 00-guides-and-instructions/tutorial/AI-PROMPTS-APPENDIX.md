[← Tutorial README](./README.md)

---

# AI Prompts Appendix

**What This Is**: A consolidated reference of all AI prompts from the 12 tutorial step files. Each prompt is self-contained with context, ready to copy-paste into an AI session.

**How to Use**: Browse by phase. Each prompt includes all necessary sections for generating the phase document. Fill in the bracketed placeholders with your project-specific details before running the prompt.

**Why It Matters**: Provides a single reference for all prompts without needing to open individual step files. Useful for AI agents running in autonomous mode or for teams that prefer a consolidated view.

**Owner**: DDD + Hexagonal AI Template contributors.

---

## Contents

1. [Phase 0: Documentation Planning](#phase-0-documentation-planning)
2. [Phase 1: Discovery](#phase-1-discovery)
3. [Phase 2: Requirements](#phase-2-requirements)
4. [Phase 3: Design](#phase-3-design)
5. [Phase 4: Data Model](#phase-4-data-model)
6. [Phase 5: Planning](#phase-5-planning)
7. [Phase 6: Development](#phase-6-development)
8. [Phase 7: Testing](#phase-7-testing)
9. [Phase 8: Deployment](#phase-8-deployment)
10. [Phase 9: Operations](#phase-9-operations)
11. [Phase 10: Monitoring](#phase-10-monitoring)
12. [Phase 11: Feedback](#phase-11-feedback)

---

## Phase 0: Documentation Planning

```
# Context
Project name: [your project name]
Problem: [what problem does it solve]
Team: [team size and roles]
Timeline: [estimated duration]

# Task
Generate Phase 0 (Documentation Planning) documents for the project described above.

Read 01-templates/00-documentation-planning/HOW-TO-USE.md first, then produce:
- sdlc-framework.md — adapted 12-phase SDLC with project-specific durations and deliverables
- navigation-conventions.md — naming rules, link patterns, versioning strategy
- macro-plan.md — initialized phase tracking table
- PHASE-INPUT.md — reference of required inputs per phase

# Requirements
- Each document must be project-specific, not generic template text
- sdlc-framework.md must reflect realistic timelines for the team size
- navigation-conventions.md must include specific examples for this project
- macro-plan.md must have Phase 0 marked complete and Phase 1 target start date set

# Style
- Process-focused, not technology-specific
- Include specific examples (team size, timeline ranges)
- Be concrete: names, dates, thresholds

# Validation
- [ ] All Phase 0 documents are project-specific
- [ ] Navigation conventions are actionable (not vague rules)
- [ ] Macro plan has Phase 0 complete and Phase 1 start date set
- [ ] No technology stack choices are mentioned in Phase 0
```

---

## Phase 1: Discovery

```
# Context
My product is: [2-3 sentence description of your product]
Problem: [specific problem it solves]
Users: [who uses it]
Market: [market context]
Opportunity: [why now]

# Task
Generate "01-templates/01-discovery/context-motivation.md" based on the template in that folder.

# Requirements
Length: 2000-2500 words
Mandatory sections:
  1. Problem (clear formulation)
  2. Market context (competition, opportunity)
  3. Strategic motivation (why now)
  4. Stakeholders and impacted
  5. Initial risks (what could go wrong)
  6. Opportunities (what we gain if it works)
  7. Key assumptions (what we take as true)

# Style
- Technology agnostic (no framework names, languages, etc.)
- Accessible to non-technical readers (PM, executives)
- Professional but narrative
- Include examples where possible

# Post-generation validation
- [ ] Is the real problem clear (not the solution)?
- [ ] Is it understood why it's important now?
- [ ] Are all stakeholders mentioned?
- [ ] Is there concrete risk analysis?
- [ ] Is it agnostic? (no "database", "API", "frontend", etc.)
```

---

## Phase 2: Requirements

```
# Context
[Discovery completed — provide context-motivation and system-vision summary]
Project: [your project name]
Key actors: [list from actors.md]
Key needs: [list from needs-expectations.md]

# Task
Generate "01-templates/02-requirements/glossary.md" based on the template.

# Requirements
- 30-50 domain terms
- For each term:
  1. Definition (1-2 sentences)
  2. Context (when/where it's used)
  3. Synonyms (if applicable)
  4. Related to (other terms)
  5. Example

# Style
- Clear and precise (like a dictionary)
- Agnostic — e.g., no "JWT" but yes "session token"
- Include both business AND key technical concepts

# Validation
- [ ] Is every term defined without using undefined terms?
- [ ] Does it cover the key domain concepts?
```

---

## Phase 3: Design

```
# Context
[Requirements completed — provide glossary and key requirements]
Project: [your project name]
Initial Bounded Contexts identified: [e.g., Game Management, Player Registry, Deck Builder]
Subdomain candidates: [core/supporting/generic classification for each]

# Task
Generate "01-templates/03-design/strategic-design.md"

# Requirements
- 1. Domain Vision Statement (why these contexts)
- 2. Subdomain Classification:
   - Core Domains (competitive differentiation)
   - Supporting Domains (necessary but generic)
   - Generic Domains (commodity)
- 3. Bounded Contexts (name, responsibility, ubiquitous language)
- 4. Ubiquitous Language (key terms per context, 10-15 terms each)
- 5. Aggregate Locations (aggregate roots per context)

# Style
- DDD-centric (contexts, subdomains, aggregates language)
- Implementation agnostic
- Include rationale (why these boundaries, not others)

# Validation
- [ ] Does each context have a unique and clear responsibility?
- [ ] Is ubiquitous language distinct per context?
- [ ] Is classification justified (Core/Supporting/Generic)?
- [ ] Are aggregate roots named and located?
```

---

## Phase 4: Data Model

```
# Context
[Design phase completed — provide strategic-design.md summary and bounded contexts]
[Requirements glossary — provide key domain terms]
Project: [your project name]
Bounded Contexts: [list from Phase 3]
Key Entities identified: [list per context]

# Task
Generate "01-templates/04-data-model/entities.md" and "01-templates/04-data-model/relationships.md"

# Entities Document Requirements
Per domain entity:
  1. Name and description
  2. Attributes (type, optional/required, constraints)
  3. Invariants (what must always hold)
  4. Origin (from which requirement or bounded context it comes)
  5. Notes (e.g., "soft delete", "auditable", etc.)
- Consolidated table with all entities
- Mark aggregate roots explicitly

# Relationships Document Requirements
- ERD Diagram (Mermaid: entity relationship)
- Per relationship: cardinality (1:1, 1:N, N:N), mandatory/optional
- Relationships table with justification
- Every relationship must support at least one system flow

# Style
- DB agnostic (use "unique identifier" not "SERIAL", "text" not "VARCHAR")
- Based on domain entities from the Design phase

# Validation
- [ ] Does each entity correspond to a domain concept from a bounded context?
- [ ] Do relationships support Design flows?
- [ ] Are there no unnecessary "generic" or "utility" tables?
- [ ] Is it technology agnostic (no database-specific terms)?
```

---

## Phase 5: Planning

```
# Context
[Requirements completed — provide priority matrix and scope boundaries]
[Phase 2 MVP definition: list of must-have FR/NFR]
[Phase 4 entities summary]
Project: [your project name]
Estimated duration: [e.g., 8 months]

# Task
Generate "01-templates/05-planning/roadmap.md" and "01-templates/05-planning/epics.md"

# Roadmap Requirements
- 6-12 month vision
- Delivery phases (MVP → Phase 2 → Phase 3...)
- Per phase: name, estimated duration, included epics, expected result
- Dependencies between phases (what must be complete before next starts)
- Milestones with target dates and acceptance criteria
- MVP milestone clearly defined as the first deliverable

# Epics Requirements
- Group FR by feature/capability
- Per epic: name, description, included FR, priority (MoSCoW from Phase 2), estimation (story points)
- All MVP must-have requirements must be in an epic assigned to the MVP milestone

# Phase 5 Chain Validation
- Every FR must belong to an epic
- Every epic must be assigned to a milestone
- Every milestone must have a roadmap phase
- Chain: FR → Epic → Milestone → Roadmap Phase

# Style
- Delivery-focused, technology agnostic
- Concrete milestones with testable acceptance criteria
- Clear MVP definition with explicit success criteria

# Validation
- [ ] Is the MVP clearly defined with all must-have requirements included?
- [ ] Are dependencies between phases explicit?
- [ ] Is the chain FR → Epic → Milestone → Phase validated?
- [ ] Are estimations internally consistent (story points scaled by team velocity)?
```

---

## Phase 6: Development

```
# Context
[Bounded contexts from Phase 3: list contexts and their responsibilities]
[Technology stack agreed by engineering team]
Project: [your project name]

# Technical Stack
Backend: [e.g., Java 21, Spring Boot 3.x]
Frontend: [e.g., React 19, TypeScript]
Database: [e.g., PostgreSQL 15]
Infrastructure: [e.g., Docker, Kubernetes]

# Task
Generate:
- "01-templates/06-development/architecture.md" — hexagonal architecture with bounded context mapping
- "01-templates/06-development/api-reference.md" — REST endpoint catalog
- "01-templates/06-development/coding-standards.md" — conventions, patterns, anti-patterns
- "01-templates/06-development/dr/" — 3-5 Architecture Decision Records for major choices

# Architecture Requirements
- Hexagonal / clean / layered architecture (per your stack)
- Modules to Bounded Contexts map (from Phase 3)
- Key patterns: Repository, Factory, Anti-Corruption Layer
- Request flow diagram (Mermaid)

# API Reference Requirements
- Per endpoint: method, route, parameters, response, errors
- Request/response examples
- Security notes (role-based access)

# Coding Standards Requirements
- Naming pattern per role (Controller, UseCase, Entity, etc.)
- SOLID principles
- Anti-patterns to avoid
- Testing expectations

# ADR Format (per decision)
- Context: what forced the decision?
- Decision: what was chosen?
- Consequences: what are the outcomes (positive and negative)?
- Alternatives considered

# Validation
- [ ] Does architecture reflect the domain model from Phase 3?
- [ ] Are API conventions clear and consistent?
- [ ] Does coding standards cover all layers?
- [ ] Are ADRs complete with alternatives?
```

---

## Phase 7: Testing

```
# Context
[Phase 6 technology stack: frameworks and tools]
[Phase 2 functional requirements: list of FRs]
[Phase 3 bounded contexts]
Project: [your project name]

# Task
Generate:
- "01-templates/07-testing/test-strategy.md" — pyramid, targets, tools, quality gates
- "01-templates/07-testing/unit-tests.md" — patterns and conventions
- "01-templates/07-testing/integration-tests.md" — patterns for integration tests
- "01-templates/07-testing/test-plan.md" — test cases per FR

# Test Strategy Requirements
- Testing pyramid with proportions (60% unit, 30% integration, 10% e2e)
- Coverage targets: e.g., 80% line coverage for unit tests
- Tools: [your testing frameworks and libraries]
- Quality gates: CI must pass before merge

# Test Plan Requirements
- One test case per FR (from Phase 2)
- Per case: preconditions, steps, expected result, priority (P0/P1/P2)
- MVP tests marked as mandatory
- Trace each test case to its FR ID

# Validation
- [ ] Does each FR have at least one test case?
- [ ] Are MVP requirements covered by P0 tests?
- [ ] Does the pyramid distribution make sense for the team size?
- [ ] Are quality gates explicit (what must pass before merge)?
```

---

## Phase 8: Deployment

```
# Context
[Phase 5 versioning strategy: semantic versioning approach]
[Phase 6 technology stack: deployment tools and infrastructure]
[Phase 7 quality gates: test targets]
Project: [your project name]

# Task
Generate:
- "01-templates/08-deployment/ci-cd-pipeline.md" — pipeline stages and triggers
- "01-templates/08-deployment/environments.md" — dev, staging, prod configuration
- "01-templates/08-deployment/release-process.md" — release checklist
- "01-templates/08-deployment/rollback-procedures.md" — rollback steps

# CI/CD Requirements
- Pipeline stages: commit → build → test → staging → production
- Per stage: jobs, gates, artifacts
- Versioning: align with Phase 5 semantic versioning (patch auto-increment on merge, minor/major manual)
- Rollback triggers and procedure

# Environment Requirements
- Dev: purpose, access (open), config (debug on)
- Staging: purpose, access (team), config (mirror prod)
- Prod: purpose, access (restricted), config (optimized)

# Release Requirements
- Pre-release checklist (10+ items)
- Staging verification steps
- Rollback criteria and procedure
- Communication protocol

# Validation
- [ ] Pipeline stages match Phase 7 quality gates?
- [ ] Versioning is consistent with Phase 5 versioning strategy?
- [ ] Rollback procedure is actionable (numbered steps)?
- [ ] Environments are distinct and documented?
```

---

## Phase 9: Operations

```
# Context
[Phase 8 deployment: environments, rollback procedures]
[Phase 6 architecture: service boundaries and dependencies]
[On-call team: rotation agreed]
Project: [your project name]

# Task
Generate:
- "01-templates/09-operations/runbooks/restart-service.md" — restart a service
- "01-templates/09-operations/runbooks/backup-restore.md" — database backup/restore
- "01-templates/09-operations/runbooks/emergency-rollback.md" — emergency rollback
- "01-templates/09-operations/incident-response.md" — severity, escalation, postmortem
- "01-templates/09-operations/sla.md" — uptime, response time, error rate targets
- "01-templates/09-operations/on-call.md" — rotation, tools, handoff

# Runbook Structure
Per runbook:
- When to use (trigger symptoms)
- Prerequisites (access, tools, notifications)
- Step-by-step instructions (numbered, unambiguous)
- Expected outcome
- Troubleshooting tips
- Escalation criteria

# Incident Response Requirements
- SEV1-SEV4 definitions (with examples)
- Response time targets per severity
- Escalation paths (primary, secondary, leadership)
- Communication protocol (internal, external, status page)
- Post-mortem SLA (when required, delivery timeline)

# SLA Requirements
- Uptime: [target, e.g., 99.9%]
- Response time: [p50/p95/p99 targets]
- Error rate: [acceptable threshold]
- Maintenance windows: [if any]

# Validation
- [ ] Are runbooks actionable (no ambiguous steps)?
- [ ] Do incident severity definitions have concrete examples?
- [ ] Is escalation path clear (who pages whom)?
- [ ] Are SLA targets quantified (not "as fast as possible")?
```

---

## Phase 10: Monitoring

```
# Context
[Phase 9 SLA targets: uptime, response time, error rate]
[Phase 8 environments: services and infrastructure]
[Phase 6 architecture: service dependencies and critical paths]
Project: [your project name]

# Task
Generate:
- "01-templates/10-monitoring/metrics.md" — SLI/SLO definitions, key metrics per category
- "01-templates/10-monitoring/alerts.md" — alert rules, thresholds, severity, actions
- "01-templates/10-monitoring/dashboards.md" — dashboard layouts and key panels

# Metrics Requirements
Per metric:
- Name and description
- Measurement method (how you collect it)
- Target (SLO)
- Alert threshold (when to page)

Categories:
- System Health: CPU, memory, disk, network
- Application: latency p50/p95/p99, error rate, throughput
- Business: DAU, MAU, feature adoption
- SLI/SLO: availability, latency, error budget

# Alert Requirements
Per alert:
- What triggers it (condition + duration)
- Severity (critical/high/warning)
- Who gets notified
- How to respond (link to runbook)

Alignment with Phase 9 incident response:
- Critical alerts = SEV1, High = SEV2, Warning = SEV3/SEV4

# Dashboard Requirements
- System health: real-time resource usage
- Application: latency, errors, throughput
- SLO: error budget burn rate, availability trend
- Business: DAU/MAU trend, feature usage

# Validation
- [ ] Are SLI/SLO targets aligned with Phase 9 SLA document?
- [ ] Are alert thresholds set to trigger before SLO is breached?
- [ ] Are dashboards actionable (not just data, but insight)?
- [ ] Are critical paths from Phase 6 monitored?
```

---

## Phase 11: Feedback

```
# Context
[Completed milestones: list milestones from Phase 5 roadmap]
[Retrospective results: what worked, what didn't, action items]
[User feedback: NPS, surveys, bug reports, feature requests]
Project: [your project name]

# Task
Generate:
- "01-templates/11-feedback/retrospectives/retro-[milestone]-[date].md" — per phase retrospective
- "01-templates/11-feedback/user-feedback.md" — feedback collection and summary
- "01-templates/11-feedback/lessons-learned.md" — technical and process learnings
- "01-templates/11-feedback/documentation-update-log.md" — documentation changes log

# Retrospective Requirements
Per phase (0-10):
- What worked (specific examples)
- What didn't work (failure modes with context)
- Action items (owner + target date)

DDD maturity assessment:
- Bounded contexts: were boundaries clear and stable?
- Ubiquitous language: was terminology consistent?
- Aggregates: were they correctly sized?
Score: 1-5 with justification

Overall cycle assessment:
- On time? On budget? Scope met?
- Key metrics: cycle time, defect rate, documentation coverage

# User Feedback Requirements
- Feedback channels: NPS, surveys, bug reports, feature requests
- Feedback summary per cycle: themes, volumes, key insights
- Feedback-to-roadmap linkage: which items from feedback are in the next planning?

# Lessons Learned Requirements
Technical:
- Architectural decisions that worked
- Patterns to repeat / anti-patterns to avoid

Process:
- Documentation that was useful
- Documentation that was ignored or burdensome
- Process improvements identified

# Validation
- [ ] Are action items specific with owners and dates?
- [ ] Is DDD maturity scored with concrete justification?
- [ ] Are feedback insights linked to roadmap changes?
- [ ] Are lessons learned specific enough to act on?
```

---

[← Tutorial README](./README.md)