[← Index](../README.md) | [< Previous](../README.md)

---

# Lessons Learned

## Purpose

Record patterns, errors, and decisions from development.

## How to Use

### Adding a Lesson

1. **Determine category** — domain, api, persistence, tests, security, tools
2. **Add entry** — Use [TEMPLATE-lesson.md](./TEMPLATE-lesson.md)
3. **Fill format** — Include context, problem, solution

### Categories

| Category | Description |
|---------|-------------|
| **domain** | Domain patterns, DDD decisions |
| **api** | REST, OpenAPI, contracts |
| **persistence** | Database, migrations, queries |
| **tests** | Testing, coverage |
| **security** | Auth, authorization |
| **tools** | CLI, build, processes |

### When to Add

Add a lesson after:
- Completing a task with errors or issues
- Finding a bug
- Identifying a better pattern
- Making an architectural decision

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

## Example Entry

```markdown
### 2026-04-13 JPA entity vs Flyway mismatch

**Context/Symptom:** Entity used @Column(name = "user_id") but migration used user_id.
**Problem/Cause:** Inconsistent naming between JPA annotations and DDL.
**Solution/Good Practice:** Always use explicit @Column names matching Flyway.
**Key Files:** UserEntity.java, V3__identity.sql
```

---

## Categories Files

Each category has its own file:
- [domain.md](./domain.md)
- [api.md](./api.md)
- [persistence.md](./persistence.md)
- [tests.md](./tests.md)
- [security.md](./security.md)
- [tools.md](./tools.md)

---

[← Index](../README.md) | [< Previous ../README.md)