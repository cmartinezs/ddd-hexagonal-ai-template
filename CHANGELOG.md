# Changelog

All notable changes to this repository are documented here. Ordered from most recent to oldest.

---

## [Unreleased]

### Added (Planning 019 - Archon-CLI Improvements)

- **Testing infrastructure:** Vitest configured with 70 tests covering StateManager, TemplateResolver, Validator, GeneratePhaseUseCase, RunAgentUseCase, ModeDetector
- **Mode detection fix:** Project detection now happens before ARCHON_DEV_TEMPLATE_PATH, fixing dev mode false positives
- **Commander full integration:** Real `.option()` definitions for each command, removed three-sources-of-truth (parseOpts + getArg)
- **Templates command:** `templates remove` fully implemented, `templates update` shows useful status
- **Template lock enhancement:** createTemplateLock() now uses real registry info (source, ref, commitSha)
- **Init agent validation:** Shows agent tiers (✅ supported, 📝 prompt-only, ⏳ planned) and blocks planned agents

### Fixed (Planning 019)

- Commander 14 subcommand argument parsing for templates/dev (enablePositionalOptions() + nested commands)

---

## [2026-05-12] — Archon CLI (Planning 006)

---

## [2026-05-12] — Archon CLI (Planning 006)

### Added

- **`packages/archon-cli/`** — Globally installable Node.js/TypeScript CLI for systematizing the template
- **17 commands:** init, status, next, check, prompt, context, run, agent, prompts, guide, tutorial, doctor, config, upgrade, templates, dev, help
- **Global template cache** at `~/.archon/templates/` — templates resolved at runtime, not copied per project
- **4-mode detection:** user / project / dev / template-cache
- **AI integration:** AgentAdapter interface for opencode, Claude Code, Cursor, Gemini
- **Transport priority:** file-attachment (default) → attach → stdin
- **`archon prompt`:** Rich per-phase prompt generation with template integration
- **`archon context`:** Project analysis, tech stack detection, glossary extraction
- **`archon run`:** Full agent execution pipeline with run tracking
- **`archon guide`:** Phase help with pitfalls, prerequisites, next actions
- **`archon tutorial`:** Step-by-step navigation, project/template modes
- **`archon doctor`:** Template integrity, phase chain, glossary, navigation checks
- **`archon upgrade`:** Semantic versioning (PATCH/MINOR/MAJOR), backup/restore, migration log
- **`archon templates`:** Template cache management (ls/pull/update/remove/doctor)
- **`archon dev`:** Development commands (link-template/unlink-template)
- **`packages/archon-cli/README.md`:** Full CLI documentation
- **`packages/archon-cli/examples/`:** Quick start, full workflow, AI integration, troubleshooting
- **`VERSION`:** Template version file (0.1.0)

### Architecture Decisions

- PDR-022: CLI moved to `packages/archon-cli/` (monorepo with npm workspaces)
- PDR-023: Template resolution via global cache at `~/.archon/templates/`
- PDR-024: Project output in `docs/` per phase
- PDR-025: 4-mode system (user/project/dev/template-cache)
- PDR-026-029: templates/dev/init commands with child folder architecture
- PDR-030-038: Interactive engine, guide/tutor/doctor, upgrade/migration

---

## [2026-05-12] — Workflow Integration & Phase Guidance

### Added

- `planning/WORKFLOWS/05-sdlc-phase-guidance.md` — Per-phase reference for `GENERATE-DOCUMENT` covering all 12 SDLC phases with inputs, boundaries, done criteria, and chain requirements
- 3 new sub-workflows: `[CHECK-PHASE5-CHAIN]`, `[CHECK-DEVWORKFLOW-CONSISTENCY]`, `[CHECK-VERSIONING-ALIGNMENT]`

### Modified

- `planning/GUIDE.md` — Added explicit meta-planning vs. project planning vs. dev workflow distinction
- `planning/PROMPTING.md` — Added Phase 5 and Phase 6 specific prompt templates
- `planning/WORKFLOWS/README.md` — Updated with new file and sub-workflows
- `planning/WORKFLOWS/02-execution-workflows.md` — Phase guidance link added to GENERATE-DOCUMENT
- `planning/WORKFLOWS/04-sub-workflows.md` — 3 new sub-workflows appended
- `01-templates/05-planning/TEMPLATE-018-milestones-proposals.md` — "HITO" replaced with "MILESTONE" throughout
- `01-templates/06-development/workflow/` — Fixed broken navigation links in all 4 README files

