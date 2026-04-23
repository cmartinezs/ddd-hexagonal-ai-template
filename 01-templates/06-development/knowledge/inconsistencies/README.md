[← Index../README.md)

---

# Inconsistencies

## Purpose

Track inconsistencies between documentation, code, and database.

## How to Use

### Creating an Inconsistency

1. **Create file** — `INC-NNN-slug.md` in this folder
2. **Describe issue** — What doesn't match
3. **Track resolution** — Fix status

### States

| State | Emoji | Meaning |
|-------|-------|---------|
| Pending | 🔲 | Not resolved |
| In Progress | 🔧 | Being fixed |
| Resolved | ✅ | Fix applied |

### Critical vs Non-Critical

| Type | Action |
|------|--------|
| 🔴 Critical | Fix before closing task |
| 🟡 Non-Critical | Prioritize in roadmap |

---

## Entry Format

```markdown
# Inconsistency: INC-NNN-slug

## Description
What doesn't match.

## Files Affected
- File A
- File B

## State
🔲 Pending

## Resolution
(When fixed, describe solution)
```

---

## Example

```markdown
# Inconsistency: INC-001-entity-naming

## Description
JPA entity uses camelCase but Flyway uses snake_case.

## Files Affected
- UserEntity.java
- V3__identity.sql

## State
🔲 Pending

## Resolution
Use @Column(name = "snake_case") explicit in entities.
```

---

[← Index../README.md)