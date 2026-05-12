# 🌐 Global Traceability Matrix

> [← planning/README.md](README.md)

Consolidated view of all terms and decisions mapped across the SDLC phases of this repository, drawn from all plannings.

> **Status:** Draft

---

## How to Read This Matrix

Each row is a term, concept, or decision introduced in a planning. The columns represent SDLC phase codes:

| Code | Phase / Section |
|------|----------------|
| `D` | Discovery (`01-discovery/`) |
| `R` | Requirements (`02-requirements/`) |
| `S` | Design (`03-design/`) |
| `M` | Data Model (`04-data-model/`) |
| `P` | Planning (`05-planning/`) |
| `V` | Development (`06-development/`) |
| `T` | Testing (`07-testing/`) |
| `B` | Deployment (`08-deployment/`) |
| `O` | Operations (`09-operations/`) |
| `N` | Monitoring (`10-monitoring/`) |
| `F` | Feedback (`11-feedback/`) |
| `G` | Guides (`00-guides-and-instructions/`) |
| `W` | Workflow (`planning/`) |

Cell values:
- `✅` — term/concept explicitly present and consistent
- `⚠️` — present but needs review or update
- `❌` — not yet present (gap)
- `N/A` — phase not applicable for this term
- `(blank)` — not yet evaluated

---

## Global Matrix

| Term / Concept | Source Planning | D | R | S | M | P | V | T | B | O | N | F | G | W |
|---------------|----------------|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Planning System | [001](finished/001-planning-system-bootstrap/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ |
| Workflow (concept) | [001](finished/001-planning-system-bootstrap/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ |
| PDR | [001](finished/001-planning-system-bootstrap/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ |
| Fundamental Rule | [001](finished/001-planning-system-bootstrap/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ |
| Agnostic Boundary | [001](finished/001-planning-system-bootstrap/TRACEABILITY.md) | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ |
| SDLC Phase Guidance | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | ✅ |
| Meta-planning vs. Project Planning | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ |
| CHECK-PHASE5-CHAIN | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ |
| CHECK-DEVWORKFLOW-CONSISTENCY | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ |
| CHECK-VERSIONING-ALIGNMENT | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | ✅ |
| WORKFLOWS/ Sub-folder Structure | [002](finished/002-workflow-integration/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ |
| ShortURL | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| Short Code | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| Redirect (domain service) | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | N/A | N/A | ✅ | ✅ | N/A | ✅ | ✅ | N/A | ✅ | N/A |
| URL Management (bounded context) | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Creator | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Visitor | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Analytics Consumer | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Success Criterion | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Scope Boundary | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| ShortCodeGenerator | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Domain Event | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | ✅ | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| Context Map | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| ERD | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Invariant | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| Epic | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Hexagonal Architecture | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Port (inbound/outbound) | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Adapter | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| ADR | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Use Case | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| Test Pyramid | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A |
| CI/CD Pipeline | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | ✅ | N/A | N/A | N/A | ✅ | N/A |
| GitHub Flow | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | ✅ | N/A | N/A | N/A | ✅ | N/A |
| Release Tag | [003](active/003-tutorial-full-cycle/TRACEABILITY.md) | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | ✅ | N/A |
| Interactive Tutorial | [005](finished/005-tutorial-interactive/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Step File | [005](finished/005-tutorial-interactive/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| Done Check | [005](finished/005-tutorial-interactive/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |
| AI Prompt (consolidated) | [005](finished/005-tutorial-interactive/TRACEABILITY.md) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A |

---

## Consolidated Residuals

*Terms or decisions deferred from individual plannings that require global resolution.*

| ID | Term / Issue | Source Planning | Status | Notes |
|----|-------------|----------------|--------|-------|
| — | *No open residuals* | — | — | — |

---

## Changelog

| Date | Planning | Change |
|------|----------|--------|
| — | 001-planning-system-bootstrap | Initial matrix created |
| 2026-05-11 | 002-workflow-integration | Added 6 new terms: SDLC Phase Guidance, Meta-planning vs. Project Planning, CHECK-PHASE5-CHAIN, CHECK-DEVWORKFLOW-CONSISTENCY, CHECK-VERSIONING-ALIGNMENT, WORKFLOWS/ Sub-folder Structure |
| 2026-05-11 | 003-tutorial-full-cycle (scope-01) | Added 5 new terms: ShortURL, Short Code, Redirect (domain service), URL Management (bounded context), Full Cycle Tutorial |
| 2026-05-11 | 003-tutorial-full-cycle (scope-02) | Added 5 new terms: Creator, Visitor, Analytics Consumer, Success Criterion, Scope Boundary |
| 2026-05-11 | 003-tutorial-full-cycle (scope-03) | Added 7 new terms: ShortCodeGenerator, Domain Event, Context Map, ERD, Invariant, Epic, Milestone |
| 2026-05-11 | 003-tutorial-full-cycle (scope-04) | Added 9 new terms: Hexagonal Architecture, Port, Adapter, ADR, Use Case, Test Pyramid, CI/CD Pipeline, GitHub Flow, Release Tag |
| 2026-05-11 | 003-tutorial-full-cycle (scope-05) | Added 7 new terms: Runbook, SLA, Incident Severity, Metric (observability), Alert Rule, Retrospective, Backlog Item |
| 2026-05-11 | 004-tutorial-taskflow-completion (scope-01) | Audit + PDR-007: Vision Statement, Actor, Glossary |
| 2026-05-11 | 004-tutorial-taskflow-completion (scope-02) | Phases 3-5 rewrite: Functional Requirement, Non-Functional Requirement, Bounded Context, Context Map, Aggregate, Invariant, Value Object, Domain Event |
| 2026-05-11 | 004-tutorial-taskflow-completion (scope-03) | Phases 6-8 rewrite: Epic, Milestone, Hexagonal Architecture, Port, Adapter, ADR, Test Pyramid, CI/CD Pipeline |
| 2026-05-11 | 004-tutorial-taskflow-completion (scope-04) | Phases 9-11 rewrite: SLA, Runbook, Incident Severity, Metric, Retrospective, Backlog Item |
| 2026-05-11 | 004-tutorial-taskflow-completion (scope-05) | Unified EXAMPLE-IMPLEMENTATION.md: Phase 0 added, TOC, navigation, template cross-references |
| 2026-05-12 | 005-tutorial-interactive (all scopes) | Added 4 new terms: Interactive Tutorial, Step File, Done Check, AI Prompt (consolidated). Tutorial folder created with 12 step files, validation checklist, AI prompts appendix. Guides index updated. |

---

> [← planning/README.md](README.md)
