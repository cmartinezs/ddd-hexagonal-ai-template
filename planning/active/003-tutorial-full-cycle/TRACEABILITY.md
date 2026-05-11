# 🔗 Traceability: Tutorial — Full Cycle (URL Shortener)

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
| ShortURL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A | Core aggregate; defined in scope-01 domain vocabulary |
| Short Code | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A | Value object; unique alphanumeric identifier |
| Original URL | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Value object carried by ShortURL |
| Redirect | ✅ | ✅ | ✅ | N/A | N/A | ✅ | ✅ | N/A | ✅ | ✅ | N/A | ✅ | N/A | Core domain service; primary SLA target |
| Click | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | ✅ | N/A | ✅ | N/A | Value object; event recorded on each redirect |
| Click Count | N/A | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | ✅ | N/A | ✅ | N/A | Derived metric; primary analytics value |
| Expiry | N/A | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A | Optional value object; nullable field on ShortURL |
| Alias | N/A | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | N/A | Optional user-supplied short code |
| URL Management | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Single bounded context for all ShortURL operations |
| Creator | ✅ | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Actor who creates ShortURLs |
| Visitor | ✅ | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Actor who follows a short link |
| Analytics Consumer | N/A | ✅ | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Actor who reads click statistics |
| Full Cycle Tutorial | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Concept: complete worked documentation example across all 12 phases |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-009 | URL Shortener (LinkSnap) chosen as tutorial case | Simple domain (1 aggregate, 1 BC), clear hexagonal fit, universally understood | G | 2026-05-11 |
| PDR-010 | Tutorial outputs live in `01-templates/data-output/url-shortener/` subfolder | Keeps generic data-output/ reusable; URL Shortener examples are self-contained | G | 2026-05-11 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)
