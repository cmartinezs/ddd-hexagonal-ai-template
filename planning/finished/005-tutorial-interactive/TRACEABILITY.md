# 🔗 Traceability: Tutorial — Interactive Step-by-Step

> [← planning/README.md](../../README.md)

---

## Phase Code Reference

| Code | Phase |
|------|-------|
| D | Discovery | R | Requirements | S | Design | M | Data Model | P | Planning (SDLC 5) |
| V | Development | T | Testing | B | Deployment | O | Operations | N | Monitoring | F | Feedback |
| G | Guides (`00-guides-and-instructions/`) |
| W | Workflow (`planning/`) |

**Cell values:** `✅` present/correct · `⚠️` needs review · `❌` missing · `N/A` not applicable

---

## Term Matrix

| Term / Concept | D | R | S | M | P | V | T | B | O | N | F | G | W | Notes |
|---------------|---|---|---|---|---|---|---|---|---|---|---|---|---|-------|
| Interactive Tutorial | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | New folder `tutorial/` under G |
| Step File | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Standardized structure per step |
| Done Check | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Validation checklist per step |
| AI Prompt (consolidated) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Appendix consolidating all 12 prompts |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-008 | Tutorial is fully project-agnostic. User brings their own project case. No default reference project (unlike 003 which uses URL Shortener). | Maximizes tutorial flexibility — works for TCG, any domain, any team. 003 already provides the reference case. | G (tutorial/) | 2026-05-12 |
| PDR-009 | AI prompts in step files are direct copy-paste from `INSTRUCTIONS-FOR-AI.md` (verbatim). | Ensures prompts match the canonical source exactly; users see the real prompts, not simplified versions. | G (tutorial/) | 2026-05-12 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)