# Bounded Contexts — Templates

This folder contains template for documenting each bounded context in detail using DDD strategic design.

---

## Document

| Document | Purpose | File |
|----------|---------|------|
| **Bounded Context Template** | Detailed model for each context | [TEMPLATE-bounded-context.md](./TEMPLATE-bounded-context.md) |

---

## When to Use

Use Bounded Context templates when using DDD approach and documenting each context in detail:

- Context purpose and responsibilities
- Ubiquitous language for this context
- Aggregates and entities
- Domain events published
- Integration with other contexts

---

## Template Structure

The Bounded Context template includes:

1. **Context Purpose** — What this context owns and why it's separate
2. **Core Responsibilities** — 3-5 key responsibilities
3. **Ubiquitous Language** — Terms specific to this context
4. **Aggregates** — Consistency boundaries
5. **Entities** — Domain objects with identity
6. **Value Objects** — Immutable concepts
7. **Domain Services** — Orchestration logic
8. **Ports** — Integration boundaries (input/output)
9. **Domain Events** — Events this context publishes
10. **Context Relationships** — Upstream/downstream contexts

---

[← Back to Design Index](../README.md)