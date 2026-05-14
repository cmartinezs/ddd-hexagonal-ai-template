# 🔍 DEEPENING: Scope 01 — Migrate all flag parsing to `commander`

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Remove all manual `process.argv` / string-split argument parsing from `archon.ts` or `bin.ts`. Every command, subcommand, and option must be declared through `commander`'s API, eliminating the inconsistency where some flags work only in certain code paths.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Audit `src/archon.ts` (or `bin.ts`) for manual `process.argv` parsing | GENERATE-DOCUMENT | PENDING | List of manual parsing sites |
| 2 | Create `src/cli/program.ts` as the single `commander` root | GENERATE-DOCUMENT | PENDING | `src/cli/program.ts` created |
| 3 | Register each command via `.command()` with its options via `.option()` | GENERATE-DOCUMENT | PENDING | All commands registered |
| 4 | Delete manual parsing code | GENERATE-DOCUMENT | PENDING | `src/archon.ts`/`bin.ts` cleaned |
| 5 | Verify `archon --help` and each subcommand `--help` produce correct output | GENERATE-DOCUMENT | PENDING | Help output verified |
| 6 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] Zero `process.argv` manual slicing/parsing anywhere in `src/`
- [ ] All commands and options declared via `commander` `.command()` / `.option()`
- [ ] `archon --help` lists all commands
- [ ] `archon <cmd> --help` lists all options for that command
- [ ] `npm run typecheck` exits 0

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

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
