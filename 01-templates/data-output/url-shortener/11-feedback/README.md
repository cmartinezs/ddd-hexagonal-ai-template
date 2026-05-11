[← 10-monitoring/](../10-monitoring/README.md) | [← url-shortener/README.md](../README.md)

---

# Phase 11 — Feedback
## LinkSnap (URL Shortener)

> **What This Is:** Feedback phase output for LinkSnap v1.0. Captures user feedback channels, v1.0 retrospective, lessons learned from the documentation cycle, and the backlog items surfaced for v1.1 and v2.0.
> **How to Use:** Read after Phase 10 (Monitoring). The backlog items produced here feed directly into the next planning cycle (v1.1 / v2.0).
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [User Feedback Channels](#user-feedback-channels)
2. [v1.0 Release Retrospective](#v10-release-retrospective)
3. [Lessons Learned — Documentation Cycle](#lessons-learned--documentation-cycle)
4. [Feedback-to-Backlog Cycle](#feedback-to-backlog-cycle)
5. [Backlog Items for Next Cycle](#backlog-items-for-next-cycle)

---

## User Feedback Channels

### Active Channels (v1.0)

| Channel | Audience | Mechanism | Owner |
|---------|----------|-----------|-------|
| In-app feedback button | Creator (anonymous) | Opens GitHub Discussions thread | Engineer |
| GitHub Issues | Technical users | Public issue tracker (`bug`, `enhancement` labels) | Engineer |
| Monitoring alerts | Internal | Auto-created from P1/P2 alerts (Phase 10) | On-call |
| `#linksnap-feedback` Slack | Internal team | Manual capture from user reports | Product |

### Feedback Triage Cadence

| Frequency | Activity |
|-----------|----------|
| Weekly | Review new GitHub Issues; label and assign |
| Bi-weekly | Review Slack channel backlog |
| Monthly | Full feedback synthesis; update backlog priority |

---

## v1.0 Release Retrospective

> Format: Start / Stop / Continue. Conducted after M-004 is complete and v1.0.0 is in production.

### What Went Well

| Item | Impact |
|------|--------|
| Single aggregate (`ShortURL`) kept the domain model clean and fast to implement | Phase 3 → Phase 6 mapping was direct with no design rework |
| Explicit agnostic/specific boundary (Phases 0–5 vs 6–11) prevented premature tech decisions | Requirements and design were not polluted by implementation details |
| GitHub Flow + squash merge → linear `main` history | Release tracing and rollbacks were straightforward |
| 25 unit tests with no infrastructure dependency | CI suite ran in < 5 s; developer feedback loop was fast |
| Privacy invariant (no Visitor IP) decided in Phase 2 (NFR-004) | Not a last-minute concern; testing and logging both enforced it from day one |

### What Didn't Go Well

| Item | Root Cause | Action |
|------|-----------|--------|
| Click count query (`COUNT(*)`) caused DB pressure under load test | Derived value not cached; identified only in Phase 7 k6 test | Add Redis cache or materialized view in v1.1 |
| No distributed tracing in v1.0 | Deferred as "optional" in Phase 10 gap table | Add OpenTelemetry before v2.0 launch |
| Stats endpoint latency was 3× higher than redirect under load | Shared DB connection pool; `COUNT(*)` blocks other queries | Connection pool tuning + caching in v1.1 |

### What We'd Do Differently Next Time

| Item | Change |
|------|--------|
| Define DB index strategy in Phase 4 (Data Model) | Explicitly specify required indexes when defining entity structure |
| Add performance test in Phase 7 earlier in the cycle | k6 test found the click count problem late; run it in CI on staging after M-001 |
| Define observability requirements in Phase 2 (NFR) | "Structured JSON logging" and "tracing" should be NFRs, not discovered in Phase 10 |

---

## Lessons Learned — Documentation Cycle

> These apply to the documentation framework itself, not just LinkSnap.

| Lesson | Detail |
|--------|--------|
| **Agnostic boundary is the highest-value rule** | Every time we deferred a tech decision to Phase 6, Phase 3 and 4 became easier to change. Teams that name databases in Phase 3 end up rewriting the data model when they switch. |
| **Traceability pays off in Phase 7** | Every test case in Phase 7 could be directly linked to an FR or INV. This made coverage gaps immediately visible — no FR was left untested. |
| **ADRs prevent revisiting decisions** | ADR-002 (PostgreSQL) was cited in Phase 7 (IT-004 uniqueness test) and Phase 9 (RB-002 runbook). Without it, the reasoning would have been lost. |
| **Domain events catch missing flows** | Defining `ShortUrlExpired` as a domain event in Phase 3 forced us to trace it through Phase 7 (E2E-009) and Phase 9 (RB-001 step 7). It would have been missed otherwise. |
| **Operations and monitoring before launch, not after** | Phases 9–10 were written before any production traffic. As a result, RB-001..004 were tested in staging, not discovered during incidents. |

---

## Feedback-to-Backlog Cycle

```mermaid
flowchart LR
    FB[User feedback\n/ monitoring] --> TRIAGE[Weekly triage\nGitHub Issues + Slack]
    TRIAGE --> CAT{Category}
    CAT -->|Bug| BUG[P1/P2/P3 issue\nfix/* branch]
    CAT -->|Enhancement| ENH[Backlog item\nfor next planning cycle]
    CAT -->|Performance| PERF[Monitoring threshold\nadjustment + fix/*]
    ENH --> PLAN[Planning cycle\nvX.Y.0]
    BUG --> HOTFIX[Hotfix tag\nvX.Y.{PATCH}]
```

---

## Backlog Items for Next Cycle

### v1.1 — Operations & Performance

| ID | Item | Source | Priority |
|----|------|--------|---------|
| BL-001 | Cache `click_count` in Redis or via PostgreSQL materialized view | k6 load test + retro | High |
| BL-002 | Add OpenTelemetry distributed tracing | Phase 10 gap table | High |
| BL-003 | External uptime check (Better Uptime or equivalent) | Phase 10 gap table | Medium |
| BL-004 | Explicit DB index strategy documented in Phase 4 (retrospective action) | Retro | Medium |
| BL-005 | Connection pool tuning guide in Phase 9 runbooks | Retro + load test | Medium |

### v2.0 — Authenticated Creators

| ID | Item | Source | Priority |
|----|------|--------|---------|
| BL-006 | Identity bounded context — user accounts, login, token-based auth | Phase 5 Epic E-04 | Must |
| BL-007 | Creator dashboard: view and manage own short URLs | User feedback (simulated) | Must |
| BL-008 | Link editing: allow Creators to update `originalUrl` of a ShortURL they own | User feedback | Should |
| BL-009 | Link deletion: allow Creators to deactivate a ShortURL | User feedback | Should |
| BL-010 | QR code export for each short URL | User feedback — simulated feature request | Could |
| BL-011 | Click breakdown: referrer, user-agent, date grouping (no IP — NFR-004 preserved) | Analytics Consumer feedback | Could |

### Traceability

| Backlog Item | Phase 5 Epic | Milestone Target |
|-------------|-------------|-----------------|
| BL-001..005 | E-01 / E-03 (operations improvements) | v1.1.0 |
| BL-006..009 | E-04 (authenticated creators) | v2.0.0 |
| BL-010..011 | New epic (to be defined in v2.0 planning) | v2.0.0 |

---

[↑ Back to top](#phase-11--feedback)

---

[← 10-monitoring/](../10-monitoring/README.md) | [← url-shortener/README.md](../README.md)
