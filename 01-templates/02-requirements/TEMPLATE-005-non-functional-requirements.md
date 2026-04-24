[← Index](./README.md) | [< Previous](./TEMPLATE-004-functional-requirements.md) | [Next >](./TEMPLATE-006-scope-matrix.md)

---

# Non-Functional Requirements Template

You are an AI agent generating Requirements phase documentation. This template defines system characteristics — performance, security, scalability, availability, usability, and maintainability. These requirements define HOW WELL the system must perform, not WHAT it does. Each NFR must have a measurable target, a verification method, and a rationale that connects it to a business need.

**When to Use**: During Phase 2 (Requirements), typically in parallel with or after functional requirements. NFRs apply across multiple features.

**Owner**: Tech Lead + Security Expert + Operations

---

## Contents

- [NFR Categories](#nfr-categories)
- [NFR Structure](#nfr-structure)
- [Field Definitions](#field-definitions)
- [Writing Guidelines](#writing-guidelines)
- [Example NFRs](#example-nfrs)
- [Common NFR Patterns by Product Type](#common-nfr-patterns-by-product-type)
- [Completion Checklist](#completion-checklist)

---

## NFR Categories

This table lists the standard NFR categories. Every project should have at least one NFR per applicable category — a missing category is a sign that important system characteristics have not been considered.

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

This structure must be applied consistently to every non-functional requirement you generate. The three-tier Target SLA (primary, degraded, minimum) is required — it defines both the goal and the failure condition.

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

Each field in the NFR structure serves a specific purpose. Pay particular attention to Target SLA — vague targets make NFRs unverifiable and unenforceable.

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

Apply these guidelines to every NFR you write. Vague NFRs are unverifiable — they create false confidence during Requirements and surface as disputes during Testing.

### Good NFR Elements

This table shows the difference between well-written and poorly-written elements for each NFR field.

| Element | Good | Bad |
|---------|------|-----|
| **Target SLA** | "p95 < 200ms" | "Fast enough" |
| **Measurement** | "Load test with 1000 users" | "When needed" |
| **Rationale** | "Users leave after 3s" | "Important" |
| **Scope Includes** | Specific components | "Everything" |

### What to Avoid

These patterns invalidate an NFR — correct them before proceeding.

- ❌ Vague targets ("fast", "secure")
- ❌ No numbers ("many users")
- ❌ Technology-specific goals (until design phase)
- ❌ Unrealistic targets without rationale

---

## Example NFRs

The following examples show four completed non-functional requirements from an IAM platform. Use them to calibrate the expected specificity for targets and measurement methods.

### Example: Performance — API Response Time

This example shows how to specify a performance requirement with a three-tier SLA and concrete measurement approach.

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

This example shows how to specify a security requirement with zero-tolerance targets and explicit compliance scope.

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

This example shows how to specify a scalability requirement with per-organization limits and horizontal scaling expectations.

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

This example shows how to specify an availability requirement with explicit exclusions for planned maintenance and external failures.

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

This example shows how to specify a security requirement with zero-tolerance targets that apply to architectural constraints, not configuration.

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

This section lists typical NFR sets for common product types. Use these as a starting checklist when generating NFRs — a missing pattern area is a warning sign.

### Authentication Platform

These NFRs typically apply to any system that manages identity and access.

- NFR-001: API Response Time (< 200ms p95)
- NFR-010: Password Security (hashed, not stored)
- NFR-020: Concurrent Users (10K+ per org)
- NFR-030: Uptime (99.9% monthly)
- NFR-040: Organization Isolation (complete)

### Task Management SaaS

These NFRs typically apply to collaborative productivity applications.

- NFR-001: Task List Load (< 1s with 500+ tasks)
- NFR-010: File Storage Security (encrypted)
- NFR-020: Storage Capacity (unlimited growth)
- NFR-030: Data Backup (daily, 30-day retention)
- NFR-040: Mobile Support (iOS, Android)

### E-commerce Platform

These NFRs typically apply to transaction-based platforms with payment processing.

- NFR-001: Checkout Flow (< 30 seconds)
- NFR-010: Payment Data (PCI compliance)
- NFR-020: Inventory Accuracy (100%)
- NFR-030: Order Processing (real-time)
- NFR-040: API Throughput (1000+ RPM)

---

## Completion Checklist

Verify every item below before marking non-functional requirements complete and advancing to TEMPLATE-006.

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

[← Index](./README.md) | [< Previous](./TEMPLATE-004-functional-requirements.md) | [Next >](./TEMPLATE-006-scope-matrix.md)
