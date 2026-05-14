# 🌱 INITIAL: Archon Planning CLI

> **Status:** Initial
> [← planning/README.md](../README.md)

---

## Intent

Implement the `archon planning` command group that exposes the Planning API and metalanguage to CLI users and programmatic tools. This gives Archon a first-class interface to the planning system — query state, advance scopes, list workflows — without needing to parse markdown manually.

---

## Why

After 017 defines the API surface and metalanguage, something needs to consume it. The natural consumer is Archon itself. A `archon planning` subcommand group lets users and automated pipelines interact with the planning system the same way they interact with every other Archon command: through a typed CLI.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/cli/commands/planning/` — command group with `ls`, `get`, `advance`, `workflows` subcommands
- [ ] `packages/archon-cli/src/core/planning-api.ts` — client that reads/writes planning files via JSON schemas
- [ ] `packages/archon-cli/docs/commands/planning.md` — reference documentation for the command group
- [ ] `packages/archon-cli/README.md` — document the command group

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-14
- **Depends on:** [017](../017-planning-api/00-initial.md) (API surface must be defined first)

---

## Next Step

- [ ] Wait for 017 to reach EXPANSION or DEEPENING
- [ ] Then fill `01-expansion.md` and move to `planning/active/018-archon-planning-cli/`

---

> [← planning/README.md](../README.md)