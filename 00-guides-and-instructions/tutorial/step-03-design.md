[← Tutorial README](./README.md) | [< Previous](./step-02-requirements.md) | [Next >](./step-04-data-model.md)

---

# Step 03: Design

**What This Is**: Defining how the system flows and modeling the domain structure. Design translates requirements into bounded contexts, system flows, and domain models — all technology agnostic.

**How to Use**: Generate strategic design first (bounded contexts), then system flows, then individual context models. Each step builds on the previous.

**Why It Matters**: Design is where the abstract requirements become tangible domain structures. Bounded contexts give teams clear ownership. System flows give everyone a shared understanding of how the system works.

**When to Use**: After Requirements (Phase 2) is complete. Before Data Model (Phase 4).

**Owner**: Tech Lead + Domain Expert.

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

Produce the Design package for your project:

- `strategic-design.md` — bounded contexts, subdomain classification, ubiquitous language map
- `system-flows.md` — 5–10 major system flows with diagrams
- `bounded-contexts/*.md` — one file per bounded context with domain model details

---

## 2. Prerequisites

- [ ] Phase 2 (Requirements) is complete — glossary, FR/NFR, priority matrix, and scope boundaries are finalized
- [ ] You have identified the main domain areas from your requirements
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 3: Design & Process"
- [ ] You have access to `01-templates/03-design/`
- [ ] **Skill**: Consider invoking `/domain-driven-design` to validate bounded context boundaries before generating documents

---

## 3. Instructions

1. **Exercise — Identify Bounded Contexts**
   - Review your requirements and group related functionality into domain areas
   - Each bounded context should have a single, coherent responsibility
   - Use the following classification: Core Domain (competitive differentiation), Supporting Domain (necessary but generic), Generic Domain (commodity)
   - Document the ubiquitous language per context — key terms that are unique to that context

   Example Mermaid for context map:
   ```mermaid
   flowchart LR
       subgraph Core["Core Domain"]
           BC1[Game Management]
       end
       subgraph Supporting["Supporting Domain"]
           BC2[Player Registry]
           BC3[Deck Builder]
       end
       subgraph Generic["Generic Domain"]
           BC4[Authentication]
       end
       BC1 --> BC2
       BC1 --> BC3
       BC4 --> BC1
   ```

2. **Generate `strategic-design.md`**
   - Domain vision statement (why these contexts exist)
   - Subdomain classification with rationale
   - Bounded contexts: name, responsibility, ubiquitous language
   - Aggregate locations per context

3. **Generate `system-flows.md`**
   - Document 5–10 main flows (registration, main business process, errors, admin, integrations)
   - Per flow: name, actors, steps, decisions, successful exit, alternatives
   - Include Mermaid diagram (sequence or flowchart)
   - Trace each flow to at least one requirement

4. **Generate bounded context model files** (one per context)
   - Context purpose and ubiquitous language (10–15 key terms)
   - Main aggregates (root entities, value objects)
   - Domain invariants (what must always be true)
   - Domain events (what happens when something important occurs)
   - Interfaces with other contexts

> **Agnostic boundary**: Design is strictly technology agnostic. Do not mention databases, frameworks, languages, protocols, or APIs. Describe only domain logic, flows, and structures.

---

## 4. AI Prompt

> Copy the prompt below and use it to generate the strategic design document. Customize the bounded contexts list with your own domain areas.

```
# Context
[Requirements completed — provide glossary and key requirements]
Project: [your project name]
Initial Bounded Contexts identified: [e.g., Game Management, Player Registry, Deck Builder]
Subdomain candidates: [core/supporting/generic classification for each]

# Task
Generate "01-templates/03-design/strategic-design.md"

# Requirements
- 1. Domain Vision Statement (why these contexts)
- 2. Subdomain Classification:
   - Core Domains (competitive differentiation)
   - Supporting Domains (necessary but generic)
   - Generic Domains (commodity)
- 3. Bounded Contexts (name, responsibility, ubiquitous language)
- 4. Ubiquitous Language (key terms per context, 10-15 terms each)
- 5. Aggregate Locations (aggregate roots per context)

# Style
- DDD-centric (contexts, subdomains, aggregates language)
- Implementation agnostic
- Include rationale (why these boundaries, not others)

# Validation
- [ ] Does each context have a unique and clear responsibility?
- [ ] Is ubiquitous language distinct per context?
- [ ] Is classification justified (Core/Supporting/Generic)?
- [ ] Are aggregate roots named and located?
```

---

## 5. Done Check

- [ ] `strategic-design.md` has all 5 sections with bounded contexts named and classified
- [ ] At least one Mermaid context map diagram is present and readable
- [ ] Ubiquitous language is distinct per context (no shared terms without definition)
- [ ] `system-flows.md` has 5–10 flows, each traced to at least one requirement
- [ ] Each bounded context has a model file with aggregates, invariants, and domain events
- [ ] No technology names appear in any Design document
- [ ] Each aggregate root traces to a domain concept from the requirements
- [ ] Tech Lead and Domain Expert have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 04: Data Model](./step-04-data-model.md) — define entities, attributes, and relationships. Ensure every entity traces back to a bounded context from Design.

[← Tutorial README](./README.md) | [< Previous](./step-02-requirements.md) | [Next >](./step-04-data-model.md)