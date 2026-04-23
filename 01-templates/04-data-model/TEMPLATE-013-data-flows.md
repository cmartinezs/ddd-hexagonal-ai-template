[← Index](./README.md) | [< Previous](./TEMPLATE-012-erd-diagram.md)

---

# Data Flows Template

**What This Is**: A template for documenting how data moves through the system — from entry to storage to retrieval. Shows the data journey for key operations.

**How to Use**: Document data flow for each major operation identified in Design phase (system flows). Show what data enters, what transforms, and what persists.

**Why It Matters**: Data flows reveal hidden entities and relationships. They validate that the data model supports actual usage patterns.

**When to Use**: After ERD Diagram. Validates the complete data model.

**Owner**: Database Architect + Backend Lead

---

## Contents

- [Data Flow Structure](#data-flow-structure)
- [Flow Example: User Registration](#flow-example-user-registration)
- [Flow Example: Authentication](#flow-example-authentication)
- [Flow Example: Create Task](#flow-example-create-task)
- [Completion Checklist](#completion-checklist)

---

## Data Flow Structure

```markdown
## [DF-XXX] Data Flow: [Operation Name]

**Related System Flow**: SF-XXX (from Design phase)
**Related Entities**: [entities involved]

### Flow Summary
[One sentence: what this flow achieves]

### Data Entry Point
- **Source**: [User input / External API / Scheduled job]
- **Validation**: [What validates the incoming data]

### Processing Steps
1. **[Step 1]**: [What happens]
   - **Reads**: [entities accessed]
   - **Writes**: [entities modified]
2. **[Step 2]**: [What happens]
   - **Reads**: [entities accessed]
   - **Writes**: [entities modified]

### Data Storage
- **Created**: [new records]
- **Updated**: [modified records]
- **Read**: [records accessed for processing]

### Data Retrieval
- **On Success**: [what is returned to caller]
- **On Failure**: [error response]

### Validation Rules Applied
- [Validation 1]
- [Validation 2]

### Error Handling
- **[Error Case]**: [How handled]
- **[Error Case]**: [How handled]
```

---

## Flow Example: User Registration

## [DF-001] Data Flow: User Registration

**Related System Flow**: SF-001 (User Registration)
**Related Entities**: User, EmailVerification

### Flow Summary
New user registers with email/password, receives verification email, account is created pending verification.

### Data Entry Point
- **Source**: User fills registration form
- **Validation**: Email format, password strength, duplicate email check

### Processing Steps
1. **Validate Input**: Check email format, password meets requirements
   - **Reads**: User table (check duplicate email)
2. **Hash Password**: bcrypt with cost factor 12
   - **Writes**: (none, computed)
3. **Create User Record**: Insert pending user
   - **Writes**: User (status: pending)
4. **Generate Verification Token**: Random 32-byte token
   - **Writes**: EmailVerification (code, expires_at)

### Data Storage
- **Created**: 
  - User: id, email, password_hash, status='pending', created_at
  - EmailVerification: id, user_id, code_hash, expires_at

### Data Retrieval
- **On Success**: Confirmation message, verification email sent
- **On Failure**: Error message with specific issue

### Validation Rules Applied
- Email format valid (RFC 5322)
- Password minimum 8 characters
- Password contains at least one number
- Email not already registered

### Error Handling
- **Duplicate Email**: Show "email already registered"
- **Invalid Format**: Show inline validation errors
- **Email Service Down**: Log error, show generic message

---

## Flow Example: Authentication

## [DF-010] Data Flow: User Login

**Related System Flow**: SF-010 (User Login)
**Related Entities**: User, Session

### Flow Summary
User provides credentials, system validates and creates session.

### Data Entry Point
- **Source**: User enters email/password
- **Validation**: Credential validation

### Processing Steps
1. **Find User**: Lookup by email
   - **Reads**: User table
2. **Verify Password**: bcrypt compare
   - **Reads**: User.password_hash
3. **Check Status**: Ensure user is active
   - **Reads**: User.status
4. **Create Session**: Generate session token
   - **Writes**: Session (user_id, expires_at, status)

### Data Storage
- **Created**:
  - Session: id, user_id, expires_at, status='active'

### Data Retrieval
- **On Success**: Session ID, redirect to dashboard
- **On Failure**: Error "Invalid credentials"

### Validation Rules Applied
- Email exists
- Password matches hash
- User status = active

### Error Handling
- **Wrong Password**: Increment failed attempts, lock after 5
- **Inactive User**: Show appropriate error
- **Session Expired**: Clear session, prompt re-login

---

## Flow Example: Create Task

## [DF-020] Data Flow: Create Task

**Related System Flow**: SF-020 (Create Task)
**Related Entities**: Task, Project, User

### Flow Summary
User creates a task in a project, optionally assigning to another user.

### Data Entry Point
- **Source**: User fills task creation form
- **Validation**: Title required, project access verified

### Processing Steps
1. **Validate Input**: Check title present
   - **Reads**: Task validation rules
2. **Verify Permissions**: User has create access to project
   - **Reads**: Project, User roles
3. **Create Task Record**: Insert new task
   - **Writes**: Task (title, project_id, status='todo')

### Data Storage
- **Created**:
  - Task: id, title, project_id, status='todo', created_at

### Data Retrieval
- **On Success**: Task created confirmation, task details
- **On Failure**: Error message

### Validation Rules Applied
- Title not empty
- Title max 200 characters
- User has project access

### Error Handling
- **No Permission**: Show "Access denied"
- **Title Too Long**: Show truncation warning

---

## Completion Checklist

### Deliverables

- [ ] Data flows for all major operations
- [ ] Each flow traces to system flow (SF-XXX)
- [ ] Entry points documented
- [ ] Processing steps clear
- [ ] Entities read/written identified
- [ ] Validation rules applied
- [ ] Error handling documented
- [ ] Flow validated with backend team

### Sign-Off

- [ ] **Prepared by**: [Database Architect], [Date]
- [ ] **Reviewed by**: [Backend Lead], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-012-erd-diagram.md)