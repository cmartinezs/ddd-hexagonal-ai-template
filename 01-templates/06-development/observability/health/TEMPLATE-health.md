[← Index](./README.md)

---

# Health Check Template

## Purpose

Template for health checks.

## Template

```markdown
# Health Checks: [Service]

## Endpoints

| Endpoint | Type | Returns |
|----------|------|----------|
| /health/liveness | Liveness | { status: UP } |
| /health/readiness | Readiness | { status: UP, dependencies: {...} } |

## Liveness Check

```json
{
  "status": "UP"
}
```

## Readiness Check

```json
{
  "status": "UP",
  "dependencies": {
    "database": { "status": "UP", "latencyMs": 5 },
    "cache": { "status": "UP", "latencyMs": 2 }
  }
}
```

## Components to Check

| Component | Check |
|-----------|-------|
| Database | Connection |
| Cache | Ping |
| External API | Health endpoint |
```

---

[← Index](./README.md)