# 🌱 INITIAL: Tutorial — Full Cycle with New Case

> **Status:** INITIAL → EXPANSION
> [← planning/README.md](../../README.md)

---

## Intent

Produce a complete tutorial that demonstrates the DDD + Hexagonal Architecture documentation framework end-to-end, using a **URL Shortener** as the project case. The tutorial covers all 12 SDLC phases with realistic, filled-out documentation outputs.

---

## Why

The repository has templates and guides but no complete example that shows what a fully documented project looks like from Phase 0 to Phase 11. A full-cycle tutorial with a simple, universally understood domain (URL Shortener) gives users a concrete reference they can compare against their own work.

**Why URL Shortener?**
- Domain is simple: one aggregate (`ShortURL`), one core operation (redirect)
- Clear bounded context: easy to apply DDD concepts without overcomplication
- Demonstrates Hexagonal Architecture cleanly: HTTP adapter → domain → storage port
- Short enough to document all phases without becoming a book

---

## Approximate Scope

- [x] `00-guides-and-instructions/` — new `TUTORIAL-FULL-CYCLE.md` guide file
- [x] `01-templates/data-output/` — populated output files for each of the 12 phases
- [ ] `planning/` — this planning only

---

## Initiator

- **Requested by:** human
- **Date:** 2026-05-11
- **Related planning:** none

---

## Next Step

- [x] Dimensioned → proceed to `01-expansion.md`

---

> [← planning/README.md](../../README.md)
