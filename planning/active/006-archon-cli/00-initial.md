# 🌱 INITIAL: 006 — Archon CLI

> **Status:** INITIAL → EXPANSION
> [← planning/README.md](../README.md)

---

## Intent

Build `Archon` — a CLI tool that systematizes the use of the DDD + Hexagonal AI Template through structured commands, phase enforcement, AI agent integration (opencode primary), and upgrade/migration support. Archon lives inside the template (`00-guides-and-instructions/archon/`) and enforces the workflow for both template development and real project execution.

---

## Why

The template has documented workflows and AI prompts, but they are not systematized into a tool that enforces them. Teams manually track phase progress, copy-paste prompts, and rely on discipline to follow the SDLC chain. Archon transforms the template into an **operational system** where:

- The CLI knows where you are in the development
- Phase constraints are enforced with warnings and confirmations
- AI agent prompts are generated automatically with full context
- Template upgrades are handled gracefully with rollback support

**Differentiator from 003/004/005:**
- 003/004/005 = documentation of the template (static guides)
- 006 = operational system (CLI tool) that uses the template

---

## Approximate Scope

- [ ] `00-guides-and-instructions/archon/` — CLI tool (Node.js/TypeScript)
- [ ] `01-templates/` — no structural changes (Archon reads, never modifies template structure)
- [ ] `planning/` — this planning only

---

## Initiator

- **Requested by:** human
- **Date:** 2026-05-12
- **Related planning:** 005 (tutorial step files integrated into Archon guide)

---

## Decisions Made (Pre-Expansion)

| ID | Decision | Rationale |
|----|----------|-----------|
| PDR-010 | Name: **Archon** | From Greek `ἄρχων` — "the one who rules." Commands respect for the framework. |
| PDR-011 | Project init: sibling folder + switch prompt | Template remains clean; project is a sibling directory. After init, prompt: "Switch to project directory?" |
| PDR-012 | State storage: `.archon/state.json` + `.archon/state.checksum` (SHA-256) | Human + AI readable, checksum detects involuntary modifications. |
| PDR-013 | Agent config: per project in `.archon/config.json` | Each project can have its own agent preference. |
| PDR-014 | Phase enforcement: warning + confirmation (not strict blocking) | Any action outside current phase scope triggers warning. |
| PDR-015 | Prompt output: file-based in `.archon/prompts/` | `archon prompt` writes to `.archon/prompts/phase-N-<timestamp>.md` |
| PDR-016 | Prompts accumulated: `archon prompts ls|compress|rank|merge|expand <id>` | Users accumulate a prompt library; tools to manage it. |
| PDR-017 | First-interactive: required params missing → interactive mode | Configurable defaults via `archon config set`. |
| PDR-018 | Template versioning: semantic (MAJOR.MINOR.PATCH) | Major upgrades require migration guide + confirmation. |
| PDR-019 | Upgrade behavior: auto-apply safe changes, warn on breaking | Breaking changes show guide + require explicit confirmation. |
| PDR-020 | Migration files: `CHANGELOG.md` + `UPGRADE/` subfolder in template root | Both changelog + per-version upgrade guides. |
| PDR-021 | Rollback support: `archon upgrade --rollback <version>` | Full rollback of template files + state to previous version. |

---

## Next Step

- [x] Dimensioned → proceed to `01-expansion.md`

---

> [← planning/README.md](../README.md)