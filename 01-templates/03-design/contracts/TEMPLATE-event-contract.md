[← Contracts Index](./README.md)

---

# Event Contract Template

**What This Is**: A template for defining event schemas — what data an event carries, when it's emitted, and how consumers should handle it.

**How to Use**: Define each event with its schema, version, and lifecycle. Consumers need to know exactly what to expect.

**When to Use**: Event-driven integrations or multiple consumers of the same events.

**Owner**: Domain Expert + Architect

---

## Event Contract Template

```markdown
## [EVENT-XXX] Event: [Name]

**Version**: [Semver]
**Related Flow**: SF-XXX

### When Emitted
[When this event is published]

### Payload Schema
```json
{
  "field": "type"
}
```

### Lifecycle
- **Produced By**: [Context]
- **Consumed By**: [List of consumers]
- **Retry Policy**: [What happens if delivery fails]

### Consumer Responsibilities
- [What consumers must do]
```

---

## Example: User Created Event

## [EVENT-001] Event: UserCreated

**Version**: 1.0.0
**Related Flow**: SF-001 (User Registration)

### When Emitted
User successfully registers and verifies email

### Payload Schema
```json
{
  "userId": "uuid",
  "email": "string",
  "createdAt": "timestamp",
  "organizationId": "uuid"
}
```

### Lifecycle
- **Produced By**: Identity Context
- **Consumed By**: Audit Context, Notification Context
- **Retry Policy**: 3 retries with exponential backoff

### Consumer Responsibilities
- Audit: Log event for compliance
- Notification: Send welcome email

---

## Completion Checklist

Before finalizing this event contract, ensure every item below is complete. Use directive language when reviewing—"Define", "Document", "Specify" rather than observing completion.

- [ ] **Define** event name in past tense (e.g., "OrderCreated", not "CreateOrder") and set version (1.0.0)
- [ ] **Document** payload schema with all required fields and their types (string, UUID, timestamp, etc.)
- [ ] **Specify when** this event is emitted (e.g., "When order payment succeeds and inventory is reserved")
- [ ] **List all** consumer contexts that subscribe to this event
- [ ] **Document** retry policy if delivery fails (exponential backoff, max retries, dead-letter queue)

---

[← Contracts Index](./README.md)