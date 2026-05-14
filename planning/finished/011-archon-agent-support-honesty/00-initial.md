# 🌱 INITIAL: Archon Agent Support Honesty

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Align what Archon declares as "supported agents" and "available commands" with what is actually implemented, so no accepted user input leads to a silent runtime failure.

---

## Why

`AgentAdapterFactory` only registers `opencode` and `claude`. Yet the README, type definitions, and `archon agent --set` accept `cursor` and `gemini`. Running `archon run` after `archon agent --set cursor` fails at runtime because no adapter exists.

Similarly, several commands are partially implemented (`templates update`, `templates remove`, `check --fix`) but are presented as production-ready. This erodes trust in the CLI.

---

## Changes Needed

### 1 — Three-tier agent support model

Introduce a formal classification in the codebase and surfaced in `archon agent`:

| Tier | Agents | Behavior |
|------|--------|---------|
| `supported` | `opencode`, `claude` | Full adapter — `archon run` works |
| `prompt-only` | `manual` | Generates prompt, prints it, asks user to paste |
| `planned` | `cursor`, `gemini` | Accepted by `--set` but `archon run` prints a clear "not yet implemented" message and exits 1 |

**Files:** `AgentAdapterFactory`, type definitions, `archon agent --set` validation

---

### 2 — Experimental command markers

Commands or subcommands that are partially implemented must be marked explicitly:

- In `--help` output: append `[experimental]` or `[planned]` to the description
- In README: separate table for experimental commands
- `templates remove` — mark as `[planned]` or hide behind `--experimental` flag
- `check --fix` — mark as `[experimental]` while the TODO remains

---

## Approximate Scope

- [ ] `packages/archon-cli/src/` — AgentAdapterFactory, agent command, run command
- [ ] `packages/archon-cli/src/commands/templates.ts` — mark `remove` as planned
- [ ] `packages/archon-cli/src/commands/check.ts` — mark `--fix` as experimental
- [ ] `packages/archon-cli/README.md` — reflect tier model and experimental markers

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Master plan:** [008](../active/008-archon-improvement-master/README.md)
- **Depends on:** nothing

---

## Next Step

- [ ] When ready → fill `01-expansion.md` and move to `planning/active/`

---

> [← planning/README.md](../README.md)
