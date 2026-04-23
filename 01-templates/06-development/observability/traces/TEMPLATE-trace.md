[← Index](./README.md)

---

# Trace Template

## Purpose

Template for distributed tracing.

## Template

```markdown
# Trace: [Operation]

## Trace Structure

```
Trace: abc-123
├── HTTP: GET /api/users (10ms)
│   └── Auth: Validate token (5ms)
├── Domain: GetUsers (50ms)
│   └── DB: SELECT users (45ms)
└── HTTP: Response (5ms)
```

## Spans

| Span | Service | Duration | Labels |
|------|----------|----------|--------|
| http.server | api-gateway | 10ms | method:GET, path:/api/users |
| auth.validate | auth-service | 5ms | — |
| get.users | user-service | 50ms | — |
| db.query | database | 45ms | query:SELECT |

## Headers

| Header | Purpose |
|--------|----------|
| X-Trace-ID | Trace identifier |
| X-Span-ID | Span identifier |
| X-Parent-Span-ID | Parent span |
```

---

[← Index](./README.md)