---

## [2026-05-11] — Planning System Bootstrap

### Added

- `planning/` — Full meta-planning workflow system (lifecycle, workflows, templates, traceability)
- `planning/WORKFLOWS/` — 12 main workflows + 9 sub-workflows catalog (including 4 SDLC-specific sub-workflows)
- `planning/_template/` — Templates for new plannings (initial, expansion, deepening, traceability, PDR)
- `planning/finished/001-planning-system-bootstrap/` — Bootstrap planning (self-documents this installation)
- `planning/CHANGELOG.md` — Planning system-level changelog
- `CHANGELOG.md` — This file
- `research/planning-workflow-system.md` — Research document extracting best practices from source system

### Modified

- `AGENTS.md` — Added Fundamental Planning Rule, planning directory, bypass parameters (`--no-plan`, `--no-plan-force`), updated directory structure
- `CLAUDE.md` — Added Fundamental Planning Rule, updated directory structure
- `00-guides-and-instructions/README.md` — Added planning execution path (Priority 0), updated Document Index

---

## [2026-04-24] — Template Normalization to English (PR #2)

All remaining Spanish content fragments normalized to English across discovery, requirements, and development phase templates.

### Modified

- `01-templates/01-discovery/` — 6 templates normalized to English
- `01-templates/02-requirements/` — 4 templates normalized to English
- `01-templates/06-development/` — ADR template + API, architecture, auth, and coding sub-directories fully normalized

---

## [2026-04-24] — Enterprise AI-Agent Readiness (PR #1)

Added enterprise governance layer for AI agents operating in this repository.

### Added

- `00-guides-and-instructions/AI-AGENT-READINESS-RECOMMENDATIONS.md` — Enterprise readiness requirements, prioritized backlog, mandatory authoring directive, and Definition of Done per phase

### Modified

- `00-guides-and-instructions/INSTRUCTIONS-FOR-AI.md` — Added mandatory authoring directive
- `00-guides-and-instructions/README.md` — Added readiness guide to index
- `README.md` — Added reference to readiness guide

---

## [2026-04-23] — Document Structure Standard + Full Template Cascade

Unified document structure standard deployed and cascaded across all 12 SDLC phases.

### Added

- `00-guides-and-instructions/DOCUMENT-STRUCTURE-STANDARD.md` — Master reference for all documentation formatting (10 consistency rules, validation checklist, metadata block standard)
- `CLAUDE.md` — AI guidance file for Claude Code agents

### Modified (Phase 0 — Documentation Planning)

- `01-templates/00-documentation-planning/` — Macro plan, SDLC framework, navigation conventions, HOW-TO-USE, PHASE-INPUT clarified and enhanced

### Modified (Phases 1–3)

- `01-templates/01-discovery/` — 6 templates refactored for clarity, consistency, and navigation
- `01-templates/02-requirements/` — 4 templates refactored; traceability matrix enhanced
- `01-templates/03-design/` — 12 templates refactored; system flows, strategic design, bounded contexts, contracts, UI/UX improved

### Modified (Phases 4–6)

- `01-templates/04-data-model/` — 3 templates reformatted to standard
- `01-templates/05-planning/` — Roadmap and epics templates reformatted
- `01-templates/06-development/` — ADR template reformatted

### Modified (Phases 7–11)

- `01-templates/07-testing/` through `01-templates/11-feedback/` — All phase templates updated to unified standard

### Modified (Guides)

- `00-guides-and-instructions/` — AI-AUTONOMOUS-WORKFLOW, AI-WORKFLOW-GUIDE, DATA-FLOW, FAQ, INSTRUCTIONS-FOR-AI, README, SKILLS-AND-PLUGINS-GUIDE, TEMPLATE-ARCHITECTURE, TEMPLATE-USAGE-GUIDE updated for clarity and structure
- `AGENTS.md` — Updated with standard formatting conventions

---

## [2026-04-23] — Initial Project Structure

### Added

- Full initial repository with DDD + Hexagonal Architecture documentation framework
- `00-guides-and-instructions/` — All guide files (AI workflows, instructions, architecture, FAQ, skills, examples)
- `01-templates/` — All phase templates (phases 00–11) with initial content
- `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, `SECURITY.md`, `SETUP-CHECKLIST.md`

---
