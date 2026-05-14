# 🔗 Traceability: 019 - Archon-CLI Improvement Implementation

> [← planning/README.md](../../README.md)

Term and concept traceability for this planning. For global consolidated view, see [`TRACEABILITY-GLOBAL.md`](../../TRACEABILITY-GLOBAL.md).

---

## Phase Code Reference

| Code | Phase |
|------|-------|
| D | Discovery |
| R | Requirements |
| S | Design |
| M | Data Model |
| P | Planning (SDLC phase 5) |
| V | Development |
| T | Testing |
| B | Deployment |
| O | Operations |
| N | Monitoring |
| F | Feedback |
| G | Guides |
| W | Workflow (planning/) |

**Cell values:** `✅` present/correct · `⚠️` needs review · `❌` missing · `N/A` not applicable · *(blank)* not evaluated

---

## Term Matrix

| Term / Concept | D | R | S | M | P | V | T | B | O | N | F | G | W | Notes |
|---------------|---|---|---|---|---|---|---|---|---|---|---|---|---|-------|
| Vitest | | | | | | ✅ | ✅ | | | | | | Scope 1 |
| Mode Detection | | | | | | ✅ | | | | | | | Scope 2 |
| Commander CLI | | | | | | ✅ | | | | | | | Scope 3 |
| Template Lock | | | | | | ✅ | | | | | | | Scope 5 |
| Agent Validation | | | | | | ✅ | | | | | | | Scope 6 |
| TypeScript | | | | | | ✅ | | | | | | | Scope 7 |
| Command Stability | | | | | | | | | | | | ✅ | | Scope 8 |

---

## Decisions Made

| ID | Decision | Rationale | Affects | Date |
|----|----------|-----------|---------|------|
| D001 | Implementar tests con Vitest | Proyecto necesita tests reales paramadurez | Scope 1 | 2026-05-14 |
| D002 | Corregir detectMode antes de ARCHON_DEV_TEMPLATE_PATH | Evitar que dev mode rompa project mode | Scope 2 | 2026-05-14 |
| D003 | Commander como parser único | Eliminar tres fuentes de verdad | Scope 3 | 2026-05-14 |

---

## Residuals

| ID | Term / Issue | Blocker | Status | Target Resolution |
|----|-------------|---------|--------|------------------|
| R001 | Facades en core reexportan infrastructure | Mantener para backward compatibility | Pending | Phase 2 |
| R002 | Commander 14 no permite argumentos posicionales con allowUnknownOption+passThroughOptions | Subcomandos templates/dev no funcionan con argumentos | ✅ Resuelto | Scope 4 - Aplicar enablePositionalOptions() en programa y comandos padres, usar .command() anidado con .argument('[args...]') |

---

> [← planning/README.md](../../README.md)