[← Index](./README.md) | [< Previous](./TEMPLATE-036-sla.md)

---

# Support

Ticket-based support system for user-reported issues.

## Contents

1. [Overview](#overview)
2. [Tool Selection](#tool-selection)
3. [Ticket Flow](#ticket-flow)
4. [Categories](#categories)
5. [Priorities](#priorities)
6. [Incident Integration](#incident-integration)
7. [Entry Channels](#entry-channels)

---

## Overview

| Aspect | Description |
|--------|-------------|
| Purpose | Handle user-reported issues, questions, feature requests |
| Multi-tenancy | Each tenant has isolated ticket view |
| Integration | Connects to incident response for critical issues |

---

## Tool Selection

### Option A: Third-Party Tools

| Tool | Tier | Free Plan | Best For |
|------|------|----------|---------|
| **Zendesk** | Enterprise | Limited | Large organizations |
| **Freshdesk** | Mid-market | Limited | Easy setup |
| **Intercom** | Premium | No | In-app chat |
| **HelpScout** | Mid-market | No | Multi-brand |

### Option B: Build Internal

Build a custom support system when:
- Deep integration needed with existing product
- Cost constraints
- Custom workflow requirements

**Core Entities** (agnostic):
- `Ticket` — Main issue entity
- `TicketComment` — Internal/external notes
- `TicketAttachment` — File attachments

**Core APIs**:
- `POST /tickets` — Create ticket
- `GET /tickets` — List tickets
- `GET /tickets/{id}` — Get ticket
- `POST /tickets/{id}/comments` — Add comment
- `PATCH /tickets/{id}` — Update ticket

---

## Ticket Flow

### Complete Flow

```
User reports issue
        │
        ▼
Ticket created (status: OPEN)
        │
        ▼
Auto-categorization (by keywords)
        │
        ▼
Auto-assignment (by category)
        │
        ▼
Support responds (status: IN_PROGRESS)
        │
        ▼
Solution provided
        │
        ├──► User confirms ──► (status: RESOLVED)
        │
        └──► No response (7 days) ──► (status: CLOSED)
```

### State Machine

| State | Description |
|--------|------------|
| **OPEN** | New, unassigned |
| **IN_PROGRESS** | Assigned, being worked on |
| **WAITING_FOR_USER** | Awaiting user response |
| **RESOLVED** | Solution provided, pending confirmation |
| **CLOSED** | Completed |
| **ON_HOLD** | Blocked by dependency |

---

## Categories

| Category | Description | Assigns To |
|-----------|------------|-------------|
| **BILLING** | Payments, invoices, plans | Finance team |
| **TECHNICAL** | Bugs, errors, performance | Engineering team |
| **ACCOUNT** | Login, roles, access | Support team |
| **INTEGRATION** | APIs, webhooks | DevOps team |
| **FEATURE_REQUEST** | New features | Product team |
| **DATA** | Export, import | Data team |
| **SECURITY** | Vulnerabilities | Security team |

**Auto-classification by keywords**:
- "invoice", "payment" → BILLING
- "error", "not working" → TECHNICAL
- "login", "password" → ACCOUNT
- "api", "webhook" → INTEGRATION

---

## Priorities

| Priority | Initial SLA | Description | Example |
|----------|-----------|------------|-----------|---------|
| **URGENT** | 15 min | Complete system down | API not responding |
| **HIGH** | 4 hours | Critical functionality | Login broken |
| **MEDIUM** | 24 hours | Minor issue | Cosmetic bug |
| **LOW** | 72 hours | Question | How to use X |

**Auto-prioritization by keywords**:
- "system down", "urgent" → URGENT
- "cannot work", "critical" → HIGH
- "possible bug" → MEDIUM
- "question", "how" → LOW

---

## Incident Integration

Support tickets integrate with incident management:

```
Support Ticket (SEV1/2)
        │
        ▼
Auto-create Incident
        │
        ▼
Escalate per incident response
```

### Ticket → Incident Mapping

| Ticket Priority | Incident SEV |
|-----------------|--------------|
| URGENT | SEV1 |
| HIGH | SEV2 |
| MEDIUM | SEV3 |
| LOW | SEV4 |

### Notifications

| Trigger | Channel | Message |
|---------|---------|---------|
| URGENT ticket | Slack | @oncall: Ticket assigned |
| Ticket assigned | Email | Assigned user notified |
| Status change | Email | User notified |

---

## Entry Channels

| Channel | Implementation |
|---------|---------------|
| **Portal** | Web UI for tickets |
| **Email** | Support email inbox |
| **Chat** | In-app widget |
| **Phone** | Enterprise only |

### User Portal

```
GET /support
  - View my tickets
  - Create new ticket
  - View status
  - Add comments
```

### Admin Portal

```
GET /admin/support
  - View all tickets
  - Filter by status/category/priority
  - Assign/reassign
  - Resolve tickets
```

---

## Completion Checklist

### Deliverables
- [ ] Tool selected (or internal build planned)
- [ ] Ticket flow documented
- [ ] Categories defined
- [ ] Priorities and SLAs defined
- [ ] Incident integration configured
- [ ] Entry channels implemented

### Sign-Off
- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Support Lead, Date]
- [ ] Approved by: [Operations Lead, Date]

---

## Tips

1. **Start simple**: Use existing tool before building custom
2. **Auto-classify**: Reduce manual triage effort
3. **Integrate with incidents**: Critical issues escalate automatically
4. **Track SLAs**: Monitor compliance per priority

---

[← Index](./README.md) | [< Previous](./TEMPLATE-036-sla.md)