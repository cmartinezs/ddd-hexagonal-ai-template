# 🌿 EXPANSION: Planning API & Metalanguage (017)

> **Status:** EXPANSION
> [← 00-initial.md](./00-initial.md) | [← planning/README.md](../../README.md)

---

## Goal

Define a machine-readable API surface and metalanguage so external tools (CI, IDEs, custom CLIs) can orchestrate planning workflows programmatically — query state, advance scopes, validate outputs — while humans continue using markdown for manual work.

---

## Two-Layer Architecture

```
Human ──► Markdown + AI prompts
         │
         ▼
External tool ──► JSON API (read/write)
                   │
                   ▼
              Archon planning CLI (018) or other consumers
                   │
                   ▼
              Validation engine
```

Markdown stays as the authoring layer for humans. JSON is the orchestration layer for machines.

---

## Scopes

| # | Scope | Depends On | Description |
|---|-------|------------|-------------|
| 01 | [API Surface & JSON Schemas](02-deepening/scope-01-api-surface.md) | — | JSON schemas for all planning entities; read-only API for tools |
| 02 | [Metalanguage & DSL](02-deepening/scope-02-metalanguage-dsl.md) | S01 | YAML/JSON authoring format that compiles to markdown |
| 03 | [Validation Engine](02-deepening/scope-03-validation-engine.md) | S01 | Schema-validated checklist engine (per task output) |
| 04 | [Workflow Catalog Extensions](02-deepening/scope-04-workflow-extensions.md) | S01 | New workflows: `QUERY-PLANNING`, `ADVANCE-SCOPE`, `LIST-WORKFLOWS`, `VALIDATE-OUTPUT` |
| 05 | [Interdependency Graph](02-deepening/scope-05-interdependency-graph.md) | S01 | Build machine-readable dependency map across all plannings |
| 06 | [Verify + Archive](02-deepening/scope-06-verify-archive.md) | S01–S05 | Build passes, schemas valid, docs updated, archive |

---

## File Targets

| Path | Description |
|------|-------------|
| `planning/_schema/planning.schema.json` | JSON Schema for a planning entity |
| `planning/_schema/scope.schema.json` | JSON Schema for a scope entity |
| `planning/_schema/task.schema.json` | JSON Schema for a task entity |
| `planning/_schema/workflow.schema.json` | JSON Schema for a workflow result |
| `planning/_schema/validation.schema.json` | JSON Schema for validation checklist |
| `planning/API.md` | API reference: query, advance, list, validate endpoints |
| `planning/METALANGUAGE.md` | DSL syntax and authoring guide |
| `planning/WORKFLOWS/API.md` | New workflow definitions |

---

## Open Questions

1. **Validation engine — schema-based or rule-based?**
   - Schema-based: JSON Schema / TypeScript types para validar estructura
   - Rule-based: checklist de condiciones (`doneCriteria`)
   - **Answer: Hybrid** — Schema para estructura + rule-based para contenido semántico
2. **Metalanguage — inline prompts or only metadata?**
   - Only metadata: YAML define qué existe y qué generar, sin prompts
   - Inline prompts: YAML incluye prompts AI como strings
   - **Answer: Metadata + references** — YAML con referencias a prompts en archivos `.md` separados
3. **API — filesystem-based or daemon?**
   - Filesystem-based: leer/escribir JSON directamente en `_schema/` y `_graph/`
   - Daemon: proceso en background con endpoints HTTP/IPC
   - **Answer: Filesystem-based, read-mostly** — herramientas leen de `_schema/` y `_graph/`; writes van solo a los archivos del planning en gestión activa (no a los esquemas/graph)
4. **`archon planning ls` — todos o filtrar?**
   - **Answer: This belongs to planning 018**, no a 017

---

> [← 00-initial.md](./00-initial.md) | [← planning/README.md](../../README.md)