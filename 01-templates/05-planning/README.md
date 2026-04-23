[← Index](../README.md) | [< Previous](../04-data-model/README.md) | [Next >](./TEMPLATE-014-roadmap.md)

---

# Phase 5: Planning

## Purpose

This phase transforms the product vision and requirements into an actionable execution plan. It answers: "In what order do we build what, and how do we communicate progress?"

## What This Phase Produces

| Deliverable | Description | Time to Complete |
|------------|-------------|------------------|
| [roadmap.md](./TEMPLATE-014-roadmap.md) | High-level timeline with phases and milestones | 2-4 hours |
| [epics.md](./TEMPLATE-015-epics.md) | Features grouped into deliverable initiatives | 3-5 hours |
| [versioning-strategy.md](./TEMPLATE-016-versioning-strategy.md) | Version numbering, release process, support policy | 1-2 hours |
| [use-cases-catalog.md](./TEMPLATE-017-use-cases-catalog.md) | Complete use cases per bounded context | 4-6 hours |
| [milestones-proposals.md](./TEMPLATE-018-milestones-proposals.md) | Detailed work items with effort estimates | 3-4 hours |
| [issue-mapping.md](./TEMPLATE-019-issue-mapping.md) | Traceability to issue tracker | 1-2 hours |

## Diagram Convention

This phase uses diagrams to visualize:
- Roadmap timeline (Gantt-style using Mermaid)
- Epic dependencies (flowchart using Mermaid)
- Version lifecycle (state diagram using Mermaid)
- Milestone dependencies (flowchart using Mermaid)
- Issue mapping flow (flowchart using Mermaid)

```
Priority: Mermaid → PlantUML → ASCII
See: navigation-conventions.md in 00-documentation-planning/
```

## Contents

- [Roadmap](#roadmap)
- [Epics](#epics)
- [Versioning Strategy](#versioning-strategy)
- [Use Cases Catalog](#use-cases-catalog)
- [Milestones & Proposals](#milestones--proposals)
- [Issue Mapping](#issue-mapping)

---

## Planning Philosophy

### Why It Matters

Planning is the bridge between "what we want" (Requirements) and "what we build" (Development). Without planning:
- Teams don't know the delivery order
- Dependencies between features are missed
- Progress cannot be measured
- Stakeholders lose confidence

### Core Principles

1. **First, what enables everything else**: Build core capabilities that other features depend on first
2. **Each delivery is usable**: Every phase should produce something stakeholders can see/work with
3. **Planning is iterative**: Review and adjust the roadmap quarterly

### Relationship with Requirements

```
Requirements (Phase 2)
    ↓
    → Feature priority → Roadmap phases
    → Feature groups → Epics
    → Feature complexity → Story estimates
    → Use cases → Proposals → Issues
```

---

## Completion Checklist

### Before Planning
- [ ] Scope matrix completed (from Requirements Phase)
- [ ] Priority defined for all requirements
- [ ] Stakeholder availability confirmed
- [ ] Bounded contexts defined (from Design Phase)
- [ ] Aggregates defined (from Data Model)

### Planning Deliverables
- [ ] Roadmap created with timeline
- [ ] Epics defined with user stories
- [ ] User stories have acceptance criteria
- [ ] Estimates provided (story points or T-shirt sizes)
- [ ] Versioning strategy documented
- [ ] Use cases catalog complete
- [ ] Proposals with effort estimates
- [ ] Issues created and mapped

### Sign-Off
- [ ] **Prepared by**: [Product Manager]
- [ ] **Reviewed by**: [Engineering Lead, Stakeholders]
- [ ] **Approved by**: [Product Lead, Executive Sponsor]

---

## AI Assistance

### What AI Can Do Well
- Break requirements into user stories
- Generate acceptance criteria for stories
- Suggest epic groupings
- Estimate complexity (T-shirt sizes)
- Create roadmap timeline outlines
- Write use case flows
- Generate proposal titles

### What Needs Human Input
- Business priorities and go/no-go decisions
- Resource availability and constraints
- Actual timeline and deadlines
- Risk assessments
- Team velocity (for estimation)
- Issue tracker setup

---

[← Index](../README.md) | [< Previous](../04-data-model/README.md) | [Next >](./TEMPLATE-014-roadmap.md)