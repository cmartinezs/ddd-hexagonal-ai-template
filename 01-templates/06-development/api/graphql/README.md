[← Index](../README.md) | [< Anterior](./rest/README.md) | [Siguiente >](./grpc/README.md)

---

# GraphQL

## Description

Query language for APIs. Single endpoint, client-specified queries.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Flexible queries (many shapes from one endpoint) | ✅ |
| Multiple resources in single request | ✅ |
| Mobile apps (bandwidth efficiency) | ✅ |
| Rapid frontend iteration | ✅ |
| Simple CRUD | ⚠️ Consider REST |
| Real-time subscriptions | ✅ |

---

## Principles

| Principle | Description |
|-----------|-------------|
| **Single endpoint** | One URL for all operations |
| **Client specifies fields** | No over-fetching |
| **Types and schema** | Strongly typed |
| **Queries = reads, Mutations = writes** | Clear separation |
| **Subscriptions = real-time** | Push updates |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-schema.md` — Schema template

---

[← Index](../README.md) | [< Anterior](./rest/README.md) | [Siguiente >](./grpc/README.md)