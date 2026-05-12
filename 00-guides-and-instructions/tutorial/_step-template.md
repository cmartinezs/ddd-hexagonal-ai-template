[← Tutorial README](./README.md)

---

# Step File Template

**What This Is**: The standardized structure for every step file in the interactive tutorial.

**How to Use**: Copy this template when creating a new step file. Fill in each section with phase-specific content. Do not skip sections.

**Why It Matters**: Consistency across step files makes the tutorial easy to navigate and ensures every phase receives the same level of guidance.

**When to Use**: When creating a new step file (step-00 through step-11). Each step file uses this structure.

**Owner**: DDD + Hexagonal AI Template contributors.

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

**What This Section Is**: Defines the single, concrete output you will produce in this phase.

[Describe what the user will create. Be specific — name the document, the folder it lives in, and what it contains.]

Example output:
- A completed `01-templates/00-documentation-planning/MACRO-PLAN.md` for your project
- A `DOCUMENTATION-PLAN.md` with your project name, problem statement, and initial phase roadmap

---

## 2. Prerequisites

**What This Section Is**: Lists what must exist or be known before this step can begin.

[Document the required inputs from previous phases, the guides to read, and any decisions that must be made.]

Checklist:
- [ ] Previous step is complete
- [ ] Required guides are read
- [ ] Project context is known

---

## 3. Instructions

**What This Section Is**: Step-by-step tasks the user performs to produce the phase output.

[Numbered list of actionable tasks. Each task should be something the user can verify.]

1. [Task description]
2. [Task description]
3. [Task description]

> **Agnostic boundary reminder**: This phase is technology [agnostic / specific]. Do not mention [specific tech names] here.

---

## 4. AI Prompt

**What This Section Is**: A copy-paste ready prompt for generating the phase document, sourced from `INSTRUCTIONS-FOR-AI.md`.

> Copy the prompt below, replace bracketed placeholders with your project-specific context, and use it to generate the phase document.

```
[AI prompt from INSTRUCTIONS-FOR-AI.md — copy verbatim]
```

**Context to provide alongside this prompt:**
- Project name: [your project]
- Problem statement: [what problem does it solve]
- Known decisions: [what is already decided]
- Constraints: [any known limits]

---

## 5. Done Check

**What This Section Is**: A verification checklist the user runs to confirm the phase output is complete and correct.

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

**If any check fails**: Revise the output before proceeding. Do not move forward with incomplete or invalid documentation.

---

## 6. Next Step

**What This Section Is**: The entry point for the following phase.

[Link to the next step file with a brief description of what that phase produces.]

[Next >](./step-XX-[name].md)

---

[← Tutorial README](./README.md)