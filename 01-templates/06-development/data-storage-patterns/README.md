[← Index](../README.md) | [< Anterior](./observability/README.md) | [Siguiente >](./workflow/README.md)

---

# Database

## Purpose

This section covers data persistence: relational, NoSQL, and cache storage.

> **Note**: These are optional templates. Use when your project needs data storage.

## Contents

1. [Overview](#overview)
2. [Relational](./relational/README.md) — SQL databases
3. [NoSQL](./nosql/README.md) — Document, key-value, wide-column
4. [Cache](./cache/README.md) — In-memory caching
5. [Object Storage](./object/README.md) — Binary files
6. [File Storage](./files/README.md) — Local files
7. [Search & Index](./search/README.md) — Search engines
8. [Data Lake/Warehouse](./datalake/README.md) — Analytics

---

## When to Use

| Use Case | Recommended |
|----------|-------------|
| Structured data with relationships | Relational |
| Flexible schema, high volume | NoSQL |
| Session, session data | Cache |
| Mixed requirements | Polyglot persistence |

---

## Decision Guide

```
Need ACID transactions?
  └── Yes → Relational
  └── No
       ↓
Need flexible schema?
  └── Yes → NoSQL
  └── No
       ↓
Need high read performance?
  └── Yes → Add Cache
  └── No
       ↓
       Relational
```

---

[← Index](../README.md) | [< Anterior](./observability/README.md) | [Siguiente >](./workflow/README.md)