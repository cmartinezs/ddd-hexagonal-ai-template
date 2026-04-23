[← Index](./README.md)

---

# API Endpoints Catalog

## Purpose

Quick reference table for all API endpoints. Use for implementation and documentation.

> **Note**: This is a template. Adapt paths, parameters, and response fields to your project.

---

## Conventions

| Aspect | Convention |
|--------|------------|
| Base URL | `/api/v1` |
| Format | JSON |
| Content-Type | `application/json` |
| Identifiers | UUID in path and response |
| Tenant scope | `/api/v1/{tenant}/...` (if multi-tenant) |

### HTTP Methods

| Method | Semantics |
|--------|-----------|
| GET | Read, no side effects |
| POST | Create new resource |
| PATCH | Partial update |
| PUT | Full replace |
| DELETE | Remove/deactivate |

---

## Endpoints by Domain

### Health & Info (Public)

| Method | Path | Description | Auth | Status |
|--------|------|-------------|------|--------|
| GET | /health | Health check | ❌ | 200 |
| GET | /api/v1/info | Service info | ❌ | 200 |

---

### Authentication

| Method | Path | Description | Auth | Request | Response | Status |
|--------|------|-------------|------|---------|----------|--------|
| POST | /api/v1/auth/register | Register user | ❌ | email, password | user | 201 |
| POST | /api/v1/auth/login | Login | ❌ | email, password | token | 200 |
| POST | /api/v1/auth/logout | Logout | ✅ | - | 200 |
| POST | /api/v1/auth/refresh | Refresh token | ✅ | refresh_token | token | 200 |

### OAuth2 (if applicable)

| Method | Path | Description | Auth | Status |
|--------|------|-------------|------|--------|
| GET | /api/v1/oauth2/authorize | Start PKCE flow | ❌ | 302 redirect |
| POST | /api/v1/oauth2/token | Exchange code | ❌ | 200 |
| POST | /api/v1/oauth2/revoke | Revoke token | ✅ | 200 |

---

### Users

| Method | Path | Description | Auth | Request | Response | Status |
|--------|------|-------------|------|---------|----------|--------|
| GET | /api/v1/users | List users | ✅ | page?, limit? | data[], meta | 200 |
| GET | /api/v1/users/:id | Get user | ✅ | - | user | 200 |
| POST | /api/v1/users | Create user | ✅ | user | user | 201 |
| PATCH | /api/v1/users/:id | Update user | ✅ | user | user | 200 |
| DELETE | /api/v1/users/:id | Delete user | ✅ | - | 204 |

**Path Parameters**: `id` (UUID)

**Query Parameters**: `page`, `limit`, `status`, `search`

---

### Profile (Self-Service)

| Method | Path | Description | Auth | Status |
|--------|------|-------------|------|--------|
| GET | /api/v1/profile | Get own profile | ✅ | 200 |
| PATCH | /api/v1/profile | Update own profile | ✅ | 200 |
| POST | /api/v1/profile/change-password | Change password | ✅ | 200 |
| POST | /api/v1/profile/forgot-password | Request recovery | ❌ | 200 |
| POST | /api/v1/profile/recover-password | Set new password | ❌ | 200 |

---

### Sessions

| Method | Path | Description | Auth | Status |
|--------|------|-------------|------|--------|
| GET | /api/v1/sessions | List sessions | ✅ | 200 |
| DELETE | /api/v1/sessions/:id | Revoke session | ✅ | 204 |

---

### Organizations (if multi-tenant)

| Method | Path | Description | Auth | Request | Response | Status |
|--------|------|-------------|------|---------|----------|--------|
| GET | /api/v1/organizations | List orgs | ✅ | - | data[] | 200 |
| GET | /api/v1/organizations/:id | Get org | ✅ | - | org | 200 |
| POST | /api/v1/organizations | Create org | ✅ | org | org | 201 |
| PUT | /api/v1/organizations/:id/suspend | Suspend org | ✅ | - | 200 |
| PUT | /api/v1/organizations/:id/activate | Activate org | ✅ | - | 200 |

---

### Applications (if client apps)

| Method | Path | Description | Auth | Request | Response | Status |
|--------|------|-------------|------|---------|----------|--------|
| GET | /api/v1/applications | List apps | ✅ | - | data[] | 200 |
| POST | /api/v1/applications | Register app | ✅ | app | app | 201 |
| GET | /api/v1/applications/:id | Get app | ✅ | - | app | 200 |
| DELETE | /api/v1/applications/:id | Delete app | ✅ | - | 204 |

---

## Standard Response Wrappers

### Single Resource
```json
{
  "data": { "id": "uuid", "name": "..." }
}
```

### Collection (Paginated)
```json
{
  "data": {
    "content": [
      { "id": "uuid", "name": "..." }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 150,
    "totalPages": 8,
    "last": false
  }
}
```

### No Content
```json
// No body (204)
```

---

## Pagination

| Parameter | Default | Max | Description |
|-----------|---------|-----|-------------|
| page | 0 | - | Page number (0-indexed) |
| size | 20 | 100 | Items per page |
| sortBy | createdAt | - | Field to sort by |
| sortOrder | DESC | ASC/DESC | Sort direction |

---

## Error Responses

### Standard Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description",
    "details": {
      "field": "email",
      "constraint": "Must be unique"
    }
  }
}
```

### Error Codes

| Status | Code | Scenario |
|--------|------|----------|
| 400 | INVALID_INPUT | Request validation failed |
| 401 | UNAUTHORIZED | Missing/invalid/expired token |
| 403 | FORBIDDEN | Valid token, wrong permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | DUPLICATE_RESOURCE | Resource already exists |
| 409 | CONFLICT | State conflict |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Retry-able |

---

## Authentication

### Bearer Token
```
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
```

### Token Claims
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "roles": ["ADMIN"],
  "tenant": "tenant-slug",
  "exp": 1714000000
}
```

### Access Levels

| Level | Roles | Scope |
|-------|-------|-------|
| Platform | ADMIN | All resources |
| Tenant | ADMIN_ORG, USER, VIEWER | Single organization |
| App | APP_ROLE | Specific application |

---

## Versioning Strategy

### URI Path Versioning
```
/api/v1/resources  ← stable
/api/v2/resources  ← new, breaking allowed
```

### Semantic Versioning

| Change | Version | Example |
|--------|---------|---------|
| Backward-compatible | 1.0 → 1.1 | New field, new endpoint |
| Breaking | 1.0 → 2.0 | Removed field, changed structure |

### Deprecation Headers
```http
Deprecation: true
Sunset: Sat, 01 Oct 2027 00:00:00 GMT
Link: </api/v2/resources>; rel="successor-version"
```

---

## Implementation Checklist

- [ ] All endpoints documented with OpenAPI spec
- [ ] Authentication middleware
- [ ] Authorization checks (role-based)
- [ ] Request validation
- [ ] Error handling with codes
- [ ] Rate limiting
- [ ] Request/response logging
- [ ] Pagination support
- [ ] Versioning strategy
- [ ] Deprecation headers

---

[← Index](./README.md)