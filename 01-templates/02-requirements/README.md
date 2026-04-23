# Phase 2: Requirements

**What This Is**: The phase where business needs from Discovery translate into specific, measurable capabilities the system must provide. Each requirement is traceable back to Discovery actors, needs, and scope.

**How to Use**: Complete each template in order: functional requirements → non-functional requirements → scope matrix → traceability matrix. Follow the structure exactly.

**Why It Matters**: Without clear requirements, teams build the wrong thing. Without traceability to Discovery, features become "just ideas" disconnected from user needs. Without scope boundaries, MVPs grow unchecked.

**When to Complete**: After Discovery (Phase 1) is complete. Before Design (Phase 3).

**Owner**: Product Manager + Domain Expert + Engineering Lead (for feasibility)

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Phase Overview](#phase-overview)
- [Files to Complete](#files-to-complete)
- [Key Principles](#key-principles)
- [Discovery → Requirements Connection](#discovery--requirements-connection)
- [Common Mistakes](#common-mistakes)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)

---

## Phase Overview

Requirements translate business needs from Discovery into specific, measurable capabilities the system must provide.

### What This Phase Produces

| Deliverable | Purpose | Links To |
|-------------|---------|----------|
| **Functional Requirements** | WHAT the system must do | Discovery actors and needs |
| **Non-Functional Requirements** | HOW WELL it must perform | Business constraints |
| **Scope Matrix** | What's in MVP vs. future | All requirements |
| **Traceability Matrix** | Complete coverage check | Discovery artifacts |

---

## Key Principles

### ✅ INCLUDE

- Functional requirements with clear acceptance criteria
- Non-functional requirements with measurable targets
- Requirements traced back to Discovery actors and needs
- Prioritization using MoSCoW (Must/Should/Could/Won't)
- Phase-by-phase scoping (MVP vs. future phases)

### ❌ EXCLUDE

- Technology choices (REST, GraphQL, databases)
- Implementation patterns or architectural details
- Code-level design decisions
- Any implementation language

---

## Discovery → Requirements Connection

Before starting Requirements, ensure Discovery is complete:

| Discovery Output | How It Shapes Requirements |
|-----------------|----------------------------|
| **Vision & Objectives** | Each FR/NFR should contribute to a strategic objective |
| **Actors & Personas** | FRs are written from the perspective of specific actors |
| **Scope & Boundaries** | In-scope items become FRs; out-of-scope items excluded |
| **Assumptions** | Requirements validate or build upon Discovery assumptions |
| **Risks** | Risks inform acceptance criteria and NFRs |

**Critical Rule**: Every requirement must be traceable to a Discovery artifact. If a requirement exists with no source, it's likely scope creep.

---

## Files to Complete

| File | Description | Time | Owner |
|------|-------------|------|-------|
| `TEMPLATE-004-functional-requirements.md` | WHAT the system must do | 4-6 hours | PM + Domain Expert |
| `TEMPLATE-005-non-functional-requirements.md` | HOW WELL it performs | 2-3 hours | Tech Lead |
| `TEMPLATE-006-scope-matrix.md` | What's in MVP vs. future | 1-2 hours | PM + Eng Lead |
| `TEMPLATE-007-traceability-matrix.md` | Complete coverage check | 1 hour | PM + Domain Expert |

### Template Order

```
Discovery (Phase 1)
    ↓
Functional Requirements (start here)
    ↓
Non-Functional Requirements (in parallel)
    ↓
Scope Matrix (after all requirements)
    ↓
Traceability Matrix (validation)
    ↓
Design (Phase 3)
```

---

## Common Mistakes to Avoid

| Mistake | Why It's a Problem |
|--------|--------------------|
| "Users should be able to..." | Too vague — needs specific flows |
| "System should be fast" | No target specified — how do we test? |
| "Use JWT for auth" | Implementation detail — wrong phase |
| "User is happy" (as acceptance criteria) | Not testable — what's "happy"? |
| Requirements without traceability | No link to Discovery = scope creep |
| No scope boundaries | MVP grows unchecked → missed dates |
| Skipping NFRs | Performance/security issues late |

---

## Completion Checklist

### Requirements Phase Deliverables

- [ ] All functional requirements documented with acceptance criteria
- [ ] All functional requirements have scope (includes + excludes)
- [ ] All functional requirements have dependencies documented
- [ ] All non-functional requirements defined with measurable targets
- [ ] Scope matrix shows what's in MVP vs. Phase 2 vs. Future
- [ ] Traceability matrix shows 100% coverage of Discovery needs
- [ ] Requirements prioritized using MoSCoW
- [ ] No technology or implementation details mentioned
- [ ] Stakeholder validation completed
- [ ] Engineering feasibility confirmed

### Phase Discipline Check

- [ ] No technology names (REST, GraphQL, JWT, databases)
- [ ] No frameworks or libraries (React, Spring, Django)
- [ ] No implementation patterns (repository, singleton)
- [ ] All requirements trace to Discovery
- [ ] Acceptance criteria are testable (not subjective)
- [ ] Dependencies documented between requirements

---

## Sign-Off

- [ ] **Prepared by**: [Name, Date]
- [ ] **Reviewed by**: [Domain Expert, Stakeholders, Date]
- [ ] **Approved by**: [Product Manager, Date]

---

## Summary

| Deliverable | Key Question |
|-------------|--------------|
| Functional Requirements | What must the system do? |
| Non-Functional Requirements | How well must it perform? |
| Scope Matrix | What's in MVP vs. future? |
| Traceability Matrix | Does every Discovery need have coverage? |

**Time Estimate**: 8-10 hours total  
**Team**: Product Manager, Domain Expert, Engineering Lead  
**Output**: Complete, validated requirements ready for design

**Definition of Done**:
- All requirements have acceptance criteria
- Requirements traced to Discovery
- Scope boundaries clear
- Prioritization complete
- Stakeholders have signed off