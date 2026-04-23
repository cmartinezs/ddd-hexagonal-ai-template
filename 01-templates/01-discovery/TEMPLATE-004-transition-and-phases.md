[← Index](./README.md) | [< Anterior](./TEMPLATE-003-scope-and-boundaries.md) | [Siguiente >](./TEMPLATE-005-discovery-closure-and-validation.md)

---

# Transition Plan: From Discovery to Next Phases

Define the roadmap and handoff from Discovery to the following phases (Requirements, Design, Development, etc.). This ensures clear transitions, prevents scope creep, and establishes success criteria for each phase.

## Contents

1. [Phase Overview](#phase-overview)
2. [Phase Sequencing](#phase-sequencing)
3. [Deliverables by Phase](#deliverables-by-phase)
4. [Success Criteria](#success-criteria)
5. [Dependencies Between Phases](#dependencies-between-phases)
6. [Handoff Criteria](#handoff-criteria)

---

## Phase Overview

**High-level description** of each phase after Discovery. Focus on *what will be done*, not *how*.

### Phase Template

| Phase | Purpose | Stakeholders | Duration | Key Outputs |
|-------|---------|--------------|----------|------------|
| [Phase Name] | [Main goal] | [Who leads/participates] | [Est. time] | [Key deliverables] |

### Prompts for AI

- What are the 4-6 major phases needed after Discovery?
- What's the dependency chain between phases?
- What must be complete in one phase before the next starts?

### Example Phases

> **Phase 1: Requirements & Prioritization**
> - Convert Discovery needs into prioritized, testable requirements
> - Led by: Product Owner + Tech Lead
> - Duration: 3 weeks
> - Output: Functional & non-functional requirements catalog, traceability matrix
>
> **Phase 2: Design & Architecture**
> - Define how the system will work; make technology and design decisions
> - Led by: Tech Lead + Senior Architects
> - Duration: 4 weeks
> - Output: Architecture diagrams, ADRs, process flows, data model
>
> **Phase 3: Development (MVP)**
> - Build and iteratively validate the MVP
> - Led by: Engineering Lead
> - Duration: 8-12 weeks
> - Output: Working software, tested features
>
> **Phase 4: Testing & Validation**
> - Verify quality, security, and performance
> - Led by: QA Lead + Security Lead
> - Duration: 3 weeks
> - Output: Test reports, security assessment, performance metrics
>
> **Phase 5: Deployment & Go-Live**
> - Move to production; monitor and support
> - Led by: DevOps Lead
> - Duration: 2 weeks + ongoing
> - Output: Live system, runbooks, monitoring dashboards

---

## Phase Sequencing

**Visual representation** of phase dependencies and critical path.

### Sequencing Template

```
Phase 1: Requirements
    ↓ (must complete before)
Phase 2: Design & Architecture
    ↓ (can start when Design draft is ready)
Phase 3: Development
    ↓ (parallel with Phase 4)
Phase 4: Testing
    ↓ (testing validates Phase 3 output)
Phase 5: Deployment
```

### Prompts for AI

- Are any phases sequential (blocking) or parallel (independent)?
- What's the critical path—the longest chain of dependencies?
- Where can the team work in parallel to save time?

### Example Sequencing (from Keygo)

```
Discovery (Complete)
    ↓
Requirements & Prioritization (must complete first)
    ├→ Design & Architecture (depends on Requirements)
    │   └→ Development Iteration 1 (depends on Architecture)
    │       ├→ Testing & Validation (parallel with Dev)
    │       └→ Deployment (depends on Validation pass)
    │
    └→ Pilot Organization Alignment (parallel with Requirements)
        └→ Feedback Integration (post-deployment)
```

---

## Deliverables by Phase

**Specific outputs** expected at the end of each phase. Make them concrete and measurable.

### Deliverables Template

| Phase | Deliverable | Format | Owner | Success Criteria |
|-------|-------------|--------|-------|-----------------|
| [Phase] | [What to produce] | [Doc/Code/Report] | [Who] | [How to verify it's done] |

### Prompts for AI

- What artifacts must each phase produce?
- Who owns each deliverable?
- How will you know a deliverable is "done"?

### Example Deliverables (from Keygo)

| Phase | Deliverable | Format | Owner | Success |
|---|---|---|---|---|
| Requirements | Functional Requirements Catalog | Document | Product Owner | ≥90% prioritized requirements have acceptance criteria |
| Requirements | Non-Functional Requirements | Document | Tech Lead | All quality/security/performance targets defined |
| Design | Architecture Diagrams | Diagrams | Tech Lead | System design coherent with flows and data model |
| Design | Data Model (ERD) | Diagram + DDL | Data Architect | Model verified to enforce multi-tenant isolation |
| Design | Architecture Decision Records (ADRs) | Documents | Tech Lead | All critical decisions have documented rationale |
| Development I1 | User Org Management Feature | Code + Tests | Engineering | Feature works end-to-end; pilot org can use it |
| Development I2 | User Lifecycle Management | Code + Tests | Engineering | Create/read/update/delete/suspend users works |
| Testing | Security Assessment Report | Report | Security Lead | No critical findings; isolation verified |
| Testing | Performance Test Results | Report | QA Lead | API response times meet targets; load tested |
| Deployment | Production Runbooks | Documents | DevOps | Step-by-step procedures for common operations |

---

## Success Criteria

**How to know each phase was successful**. Not just "done", but "done well".

### Criteria Template

| Phase | Criterion | Verification Method | Owner |
|-------|-----------|-------------------|-------|
| [Phase] | [What success looks like] | [How to check] | [Who decides] |

### Prompts for AI

- For each phase, what's the minimum definition of success?
- What would constitute phase failure?
- Who makes the call whether to move to the next phase?

### Example Criteria

| Phase | Criterion | Verification | Owner |
|---|---|---|---|
| Requirements | Requirements are prioritized and testable | Product Owner reviews + Tech Lead sign-off | Product Manager |
| Requirements | Traceability to Discovery objectives is complete | Traceability matrix reviewed | Tech Lead |
| Design | Architecture decisions are documented and approved | ADRs reviewed in technical committee | CTO |
| Design | Data model enforces multi-tenant isolation structurally | Model verified by Security Lead | Security Lead |
| Development | MVP features are working and tested | Automated tests pass; demo with pilot org | Engineering Lead |
| Testing | Security and performance targets are met | Assessment reports reviewed; no blockers | QA Lead + Security Lead |
| Deployment | System is live and stable | Uptime metrics, user feedback positive | DevOps Lead |

---

## Dependencies Between Phases

**What each phase needs from prior phases to start**. Prevents false starts.

### Dependency Template

| Phase | Depends On | Needs From | Impact if Delayed |
|-------|-----------|-----------|------------------|
| [Phase] | [Prior phase] | [Specific artifacts] | [What gets blocked] |

### Prompts for AI

- What inputs must come from the prior phase?
- Are there any surprising dependencies?
- What could be started in parallel to save time?

### Example Dependencies (from Keygo)

| Phase | Depends On | Needs From | Impact if Delayed |
|---|---|---|---|
| Design | Requirements | Prioritized functional + NFR requirements | Architecture is built on guesses; redesign later |
| Development | Design | Approved architecture + data model | Team doesn't know constraints; rework ahead |
| Testing | Development | Working features + test plan | Can't validate until features exist |
| Deployment | Testing | "Production ready" sign-off | Launch blocked; reputation damage |

---

## Handoff Criteria

**Explicit go/no-go gates** between phases. When is a phase truly complete?

### Handoff Checklist Template

| Phase | Handoff Checklist | Pass Criteria |
|-------|------------------|---------------|
| [Phase → Next] | - [ ] Deliverable 1 complete<br>- [ ] Deliverable 2 approved<br>- [ ] Stakeholder sign-off | All boxes checked |

### Prompts for AI

- What must be done before moving to the next phase?
- Who signs off on the handoff?
- What would cause a phase to be "reworked"?

### Example Handoff Criteria (from Keygo)

**Discovery → Requirements**
- [ ] Context, vision, and problem clearly documented
- [ ] Strategic objectives and KPIs agreed
- [ ] Key actors and their needs identified
- [ ] Scope boundaries and MVP definition signed off
- [ ] Risks identified and mitigation strategies in place
- [ ] Stakeholder alignment achieved
- **Pass**: All items complete + Product Owner + Tech Lead approve

**Requirements → Design**
- [ ] Functional requirements are prioritized and testable
- [ ] Non-functional requirements (security, performance, availability) are defined
- [ ] Traceability matrix shows requirements map to objectives
- [ ] Domain glossary created and reviewed
- **Pass**: ≥90% critical requirements have acceptance criteria + CTO approves

**Design → Development**
- [ ] Architecture decisions documented in ADRs
- [ ] Data model verified for isolation and integrity
- [ ] UI/UX design reviewed with at least one user type
- [ ] Security architecture approved by Security Lead
- [ ] Deployment strategy defined
- **Pass**: Architecture coherent with requirements + CTO sign-off + first development sprint planned

**Development → Testing**
- [ ] All MVP features implemented and unit tested
- [ ] Code review completed
- [ ] Documentation draft complete
- [ ] Feature demo completed with pilot organization
- **Pass**: Features work end-to-end + Engineering Lead approval

**Testing → Deployment**
- [ ] All acceptance criteria met
- [ ] Security assessment passed (no critical findings)
- [ ] Performance meets targets
- [ ] Runbooks documented
- [ ] Support team trained
- **Pass**: No blocker issues + QA + Security + Ops approve + Go-live scheduled

---

## Paso a Paso

1. **Define phases**: What major work streams happen after Discovery?
2. **Sequence them**: Which are sequential (blocking) vs. parallel?
3. **List deliverables**: What artifact does each phase produce?
4. **Set success criteria**: How do you know each phase succeeded?
5. **Map dependencies**: What inputs must prior phases provide?
6. **Define handoff gates**: What must be done to move forward?
7. **Assign owners**: Who leads each phase?
8. **Validate with stakeholders**: Alignment on timeline and expectations

---

## Ejemplo

### Ejemplo Proyecto Alpha (SaaS de tareas)

**Phases**:
1. Requirements (2 weeks) → Feature prioritization, acceptance criteria
2. Design (3 weeks) → UI mockups, data model, API design
3. Development (8 weeks) → MVP build with team collaboration features
4. Testing (2 weeks) → QA validation, usability testing with real teams
5. Deployment (1 week) → Launch to beta, monitoring setup

**Handoff**: Requirements → Design requires "≥ 80% of user stories have acceptance criteria + PM approval"

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**Phases**:
1. Requirements (3 weeks) → Buyer + Seller requirements separate
2. Design (4 weeks) → Verification flow, payment integration, review system
3. Development (12 weeks) → Iterative MVP with pilot providers
4. Testing (3 weeks) → Security focus (payment, identity verification)
5. Deployment (2 weeks) → Gradual rollout to new providers

**Handoff**: Design → Development requires "Data model verified for fraud prevention + Security Lead sign-off"

---

## Completion Checklist

### Deliverables

- [ ] Phases identified and named (4-6 phases)
- [ ] Phase sequencing defined (dependencies, critical path)
- [ ] Deliverables listed per phase (with format, owner)
- [ ] Success criteria defined per phase
- [ ] Dependencies between phases documented
- [ ] Handoff criteria explicit (go/no-go gates)
- [ ] Phase owners assigned
- [ ] Timeline estimated per phase

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Manager, Tech Lead, Date]
- [ ] Approved by: [Steering Committee, Date]

---

## Phase Discipline Rules

**Before starting Requirements phase, verify**:

1. ✅ Phases are sequential or parallel (clear dependency model)
2. ✅ Each phase has explicit success criteria (not vague)
3. ✅ Handoff gates are documented (when to move forward)
4. ✅ Owners assigned for each phase
5. ✅ Timeline is realistic (with buffer for unknowns)
6. ✅ Stakeholder alignment on roadmap and milestones
7. ✅ Escalation path clear if a phase is at risk

---

## Tips

1. **Be explicit about gates**: Handoff criteria prevent false starts
2. **Plan for parallel work**: Where can teams work independently?
3. **Build in validation**: Real users should see working features early
4. **Expect iteration**: Plans change; review roadmap quarterly
5. **Document assumptions**: "We can hire 2 engineers in 4 weeks"—call it out
6. **Schedule the hard things first**: Security review, compliance checks, integrations
7. **Leave time for learning**: MVP isn't the end; plan for feedback loops

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-003-scope-and-boundaries.md) | [Siguiente >](./TEMPLATE-005-discovery-closure-and-validation.md)
