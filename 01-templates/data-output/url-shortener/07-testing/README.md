[← 06-development/](../06-development/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../08-deployment/README.md)

---

# Phase 7 — Testing
## LinkSnap (URL Shortener)

> **What This Is:** Test strategy and test plan for the LinkSnap URL Shortener. Maps requirements from Phase 2 to test types, defines coverage targets, and specifies test cases for the core domain logic and API.
> **How to Use:** Read after Phase 6 (Development). Test cases reference FRs, NFRs, and invariants established in Phases 2–4.
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [Test Strategy](#test-strategy)
2. [Test Pyramid](#test-pyramid)
3. [Unit Tests — Domain Layer](#unit-tests--domain-layer)
4. [Integration Tests — Adapters](#integration-tests--adapters)
5. [End-to-End Tests — API](#end-to-end-tests--api)
6. [Performance Tests](#performance-tests)
7. [Coverage Targets](#coverage-targets)
8. [Done Criteria per Type](#done-criteria-per-type)

---

## Test Strategy

### Principles

| Principle | Detail |
|-----------|--------|
| **Test at the right level** | Domain logic → unit tests; adapter correctness → integration tests; user-facing flows → E2E tests |
| **Traceability** | Every FR and INV maps to ≥1 test case |
| **No test DB in unit tests** | Unit tests use in-memory fakes; only integration tests hit a real database |
| **Privacy by test design** | No Visitor IP is ever present in test fixtures (enforces NFR-004) |
| **Fast feedback** | Unit suite target: < 5 s; integration suite target: < 30 s |

### Tools

| Role | Tool |
|------|------|
| Test runner | **Vitest 1.x** |
| Assertion library | Vitest built-in (`expect`) |
| HTTP testing | **Supertest** |
| Test database | PostgreSQL (Docker Compose service) |
| Performance | **k6** |
| Coverage reporter | Vitest `v8` provider |

---

## Test Pyramid

```mermaid
pyramid
```

```
          ┌──────────────────┐
          │    E2E Tests      │  ~10 cases
          │  (Supertest/API) │
          └────────┬─────────┘
          ┌────────▼─────────┐
          │ Integration Tests │  ~20 cases
          │  (Adapters / DB) │
          └────────┬─────────┘
          ┌────────▼─────────┐
          │   Unit Tests      │  ~60+ cases
          │  (Domain layer)  │
          └──────────────────┘
```

---

## Unit Tests — Domain Layer

### ShortUrl Aggregate — Construction

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| UT-001 | Create with valid URL, no alias, no expiry | `ShortUrl` object returned, code is 6-char alphanumeric | FR-001 |
| UT-002 | Create with valid URL + custom alias | `alias` property set correctly | FR-004 |
| UT-003 | Create with future expiry date | `expiresAt` property set correctly | FR-005 |
| UT-004 | Create with past expiry date | `DomainError("expiry_in_past")` thrown | INV-003 |
| UT-005 | Create with empty `originalUrl` | `DomainError("invalid_url")` thrown | INV-004 |
| UT-006 | Create with malformed URL (no protocol) | `DomainError("invalid_url")` thrown | INV-004 |
| UT-007 | `isExpired()` returns false when no expiry | `false` | INV-005 |
| UT-008 | `isExpired()` returns false when expiry is future | `false` | INV-005 |
| UT-009 | `isExpired()` returns true when expiry is past | `true` | INV-005 |
| UT-010 | ShortCode uniqueness invariant enforced at construction | Two independently created codes are not equal (statistical) | INV-001 |

### ShortUrl Aggregate — Click Recording

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| UT-011 | `recordClick()` creates Click with timestamp | Click object has `occurredAt` set | FR-002 |
| UT-012 | `recordClick()` creates Click with no IP field | Click object has no `visitorIp` property | NFR-004 |
| UT-013 | Click has optional referrer and userAgent | Properties set when provided, undefined when absent | FR-002 |
| UT-014 | Click is immutable after creation | No setter methods on Click | INV-006 |

### Redirect Domain Service

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| UT-015 | Redirect valid, non-expired link | Returns `originalUrl`; raises `VisitorRedirected` event | FR-002 |
| UT-016 | Redirect expired link | Raises `ShortUrlExpired` event; throws `DomainError("link_expired")` | FR-002, INV-005 |

### ShortCodeGenerator Domain Service

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| UT-017 | Generated code is 6 characters | `code.length === 6` | FR-001 |
| UT-018 | Generated code is alphanumeric only | Matches `/^[a-zA-Z0-9]{6}$/` | FR-001 |
| UT-019 | 1000 generated codes have no duplicates | Set size equals 1000 | INV-001 |

### Value Object Invariants

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| UT-020 | `OriginalUrl` rejects ftp:// scheme | `DomainError` | INV-004 |
| UT-021 | `OriginalUrl` accepts https:// URL | Object created | INV-004 |
| UT-022 | `Alias` rejects blank string | `DomainError` | INV-002 |
| UT-023 | `Alias` rejects string with spaces | `DomainError` | INV-002 |
| UT-024 | `Alias` accepts alphanumeric-dash string | Object created | INV-002 |
| UT-025 | `ShortCode` equality: same value → equal | `code1.equals(code2) === true` | INV-001 |

---

## Integration Tests — Adapters

### PgShortUrlRepository

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| IT-001 | Save and find by code | Returned object matches saved | FR-001 |
| IT-002 | Find by alias | Returns correct ShortUrl | FR-004 |
| IT-003 | Find non-existent code | Returns `null` | FR-002 |
| IT-004 | Save duplicate `short_code` | DB throws unique constraint error | INV-001 |
| IT-005 | Save duplicate `alias` | DB throws unique constraint error | INV-002 |
| IT-006 | `expiresAt` is stored and returned as UTC date | No timezone drift | FR-005 |

### PgClickRepository

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| IT-007 | Save click and count | `countByCode` returns 1 | FR-003 |
| IT-008 | Count returns 0 for URL with no clicks | 0 | FR-003 |
| IT-009 | Saved click has no `visitor_ip` column | Column does not exist in schema | NFR-004 |

### RandomShortCodeGenerator

| Test ID | Scenario | Expected | FR / INV |
|---------|----------|----------|---------|
| IT-010 | 10,000 generated codes via real `crypto` | Collision rate = 0 | INV-001 |

---

## End-to-End Tests — API

### `POST /urls`

| Test ID | Scenario | Expected Status | Notes |
|---------|----------|----------------|-------|
| E2E-001 | Create URL, no alias, no expiry | `201` + `shortCode` in body | FR-001 |
| E2E-002 | Create URL with valid alias | `201` + `shortCode === alias` | FR-004 |
| E2E-003 | Create URL with future expiry | `201` | FR-005 |
| E2E-004 | Create URL with past expiry | `422` + `expiry_in_past` | INV-003 |
| E2E-005 | Create URL with invalid `originalUrl` | `422` + `invalid_url` | INV-004 |
| E2E-006 | Create URL with duplicate alias | `409` + `alias_taken` | INV-002 |

### `GET /{code}`

| Test ID | Scenario | Expected Status | Notes |
|---------|----------|----------------|-------|
| E2E-007 | Redirect valid, non-expired code | `302` + `Location` header | FR-002 |
| E2E-008 | Redirect unknown code | `404` | FR-002 |
| E2E-009 | Redirect expired code | `410` | FR-005, INV-005 |
| E2E-010 | Redirect increments click count | Subsequent stats call returns +1 | FR-002 + FR-003 |

### `GET /urls/{code}/stats`

| Test ID | Scenario | Expected Status | Notes |
|---------|----------|----------------|-------|
| E2E-011 | Stats for valid code with clicks | `200` + `clickCount > 0` | FR-003 |
| E2E-012 | Stats for valid code, no clicks | `200` + `clickCount: 0` | FR-003 |
| E2E-013 | Stats for unknown code | `404` | FR-003 |

---

## Performance Tests

> Tool: **k6**. Run against staging environment before v1.0 release.

### Redirect Latency (NFR-001)

```javascript
// k6 script excerpt
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<100'], // NFR-001: redirect < 100ms at p95
  },
  scenarios: {
    redirect: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 50 },
        { duration: '60s', target: 100 }, // NFR-002: sustain 100 RPS
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function () {
  http.get(`${BASE_URL}/abc123`); // pre-seeded short URL
}
```

| Threshold | Target | NFR |
|-----------|--------|-----|
| `p(95) < 100ms` | Redirect endpoint | NFR-001 |
| `error_rate < 0.1%` | All endpoints | NFR-003 |
| Sustain 100 RPS for 60 s | Redirect endpoint | NFR-002 |

---

## Coverage Targets

| Layer | Metric | Target |
|-------|--------|--------|
| Domain layer (unit) | Line coverage | ≥ 95% |
| Application use cases (unit) | Line coverage | ≥ 90% |
| Outbound adapters (integration) | Tested scenarios | 100% of interface methods |
| API endpoints (E2E) | Happy path per FR | 100% |
| API endpoints (E2E) | Error paths (4xx) | ≥ 80% |

---

## Done Criteria per Type

| Type | Done When |
|------|----------|
| **Unit** | All UT-001..UT-025 pass; no skipped tests; coverage target met |
| **Integration** | All IT-001..IT-010 pass against a live test DB; DB is clean before each test |
| **E2E** | All E2E-001..E2E-013 pass against running staging-equivalent API server |
| **Performance** | k6 thresholds pass in a sustained 60-second run at 100 VUs |

---

[↑ Back to top](#phase-7--testing)

---

[← 06-development/](../06-development/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../08-deployment/README.md)
