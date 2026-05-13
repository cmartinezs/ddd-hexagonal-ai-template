# Changelog

All notable changes to Archon CLI are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [SemVer](https://semver.org/)

---

## [Unreleased]

### Added
- `archon next --phase <N>` jump detection: warns and asks for confirmation when skipping phases; marks intermediate phases as `skipped` in state
- `archon next --force` and `archon check --force`: skip confirmation prompts for CI and automated workflows
- `archon context inject`: concatenates AI guides from `.archon/guides/` into a single context file (`.archon/context/context.md`) for agent consumption; auto-included in next `archon run` or `archon prompt --context full`
- `docs/commands/` — per-command reference documentation (16 files)
- `docs/guides/real-world-workflow.md` — complete walkthrough with DDD Hexagonal Template

---

## [0.1.0] — 2026-05-12

### Added

**Core commands**
- `archon init [--name] [--agent]` — initialize a project from the DDD Hexagonal AI Template; creates `docs/` structure + `.archon/` state folder; copies template guides to `.archon/guides/`
- `archon status [--json]` — show current phase, progress bar, and per-phase status
- `archon next [--phase <N>]` — advance to the next phase; updates `.archon/state.json`
- `archon check [--phase <N>] [--json]` — validate phase constraints via the phase engine
- `archon prompt [--phase <N>] [--context full|summary|none] [--copy]` — generate structured AI prompt; writes to `.archon/prompts/`

**AI integration**
- `archon context scan` — scan project state and write `.archon/context/context.md` + context-map.json
- `archon run --agent <a> --phase <N> [--dry-run] [--confirm] [--attach <url>]` — execute AI agent via adapter; logs to `.archon/runs/`
- `archon agent [--set <a>] [--doctor] [--agent <a>]` — configure default agent; transport capability check
- Agent adapter pattern: `opencode` (full — file-attachment, attach, stdin), `claude`, `cursor`, `gemini`, `manual`
- Transport priority: file-attachment (default) → attach (persistent server, opencode only) → stdin (experimental)

**Prompt library**
- `archon prompts ls|rank|compress|merge|expand|export|clean` — manage accumulated prompt library in `.archon/prompts/`

**Help and learning**
- `archon guide [--phase <N>]` — contextual help for the current or specified phase
- `archon tutorial [--mode project|template] [--step <N>]` — guided multi-step tutorial
- `archon doctor [--fix]` — health check: state integrity, checksum, config, guides, agent, docs structure

**Configuration**
- `archon config set|get|ls [--key <k>] [--value <v>]` — manage `.archon/config.json` defaults
- `archon upgrade [--target <v>] [--dry-run] [--rollback <v>]` — upgrade template version; safe/breaking change classification; rollback support
- `archon templates ls|pull|update|remove|doctor` — manage global template cache (`~/.archon/templates/`)
- `archon dev link-template|unlink-template|status` — link local template repo for development

**Architecture**
- Globally installable as `@archon/cli` (scoped package; `archon` name on npm is reserved)
- Global template cache at `~/.archon/templates/` — resolved at `archon init` and `archon upgrade`
- State: `.archon/state.json` + SHA-256 checksum (`state.checksum`) for integrity validation
- Mode detection: `project` / `template-dev` / `dev` / `global` — commands behave differently per mode
- 12-phase engine with dependency graph and per-phase validators
- `.archon/template.lock.json` — pinned template version per project

---
