[← Index](./README.md) | [< Previous](./README.md) | [Next >](./TEMPLATE-001-context-motivation.md)

---

# Phase Input

You are an AI agent preparing to generate a new SDLC phase. This file defines the required inputs you must verify before beginning any phase in autonomous mode. Before generating content for Phase N, read this file, check the context map for Phase N's requirements, validate that all required documents exist, and either proceed or request the missing inputs. Never generate a phase without completing this validation.

## Purpose

When you work autonomously across phases, you must read and verify context from previous phases before generating new content. This file provides the input requirements, validation checklist, and structured input/output formats you need to do that correctly.

---

## Phase Context Map

This table defines, for each target phase, which source phase its inputs come from and which specific documents are required. Before starting Phase N, locate the row for Phase N and verify every listed document exists and is complete.

### Input Requirements by Phase

| To Phase | Requires From | Required Documents |
|---------|--------------|-------------------|
| 01-Discovery | — | (none — starting point) |
| 02-Requirements | 01-Discovery | context-motivation, vision, actors, scope |
| 03-Design | 02-Requirements | glossary, FR list, NFR list, priority matrix |
| 04-Data Model | 03-Design | strategic-design, system-flows, bounded-contexts |
| 05-Planning | 04-Data Model | entities, relationships, data flows |
| 06-Development | 05-Planning | roadmap, epics, versioning strategy |
| 07-Testing | 06-Development | architecture, API specs, coding standards |
| 08-Deployment | 07-Testing | test strategy, test plans |
| 09-Operations | 08-Deployment | CI/CD pipeline definition, environment configs |
| 10-Monitoring | 09-Operations | runbooks, SLA, incident response |
| 11-Feedback | 10-Monitoring | metrics, alerts, dashboards |

---

## Standard Input Structure

This section defines the structured input format you must produce before generating any phase. Creating this input record forces explicit context validation and makes the phase generation traceable.

### Required Input Template

Produce this input record before generating any phase. Fill every field with verified values — do not use placeholders.

```markdown
# Phase [N] Input

## Previous Phases Status

| Phase | Status | Key Outputs |
|-------|--------|-----------|
| 01-Discovery | ✅ | X documents |
| 02-Requirements | ✅ | X FR, X NFR |
| 03-Design | 🔲 In Progress | — |

## Key Artifacts

- [document path]: Brief description of what it contains
- [document path]: Brief description of what it contains

## Critical Decisions from Previous Phases

- [decision]: [rationale — why this decision was made]

## Scope for This Phase

- In scope: [items]
- Out of scope: [items]

## Constraints

- Timeline: [if any]
- Budget: [if any]
- Compliance: [if any]
```

---

## Context Validation Checklist

Apply this checklist before generating any phase. Each check is a gate — if any check fails, stop and request the missing item before proceeding.

### Phase N Validation

Before generating Phase N, verify all of the following:

- [ ] All Phase N-1 documents exist and are marked complete (not draft)
- [ ] Required artifacts are accessible and readable
- [ ] Critical decisions from Phase N-1 are documented with rationale
- [ ] Scope boundaries are explicitly defined
- [ ] Constraints (timeline, budget, compliance) are known

### If All Checks Pass

All checks pass → produce the Phase N input record → begin generation.

### If Any Check Fails

One or more checks fail → stop immediately → produce this explicit request:

```
## Missing Context

From Phase [N-1]:
- [ ] Required: [document/artifact — specify exact file name]
- [ ] Required: [decision — specify what decision is missing]
- [ ] Required: [constraint — specify what constraint is undefined]

Please provide the above before I continue.
```

Do not attempt to generate with incomplete context. Do not make assumptions to fill gaps.

---

## Data Input Examples

These examples show what a correct phase input record looks like for a real phase transition. Use them as calibration for your own input records.

### Example: Phase 02 → Phase 03

The following shows what Phase 02 must have produced and how Phase 03 should structure its input record before generation begins.

**Phase 02 Output** (what must exist):
```
Key Artifacts:
- glossary.md — 45 domain terms
- priority-matrix.md — MoSCoW prioritized
- functional/ — 22 FR documents with acceptance criteria
- non-functional/ — 8 NFR documents

Critical Decisions:
- Multi-tenant from day 1
- 10k concurrent users target
- GDPR compliance required

Scope:
- MVP (Must items from MoSCoW)
- Excludes: billing integration
```

**Phase 03 Input Record** (what you produce before generating):
```
# Phase 03 Input (from 02-Requirements)

## Previous Summary
✅ Discovery complete
✅ Requirements complete (22 FR, 8 NFR)

## Required Context Verified
✅ glossary.md exists and is complete (45 terms)
✅ priority-matrix.md exists
✅ scope-boundaries.md exists
✅ All FR have acceptance criteria

## Key Outputs to Use
- All 22 FR must map to bounded contexts
- All 8 NFR must map to design decisions
- Multi-tenancy affects all bounded contexts
- GDPR compliance affects data model in Phase 4
```

---

## Autonomous Mode Protocol

This section defines the exact sequence you follow when operating in autonomous mode. Apply this protocol every time you transition between phases without human confirmation.

When working autonomously, follow these steps in order — do not skip any step:

```
1. Read Phase N-1 README/index to confirm status
2. Read all required documents from Phase N-1
3. Verify all required inputs exist and are complete
4. If complete → produce Phase N input record → begin generation
5. If incomplete → produce missing-context request → wait for inputs
```

Do not proceed past step 3 if any required input is missing. Do not attempt to infer or generate missing context.

---

[← Index](./README.md) | [< Previous](./README.md) | [Next >](./TEMPLATE-001-context-motivation.md)
