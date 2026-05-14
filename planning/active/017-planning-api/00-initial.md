# 🌱 INITIAL: Planning Local API & Automation Contract

> **Status:** REFRAMED → DEEPENING
> [← planning/README.md](../README.md)

---

## Intent

Define a local, filesystem-first and machine-readable contract for the planning system so humans, AI agents and automation tools can collaborate over the same planning artifacts without introducing a mandatory server, daemon, runtime or CLI dependency.

The planning system remains human-governed: tools may query state, validate outputs and request transitions, but sensitive state changes must remain explicit and auditable.

---

## Why

The planning system is currently human-authored Markdown. That is valuable because it keeps the process simple, reviewable and editable without tooling. However, automation tools, IDE integrations, CI jobs or AI agents need a stable way to understand the planning state without guessing from Markdown tables and ad-hoc conventions.

The goal of 017 is not to replace Markdown with a proprietary runtime. The goal is to define a neutral integration layer around it:

- **Markdown remains the canonical authoring layer** for humans and reviews.
- **Structured metadata and JSON contracts expose planning state** for tools.
- **Generated indexes and graphs are derived artifacts**, not the source of truth.
- **Automation tools are adapters**, not owners of the planning model.
- **Human approval gates protect state transitions** such as advancing scopes or archiving plannings.

---

## Approximate Scope

- [ ] `planning/contracts/v1/` — Versioned JSON schemas and command envelopes for planning integration.
- [ ] `planning/API.md` — Local contract reference: query, validate and request-oriented commands.
- [ ] `planning/METALANGUAGE.md` — Metadata conventions for Markdown-authored plannings; optional import/export formats only.
- [ ] `planning/WORKFLOWS/API.md` — Tool-facing workflows such as `QUERY-PLANNING`, `VALIDATE-OUTPUT`, `REQUEST-SCOPE-ADVANCE` and `LIST-WORKFLOWS`.
- [ ] `.planning/index/v1/` — Generated planning index artifacts.
- [ ] `.planning/graph/v1/` — Generated dependency graph artifacts.
- [ ] `planning/approvals/` or equivalent — Human approval records for sensitive transitions.

---

## Architectural Boundary

This planning defines the **core planning contract** only. It must stay agnostic to the automation mechanism that consumes it.

Examples of valid consumers:

- Archon planning CLI.
- Claude Code, Codex, Copilot or other AI-agent workflows.
- Task, just, Make or shell scripts.
- CI jobs.
- IDE extensions.
- Future local or HTTP adapters.

All consumer-specific behavior belongs outside this planning, in adapter-specific planning work such as 018.

---

## Related Planning

- **[018] — Archon Planning CLI** — Implements an Archon adapter over the neutral planning contract. Depends on 017, but must not define the 017 core model.

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-14
- **Master plan:** None (root-level improvement)

---

## Next Step

- [ ] Refine `01-expansion.md` as the formal architectural design for the local planning contract.
- [ ] Align all deepening scopes with the agnostic, serverless and human-governed architecture.

---

> [← planning/README.md](../README.md)
