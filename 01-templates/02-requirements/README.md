# Phase 2: Requirements

You are an AI agent generating Requirements phase documentation. This phase translates business needs from Discovery into specific, measurable capabilities the system must provide. Every requirement you generate must trace back to a Discovery actor, need, or objective — a requirement with no Discovery source is likely scope creep and must be questioned before inclusion.

**When to Complete**: After Discovery (Phase 1) is complete. Before Design (Phase 3).

**Owner**: Product Manager + Domain Expert + Engineering Lead (for feasibility)

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Phase Overview](#phase-overview)
- [Files to Complete](#files-to-complete)
- [Key Principles](#key-principles)
- [Discovery → Requirements Connection](#discovery--requirements-connection)
- [Errors to Avoid](#errors-to-avoid)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)

---

## Phase Overview

This phase produces four interdependent deliverables that together define what the system must do, how well it must perform, what is in scope for each release, and how every requirement connects back to a verified user need.

Requirements translate business needs from Discovery into specific, measurable capabilities the system must provide.

### What This Phase Produces

Use this table to track the status of each deliverable and understand how they relate to each other.

| Deliverable | Purpose | Links To |
|-------------|---------|----------|
| **Functional Requirements** | WHAT the system must do | Discovery actors and needs |
| **Non-Functional Requirements** | HOW WELL it must perform | Business constraints |
| **Scope Matrix** | What's in MVP vs. future | All requirements |
| **Traceability Matrix** | Complete coverage check | Discovery artifacts |

---

## Key Principles

These principles govern every requirement you generate. Verify compliance against both lists before marking any requirement complete — violations are defects that must be corrected before advancing to Design.

### ✅ INCLUDE

These elements must appear in every complete requirement.

- Functional requirements with clear acceptance criteria
- Non-functional requirements with measurable targets
- Requirements traced back to Discovery actors and needs
- Prioritization using MoSCoW (Must/Should/Could/Won't)
- Phase-by-phase scoping (MVP vs. future phases)

### ❌ EXCLUDE

These elements must never appear in any requirement document during this phase.

- Technology choices (REST, GraphQL, databases)
- Implementation patterns or architectural details
- Code-level design decisions
- Any implementation language

---

## Discovery → Requirements Connection

Before generating any requirement, verify that the corresponding Discovery artifacts exist and are complete. Every requirement must trace to a Discovery source — stop and request missing Discovery artifacts if they do not exist.

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

Generate these templates in the order shown below. Each template depends on the previous one being complete — do not begin the Scope Matrix before all FRs and NFRs exist.

| File | Description | Time | Owner |
|------|-------------|------|-------|
| `TEMPLATE-004-functional-requirements.md` | WHAT the system must do | 4-6 hours | PM + Domain Expert |
| `TEMPLATE-005-non-functional-requirements.md` | HOW WELL it performs | 2-3 hours | Tech Lead |
| `TEMPLATE-006-scope-matrix.md` | What's in MVP vs. future | 1-2 hours | PM + Eng Lead |
| `TEMPLATE-007-traceability-matrix.md` | Complete coverage check | 1 hour | PM + Domain Expert |

### Template Order

Follow this sequence exactly. Generating the Traceability Matrix before Requirements are complete produces an incomplete validation.

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

## Errors to Avoid

These are the most common Requirements phase failures. Each one causes problems in Design, Development, or Testing if not corrected before sign-off.

| Mistake | Why It's a Problem |
|--------|--------------------|
| "Users should be able to..." | Too vague — needs specific flows |
| "System should be fast" | No target specified — how do we test? |
| "Use JWT for auth" | Implementation detail — wrong phase |
| "User is happy" (as acceptance criteria) | Not testable — what's "happy"? |
| Requirements without traceability | No link to Discovery = scope creep |
| No scope boundaries | MVP grows unchecked → missed dates |
| Skipping NFRs | Performance/security issues discovered late |

---

## Completion Checklist

Verify every item below before marking this phase complete. Do not advance to Design until all deliverables are present and stakeholders have signed off.

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

Verify these rules before sign-off — each violation is a defect that must be corrected before advancing to Design.

- [ ] No technology names (REST, GraphQL, JWT, databases)
- [ ] No frameworks or libraries (React, Spring, Django)
- [ ] No implementation patterns (repository, singleton)
- [ ] All requirements trace to Discovery
- [ ] Acceptance criteria are testable (not subjective)
- [ ] Dependencies documented between requirements

---

## Sign-Off

Record approval from all required stakeholders. Do not advance to Phase 3 (Design) without this sign-off.

- [ ] **Prepared by**: [Name, Date]
- [ ] **Reviewed by**: [Domain Expert, Stakeholders, Date]
- [ ] **Approved by**: [Product Manager, Date]

---

## Summary

This table summarizes the four deliverables and the key question each one answers.

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
