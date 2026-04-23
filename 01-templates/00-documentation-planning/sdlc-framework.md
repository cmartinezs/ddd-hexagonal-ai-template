# SDLC Framework

You are an AI agent customizing the Software Development Lifecycle for a specific project. This file defines how the project moves from idea to production through 12 phases. Replace every placeholder (`[PROJECT NAME]`, `[DATE]`, `[List]`, etc.) with project-specific values. Do not leave any placeholder text in the final document — this file must be fully customized before Phase 1 begins.

**What This Is**: A customized Software Development Lifecycle that describes how this project moves from idea to production. It is tailored to this project, not generic.  
**How to Use**: Customize each phase for the project's size and context. This document becomes the contract for how documentation flows across all phases.  
**Why It Matters**: Prevents scope creep, enables planning, and creates accountability across all team members.  
**When to Complete**: At project start, before Phase 1. Review when scope changes significantly.

---

## Project: [PROJECT NAME]

## Framework Overview

This section defines the Software Development Lifecycle framework for [PROJECT] and maps it to the 12-phase documentation structure. The phase diagram below shows the flow from planning through feedback — customize the labels if your project uses different phase names.

### Phase Diagram

```
Phase 0: PLANNING
    ↓
Phase 1: DISCOVERY → What problem are we solving?
    ↓
Phase 2: REQUIREMENTS → What exactly will the system do?
    ↓
Phase 3: DESIGN → How will it look and flow?
    ↓
Phase 4: DATA MODEL → How is data structured?
    ↓
Phase 5: PLANNING → How do we deliver this?
    ↓
Phase 6: DEVELOPMENT → Build the system
    ↓
Phase 7: TESTING → Verify it works
    ↓
Phase 8: DEPLOYMENT → Release to production
    ↓
Phase 9: OPERATIONS → Run it reliably
    ↓
Phase 10: MONITORING → Measure health
    ↓
Phase 11: FEEDBACK → Learn and improve
    ↓
(Cycle back to Phase 5 for next iteration)
```

---

## Phase Breakdown

This section defines each phase with its duration, participants, and required deliverables. Fill in all fields with project-specific values. These entries become the binding definition of what must be produced to advance to the next phase.

### Phase 0: Planning & Framework

This phase establishes the documentation infrastructure before any product documentation begins.

**Duration**: [X days/weeks]  
**Participants**: [List]  
**Deliverables**:
- SDLC framework (customized for this project)
- Macro plan initialized
- Navigation conventions defined

---

### Phase 1: Discovery

Discovery answers why this project exists, who it serves, and what the core problem is. All output from this phase must be technology agnostic.

**Duration**: [X days/weeks]  
**Participants**: [Product, Stakeholders]  
**Deliverables**:
- Vision statement
- Actor and persona definitions
- Scope boundaries
- Assumptions and constraints

---

### Phase 2: Requirements

Requirements define precisely what the system must do. Every requirement must be verifiable and traceable to a Discovery actor or need.

**Duration**: [X days/weeks]  
**Participants**: [Product, Engineering]  
**Deliverables**:
- Functional requirements (FRs)
- Non-functional requirements (NFRs)
- Requirement prioritization (MoSCoW)
- Traceability matrix

---

### Phase 3: Design

Design translates requirements into system flows, UI structures, and domain models. Every flow must trace to at least one requirement.

**Duration**: [X days/weeks]  
**Participants**: [Design, Product, Architecture]  
**Deliverables**:
- System flows (happy paths + exception paths)
- UI/UX mockups or descriptions
- Design decisions documented with rationale

---

### Phase 4: Data Model

The data model defines entities, relationships, and data flows. Every entity must correspond to a domain concept from Phase 3.

**Duration**: [X days/weeks]  
**Participants**: [DBA, Backend Lead]  
**Deliverables**:
- Entity definitions with attributes
- Entity-Relationship Diagram (ERD)
- Data flow documentation

---

### Phase 5: Planning

Planning organizes the approved requirements and design into a delivery roadmap and execution structure.

**Duration**: [X days/weeks]  
**Participants**: [Product, Engineering]  
**Deliverables**:
- Product roadmap
- Epics and user stories
- Sprint planning template

---

### Phase 6: Development

Development is the first phase where specific technologies are named. It defines the architecture, APIs, and coding standards.

