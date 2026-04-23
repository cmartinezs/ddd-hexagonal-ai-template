[← Index](./README.md) | [< Anterior] | [Next >](./TEMPLATE-005-non-functional-requirements.md)

---

# Functional Requirements Template

**What This Is**: A template for documenting each functional requirement with full context: scope, dependencies, acceptance criteria, and risks.

**How to Use**: Create one file per requirement or use this template to build a consolidated `functional-requirements.md` document. Follow the structure exactly.

**Why It Matters**: Without clear scope boundaries ("includes" vs "excludes"), requirements grow unchecked and cause scope creep. Without traceability to other requirements, changes cascade unpredictably.

**When to Use**: During Phase 2 (Requirements) after Discovery is complete. Each functional capability becomes a requirement.

**Owner**: Product Manager + Domain Expert

---

## Contents

- [Requirement Structure](#requirement-structure)
- [Field Definitions](#field-definitions)
- [Writing Guidelines](#writing-guidelines)
- [Example Requirements](#example-requirements)
- [Completion Checklist](#completion-checklist)

---

## Requirement Structure

Every functional requirement follows this structure:

```markdown
# [FR-XXX] Requirement Title

**Description**: One or two sentences explaining what the system must do.

### Scope Includes

- What this requirement covers
- What the system must support
- Key capabilities enabled

### Does NOT Include (MVP)

- What is explicitly excluded
- Features deferred to future phases
- Known limitations

### Dependencies

- Which other requirements must exist first?
- Which NFRs apply?
- External assumptions?

### Acceptance Criteria

1. First criterion (measurable, testable)
2. Second criterion
3. Third criterion
4. [etc.]

### Risks and Mitigations

- Risk: [description] → Mitigation: [approach]
```

---

## Field Definitions

| Field | Purpose | Guidance |
|-------|---------|----------|
| **ID** | Unique identifier | Format: FR-001, FR-002, etc. |
| **Title** | Short descriptive name | Use strong noun + action |
| **Description** | What the system must do | 1-2 sentences, no ambiguity |
| **Scope Includes** | Boundaries of what IS covered | Be specific, not vague |
| **Does NOT Include** | Boundaries of what is NOT covered | Critical for scope control |
| **Dependencies** | What must exist first | Reference other FRs and NFRs |
| **Acceptance Criteria** | How we know it works | Must be measurable, testable |
| **Risks** | What could go wrong | Plus mitigation strategy |

---

## Writing Guidelines

### Good Requirement Elements

| Element | Good | Bad |
|---------|------|-----|
| **Scope Includes** | Specific capabilities listed | Vague "handles all cases" |
| **Does NOT Include** | Explicit exclusions with rationale | Silent assumptions |
| **Dependencies** | Clear references (FR-003, NFR-01) | "Related requirements" |
| **Acceptance Criteria** | "Response < 200ms" | "Fast enough" |
| **Risks** | Specific threat + mitigation | "Could fail" |

### What to Avoid

- ❌ Implementation details (REST, JWT, database)
- ❌ Technology choices (React, PostgreSQL)
- ❌ Design patterns (repository, singleton)
- ❌ Vague language ("as appropriate", "when needed")
- ❌ Acceptance criteria that can't be tested

---

## Example Requirements

### Example: User Registration

# FR-001 — User Registration

**Description**: New users can create an account with email and password to access the system.

### Scope Includes

- Registration with email address and password
- Email verification flow
- Account activation upon verification
- Duplicate email detection
- Password strength validation

### Does NOT Include (MVP)

- Social login (Google, GitHub, etc.)
- Multi-factor authentication
- Account recovery via SMS
- Bulk user provisioning
- Self-service password without email

### Dependencies

- NFR-01 (Security — password hashing)
- NFR-02 (Data isolation)
- FR-002 (Email verification)

### Acceptance Criteria

1. User can register with email format validation
2. Password must meet minimum complexity (8+ chars, 1 number)
3. Duplicate email shows clear error message
4. Verification email sent within 60 seconds
5. Users cannot login until email is verified
6. Registration logs all attempts (success/failure)

### Risks and Mitigations

- Risk: Brute force registration attacks → Mitigation: Rate limiting per IP
- Risk: Email delivery failures → Mitigation: Retry queue with fallback

---

### Example: Organization Management

# FR-010 — Organization Management

**Description**: Administrators can create, configure, suspend, and delete organizations. Each organization operates in a completely isolated environment.

### Scope Includes

- Create new organization with unique identifier
- Configure organization settings (name, domain, auth policy)
- Suspend active organization (prevents access, preserves data)
- Delete organization (with retention policy)
- View organization state (active, suspended, deleted)

### Does NOT Include (MVP)

- Organization migration between systems
- Organization merge/split
- Automatic provisioning from external systems
- Cross-organization collaboration

### Dependencies

- FR-011 (Organization Configuration)
- NFR-02 (Organization Isolation)
- FR-020 (Platform Administration)

### Acceptance Criteria

1. Platform admin can create organization with required fields
2. New organization starts in inactive state
3. Suspending organization immediately revokes all member access
4. Suspended organization data is preserved and restorable
5. Organization identifier never changes or is reassigned
6. All lifecycle actions logged in audit trail

### Risks and Mitigations

- Risk: Accidental deletion with active data → Mitigation: Confirmation + grace period
- Risk: Data loss on delete → Mitigation: Configurable retention policy

---

### Example: Role-Based Access Control

# FR-025 — Role Assignment

**Description**: Organization administrators can assign roles to members within their organization, controlling what each member can do.

### Scope Includes

- List available roles for organization
- Assign role to member
- Remove role from member
- View member's current roles
- Role changes take effect immediately

### Does NOT Include (MVP)

- Custom role creation by admins
- Role hierarchy/inheritance
- Permission-level customization
- Cross-organization role assignment

### Dependencies

- FR-010 (Organization Management)
- FR-024 (Role Definition)
- FR-018 (Audit Logging)

### Acceptance Criteria

1. Admin can only assign roles within their organization
2. Available roles match organization's defined roles
3. Cannot remove last admin role from sole admin
4. Role change is immediately effective
5. Member receives notification of role change
6. Action logged with timestamp and admin identity

### Risks and Mitigations

- Risk: Locking out all admins → Mitigation: Prevent removing own admin role without confirmation

---

## Common Requirement Patterns

### Authentication Requirements

- User registration
- User login
- Password reset
- Session management
- Account recovery

### Organization Requirements

- Organization creation
- Organization configuration
- Member management
- Organization suspension/deletion

### Access Control Requirements

- Role definition
- Role assignment
- Permission evaluation
- Resource access control

### Billing Requirements (for SaaS)

- Subscription management
- Plan configuration
- Usage metering
- Invoice generation

---

## Completion Checklist

###Deliverables

- [ ] Each capability from Discovery has a corresponding FR
- [ ] Every FR has clear scope (includes and excludes)
- [ ] Dependencies are documented (other FRs, NFRs)
- [ ] Acceptance criteria are measurable and testable
- [ ] Risks have mitigation strategies
- [ ] No technology/implementation details
- [ ] Consistent ID numbering (FR-001, FR-002...)

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Domain Expert, Date]
- [ ] Approved by: [Product Manager, Date]

---

[← Index](./README.md) | [< Anterior] | [Next >](./TEMPLATE-005-non-functional-requirements.md)