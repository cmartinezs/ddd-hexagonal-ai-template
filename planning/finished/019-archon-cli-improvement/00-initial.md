# 🌱 INITIAL: Archon-CLI Improvement Implementation

> **Status:** Initial
> [← planning/README.md](../../README.md)

---

## Intent

Implementar las mejoras críticas y de alta prioridad identificadas en el análisis de revisión de Archon-CLI.

---

## Why

El análisis de `research/revision-plan-mejora.md` identificó 8 problemas pendientes que bloquean la separación de Archon-CLI como producto independiente. Las tres principales barreras son: tests reales ausentes, mode detection defectuoso con ARCHON_DEV_TEMPLATE_PATH, y Commander implementado a medio camino. Resolver estos problemas permitirá evolucionar de un script interno a un CLI maduro.

---

## Approximate Scope

- [ ] `packages/archon-cli/` — Core improvements: tests, Commander, mode detection
- [ ] `01-templates/06-development/` — Possible updates to development guides if needed
- [ ] `packages/archon-cli/src/infrastructure/` — State, template resolver, validators

---

## Initiator

- **Requested by:** Carlos (human)
- **Date:** 2026-05-14
- **Related planning (if continuation):** none

---

## Next Step

- [ ] When dimensioned → fill `01-expansion.md` and move to `planning/active/`
- [ ] If needs clarification first → document open questions below

### Open Questions

*None yet.*

---

> [← planning/README.md](../../README.md)