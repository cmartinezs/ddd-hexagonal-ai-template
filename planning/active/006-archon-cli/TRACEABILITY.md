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
| Phase Engine | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | 12 phase definitions + transitions |
| Validator | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | ERROR/WARN/INFO severity levels |
| Template Copier | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Copies template to sibling project |
| state.json | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Project state file |
| First-Interactive | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Missing params trigger prompt |
| Template Upgrade | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Template version migration |
| Rollback | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Template rollback support |
| Prompts Accumulator | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Prompt library management |
| Agent Adapter | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Agent-agnostic execution layer |
| Context Scanner | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Project analysis + context generation |
| Run Tracker | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Execution metadata + logs |
| AI Prompt Builder | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Rich per-phase prompts from template |
| Transport Priority | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | file-attachment > attach > stdin |
| Prompts Manager | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | ls/rank/compress/merge/expand/export/clean |
| Agent Adapter Factory | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Extensible agent registry (opencode/claude) |
| First-Interactive Engine | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Missing params → interactive prompts (always/missing/never modes) |
| Config System | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | set/get/ls/delete defaults, per-project config.json |
| Guide System | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Phase help, pitfalls, prerequisites, next actions |
| Tutorial System | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Step-by-step navigation, progress tracking, project/template modes |
| Doctor Health Checks | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Template integrity, phase chain, glossary, navigation, --fix auto-repair |
| Migration Manager | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Version detection, backup/restore, migration log |
| Semantic Versioning | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | PATCH (auto), MINOR (confirm), MAJOR (manual guide) |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| PDR-022 | CLI moved to `packages/archon-cli/` | Monorepo with npm workspaces for global installability | G (archon/) | 2026-05-12 |
| PDR-023 | Template resolution: global cache at `~/.archon/templates/` | No template copies per project; resolved at runtime | G (archon/) | 2026-05-12 |
| PDR-024 | Project output: `docs/` per phase | Clean separation from template source | G (archon/) | 2026-05-12 |
| PDR-025 | Mode detection: user/project/dev/template-cache | 4-mode system instead of template/project | G (archon/) | 2026-05-12 |
| PDR-026 | `archon templates` command | Template cache management (ls/pull/update/remove) | G (archon/) | 2026-05-12 |
| PDR-027 | `archon dev link-template` command | Dev mode linking local template | G (archon/) | 2026-05-12 |
| PDR-028 | `template.lock.json` per project | Pins exact template version + source + commit | G (archon/) | 2026-05-12 |
| PDR-029 | Init: child folder from cwd | `./mi-proyecto/` instead of `../mi-proyecto/` | G (archon/) | 2026-05-12 |
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
| PDR-030 | First-interactive engine: missing params → interactive prompts | Commands always functional, user-friendly | G (archon/) | 2026-05-12 |
| PDR-031 | Interactive mode: always/missing/never (configurable per project) | User preference respected | G (archon/) | 2026-05-12 |
| PDR-032 | Guide command: phase help with pitfalls, prerequisites, next action | Guided learning, self-service help | G (archon/) | 2026-05-12 |
| PDR-033 | Tutorial: step-by-step navigation with project/template modes | Progressive onboarding | G (archon/) | 2026-05-12 |
| PDR-034 | Doctor: health checks for template integrity, glossary, links, --fix | Proactive validation | G (archon/) | 2026-05-12 |
| PDR-035 | Upgrade: semantic versioning (PATCH/MINOR/MAJOR) | Structured, safe upgrades | G (archon/) | 2026-05-12 |
| PDR-036 | Upgrade: backup before every upgrade, restore from backup | Safe rollback capability | G (archon/) | 2026-05-12 |
| PDR-037 | Upgrade: migration-log.md tracks all upgrades and rollbacks | Full audit trail | G (archon/) | 2026-05-12 |
| PDR-038 | Upgrade: PATCH auto-applied, MINOR requires confirm, MAJOR needs manual guide | Risk-appropriate UX | G (archon/) | 2026-05-12 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| — | *None* | — | — | — |

---

> [← planning/README.md](../../README.md)