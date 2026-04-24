[← Index](./README.md) | [< Previous](./TEMPLATE-009-strategic-design.md) | [Next >](./TEMPLATE-011-ubiquitous-language.md)

---

# System Flows Template

Use this template to document how the system behaves for each major workflow. For every functional requirement identified in Phase 2, you must produce at least one system flow. Flows capture actors, trigger, happy path, exception paths, and data transformations — without referencing technology or implementation details.

Before filling in this template, ensure the requirements phase is complete and each functional requirement has a unique FR-XXX identifier. Your output will be consumed by the Data Model phase to identify entities, and by the Development phase to drive implementation.

**Owner**: Architect + Product Manager (for review)

---

## Contents

- [Flow Structure](#flow-structure)
- [Field Definitions](#field-definitions)
- [Writing Guidelines](#writing-guidelines)
- [Example Flows](#example-flows)
- [Completion Checklist](#completion-checklist)

---

## Flow Structure

Each system flow follows this exact structure. Copy the block below once per major workflow, assign it a unique SF-XXX identifier, and fill in every field. Do not leave any field empty — if a field does not apply, write "N/A" and briefly explain why.

```markdown
## [SF-XXX] Flow Name

**Related Requirement**: FR-XXX

### Actors Involved
- [Actor 1]: [Role in this flow]
- [Actor 2]: [Role in this flow]
- **System**: [What the system does]

### Trigger
[What initiates this flow? User action, scheduled event, external trigger?]

### Preconditions
[What must be true before this flow starts?]

### Happy Path
1. [Step 1 - who acts]: [What they do]
   → **System**: [What system does in response]
2. [Step 2 - who acts]: [What they do]
   → **System**: [What system does]
3. [Step 3]: ...
   → **Outcome**: [Final result]

### Exception Flows
- **If [condition]**: [Alternative path]
- **If [other condition]**: [Different path]

### Decision Points
- [Decision 1]: [What determines the branch?]
- [Decision 2]: [What determines this branch?]

### Data Flow
- **Input**: [What data enters the flow]
- **Process**: [What happens to the data]
- **Output**: [What results from the flow]
```

---

## Field Definitions

Use this table to understand the purpose of each field before filling it in. Ambiguous or missing fields are the most common cause of incomplete flows.

| Field | Purpose | Guidance |
|-------|---------|----------|
| **Flow ID** | Unique identifier | Format: SF-001, SF-002, etc. |
| **Related Requirement** | What FR this flows from | FR-XXX from requirements |
| **Actors Involved** | Who participates | Users, admins, system, external services |
| **Trigger** | What starts the flow | User action, event, scheduled task |
| **Preconditions** | What must be true | Authentication, data existence |
| **Happy Path** | The ideal sequence | Step-by-step with system responses |
| **Exception Flows** | What can go wrong | Error cases, edge cases |
| **Decision Points** | Where flow branches | Conditional logic |
| **Data Flow** | What changes | Input → Process → Output |

---

## Writing Guidelines

Apply these guidelines when writing each flow. They distinguish well-written flows from vague ones. Review your output against both criteria tables before considering a flow complete.

### ✅ Good Flow Characteristics

Your flows should exhibit all of the following:

| Characteristic | Example |
|---------------|----------|
| **Step-by-step** | Clear sequence, one action per step |
| **System response explicit** | Not "processes" — be specific: "validates email format" |
| **Exceptions covered** | At least 2-3 error cases per flow |
| **Data-aware** | What data is created, updated, deleted? |
| **Traced to requirements** | Each flow links to FR-XXX |
| **User perspective** | Describe what user sees and does |

### ❌ Avoid

Do not include any of the following in your flows:

- Vague steps: "system processes data" (too generic)
- Implementation details: JWT, database, API endpoints
- Only happy path: exception paths are 50% of work
- Unlinked flows: every flow must trace to a requirement
- Skip preconditions: what must be true first?

---

## Example Flows

The following examples demonstrate what a complete flow looks like. Use them as reference when writing your own flows. Do not copy them verbatim — replace all content with real project information.

### Example: User Registration

This example shows a registration flow with email verification. Observe:
- Clear actor roles (Prospective User, System, Email Service)
- Step-by-step happy path with system responses after each action
- Multiple exception flows covering validation errors and delivery failures
- Explicit data transformations (password hashing, token generation, email sending)

## [SF-001] User Registration

**Related Requirement**: FR-001 (User Registration)

### Actors Involved
- **Prospective User**: Creates account
- **System**: Validates, creates, sends verification
- **Email Service**: Delivers verification email

### Trigger
User clicks "Sign Up"

### Preconditions
- None (unauthenticated user)

### Happy Path
1. User enters email and password
   → **System**: Validates email format, checks duplicate
2. User confirms password
   → **System**: Validates match
3. User clicks "Create Account"
   → **System**: Creates user account (status: pending_verification)
   → **System**: Generates verification token
   → **Email Service**: Sends verification email
4. User sees success message
   → **System**: Redirect to login
5. User clicks verification link
   → **System**: Validates token, marks email verified
   → **System**: User can now login

### Exception Flows
- **If email already exists**: Show error, suggest login
- **If password doesn't meet requirements**: Show inline validation error
- **If email delivery fails**: Show error, allow retry
- **If verification link expired**: Show error, allow resend

### Decision Points
- **Email validation**: Is format valid? Is it a duplicate?
- **Password requirements**: 8+ chars, number required?
- **Verification expiry**: 24 hours?

### Data Flow
- **Input**: email, password
- **Process**: Validate → Hash password → Create user → Generate token → Send email
- **Output**: User record (pending_verification), verification email

---

### Example: Checkout Flow

This example shows a complex multi-step flow with external dependencies and state management. Observe:
- Preconditions that must be true before the flow starts
- Interactions with external services (Payment Processor, Inventory)
- Multiple decision points based on validation and availability
- Exception flows for payment failure, address validation, and inventory issues
- Clear data flow showing what persists and what changes state

## [SF-010] Checkout and Payment

**Related Requirement**: FR-050 (Complete Purchase)

### Actors Involved
- **Customer**: Initiates purchase
- **System**: Processes order, payment, inventory
- **Payment Processor**: External service that charges card
- **Inventory Service**: Reserves stock

### Trigger
Customer clicks "Checkout"

### Preconditions
- Customer logged in
- Cart has items
- Items in stock

### Happy Path
1. Customer views cart summary
   → **System**: Display items, quantities, total
2. Customer enters shipping address
   → **System**: Validate address format
3. Customer selects shipping method
   → **System**: Calculate cost, update total
4. Customer enters payment info
   → **System**: Validate card format (not charge yet)
5. Customer reviews order
   → **System**: Show breakdown, taxes, total
6. Customer clicks "Place Order"
   → **System**: Create order (pending_payment)
   → **System**: Reserve inventory
   → **Payment Processor**: Process charge
7. Payment succeeds
   → **System**: Mark order paid
   → **System**: Send confirmation email
   → **System**: Redirect to confirmation
8. Customer sees confirmation
   → **System**: Order complete

### Exception Flows
- **If address invalid**: Show validation error, suggest correction
- **If payment declined**: Release inventory, show error, allow retry
- **If payment processor down**: Show error, let customer retry later
- **If inventory unavailable during checkout**: Show error, offer similar items

### Decision Points
- **Address validation**: Postal code format correct?
- **Shipping method**: Standard vs Express?
- **Payment**: Card valid? Charge succeeds?
- **Inventory**: Items still in stock after payment?

### Data Flow
- **Input**: Cart items, address, payment info
- **Process**: Validate → Create order → Reserve inventory → Call payment → If success: complete; If fail: release
- **Output**: Order record, confirmation email, inventory updated

---

## Completion Checklist

Before marking this document complete, verify every item below. A missing item means the flows are not ready for the next phase.

### Deliverables

- [ ] All major requirements have flows (FR → SF relationship)
- [ ] Each flow has actors, trigger, preconditions
- [ ] Happy path documented step-by-step
- [ ] At least 2-3 exception paths per flow
- [ ] Decision points explained
- [ ] Data flow documented (input, process, output)
- [ ] No technology details (REST, JWT, database)
- [ ] Flows reviewed with stakeholders

### Sign-Off

- [ ] **Prepared by**: [Architect], [Date]
- [ ] **Reviewed by**: [Product Manager], [Date]
- [ ] **Approved by**: [Engineering Lead], [Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-009-strategic-design.md) | [Next >](./TEMPLATE-011-ubiquitous-language.md)
