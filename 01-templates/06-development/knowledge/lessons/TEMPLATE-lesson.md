[← Index](./README.md)

---

# Lessons Learned Template

## Purpose

Template for recording lessons learned during development.

> **Note**: This is a template. Add entries after completing tasks where errors or patterns occur.

---

## Categories

| Category | Description |
|-----------|-------------|
| **domain** | Domain patterns, design decisions |
| **api** | REST, OpenAPI, contracts |
| **persistence** | Database, migrations, queries |
| **tests** | Testing, coverage |
| **security** | Auth, authorization |
| **tools** | CLI, build, processes |

---

## Entry Format

```markdown
### [YYYY-MM-DD] Title

**Context/Symptom:** What was observed / what failed.
**Problem/Cause:** Why it happened.
**Solution/Good Practice:** What to do in the future.
**Key Files:** (optional)
```

---

## When to Add

Add an entry after completing any task where:
- An error occurs
- A bug is found
- A better pattern is identified

---

## Example Entry

```markdown
### 2026-04-13 JPA entity vs Flyway mismatch

**Context/Symptom:** Entity used @Column(name = "user_id") but migration used user_id.
**Problem/Cause:** Inconsistent naming between JPA and DDL.
**Solution/Good Practice:** Always use explicit @Column names to match Flyway.
**Key Files:** UserEntity.java, V3__identity.sql
```

---

[← Index](./README.md)