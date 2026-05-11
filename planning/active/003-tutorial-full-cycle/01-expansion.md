# 🚀 EXPANSION: Tutorial — Full Cycle (URL Shortener)

> **Status:** EXPANSION
> [← planning/README.md](../../README.md)

---

## Scope Summary

| # | Scope | SDLC Phase(s) | Depends On | Status |
|---|-------|--------------|------------|--------|
| 01 | Tutorial guide scaffold + case definition | G | — | PENDING |
| 02 | Phase 0–2 outputs (Planning, Discovery, Requirements) | G, D, R | 01 | PENDING |
| 03 | Phase 3–5 outputs (Design, Data Model, Planning) | S, M, P | 02 | PENDING |
| 04 | Phase 6–8 outputs (Development, Testing, Deployment) | V, T, B | 03 | PENDING |
| 05 | Phase 9–11 outputs (Operations, Monitoring, Feedback) | O, N, F | 04 | PENDING |

---

## Dependency Map

```mermaid
flowchart LR
    S01[01: Scaffold] --> S02[02: Phases 0-2]
    S02 --> S03[03: Phases 3-5]
    S03 --> S04[04: Phases 6-8]
    S04 --> S05[05: Phases 9-11]
```

---

## Impact per SDLC Phase

| Phase Code | Affected? | What changes |
|-----------|----------|-------------|
| D | ✅ | New example discovery docs for URL Shortener |
| R | ✅ | New example requirements docs |
| S | ✅ | New example design docs (bounded contexts, flows) |
| M | ✅ | New example data model |
| P | ✅ | New example planning/roadmap |
| V | ✅ | New example dev architecture docs (hexagonal) |
| T | ✅ | New example test strategy |
| B | ✅ | New example deployment docs |
| O | ✅ | New example operations runbook |
| N | ✅ | New example monitoring docs |
| F | ✅ | New example feedback docs |
| G | ✅ | New `TUTORIAL-FULL-CYCLE.md` guide |
| W | ☐ | No workflow changes needed |

---

## Notes

- The URL Shortener domain: `ShortURL` aggregate, `Redirect` domain service, `ClickTracker`. One bounded context: **URL Management**.
- All phase 1–5 outputs must be **technology-agnostic** (no "Redis", "PostgreSQL", etc.).
- Phase 6–11 outputs should use realistic technology choices (e.g., REST, relational DB) to make the example concrete.
- Outputs live in `01-templates/data-output/` with a folder per phase, mirroring the template structure.
- The guide file (`TUTORIAL-FULL-CYCLE.md`) links to each output file and explains what decisions were made at each phase.

---

> [← planning/README.md](../../README.md)
