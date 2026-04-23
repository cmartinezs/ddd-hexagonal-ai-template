[← Index](../README.md) | [< Anterior](../README.md) | [Next >](./graphql/README.md)

---

# REST API

## Description

Representational State Transfer. Resource-based API using HTTP methods semantically.

## When to Use

| Use Case | Recommended |
|----------|-------------|
| Standard CRUD | ✅ |
| Simple read/write operations | ✅ |
| Browser-based clients | ✅ |
| Public APIs | ✅ |
| Complex nested queries | ⚠️ Consider GraphQL |

## Conventions

| Aspect | Convention |
|--------|------------|
| Base URL | `/api/v1` |
| Format | JSON |
| Content-Type | `application/json` |
| Identifiers | UUID |
| Versioning | `/api/v1/` prefix |

## HTTP Methods

| Method | Semantics |
|--------|-----------|
| GET | Read, no side effects |
| POST | Create resource |
| PATCH | Partial update |
| PUT | Full replace |
| DELETE | Remove/deactivate |

## Status Codes

| Code | Meaning |
|-------|--------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Rate Limited |
| 500 | Internal Error |

## Response Structure

### Single Resource

```json
{
  "data": {
    "id": "uuid",
    "name": "...",
    "createdAt": "2026-04-20T14:30:00Z"
  }
}
```

### Collection (Paginated)

```json
{
  "data": {
    "content": [...],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 150,
      "totalPages": 8,
      "hasMore": true
    }
  }
}
```

### Error

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": {
      "field": "id",
      "constraint": "must exist"
    }
  }
}
```

## Files in this folder

- `README.md` — This file
- `TEMPLATE-endpoint.md` — Individual endpoint template
- `TEMPLATE-catalog.md` — Full endpoint catalog
- `TEMPLATE-versioning.md` — Versioning strategy
- `TEMPLATE-documentation.md` — OpenAPI documentation standard

---

[← Index](../README.md) | [< Anterior](../README.md) | [Next >](./graphql/README.md)