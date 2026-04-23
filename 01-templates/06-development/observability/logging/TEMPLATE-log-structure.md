[← Index](./README.md)

---

# Log Structure Template

## Purpose

Template for structured logging.

## Template

```json
{
  "timestamp": "2024-01-01T10:00:00Z",
  "level": "INFO",
  "message": "User logged in",
  "traceId": "trace-123",
  "userId": "user-456",
  "service": "auth-service"
}
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| timestamp | ✅ | ISO 8601 timestamp |
| level | ✅ | DEBUG, INFO, WARN, ERROR |
| message | ✅ | Log message |
| traceId | ⚠️ | Correlation ID |
| userId | ⚠️ | User context |
| service | ✅ | Service name |

## Correlation

```
Request → traceId in logs → Trace spans
```

---

[← Index](./README.md)