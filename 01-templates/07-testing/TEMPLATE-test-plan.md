[← Index ./README.md)

---

# Test Plan Template

## Purpose

Template for detailed test cases and scenarios.

---

## Test Case Format

```markdown
## TC-XXX: Test Case Title

### Preconditions
- User logged in
- User has role ADMIN

### Test Steps
1. Navigate to /admin/users
2. Click "Create User"
3. Fill form: email, name
4. Click "Save"

### Expected Result
- User created successfully
- Redirect to user list
- New user visible in table

### Variations
- TC-XXX-1: Email already exists → show error
- TC-XXX-2: Name empty → validation error
```

---

## Test Case Categories

| Category | Description |
|----------|-------------|
| Functional | Core features |
| Security | Auth, authorization |
| UI/UX | Visual, accessibility |
| Performance | Load, response time |
| Regression | Bug fixes |

---

## Example: Authentication Tests

| ID | Title | Precondition | Steps | Expected |
|----|-------|-------------|-------|---------|
| AUTH-001 | Login success | None | Enter valid credentials | Redirect to dashboard |
| AUTH-002 | Login invalid | None | Enter invalid credentials | Show error message |
| AUTH-003 | Login locked | 3 failures | Attempt 4th login | Account locked 30 min |

---

## Coverage Matrix

| Feature | Unit | Integration | E2E |
|---------|------|------------|-----|
| Auth | ✅ | ✅ | ✅ |
| Users CRUD | ✅ | ✅ | ✅ |
| Billing | ✅ | ✅ | ✅ |
| API | - | ✅ | ✅ |

---

[← Index ./README.md)