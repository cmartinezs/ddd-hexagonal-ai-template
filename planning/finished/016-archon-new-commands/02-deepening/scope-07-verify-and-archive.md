# 🔍 DEEPENING: Scope 07 — Verify Build + Update Docs + Archive 016

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Final verification pass: all new commands work, build passes, README updated, planning 016 archived.

**Dependency:** Scopes 01–06 must be DONE.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Run `npm run typecheck` and `npm run build` — must exit 0 | GENERATE-DOCUMENT | ✅ DONE | Clean build |
| 2 | Smoke-test each new command: `archon generate`, `review`, `trace`, `diff`, `quality`, `doctor --ci` | GENERATE-DOCUMENT | ✅ DONE | All commands run without crash |
| 3 | Update `packages/archon-cli/README.md` — list all new commands | EXPAND-ELEMENT | ✅ DONE | README updated |
| 4 | Archive 016 to `finished/`: move folder, update `finished/README.md` | ADVANCE-PLANNING | PENDING | `finished/016-archon-new-commands/` |
| 5 | Update `planning/README.md` and `active/README.md` — remove 016 from active | ADVANCE-PLANNING | PENDING | Indexes updated |
| 6 | Update `008` master plan — mark 016 as COMPLETED | ADVANCE-PLANNING | PENDING | `008/README.md` updated |

---

## Done Criteria

- [ ] All 6 new commands listed in `archon --help`
- [ ] `npm run typecheck` and `npm run build` exit 0
- [ ] `packages/archon-cli/README.md` documents new commands
- [ ] Planning 016 archived to `finished/`
- [ ] TRACEABILITY.md updated

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
