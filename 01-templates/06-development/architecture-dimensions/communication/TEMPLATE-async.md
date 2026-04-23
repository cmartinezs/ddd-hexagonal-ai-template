[← Index](./README.md)

---

# Asynchronous Event Template

## Purpose

Template for async event communication.

## Template

```markdown
# Event Schema: [Domain]

## Events

### Event: [EventName]

**Category**: [domain.event]

**Payload**:
```json
{
  "type": "[domain.event]",
  "timestamp": 1704067200,
  "data": {
    "id": "entity-123",
    "field": "value"
  },
  "metadata": {
    "correlationId": "corr-456",
    "causationId": "evt-789"
  }
}
```

## Event Naming

| Pattern | Example |
|---------|---------|
| `{domain}.{entity}.{action}` | user.created |
| `{domain}.{entity}.{action}.{status}` | user.updated.published |

## Event Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | ✅ | Event identifier |
| timestamp | number | ✅ | Unix timestamp |
| data | object | ✅ | Event data |
| metadata.correlationId | string | ⚠️ | For tracing |
| metadata.causationId | string | ⚠️ | Source event |

## Examples

### User Created

```json
{
  "type": "user.created",
  "timestamp": 1704067200,
  "data": {
    "id": "user-123",
    "email": "user@example.com"
  }
}
```

### Order Fulfilled

```json
{
  "type": "order.fulfilled.paid",
  "timestamp": 1704067200,
  "data": {
    "orderId": "order-456",
    "amount": 1000
  }
}
```
```

---

[← Index](./README.md)