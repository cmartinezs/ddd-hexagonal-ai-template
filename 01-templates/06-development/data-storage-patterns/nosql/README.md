[← Index](../README.md) | [< Anterior ../relational/README.md) | [Siguiente > ../cache/README.md)

---

# NoSQL Databases

## Description

Non-relational databases: Document (MongoDB), Key-Value (DynamoDB), Wide-Column (Cassandra).

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Flexible schema | ✅ |
| High write throughput | ✅ |
| Large data volumes | ✅ |
| Document storage | Document DB |
| Simple key-value | Key-Value DB |
| Time-series | Wide-Column DB |
| ACID transactions | ❌ Consider Relational |

---

## Categories

| Type | Examples | Best For |
|------|----------|----------|
| **Document** | MongoDB, CouchDB | Flexible content, CMS |
| **Key-Value** | Redis, DynamoDB | Sessions, config |
| **Wide-Column** | Cassandra, DynamoDB | Time-series, analytics |
| **Graph** | Neo4j | Relationships |

## Comparison

| Aspect | Relational | Document | Key-Value | Wide-Column |
|--------|------------|----------|-----------|------------|
| Schema | Fixed | Flexible | Flexible | Flexible |
| Transactions | ACID | Atomic (doc) | Atomic | Atomic |
| Relationships | FK | Embed/Link | - | - |
| Query Language | SQL | Query API | Get/Put | CQL |
| Scaling | Vertical | Horizontal | Horizontal | Horizontal |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-document.md` — Document template
- `TEMPLATE-key-value.md` — Key-value template

---

[← Index](../README.md) | [< Anterior](../relational/README.md) | [Siguiente >](../cache/README.md)