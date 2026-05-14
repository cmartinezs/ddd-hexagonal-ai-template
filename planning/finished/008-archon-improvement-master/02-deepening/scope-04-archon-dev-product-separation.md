# 🔍 DEEPENING: Scope 04 — Archon Dev/Product Mode Separation (012)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 012, execute all its scopes, and archive it as completed. This scope prevents `archon init` from silently using a local template repo in production contexts.

**Child planning:** [`012-archon-dev-product-separation`](../../../012-archon-dev-product-separation/00-initial.md)

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Promote 012 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/012-archon-dev-product-separation/01-expansion.md` |
| 2 | Execute scope: remove ancestor-walk logic from `init` production path | GENERATE-DOCUMENT | DONE | `findLocalTemplate()` removed from `init.ts`; resolver is sole entry point |
| 3 | Execute scope: `ARCHON_DEV_TEMPLATE_PATH` + `dev.json` honored at runtime | GENERATE-DOCUMENT | DONE | `getDevTemplatePath()` reads `dev.json` without startup init |
| 4 | Execute scope: `archon dev link-template/unlink-template/status` already existed | GENERATE-DOCUMENT | DONE | `dev.ts` was already complete; `template-resolver.ts` updated to persist |
| 5 | Execute scope: no silent fallback — error + hint on missing template | GENERATE-DOCUMENT | DONE | `init.ts` error message updated with `archon dev link-template` hint |
| 6 | Archive 012 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/012-archon-dev-product-separation/` |
| 7 | Update indexes (`planning/README.md`, `active/README.md`) | ADVANCE-PLANNING | DONE | indexes updated |

---

## Done Criteria

- [ ] `archon init` without `ARCHON_DEV_TEMPLATE_PATH` or `dev link-template` resolves only from `~/.archon/templates/`
- [ ] `ARCHON_DEV_TEMPLATE_PATH=<path> archon init` uses the specified local path
- [ ] `archon dev link-template <path>` persists the dev path to `.archon/dev.json`
- [ ] `archon dev unlink-template` removes the dev path
- [ ] `archon dev status` shows current template source
- [ ] No silent fallback to local template; missing template source → clear error + hint to `archon templates pull`
- [ ] Planning 012 archived to `finished/`
- [ ] TRACEABILITY.md updated with `product mode` and `dev mode` terms

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
