[← Index](../README.md) | [< Anterior](./TEMPLATE-017-architecture.md) | [Siguiente >](./TEMPLATE-019-coding-standards.md)

---

# API Design

## Purpose

This section covers **API design styles** and when to use each. Choose the right style for your use case.

> **Note**: This is a template. Adapt to your specific requirements.

## Contents

1. [API Styles Overview](#api-styles-overview)
2. [REST](./rest/README.md) — Resource-based APIs
3. [GraphQL](./graphql/README.md) — Query-based APIs
4. [gRPC](./grpc/README.md) — High-performance RPC
5. [WebSocket](./websocket/README.md) — Real-time communication
6. [Choosing a Style](#choosing-a-style)

---

## API Styles Overview

| Style | Best For | Trade-offs |
|-------|----------|----------|
| **REST** | CRUD, standard resources | Simple, widely understood, network efficiency |
| **GraphQL** | Complex queries, flexible responses | Learning curve, complexity for simple cases |
| **gRPC** | High performance, microservices | Less browser support, requires tooling |
| **WebSocket** | Real-time, bi-directional | Stateful connections |
| **Webhook** | Event-driven, async notifications | Retry logic complexity |

---

## When to Use Each Style

### REST vs GraphQL vs gRPC

| Use Case | Recommended Style |
|---------|-------------------|
| Standard CRUD operations | REST |
| Multiple resources in one request | GraphQL |
| High-frequency microservice calls | gRPC |
| Real-time updates | WebSocket |
| Async processing | Webhook + REST |

### Decision Guide

```
Needs real-time? → WebSocket
      ↓ No
High performance needed? → gRPC
      ↓ No
Flexible queries? → GraphQL
      ↓ No
REST is sufficient → REST
```

---

## Template Files

Each API style has its own folder with templates:

- `rest/` — REST API templates
- `graphql/` — GraphQL schema
- `grpc/` — Protocol buffers
- `websocket/` — Event handlers

---

[← Index](../README.md) | [< Anterior](./TEMPLATE-017-architecture.md) | [Siguiente >](./TEMPLATE-019-coding-standards.md)