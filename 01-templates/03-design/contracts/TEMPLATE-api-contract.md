[← Contracts Index](./README.md)

---

# API Contract Template

**What This Is**: A template for defining how systems communicate via API — endpoints, request/response formats, and error handling.

**How to Use**: Document each API endpoint with its contract. Define what callers need to know: path, method, headers, payloads, and errors.

**When to Use**: Systems with API integrations.

**Owner**: Architect + Engineer

---

## API Contract Template

```markdown
## [API-XXX] Endpoint: [Name]

**Endpoint**: `[METHOD] /path`
**Related Flow**: SF-XXX

### Request
- **Headers**: [Required headers]
- **Body**: [Request body schema]

### Response
- **Success (200)**: [Response schema]
- **Error (4xx)**: [Error schema]
- **Error (5xx)**: [Error schema]

### Authorization
[What credentials or permissions needed]

### Example Request
```json
{
  "field": "value"
}
```

### Example Response
```json
{
  "field": "value"
}
```
```

---

## Example: Authenticate User

## [API-001] Authenticate User

**Endpoint**: `POST /auth/login`
**Related Flow**: SF-010 (User Login)

### Request
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "hashed_password"
}
```

### Response
- **Success (200)**:
```json
{
  "sessionId": "abc123",
  "expiresAt": "2024-01-01T00:00:00Z"
}
```
- **Error (401)**: Invalid credentials

### Authorization
- None (public endpoint)

---

## Completion Checklist

- [ ] All API endpoints documented
- [ ] Request/response formats defined
- [ ] Error cases handled
- [ ] Authorization documented

---

[← Contracts Index](./README.md)