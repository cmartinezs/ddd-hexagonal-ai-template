[← Tutorial README](./README.md) | [< Previous](./step-03-design.md) | [Next >](./step-05-planning.md)

---

# Step 04: Data Model

**What This Is**: Defining how information is structured across the system. The data model captures entities, their attributes, and the relationships between them — all traced back to bounded contexts from the Design phase.

**How to Use**: Generate entity documents and relationship diagrams together. Ensure every entity aligns with a bounded context and every relationship supports a system flow.

**Why It Matters**: The data model is the bridge between domain design and implementation. A well-structured data model makes implementation straightforward; a poorly structured one creates technical debt that compounds over time.

**When to Use**: After Design (Phase 3) is complete. Before Planning (Phase 5).

**Owner**: Tech Lead + Data Architect.

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

Produce the Data Model package for your project:

- `entities.md` — all domain entities with attributes, types, constraints, and invariants
- `relationships.md` — entity relationships with cardinality and rationale
- ERD diagram (Mermaid)

---

## 2. Prerequisites

- [ ] Phase 3 (Design) is complete — bounded contexts, system flows, and context models are finalized
- [ ] You have a glossary from Phase 2 with domain terms defined
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 5: Data Model"
- [ ] You have access to `01-templates/04-data-model/`
- [ ] **Skill**: Consider invoking `/domain-driven-design` to validate aggregate vs. entity distinctions before documenting

---

## 3. Instructions

1. **Exercise — Aggregate vs. Entity Distinction**
   - An **Aggregate Root** is the central entity in a bounded context — it enforces invariants and is the entry point for all operations on related objects
   - An **Entity** has its own identity and lifecycle but is always accessed through its aggregate root
   - A **Value Object** has no identity — it is defined entirely by its attributes

   Examples for a TCG (Trading Card Game) project:

   | Concept | Type | Reason |
   |---------|------|--------|
   | `Card` | Aggregate Root | Identity + invariants (rules compliance), entry point for game operations |
   | `CardEffect` | Value Object | No identity — defined by effect type, conditions, and result |
   | `GameSession` | Entity | Has identity, lifecycle within a session, accessed through `Card` aggregate |

2. **Generate `entities.md`**
   - Per domain entity: name, description, attributes (type, required/optional, constraints), invariants
   - Mark aggregate roots explicitly
   - Indicate which bounded context each entity belongs to
   - Note special handling: soft delete, audit fields, versioning

3. **Generate `relationships.md`**
   - Define all relationships: (1:1, 1:N, N:N), mandatory/optional
   - Document rationale for each relationship (why does this connection exist?)
   - Include the ERD diagram using Mermaid

   Example Mermaid ERD:
   ```mermaid
   erDiagram
       CARD {
           string id PK
           string name
           string type
           int manaCost
       }
       CARDEFFECT {
           string effectType
           string conditions
           string result
       }
       GAME_SESSION {
           string id PK
           string status
           timestamp startTime
           timestamp endTime
       }
       CARD ||--o{ CARDEFFECT : has
       GAME_SESSION ||--o{ CARD : contains
   ```

4. **Validate relationships against system flows**
   - Every relationship should support at least one system flow from Phase 3
   - If a relationship exists without supporting a flow, question whether it is needed

> **Agnostic boundary**: Data Model is strictly technology agnostic. Use "unique identifier" not "UUID/SERIAL". Use "text" not "VARCHAR". Use "number" not "INT/BIGINT". Describe domain structure, not database schema.

---

## 4. AI Prompt

> Copy the prompt below, replace placeholders with your bounded contexts and entities, and use it to generate the Data Model documents.

```
# Context
[Design phase completed — provide strategic-design.md summary and bounded contexts]
[Requirements glossary — provide key domain terms]
Project: [your project name]
Bounded Contexts: [list from Phase 3]
Key Entities identified: [list per context]

# Task
Generate "01-templates/04-data-model/entities.md" and "01-templates/04-data-model/relationships.md"

# Entities Document Requirements
Per domain entity:
  1. Name and description
  2. Attributes (type, optional/required, constraints)
  3. Invariants (what must always hold)
  4. Origin (from which requirement or bounded context it comes)
  5. Notes (e.g., "soft delete", "auditable", etc.)
- Consolidated table with all entities
- Mark aggregate roots explicitly

# Relationships Document Requirements
- ERD Diagram (Mermaid: entity relationship)
- Per relationship: cardinality (1:1, 1:N, N:N), mandatory/optional
- Relationships table with justification
- Every relationship must support at least one system flow

# Style
- DB agnostic (use "unique identifier" not "SERIAL", "text" not "VARCHAR")
- Based on domain entities from the Design phase

# Validation
- [ ] Does each entity correspond to a domain concept from a bounded context?
- [ ] Do relationships support Design flows?
- [ ] Are there no unnecessary "generic" or "utility" tables?
- [ ] Is it technology agnostic (no database-specific terms)?
```

---

## 5. Done Check

- [ ] `entities.md` lists all entities with attributes, types, constraints, and invariants
- [ ] Aggregate roots are marked explicitly
- [ ] Each entity traces to a bounded context from Phase 3
- [ ] `relationships.md` has ERD diagram in Mermaid
- [ ] Every relationship has cardinality and rationale
- [ ] Every relationship supports at least one system flow
- [ ] No technology-specific terms (use domain vocabulary only)
- [ ] Tech Lead and Data Architect have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 05: Planning](./step-05-planning.md) — define the delivery roadmap, epics, and milestones. Connect requirements to the project plan.

[← Tutorial README](./README.md) | [< Previous](./step-03-design.md) | [Next >](./step-05-planning.md)