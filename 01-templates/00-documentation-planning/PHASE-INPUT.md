[← Index](./README.md) | [< Previous](./README.md) | [Next >](./TEMPLATE-001-context-motivation.md)

---

# Phase Input

This section defines required input data from previous phases for autonomous execution.

## Purpose

When AI agents work autonomously, they must read context from previous phases before generating new content. This file documents required inputs.

---

## Phase Context Map

### Input Requirements by Phase

| To Phase | Requires From | Required Documents |
|---------|--------------|-------------------|
| 01-Discovery | - | (none - starting point) |
| 02-Requirements | 01-Discovery | context-motivation, vision, actors, scope |
| 03-Design | 02-Requirements | glossary, FR list, NFR list, priority matrix |
| 04-Data Model | 03-Design | strategic-design, system-flows, bounded-contexts |
| 05-Planning | 04-Data Model | entities, relationships, data flows |
| 06-Development | 05-Planning | roadmap, epics, versioning |
| 07-Testing | 06-Development | architecture, API, coding standards |
| 08-Deployment | 07-Testing | test strategy, test plans |
| 09-Operations | 08-Deployment | CI/CD pipeline, environments |
| 10-Monitoring | 09-Operations | runbooks, SLA, incident response |
| 11-Feedback | 10-Monitoring | metrics, alerts, dashboards |

---

## Standard Input Structure

### Required Input Template

Each phase should receive:

```markdown
# Phase [N] Input

## Previous Phases Status

| Phase | Status | Key Outputs |
|-------|--------|-----------|
| 01-Discovery | ✅ | X documents |
| 02-Requirements | ✅ | X FR, X NFR |
| 03-Design | 🔲 In Progress | - |

## Key Artifacts

- [document]: Brief description
- [document]: Brief description

## Critical Decisions from Previous

- [decision]: [rationale]

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

Before starting any phase, AI must verify:

### Phase N Validation

- [ ] All Phase N-1 documents exist and complete
- [ ] Required artifacts are accessible
- [ ] Critical decisions documented
- [ ] Scope boundaries clear
- [ ] Constraints known

### If Complete, Proceed

If all checks pass → Generate Phase N

### If Incomplete, Request

If missing items → Explicitly request:

```
## Missing Context

From Phase [N-1]:
- [ ] Required: [document/artifact]
- [ ] Required: [decision]
- [ ] Required: [constraint]

Please provide before continuing.
```

---

## Data Input Examples

### Example: Phase 02 → Phase 03

**Phase 02 Output:**
```
## Key Artifacts
- glossary.md — 45 domain terms
- priority-matrix.md — MoSCoW prioritized
- functional/ — 22 FR documents
- non-functional/ — 8 NFR documents

## Critical Decisions
- Multi-tenant from day 1
- 10k concurrent users target
- GDPR compliance required

## Scope
- MVP (Must items)
- Excludes: billing integration
```

**Phase 03 Input:**
```
# Phase 03 Input (from 02-Requirements)

## Previous Summary
✅ Discovery complete
✅ Requirements complete (22 FR, 8 NFR)

✅ Required context verified:
- glossary.md exists
- priority-matrix.md exists
- scope-boundaries.md exists
- All acceptance criteria available

## Key Outputs to Use
- All 22 FR must map to bounded contexts
- 8 NFR must map to design decisions
- Multi-tenancy affects all contexts
```

---

## Autonomous Mode

When working autonomously, follow this protocol:

```
1. Read Phase N-1 README/index
2. Read required documents
3. Verify inputs exist
4. If complete → Generate
5. If incomplete → Report and wait
```

---

[← Index](./README.md) | [< Previous](./README.md) | [Next >](./TEMPLATE-001-context-motivation.md)