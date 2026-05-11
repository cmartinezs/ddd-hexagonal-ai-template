# 002 — Workflow Integration

> **Status:** COMPLETED
> [← finished/README.md](../README.md) | [← planning/README.md](../../README.md)

---

## Intent

Integrate `planning/WORKFLOWS/` organically with `01-templates/05-planning/` (Phase 5 SDLC templates) and `01-templates/06-development/workflow/` (dev workflow templates), eliminating discrepancies, fixing broken links, and extending the planning workflows with phase-specific guidance.

---

## Key Outputs

| Output | Type |
|--------|------|
| `planning/WORKFLOWS/05-sdlc-phase-guidance.md` | New file |
| `planning/WORKFLOWS/README.md` | Modified |
| `planning/WORKFLOWS/02-execution-workflows.md` | Modified |
| `planning/WORKFLOWS/04-sub-workflows.md` | Modified |
| `planning/GUIDE.md` | Modified |
| `planning/PROMPTING.md` | Modified |
| `01-templates/06-development/workflow/` — 4 broken link fixes | Fixed |
| `01-templates/05-planning/TEMPLATE-018-milestones-proposals.md` — HITO→MILESTONE | Fixed |

---

## Discrepancies Found

1. **Broken navigation links** in `06-development/workflow/` — `commits/`, `pull-requests/`, `cicd/`, top-level `README.md` have malformed `[text](path)` (missing `(` after `[text]`).
2. **"HITO" in English template** — `TEMPLATE-018-milestones-proposals.md` uses Spanish "HITO" for milestone labels in the template body.
3. **Conceptual conflation** — `planning/` (meta-planning) vs. Phase 5 (project planning) are conceptually distinct but not explicitly differentiated in `planning/GUIDE.md`.
4. **Missing phase-specific guidance** — `GENERATE-DOCUMENT` workflow has no per-phase notes for Phase 5 (agnostic + chain) or Phase 6 dev workflow (tech-specific expected).
5. **Missing sub-workflows** — No sub-workflows for Phase 5 chain consistency or dev workflow cross-checks.
6. **Missing prompts** — `PROMPTING.md` has no Phase 5 or Phase 6 dev workflow prompts.

---

## Retrospective

### What was delivered

All 6 discrepancies identified during EXPANSION were resolved:

1. **Broken nav links** in `01-templates/06-development/workflow/` — fixed across all 4 affected files.
2. **"HITO" in English template** — replaced with "MILESTONE" in `TEMPLATE-018-milestones-proposals.md`.
3. **Conceptual conflation** — clarified in `planning/GUIDE.md` with a "Two Distinct Planning Domains" section.
4. **Missing phase-specific guidance** — delivered as `05-SDLC-PHASE-GUIDANCE/` (12 phase files) linked from `GENERATE-DOCUMENT`.
5. **Missing sub-workflows** — added `CHECK-PHASE5-CHAIN`, `CHECK-DEVWORKFLOW-CONSISTENCY`, `CHECK-VERSIONING-ALIGNMENT`.
6. **Missing prompts** — added Phase 5 and Phase 6 prompts to `planning/PROMPTING.md`.

Additionally, a major structural improvement was executed under `--no-plan-force`:
- `WORKFLOWS/` flat files → 5 UPPERCASE sub-folders (42 new files, 5 deleted).
- `planning/WORKFLOWS/README.md` — updated catalog with group table and new direct links.
- `planning/GLOSSARY.md` — fixed stale sub-workflow link.
- `research/planning-workflow-system.md` — updated directory tree.

### What deviated from plan

- No scope files (`02-deepening/`) were formally created; execution proceeded directly. This was intentional given the incremental nature of the work across multiple sessions.
- The WORKFLOWS sub-folder expansion was scoped under `--no-plan-force` (not part of the original planning intent), but was the most impactful structural change.

### What worked well

- The SDLC phase guidance as individual files (one per phase) proved significantly more navigable than a single flat document.
- The sub-folder structure for WORKFLOWS eliminates anchor-link fragility entirely.

### Open improvements (carry forward)

- A formal scope-file protocol for plannings that span multiple sessions would reduce reconstruction cost.
- `TRACEABILITY-GLOBAL.md` could benefit from a "Phase Coverage" summary row.

---

> [← finished/README.md](../README.md) | [← planning/README.md](../../README.md)
