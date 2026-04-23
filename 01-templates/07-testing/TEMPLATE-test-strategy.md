[← Index ./README.md)

---

# Test Strategy

## Purpose

Overall testing approach and pyramid for the project.

> **Note**: This is a template. Customize to your project scope.

---

## Testing Philosophy

Quality is team's responsibility, not QA's at the end.

**Core Principles:**
1. **Unit tests** — Framework-agnostic, fast
2. **Integration tests** — Real infrastructure
3. **Bug fix = regression test**

---

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

---

## Test Types

| Type | What | Tools |
|------|------|-------|
| **Unit** | Domain logic in isolation | JUnit, Jest |
| **Integration** | Component collaboration | Testcontainers, React Testing Library |
| **E2E** | Full user workflows | Playwright, Cypress |
| **Security** | Auth, injection | Manual + automated |
| **Performance** | Load, stress | k6, JMeter |

---

## Coverage Targets

| Layer | Target |
|-------|--------|
| Domain (Value Objects) | 90%+ |
| Use Cases | 80%+ |
| Controllers | 70%+ |
| Frontend | 70%+ |

---

## Tools by Language

| Language | Unit | Integration | E2E |
|----------|------|------------|-----|
| Java | JUnit + AssertJ + Mockito | Testcontainers | Playwright |
| JavaScript/TypeScript | Jest | React Testing Library | Playwright |
| Python | pytest | pytest + database | Playwright |

---

[← Index ./README.md)