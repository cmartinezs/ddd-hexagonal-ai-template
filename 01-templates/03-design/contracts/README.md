# Contracts — Templates

You are an AI agent designing integration contracts between systems. This folder contains templates for documenting API contracts, event schemas, and integration agreements that define how your system communicates with other systems.

**What This Is**: Templates for integration contracts (API, events, partner integrations)  
**How to Use**: Create one contract document per integration point, specifying payloads, error handling, and evolution strategy  
**Why It Matters**: Explicit contracts enable independent system development and prevent integration surprises  
**When to Use**: During Phase 3 (Design), when defining system boundaries and integrations  
**Owner**: Architect + Integration Owner

---

## Documents

| Document | Purpose | File |
|----------|---------|------|
| **API Contract** | How systems communicate via API | [TEMPLATE-api-contract.md](./TEMPLATE-api-contract.md) |
| **Event Contract** | Event schema for integrations | [TEMPLATE-event-contract.md](./TEMPLATE-event-contract.md) |
| **Integration Contract** | Partner/integration agreements | [TEMPLATE-integration-contract.md](./TEMPLATE-integration-contract.md) |

---

## When to Use These Templates

Use Contracts templates when your system integrates with other systems:

- **API Contract**: REST/gRPC/GraphQL endpoints and payloads
- **Event Contract**: Event schemas for event-driven integrations
- **Integration Contract**: Partner agreements and SLAs

---

## Design → Integration Connection

Every integration must trace to a requirement (FR-XXX) and a system flow (SF-XXX).

---

## Templates

### TEMPLATE-api-contract.md

Defines API endpoints and their contracts:

- Endpoint definition (path, method)
- Request format
- Response format
- Error handling

### TEMPLATE-event-contract.md

Defines event schemas:

- Event name and version
- Payload structure
- Event lifecycle (when emitted)

### TEMPLATE-integration-contract.md

Defines partner integration agreements:

- Integration scope
- Data exchange
- SLA and support

---

[← Back to Design Index](../README.md)