[← Index](./README.md)

---

# Migration Template

## Purpose

Template for database migrations.

## Template

```markdown
# Migration: V{version}__{description}

## Forward

```sql
-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
```

## Rollback

```sql
DROP TABLE users CASCADE;
```

## Metadata

| Field | Value |
|-------|-------|
| Version | V001 |
| Description | create_users_table |
| Author | [name] |
| Date | 2024-01-01 |
```

---

[← Index](./README.md)