[← Tutorial README](./README.md) | [< Previous](./step-00-documentation-planning.md) | [Next >](./step-02-requirements.md)

---

# Step 01: Discovery

**What This Is**: Understanding the problem, the users, and the strategic context before designing solutions. Discovery establishes the "why" that drives every subsequent decision.

**How to Use**: Complete all three Discovery documents in order. Each document builds on the previous one. Do not skip or combine them.

**Why It Matters**: Discovery prevents building the wrong thing. It forces explicit answers to "who benefits, how, and why now?" before any technology decisions are made.

**When to Use**: After Phase 0 is complete. Before any requirements or design work.

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

Produce three Discovery documents for your project:

- `context-motivation.md` — the problem, market, and strategic why
- `system-vision.md` — the long-term future state and guiding principles
- `actors.md` + `needs-expectations.md` — who interacts with the system and what they need

---

## 2. Prerequisites

- [ ] Phase 0 is complete
- [ ] You have a clear problem statement for your project
- [ ] You have identified the main stakeholder categories
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 1: Discovery"
- [ ] You have access to `01-templates/01-discovery/`

---

## 3. Instructions

1. **Generate `context-motivation.md`**
   - Describe the specific problem you are solving
   - Include market context and competitive landscape
   - Document strategic motivation — why act now?
   - List stakeholders, initial risks, and opportunities

2. **Generate `system-vision.md`** (after context-motivation is approved)
   - Describe the long-term vision (3–5 years)
   - Define what the system is — and explicitly what it is NOT
   - Set 3–5 guiding principles
   - Define measurable success metrics

3. **Generate `actors.md` + `needs-expectations.md`** (together)
   - Identify 4–7 main actors (users, stakeholders, external systems)
   - Per actor: who they are, what they do, their incentives, constraints
   - Per actor: what they need, their pain points, what they currently use as alternatives
   - Mark needs as must-have vs. nice-to-have; note conflicts

> **Agnostic boundary**: Discovery is strictly technology agnostic. Do not mention databases, frameworks, languages, protocols, APIs, or any implementation technology. Describe only the business problem, the users, and the desired outcomes.

---

## 4. AI Prompt

> Copy the prompt below, replace bracketed placeholders with your project-specific context, and use it to generate the Discovery documents. Generate one document at a time; validate each before moving to the next.

```
# Context
My product is: [2-3 sentence description of your product]
Problem: [specific problem it solves]
Users: [who uses it]
Market: [market context]
Opportunity: [why now]

# Task
Generate "01-templates/01-discovery/context-motivation.md" based on the template in that folder.

# Requirements
Length: 2000-2500 words
Mandatory sections:
  1. Problem (clear formulation)
  2. Market context (competition, opportunity)
  3. Strategic motivation (why now)
  4. Stakeholders and impacted
  5. Initial risks (what could go wrong)
  6. Opportunities (what we gain if it works)
  7. Key assumptions (what we take as true)

# Style
- Technology agnostic (no framework names, languages, etc.)
- Accessible to non-technical readers (PM, executives)
- Professional but narrative
- Include examples where possible

# Post-generation validation
- [ ] Is the real problem clear (not the solution)?
- [ ] Is it understood why it's important now?
- [ ] Are all stakeholders mentioned?
- [ ] Is there concrete risk analysis?
- [ ] Is it agnostic? (no "database", "API", "frontend", etc.)
```

---

## 5. Done Check

- [ ] `context-motivation.md` is complete with all 7 sections
- [ ] `system-vision.md` is complete with vision, limits, principles, and metrics
- [ ] `actors.md` lists 4–7 actors with roles and incentives
- [ ] `needs-expectations.md` documents needs per actor with must-have vs. nice-to-have
- [ ] No technology names appear in any Discovery document (agnostic boundary verified)
- [ ] Each document traces to a stakeholder or need from Discovery
- [ ] Tech Lead and Product Manager have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 02: Requirements](./step-02-requirements.md) — define what the system must do, with traceable functional and non-functional requirements.

[← Tutorial README](./README.md) | [< Previous](./step-00-documentation-planning.md) | [Next >](./step-02-requirements.md)