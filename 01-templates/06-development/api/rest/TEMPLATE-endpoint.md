[← Index](./README.md) | [< Anterior](./rest/README.md)

---

# REST Endpoint Template

## Purpose

Template for documenting REST API endpoints.

## Endpoint Template

```markdown
## [METHOD] /api/v1/{resource}/{id}/{sub-resource}

**Description**: What this endpoint does

**Authentication**: Required/Optional
**Authorization**: Required permissions

### Request

**Headers**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Resource ID |

**Query Parameters**:
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | integer | Page number | 1 |
| limit | integer | Items per page | 20 |

**Request Body**:
```json
{
  "field": "value"
}
```

### Response

**200 OK** (example):
```json
{
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

**201 Created**:
```json
{
  "data": { "id": "uuid", ... }
}
```

**400 Bad Request**:
```json
{
  "error": "Validation failed",
  "details": [
    {"field": "email", "message": "Invalid format"}
  ]
}
```

### Errors

| Status | Description |
|--------|-------------|
| 400 | Invalid request |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 409 | Conflict |
| 500 | Server error |

---

## HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Read resources | Yes |
| POST | Create resources | No |
| PUT | Replace (full update) | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resources | Yes |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Server Error |

---

[← Index](./README.md) | [< Anterior](./rest/README.md)