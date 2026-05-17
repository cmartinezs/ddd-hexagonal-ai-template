# 🔍 DEEPENING: Scope 06 — Verify, Document & Archive

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Verify that the 017 planning defines a coherent local, filesystem-first and adapter-neutral planning contract, update the relevant documentation, and archive the planning only after all scopes have been completed and approved.

**Dependency:** Scopes 01–05 must be DONE.

---

## Verification Focus

| Area | Verification |
|---|---|
| Contract neutrality | No core document requires Archon, TypeScript, Node, Python, Java, HTTP or a daemon |
| Canonical source | Markdown remains the canonical authoring layer |
| Generated artifacts | Indexes and graphs are clearly marked as derived and rebuildable |
| Human governance | Transition requests and approval records are documented |
| Workflow semantics | State-changing workflows use `REQUEST-*` naming and approval behavior |
| Adapter boundary | 018 and future adapters consume the 017 contract instead of defining it |
| Documentation consistency | README, expansion, scopes, traceability and active index agree on naming/status |

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Validate all Scope 01–05 outputs against the 017 acceptance criteria | VALIDATE-PLANNING | PENDING | Validation report |
| 2 | Confirm no Archon-specific commands remain as core 017 requirements | VALIDATE-OUTPUT | PENDING | Adapter-boundary check |
| 3 | Confirm no YAML/JSON-to-Markdown compiler remains required as canonical workflow | VALIDATE-OUTPUT | PENDING | Canonical-source check |
| 4 | Confirm generated artifacts are documented under `.planning/index/v1/` and `.planning/graph/v1/` | VALIDATE-OUTPUT | PENDING | Generated-artifact check |
| 5 | Update `planning/README.md` and `planning/active/README.md` to reflect the final 017 name/status | EXPAND-ELEMENT | PENDING | Planning indexes updated |
| 6 | Update 018 references so Archon is described as an adapter over 017 | EXPAND-ELEMENT | PENDING | 018 dependency clarified |
| 7 | Create final human approval record for archiving 017 | REQUEST-PLANNING-ARCHIVE | PENDING | Approval record |
| 8 | Archive 017 to `finished/` after approval | ADVANCE-PLANNING | PENDING | `finished/017-planning-api/` |

---

## Done Criteria

- [ ] All Scope 01–05 done criteria are completed.
- [ ] 017 documents a serverless, local-first and tool-agnostic contract.
- [ ] Human approval gates are explicitly modeled.
- [ ] Archon-specific implementation is deferred to 018.
- [ ] Generated indexes/graphs are documented as derived artifacts.
- [ ] Planning indexes are updated and consistent.
- [ ] Archive request is approved before the planning is moved to `finished/`.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I11 | Previous verification assumed `_schema/` and `_graph/` as final artifact locations. | Previous `scope-06-verify-archive.md` | RESOLVED IN 017 | Verify `planning/contracts/v1/`, `.planning/index/v1/` and `.planning/graph/v1/` instead. |
| I12 | Previous verification did not include human approval before archiving. | Previous `scope-06-verify-archive.md` | RESOLVED IN 017 | Add explicit archive request and approval record step. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R08 | Full implementation of parser, validator and indexer. | Future implementation planning | DEFERRED |
| R09 | Archon adapter implementation and CLI command UX. | Planning 018 | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
