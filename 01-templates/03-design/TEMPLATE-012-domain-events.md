[← Index](./README.md) | [< Previous](./TEMPLATE-011-ubiquitous-language.md) | [Next >](./TEMPLATE-013-context-map.md)

---

# Domain Events Template

**What This Is**: A template for documenting key business events that trigger system reactions. Events are facts in past tense — something happened that other parts of the system might care about.

**How to Use**: Define events that matter to other contexts. Event name is past tense: "OrderCreated" not "CreateOrder". Include what triggers it, data it carries, and who consumes it.

**Why It Matters**: Events enable loose coupling — contexts communicate through events without direct calls. They create immutable audit trail and enable extensibility (new features subscribe without modifying existing code).

**When to Use**: Multiple bounded contexts, async workflows, or audit requirements.

**Owner**: Domain Expert + Architect

---

## Contents

- [Event Structure](#event-structure)
- [Event Patterns](#event-patterns)
- [Example Events](#example-events)
- [Completion Checklist](#completion-checklist)

---

## Event Structure

```markdown
## [EVENT NAME] Event

**When It Occurs**: [What triggers this event]

**Payload**: [What data the event carries]
- [Field 1]: [Description]
- [Field 2]: [Description]
- [Timestamp]: When the event occurred

**Produced By**: [Which context publishes this]

**Consumed By**: [Which contexts subscribe]
- [Context A]: [What they do with it]
- [Context B]: [What they do with it]

**Downstream Reactions**:
- [Reaction 1]
- [Reaction 2]
```

---

## Event Patterns

**What are event patterns?** Event patterns categorize the different types of business events your system cares about. Each pattern describes a scenario when an event should be published. Recognizing patterns helps you identify which events matter and when they occur.

**How to use this table**: For each event you identify, determine which pattern it fits. If an entity changes state, it's a State Transition. If a user action completes successfully, it's Action Completed. This framing ensures you capture all the events that matter.

| Pattern | When to Use | Example |
|---------|-------------|----------|
| **State Transition** | Entity changes state | OrderCreated, UserSuspended |
| **Action Completed** | User action completes | PaymentProcessed, InvitationSent |
| **System Event** | System detects condition | LimitReached, AnomalyDetected |
| **Relationship Change** | Link between entities changes | UserAddedToOrg, RoleAssigned |

### Event Naming Rules

**Why past tense?** Events represent facts that have already happened. "UserCreated" is a fact—something occurred in the past. "CreateUser" is a command—a request to make something happen. This distinction is critical: events are immutable outcomes, commands are requests that may fail.

**How to apply**: For each event, use past tense and include the entity type: `[Entity][Action]Completed`. If uncertain whether to use past tense, ask: "Has this already happened?" If yes, past tense is correct.

| ✅ Good | ❌ Bad |
|---------|-------|
| UserCreated | CreateUser |
| OrderCompleted | CompleteOrder |
| SessionStarted | StartSession |
| PaymentSuccessful | ProcessPayment |

---

## Example Events

### Example: Order Created Event

## [ORDER CREATED] Event

**When It Occurs**: A customer successfully places an order and payment is confirmed

**Payload**:
- orderId: Unique identifier
- customerId: Who placed the order
- totalAmount: Order value
- items: List of items
- createdAt: Timestamp

**Produced By**: Order Management Context

**Consumed By**:
- **Inventory Service**: Reserve stock for each item
- **Notification Service**: Send order confirmation to customer
- **Billing Context**: Record revenue for organization
- **Audit Context**: Log event for compliance

**Downstream Reactions**:
1. Inventory reservation created for each item
2. Confirmation email sent to customer
3. Revenue recorded in billing
4. Event persisted in audit log

---

### Example: Session Started Event

## [SESSION STARTED] Event

**When It Occurs**: User successfully authenticates and obtains a session

**Payload**:
- sessionId: Unique identifier
- userId: Who authenticated
- organizationId: Which organization
- issuedAt: When session was created
- expiresAt: When session expires

**Produced By**: Identity Context

**Consumed By**:
- **Access Control Context**: Make session available for permission evaluation
- **Audit Context**: Log authentication for compliance
- **Notification Context**: (Optionally) Send login notification

**Downstream Reactions**:
1. User session record created and active
2. Audit log entry created

---

### Example: Role Assigned Event

## [ROLE ASSIGNED] Event

**When It Occurs**: An administrator assigns a role to a user within an application

**Payload**:
- roleAssignmentId: Unique identifier
- userId: Who receives the role
- roleId: What role was assigned
- applicationId: Which application
- assignedBy: Who assigned it
- assignedAt: When assigned

**Produced By**: Access Control Context

**Consumed By**:
- **Audit Context**: Log role change for compliance
- **Notification Context**: Notify user of new role

**Downstream Reactions**:
1. Audit log entry created
2. User receives notification (if configured)

---

### Example: Subscription Suspended Event

## [SUBSCRIPTION SUSPENDED] Event

**When It Occurs**: A subscription is suspended due to non-payment

**Payload**:
- subscriptionId: Unique identifier
- organizationId: Which organization
- reason: Why suspended
- suspendedAt: When suspended
- gracePeriodEndsAt: When suspension becomes permanent

**Produced By**: Billing Context

**Consumed By**:
- **Organization Context**: Block new user onboarding
- **Access Control Context**: Revoke active sessions
- **Audit Context**: Log suspension

**Downstream Reactions**:
1. Organization blocked from adding new users
2. Active sessions revoked
3. Audit log entry created

---

## Completion Checklist

### Deliverables

- [ ] Key business events identified
- [ ] Each event has trigger (when it occurs)
- [ ] Each event has payload (what data)
- [ ] Producer context identified
- [ ] Consumer contexts identified
- [ ] Downstream reactions documented
- [ ] Event naming follows past tense rule
- [ ] Cross-context communication clear

### Sign-Off

- [ ] **Prepared by**: [Domain Expert], [Date]
- [ ] **Reviewed by**: [Architect], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-011-ubiquitous-language.md) | [Next >](./TEMPLATE-013-context-map.md)