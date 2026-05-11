[← data-output/README.md](../README.md) | [← Tutorial Guide](../../00-guides-and-instructions/TUTORIAL-FULL-CYCLE.md)

---

# URL Shortener — Example Outputs

> **What This Is:** Fully worked documentation example for the **URL Shortener (LinkSnap)** project, produced following the DDD + Hexagonal Architecture framework across all 12 SDLC phases.
> **How to Use:** Navigate to the phase folder you want to study. Each folder contains the documentation output for that phase, using the URL Shortener as the project case.
> **Why It Matters:** Shows exactly what "done" looks like for each phase of the documentation lifecycle — making it a concrete reference for teams generating their own project documentation.
> **When to Use:** When you need a real-world example to compare against, copy structure from, or use as a prompt context when generating your own phase documents.
> **Owner:** DDD + Hexagonal AI Template contributors.

---

## Project Summary

| Field | Value |
|-------|-------|
| **Project** | LinkSnap (URL Shortener) |
| **Domain** | URL Management |
| **Core aggregate** | `ShortURL` |
| **Bounded context** | URL Management (single) |
| **Architecture** | Hexagonal (Ports & Adapters) |
| **Tutorial guide** | [`TUTORIAL-FULL-CYCLE.md`](../../00-guides-and-instructions/TUTORIAL-FULL-CYCLE.md) |

---

## Phase Index

| Phase | Folder | Status | Key Output |
|-------|--------|--------|-----------|
| 0 — Documentation Planning | [`00-documentation-planning/`](./00-documentation-planning/README.md) | 🟩 Complete | Macro plan, naming conventions |
| 1 — Discovery | [`01-discovery/`](./01-discovery/README.md) | 🟩 Complete | Vision, actors, problem context |
| 2 — Requirements | [`02-requirements/`](./02-requirements/README.md) | 🟩 Complete | Functional + non-functional reqs, glossary |
| 3 — Design | [`03-design/`](./03-design/README.md) | 🟩 Complete | Bounded context map, domain model, system flows |
| 4 — Data Model | [`04-data-model/`](./04-data-model/README.md) | 🟩 Complete | Entity model, relationships, invariants |
| 5 — Planning | [`05-planning/`](./05-planning/README.md) | 🟩 Complete | Roadmap, epics, versioning |
| 6 — Development | [`06-development/`](./06-development/) | ⬜ Planned | Architecture, API design, ADRs |
| 7 — Testing | [`07-testing/`](./07-testing/) | ⬜ Planned | Test strategy, test types, coverage |
| 8 — Deployment | [`08-deployment/`](./08-deployment/) | ⬜ Planned | CI/CD, environments, release process |
| 9 — Operations | [`09-operations/`](./09-operations/) | ⬜ Planned | Runbooks, SLAs, incident response |
| 10 — Monitoring | [`10-monitoring/`](./10-monitoring/) | ⬜ Planned | Metrics, dashboards, alerts |
| 11 — Feedback | [`11-feedback/`](./11-feedback/) | ⬜ Planned | Retrospective, lessons learned |

**Status legend:** ⬜ Planned · 🟨 In Progress · 🟩 Complete

---

## Key Decisions Summary

These decisions were made across the phases and carry forward as constraints:

| Phase | Decision |
|-------|---------|
| 1 | Single bounded context: URL Management |
| 2 | Out of scope (v1): authentication, teams, QR codes |
| 2 | NFR: redirect latency < 100 ms at p95 |
| 3 | Aggregate root: `ShortURL`; embedded `Click` events |
| 5 | v1.0 = anonymous creation + redirect + click count |
| 6 | Hexagonal structure: `domain/` → `application/` → `adapters/` |
| 6 | ADR-001: PostgreSQL for ACID uniqueness guarantees |
| 8 | Manual promotion to production in v1.0 |

---

## Agnostic/Specific Boundary

- **Phases 0–5** (folders `00-documentation-planning/` through `05-planning/`): No technology names. Business and domain terms only.
- **Phases 6–11** (folders `06-development/` through `11-feedback/`): Technology-specific. Uses Node.js, TypeScript, PostgreSQL, Docker, GitHub Actions.

---

[← data-output/README.md](../README.md) | [← Tutorial Guide](../../00-guides-and-instructions/TUTORIAL-FULL-CYCLE.md)
