[← Index](./README.md) | [< Previous](./TEMPLATE-USAGE-GUIDE.md)

---

# AI Autonomous Workflow

You are an AI agent operating in autonomous mode. This guide defines the rules, protocols, and formats you must follow when working across SDLC phases without a human in the loop. Autonomous operation requires stricter context validation than assisted operation — never proceed on assumed context.

## Contents

1. [Philosophy](#philosophy)
2. [Phase Context Requirements](#phase-context-requirements)
3. [Input Data Structure](#input-data-structure)
4. [Autonomous Execution Rules](#autonomous-execution-rules)
5. [Context Handoff Protocol](#context-handoff-protocol)
6. [Validation Checklist](#validation-checklist)

---

## Philosophy

This section explains the fundamental difference between traditional human-dependent operation and autonomous AI-driven operation. Understanding this distinction determines how you handle every decision point in autonomous mode.

### Traditional (Human-Dependent)

In traditional mode, a human drives every transition and validates each step:

```
Human: "Generate Phase N"
AI: Generates based on limited context
Human: Reviews, requests changes
Human: Approves
```

### Autonomous (AI-Driven)

In autonomous mode, you are responsible for context validation, generation, and structured reporting:

```
AI: Reads phase context, validates completeness
AI: Identifies missing inputs, requests if needed
AI: Generates Phase N with full verified context
AI: Validates output against previous phases
AI: Reports completion with structured next-phase context
```

**Core Principle**: You work autonomously but never assume. When context is incomplete, you stop and request it explicitly — every time, without exception.

---

## Phase Context Requirements

This section defines the minimum context you must have before generating each phase. Do not begin generation without verifying these requirements. If any required input is missing, stop and request it explicitly.

### Context by Phase

Each row in this table defines what context flows from the completed phase into the next. Verify the "Required Context" column before proceeding with the "To Phase".

| From Phase | To Phase | Required Context |
|-----------|---------|-------------|
| — | 01-Discovery | Problem statement, market context |
| 01-Discovery | 02-Requirements | Actors, needs, vision |
| 02-Requirements | 03-Design | FR/NFR list, glossary, priority matrix |
| 03-Design | 04-Data Model | Bounded contexts, aggregates, domain events |
| 04-Data Model | 05-Planning | Entities, relationships, data flows |
| 05-Planning | 06-Development | Roadmap, epics |
| 06-Development | 07-Testing | Architecture, API contracts |
| 07-Testing | 08-Deployment | Test results, test strategy |
| 08-Deployment | 09-Operations | Pipeline definition, environment configs |
| 09-Operations | 10-Monitoring | Runbooks, SLAs |
| 10-Monitoring | 11-Feedback | Metrics, alert definitions |

### Minimum Context per Phase

The following lists define the minimum set of inputs required to begin each phase. These are not suggestions — they are gates. If the listed inputs do not exist, request them before proceeding.

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
  - Incident response documentation

11-Feedback REQUIRED INPUT:
  - Monitoring metrics
  - Operations data
```

---

## Input Data Structure

This section defines the exact format you must use to structure phase inputs. Use this format when receiving context from a previous phase and when preparing context to pass to the next phase. Consistency in this structure is what makes autonomous phase transitions reliable.

### Phase Input Template

When beginning a phase, structure the incoming context using this template before generating any output:

```markdown
# Phase N Input

## Previous Phases Summary

| Phase | Status | Key Outputs |
|-------|--------|-----------|
| 01-Discovery | ✅ | 5 documents |
| 02-Requirements | ✅ | 15 FR, 5 NFR |
| 03-Design | 🔲 In Progress | — |

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

The following example shows a correctly structured input for Phase 03-Design, receiving context from Phase 02-Requirements:

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

These four rules govern every action you take in autonomous mode. They are not guidelines — they are mandatory operating constraints. Apply them in sequence before and during every phase generation.

### Rule 1: Validate Context First

Context validation is always the first action — before any generation begins. Skipping this step is the most common cause of incoherent output.

```
BEFORE generating ANY phase:
1. Read all previous phase documents
2. Verify required inputs exist
3. If missing, STOP and request context explicitly
4. Continue only when context is complete and verified
```

### Rule 2: Cross-Reference Validation

Every artifact you generate must pass cross-reference validation before it is considered complete. Apply this check to every document you produce.

```
FOR EACH generated artifact, verify:
- [ ] Does it reference requirements by ID?
- [ ] Is terminology consistent with the glossary?
- [ ] Do decisions align with scope boundaries?
- [ ] Are there no contradictions with previous phases?
```

### Rule 3: Explicit Completion Report

After completing any phase, produce a structured completion report. This report is not optional — it is the handoff artifact that enables the next phase.

```
AFTER completing a phase, produce:

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
- [ ] Terminology consistent with glossary
- [ ] No scope violations introduced
```

### Rule 4: Request Missing Context Explicitly

When required input is absent, stop immediately and produce a structured missing-context request. Do not attempt to generate with incomplete input, and do not make assumptions to fill gaps.

```
IF required input is missing:
STOP generation and produce:

## Missing Context

From Phase [N-1]:
- [ ] Required: [document/artifact]
- [ ] Required: [decision/rationale]
- [ ] Required: [constraint]

Please provide the above before I continue.
```

---

## Context Handoff Protocol

This section defines the three handoff scenarios you will encounter and how to handle each. Choose the matching scenario and follow its steps exactly.

### Standard Handoff

This is the normal case: Phase N-1 is complete and you are proceeding to Phase N.

```
Phase N-1 Complete → Phase N Start

1. Phase N-1 owner marks complete
2. You read all Phase N-1 output documents
3. You create Phase N input structure using the template above
4. You validate completeness against the required inputs list
5. You proceed with generation
```

### Incomplete Handoff

This scenario occurs when Phase N-1 is partially complete. Do not proceed without the missing items.

```
Phase N-1 Incomplete → Phase N Request

1. You identify missing context
2. You stop and produce explicit missing-context request (Rule 4)
3. Human provides missing context
4. You re-validate against required inputs
5. You proceed only when validation passes
```

### Parallel Phases

This scenario occurs when Phase N+1 must begin before Phase N is fully complete. Proceed with explicit caveats — never silently.

```
When Phase N+1 starts before Phase N completes:

1. Identify which Phase N outputs Phase N+1 depends on
2. Request confirmation of which outputs are available
3. Note all assumptions in the Phase N+1 input structure
4. Proceed with caveats documented
5. Flag for re-validation once Phase N completes
```

---

## Validation Checklist

Apply this checklist in three stages: before each phase, during generation, and after completion. Do not deliver output that has not passed all three stages.

### Before Each Phase

Verify all of these before writing a single line of output:

- [ ] Read all previous phase documents
- [ ] Verified required inputs exist
- [ ] Checked scope boundaries are defined
- [ ] Verified glossary alignment
- [ ] Noted all critical decisions that affect this phase

### During Generation

Apply these checks continuously while producing output:

- [ ] Each FR is mapped to at least one artifact
- [ ] Each decision is justified with a rationale
- [ ] No new scope has been introduced
- [ ] All terminology comes from the glossary
- [ ] All cross-references point to real, existing documents

### After Generation

Run this final check before producing the completion report:

- [ ] All required sections are present
- [ ] All previous phase outputs are addressed
- [ ] Next-phase context has been prepared in the standard format
- [ ] Open questions are documented
- [ ] Completion report has been generated

---

## Example: Autonomous Phase Transition

The following example shows a complete input-generation-output cycle for an autonomous transition from Phase 02 to Phase 03. Use this as a reference pattern.

### Input (Phase 02 → Phase 03)

```markdown
# Phase 03 Input (from 02-Requirements)

## Previous Summary
- 01-Discovery: ✅ Complete
- 02-Requirements: ✅ Complete (22 FR, 8 NFR)

## Required Context Verified
✅ Glossary exists and is complete
✅ Priority matrix exists
✅ Scope boundaries are defined
✅ All FR have acceptance criteria

## Key Outputs
- fr-001 through fr-022: Functional requirements
- nfr-001 through nfr-008: Non-functional requirements
- scope-boundaries.md: MVP + Phase 2 scope

## Go
Generating 03-design with full verified context.
```

### Output (Phase 03 Completion Report)

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
✅ All 22 FR addressed in system flows
✅ Glossary terms used consistently throughout
✅ Scope boundaries respected — no out-of-scope content
✅ Multi-tenancy addressed in each bounded context
```

---

## Add to All Autonomous AI Instructions

Include this block in every autonomous instruction set to ensure consistent behavior across all phases:

```markdown
# Autonomous Mode

You are working in AUTONOMOUS mode.

## Rules
1. NEVER assume context — always read previous phases first
2. STOP and request explicitly if required input is missing
3. CROSS-REFERENCE all artifacts with previous phases
4. REPORT completion with structured next-phase context

## Protocol
1. Read Phase N-1 output
2. Verify required inputs
3. If incomplete, request explicitly — do not proceed
4. Generate Phase N
5. Validate against Phase N-1
6. Report completion with Phase N+1 context
```

---

[← Index](./README.md) | [< Previous](./TEMPLATE-USAGE-GUIDE.md)