**Duration**: [X weeks/months]  
**Participants**: [All engineers]  
**Deliverables**:
- System architecture documentation
- API specifications
- Coding standards
- Architecture Decision Records (ADRs)

---

### Phase 7: Testing

Testing documents the strategy, test plans, and security testing approach. Every test case must trace to a Phase 2 acceptance criterion.

**Duration**: [Parallel with Phase 6]  
**Participants**: [QA, Developers]  
**Deliverables**:
- Test strategy
- Test plans and test cases
- Security testing plan

---

### Phase 8: Deployment

Deployment documents the CI/CD pipeline, environment configurations, and release procedures.

**Duration**: [Parallel with Phase 6-7]  
**Participants**: [DevOps, Release Lead]  
**Deliverables**:
- CI/CD pipeline definition
- Environment configuration
- Release procedures and rollback plan

---

### Phase 9: Operations

Operations documents the procedures for running and maintaining the system in production.

**Duration**: [Post-launch]  
**Participants**: [SRE, DevOps]  
**Deliverables**:
- Runbooks
- Incident response procedures
- SLA definitions

---

### Phase 10: Monitoring

Monitoring defines what is measured, when alerts fire, and how health is visualized.

**Duration**: [Ongoing]  
**Participants**: [SRE, Engineering]  
**Deliverables**:
- Key metrics and KPIs
- Alert rules and thresholds
- Monitoring dashboards

---

### Phase 11: Feedback

Feedback closes the loop by capturing retrospective learnings and user input to inform the next iteration.

**Duration**: [Continuous]  
**Participants**: [All team]  
**Deliverables**:
- User feedback summary
- Sprint retrospectives
- Lessons learned

---

## Timeline

This section maps phases to actual project dates. Fill in all dates before Phase 1 begins. These dates are the accountability anchors for the entire project.

**Start Date**: [DATE]  
**Target MVP Completion**: [DATE]  
**Full Launch Target**: [DATE]

**Key Milestones**:
- [Date]: Phase 1–2 complete (requirements locked)
- [Date]: Phase 3–4 complete (design approved)
- [Date]: Phase 5–6 begin (development starts)
- [Date]: Phase 6–7 complete (code complete)
- [Date]: Phase 8 (launch to production)

---

## Success Criteria

The SDLC framework is working correctly when all of the following conditions are true throughout the project. Use this list as a health check at each phase boundary.

- [ ] Each phase completed with its defined deliverables present and approved
- [ ] Quality gates passed before moving to the next phase
- [ ] Stakeholder sign-off obtained at each phase boundary
- [ ] Team following phase discipline (no technology in phases 1–5)
- [ ] Documentation stays in sync with actual decisions as they are made

---

## Template Customization

This section documents the project-specific customizations made to the standard 12-phase framework. Record every deviation from the default here so future contributors understand why the framework looks the way it does.

For this project, the following have been customized:
- [ ] Phase names (if any were renamed)
- [ ] Deliverables (items added or removed from defaults)
- [ ] Timeline (adjusted for project size)
- [ ] Participants (team-specific assignments)

### Customization by Project Size

Use the appropriate customization pattern for this project's scale. Adjust the Phase Breakdown section above to match.

**Small Project** (< 3 months, < 5 people):
- Combine phases 3–4 (Design + Data Model into 1 week)
- Combine phases 7–8 (Testing + Deployment overlap with development)
- Each early phase: 1–2 weeks maximum

**Medium Project** (3–6 months, 5–10 people):
- Keep all 12 phases separate
- Allocate 4–6 weeks total for Discovery and Requirements
- Add explicit review gates between phases

**Large Project** (> 6 months, 10+ people):
- Add sub-phases (e.g., "Discovery → Internal Review → External Validation")
- More formal sign-off process with explicit gates
- Dedicated documentation owner per phase

**Example** (SaaS product, medium project):
```
Phase 1: Discovery (2 weeks) → Focus on user problems
Phase 2: Requirements (3 weeks) → Focus on features
Phase 3: Design (2 weeks) → Focus on UX + API design
Phase 4: Data Model (1 week) → Focus on schema
...
```

---

## Contents

- [Framework Overview](#framework-overview)
- [Phase Breakdown](#phase-breakdown)
- [Timeline](#timeline)
- [Success Criteria](#success-criteria)
- [Template Customization](#template-customization)

---

**Last Updated**: [DATE]  
**Framework Owner**: [NAME]
