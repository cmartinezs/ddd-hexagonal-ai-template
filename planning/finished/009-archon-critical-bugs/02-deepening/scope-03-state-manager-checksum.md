# 🔍 DEEPENING: Scope 03 — Fix `StateManager` checksum circularity

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Eliminate the circular checksum model: remove `checksum` from `ArchonState` / `state.json`, keep only `state.checksum` as an external file, and compute it from canonical normalized JSON to eliminate newline mismatch false failures.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Remove `checksum` field from `ArchonState` interface in `src/types.ts` | GENERATE-DOCUMENT | DONE | `src/types.ts` updated |
| 2 | Update `StateManager.save()`: compute checksum from `JSON.stringify(state)` (no checksum field) with no trailing newline | GENERATE-DOCUMENT | DONE | `src/state-manager.ts` updated |
| 3 | Update `StateManager.validate()`: `.trim()` before computing hash | GENERATE-DOCUMENT | DONE | `src/state-manager.ts` updated |
| 4 | Scan entire `src/` for any remaining `state.checksum` object field references | GENERATE-DOCUMENT | DONE | None found (only file path in mode-detector.ts) |
| 5 | Run `npm run typecheck` as final gate | GENERATE-DOCUMENT | DONE | Exit 0 |

---

## Done Criteria

- [ ] `ArchonState` has no `checksum` field
- [ ] `state.json` on disk never includes a `checksum` property
- [ ] `state.checksum` (external file) is computed from canonical JSON: `JSON.stringify(state, null, 2)` with deterministic ordering and no trailing newline
- [ ] `validate()` computes the same canonical form before comparing — no newline mismatch
- [ ] No code reads `someState.checksum` as an object property anywhere in `src/`
- [ ] `npm run typecheck` exits 0
- [ ] `npm run build` exits 0

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
