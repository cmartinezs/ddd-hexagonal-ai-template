# 🌱 INITIAL: Planning API & Metalanguage

> **Status:** EXPANSION (promoted from Initial)
> [← planning/README.md](../README.md)

---

## Intent

Define a machine-readable API surface and metalanguage for the planning system so programmatic tools can query state, traverse workflows, and advance plannings without human intervention.

---

## Why

The planning system is currently human-authored markdown. Tools that want to participate in the workflow (IDEs, CI pipelines, agents) must parse markdown, understand conventions, and write markdown back — a brittle and redundant layer. A structured API + metalanguage solves this:

- **Plannings** as first-class objects with typed fields and lifecycle transitions.
- **Scopes** as tasks with workflows, dependencies, and resolution paths.
- **Workflows** as a catalog with deterministic inputs and outputs per step type.
- **Traceability** as a typed matrix (terms, inconsistencies, residuals).

---

## Approximate Scope

- [ ] `planning/API.md` — API surface definition (JSON schema + endpoints)
- [ ] `planning/METALANGUAGE.md` — DSL for authoring plannings in YAML/JSON
- [ ] `planning/WORKFLOWS/API.md` — New `QUERY-PLANNING`, `ADVANCE-SCOPE`, `LIST-WORKFLOWS` workflows
- [ ] `planning/_schema/` — JSON schemas per entity type (planning, scope, task, workflow result)

## Related Planning (Separate)

- **[018] — Archon Planning CLI** — Implement `archon planning` command group exposing the API (`packages/archon-cli/src/`). Depends on: 017.

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-14
- **Master plan:** None (root-level improvement)

---

## Next Step

- [ ] Fill `01-expansion.md` with scope breakdown
- [ ] Move to `planning/active/017-planning-api/`

---

> [← planning/README.md](../README.md)