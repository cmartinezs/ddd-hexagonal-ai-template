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

- [ ] Event name and version defined
- [ ] Payload schema defined
- [ ] When event is emitted documented
- [ ] Consumer list documented
- [ ] Retry policy defined

---

[← Contracts Index](./README.md)