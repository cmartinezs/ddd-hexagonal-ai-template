[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-029-test-plan.md)

---

# Test Strategy

You are a QA lead or tech lead responsible for defining how testing will be approached across the system. This template helps you establish quality targets, test distribution, tooling, and quality gates that ensure consistent code quality.

**What This Is**: A document that defines the overall testing philosophy, test pyramid structure, coverage targets, and quality gates for the entire system

**How to Use**: Establish your test pyramid distribution (unit, integration, E2E %), set coverage targets by layer, define tools/frameworks, integrate with CI/CD. Reference this in all testing conversations

**Why It Matters**: Without a clear testing strategy, teams under-test, write flaky tests, and ship bugs. Clear strategy prevents quality from degrading over time

**When to Use**: Before writing any tests in Phase 7. Should align with Development phase specs

**Owner**: QA Lead / Tech Lead

## Contents

1. [Test Pyramid](#test-pyramid)
2. [Test Types](#test-types)
3. [Coverage Targets](#coverage-targets)
4. [Tools and Frameworks](#tools-and-frameworks)
5. [CI/CD Integration](#cicd-integration)
6. [Quality Gates](#quality-gates)

---

## Test Pyramid

**What This Section Is**: The fundamental structure for how to distribute testing effort across different test types. The pyramid shows that more tests should be at the unit level (fast, cheap) and fewer at the E2E level (slow, expensive).

The test pyramid is a proven pattern for balancing testing efficiency and comprehensiveness:

### Pyramid Structure

```
                    ┌─────────────┐
                    │     E2E     │  ← 10% (Critical user journeys)
                    │    Tests    │
          ┌─────────┴─────────────┴─────────┐
          │       Integration Tests          │  ← 20% (Component interactions)
          │         (API, DB)               │
    ┌─────┴───────────────────────────────┴─────┐
    │            Unit Tests                     │  ← 70% (Business logic)
    │         (Functions, Classes)             │
    └──────────────────────────────────────────┘
```

### Test Distribution

| Level | Percentage | Focus | Execution Time |
|-------|------------|-------|----------------|
| **Unit** | 70% | Functions, classes | < 1 minute |
| **Integration** | 20% | API, DB, cache | < 5 minutes |
| **E2E** | 10% | Critical flows | < 30 minutes |

---

## Test Types

**What This Section Is**: The different categories of tests your team should write, with examples and tools for each. Understanding these distinctions helps you choose the right test for each situation.

Use this section to guide test writing decisions:

### Functional Testing
| Type | Description | Tools |
|------|-------------|-------|
| Unit | Test individual functions | Jest, pytest, Go test |
| Integration | Test component interactions | Supertest, Postman |
| E2E | Test complete user flows | Playwright, Cypress |

### Non-Functional Testing
| Type | Description | Tools |
|------|-------------|-------|
| Performance | Load, stress, spike | k6, JMeter |
| Security | Penetration, vulnerability | OWASP ZAP, Burp |
| Accessibility | WCAG compliance | axe, Lighthouse |

### Regression Testing
- Run on every PR
- Full suite on release
- Automated vs manual balance

---

## Coverage Targets

**What This Section Is**: The code coverage percentages your team must achieve in different parts of the system. Coverage targets vary by layer because some code is more critical than others.

Define and enforce these coverage minimums:

### Code Coverage

| Layer | Target | Minimum |
|-------|--------|---------|
| **Domain** | 90% | 85% |
| **Application** | 85% | 80% |
| **Adapters** | 70% | 60% |
| **Overall** | 80% | 75% |

### Test Coverage Matrix

| Feature | Unit | Integration | E2E |
|---------|------|-------------|-----|
| Authentication | ✓ | ✓ | ✓ |
| Authorization | ✓ | ✓ | ✓ |
| API Endpoints | ✓ | ✓ | - |
| Database | - | ✓ | - |
| External Services | - | ✓ | - |

---

## Tools and Frameworks

### Recommended Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Unit** | Jest / Go test / pytest | Unit testing |
| **Integration** | Supertest / Postman | API testing |
| **E2E** | Playwright / Cypress | Browser automation |
| **Mocking** | WireMock / Mockery | External dependencies |
| **Coverage** | Istanbul / Coverage | Code coverage |
| **Performance** | k6 / JMeter | Load testing |

### Test Data Management
- Fixtures for repeatable tests
- Factories for complex objects
- Database seeding for integration tests

---

## CI/CD Integration

### Pipeline Stages

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Build  │──►│  Unit   │──►│Integrate│──►│   E2E   │
│         │   │  Tests  │   │  Tests  │   │  Tests  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
     │             │             │             │
     ▼             ▼             ▼             ▼
  Compile      Coverage      Deploy to     Deploy to
                >80%         Staging       Production
```

### Quality Gates

| Gate | Criteria | Action |
|------|----------|--------|
| **Unit Tests** | Pass, >80% coverage | Block merge |
| **Integration** | Pass | Block merge |
| **E2E** | Pass | Block release |
| **Security** | No critical findings | Block release |
| **Performance** | Within thresholds | Warn |

---

## Quality Gates

### Pre-Merge Gates
- [ ] All unit tests passing
- [ ] Coverage > 80%
- [ ] No linting errors
- [ ] Security scan clean

### Pre-Release Gates
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Performance within thresholds
- [ ] Security audit passed

### Production Gates
- [ ] Smoke tests pass
- [ ] Rollback procedure documented
- [ ] Monitoring alerts configured

---

## Example Strategy

### Example: Authentication Platform

# Test Strategy: Keygo

### Test Pyramid
- Unit: 70% - Domain logic, services
- Integration: 20% - API endpoints, database
- E2E: 10% - Login, registration, MFA flows

### Coverage Targets
- Domain: 90%
- Application: 85%
- Overall: 80%

### Quality Gates
- Unit tests must pass before merge
- Integration tests must pass before staging
- E2E tests must pass before production

---

## Paso a Paso

1. **Define pyramid**: Unit/Integration/E2E distribution
2. **Set coverage targets**: By layer and overall
3. **Select tools**: Frameworks and libraries
4. **Integrate with CI/CD**: Automated pipeline
5. **Define quality gates**: Pass/fail criteria
6. **Document strategy**: Team reference

---

## Completion Checklist

### Deliverables

- [ ] Test pyramid defined
- [ ] Test types documented
- [ ] Coverage targets set
- [ ] Tools selected
- [ ] CI/CD integration defined
- [ ] Quality gates established

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [QA Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Start with unit tests**: Fastest feedback
2. **Aim for pyramid**: More unit, less E2E
3. **Automate everything**: Manual testing is slow
4. **Set realistic targets**: Coverage isn't everything
5. **Integrate early**: Tests in CI from day one

---

[← Index](./README.md] | [< Previous] | [Next >](./TEMPLATE-029-test-plan.md)
