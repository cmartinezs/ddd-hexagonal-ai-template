[← Index](../README.md) | [< Anterior](./architecture-dimensions/README.md) | [Siguiente >](./observability/README.md)

---

# Authentication & Authorization

## Purpose

This section covers authentication, authorization, and validation for security.

> **Note**: These are optional templates. Use when your project requires authentication/authorization.

## Contents

1. [Overview](#overview)
2. [Auth Flows](./flows/README.md) — Authentication flows
3. [Authorization](./authorization/README.md) — Access control
4. [Validation](./validation/README.md) — Input validation
5. [Rate Limiting](./rate-limiting/README.md) — Abuse prevention

---

## When to Use

| If your project... | Then you need... |
|-----------------|----------------|
| Has users with accounts | Authentication |
| Has protected resources | Authorization |
| Accepts user input | Input validation |
| No user accounts | Skip auth templates |
| Public read-only API | Minimal auth |

---

## Decision Guide

```
Has users?
  └── No → Skip authentication
  └── Yes
       ↓
Has protected resources?
       └── No → Minimal auth
       └── Yes
            ↓
         Requires auth flows + authorization
```

---

[← Index](../README.md) | [< Anterior](./architecture-dimensions/README.md) | [Siguiente >](./observability/README.md)