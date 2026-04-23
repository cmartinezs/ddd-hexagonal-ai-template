# Phase 4: Data Model

**What This Is**: The phase where design requirements translate into database schema. Entities, attributes, relationships, and data flow specifications are defined.

**How to Use**: Follow the templates in order: Entities → ERD → Data Flows. Each entity traces to a bounded context from Design phase.

**Why It Matters**: Without clear data model, teams build inconsistent schemas. The data model is the foundation — mistakes here cascade everywhere.

**When to Complete**: After Design (Phase 3). Before Development (Phase 6).

**Owner**: Database Architect + Backend Lead

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Documents to Complete](#documents-to-complete)
- [Design → Data Model Connection](#design--data-model-connection)
- [Phase Discipline Rules](#phase-discipline-rules)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)

---

## Documents to Complete

| Document | Purpose | Time | Owner |
|----------|---------|------|-------|
| [TEMPLATE-011-entities-and-relationships.md](./TEMPLATE-011-entities-and-relationships.md) | Entity definitions | 2-3 hours | Database Architect |
| [TEMPLATE-012-erd-diagram.md](./TEMPLATE-012-erd-diagram.md) | Visual ERD | 1-2 hours | Database Architect |
| [TEMPLATE-013-data-flows.md](./TEMPLATE-013-data-flows.md) | Data movement | 1-2 hours | Database Architect |

### Template Order

```
Design (Phase 3)
    ↓
Entities and Relationships (start here)
    ↓
ERD Diagram (visual representation)
    ↓
Data Flows (how data moves)
    ↓
Development (Phase 6)
```

---

## Design → Data Model Connection

**Before starting**, ensure Design phase is complete:

| Design Output | How It Shapes Data Model |
|---------------|--------------------------|
| **Bounded Contexts** | Each context → group of entities |
| **Ubiquitous Language** | Terms → entity names and attributes |
| **Domain Events** | Event payloads → entity fields |
| **System Flows** | Data read/written → entity attributes |

**Golden Rule**: Every entity traces to a bounded context in Design. Every attribute traces to a concept in Ubiquitous Language.

---

## Phase Discipline Rules

✅ **Before moving to Development, verify**:

1. ✅ **Every bounded context has entities**: Each context from Design has corresponding entities
2. ✅ **Every entity has attributes**: All data needed is captured
3. ✅ **Relationships are documented**: 1:1, 1:N, N:M clear
4. ✅ **ERD is valid**: No orphan relationships, no circular dependencies
5. ✅ **Constraints are defined**: Not null, unique, check constraints
6. ✅ **Timestamps on every entity**: created_at, updated_at (always include)
7. ✅ **Soft delete strategy defined**: For each entity
8. ✅ **Archival policy defined**: How long is data retained?
9. ✅ **Indexes identified**: What queries need to be fast?
10. ✅ **No implementation details**: This is schema, not code

❌ **EXCLUDE from Data Model phase**:

- Database technology (PostgreSQL, MySQL) — that's development choice
- Specific index types (B-tree, hash) — that's implementation
- Table names in different cases — that's convention
- Foreign key constraint names — that's implementation
- Partitioning strategy — that's operations

---

## Completion Checklist

### Deliverables

- [ ] All entities defined with attributes
- [ ] Each entity traces to bounded context
- [ ] Relationships clearly documented (1:1, 1:N, N:M)
- [ ] ERD diagram created (Mermaid or external tool)
- [ ] Validation rules and constraints defined
- [ ] Primary keys defined (UUID recommended)
- [ ] Timestamps on every entity
- [ ] Soft delete strategy for each entity
- [ ] Archival and retention policies defined
- [ ] Query indexes identified
- [ ] Data flows documented
- [ ] No database technology names

### Sign-Off

- [ ] **Prepared by**: [Database Architect], [Date]
- [ ] **Reviewed by**: [Backend Lead], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

## Summary

| Document | Key Question |
|----------|-------------|
| Entities and Relationships | What data exists? |
| ERD Diagram | How do entities relate? |
| Data Flows | How does data move through system? |

**Time Estimate**: 4-6 hours total  
**Team**: Database Architect, Backend Lead  
**Output**: Complete data model ready for implementation

**Definition of Done**:
- All bounded contexts from Design have entities
- ERD created and peer-reviewed
- Relationships and constraints clear
- Indexes identified for performance