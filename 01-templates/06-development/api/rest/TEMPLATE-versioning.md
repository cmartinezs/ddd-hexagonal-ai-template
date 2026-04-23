[← Index](./README.md)

---

# API Versioning Strategy

## Purpose

Define how API versions are managed, breaking changes handled, and deprecation strategy.

---

## Versioning Approach

### URI Path Versioning (Recommended)

```
/api/v1/resources   ← stable, backward-compatible
/api/v2/resources   ← new, breaking changes allowed
```

| Approach | Advantages | Disadvantages |
|----------|-----------|----------------|
| **URI Path** | Explicit, cacheable, clear docs | Code duplication |
| **Header** | Less duplication | Less explicit, harder to debug |
| **Content-Type** | Clean URLs | Complex tooling |

---

## Semantic Versioning

| Change Type | Version | Example |
|------------|---------|---------|
| Backward-compatible | 1.0 → 1.1 | New optional field, new endpoint |
| Breaking | 1.0 → 2.0 | Removed field, changed structure |

### Within Major Version

Only **add**, never **remove**:
- ✅ New optional field in response
- ✅ New endpoint
- ✅ New query parameter (optional)
- ❌ Remove required field
- ❌ Change field type
- ❌ Remove endpoint

---

## Lifecycle

### Phase 1: Development

- Implement new version alongside old
- Old version remains default
- Tests for both versions

### Phase 2: Dual Support

- Both versions served
- Old version marked as "legacy"
- Monitor adoption

### Phase 3: Deprecation

Add deprecation headers to old version:

```http
Deprecation: true
Sunset: Sat, 01 Oct 2027 00:00:00 GMT
Link: </api/v2/resources>; rel="successor-version"
```

### Phase 4: Sunset

```
HTTP/1.1 410 Gone

{
  "error": {
    "code": "API_VERSION_SUNSET",
    "message": "API v1 is no longer supported. Migrate to v2.",
    "details": {
      "successorVersion": "v2",
      "migrationGuide": "/docs/migration/v1-to-v2"
    }
  }
}
```

---

## Migration Guide

### Example: v1 → v2 Changes

| Aspect | v1 | v2 |
|--------|-----|-----|
| ID type | slug (string) | id (UUID) |
| Response envelope | { data, success } | { data, meta } |
| Pagination | page, size | offset, limit |
| Timestamps | epoch millis | ISO 8601 |

### Example Request

**v1:**
```bash
GET /api/v1/users?page=0&size=20
```

**v2:**
```bash
GET /api/v2/users?offset=0&limit=20
```

---

## Checklist

- [ ] Version strategy decided
- [ ] Version number in OpenAPI spec
- [ ] Deprecation headers implemented
- [ ] Sunset date documented
- [ ] Migration guide written
- [ ] Error code for sunset defined

---

[← Index](./README.md)