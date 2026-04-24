[← Index](../README.md) | [< Previous](../05-planning/README.md) | [Next >](./TEMPLATE-017-architecture.md)

---

# Phase 6: Development

You are an architect or tech lead responsible for defining the technical implementation: architecture patterns, API designs, coding standards, and technology stack choices. This template collection helps you translate requirements into clear technical specifications that development teams can follow.

## Purpose

**What This Is**: The phase where product requirements translate into technical architecture, APIs, coding standards, and technology choices. This is where "what we build" becomes "how we build it"

**How to Use**: Start with architecture dimensions (strategic choices). Then define APIs, coding standards, ADRs. This is the reference document that guides all code written in Phase 7+

**Why It Matters**: Without clear development specifications, teams make inconsistent architectural choices, APIs fragment, and code quality degrades. Phase 6 prevents technical debt from the start

**When to Complete**: After Planning (Phase 5). Before Development starts (Phase 7)

**Owner**: Tech Lead / Architect

## What This Phase Produces

| Deliverable | Description | Time to Complete |
|------------|-------------|------------------|
| [architecture-dimensions/](./architecture-dimensions/README.md) | Architecture dimensions (Internal, Deployment, Communication, Infrastructure) | 4-6 hours |
| [api/](./api/README.md) | API design styles (REST, GraphQL, gRPC, WebSocket) | 2-3 hours |
| [coding/](./coding/README.md) | Coding standards (principles, SOLID, patterns, naming) | 2-3 hours |
| [auth/](./auth/README.md) | Authentication, Authorization, Validation (optional) | 2-3 hours |
| [dr/](./TEMPLATE-020-adr.md) | Architecture Decision Records | 30 min per ADR |
| [observability/](./observability/README.md) | Logs, metrics, traces, health checks (optional) | 2-3 hours |
| [data-storage-patterns/](./data-storage-patterns/README.md) | Database storage: Relational, NoSQL, Cache, Object, Search, Datalake | 2-3 hours |
| [api/rest/](./api/rest/README.md) | Endpoint catalog + templates | 3-4 hours |
| [workflow/](./workflow/README.md) | Branches, commits, PRs, CI/CD (optional) | 1-2 hours |
| [glossary/](./glossary/README.md) | Technical terms reference by category | 1-2 hours |
| [frontend/](./frontend/README.md) | Frontend: Web, Mobile, Desktop, UI Design, State, Integration | 2-3 hours |
| [ai-agents/](./ai-agents/README.md) | AI agents in development, workflows, operations | 1-2 hours |
| [knowledge/](./knowledge/README.md) | Tasks, lessons learned, inconsistencies | 1-2 hours |
| [TEMPLATE-capability-matrix.md](./TEMPLATE-capability-matrix.md) | System capabilities by Bounded Context, status, effort | 2-3 hours |

## Diagram Convention

This phase uses diagrams to visualize:
- Architecture layers (flowchart using Mermaid)
- API flow sequences (sequence diagram using Mermaid)
- Authorization hierarchy (graph using Mermaid)
- Database relationships (erDiagram using Mermaid)

```
Priority: Mermaid → PlantUML → ASCII
See: navigation-conventions.md in 00-documentation-planning/
```

## Contents

- [Architecture](#architecture)
- [API Design](#api-design)
- [Coding Standards](#coding-standards)
- [ADRs](#adrs)
- [Authentication Flows](#authentication-flows)
- [Authorization Patterns](#authorization-patterns)
- [Validation Strategy](#validation-strategy)
- [Observability](#observability)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Workflow](#workflow)
- [Glossary](#glossary)
- [Frontend Architecture](#frontend-architecture)

---

## Development Philosophy

**What This Section Is**: Why Phase 6 specifications matter, and the core principles that should guide your technical decisions.

### Why It Matters

Development phase bridges requirements and code. Without clear specifications:
- Teams make inconsistent architectural choices
- APIs become fragmented
- Code quality degrades over time
- New team members can't understand decisions

### Core Principles

1. **Architecture First**: Define structure before writing code
2. **API-First**: Design contracts before implementation
3. **Document Decisions**: Future engineers need to understand "why"
4. **Standards Enable**: Conventions make code reviews faster

### Relationship with Previous Phases

```
Planning (Phase 5)
    ↓
    → Epics → Architecture structure
    → Use cases → API endpoints
    → Proposals → Tasks → Workflow

Requirements (Phase 2)
    ↓
    → RFs → API requirements
    → RNFs → Non-functional specs

Design (Phase 3)
    ↓
    → Bounded contexts → Modules
    → Domain events → Event contracts
    → Ubiquitous language → Code naming
```

---

## Completion Checklist

### Before Development
- [ ] Architecture defined (from Design Phase)
- [ ] Bounded contexts documented
- [ ] Use cases catalog completed
- [ ] Issue tracker setup

### Development Deliverables
- [ ] System architecture documented
- [ ] All APIs designed and specified
- [ ] Authentication flows documented
- [ ] Authorization patterns defined
- [ ] Validation strategy documented
- [ ] Observability setup defined
- [ ] Database schema documented
- [ ] Coding standards established
- [ ] Workflow defined
- [ ] Glossary completed
- [ ] ADRs created for major decisions
- [ ] Frontend architecture defined

### Sign-Off
- [ ] **Prepared by**: [Tech Lead, Architects]
- [ ] **Reviewed by**: [Engineering Team]
- [ ] **Approved by**: [Architecture Lead]

---

## AI Assistance

### What AI Can Do Well
- Generate API contract templates
- Write basic entity structures
- Suggest validation rules
- Document patterns
- Create ADR templates

### What Needs Human Input
- Technology stack decisions
- Security decisions
- Performance requirements
- Team workflow preferences

---

[← Index](../README.md) | [< Previous](../05-planning/README.md) | [Next >](./TEMPLATE-017-architecture.md)