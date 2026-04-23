# SDLC Framework

**What This Is**: A customized Software Development Lifecycle that describes how your project moves from idea to production. It's tailored to your project, not generic.  
**How to Use**: Customize each phase for your project size and context. This becomes the contract for how documentation flows.  
**Why It Matters**: Prevents scope creep, enables planning, and creates accountability across all team members.  
**When to Complete**: At project start, before Phase 1. Review when scope changes significantly.

---

## Project: [PROJECT NAME]

## Framework Overview

This document describes the Software Development Lifecycle framework for [PROJECT] and how it maps to the 12-phase documentation structure.

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
Phase 5: PLANNING → How do we build this?
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

### Phase 0: Planning & Framework
**Duration**: [X days/weeks]  
**Participants**: [List]  
**Deliverables**:
- SDLC framework (customized)
- Macro plan
- Navigation conventions

---

### Phase 1: Discovery
**Duration**: [X days/weeks]  
**Participants**: [Product, Stakeholders]  
**Deliverables**:
- Vision statement
- Actor and persona definitions
- Scope boundaries
- Assumptions and constraints

---

### Phase 2: Requirements
**Duration**: [X days/weeks]  
**Participants**: [Product, Engineering]  
**Deliverables**:
- Functional requirements (FRs)
- Non-functional requirements (NFRs)
- Requirement prioritization
- Traceability matrix

---

### Phase 3: Design
**Duration**: [X days/weeks]  
**Participants**: [Design, Product, Architecture]  
**Deliverables**:
- System flows
- UI/UX mockups
- Design decisions documented

---

### Phase 4: Data Model
**Duration**: [X days/weeks]  
**Participants**: [DBA, Backend Lead]  
**Deliverables**:
- Entity definitions
- Entity-Relationship Diagram
- Data flow documentation

---

### Phase 5: Planning
**Duration**: [X days/weeks]  
**Participants**: [Product, Engineering]  
**Deliverables**:
- Product roadmap
- Epics and user stories
- Sprint planning

---

### Phase 6: Development
**Duration**: [X weeks/months]  
**Participants**: [All engineers]  
**Deliverables**:
- System architecture
- API specifications
- Coding standards
- Architecture Decision Records

---

### Phase 7: Testing
**Duration**: [Parallel with Phase 6]  
**Participants**: [QA, Developers]  
**Deliverables**:
- Test strategy
- Test plans and cases
- Security testing plan

---

### Phase 8: Deployment
**Duration**: [Parallel with Phase 6-7]  
**Participants**: [DevOps, Release Lead]  
**Deliverables**:
- CI/CD pipeline
- Environment configuration
- Release procedures

---

### Phase 9: Operations
**Duration**: [Post-launch]  
**Participants**: [SRE, DevOps]  
**Deliverables**:
- Runbooks
- Incident response procedures
- SLA definitions

---

### Phase 10: Monitoring
**Duration**: [Ongoing]  
**Participants**: [SRE, Engineering]  
**Deliverables**:
- Key metrics
- Alert rules
- Monitoring dashboards

---

### Phase 11: Feedback
**Duration**: [Continuous]  
**Participants**: [All team]  
**Deliverables**:
- User feedback summary
- Sprint retrospectives
- Lessons learned

---

## Timeline

**Start Date**: [DATE]  
**Target MVP Completion**: [DATE]  
**Full Launch Target**: [DATE]

**Key Milestones**:
- [Date]: Phase 1-2 complete (requirements locked)
- [Date]: Phase 3-4 complete (design approved)
- [Date]: Phase 5-6 begin (development starts)
- [Date]: Phase 6-7 complete (code complete)
- [Date]: Phase 8 (launch to production)

---

## Success Criteria

The SDLC is successful when:
- [ ] Each phase completed with deliverables
- [ ] Quality gates passed before moving to next phase
- [ ] Stakeholder sign-off obtained
- [ ] Team follows phase discipline (no skipping)
- [ ] Documentation stays in sync with reality

---

## Template Customization

For this project, we have customized:
- [ ] Phase names (if any renamed)
- [ ] Deliverables (added/removed)
- [ ] Timeline (adjusted for project size)
- [ ] Participants (team-specific)

### How to Customize for Your Project

**Small Project** (< 3 months, < 5 people):
- Combine phases 3-4 (Design + Data Model → 1 week)
- Combine phases 7-8 (Testing + Deployment → overlap with dev)
- Each phase: 1-2 weeks max

**Medium Project** (3-6 months, 5-10 people):
- Keep all 12 phases separate
- More time in Discovery and Requirements (4-6 weeks total)
- Add explicit review gates between phases

**Large Project** (> 6 months, 10+ people):
- Add sub-phases (e.g., "Discovery → Internal Review" → "External validation")
- More formal sign-off process
- Dedicated documentation owner per phase

**Example**: For a SaaS product:
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
