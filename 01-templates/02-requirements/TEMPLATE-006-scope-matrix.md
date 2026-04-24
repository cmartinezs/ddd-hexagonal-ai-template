[← Index](./README.md) | [< Previous](./TEMPLATE-005-non-functional-requirements.md) | [Next >](./TEMPLATE-007-traceability-matrix.md)

---

# Scope Matrix Template

You are an AI agent generating Requirements phase documentation. This template maps every requirement to a delivery phase, defining what is in MVP versus future phases. Complete this template after all functional and non-functional requirements are finalized — the scope matrix is the boundary enforcement mechanism that prevents MVP scope from growing unchecked.

**When to Use**: After all functional and non-functional requirements are complete. Before moving to Design.

**Owner**: Product Manager + Engineering Lead

---

## Contents

- [Matrix Structure](#matrix-structure)
- [Phase Definitions](#phase-definitions)
- [Decision Criteria](#decision-criteria)
- [Example Matrix](#example-matrix)
- [Completion Checklist](#completion-checklist)

---

## Matrix Structure

This section defines the format for the scope matrix. Apply this format consistently — every requirement must appear in the matrix with a clear phase assignment.

### Basic Format

Use this table format to document the phase assignment for each requirement.

```markdown
| Requirement ID | Requirement Title | MVP | Phase 2 | Future | Notes |
|---------------|------------------|:---:|:-------:|:------:|-------|
| FR-001 | User Registration | In | | | Core feature |
| FR-002 | User Login | In | | | Core feature |
| FR-010 | Social Login | | In | | Phase 2 |
| FR-020 | SAML SSO | | In | | Enterprise |
| NFR-001 | API Response <200ms | In | | | All phases |
```

### Status Values

Use these values in the MVP, Phase 2, and Future columns — do not use other values.

| Value | Meaning | When to Use |
|-------|--------|-------------|
| **In** | Included in this phase | Must be delivered |
| **Out** | Explicitly excluded | Won't do in this phase |
| **—** | Not applicable | Doesn't apply |

### Required Columns

Every scope matrix must include all columns listed below — removing a column makes phase assignments ambiguous.

| Column | Description |
|--------|-------------|
| **Requirement ID** | FR-XXX or NFR-XXX |
| **Requirement Title** | Short name |
| **MVP** | In / Out / — |
| **Phase 2** | In / Out / — |
| **Future** | In / Out / — |
| **Notes** | Rationale, dependencies, clarifications |

---

## Phase Definitions

This section defines what each phase means. Apply these definitions consistently when deciding which phase a requirement belongs to — the distinction between MVP and Phase 2 must be based on the criteria below, not intuition.

### Phase 1: MVP (Minimum Viable Product)

The MVP contains only the features required to deliver core value and validate the product with first customers. When in doubt, defer to Phase 2.

**Definition**: Minimum feature set to deliver core value and validate the product with first customers.

**Characteristics**:

- Must-have features only
- Essential for initial customers
- Enables learning and iteration
- Typically 2-4 months

**Criteria for inclusion**:

- Required for core value proposition
- Blocker if missing
- High impact on user experience
- Feasible with available resources

### Phase 2: Enhanced (Next Iteration)

Phase 2 contains features that improve and expand the product based on what was learned from MVP users.

**Definition**: Features that improve and expand the product.

**Characteristics**:

- Should-have features
- Differentiators from competitors
- Enterprise requirements
- Typically 2-3 months after MVP

**Criteria for inclusion**:

- Requested by early adopters
- Competitive necessity
- Enables enterprise sales

### Phase 3: Mature (Future)

Future phase features have strategic value but are not tied to a specific timeline and depend on market conditions or customer growth.

**Definition**: Advanced features for scale and enterprise.

**Characteristics**:

- Could-have features
- Nice-to-have functionality
- Long-term vision
- Timeline undefined

**Criteria for inclusion**:

- Strategic value
- Large customer requests
- Market expansion

---

## Decision Criteria

Use these questions to make consistent, defensible phase assignment decisions. Every "In" assignment for MVP must pass the MVP questions; every Phase 2 assignment must pass the Phase 2 questions.

### Questions for MVP Inclusion

Apply these questions to each requirement being considered for MVP.

1. **Is this feature required for the first customer to succeed?**
   - Yes → MVP
   - No → Later phase

2. **Does this feature enable the core value proposition?**
   - Yes → MVP
   - No → Later phase

3. **Can we ship without this and still have a viable product?**
   - No → MVP
   - Yes → Later phase

4. **Is this feature technically complex or high-risk?**
   - Yes → Later phase (reduce MVP risk)
   - No → MVP

### Questions for Phase 2

Apply these questions to each requirement being considered for Phase 2.

1. **Is this requested by early customers or prospects?**
   - Yes → Consider Phase 2

2. **Is this required for enterprise sales?**
   - Yes → Phase 2

3. **Does this depend on MVP features?**
   - Yes → Phase 2 (after MVP stabilizes)

---

## Example Matrix

The following examples show completed scope matrices for two different product types. Use them to calibrate the expected breadth of requirements and the ratio of MVP to future-phase items.

### Example: Authentication Platform

This example shows a scope matrix for an IAM platform, demonstrating how enterprise features (SSO, custom branding) are deferred while core auth is in MVP.

| ID | Requirement | MVP | Phase 2 | Future | Notes |
|----|-------------|:---:|:-------:|:------:|-------|
| FR-001 | Email/Password Registration | In | | | MVP |
| FR-002 | Email/Password Login | In | | | MVP |
| FR-003 | Password Reset | In | | | MVP |
| FR-004 | MFA (TOTP) | In | | | MVP |
| FR-005 | Social Login (Google) | | In | | Phase 2 |
| FR-006 | Social Login (GitHub) | | In | | Phase 2 |
| FR-010 | SAML SSO | | In | | Enterprise |
| FR-011 | OIDC SSO | | In | | Enterprise |
| FR-012 | Custom Branding | | | In | Enterprise |
| FR-020 | Organization Management | In | | | MVP |
| FR-021 | User Invitation | In | | | MVP |
| FR-022 | Role Management | In | | | MVP |
| FR-023 | Custom Roles | | In | | Phase 2 |
| FR-030 | Audit Logs | In | | | MVP |
| FR-031 | Export Audit Logs | | In | | Phase 2 |
| FR-032 | Real-time Alerts | | | In | Future |
| NFR-001 | API <200ms p95 | In | | | All |
| NFR-002 | 99.9% Uptime | In | | | All |
| NFR-003 | SOC 2 Compliance | | In | | Phase 2 |
| NFR-004 | 99.99% Uptime | | | In | Future |

### Example: SaaS Task Management

This example shows a scope matrix for a task management product, demonstrating how advanced features (search, dependencies) are deferred while core task operations are in MVP.

| ID | Requirement | MVP | Phase 2 | Future | Notes |
|----|-------------|:---:|:-------:|:------:|-------|
| FR-001 | Create Task | In | | | MVP |
| FR-002 | View Tasks | In | | | MVP |
| FR-003 | Update Task | In | | | MVP |
| FR-004 | Delete Task | In | | | MVP |
| FR-005 | Task Assignment | In | | | MVP |
| FR-006 | Task Status | In | | | MVP |
| FR-010 | Task Search | | In | | Phase 2 |
| FR-011 | Task Filters | | In | | Phase 2 |
| FR-012 | Task Dependencies | | In | | Phase 2 |
| FR-020 | File Attachments | | | In | Future |
| FR-021 | Comments | | In | | Phase 2 |
| FR-022 | @Mentions | | | In | Future |
| FR-030 | User Groups | | | In | Future |
| FR-031 | Guest Users | | In | | Phase 2 |
| NFR-001 | List Load <1s | In | | | MVP |
| NFR-002 | Mobile Support | | In | | Phase 2 |

---

## Completion Checklist

Verify every item below before marking the scope matrix complete and advancing to TEMPLATE-007.

### Deliverables

- [ ] All functional requirements mapped to phases
- [ ] All non-functional requirements mapped to phases
- [ ] Phase 1 (MVP) scope is achievable
- [ ] Dependencies between phases considered
- [ ] Rationale documented for each assignment
- [ ] Stakeholder alignment confirmed
- [ ] Clear boundaries between phases

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Engineering Lead, Date]
- [ ] Approved by: [Product Manager, Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-005-non-functional-requirements.md) | [Next >](./TEMPLATE-007-traceability-matrix.md)
