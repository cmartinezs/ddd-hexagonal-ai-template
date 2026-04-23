[← Index ../README.md) | [< Anterior ../nosql/README.md)

---

# Cache Storage

## Description

In-memory caching: Redis, Memcached, etc.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Session data | ✅ |
| Frequently accessed data | ✅ |
| Rate limiting | ✅ |
| Pub/Sub messaging | ✅ |
| Simple storage only | ❌ Use database |

---

## Cache Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Cache-Aside** | App manages cache | Read-heavy |
| **Write-Through** | Write to cache + DB | Write-heavy |
| **Write-Behind** | Async DB write | High write |
| **TTL** | Expire after time | Volatile data |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-cache-config.md` — Cache template

---

[← Index ../README.md) | [< Anterior ../nosql/README.md)