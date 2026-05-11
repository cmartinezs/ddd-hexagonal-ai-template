[← url-shortener/README.md](../README.md) | [Next >](../01-discovery/README.md)

---

# Phase 0 — Documentation Planning
## LinkSnap (URL Shortener)

> **What This Is:** The documentation planning phase output for the LinkSnap URL Shortener. Defines the macro plan, phase selection rationale, naming conventions, and documentation owner.
> **How to Use:** Read this before any other phase output. It establishes the framework decisions that govern all subsequent documentation.
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [Project Overview](#project-overview)
2. [Macro Plan](#macro-plan)
3. [Phase Selection Rationale](#phase-selection-rationale)
4. [Documentation Conventions](#documentation-conventions)
5. [Status](#status)

---

## Project Overview

| Field | Value |
|-------|-------|
| **Project** | LinkSnap — URL Shortener service |
| **Documentation Start** | 2026-05-11 |
| **Owner** | Solo developer (tutorial context) |
| **Framework** | DDD + Hexagonal Architecture template |
| **Phases selected** | All 12 (0–11) |

---

## Macro Plan

| Phase | Name | Status | Target | Notes |
|-------|------|--------|--------|-------|
| 00 | Documentation Planning | ✅ Complete | — | This document |
| 01 | Discovery | ✅ Complete | — | Vision, actors, problem |
| 02 | Requirements | ✅ Complete | — | FRs, NFRs, scope |
| 03 | Design | ✅ Complete | — | BC map, system flows |
| 04 | Data Model | ✅ Complete | — | Entities, relationships |
| 05 | Planning | ✅ Complete | — | Roadmap, epics |
| 06 | Development | ✅ Complete | — | Architecture, APIs |
| 07 | Testing | ✅ Complete | — | Test strategy |
| 08 | Deployment | ✅ Complete | — | CI/CD, environments |
| 09 | Operations | ✅ Complete | — | Runbooks, SLA |
| 10 | Monitoring | ✅ Complete | — | Metrics, alerts |
| 11 | Feedback | ✅ Complete | — | Retrospective |

> **Status legend:** ⬜ Planned · 🟨 In Progress · 🟩 Ready for review · ✅ Complete

---

## Phase Selection Rationale

All 12 phases are executed for the URL Shortener because:

1. **It is a tutorial** — the goal is to demonstrate every phase, not to minimize documentation effort.
2. **The domain has enough depth** — while small, each phase produces non-trivial content that illustrates real decisions.
3. **Phases 6–11 add value** — even for a simple service, deployment, operations, and monitoring documentation is non-optional in a real project.

In a real project, a team might skip or merge some phases. For this tutorial, every phase is executed in full.

---

## Documentation Conventions

| Convention | Choice | Reason |
|-----------|--------|--------|
| Language | English | Single language for tutorial accessibility |
| Diagrams | Mermaid (preferred) → PlantUML → ASCII | Mermaid renders in GitHub and most markdown tools |
| ID format | `FR-NNN`, `NFR-NNN`, `TC-NNN`, `ADR-NNN` | Consistent prefix + sequential number for traceability |
| File naming | `kebab-case.md` (no `TEMPLATE-` prefix) | Output files are project content, not templates |
| Phase agnostic boundary | Phases 0–5: no technology names | Business logic before technology choices |

---

## Status

| Item | Status |
|------|--------|
| Framework selected | ✅ |
| All phases listed | ✅ |
| Owner assigned | ✅ |
| Naming conventions set | ✅ |
| Phase 1 can begin | ✅ |

---

[← url-shortener/README.md](../README.md) | [Next >](../01-discovery/README.md)
