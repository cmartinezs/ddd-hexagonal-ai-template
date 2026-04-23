# Contracts — Templates

This folder contains templates for integration contracts: API contracts, event contracts, and integration contracts.

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