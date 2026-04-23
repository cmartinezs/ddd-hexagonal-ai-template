[← Index](./README.md] | [< Anterior](./TEMPLATE-028-test-strategy.md) | [Siguiente >](./TEMPLATE-030-security-testing.md)

---

# Test Plan

Detailed test cases and scenarios for validating system functionality.

## Contents

1. [Test Case Structure](#test-case-structure)
2. [Test Categories](#test-categories)
3. [Test Case Examples](#test-case-examples)
4. [Test Data Requirements](#test-data-requirements)

---

## Test Case Structure

### Template

```markdown
## TC-[ID]: Test Case Title

**Feature**: [Related Feature]
**Priority**: P0 (Critical) / P1 (High) / P2 (Medium) / P3 (Low)
**Type**: Functional / Integration / E2E

### Preconditions
- [ ] Precondition 1
- [ ] Precondition 2

### Test Steps
1. Step 1
2. Step 2
3. Step 3

### Expected Result
Expected outcome

### Variations
- **Variation 1**: Alternative scenario
- **Variation 2**: Edge case
```

---

## Test Categories

### Authentication Tests
| Category | Examples |
|----------|----------|
| Registration | Valid input, invalid email, duplicate email, password requirements |
| Login | Valid credentials, invalid credentials, MFA required |
| Password Reset | Valid email, invalid email, expired token |

### API Tests
| Category | Examples |
|----------|----------|
| CRUD Operations | Create, read, update, delete resources |
| Authorization | Authorized access, unauthorized access |
| Validation | Required fields, format validation, limits |

### Integration Tests
| Category | Examples |
|----------|----------|
| Database | Save, retrieve, update, delete |
| External Services | API calls, webhooks |
| Events | Event publishing, event handling |

---

## Test Case Examples

### Example: User Registration

## TC-AUTH-001: Register with Valid Email

**Feature**: User Registration
**Priority**: P0
**Type**: Functional

### Preconditions
- [ ] User is not authenticated
- [ ] Email is not registered

### Test Steps
1. Navigate to registration page
2. Enter valid email: `user@example.com`
3. Enter valid password: `SecurePass123`
4. Confirm password: `SecurePass123`
5. Click "Create Account"

### Expected Result
- [ ] User account created
- [ ] Verification email sent
- [ ] Redirect to verification page

### Variations
- **TC-AUTH-002**: Invalid email format → Show validation error
- **TC-AUTH-003**: Duplicate email → Show "email exists" error
- **TC-AUTH-004**: Weak password → Show password requirements

---

### Example: Login Flow

## TC-AUTH-010: Login with Valid Credentials

**Feature**: User Login
**Priority**: P0
**Type**: Functional

### Preconditions
- [ ] User exists with verified email
- [ ] Password is known

### Test Steps
1. Navigate to login page
2. Enter email: `user@example.com`
3. Enter password: `SecurePass123`
4. Click "Login"

### Expected Result
- [ ] User authenticated
- [ ] Redirect to dashboard
- [ ] Session created

### Variations
- **TC-AUTH-011**: Wrong password → Show error, don't authenticate
- **TC-AUTH-012**: Unverified email → Show verification required
- **TC-AUTH-013**: MFA enabled → Show MFA challenge

---

### Example: API Endpoint

## TC-API-001: Create Organization

**Feature**: Organization Management
**Priority**: P0
**Type**: Integration

### Preconditions
- [ ] User is authenticated
- [ ] User has admin role

### Test Steps
1. Send POST to `/api/v1/organizations`
2. Body: `{ "name": "Test Org" }`

### Expected Result
- [ ] Status 201 Created
- [ ] Response contains organization ID
- [ ] Organization saved in database

### Variations
- **TC-API-002**: No auth → Status 401
- **TC-API-003**: No admin role → Status 403
- **TC-API-004**: Empty name → Status 400

---

### Example: Database Integration

## TC-DB-001: Save and Retrieve User

**Feature**: User Repository
**Priority**: P1
**Type**: Integration

### Preconditions
- [ ] Database is running
- [ ] Test user data available

### Test Steps
1. Create user in database
2. Query user by ID
3. Verify data matches

### Expected Result
- [ ] User saved correctly
- [ ] User retrieved correctly
- [ ] All fields match

---

## Test Data Requirements

### Test Data Strategy
| Approach | Use Case |
|----------|----------|
| **Fixtures** | Static test data |
| **Factories** | Dynamic test data generation |
| **Seeding** | Database setup |
| **Mocking** | External services |

### Test Data Principles
- Tests should be independent
- Tests should be repeatable
- Tests should use realistic data
- Sensitive data should be masked

---

## Test Execution

### Execution Order
1. Unit tests (on save)
2. Integration tests (on PR)
3. E2E tests (before release)
4. Performance tests (before release)

### Reporting
- Test results in CI/CD
- Coverage reports
- Flaky test tracking

---

## Completion Checklist

### Deliverables

- [ ] Test cases for all features
- [ ] Test cases cover happy path
- [ ] Test cases cover error cases
- [ ] Test cases cover edge cases
- [ ] Test data defined

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [QA Lead, Date]
- [ ] Approved by: [Product Manager, Date]

---

## Tips

1. **Test happy path first**: Critical flows must work
2. **Cover errors**: What happens when things go wrong?
3. **Test boundaries**: Empty, max, min values
4. **Keep tests focused**: One assertion per test
5. **Name clearly**: TC-[feature]-[number]

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-028-test-strategy.md) | [Siguiente >](./TEMPLATE-030-security-testing.md)
