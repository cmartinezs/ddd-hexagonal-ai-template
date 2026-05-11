# 📋 Planning System — Changelog

> [← planning/README.md](README.md)

All notable changes to the planning system itself are documented here. Ordered from most recent to oldest.

---

## [001] — Planning System Bootstrap

**Date:** 2026-05-11
**Planning:** [001-planning-system-bootstrap](finished/001-planning-system-bootstrap/README.md)
**Type:** Installation

### Added

- `planning/` root directory with full infrastructure
- `planning/README.md` — Fundamental Rule, bypass parameters, planning index
- `planning/GUIDE.md` — lifecycle, folder structure, phase codes, source hierarchy
- `planning/GLOSSARY.md` — 17 operational terms
- `planning/PROMPTING.md` — AI prompting guidelines and reusable prompt library
- `planning/TRACEABILITY-GLOBAL.md` — global consolidated term matrix
- `planning/CHANGELOG.md` — this file
- `planning/WORKFLOWS/README.md` — when-to-use table, master diagram
- `planning/WORKFLOWS/01-planning-workflows.md` — `ADVANCE-PLANNING`, `CREATE-PLANNING`
- `planning/WORKFLOWS/02-execution-workflows.md` — `GENERATE-DOCUMENT`, `REVIEW-COHERENCE`, `EXPAND-ELEMENT`, `INTEGRATE-MILESTONE`
- `planning/WORKFLOWS/03-maintenance-workflows.md` — `UPDATE-TRACEABILITY`, `RESIDUAL-VERIFICATION`, `RECORD-INCONSISTENCY`, `CASCADE-CHANGE`, `MILESTONE-FEEDBACK`, `AUDIT-PLANNING`
- `planning/WORKFLOWS/04-sub-workflows.md` — 9 sub-workflows including 4 SDLC-specific additions
- `planning/_template/` — 6 template files for new plannings
- `planning/active/README.md` — index of in-progress plannings
- `planning/finished/README.md` — index of archived plannings
- `planning/finished/001-planning-system-bootstrap/` — bootstrap planning (7 scopes, full lifecycle)
- `research/planning-workflow-system.md` — source research document

### Modified

- `AGENTS.md` — Added Planning System section (Fundamental Rule, bypass, directory structure, common tasks)
- `CLAUDE.md` — Added Planning System section, updated directory structure
- `00-guides-and-instructions/README.md` — Added planning execution path (Priority 0), updated Document Index

### Design Decisions

| PDR | Decision |
|-----|----------|
| PDR-001 | Language: English throughout |
| PDR-002 | Single-letter phase codes: D, R, S, M, P, V, T, B, O, N, F, G, W |
| PDR-003 | CDR renamed to PDR (Project Decision Record) — distinguishes from ADR |
| PDR-004 | `planning/` at repo root, not inside `01-templates/` |

---

## [002] — Workflow Integration

**Date:** 2026-05-12
**Planning:** [002-workflow-integration](active/002-workflow-integration/README.md)
**Type:** Enhancement

### Added

- `planning/WORKFLOWS/05-sdlc-phase-guidance.md` — Per-phase reference for `GENERATE-DOCUMENT`: inputs, boundaries, chain requirements, done criteria for all 12 SDLC phases
- 3 new sub-workflows in `planning/WORKFLOWS/04-sub-workflows.md`:
  - `[CHECK-PHASE5-CHAIN]` — verifies roadmap→epics→use-cases→milestones→issue-mapping consistency
  - `[CHECK-DEVWORKFLOW-CONSISTENCY]` — verifies branches/commits/PRs/cicd mutual consistency
  - `[CHECK-VERSIONING-ALIGNMENT]` — verifies versioning strategy referenced in deployment and feedback
- Phase 5 and Phase 6 specific prompt templates in `planning/PROMPTING.md`

### Modified

- `planning/WORKFLOWS/README.md` — Added `05-sdlc-phase-guidance.md` to catalog; added 3 new sub-workflows to sub-workflow index
- `planning/WORKFLOWS/02-execution-workflows.md` — Added phase-specific guidance link to `GENERATE-DOCUMENT`
- `planning/GUIDE.md` — Added "Two Distinct Planning Domains" section clarifying meta-planning vs. project planning vs. dev workflow
- `planning/PROMPTING.md` — Added 5 new prompt templates for Phase 5 and Phase 6 workflows
- `planning/active/README.md` — Added planning 002 entry
- `planning/README.md` — Updated active plannings table
- `01-templates/05-planning/TEMPLATE-018-milestones-proposals.md` — Replaced all "HITO" occurrences with "MILESTONE"
- `01-templates/06-development/workflow/README.md` — Fixed broken navigation links (`[← Index../README.md)` → `[← Index](../README.md)`)
- `01-templates/06-development/workflow/commits/README.md` — Fixed broken navigation links
- `01-templates/06-development/workflow/pull-requests/README.md` — Fixed broken navigation links
- `01-templates/06-development/workflow/cicd/README.md` — Fixed broken navigation links

---

> [← planning/README.md](README.md)
