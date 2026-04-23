[← Index](../README.md) | [< Anterior](./grpc/README.md)

---

# WebSocket

## Description

Persistent bi-directional connections for real-time communication.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Real-time updates | ✅ |
| Live collaboration | ✅ |
| Chat systems | ✅ |
| Gaming | ✅ |
| Notifications | ✅ |
| Simple request/response | ❌ Use REST |

---

## Principles

| Principle | Description |
|-----------|-------------|
| **Persistent connection** | Unlike HTTP request/response |
| **Bi-directional** | Server can push to client |
| **Stateful** | Connection holds state |
| **Reconnection handling** | Client manages reconnects |
| **Message format** | JSON, Protocol Buffers |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-events.md` — Event handler template

---

[← Index](../README.md) | [< Anterior](./grpc/README.md)