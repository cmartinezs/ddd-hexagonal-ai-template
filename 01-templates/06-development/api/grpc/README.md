[← Index](../README.md) | [< Anterior](./graphql/README.md) | [Siguiente >](./websocket/README.md)

---

# gRPC

## Description

High-performance Remote Procedure Call using Protocol Buffers for serialization.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Internal microservices | ✅ |
| High performance needed | ✅ |
| Strong contracts (code generation) | ✅ |
| Streaming | ✅ |
| Public APIs | ⚠️ Consider REST first |
| Browser-based clients | ❌ Not supported |

---

## Principles

| Principle | Description |
|-----------|-------------|
| **Strongly typed** | Protocol Buffers schema |
| **Code generation** | Client/server stubs |
| **IDL-first** | .proto files define contract |
| **Streaming** | Bidirectional supported |
| **HTTP/2** | Multiplexing built in |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-proto.md` — Protocol buffer template

---

[← Index](../README.md) | [< Anterior](./graphql/README.md) | [Siguiente >](./websocket/README.md)