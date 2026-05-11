# 002 — Workflow Integration

> **Status:** COMPLETED
> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)

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

> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)
