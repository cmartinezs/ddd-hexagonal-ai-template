[← Tutorial README](./README.md) | [Next >](./step-01-discovery.md)

---

# Step 00: Documentation Planning

**What This Is**: Setting up the documentation foundation for your project. Phase 0 defines the SDLC structure, naming conventions, and tracking system that every subsequent phase relies on.

**How to Use**: Read the Phase 0 files, then customize them for your project. Complete Phase 0 before any other phase.

**Why It Matters**: Without this foundation, documentation becomes inconsistent, hard to find, and loses traceability. Phase 0 is the investment that prevents 10× the maintenance cost later.

**When to Use**: At the start of a new project. Revisit if scope changes significantly.

**Owner**: Tech Lead + Product Manager.

---

## Contents

1. [Goal](#1-goal)
2. [Prerequisites](#2-prerequisites)
3. [Instructions](#3-instructions)
4. [AI Prompt](#4-ai-prompt)
5. [Done Check](#5-done-check)
6. [Next Step](#6-next-step)

---

## 1. Goal

Produce a customized Phase 0 documentation setup consisting of:

- `sdlc-framework.md` — your project's adapted SDLC with 12 phases, timelines, and deliverables
- `macro-plan.md` — initialized tracking table with Phase 0 marked complete
- `navigation-conventions.md` — naming rules, linking patterns, and document standards
- `PHASE-INPUT.md` — reference of required inputs per phase

---

## 2. Prerequisites

- [ ] You have a project name and a clear problem statement
- [ ] You have identified at least one Tech Lead and one Product Manager
- [ ] You have access to the `01-templates/00-documentation-planning/` folder
- [ ] You have read [`HOW-TO-USE.md`](../../01-templates/00-documentation-planning/HOW-TO-USE.md) in that folder

---

## 3. Instructions

1. **Read `HOW-TO-USE.md`** — Understand the purpose and sequence of each Phase 0 file.

2. **Customize `sdlc-framework.md`**
   - Adapt the 12-phase structure to your project's scope and team size
   - Set realistic durations and milestones
   - Define specific deliverables per phase for your project

3. **Create `navigation-conventions.md`**
   - Document naming rules (kebab-case, phase prefixes)
   - Define linking patterns and navigation structure
   - Establish document versioning rules

4. **Initialize `macro-plan.md`**
   - Set all 12 phases with initial status
   - Mark Phase 0 as complete with today's date
   - Set a target start date for Phase 1

5. **Review `PHASE-INPUT.md`** — Note the required inputs for each phase. This is your reference throughout the project.

> **Agnostic boundary**: Phase 0 is a process guide. You may mention tools and conventions (naming, linking), but do not discuss technology stack choices here.

---

## 4. AI Prompt

> Copy the prompt below, replace bracketed placeholders with your project-specific context, and use it to generate the Phase 0 documents.

```
# Context
Project name: [your project name]
Problem: [what problem does it solve]
Team: [team size and roles]
Timeline: [estimated duration]

# Task
Generate Phase 0 (Documentation Planning) documents for the project described above.

Read 01-templates/00-documentation-planning/HOW-TO-USE.md first, then produce:
- sdlc-framework.md — adapted 12-phase SDLC with project-specific durations and deliverables
- navigation-conventions.md — naming rules, link patterns, versioning strategy
- macro-plan.md — initialized phase tracking table
- PHASE-INPUT.md — reference of required inputs per phase

# Requirements
- Each document must be project-specific, not generic template text
- sdlc-framework.md must reflect realistic timelines for the team size
- navigation-conventions.md must include specific examples for this project
- macro-plan.md must have Phase 0 marked complete and Phase 1 target start date set

# Style
- Process-focused, not technology-specific
- Include specific examples (team size, timeline ranges)
- Be concrete: names, dates, thresholds

# Validation
- [ ] All Phase 0 documents are project-specific
- [ ] Navigation conventions are actionable (not vague rules)
- [ ] Macro plan has Phase 0 complete and Phase 1 start date set
- [ ] No technology stack choices are mentioned in Phase 0
```

---

## 5. Done Check

- [ ] `sdlc-framework.md` has project-specific phases, durations, and deliverables
- [ ] `macro-plan.md` has Phase 0 marked complete and Phase 1 target start date
- [ ] `navigation-conventions.md` has concrete examples (not just "use kebab-case")
- [ ] `PHASE-INPUT.md` references all 12 phases with required inputs
- [ ] Tech Lead and Product Manager have reviewed and signed off
- [ ] Phase 0 is tracked in the macro-plan

---

## 6. Next Step

Proceed to [Step 01: Discovery](./step-01-discovery.md) — understand the problem, the users, and the strategic context.

[← Tutorial README](./README.md) | [Next >](./step-01-discovery.md)