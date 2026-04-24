# Phase 3: Design

Your role in this phase is to translate the completed requirements from Phase 2 into explicit system behavior and domain structure. This phase produces the design artifacts that make requirements concrete — before any data model or code decisions are made.

Before you begin, verify that Requirements (Phase 2) is complete. Every design artifact you produce must trace back to a specific functional requirement (FR-XXX). Design that cannot be traced to a requirement is out of scope.

**Phase position**: After Requirements (Phase 2). Before Data Model (Phase 4).
**Phase owner**: Designer/Architect lead + Product Manager + Engineering Lead
**Diagram convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Design Approach](#design-approach)
- [Documents to Complete](#documents-to-complete)
- [Design → Requirements Connection](#design--requirements-connection)
- [Phase Discipline Rules](#phase-discipline-rules)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)

---

## Design Approach

Choose the design path based on the system's complexity. Your choice determines which documents you must produce. If the domain has more than one team, complex business rules, or long-term product ambitions, default to Option B.

### Option A: Lightweight Design (Default for MVP)

Apply this path when the system is simple, single-team, or time-constrained. You will produce one document: a set of system flows covering all major requirements.

| Document | Purpose | File |
|----------|---------|------|
| **System Flows** | How the system behaves for major workflows | [TEMPLATE-008](./TEMPLATE-008-system-flows.md) |

**Time**: 3-4 hours
**When to use**: MVP, simple domains, CRUD-heavy apps

### Option B: Domain-Driven Design (For Complex Domains)

Apply this path when the domain is complex, multi-team, or long-lived. Produce documents in the order listed — each one provides inputs the next depends on.

| Document | Purpose | File |
|----------|---------|------|
| **Strategic Design** | Subdomain classification, Domain Vision Statement | [TEMPLATE-009](./TEMPLATE-009-strategic-design.md) |
| **System Flows** | How the system behaves for major workflows | [TEMPLATE-008](./TEMPLATE-008-system-flows.md) |
| **Ubiquitous Language** | Domain terminology and concepts | [TEMPLATE-011](./TEMPLATE-011-ubiquitous-language.md) |
| **Domain Events** | Key business events and reactions | [TEMPLATE-012](./TEMPLATE-012-domain-events.md) |
| **Context Map** | How bounded contexts relate and integrate | [TEMPLATE-013](./TEMPLATE-013-context-map.md) |

**Supplements** (in subfolders — produce when conditions apply):
- [Bounded Contexts](./bounded-contexts/) — Each major domain boundary detailed
- [Contracts](./contracts/) — How systems communicate
- [UI/UX](./ui/) — Screen designs and interaction patterns

**Time**: 6-8 hours
**When to use**: Complex domains, multiple teams, microservices

---

## Documents to Complete

Track which documents you need to produce. For each document you fill in, replace all placeholder text (`[...]`) with actual project content. Do not leave instructional text in the output.

### Core Documents

These are the primary design artifacts. Produce all that apply to your chosen approach.

| Document | Description | Time | Owner |
|----------|-------------|------|-------|
| [TEMPLATE-008-system-flows.md](./TEMPLATE-008-system-flows.md) | System behavior for major workflows | 3-4 hours | Architect + PM |
| [TEMPLATE-009-strategic-design.md](./TEMPLATE-009-strategic-design.md) | Subdomain classification, vision | 1-2 hours | Architect |
| [TEMPLATE-011-ubiquitous-language.md](./TEMPLATE-011-ubiquitous-language.md) | Domain vocabulary | 2-3 hours | Domain Expert |
| [TEMPLATE-012-domain-events.md](./TEMPLATE-012-domain-events.md) | Key business events | 1-2 hours | Domain Expert |
| [TEMPLATE-013-context-map.md](./TEMPLATE-013-context-map.md) | Context relationships | 1-2 hours | Architect |

### Supplementary Documents

Produce these supplements when the stated condition is met. Do not skip them if the condition applies to the project.

| Folder | Description | When |
|--------|-------------|------|
| [bounded-contexts/](./bounded-contexts/) | Each bounded context detailed | Using DDD |
| [contracts/](./contracts/) | API, event, integration contracts | Any integrations |
| [ui/](./ui/) | Design system, UX, screens | Any product with UI |

---

## Design → Requirements Connection

Before producing any design artifact, confirm the traceability below. Use the requirements produced in Phase 2 as your input. If a requirement exists but has no corresponding design artifact, that is a gap you must fill.

| Requirements Source | How It Shapes Design |
|--------------------|---------------------|
| **Functional Requirements** | Each FR → at least one system flow |
| **Non-Functional Requirements** | Performance/security targets guide decisions |
| **Scope Matrix** | In-scope items determine which flows to design |
| **Acceptance Criteria** | Flow paths validate acceptance criteria |

**Golden Rule**: Every flow must link to FR-XXX. Every screen must link to FR-XXX.

---

## Phase Discipline Rules

Apply these rules to every artifact you produce in this phase. They enforce the boundary between design (behavior) and development (technology). Violations will require rework in later phases.

✅ **Before moving to Data Model phase, verify**:

1. ✅ **Every requirement has a flow**: Each FR → at least one system flow (SF-XXX)
2. ✅ **Every flow traces back**: SF-XXX links to FR-XXX in "Related Requirements"
3. ✅ **Exception paths documented**: Error cases, timeouts, validation failures covered
4. ✅ **No technology in flows**: Don't mention JWT, REST, PostgreSQL, React (that's development)
5. ✅ **No implementation details**: Avoid MVC, repositories, factories, design patterns
6. ✅ **If using DDD**: Ubiquitous language, domain events, context map documented
7. ✅ **Data flow clear**: What data moves, transforms, and persists
8. ✅ **Stakeholder validated**: Product and engineering reviewed and approved

❌ **EXCLUDE from Design phase**:

- Technology choices (REST, GraphQL, databases)
- Implementation patterns (repository, singleton)
- Code structure (folders, files, classes)
- API endpoints or schemas
- Database tables or schemas

---

## Completion Checklist

Before signaling this phase complete, verify every item below. Mark a checkbox only when the corresponding content is real project information — not placeholder text.

### Deliverables

- [ ] All major workflows documented (system flows)
- [ ] Each flow traces to requirement (FR-XXX)
- [ ] Happy path and exception paths covered
- [ ] Data flow documented
- [ ] (If DDD) Strategic design defined
- [ ] (If DDD) Ubiquitous language documented
- [ ] (If DDD) Domain events documented
- [ ] (If DDD) Context map created
- [ ] (If DDD) Bounded contexts detailed
- [ ] (If integrations) Contracts documented
- [ ] No technology/implementation details
- [ ] Stakeholder sign-off obtained

### Sign-Off

Record the names and dates of those who reviewed and approved this phase's output before it is used as input to Phase 4.

- [ ] **Prepared by**: [Designer/Architect], [Date]
- [ ] **Reviewed by**: [Product Manager, Engineering Lead], [Date]
- [ ] **Approved by**: [Product Director], [Date]

---

## Summary

This table summarizes what you will produce depending on the approach chosen.

| Approach | Deliverables | Time |
|----------|------------|------|
| **Lightweight** | System Flows only | 3-4 hours |
| **Full DDD** | Strategic + Flows + Language + Events + Context Map + Bounded Contexts | 6-8 hours |

**Time Estimate**: 3-8 hours (lightweight to full DDD)
**Team**: Designer/Architect (lead), Product Manager, Engineering Lead
**Output**: System behavior documented, domain model clear, ready for data model
