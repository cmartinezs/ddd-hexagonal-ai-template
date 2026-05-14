# 🌱 INITIAL: Archon Versioning & Upgrade Fix

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Make template versioning fully reproducible and ensure `archon upgrade` leaves the project lock in a consistent state.

---

## Why

Currently `archon templates pull id@version` does not parse the `id@version` syntax and does not checkout the specific tag — it always clones the default branch. A user can believe they installed `0.1.0` while actually running whatever was on `main` at clone time.

Similarly, `archon upgrade` calls `updateTemplateLock()` which only updates `version` and `resolvedAt` but leaves `cachePath`, `ref`, `source`, and `commitSha` pointing at the old version. This means the lock file is internally inconsistent after every upgrade.

---

## Bugs to Fix

### Bug 1 — `templates pull` ignores version

**File:** `packages/archon-cli/src/commands/templates.ts` (or `global-cache.ts`)

Current: `args[0]` = target, `args[1]` = version (separate positional), no `id@version` parsing, `git clone --depth 1` without tag checkout.

**Fix:**
- Parse `id@version` from first argument (split on `@`)
- After clone, execute `git checkout refs/tags/v<version>` (or the resolved tag)
- Save `commitSha` by reading `git rev-parse HEAD` after checkout
- Fail with a clear error if the tag does not exist

---

### Bug 2 — `upgrade` writes an incomplete lock

**File:** `packages/archon-cli/src/migration-manager.ts`

`updateTemplateLock()` mutates only `version` and `resolvedAt`.

**Fix:** After resolving the target version in global cache, write the full lock:

```json
{
  "id": "<template-id>",
  "version": "<new-version>",
  "source": "<git-url>",
  "ref": "v<new-version>",
  "commitSha": "<sha>",
  "cachePath": "<resolved-cache-path>",
  "resolvedAt": "<iso-timestamp>"
}
```

Fail the upgrade if the target template version is not in cache — force the user to `archon templates pull id@version` first.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/` — templates command, global-cache, migration-manager
- [ ] `packages/archon-cli/src/types.ts` — `TemplateLock` interface (ensure all fields required)

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
