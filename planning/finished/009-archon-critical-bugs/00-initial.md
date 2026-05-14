# 🌱 INITIAL: Archon Critical Bugs

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Fix three compilation and runtime bugs in `packages/archon-cli` that cause silent failures or false integrity errors in any production build.

---

## Why

These bugs affect core infrastructure. Left unfixed, they can break `npm run build`, produce false state corruption errors on every run, and make the validator silently skip dependency checks. They should be resolved before any other improvement is layered on top.

---

## Bugs to Fix

### Bug 1 — `migration-manager.ts` does not compile under strict TypeScript

**File:** `packages/archon-cli/src/migration-manager.ts`

`loadChangelog(_from, _to)` names parameters `_from`/`_to` but references `from`/`to` inside the method body. Under `strict` + `noUnusedLocals` + `noImplicitReturns` this fails to compile.

**Fix:**
- Rename parameters to `from`/`to`
- Replace inline regex interpolation with `new RegExp(...)` construction

---

### Bug 2 — `Validator.checkDependencies()` validates the wrong path

**File:** `packages/archon-cli/src/validator.ts`

`checkPhaseFiles()` correctly searches `docs/<phase.folder>`. `checkDependencies()` searches `<project>/<dep.folder>` and expects a `.status` file — a path that is never created by `archon init`.

**Fix:**
- Validate dependency completion against `state.phases[dep].status` (not filesystem `.status`)
- If documentary evidence is needed, check `docs/<dep.folder>/` existence

---

### Bug 3 — `StateManager` checksum produces false integrity failures

**File:** `packages/archon-cli/src/state-manager.ts`

`save()` computes checksum from `stateContent` (no trailing newline), but writes the file with a trailing newline. `validate()` reads the full file content (with newline) and compares against stored checksum → always mismatch.

Secondary issue: checksum is stored both inside `state.json` (as a field of `ArchonState`) and in `state.checksum`, creating a circular hash.

**Fix:**
- Remove `checksum` from the `ArchonState` interface and `state.json`
- Store checksum only in `state.checksum` (external file)
- Compute checksum from canonical JSON (deterministic serialization, no checksum field, no trailing newline)

---

## Approximate Scope

- [ ] `packages/archon-cli/src/migration-manager.ts`
- [ ] `packages/archon-cli/src/validator.ts`
- [ ] `packages/archon-cli/src/state-manager.ts`
- [ ] `packages/archon-cli/src/types.ts` — remove `checksum` from `ArchonState`

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
