[← Index](./README.md) | [< Previous](./TEMPLATE-006-scope-matrix.md)

---

# Traceability Matrix Template

You are an AI agent generating Requirements phase documentation. This template links every requirement back to Discovery artifacts — actors, needs, and strategic objectives — to prove complete coverage. Complete this template after all functional and non-functional requirements are finalized. If any Discovery need has no corresponding requirement, stop and generate the missing requirement before completing this matrix.

**When to Use**: After all requirements are complete, before Design. Validates that Discovery was properly captured.

**Owner**: Product Manager + Domain Expert

---

## Contents

- [Matrix Structure](#matrix-structure)
- [Field Definitions](#field-definitions)
- [Coverage Verification](#coverage-verification)
- [Example Matrix](#example-matrix)
- [Completion Checklist](#completion-checklist)

---

## Matrix Structure

This section defines the two-part structure of the traceability matrix: functional requirements traceability and coverage verification. Both parts are required — functional traceability alone does not prove completeness.

### Basic Format

Use these two table formats to document the full traceability matrix.

```markdown
## Functional Requirements Traceability

| FR ID | Requirement Title | Actor | Discovery Need | Strategic Objective | Priority |
|-------|---------------------|------|----------------|---------------------|----------|
| FR-001 | User Registration | New User | N1: Self-service signup | OE1: Self-service onboarding | Must |
| FR-002 | User Login | Existing User | N2: Secure access | OE2: Secure access | Must |
| FR-010 | Organization Create | Org Admin | N3: Self-service setup | OE3: Self-service | Must |

## Non-Functional Requirements Traceability

| NFR ID | Requirement | Supports | Rationale |
|--------|------------|----------|----------|
| NFR-001 | Performance: API Response | All FRs | Enables user experience |
| NFR-010 | Security: Data Protection | All FRs | Trust foundation |
```

### Columns for Functional Traceability

Every column in the functional traceability table is required — missing a column breaks the chain from Discovery to Design.

| Column | Description | Source |
|--------|------------|--------|
| **FR ID** | Unique identifier | From functional-requirements.md |
| **Requirement Title** | Short name | From functional-requirements.md |
| **Actor** | Who performs this | From Discovery (actors section) |
| **Discovery Need** | What need it serves | From Discovery (needs section) |
| **Strategic Objective** | What objective | From Discovery (vision/strategy) |
| **Priority** | MoSCoW priority | From requirements |

### Columns for Coverage Verification

The coverage verification table inverts the functional traceability view — it proves that every Discovery need is covered, not just that every requirement has a source.

```markdown
## Coverage: Discovery Needs

| Need ID | Need | FRs That Cover It | NFRs That Support It | Covered? |
|--------|------|------------------|-------------------|-----------|
| N1 | Self-service signup | FR-001, FR-002 | NFR-010, NFR-030 | ✅ |
| N2 | Secure access | FR-002, FR-003 | NFR-010 | ✅ |
| N3 | Organization setup | FR-010, FR-011 | NFR-040 | ✅ |
```

---

## Field Definitions

Each field in the traceability matrix links a requirement to its Discovery source. Use exact IDs and names from the Discovery documents — do not paraphrase.

| Field | Purpose | Guidance |
|-------|---------|----------|
| **Requirement ID** | Unique identifier | FR-XXX or NFR-XXX |
| **Title** | Short descriptive name | From requirement document |
| **Actor** | Who performs this | From Discovery: Actor list |
| **Discovery Need** | What need it serves | From Discovery: Needs and Expectations |
| **Strategic Objective** | Strategic goal | From Discovery: Vision/Strategy |
| **Priority** | MoSCoW | Must / Should / Could / Won't |

---

## Coverage Verification

This section explains why both directions of traceability are required. Functional traceability proves each requirement has a source; coverage verification proves each Discovery need has a requirement. Both are needed to confirm completeness.

### Why Coverage Matters

Each question in this table corresponds to a coverage gap that can cause a downstream failure.

| Question | Why |
|----------|-----|
| **Does every need have a requirement?** | Prevents gaps in functionality |
| **Does every requirement trace to a need?** | Prevents scope creep |
| **Does every need have NFR support?** | Ensures quality |

### Coverage Table Format

Use this table to verify that every Discovery need is covered by at least one FR and supported by relevant NFRs.

| Need ID | Discovery Need | FRs | NFRs | Covered |
|--------|---------------|-----|------|---------|
| N1 | User can self-register | FR-001 | NFR-010 (security), NFR-030 (availability) | ✅ |
| N2 | User can securely authenticate | FR-002, FR-003 | NFR-010 (security), NFR-001 (performance) | ✅ |
| N3 | Admin can create organization | FR-010 | NFR-040 (isolation) | ✅ |

---

## Example Matrix

The following examples show completed traceability matrices for two different product types. Use them to calibrate the expected coverage and the format of need-to-requirement linkages.

### Example: Authentication Platform

This example shows a complete traceability matrix for an IAM platform, with functional traceability, NFR traceability, and coverage verification.

## Functional Requirements Traceability

| FR ID | Requirement | Actor | Need | Objective | Priority |
|-------|-------------|-------|------|-----------|----------|
| FR-001 | User Registration | Prospective User | N1: Self-service signup | OE1: Self-service | Must |
| FR-002 | User Login | Existing User | N2: Secure access | OE2: Security | Must |
| FR-003 | Password Reset | Existing User | N3: Account recovery | OE2: Security | Must |
| FR-010 | Organization Create | Platform Admin | N4: Tenant isolation | OE3: Multi-tenancy | Must |
| FR-011 | Organization Config | Org Admin | N4: Tenant customization | OE3: Multi-tenancy | Should |
| FR-020 | User Invitation | Org Admin | N5: User provisioning | OE4: Team management | Should |
| FR-021 | Role Assignment | Org Admin | N6: Access control | OE4: Access control | Must |
| FR-030 | Audit Logging | Platform Admin | N7: Compliance | OE5: Auditability | Must |

## Non-Functional Traceability

| NFR ID | Requirement | Supports FRs | Rationale |
|--------|-------------|---------------|----------|
| NFR-001 | API Response <200ms | All FRs | User experience |
| NFR-010 | Password security | FR-001, FR-002, FR-003 | Trust foundation |
| NFR-020 | Org isolation | FR-010, FR-011 | Core value proposition |
| NFR-030 | 99.9% uptime | All FRs | Enterprise requirement |

## Coverage: Discovery Needs

| Need | Description | FRs | NFRs | Covered |
|------|------------|-----|------|---------|
| N1 | Self-service signup | FR-001 | NFR-010 | ✅ |
| N2 | Secure authentication | FR-002, FR-003 | NFR-010, NFR-001 | ✅ |
| N3 | Account recovery | FR-003 | NFR-010 | ✅ |
| N4 | Organization management | FR-010, FR-011 | NFR-020 | ✅ |
| N5 | User provisioning | FR-020 | — | ✅ |
| N6 | Access control | FR-021 | NFR-020 | ✅ |
| N7 | Compliance | FR-030 | NFR-030 | ✅ |

---

### Example: SaaS Task Management

This example shows a complete traceability matrix for a task management product, with functional traceability, NFR traceability, and coverage verification.

## Functional Requirements Traceability

| FR ID | Requirement | Actor | Need | Objective | Priority |
|-------|-------------|-------|------|-----------|----------|
| FR-001 | Create Task | Team Member | N1: Task creation | OE1: Core functionality | Must |
| FR-002 | View Tasks | Team Member | N2: Task visibility | OE1: Core functionality | Must |
| FR-003 | Update Task | Assigned User | N3: Task completion | OE1: Core functionality | Must |
| FR-004 | Delete Task | Project Manager | N4: Project cleanup | OE1: Core functionality | Should |
| FR-005 | Assign Task | Project Manager | N5: Work allocation | OE2: Team management | Must |

## Non-Functional Traceability

| NFR ID | Requirement | Supports FRs | Rationale |
|--------|-------------|---------------|----------|
| NFR-001 | Task list load <1s | FR-002 | User experience |
| NFR-010 | Data security | All | Trust |

## Coverage: Discovery Needs

| Need | Description | FRs | NFRs | Covered |
|------|------------|-----|------|---------|
| N1 | Create tasks | FR-001 | NFR-001 | ✅ |
| N2 | View tasks | FR-002 | NFR-001 | ✅ |
| N3 | Update tasks | FR-003 | NFR-001 | ✅ |
| N4 | Delete tasks | FR-004 | NFR-010 | ✅ |
| N5 | Assign tasks | FR-005 | — | ✅ |

---

## Completion Checklist

Verify every item below before marking the traceability matrix complete and closing the Requirements phase. A single uncovered Discovery need is a blocker — generate the missing requirement before advancing.

### Deliverables

- [ ] All functional requirements trace to Discovery actors
- [ ] All functional requirements trace to Discovery needs
- [ ] All functional requirements trace to strategic objectives
- [ ] All Discovery needs have at least one FR covering them
- [ ] All critical needs have NFR support
- [ ] No orphan requirements (untraced requirements)
- [ ] Coverage verification table shows 100% coverage
- [ ] Stakeholder review confirms traceability

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Domain Expert, Date]
- [ ] Approved by: [Product Manager, Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-006-scope-matrix.md)
