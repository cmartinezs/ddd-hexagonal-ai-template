[← Tutorial README](./README.md) | [< Previous](./step-01-discovery.md) | [Next >](./step-03-design.md)

---

# Step 02: Requirements

**What This Is**: Defining what the system must do. Requirements are precise, verifiable, and traceable back to Discovery actors and needs. This phase transforms the "why" from Discovery into a concrete "what."

**How to Use**: Generate the glossary first, then individual requirement documents, then the priority matrix. Each step depends on the previous being complete.

**Why It Matters**: Requirements are the contract between what the system must do and what the team will build. Vague requirements produce wrong implementations. Precise requirements produce predictable deliveries.

**When to Use**: After Discovery (Phase 1) is complete. Before Design (Phase 3).

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

Produce the Requirements package for your project:

- `glossary.md` — 30–50 domain terms with definitions, context, and relationships
- Individual `fr-001-*.md` files — one per functional requirement, in Gherkin format
- Individual `rnf-001-*.md` files — one per non-functional requirement
- `priority-matrix.md` — MoSCoW prioritization of all requirements
- `scope-boundaries.md` — explicit in-scope and out-of-scope definitions

---

## 2. Prerequisites

- [ ] Phase 1 (Discovery) is complete — context-motivation, system-vision, actors, and needs-expectations are finalized
- [ ] You have a clear glossary of domain terms
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 2: Requirements"
- [ ] You have access to `01-templates/02-requirements/`

---

## 3. Instructions

1. **Generate the glossary first** — Define 30–50 domain terms before any requirements. The glossary establishes the shared vocabulary. Every subsequent document must use terms consistently from this glossary.

2. **Generate functional requirements** (`fr-001-*.md` etc.)
   - One document per requirement
   - Use Gherkin format (Given/When/Then) for acceptance criteria
   - Each requirement must trace to a Discovery actor or need
   - Describe "what" — never "how"

3. **Generate non-functional requirements** (`rnf-001-*.md` etc.)
   - Performance, scalability, security, availability
   - Quantified where possible (e.g., "<500ms response time", "99.9% uptime")
   - Cross-reference with functional requirements where applicable

4. **Generate `priority-matrix.md`**
   - Apply MoSCoW: Must / Should / Could / Won't
   - Table: FR/NFR | Category | Justification | Effort
   - Define the MVP clearly — what is the minimum viable set?

5. **Generate `scope-boundaries.md`**
   - Explicitly state what is in scope (MVP + Phase 2)
   - Explicitly state what is out of scope and why
   - Document candidate requirements that were considered and rejected, with rationale

> **Agnostic boundary**: Requirements are strictly technology agnostic. Do not mention databases, frameworks, languages, protocols, APIs, or implementation choices. Describe only functional behavior and measurable quality attributes.

---

## 4. AI Prompt

> Copy the prompt below, replace bracketed placeholders, and use it to generate the Requirements documents. Generate the glossary first, then requirements one at a time.

```
# Context
[Discovery completed — provide context-motivation and system-vision summary]
Project: [your project name]
Key actors: [list from actors.md]
Key needs: [list from needs-expectations.md]

# Task
Generate "01-templates/02-requirements/glossary.md" based on the template.

# Requirements
- 30-50 domain terms
- For each term:
  1. Definition (1-2 sentences)
  2. Context (when/where it's used)
  3. Synonyms (if applicable)
  4. Related to (other terms)
  5. Example

# Style
- Clear and precise (like a dictionary)
- Agnostic — e.g., no "JWT" but yes "session token"
- Include both business AND key technical concepts

# Validation
- [ ] Is every term defined without using undefined terms?
- [ ] Does it cover the key domain concepts?
```

---

## 5. Done Check

- [ ] `glossary.md` has 30–50 terms, each with definition, context, and example
- [ ] Each functional requirement (`fr-*.md`) traces to a Discovery need
- [ ] Each non-functional requirement (`rnf-*.md`) has quantified criteria
- [ ] Acceptance criteria in Gherkin format (Given/When/Then)
- [ ] `priority-matrix.md` defines MVP using MoSCoW
- [ ] `scope-boundaries.md` explicitly lists in-scope and out-of-scope items
- [ ] No technology names appear in any Requirements document
- [ ] Tech Lead and Product Manager have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 03: Design](./step-03-design.md) — define how the system flows, identify bounded contexts, and establish the domain model.

[← Tutorial README](./README.md) | [< Previous](./step-01-discovery.md) | [Next >](./step-03-design.md)