[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-012-erd-diagram.md)

---

# Entities and Relationships Template

You are an AI agent or database architect responsible for defining the data model: the entities, attributes, relationships, and constraints that form the foundation for implementation. This template guides you in translating Design phase outputs (bounded contexts, domain concepts) into a complete, normalized data model.

**What This Is**: A template for defining all entities, their attributes, relationships, and constraints that will form the database schema

**How to Use**: Create one entity section per domain concept. Each entity must trace to a bounded context from Design phase. Follow the template structure exactly to ensure completeness

**Why It Matters**: Entity modeling mistakes cascade to code and operations. Clear, normalized entities prevent schema drift, enable consistent queries, and reduce rework during implementation

**When to Use**: After Design (Phase 3) is complete and approved. This is the first document in Phase 4 (Data Model)

**Owner**: Database Architect + Backend Lead

---

## Contents

- [Entity Structure](#entity-structure)
- [Attribute Types](#attribute-types)
- [Relationship Types](#relationship-types)
- [Constraint Types](#constraint-types)
- [Example Entities](#example-entities)
- [Completion Checklist](#completion-checklist)

---

## Entity Structure

**What This Section Is**: This section defines the standard template and components for every entity you document. Each entity represents a domain concept from your Design phase that requires data persistence.

Before showing examples, understand that every entity in this framework must include:

```markdown
## Entity: [EntityName]

**Purpose**: Brief description of what this entity represents
**Related Context**: [Which bounded context this belongs to]

### Primary Key
- `id`: UUID (recommended) or Auto-increment

### Attributes
| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| field_name | Type | constraints | Description |

### Relationships
| Relationship | Entity | Cardinality | Description |
|--------------|--------|:---------:|-------------|
| [Has one/Has many/Belongs to] | [Entity] | 1:1 / 1:N / N:M | Description |

### Constraints
- **Business**: [Domain rules enforced]
- **Data**: [DB-level rules]
- **Temporal**: [Time-based rules]

### Soft Delete
- **Strategy**: Yes/No
- **State field**: [if applicable, e.g., status enum]
- **Rationale**: Why?

### Indexes
- **Primary**: id (automatic)
- **Foreign Keys**: [referenced fields]
- **Query Optimization**: [fields used in WHERE/JOIN]

### Archival Policy
- **Retention**: [time period]
- **Method**: [archive to table / delete]

### Timestamps
- **created_at**: Always included
- **updated_at**: Always included
```

---

## Attribute Types

**What This Section Is**: A reference guide for the standard data types used in entity attributes. Using consistent types across your data model prevents confusion and enables consistent query patterns.

This table shows the most common attribute types and when to use each one:

| Type | Usage | Example |
|------|-------|----------|
| **UUID** | Primary keys | `id: uuid` |
| ** VARCHAR(n)** | Variable text | `name: varchar(255)` |
| **TEXT** | Long text | `description: text` |
| **BOOLEAN** | True/false | `active: boolean` |
| **INTEGER** | Whole numbers | `count: integer` |
| **DECIMAL(p,s)** | Precise numbers | `price: decimal(10,2)` |
| **TIMESTAMP** | Date and time | `created_at: timestamp` |
| **DATE** | Date only | `birth_date: date` |
| **JSONB** | Structured data | `metadata: jsonb` |
| **ENUM** | Fixed values | `status: enum('pending', 'active')` |

---

## Relationship Types

**What This Section Is**: A guide to the three fundamental relationship types between entities. Understanding these patterns is essential for creating a normalized schema that correctly represents your domain.

Every relationship between entities falls into one of these three categories. Document each relationship with its cardinality to ensure referential integrity:

| Relationship | Symbol | Description | Example |
|--------------|:------:|-------------|---------|
| **One-to-One** | 1:1 | Each record relates to exactly one record | User → Profile |
| **One-to-Many** | 1:N | Parent has many children | User → Tasks |
| **Many-to-Many** | N:M | Records relate to many on both sides | Users → Teams |

### Relationship Examples (Mermaid-style)

```
User (1) ────── (N) Task
  One user has many tasks

Organization (1) ────── (N) User
  One org has many users

User (N) ────── (M) Role
  Users can have many roles, roles can have many users
```

---

## Constraint Types

**What This Section Is**: The mechanisms for enforcing data quality and business rules at the database layer. Constraints prevent invalid data from ever being persisted, which is more reliable than checking at the application layer.

Document these constraint types for each entity. Database-level constraints are the source of truth for data validity:

| Constraint | Example | When to Use |
|------------|---------|-------------|
| **NOT NULL** | `email: varchar NOT NULL` | Required fields |
| **UNIQUE** | `email: varchar UNIQUE` | No duplicates |
| **FOREIGN KEY** | `user_id: uuid REFERENCES users(id)` | Referential integrity |
| **CHECK** | `status IN ('pending', 'active')` | Value validation |
| **EXCLUDE** | `daterange WITH &&` | Temporal overlap prevention |

---

## Example Entities

**What This Section Is**: Two complete, worked examples showing how to apply this template to real-world entities. These examples demonstrate the proper structure, level of detail, and traceability to Design phase concepts.

Study these examples carefully to understand the expected level of detail and the connections between each entity section:

### Example: User Entity

**What This Example Demonstrates**:
- How to trace an entity back to a bounded context from Design phase
- Proper attribute definition with types and constraints
- How soft delete strategy connects to business rules
- Index selection for performance optimization

## Entity: User

**Purpose**: Represents an actor who can authenticate and access the system
**Related Context**: Identity (from Design phase bounded context)

### Primary Key
- `id`: UUID (primary key)

### Attributes
| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique identifier |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| name | VARCHAR(255) | NULLABLE | Display name |
| status | ENUM | NOT NULL, DEFAULT 'pending' | pending/active/suspended |
| created_at | TIMESTAMP | NOT NULL | Record creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Relationships
| Relationship | Entity | Cardinality | Description |
|--------------|--------|:----------:|-------------|
| Has many | Task | 1:N | Tasks created by this user |
| Belongs to | Organization | N:1 | Organization this user belongs to |

### Constraints
- **Business**: Status can only be pending/active/suspended/deleted
- **Data**: Email must be unique system-wide
- **Temporal**: deleted_at implies status = deleted

### Soft Delete
- **Strategy**: Yes (using status field)
- **State field**: `status = 'deleted'`
- **Rationale**: Preserve audit trail, prevent data loss

### Indexes
- **Primary**: id (automatic)
- **Foreign Keys**: organization_id
- **Query Optimization**: email, status

### Archival Policy
- **Retention**: 7 years after deletion
- **Method**: Archive to _archived table

---

### Example: Organization Entity

**What This Example Demonstrates**:
- Multi-tenant isolation patterns in the data model
- How enumeration fields enforce state machine transitions
- Defining unique constraints for business identifiers
- Archival policy for compliance and data retention

## Entity: Organization

**Purpose**: Represents a tenant/organization with isolated data
**Related Context**: Organization (from Design phase bounded context)

### Primary Key
- `id`: UUID (primary key)

### Attributes
| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Organization name |
| slug | VARCHAR(100) | NOT NULL, UNIQUE | URL identifier |
| status | ENUM | NOT NULL | pending/active/suspended |
| created_at | TIMESTAMP | NOT NULL | When created |
| updated_at | TIMESTAMP | NOT NULL | Last update |

### Relationships
| Relationship | Entity | Cardinality | Description |
|--------------|--------|:----------:|-------------|
| Has many | User | 1:N | Members of org |
| Has many | Application | 1:N | Apps in org |

### Constraints
- **Business**: Slug must be lowercase, alphanumeric with dashes
- **Data**: Name required, slug unique

### Archival Policy
- **Retention**: 10 years after suspension
- **Method**: Archive to table

---

## Completion Checklist

**Before marking this document complete, ensure every item below is satisfied. These checklist items verify that your data model is production-ready and traceable to your Design phase:**

### Deliverables

- [ ] **Define** all entities that correspond to bounded contexts from Design phase (verify each context has at least one entity)
- [ ] **Document** every entity with purpose and related context (ensures traceability to Design)
- [ ] **Add** primary keys to every entity (UUID recommended for distributed systems)
- [ ] **Include** created_at and updated_at timestamps on every entity (required for audit trails and temporal queries)
- [ ] **Specify** appropriate data types for all attributes (prevents type confusion and enables query optimization)
- [ ] **Establish** relationships between entities with clear cardinality (1:1, 1:N, N:M)
- [ ] **Define** constraints (NOT NULL, UNIQUE, CHECK) that reflect business rules from Design phase
- [ ] **Decide** soft delete strategy for each entity (logical deletion vs. hard delete)
- [ ] **Identify** indexes for performance optimization (foreign key fields and frequently-queried columns)
- [ ] **Document** archival and retention policies (compliance + storage management)
- [ ] **Verify** no database technology names are mentioned (PostgreSQL, MySQL, etc. — save for Development phase)

### Sign-Off

- [ ] **Prepared by**: [Database Architect], [Date]
- [ ] **Reviewed by**: [Backend Lead], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-012-erd-diagram.md)