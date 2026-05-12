[← Tutorial README](./README.md) | [< Previous](./step-05-planning.md) | [Next >](./step-07-testing.md)

---

# Step 06: Development

**What This Is**: Defining the technical architecture, API design, and coding standards. This is the first technology-specific phase — you name the actual stack, frameworks, and tools.

**How to Use**: Start with architecture (hexagonal/clean/layered), then APIs, then coding standards, then ADRs. Reference your bounded contexts from Phase 3 throughout.

**Why It Matters**: Development documentation is the contract between design and code. Clear specifications prevent inconsistent implementations and reduce review cycles.

**When to Use**: After Planning (Phase 5) is complete. Before coding begins (Phase 7+).

**Owner**: Tech Lead / Architect.

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

Produce the Development package for your project:

- `architecture.md` — hexagonal/layered architecture with module-to-context mapping
- `api-reference.md` — endpoint catalog with request/response examples
- `coding-standards.md` — naming conventions, patterns, anti-patterns
- `adr/` — Architecture Decision Records for major choices
- `workflow/` — git strategy, branch naming, PR conventions

---

## 2. Prerequisites

- [ ] Phase 5 (Planning) is complete — roadmap, epics, and milestones are defined
- [ ] Phase 3 (Design) is complete — bounded contexts and domain models are documented
- [ ] Engineering team has agreed on the technology stack
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASE 7: Development"
- [ ] You have access to `01-templates/06-development/`
- [ ] **Skill**: Consider invoking `/code-craftsmanship:software-design-philosophy` to validate architectural decisions

---

## 3. Instructions

1. **Exercise — Hexagonal Architecture Diagram**
   - Identify the core domain (from bounded contexts in Phase 3)
   - Define ports (interfaces the domain exposes) and adapters (implementations)
   - Draw the architecture layers:

   ```mermaid
   flowchart LR
       subgraph Adapters["Adapters (Driven)"]
           HTTP[HTTP Adapter]
           DB[Database Adapter]
       end
       subgraph Ports["Ports"]
           Input[Input Port]
           Output[Output Port]
       end
       subgraph Domain["Domain Core"]
           Entities[Entities]
           Services[Domain Services]
           Events[Domain Events]
       end
       HTTP --> Input
       Input --> Entities
       Entities --> Output
       Output --> DB
   ```

2. **Generate `architecture.md`**
   - Hexagonal/layered architecture with clear module boundaries
   - Map modules to bounded contexts from Phase 3
   - Key patterns: Repository, Factory, Anti-Corruption Layer, Domain Events
   - Request flow: how a request enters and is processed end-to-end

3. **Generate `api-reference.md`**
   - Per endpoint: method, route, parameters, response codes, errors
   - Request/response examples in JSON
   - Security: what roles can access which endpoints
   - API versioning strategy

4. **Generate `coding-standards.md`**
   - Naming conventions per layer (Controller, UseCase, Entity, Repository)
   - SOLID principles enforcement
   - Anti-patterns to avoid (anemic domain, God class, etc.)
   - Testing expectations per component type

5. **Generate ADRs** for major architectural decisions
   - Format: Context → Decision → Consequences
   - Examples: database choice, API protocol, authentication approach, caching strategy
   - One ADR per significant decision; include alternatives considered

6. **Generate `workflow/` files**
   - Branch strategy (main/develop/feature/hotfix)
   - Commit conventions (conventional commits)
   - PR rules (reviews, tests, squash)
   - CI/CD integration points

> **Technology-specific**: This phase explicitly names your stack. Document the actual frameworks, languages, databases, and tools your team uses.

---

## 4. AI Prompt

> Copy the prompt below, replace placeholders with your technology stack, and use it to generate the Development documents.

```
# Context
[Bounded contexts from Phase 3: list contexts and their responsibilities]
[Technology stack agreed by engineering team]
Project: [your project name]

# Technical Stack
Backend: [e.g., Java 21, Spring Boot 3.x]
Frontend: [e.g., React 19, TypeScript]
Database: [e.g., PostgreSQL 15]
Infrastructure: [e.g., Docker, Kubernetes]

# Task
Generate:
- "01-templates/06-development/architecture.md" — hexagonal architecture with bounded context mapping
- "01-templates/06-development/api-reference.md" — REST endpoint catalog
- "01-templates/06-development/coding-standards.md" — conventions, patterns, anti-patterns
- "01-templates/06-development/dr/" — 3-5 Architecture Decision Records for major choices

# Architecture Requirements
- Hexagonal / clean / layered architecture (per your stack)
- Modules to Bounded Contexts map (from Phase 3)
- Key patterns: Repository, Factory, Anti-Corruption Layer
- Request flow diagram (Mermaid)

# API Reference Requirements
- Per endpoint: method, route, parameters, response, errors
- Request/response examples
- Security notes (role-based access)

# Coding Standards Requirements
- Naming pattern per role (Controller, UseCase, Entity, etc.)
- SOLID principles
- Anti-patterns to avoid
- Testing expectations

# ADR Format (per decision)
- Context: what forced the decision?
- Decision: what was chosen?
- Consequences: what are the outcomes (positive and negative)?
- Alternatives considered

# Validation
- [ ] Does architecture reflect the domain model from Phase 3?
- [ ] Are API conventions clear and consistent?
- [ ] Does coding standards cover all layers?
- [ ] Are ADRs complete with alternatives?
```

---

## 5. Done Check

- [ ] `architecture.md` has hexagonal/layered diagram with module-to-context mapping
- [ ] `api-reference.md` has all endpoints documented with request/response examples
- [ ] `coding-standards.md` covers naming, patterns, and anti-patterns
- [ ] At least 3 ADRs are documented (database, API protocol, authentication)
- [ ] `workflow/` has branch strategy, commit conventions, and PR rules
- [ ] Each ADR traces to a specific design decision from Phase 3
- [ ] Tech Lead and Architecture have reviewed and signed off

---

## 6. Next Step

Proceed to [Step 07: Testing](./step-07-testing.md) — define the testing strategy, pyramid, and test plans. Ensure every requirement has a corresponding test.

[← Tutorial README](./README.md) | [< Previous](./step-05-planning.md) | [Next >](./step-07-testing.md)