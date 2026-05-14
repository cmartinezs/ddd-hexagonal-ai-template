# 🌱 INITIAL: Archon Dev/Product Mode Separation

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Prevent `archon init` from silently using a local template repo instead of the global cache when run in a normal user context.

---

## Why

`init` currently walks up the filesystem looking for markers (`01-templates`, `.git`, `AGENTS.md`, `00-guides-and-instructions`) to detect a local template. This is useful during development of Archon itself, but as a global product it's dangerous: a user who runs `archon init` inside a folder that happens to be a subdirectory of the DDD template repo will get an init backed by the local clone instead of the cached version, with no warning.

---

## Changes Needed

### 1 — Remove automatic local template detection from production path

The ancestor-walk logic must be removed from the default `init` flow.

In production mode, template resolution order:
1. `ARCHON_DEV_TEMPLATE_PATH` env variable (explicit dev override)
2. Global cache at `~/.archon/templates/` resolved by `template.lock.json`
3. Error — no template found, prompt user to `archon templates pull`

---

### 2 — Gate local template resolution behind explicit dev mode

Provide two explicit dev-mode entry points:

```bash
# Option A: environment variable (CI / scripted)
ARCHON_DEV_TEMPLATE_PATH=../ddd-hexagonal-ai-template archon init --name demo

# Option B: persistent link (interactive dev workflow)
archon dev link-template ../ddd-hexagonal-ai-template
archon dev unlink-template
archon dev status   # shows current template source
```

`archon dev link-template` writes the path to `.archon/dev.json` (project-scoped) or `~/.archon/dev.json` (global). The path is used only when the `dev` marker file exists.

---

### 3 — Silent fallback elimination

Any fallback to a local template that wasn't explicitly configured must print a warning or fail loudly, never silently use an unintended source.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/commands/init.ts` — remove ancestor walk
- [ ] `packages/archon-cli/src/` — template-resolver utility (new or refactored)
- [ ] `packages/archon-cli/src/commands/dev.ts` — `link-template`, `unlink-template`, `status` subcommands
- [ ] `packages/archon-cli/README.md` — document dev mode entry points

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
