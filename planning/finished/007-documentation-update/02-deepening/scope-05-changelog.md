# 🔍 DEEPENING: Scope 05 — archon-cli CHANGELOG.md

> **Status:** DONE (2026-05-13)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Create `packages/archon-cli/CHANGELOG.md` covering the full development history of the CLI (post-006 planning) through the current state, including the new features from planning 007.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `packages/archon-cli/CHANGELOG.md` following Keep a Changelog format | GENERATE-DOCUMENT | DONE | `packages/archon-cli/CHANGELOG.md` |

---

## Content Structure

```markdown
# Changelog

All notable changes to Archon CLI are documented here.
Format: [Keep a Changelog](https://keepachangelog.com) · Versioning: SemVer

## [Unreleased]
### Added
- `archon next --phase N` with jump detection and skipped-phase marking
- `archon next --force` / `archon check --force` for automated workflows
- `archon context inject` — concatenate guides into a single AI context file

## [0.1.0] — 2026-05-12
### Added
- Initial release: `archon init`, `status`, `check`, `next`, `prompt`, `context scan`
- `archon run` with agent adapter pattern (opencode, claude, cursor, gemini, manual)
- `archon prompts` (ls, compress, rank, merge, expand)
- `archon guide`, `archon tutorial`, `archon doctor`
- `archon config`, `archon upgrade`, `archon templates`, `archon dev`
- Global template cache (`~/.archon/templates/`)
- State management (`.archon/state.json` + SHA-256 checksum)
- 12-phase engine with dependency graph and validators
- AI guide injection on init and run
```

---

## Done Criteria

- [ ] `packages/archon-cli/CHANGELOG.md` exists
- [ ] `[Unreleased]` section documents the three new features from this planning
- [ ] `[0.1.0]` section covers the full initial feature set from planning 006
- [ ] Format follows Keep a Changelog conventions
- [ ] TRACEABILITY.md updated

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet* | — | — | — |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)
