[← Index](./README.md)

---

# Relational Schema Template

## Purpose

Template for relational database schema.

## Template

```markdown
# Schema: [Project]

## Tables

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| status | ENUM | DEFAULT 'ACTIVE' | Account status |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |
| updated_at | TIMESTAMP | | Last update |
| version | INTEGER | DEFAULT 0 | Optimistic locking |

### Indexes

| Index | Columns | Type |
|-------|---------|------|
| idx_users_email | email | UNIQUE |
| idx_users_status | status | INDEX |

### Foreign Keys

| Column | References | ON DELETE |
|--------|------------|-----------|
| organization_id | organizations(id) | CASCADE |
```

---

[← Index](./README.md)