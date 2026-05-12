# 🔍 DEEPENING: Scope 01 — CLI Project Scaffold

> **Status:** DONE (2026-05-12)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Create the Archon CLI project scaffold: `package.json`, TypeScript configuration, bin entry point, and basic shell that responds to `--help`. This scope produces a working CLI that can be executed, even if all commands are stubs at this stage.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `00-guides-and-instructions/archon/package.json` | GENERATE-DOCUMENT | DONE | `package.json` with dependencies |
| 2 | Create `tsconfig.json` with strict mode | GENERATE-DOCUMENT | DONE | `tsconfig.json` |
| 3 | Create `bin/archon.ts` entry point with shebang | GENERATE-DOCUMENT | DONE | `bin/archon.ts` |
| 4 | Create command router (parse args, dispatch to commands) | GENERATE-DOCUMENT | DONE | `src/commands/router.ts` |
| 5 | Create stub commands (init, status, check, prompt, etc.) | GENERATE-DOCUMENT | DONE | `src/commands/` stubs |
| 6 | Create `src/core/` folder structure | GENERATE-DOCUMENT | DONE | Core module folders |
| 7 | Create `src/ui/` folder structure | GENERATE-DOCUMENT | DONE | UI module folders |
| 8 | Verify `archon --help` works | GENERATE-DOCUMENT | DONE | CLI executable |

---

## Done Criteria

- [x] `package.json` has: name `archon`, version `0.1.0`, description, main entry, bin script, dependencies (commander/yargs/ts-node), devDependencies (typescript, @types)
- [x] `tsconfig.json` has: strict mode, ES2020 target, outDir `dist/`
- [x] `bin/archon.ts` has: shebang `#!/usr/bin/env node`, imports router
- [x] `src/commands/router.ts` has: argument parsing, command dispatch, help text
- [x] All 10 commands exist as stubs: `init`, `status`, `next`, `check`, `prompt`, `prompts`, `guide`, `tutorial`, `agent`, `config`, `doctor`, `upgrade`
- [x] `archon --help` outputs help text with all commands listed
- [x] `archon --version` outputs `0.1.0`
- [x] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)