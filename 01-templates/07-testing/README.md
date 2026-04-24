# Phase 7: Testing

You are a QA lead or engineer responsible for establishing how the system will be tested. This phase defines the testing strategy, creates test plans, and sets quality gates that ensure code reliability before deployment.

## Purpose

**What This Is**: The phase where you define how testing will be performed across the system—what to test, how much coverage to target, what tools to use, and when code is ready to ship

**How to Use**: Start with test strategy (pyramid, coverage targets, tools). Then create test plans and test cases. Integrate testing into CI/CD. Use this to guide all test writing in Phase 7+

**Why It Matters**: Without clear testing strategy, teams under-test, write flaky tests, and ship bugs. Clear strategy prevents quality from degrading and ensures consistent coverage

**When to Complete**: Parallel with or immediately after Development specs (Phase 6). Before Phase 8 (Deployment)

**Owner**: QA Lead / QA Engineer

> **Note**: This is a template. Adapt to your project scope, languages, and frameworks.

## What This Phase Produces

| Deliverable | Description | Time to Complete |
|-------------|-------------|-----------------|
| [TEMPLATE-test-strategy.md](./TEMPLATE-test-strategy.md) | Testing pyramid, coverage targets, tools | 2-3 hours |
| [TEMPLATE-unit-tests.md](./TEMPLATE-unit-tests.md) | Unit test patterns, naming conventions | 2-3 hours |
| [TEMPLATE-integration-tests.md](./TEMPLATE-integration-tests.md) | Integration test patterns | 2-3 hours |
| [TEMPLATE-test-plan.md](./TEMPLATE-test-plan.md) | Test cases and scenarios | 3-4 hours |

## Key Objectives

- [ ] Define test strategy (unit, integration, e2e targets)
- [ ] Create test plans and test cases
- [ ] Set coverage targets and metrics

## Testing Pyramid

**What This Section Is**: The proven structure for distributing testing effort. The pyramid shows that more tests should be at the unit level (fast, cheap) and fewer at the E2E level (slow, expensive).

```
         ┌───────┐
         │  UAT │  ← User validation
         └───┬───┘
       ┌─────┴─────┐
       │   Smoke   │  ← Post-deploy
       └─────┬─────┘
    ┌────────┴────────┐
    │  Integration    │  ← Real DB, components
    └────────┬────────┘
   ┌──────────┴──────────┐
   │     Unit Tests      │  ← Domain logic
   └─────────────────────┘
```

## Distribution

| Level | Proportion | Speed |
|-------|------------|-------|
| Unit | 60% | Milliseconds |
| Integration | 30% | Seconds |
| Smoke/UAT | 10% | Minutes |

## Coverage Targets

| Layer | Target |
|-------|--------|
| Domain (Value Objects) | 90%+ |
| Use Cases | 80%+ |
| Controllers | 70%+ |

## Test Types

| Type | Description |
|------|-------------|
| **Unit** | Domain logic, framework-agnostic |
| **Integration** | Component collaboration |
| **E2E** | Full user workflows |
| **Security** | Auth, authorization |
| **Performance** | Load, stress |

## Tools by Language

| Language | Unit | Integration | E2E |
|----------|------|------------|-----|
| Java | JUnit + AssertJ + Mockito | Testcontainers | Playwright |
| JavaScript/TypeScript | Jest | React Testing Library | Playwright |
| Python | pytest | pytest + database | Playwright |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-test-strategy.md` — Overall strategy
- `TEMPLATE-unit-tests.md` — Unit test template
- `TEMPLATE-integration-tests.md` — Integration test template
- `TEMPLATE-test-plan.md` — Test plan template

---

**Definition of Done**:
- Test strategy approved
- Test cases documented
- Coverage targets set
