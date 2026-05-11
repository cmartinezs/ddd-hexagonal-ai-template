[← 00-documentation-planning/](../00-documentation-planning/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../02-requirements/README.md)

---

# Phase 1 — Discovery
## LinkSnap (URL Shortener)

> **What This Is:** Discovery phase output for the LinkSnap URL Shortener. Establishes the vision, problem context, actors, success criteria, and scope boundaries — before any requirement is written.
> **How to Use:** Read before Phase 2 (Requirements). All actors, success criteria, and scope decisions here constrain what the requirements can say.
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [Vision and Mission](#vision-and-mission)
2. [Problem Statement](#problem-statement)
3. [Actors and Personas](#actors-and-personas)
4. [Success Criteria](#success-criteria)
5. [Scope Boundaries](#scope-boundaries)
6. [Constraints](#constraints)
7. [Open Questions](#open-questions)

---

## Vision and Mission

### Vision

> *Enable anyone — anonymous or authenticated — to convert a long URL into a short, shareable link that can be followed reliably and tracked for basic usage analytics.*

### Mission

Provide a frictionless URL shortening service where a user can:
- Create a short link from any valid URL in one step
- Share that link knowing it will redirect correctly
- Optionally set a custom short code or expiry date
- See how many times the link has been followed

The service requires no account for basic use. Analytics are scoped to the creator.

---

## Problem Statement

### Context

Long URLs appear in messages, social media posts, printed materials, and presentations. They are difficult to type, visually noisy, and impossible to remember.

### Problem

Users who share long URLs face three specific problems:
1. The link is too long to include in space-constrained contexts (SMS, tweet, slide)
2. There is no way to track whether recipients actually followed the link
3. Links break when the underlying URL changes and there is no indirection layer

### Root Cause

No lightweight, self-contained tool exists that solves all three problems without requiring account registration for the basic case.

### Proposed Solution Boundary

A service that accepts a long URL, generates a short alias, stores the mapping, and redirects visitors — recording each access as a click event with timestamp.

---

## Actors and Personas

### Actor 1: Creator

| Field | Value |
|-------|-------|
| **Name** | Creator |
| **Description** | Any person who submits a long URL to create a short link |
| **Authentication** | Anonymous in v1.0 |
| **Primary goal** | Get a short link that reliably redirects to their original URL |
| **Secondary goal** | See how many times the short link has been followed |
| **Frustrations** | Long URLs, broken links, no visibility into link usage |

**Example scenarios:**
- Marketing person sharing a campaign URL on social media
- Developer sharing a documentation link in a Slack message
- Individual sharing a personal link via text message

---

### Actor 2: Visitor

| Field | Value |
|-------|-------|
| **Name** | Visitor |
| **Description** | Any person who follows a short link and expects to reach the original URL |
| **Authentication** | Anonymous (always) |
| **Primary goal** | Reach the original URL instantly without friction |
| **Frustrations** | Redirect delays, expired links returning no useful error, broken links |

**Key constraint:** The Visitor never interacts with the service beyond the redirect. No UI, no account, no tracking consent required — only timing metadata is recorded.

---

### Actor 3: Analytics Consumer

| Field | Value |
|-------|-------|
| **Name** | Analytics Consumer |
| **Description** | A Creator who returns to view click statistics for their short links |
| **Authentication** | Anonymous in v1.0 (identified by owning the link, not by account) |
| **Primary goal** | Know how many times their link was followed |
| **Frustrations** | Missing or delayed click counts, no per-day breakdown in v1.0 |

> **Note:** In v1.0, there is no authentication. The Analytics Consumer is the Creator returning to the same link's stats page, identified by possession of the short code — not by login. This is a known limitation deferred to v2.0.

---

## Success Criteria

| ID | Criterion | Measurable? | Priority |
|----|-----------|------------|---------|
| SC-001 | A Creator can produce a short link from any valid URL in ≤ 3 interactions | ✅ | Must |
| SC-002 | A Visitor is redirected to the original URL within 100 ms (p95) | ✅ | Must |
| SC-003 | A Creator can view the click count for any link they created | ✅ | Must |
| SC-004 | A Creator can set a custom short code and it takes effect immediately | ✅ | Should |
| SC-005 | A Creator can set an expiry date; expired links return a meaningful "expired" response | ✅ | Should |
| SC-006 | The service handles 1,000 concurrent redirect requests without degrading below SC-002 | ✅ | Must |

---

## Scope Boundaries

### In Scope (v1.0)

- Create short URL from any valid, absolute URL (anonymous)
- Optional custom short code (alias) on creation
- Optional expiry date on creation
- Redirect (GET short URL → 302 to original URL)
- Record click per redirect (timestamp, optional referrer)
- View click count for a given short URL

### Out of Scope (v1.0 — deferred)

| Item | Reason | Target Version |
|------|--------|---------------|
| User accounts / authentication | Increases scope significantly; not essential for core value | v2.0 |
| Per-creator analytics dashboard | Requires authentication to identify creator | v2.0 |
| QR code export | Nice to have; not core | v2.0 |
| Link editing / deletion | Requires ownership model (auth) | v2.0 |
| Bulk URL creation | Edge case; adds API complexity | v2.0 |
| Click breakdown by day/geography | Requires analytics storage schema expansion | v2.0 |
| Team/workspace management | Requires multi-tenancy | v3.0 |
| Custom domain support | Infrastructure complexity | v3.0 |

---

## Constraints

| Type | Constraint |
|------|-----------|
| **Performance** | Redirect latency: p95 ≤ 100 ms |
| **Availability** | Redirect endpoint: 99.5% uptime |
| **Scale** | 1,000 concurrent redirects without degradation |
| **Privacy** | Visitor IP must not be stored; only timestamp and referrer |
| **Simplicity** | No auth in v1.0 — must work for anonymous creators |

---

## Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-001 | Should anonymous creators be rate-limited to prevent spam? | Product | Deferred to v2.0 |
| OQ-002 | What happens to short links after the creator has no way to manage them? | Product | Accepted: in v1.0, links are permanent unless expired |
| OQ-003 | Should the redirect be 301 (permanent) or 302 (temporary) by default? | Engineering | Resolved: 302 (preserves ability to change target in future) |

---

[← 00-documentation-planning/](../00-documentation-planning/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../02-requirements/README.md)
