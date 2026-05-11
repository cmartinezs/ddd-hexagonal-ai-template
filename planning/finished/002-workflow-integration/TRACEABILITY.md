# 🔗 Traceability: Workflow Integration

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
| SDLC Phase Guidance | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | ✅ | Per-phase guidance for GENERATE-DOCUMENT in `05-SDLC-PHASE-GUIDANCE/` |
| Meta-planning vs. Project Planning | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Clarified in `planning/GUIDE.md`; meta-planning ≠ SDLC Phase 5 content |
| CHECK-PHASE5-CHAIN | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Sub-workflow enforcing Phase 5 roadmap → epic → milestone chain |
| CHECK-DEVWORKFLOW-CONSISTENCY | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Sub-workflow checking dev workflow cross-consistency in Phase 6 |
| CHECK-VERSIONING-ALIGNMENT | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | ✅ | Sub-workflow enforcing versioning consistency in Phase 8 |
| WORKFLOWS/ Sub-folder Structure | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Each workflow group is now a sub-folder with one file per workflow |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-005 | SDLC phase guidance lives in `05-SDLC-PHASE-GUIDANCE/` as separate files per phase | Keeps GENERATE-DOCUMENT focused; allows per-phase evolution independently | W | 2026-05-10 |
| PDR-006 | WORKFLOWS/ restructured into UPPERCASE sub-folders, one file per workflow | Navigability at scale; direct linking to individual workflows; clear separation of concerns | W | 2026-05-11 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)
