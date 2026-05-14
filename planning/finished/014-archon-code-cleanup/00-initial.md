# 🌱 INITIAL: Archon Code Cleanup

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Remove dead code, duplicated logic, and internal inconsistencies left behind after the bug fixes in 009 and 012 are applied.

---

## Why

After fixing the checksum model (009) and the dev/product separation (012), several code artifacts become either dead or incorrect:

- `promptForMissing()` in `state-manager.ts` duplicates interactive prompting that is already handled by `inquirer`/`FirstInteractive` flows.
- A local `PHASES` constant in `next.ts` shadows the canonical `phaseEngine` — two sources of truth for phase definitions.
- The `checksum` field inside `ArchonState` (removed in 009) may leave residual references.
- The silent local-template fallback (removed in 012) may leave guard conditions that are now always-false dead branches.

Cleanup should happen after 009 and 012 are merged, not before — otherwise the cleanup touches in-flight code.

---

## Changes Needed

### 1 — Remove `promptForMissing()` from `state-manager.ts`

`promptForMissing()` was an early scaffold for interactive recovery of missing state fields. It is now superseded by `FirstInteractive` / `inquirer` flows in the command layer. Remove the function and update any callers to go through the proper interactive flow.

### 2 — Remove local `PHASES` array in `next.ts`

`next.ts` defines its own `PHASES` constant for phase label lookups. This duplicates `phaseEngine.getPhase()` / `phaseEngine.getAllPhases()`. Replace all usages with `phaseEngine` and delete the local constant.

### 3 — Remove `checksum` field residuals

After plan 009 removes `checksum` from `ArchonState`, scan for any lingering references to `state.checksum` as a field of the state object (vs `state.checksum` as an external file), and clean them up.

### 4 — Remove dead template-fallback branches

After plan 012 removes the ancestor-walk logic from `init`, audit the codebase for `if (localTemplatePath)` guards that are now unreachable and delete them.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/state-manager.ts`
- [ ] `packages/archon-cli/src/commands/next.ts`
- [ ] Any file referencing removed `ArchonState.checksum`
- [ ] `packages/archon-cli/src/commands/init.ts` — dead branches after 012

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Master plan:** [008](../active/008-archon-improvement-master/README.md)
- **Depends on:** [009](../009-archon-critical-bugs/00-initial.md) (checksum removal), [012](../012-archon-dev-product-separation/00-initial.md) (template fallback removal)

---

## Next Step

- [ ] Wait for 009 and 012 to complete
- [ ] Then fill `01-expansion.md` and move to `planning/active/`

---

> [← planning/README.md](../README.md)
