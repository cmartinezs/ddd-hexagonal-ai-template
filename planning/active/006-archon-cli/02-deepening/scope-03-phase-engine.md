# 🔍 DEEPENING: Scope 03 — Phase Engine + Validator

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement the phase engine: 12 phase definitions with metadata, dependency graph, transition rules, and the validator that enforces phase constraints with severity levels (ERROR/WARN/INFO).

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/core/phase-engine.ts` — 12 phase definitions | GENERATE-DOCUMENT | PENDING | `phase-engine.ts` |
| 2 | Create `src/core/validator.ts` — constraint checker | GENERATE-DOCUMENT | PENDING | `validator.ts` |
| 3 | Define phase metadata: name, description, requiredInputs, outputFiles, isAgnostic | GENERATE-DOCUMENT | PENDING | Phase metadata definitions |
| 4 | Implement transition rules (advance, back, future-phase warning) | GENERATE-DOCUMENT | PENDING | Transition logic |
| 5 | Implement constraint severity levels (ERROR/WARN/INFO) | GENERATE-DOCUMENT | PENDING | Severity levels |
| 6 | Create `src/ui/render-status.ts` — status display | GENERATE-DOCUMENT | PENDING | Status renderer |
| 7 | Create `src/ui/render-warnings.ts` — warning display | GENERATE-DOCUMENT | PENDING | Warnings renderer |
| 8 | Write unit tests for phase engine and validator | GENERATE-DOCUMENT | PENDING | Tests |

---

## Phase Definitions (12 phases)

| Phase | Name | Agnostic? | Required Inputs | Output Files | Key Constraint |
|-------|------|-----------|----------------|--------------|----------------|
| 0 | Documentation Planning | G | project name, problem statement | sdlc-framework.md, macro-plan.md | Must be completed before Phase 1 |
| 1 | Discovery | D | project name, problem statement | context-motivation.md, system-vision.md, actors.md, needs-expectations.md | No technology names |
| 2 | Requirements | R | Phase 1 output, glossary | glossary.md, fr-*.md, rnf-*.md, priority-matrix.md, scope-boundaries.md | Every FR traces to Discovery |
| 3 | Design | S | Phase 2 output, bounded contexts | strategic-design.md, system-flows.md, bounded-contexts/*.md | No technology names |
| 4 | Data Model | M | Phase 3 output, aggregates | entities.md, relationships.md, ERD | No database-specific terms |
| 5 | Planning | P | Phase 4 output, entities | roadmap.md, epics.md, milestones.md, versioning-strategy.md | No technology names |
| 6 | Development | V | Phase 5 output, roadmap | architecture.md, api-reference.md, coding-standards.md, adr/*.md | Technology names allowed |
| 7 | Testing | T | Phase 6 output, architecture | test-strategy.md, test-plan.md, unit-tests.md, integration-tests.md | Test cases trace to FRs |
| 8 | Deployment | B | Phase 7 output, test strategy | ci-cd-pipeline.md, environments.md, release-process.md, rollback-procedures.md | Versioning aligns with Phase 5 |
| 9 | Operations | O | Phase 8 output, pipeline | runbooks/*.md, incident-response.md, sla.md, on-call.md | Runbooks cover common tasks |
| 10 | Monitoring | N | Phase 9 output, SLAs | metrics.md, alerts.md, dashboards.md | SLI/SLO align with Phase 9 SLA |
| 11 | Feedback | F | All previous phases | retrospectives/*.md, user-feedback.md, lessons-learned.md | DDD maturity assessment |

---

## Transition Rules

| Action | Rule |
|--------|------|
| Advance phase | Current phase must be `complete` OR user confirms with `WARN` |
| Go backward | Always allowed; `WARN` about downstream staleness |
| Work on future phase | `WARN` — "Phase N requires Phase M output. May cause inconsistencies." |
| Work on past phase | `WARN` — "Phase M is complete. Editing it may invalidate traceability." |

---

## Constraint Severity Levels

| Severity | Behavior | Example |
|----------|----------|---------|
| `ERROR` | Must fix before advancing | Technology name in phases 0–5; missing required files for next phase |
| `WARN` | Should fix; confirm to proceed | Phase dependencies incomplete; glossary term not defined |
| `INFO` | Suggestion | Unsigned document; navigation link could be verified |

---

## Done Criteria

- [ ] `phase-engine.ts` defines all 12 phases with correct metadata
- [ ] Phase dependency graph is correct (Phase N requires Phase N-1 complete)
- [ ] Transition rules enforce: advance requires completion or warning confirmation
- [ ] `validator.ts` runs all checks for current phase on `archon check`
- [ ] `ERROR` blocks advancement; `WARN` shows confirmation prompt; `INFO` logs suggestion
- [ ] Validator detects agnostic boundary violations (no tech names in phases 0–5)
- [ ] Validator detects traceability gaps (FR not traced to Discovery, etc.)
- [ ] `render-status.ts` outputs ASCII progress bar with phase map
- [ ] `render-warnings.ts` outputs color-coded warnings (red/yellow/blue)
- [ ] `archon check --json` outputs machine-parseable results
- [ ] Unit tests cover: all transition rules, all constraint types, output formats
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)