# 🌱 INITIAL: Archon Improvement Master Plan

> **Status:** EXPANSION (promoted from Initial)
> [← planning/README.md](../../README.md)

---

## Intent

Stabilize and extend Archon CLI so it can operate as a reliable, self-contained global product — independent of the template repo's local filesystem.

---

## Why

Archon was built rapidly inside the DDD template repo and has accumulated bugs, inconsistencies, and design shortcuts that make it unreliable as a global product:

- Critical compilation bugs block production builds.
- Declared features (agents, commands) don't match what's actually implemented.
- Template versioning is not reproducible.
- `init` accidentally uses local repo instead of global cache.
- Business logic is tangled inside commands, making testing and extension hard.

The document `research/planes-de-mejora.md` catalogs all issues with precise diagnosis and recommended corrections.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/` — TypeScript source fixes, refactoring, new commands
- [ ] `packages/archon-cli/README.md` — align with real behavior after fixes
- [ ] `planning/` — 8 individual planning stubs created and tracked

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Related planning:** 006 (Archon CLI — predecessor)

---

## Next Step

- [x] Promoted to EXPANSION — see `01-expansion.md`

---

> [← planning/README.md](../../README.md)
