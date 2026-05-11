# 🔗 Traceability: Planning System Bootstrap

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
| Planning | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Defined in GLOSSARY, referenced in AGENTS.md and CLAUDE.md |
| Workflow | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Full catalog in WORKFLOWS/ |
| Scope | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Defined in GLOSSARY |
| PDR | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Template in _template/; distinct from ADR |
| Fundamental Rule | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | In AGENTS.md, CLAUDE.md, planning/README.md |
| Agnostic Boundary | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Enforced by [CHECK-AGNOSTIC-BOUNDARY] sub-workflow |
| Source Hierarchy | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Defined in GUIDE.md |
| Traceability | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | Template + TRACEABILITY-GLOBAL.md |
| Bypass (--no-plan) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Documented in AGENTS.md, CLAUDE.md, planning/README.md |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-001 | Language: English throughout | Repository is 100% English | W, G | Bootstrap |
| PDR-002 | Use single-letter phase codes (D,R,S,M,P,V,T,B,O,N,F,G,W) | Compact and unambiguous in matrices | W | Bootstrap |
| PDR-003 | CDR renamed to PDR (Project Decision Record) | Distinguishes planning-level decisions from ADR (technical) | W, V | Bootstrap |
| PDR-004 | planning/ at repo root (not inside 01-templates/) | Meta-planning system ≠ SDLC Phase 5 template content | W | Bootstrap |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)
