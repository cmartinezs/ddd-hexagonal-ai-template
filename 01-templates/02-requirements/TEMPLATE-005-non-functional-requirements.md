[← Index](./README.md) | [< Anterior](./TEMPLATE-004-functional-requirements.md) | [Next >](./TEMPLATE-006-scope-matrix.md)

---

# Non-Functional Requirements Template

**What This Is**: A template for documenting system characteristics: performance, security, scalability, availability, usability, and maintainability. These define HOW WELL the system must perform, not WHAT it does.

**How to Use**: Create one file per NFR category or use this template to build a consolidated `non-functional-requirements.md` document. Each category gets its own section with measurable targets.

**Why It Matters**: NFRs are often overlooked until things go wrong. Clear NFRs prevent late-stage surprises and ensure the system meets user expectations for responsiveness, security, and reliability.

**When to Use**: During Phase 2 (Requirements), typically in parallel with or after functional requirements. NFRs apply to multiple features.

**Owner**: Tech Lead + Security Expert + Operations

---

## Contents

- [NFR Categories](#nfr-categories)
- [NFR Structure](#nfr-structure)
- [Writing Guidelines](#writing-guidelines)
- [Example NFRs](#example-nfrs)
- [Completion Checklist](#completion-checklist)

---

## NFR Categories

| Category | What It Measures | Examples |
|----------|-----------------|----------|
| **Performance** | Speed and responsiveness | Response time, throughput, latency |
| **Security** | Protection of data and access | Encryption, authentication, authorization |
| **Scalability** | Ability to grow | Max users, concurrent connections, data volume |
| **Availability** | Uptime and reliability | Uptime SLA, recovery time, redundancy |
| **Usability** | User experience | Accessibility, browser support, ease of use |
| **Maintainability** | Ease of changes | Code quality, testability, documentation |
| **Observability** | System visibility | Metrics, logging, tracing |
| **Compliance** | Regulatory adherence | Data privacy, audit trails |

---

## NFR Structure

Every NFR follows this structure:

```markdown
# [NFR-XXX] Category: Requirement Name

**Description**: One or two sentences describing the system characteristic.

### Scope Includes

- What this NFR covers
- Which system components or scenarios

### Does NOT Include (MVP)

- What is explicitly excluded
- Lower-priority scenarios
- Known limitations

### Target SLA

- Primary target (what we aim for)
- Degraded threshold (when performance suffers)
- Minimum acceptable (fail state)

### Measurement

- How will we verify this target?
- What tools or tests?
- What frequency?

### Rationale

- Why does this matter to users or business?
- What happens if we miss it?
```

---

## Field Definitions

| Field | Purpose | Guidance |
|-------|---------|----------|
| **ID** | Unique identifier | Format: NFR-001, NFR-002, etc. |
| **Category** | Type of requirement | From the category table above |
| **Description** | What characteristic | 1-2 sentences |
| **Scope Includes** | What IS covered | Be specific |
| **Does NOT Include** | What is NOT covered | Critical for scope control |
| **Target SLA** | Measurable targets | Primary, degraded, minimum |
| **Measurement** | How to verify | Tools, tests, frequency |
| **Rationale** | Why it matters | Business impact |

---

## Writing Guidelines

### Good NFR Elements

| Element | Good | Bad |
|---------|------|-----|
| **Target SLA** | "p95 < 200ms" | "Fast enough" |
| **Measurement** | "Load test with 1000 users" | "When needed" |
| **Rationale** | "Users leave after 3s" | "Important" |
| **Scope Includes** | Specific components | "Everything" |

### What to Avoid

- ❌ Vague targets ("fast", "secure")
- ❌ No numbers ("many users")
- ❌ Technology-specific goals (until design phase)
- ❌ Unrealistic targets without rationale

---

## Example NFRs

### Example: Performance — API Response Time

# NFR-001 — Performance: API Response Time

**Description**: All API endpoints must respond within defined latency targets to ensure responsive user experience.

### Scope Includes

- All authenticated API endpoints
- All public verification endpoints
- Authentication flows

### Does NOT Include (MVP)

- First load (cold cache) — target 500ms
- Bulk operations (> 100 records)
- File upload/download endpoints
- Webhook delivery times

### Target SLA

- Primary: p95 < 200ms
- Degraded: p95 < 500ms
- Minimum: p95 < 1000ms

### Measurement

- APM tools track all endpoint latencies in production
- Automated performance tests in CI/CD
- Weekly latency reports reviewed by engineering

### Rationale

- Users expect instantaneous response; 200ms feels instant
- Slow APIs increase abandonment
- Competitive market expects sub-200ms

---

### Example: Security — Data Protection

# NFR-010 — Security: Data Protection

**Description**: All sensitive data must be protected using industry-standard encryption at rest and in transit.

### Scope Includes

- User passwords and credentials
- API keys and secrets
- Session tokens
- Personal identifiable information (PII)
- Payment-related data

### Does Not Include (MVP)

- SOC 2 certification (audit phase)
- Third-party vulnerability scanning
- Penetration testing by external parties

### Target SLA

- Zero plaintext storage of sensitive data
- 100% encrypted data in transit
- Zero critical security findings in audit

### Measurement

- Code review for plaintext references
- Security audit validates encryption configs
- Annual third-party penetration test

### Rationale

- Data breaches destroy user trust
- Regulatory requirements (GDPR, etc.)
- Enterprise customer demands

---

### Example: Scalability — Concurrent Users

# NFR-020 — Scalability: Concurrent Users

**Description**: System must support minimum concurrent users per organization with ability to scale horizontally.

### Scope Includes

- Authenticated users in a single organization
- Session management
- API request handling

### Does Not Include (MVP)

- Cross-organization events (broadcasts)
- Organization-level API quotas (future)
- Real-time collaboration features

### Target SLA

- Primary: 10,000 concurrent per organization
- Degraded: 5,000 concurrent per organization
- Minimum: 1,000 concurrent per organization

### Measurement

- Load testing with expected and peak volumes
- Auto-scaling rules tested in staging
- Production metrics monitor scaling events

### Rationale

- Enterprise customers have large user bases
- Platform must support growth
- Peak loads during business hours

---

### Example: Availability — Uptime SLA

# NFR-030 — Availability: Uptime SLA

**Description**: System must maintain defined uptime percentage to ensure reliability for enterprise customers.

### Scope Includes

- API availability
- Authentication service
- User-facing applications

### Does Not Include (MVP)

- Planned maintenance windows
- Third-party service failures
- Force majeure events

### Target SLA

- Primary: 99.9% monthly (2h 43m downtime)
- Degraded: 99.5% monthly (3h 39m downtime)
- Minimum: 99% monthly (7h 18m downtime)

### Measurement

- Third-party uptime monitoring
- Incident tracking system
- Monthly SLA report auto-generated

### Rationale

- Enterprise customers require reliability
- Downtime affects retention
- Competitive SLA in market

---

### Example: Organization Isolation

# NFR-040 — Security: Organization Isolation

**Description**: Data and operations of one organization must be completely isolated from all other organizations.

### Scope Includes

- Database records per organization
- API access control
- Session validation
- Audit logging

### Does Not Include (MVP)

- Cross-organization reporting
- Multi-organization admin view
- Organization data export for platform admins

### Target SLA

- Zero data leakage between organizations
- Zero unauthorized cross-org access
- 100% isolation verification in tests

### Measurement

- Unit tests verify isolation
- Integration tests confirm boundaries
- Quarterly security audit

### Rationale

- Enterprise customers share sensitive data
- Regulatory requirements (GDPR, HIPAA)
- Trust is core to platform value

---

## Common NFR Patterns by Product Type

### Authentication Platform

- NFR-001: API Response Time (< 200ms p95)
- NFR-010: Password Security (hashed, not stored)
- NFR-020: Concurrent Users (10K+ per org)
- NFR-030: Uptime (99.9% monthly)
- NFR-040: Organization Isolation (complete)

### Task Management SaaS

- NFR-001: Task List Load (< 1s with 500+ tasks)
- NFR-010: File Storage Security (encrypted)
- NFR-020: Storage Capacity (unlimited growth)
- NFR-030: Data Backup (daily, 30-day retention)
- NFR-040: Mobile Support (iOS, Android)

### E-commerce Platform

- NFR-001: Checkout Flow (< 30 seconds)
- NFR-010: Payment Data (PCI compliance)
- NFR-020: Inventory Accuracy (100%)
- NFR-030: Order Processing (real-time)
- NFR-040: API Throughput (1000+ RPM)

---

## Completion Checklist

### Deliverables

- [ ] All NFR categories covered (performance, security, scalability, availability, usability, maintainability)
- [ ] Each NFR has specific, measurable targets
- [ ] Scope clearly defined (includes and excludes)
- [ ] Measurement method defined
- [ ] Rationale explains business value
- [ ] No technology details (reserved for design phase)
- [ ] Engineering confirmed feasibility
- [ ] Security expert reviewed security NFRs

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Tech Lead, Security Expert, Date]
- [ ] Approved by: [Product Manager, Date]

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-004-functional-requirements.md) | [Next >](./TEMPLATE-006-scope-matrix.md)