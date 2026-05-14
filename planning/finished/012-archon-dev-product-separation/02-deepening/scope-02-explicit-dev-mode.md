# 🔍 DEEPENING: Scope 02 — Implement explicit dev-mode entry points

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Provide two explicit ways to point Archon at a local template repo during development, replacing the removed ancestor-walk with intentional, visible dev-mode activation.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Read `ARCHON_DEV_TEMPLATE_PATH` env variable in template resolver; use it as template source when set | GENERATE-DOCUMENT | PENDING | Template resolver updated |
| 2 | `archon dev link-template <path>`: write path to `.archon/dev.json`; validate path exists | GENERATE-DOCUMENT | PENDING | `src/commands/dev.ts` updated |
| 3 | `archon dev unlink-template`: delete `.archon/dev.json` | GENERATE-DOCUMENT | PENDING | `src/commands/dev.ts` updated |
| 4 | `archon dev status`: show current template source (env var / dev.json / global cache / none) | GENERATE-DOCUMENT | PENDING | `src/commands/dev.ts` updated |
| 5 | Template resolver reads `.archon/dev.json` path if present (lower priority than env var) | GENERATE-DOCUMENT | PENDING | Template resolver updated |
| 6 | Update `packages/archon-cli/README.md`: document dev mode entry points | EXPAND-ELEMENT | PENDING | README updated |
| 7 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `ARCHON_DEV_TEMPLATE_PATH=<path> archon init` uses the specified path as template source
- [ ] `archon dev link-template <path>` writes to `.archon/dev.json`; subsequent `archon init` uses it
- [ ] `archon dev unlink-template` removes `.archon/dev.json`
- [ ] `archon dev status` reports the active template source clearly
- [ ] Template resolver priority: env var > `.archon/dev.json` > global cache > error
- [ ] README documents both dev-mode entry points with examples
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
