# 005 — Tutorial: Interactive Step-by-Step

> **Status:** COMPLETED
> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)

---

## Intent

Create a self-contained interactive tutorial folder where a user follows structured exercises to learn the documentation system phase by phase, with checkpoints, AI prompts, and validation criteria per step.

---

## Key Outputs

| Output | Type |
|--------|------|
| `00-guides-and-instructions/tutorial/README.md` — entry point | New file |
| `00-guides-and-instructions/tutorial/` — one step file per phase | New files |
| `00-guides-and-instructions/tutorial/VALIDATION-CHECKLIST.md` | New file |

---

## Retrospective

### What Worked

- Tutorial structure proved well-suited for project-agnostic delivery — each step is self-contained with clear inputs, instructions, and validation
- Publishing AI prompts directly (not simplified) ensures consistency with the canonical source in `INSTRUCTIONS-FOR-AI.md`
- Phase navigation table with "Agnostic?" column helps users understand the agnostic/specific boundary as they navigate

### What Didn't Work

- Initial plan assumed a default reference project (URL Shortener from planning 003); changed to fully agnostic based on user feedback (TCG context)
- Phase prompts from `INSTRUCTIONS-FOR-AI.md` needed manual extraction — some phases had prompts embedded in longer text rather than standalone blocks

### Open Improvements

- Consider adding `tutorial/workshop-notes.md` for facilitators running team workshops
- A quick-reference card (single-page PDF) summarizing the 12-phase workflow could add value
- Phase 0 currently lacks a dedicated AI prompt in `INSTRUCTIONS-FOR-AI.md` — a standalone prompt should be added for consistency

### Key Outputs

| Output | Location |
|--------|---------|
| Tutorial entry point | `00-guides-and-instructions/tutorial/README.md` |
| Step template | `00-guides-and-instructions/tutorial/_step-template.md` |
| 12 step files (phases 0–11) | `00-guides-and-instructions/tutorial/step-00*.md` through `step-11*.md` |
| Validation checklist | `00-guides-and-instructions/tutorial/VALIDATION-CHECKLIST.md` |
| AI Prompts appendix | `00-guides-and-instructions/tutorial/AI-PROMPTS-APPENDIX.md` |
| Guides index updated | `00-guides-and-instructions/README.md` |

---

> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)
