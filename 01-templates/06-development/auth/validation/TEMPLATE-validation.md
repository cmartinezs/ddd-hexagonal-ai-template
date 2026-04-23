[← Index](./README.md)

---

# Validation Template

## Purpose

Template for input validation specification.

## Template

```markdown
# Validation: [Feature]

## Layer 1: HTTP (Format)

| Field | Validation |
|-------|------------|
| email | Required, format |
| password | Required, min 8 chars |
| name | Optional, max 100 |

## Layer 2: Domain (Rules)

| Rule | Type |
|------|-------|
| Password complexity | Upper, lower, digit |
| Email uniqueness | Database check |
| Username format | Alphanumeric |

## Layer 3: Use Case (State)

| Check | Description |
|-------|-------------|
| Email exists | Unique check |
| Valid state | For transitions |
| Quota | Limit check |
```

---

[← Index](./README.md)