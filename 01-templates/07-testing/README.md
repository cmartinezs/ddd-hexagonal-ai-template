# Phase 7: Testing

## Purpose

This phase defines testing strategy, test plans, and quality verification.

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
