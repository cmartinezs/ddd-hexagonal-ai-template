# 🌱 INITIAL: Archon New Commands

> **Status:** EXPANSION (promoted from Initial — 2026-05-14)
> [← planning/README.md](../../README.md)

---

## Intent

Extend Archon from "CLI that organizes documentation" to "AI lifecycle orchestrator" by adding six high-value commands that automate quality, traceability, and upgrade analysis.

---

## Why

After the architectural refactoring (015), the codebase will have clean use cases and well-defined domain boundaries. This is the right moment to add new commands without technical debt. Each proposed command addresses a recurring pain point in AI-assisted documentation workflows:

- Teams don't know which files to create for each phase → `archon generate`
- Teams can't tell if their documentation is complete or coherent → `archon review`, `archon quality`
- Traceability matrices are maintained manually → `archon trace`
- Upgrade impact is unknown before migrating → `archon diff`
- CI pipelines can't use `archon doctor` because it's interactive → `archon doctor --ci`

---

## Commands to Implement

### `archon generate phase <N>`

Generate base documentation files for phase N from the template into `docs/<phase-folder>/`. Skips files that already exist unless `--force`. Useful when starting a phase without running the full AI prompt flow.

### `archon review --phase <N>`

Analyze documentation quality for phase N. Checks: completeness (all required sections present), ambiguity markers (TBD, TODO, placeholder text), traceability references (Discovery referenced from Requirements, etc.), RF/RNF/CU mixing.

Output: scored report per file with actionable issues.

### `archon trace`

Build a cross-phase traceability matrix automatically by scanning `docs/` for declared terms, IDs, and references. Output as markdown table or JSON.

Maps: Discovery → Requirements → Design → Development → Tests → Monitoring.

### `archon diff --template <from>..<to>`

Compare two template versions and show what changes would impact a project if it upgrades. Output: added files, removed files, modified sections, breaking changes.

This runs against the global cache — no network call needed if both versions are cached.

### `archon quality`

Project health score: how many phases are complete, how many documents are empty or have placeholder text, how many references are broken, how many requirements have no linked tests, how many decisions have no ADR.

Output: summary score + breakdown by phase + prioritized issue list.

### `archon doctor --ci`

Non-interactive version of `archon doctor`. Exits 0 if everything is healthy, 1 if issues are found. Prints structured output (JSON with `--json`). Suitable for CI/CD pipelines.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/application/` — one use case per command
- [ ] `packages/archon-cli/src/cli/commands/` — one command file per entry
- [ ] `packages/archon-cli/src/domain/` — quality scoring, traceability scanning, diff logic
- [ ] `packages/archon-cli/README.md` — document new commands
- [ ] `packages/archon-cli/docs/commands/` — one reference file per new command

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Master plan:** [008](../active/008-archon-improvement-master/README.md)
- **Depends on:** [015](../015-archon-architectural-refactoring/00-initial.md) (clean architecture required)

---

## Next Step

- [ ] Wait for 015 to complete
- [ ] Then fill `01-expansion.md` and move to `planning/active/`

---

> [← planning/README.md](../README.md)
