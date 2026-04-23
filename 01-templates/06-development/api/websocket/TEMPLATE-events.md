[← Index](./README.md)

---

# WebSocket Events Template

## Purpose

Template for documenting WebSocket events and handlers.

## Event Template

```json
// === Connection ===

// Client connects
{
  "event": "connection:open",
  "data": { }
}

// Client disconnects
{
  "event": "connection:close",
  "data": { "reason": "user_initiated" }
}

// === Authentication ===

// Client authenticates
{
  "event": "auth:login",
  "data": {
    "token": "eyJhbGci..."
  }
}

// Auth response
{
  "event": "auth:login:response",
  "data": {
    "success": true,
    "user": { "id": "user-123", "email": "user@example.com" }
  }
}

// === User Events ===

// User created (server → client)
{
  "event": "user:created",
  "data": {
    "user": {
      "id": "user-456",
      "email": "new@example.com"
    }
  }
}

// User updated
{
  "event": "user:updated",
  "data": {
    "user": {
      "id": "user-456",
      "name": "Updated Name"
    },
    "updatedFields": ["name"]
  }
}

// User deleted
{
  "event": "user:deleted",
  "data": {
    "id": "user-456"
  }
}
```

## Event Format

| Field | Type | Description |
|-------|------|-------------|
| event | string | Event identifier |
| data | object | Event data |
| timestamp | number | Unix timestamp |
| requestId | string | For correlating requests |

## Event Naming

| Prefix | Direction | Example |
|--------|----------|--------|
| `connection:*` | System | connection:open, connection:close |
| `auth:*` | Auth | auth:login, auth:logout |
| `{entity}:*` | Domain | user:created, user:updated |
| `{entity}:*` | Broadcast | user:{id}:updated |

## Connection Lifecycle

```
1. Client connects
       ↓
2. Server accepts (or rejects)
       ↓
3. Client authenticates (optional)
       ↓
4. Bidirectional events
       ↓
5. Client or server disconnects
```

## Reconnection Strategy

```javascript
// Client reconnection logic
const reconnect = () => {
  if (attempts < maxAttempts) {
    delay = Math.min(1000 * Math.pow(2, attempts), maxDelay);
    setTimeout(() => {
      connect();
      attempts++;
    }, delay);
  }
};
```

---

[← Index](./README.md)