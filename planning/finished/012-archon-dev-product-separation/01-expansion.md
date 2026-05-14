# 🚀 EXPANSION: Archon Dev/Product Mode Separation

> **Status:** Deepening
> [← planning/README.md](../../README.md)

---

## Scope Summary

| # | Scope | SDLC Phase(s) | Depends On | Status |
|---|-------|--------------|------------|--------|
| 01 | Remove ancestor-walk from `init` production path | V | — | IN PROGRESS |
| 02 | Implement explicit dev-mode entry points | V | 01 | IN PROGRESS |

---

## Dependency Map

```mermaid
flowchart LR
    S01["Scope 01: remove ancestor-walk"] --> S02["Scope 02: explicit dev mode"]
```

Scope 02 builds on Scope 01 — the dev-mode entry points replace what Scope 01 removes.

---

## Impact per SDLC Phase

| Phase Code | Affected? | What changes |
|-----------|----------|-------------|
| V | ☑ | `src/commands/init.ts`, template-resolver utility, `src/commands/dev.ts` |
| G | ☑ | `packages/archon-cli/README.md` — document dev mode entry points |
| W | ☑ | Planning 012 promoted, deepening files created |

---

> [← planning/README.md](../../README.md)
