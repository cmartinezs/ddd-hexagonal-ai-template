[← Index](./README.md) | [< Previous](./TEMPLATE-USAGE-GUIDE.md)

---

# AI Autonomous Workflow

This guide enables AI agents to work autonomously across SDLC phases with proper context handoff from previous phases.

## Contents

1. [Philosophy](#philosophy)
2. [Phase Context Requirements](#phase-context-requirements)
3. [Input Data Structure](#input-data-structure)
4. [Autonomous Execution Rules](#autonomous-execution-rules)
5. [Context Handoff Protocol](#context-handoff-protocol)
6. [Validation Checklist](#validation-checklist)

---

## Philosophy

### Traditional (Human-Dependent)

```
Human: "Generate Phase N"
AI: Generates based on limited context
Human: Reviews, requests changes
Human: Approves
```

### Autonomous (AI-Driven)

```
AI: Reads phase context, validates completeness
AI: Identifies missing inputs, requests if needed
AI: Generates Phase N with full context
AI: Validates against previous phases
AI: Reports completion with next steps
```

**Core Principle**: AI works autonomously but never assumes. When context is incomplete, AI requests it explicitly.

---

## Phase Context Requirements

### Context by Phase

| From Phase | To Phase | Required Context |
|-----------|---------|-------------|
| - | 01-Discovery | Problem statement, market context |
| 01-Discovery | 02-Requirements | Actors, needs, vision |
| 02-Requirements | 03-Design | FR/NFR list, glossary, priority |
| 03-Design | 04-Data Model | Bounded contexts, aggregates, events |
| 04-Data Model | 05-Planning | Entities, relationships, flows |
| 05-Planning | 06-Development | Roadmap, epics |
| 06-Development | 07-Testing | Architecture, API contracts |
| 07-Testing | 08-Deployment | Test results, test strategy |
| 08-Deployment | 09-Operations | Pipeline, environments |
| 09-Operations | 10-Monitoring | Runbooks, SLAs |
| 10-Monitoring | 11-Feedback | Metrics, alerts |

### Minimum Context per Phase

```
01-Discovery REQUIRED INPUT:
  - Product name and description
  - Target market/users
  - Problem being solved
  - Strategic rationale

02-Requirements REQUIRED INPUT:
  - Discovery documents (context-motivation, vision, actors)
  - Known constraints (budget, timeline, compliance)

03-Design REQUIRED INPUT:
  - All requirements documents
  - Glossary
  - Priority matrix
  - Scope boundaries

04-Data Model REQUIRED INPUT:
  - Strategic design (bounded contexts)
  - System flows
  - Ubiquitous language

05-Planning REQUIRED INPUT:
  - Complete data model
  - Design decisions documented
  - Non-functional requirements

06-Development REQUIRED INPUT:
  - Roadmap and epics
  - Approved requirements
  - Design artifacts

07-Testing REQUIRED INPUT:
  - Development complete
  - API specifications
  - Coding standards

08-Deployment REQUIRED INPUT:
  - Test strategy and results
  - Code complete

09-Operations REQUIRED INPUT:
  - Deployment pipelines
  - Environment configurations

10-Monitoring REQUIRED INPUT:
  - Operational procedures
  - Incident response

11-Feedback REQUIRED INPUT:
  - Monitoring metrics
  - Operations data
```

---

## Input Data Structure

### Phase Input Template

Each phase receives this structured input:

```markdown
# Phase N Input

## Previous Phases Summary

| Phase | Status | Key Outputs |
|-------|--------|-----------|
| 01-Discovery | ✅ | 5 documents |
| 02-Requirements | ✅ | 15 FR, 5 NFR |
| 03-Design | 🔲 In Progress | - |

## Key Artifacts

- Document: [path/name] — Brief description
- Document: [path/name] — Brief description

## Critical Decisions

- Decision: [description] → [rationale]

## Open Questions

- [ ] Question requiring answer before proceeding?

## Constraints

- Technical: [constraints from requirements]
- Business: [timeline, budget, compliance]
```

### Complete Data Input Example

For Phase 03-Design from Phase 02-Requirements:

```markdown
# Phase 03 Input (from 02-Requirements)

## Previous Phases Summary

| Phase | Status | Key Outputs |
|-------|--------|-----------|
| 01-Discovery | ✅ | 8 documents |
| 02-Requirements | ✅ | 22 FR, 8 NFR, priority matrix |

## Key Artifacts from Previous

- `02-requirements/glossary.md` — 45 domain terms
- `02-requirements/priority-matrix.md` — MoSCoW prioritized
- `02-requirements/functional/fr-001-user-auth.md`
- `02-requirements/functional/fr-002-user-profile.md`
- `02-requirements/non-functional/nfr-001-performance.md`

## Critical Decisions

- Must support 10k concurrent users → affects architecture
- GDPR compliance required → affects data model
- Multi-tenant from day 1 → affects all layers

## Scope for This Phase

- MVP only (Must items from MoSCoW)
- Excludes: billing integration, advanced analytics
```

---

## Autonomous Execution Rules

### Rule 1: Validate Context First

```
BEFORE generating ANY phase:
1. Read all previous phase documents
2. Verify required inputs exist
3. If missing, STOP and request context
4. Continue only when context complete
```

### Rule 2: Cross-Reference Validation

```
FOR EACH generated artifact:
- [ ] Does it reference requirements by ID?
- [ ] Is terminology consistent with glossary?
- [ ] Do decisions align with scope boundaries?
- [ ] Are there no contradictions with previous phases?
```

### Rule 3: Explicit Completion Report

```
AFTER completing phase:

## Completion Report

### Generated Artifacts
| File | Description |
|------|-------------|
| doc-1.md | Description |
| doc-2.md | Description |

### Context for Next Phase
- Key artifact for Phase N+1: [file]
- Decisions that affect next phase: [list]
- Open questions for next phase: [list]

### Validation
- [ ] All FR from Phase N-1 addressed
- [ ] Terminology consistent
- [ ] No scope violations
```

### Rule 4: Request Missing Context

```
IF required input is missing:
STOP generation and explicitly request:

## Missing Context

From Phase [N-1]:
- [ ] Required: [document/artifact]
- [ ] Required: [decision/rationale]
- [ ] Required: [constraint]

Please provide before continuing.
```

---

## Context Handoff Protocol

### Standard Handoff

```
Phase N-1 Complete → Phase N Start

1. Phase N-1 owner marks complete
2. AI reads Phase N-1 output
3. AI creates Phase N input structure
4. AI validates completeness
5. AI proceeds with generation
```

### Incomplete Handoff

```
Phase N-1 Incomplete → Phase N Request

1. AI identifies missing context
2. AI stops and requests specific items
3. Human provides missing context
4. AI re-validates
5. AI proceeds
```

### Parallel Phases

```
When Phase N+1 starts before Phase N completes:

1. Identify dependencies
2. Request explicit from-phase context
3. Note assumptions in input
4. Proceed with caveats
```

---

## Validation Checklist

### Before Each Phase

- [ ] Read all previous phase documents
- [ ] Verify required inputs exist
- [ ] Check scope boundaries
- [ ] Verify glossary alignment
- [ ] Note critical decisions

### During Generation

- [ ] Each FR mapped to artifact
- [ ] Each decision justified
- [ ] No new scope introduced
- [ ] Terminology from glossary
- [ ] Cross-references valid

### After Generation

- [ ] All required sections present
- [ ] Previous phase outputs addressed
- [ ] Next phase context prepared
- [ ] Open questions documented
- [ ] Completion report generated

---

## Example: Autonomous Phase Transition

### Input (Phase 02 → Phase 03)

```markdown
# Phase 03 Input (from 02-Requirements)

## Previous Summary
- 01-Discovery: ✅ Complete
- 02-Requirements: ✅ Complete (22 FR, 8 NFR)

## Required Context Verified
✅ Glossary exists and complete
✅ Priority matrix exists
✅ Scope boundaries defined
✅ All FR have acceptance criteria

## Key Outputs
- fr-001 through fr-022: Functional requirements
- nfr-001 through nfr-008: Non-functional requirements
- scope-boundaries.md: MVP + Phase 2 scope

## Go!
Generating 03-design with full context
```

### Output (Phase 03 Generation)

```markdown
# 03-Design Output

## Completion Report

### Generated
- strategic-design.md
- context-map.md
- system-flows.md (12 flows)
- bounded-contexts/ (7 contexts)

### Context for Phase 04
- Key output: bounded-contexts/*.md
- Entities derived: 15 main entities
- Domain events: 12 events

### Validation
✅ All 22 FR addressed in flows
✅ Glossary terms used consistently
✅ Scope boundaries respected
✅ Multi-tenancy considered in each context
```

---

## AI Agent Mode: Autonomous

Add this to all AI instructions:

```markdown
# Autonomous Mode

You are working in AUTONOMOUS mode.

## Rules
1. NEVER assume context — always read previous phases first
2. STOP and request if required input is missing
3. CROSS-REFERENCE all artifacts with previous phases
4. REPORT completion with next-phase context

## Protocol
1. Read Phase N-1 output
2. Verify required inputs
3. If incomplete, request explicitly
4. Generate Phase N
5. Validate against Phase N-1
6. Report completion with Phase N+1 context
```

---

[← Index](./README.md) | [< Previous](./TEMPLATE-USAGE-GUIDE.md)