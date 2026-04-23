[← Index](../README.md) | [< Anterior](../authorization/README.md)

---

# Input Validation

## Description

Input validation across layers: HTTP, domain, use case.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Accepts user input | ✅ |
| Has business rules | ✅ |
| No user input | Minimal |

---

## Validation Layers

| Layer | What to Validate |
|-------|----------------|
| **HTTP** | Format, size, pattern |
| **Domain** | Business rules |
| **Use Case** | State, uniqueness |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-validation.md` — Validation template

---

[← Index](../README.md) | [< Anterior](../authorization/README.md)