[← Index](./README.md)

---

# Synchronous API Template

## Purpose

Template for synchronous API communication.

## Template

```markdown
# Service: [Service Name]

## API Contract

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/v1/[resource] | List |
| POST | /api/v1/[resource] | Create |
| GET | /api/v1/[resource]/{id} | Get |
| PATCH | /api/v1/[resource]/{id} | Update |
| DELETE | /api/v1/[resource]/{id} | Delete |

### Example: Get User

**Request**:
```http
GET /api/v1/users/user-123 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Response**:
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Error |
```

---

[← Index](./README.md)