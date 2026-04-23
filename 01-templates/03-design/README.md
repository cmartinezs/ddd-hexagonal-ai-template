# Phase 3: Design

**What This Is**: The phase where requirements translate into system behavior and domain structure. This phase bridges "what" (requirements) and "how" (implementation) using DDD strategic design — before diving into data model or code.

**How to Use**: Follow the templates in order based on your design approach:
- Lightweight: Start with System Flows only
- Full DDD: Strategic Design → Ubiquitous Language → Domain Events → Context Map → Bounded Contexts → Contracts → UI

**Why It Matters**: Without clear design, teams build the wrong thing or fight over meaning. Design validates that requirements are achievable and reveals gaps before code is written.

**When to Complete**: After Requirements (Phase 2) is complete. Before Data Model (Phase 4).

**Owner**: Designer/Architect lead + Product Manager + Engineering Lead

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

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

### Option A: Lightweight Design (Default for MVP)

Use for simple systems, single-team products, or short timelines:

| Document | Purpose | File |
|----------|---------|------|
| **System Flows** | How the system behaves for major workflows | [TEMPLATE-008](./TEMPLATE-008-system-flows.md) |

**Time**: 3-4 hours

**When to use**: MVP, simple domains, CRUD-heavy apps

### Option B: Domain-Driven Design (For Complex Domains)

Use for complex business logic, multiple teams, long-term products:

| Document | Purpose | File |
|----------|---------|------|
| **Strategic Design** | Subdomain classification, Domain Vision Statement | [TEMPLATE-009](./TEMPLATE-009-strategic-design.md) |
| **System Flows** | How the system behaves for major workflows | [TEMPLATE-008](./TEMPLATE-008-system-flows.md) |
| **Ubiquitous Language** | Domain terminology and concepts | [TEMPLATE-011](./TEMPLATE-011-ubiquitous-language.md) |
| **Domain Events** | Key business events and reactions | [TEMPLATE-012](./TEMPLATE-012-domain-events.md) |
| **Context Map** | How bounded contexts relate and integrate | [TEMPLATE-013](./TEMPLATE-013-context-map.md) |

**Supplements** (in subfolders):
- [Bounded Contexts](./bounded-contexts/) — Each major domain boundary detailed
- [Contracts](./contracts/) — How systems communicate
- [UI/UX](./ui/) — Screen designs and interaction patterns

**Time**: 6-8 hours

**When to use**: Complex domains, multiple teams, microservices

---

## Documents to Complete

### Core Documents

| Document | Description | Time | Owner |
|----------|-------------|------|-------|
| [TEMPLATE-008-system-flows.md](./TEMPLATE-008-system-flows.md) | System behavior for major workflows | 3-4 hours | Architect + PM |
| [TEMPLATE-009-strategic-design.md](./TEMPLATE-009-strategic-design.md) | Subdomain classification, vision | 1-2 hours | Architect |
| [TEMPLATE-011-ubiquitous-language.md](./TEMPLATE-011-ubiquitous-language.md) | Domain vocabulary | 2-3 hours | Domain Expert |
| [TEMPLATE-012-domain-events.md](./TEMPLATE-012-domain-events.md) | Key business events | 1-2 hours | Domain Expert |
| [TEMPLATE-013-context-map.md](./TEMPLATE-013-context-map.md) | Context relationships | 1-2 hours | Architect |

### Supplementary Documents

| Folder | Description | When |
|--------|-------------|------|
| [bounded-contexts/](./bounded-contexts/) | Each bounded context detailed | Using DDD |
| [contracts/](./contracts/) | API, event, integration contracts | Any integrations |
| [ui/](./ui/) | Design system, UX, screens | Any product with UI |

---

## Design → Requirements Connection

**Before starting**, ensure Requirements phase is complete:

| Requirements | How It Shapes Design |
|--------------|--------------------|
| **Functional Requirements** | Each FR → at least one system flow |
| **Non-Functional Requirements** | Performance/security targets guide decisions |
| **Scope Matrix** | In-scope items determine which flows to design |
| **Acceptance Criteria** | Flow paths validate acceptance criteria |

**Golden Rule**: Every flow must link to FR-XXX. Every screen must link to FR-XXX.

---

## Phase Discipline Rules

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

- [ ] **Prepared by**: [Designer/Architect], [Date]
- [ ] **Reviewed by**: [Product Manager, Engineering Lead], [Date]
- [ ] **Approved by**: [Product Director], [Date]

---

## Summary

| Approach | Deliverables | Time |
|----------|------------|------|
| **Lightweight** | System Flows only | 3-4 hours |
| **Full DDD** | Strategic + Flows + Language + Events + Context Map + Bounded Contexts | 6-8 hours |

**Time Estimate**: 3-8 hours (lightweight to full DDD)
**Team**: Designer/Architect (lead), Product Manager, Engineering Lead
**Output**: System behavior documented, domain model clear, ready for data model