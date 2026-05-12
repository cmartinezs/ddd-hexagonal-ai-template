[← Tutorial README](./README.md) | [< Previous](./step-04-data-model.md) | [Next >](./step-06-development.md)

---

# Step 05: Planning

**What This Is**: Defining the delivery roadmap, epics, and milestones. Planning connects requirements to a concrete, time-bound delivery plan with clear priorities and dependencies.

**How to Use**: Start with the roadmap (phases and milestones), then define epics, then validate the Phase 5 chain (requirements → epics → milestones).

**Why It Matters**: Planning transforms documented requirements into actionable delivery. Without it, requirements float without deadlines, priorities conflict without resolution, and teams lack a shared view of progress.

**When to Use**: After Data Model (Phase 4) is complete. Before Development (Phase 6).

**Owner**: Product Manager + Tech Lead.

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

Produce the Planning package for your project:

- `roadmap.md` — 6–12 month delivery plan with phases, milestones, and dependencies
- `epics.md` — functional requirement groups mapped to milestones
- `milestones.md` — concrete delivery milestones with acceptance criteria
- `versioning-strategy.md` — how the project versions its releases

---

## 2. Prerequisites

- [ ] Phase 2 (Requirements) is complete — FR/NFR, priority matrix, and scope boundaries are finalized
- [ ] Phase 4 (Data Model) is complete — entities and relationships are documented
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 6: Planning"
- [ ] You have access to `01-templates/05-planning/`
- [ ] **Skill**: Consider invoking `/writing:proposal-writer` when drafting the roadmap proposal for stakeholder alignment

---

## 3. Instructions

1. **Exercise — Phase 5 Chain Validation**
   - Every requirement (FR/NFR) must belong to an **Epic**
   - Every Epic must be assigned to a **Milestone**
   - Every Milestone must have a **Phase** in the roadmap
   - Trace the chain: `FR → Epic → Milestone → Roadmap Phase`
   - If any requirement is untraceable, it was not properly scoped

2. **Generate `roadmap.md`**
   - 6–12 month vision divided into delivery phases (MVP → Phase 2 → Phase 3...)
   - Per phase: name, estimated duration, included epics, expected result
   - Dependencies between phases (what must be complete before the next can start)
   - Milestones with target dates
   - Decision points and go/no-go gates

3. **Generate `epics.md`**
   - Group functional requirements by feature or capability
   - Per epic: name, description, which FR it contains, priority, estimation (story points)
   - Link each epic to the MoSCoW priority from Phase 2
   - Ensure epics cover all must-have requirements in the MVP

4. **Generate `milestones.md`**
   - Per milestone: name, target date, acceptance criteria, which epics it includes
   - Define clear, testable outcomes for each milestone
   - Mark MVP as the first milestone with explicit success criteria

5. **Generate `versioning-strategy.md`**
   - Semantic versioning approach (major.minor.patch)
   - When to increment each number
   - Release cadence and deprecation policy

> **Agnostic boundary**: Planning is strictly technology agnostic. Do not mention frameworks, languages, or deployment tools. Describe only delivery phases, milestones, and content scope.

---

## 4. AI Prompt

> Copy the prompt below, replace placeholders with your requirements and priorities, and use it to generate the Planning documents.

```
# Context
[Requirements completed — provide priority matrix and scope boundaries]
[Phase 2 MVP definition: list of must-have FR/NFR]
[Phase 4 entities summary]
Project: [your project name]
Estimated duration: [e.g., 8 months]

# Task
Generate "01-templates/05-planning/roadmap.md" and "01-templates/05-planning/epics.md"

# Roadmap Requirements
- 6-12 month vision
- Delivery phases (MVP → Phase 2 → Phase 3...)
- Per phase: name, estimated duration, included epics, expected result
- Dependencies between phases (what must be complete before next starts)
- Milestones with target dates and acceptance criteria
- MVP milestone clearly defined as the first deliverable

# Epics Requirements
- Group FR by feature/capability
- Per epic: name, description, included FR, priority (MoSCoW from Phase 2), estimation (story points)
- All MVP must-have requirements must be in an epic assigned to the MVP milestone

# Phase 5 Chain Validation
- Every FR must belong to an epic
- Every epic must be assigned to a milestone
- Every milestone must have a roadmap phase
- Chain: FR → Epic → Milestone → Roadmap Phase

# Style
- Delivery-focused, technology agnostic
- Concrete milestones with testable acceptance criteria
- Clear MVP definition with explicit success criteria

# Validation
- [ ] Is the MVP clearly defined with all must-have requirements included?
- [ ] Are dependencies between phases explicit?
- [ ] Is the chain FR → Epic → Milestone → Phase validated?
- [ ] Are estimations internally consistent (story points scaled by team velocity)?
```

---

## 5. Done Check

- [ ] `roadmap.md` has 3+ delivery phases with dependencies and milestone dates
- [ ] `epics.md` has all functional requirements grouped into epics
- [ ] `milestones.md` has MVP milestone with testable acceptance criteria
- [ ] `versioning-strategy.md` defines semantic versioning approach
- [ ] Phase 5 chain is validated: every FR → Epic → Milestone → Phase
- [ ] No technology names appear in any Planning document
- [ ] MVP milestone covers all MoSCoW "Must" requirements from Phase 2
- [ ] Product Manager and Tech Lead have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 06: Development](./step-06-development.md) — define the technical architecture, API design, and coding standards. This is the first technology-specific phase.

[← Tutorial README](./README.md) | [< Previous](./step-04-data-model.md) | [Next >](./step-06-development.md)