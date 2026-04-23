[← UI Index](./README.md)

---

# Screen Inventory Template

**What This Is**: A map of all screens in the product — which screens exist, how users navigate, and what users can do on each.

**How to Use**: Document every screen with its purpose, requirements it satisfies, navigation paths, and key elements.

**When to Use**: Products with user interface.

**Owner**: UX Designer + Product Manager

---

## Screen Template

```markdown
## [SCREEN-XXX] Screen Name

**Purpose**: What this screen enables user to do
**Related Requirement**: FR-XXX
**Portal**: [Public / Admin / User]

### Navigation
- **How to get here**: [Path or action]
- **Where can go next**: [Other screens accessible]

### Key Elements
- **[Element 1]**: [Description]
- **[Element 2]**: [Description]

### User Actions
- **[Action 1]**: [What happens]
- **[Action 2]**: [What happens]
```

---

## Screen Example

### SCREEN-001 Login

**Purpose**: Authenticate user and start session
**Related Requirement**: FR-002 (User Login)
**Portal**: Public

### Navigation
- **How to get here**: Direct URL or from any authenticated page (redirected to login)
- **Where can go next**: Dashboard (on success), Forgot Password, Register

### Key Elements
- **Email input**: User's email address
- **Password input**: User's password
- **Login button**: Submit credentials
- **Remember me checkbox**: Stay logged in

### User Actions
- **Login**: Verify credentials, create session, redirect to dashboard
- **Forgot password**: Navigate to password reset flow
- **Register**: Navigate to registration flow

---

## Portal Organization

### Public Portal (Unauthenticated)

| Screen | Requirement |
|--------|-------------|
| Login | FR-002 |
| Register | FR-001 |
| Forgot Password | FR-003 |
| Reset Password | FR-003 |

### User Portal (Authenticated)

| Screen | Requirement |
|--------|-------------|
| Dashboard | FR-010 |
| Profile | FR-011 |
| Settings | FR-012 |

### Admin Portal

| Screen | Requirement |
|--------|-------------|
| User Management | FR-020 |
| Role Management | FR-021 |
| Audit Logs | FR-030 |

---

## Completion Checklist

- [ ] All screens documented
- [ ] Each screen traces to requirement
- [ ] Navigation paths clear
- [ ] Portal organization defined

---

[← UI Index](./README.md)