[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-012-erd-diagram.md)

---

# Entities and Relationships Template

**What This Is**: A template for defining all entities, their attributes, relationships, and constraints. This is the foundation for database schema.

**How to Use**: Create one section per entity. Each entity traces to a bounded context from Design phase. Follow the structure exactly.

**Why It Matters**: Every entity mistake cascades to code. Clear definitions prevent schema drift and confusion during implementation.

**When to Use**: After Design (Phase 3). First document in Data Model phase.

**Owner**: Database Architect

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

| Constraint | Example | When to Use |
|------------|---------|-------------|
| **NOT NULL** | `email: varchar NOT NULL` | Required fields |
| **UNIQUE** | `email: varchar UNIQUE` | No duplicates |
| **FOREIGN KEY** | `user_id: uuid REFERENCES users(id)` | Referential integrity |
| **CHECK** | `status IN ('pending', 'active')` | Value validation |
| **EXCLUDE** | `daterange WITH &&` | Temporal overlap prevention |

---

## Example Entities

### Example: User Entity

## Entity: User

**Purpose**: Represents a user who can authenticate and access the system
**Related Context**: Identity

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

## Entity: Organization

**Purpose**: Represents a tenant/organization in the system
**Related Context**: Organization

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

### Deliverables

- [ ] Every bounded context from Design has entities
- [ ] Every entity has primary key defined
- [ ] Every entity has timestamps (created_at, updated_at)
- [ ] Attributes have appropriate types
- [ ] Relationships documented (1:1, 1:N, N:M)
- [ ] Constraints defined (not null, unique, check)
- [ ] Soft delete strategy defined
- [ ] Indexes identified
- [ ] Archival policy defined

### Sign-Off

- [ ] **Prepared by**: [Database Architect], [Date]
- [ ] **Reviewed by**: [Backend Lead], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-012-erd-diagram.md)