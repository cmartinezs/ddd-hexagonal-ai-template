# 🌱 INITIAL: Archon Dependency Modernization

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Replace manual, fragile, or inconsistent implementations with proven libraries that are already declared in the project's dependencies or are widely adopted for their use case.

---

## Why

The CLI has accumulated several reinventions of solved problems:

- `archon.ts` parses flags manually despite `commander` already being a dependency — causing inconsistencies where some flags work only in certain commands.
- `global-cache.ts` compares semver versions with manual `split('.')` instead of the `semver` package that already exists.
- Shell commands are built as string interpolations (injection risk) instead of using `execa`.
- Global cache path is hardcoded as `path.join(homedir(), '.archon')` instead of using `env-paths` for cross-platform correctness.
- Config, state, lock, and registry objects are validated with ad hoc checks instead of schemas.

---

## Changes Needed

### 1 — Full `commander` migration

Remove all manual argument parsing from `archon.ts` / `bin.ts`. Every command and subcommand must be declared through `commander`'s `.command()` / `.option()` API. This eliminates the inconsistency where some flags exist in the binary but not in individual commands.

### 2 — Schema validation with `zod` or `valibot`

Add typed schemas for:
- `ArchonState` (state.json)
- `ArchonConfig` (config.json)
- `TemplateLock` (template.lock.json)
- `TemplateRegistry` (global registry entry)

Parse and validate on read; throw descriptive errors on schema mismatch.

### 3 — `execa` for all subprocess calls

Replace string-interpolated shell commands (`git clone ...`, `opencode ...`, `claude ...`) with `execa` calls. This eliminates shell injection vectors and provides structured error handling.

### 4 — `env-paths` for global cache location

Replace `path.join(homedir(), '.archon')` with `envPaths('archon').data`. This produces the correct platform-specific path:
- Linux: `~/.local/share/archon`
- macOS: `~/Library/Application Support/archon`
- Windows: `%APPDATA%\archon`

### 5 — Consistent `semver` usage

Remove the manual version comparison in `global-cache.ts` (`split('.')` logic). Use `semver.gt()`, `semver.satisfies()`, etc., everywhere version comparisons occur.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/archon.ts` (or `bin.ts`) — full commander migration
- [ ] `packages/archon-cli/src/global-cache.ts` — env-paths, semver, execa
- [ ] `packages/archon-cli/src/state-manager.ts` — zod schema
- [ ] `packages/archon-cli/src/` — all commands using shell strings → execa
- [ ] `packages/archon-cli/package.json` — add `zod` (or `valibot`), `execa`, `env-paths` if not present

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Master plan:** [008](../active/008-archon-improvement-master/README.md)
- **Depends on:** nothing (recommended after 009 for checksum-related schema changes)

---

## Next Step

- [ ] When ready → fill `01-expansion.md` and move to `planning/active/`

---

> [← planning/README.md](../README.md)
