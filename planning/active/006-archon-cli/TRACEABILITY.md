# 🔗 Traceability: Archon CLI (006)

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
| Archon (CLI) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | New CLI tool in G |
| state.json | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Project state file |
| First-Interactive | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Missing params trigger prompt |
| Template Upgrade | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Template version migration |
| Rollback | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Template rollback support |
| Prompts Accumulator | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Prompt library management |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-010 | Name: Archon | Greek ἄρχων — "the one who rules" | G (archon/) | 2026-05-12 |
| PDR-011 | Project init: sibling folder + switch prompt | Template remains clean; project is sibling | G (archon/) | 2026-05-12 |
| PDR-012 | State: `.archon/state.json` + `.archon/state.checksum` (SHA-256) | Human + AI readable, integrity checked | G (archon/) | 2026-05-12 |
| PDR-013 | Agent config: per project in `.archon/config.json` | Each project has own agent preference | G (archon/) | 2026-05-12 |
| PDR-014 | Phase enforcement: warning + confirmation | Non-blocking, educates user | G (archon/) | 2026-05-12 |
| PDR-015 | Prompt output: file-based in `.archon/prompts/` | Accumulated library, loadable | G (archon/) | 2026-05-12 |
| PDR-016 | Prompts management: ls/compress/rank/merge/expand | Users accumulate library | G (archon/) | 2026-05-12 |
| PDR-017 | First-interactive: required params missing → interactive mode | Configurable defaults | G (archon/) | 2026-05-12 |
| PDR-018 | Template versioning: semantic (MAJOR.MINOR.PATCH) | Flexible evolution, clear breaking points | G (archon/) | 2026-05-12 |
| PDR-019 | Upgrade: auto-apply safe, warn on breaking | User-controlled migration | G (archon/) | 2026-05-12 |
| PDR-020 | Migration files: `CHANGELOG.md` + `UPGRADE/` subfolder | Changelog + per-version guides | G (archon/) | 2026-05-12 |
| PDR-021 | Rollback support: `archon upgrade --rollback <version>` | Safety during migrations | G (archon/) | 2026-05-12 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)