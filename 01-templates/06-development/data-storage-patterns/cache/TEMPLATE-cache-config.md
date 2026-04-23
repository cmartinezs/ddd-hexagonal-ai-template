[← Index](./README.md)

---

# Cache Configuration Template

## Purpose

Template for cache configuration.

## Template

```markdown
# Cache: [Service]

## Cache Keys

| Key Pattern | Type | TTL | Invalidation |
|-------------|------|-----|--------------|
| user:{id} | Hash | 5min | On update |
| org:{id} | Hash | 15min | On update |
| list:users | List | 1min | On write |

## Strategy

| Data | Strategy | TTL |
|------|----------|-----|
| User sessions | Cache-Aside | Session |
| User profiles | Cache-Aside | 5min |
| Lists | Write-Through | 1min |
| Counts | Cache-Aside | 1min |

## Configuration

```yaml
cache:
  provider: redis  # redis, memcached
  default_ttl: 300  # seconds
  max_connections: 10
  cluster_mode: true
```
```

---

[← Index](./README.md)