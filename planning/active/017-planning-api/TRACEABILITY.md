# 🔗 TRACEABILITY: 017 — Local Planning API & Automation Contract

> [← planning/README.md](../../README.md)

---

## Terms Introduced

| Term | Definition | SDLC Phase |
|------|-----------|-----------|
| Local Planning API | Filesystem-first, transport-neutral contract for querying, validating and requesting changes over planning artifacts | W |
| Automation Contract | Stable payload and semantic contract consumed by tools without owning planning state | W |
| Markdown Canon | Rule that Markdown planning files remain the human-readable source of truth | W |
| Embedded Metadata | Structured machine-readable metadata blocks inside Markdown files | W |
| Command Envelope | Versioned request/response payload shape for query, validate and request operations | W |
| Request Semantics | Rule that state-changing operations are proposed as requests rather than applied silently | W |
| Human Gate | Explicit approval mechanism for sensitive lifecycle transitions | W |
| Adapter Boundary | Separation between the neutral planning core and tool-specific consumers such as Archon, Task, just, Make, CI or IDEs | W |
| Generated Index | Rebuildable JSON snapshot derived from canonical Markdown planning files | W |
| Interdependency Graph | Rebuildable graph of planning, scope, task, workflow and traceability relationships | W |
| Drift Detection | Validation mechanism that detects stale generated artifacts through source hash/commit metadata | W |
| Schema Registry | Versioned manifest under `planning/contracts/v1/` for all contract schemas | W |

---

## Reframed Terms

| Previous Term | New Term / Interpretation | Reason |
|---|---|---|
| Planning API | Local Planning API / Automation Contract | Avoids implying a server or HTTP endpoint |
| Metalanguage | Markdown Metadata & Optional Import/Export | Avoids making YAML/JSON a second source of truth |
| Validation engine | Validation Engine & Human Gates | Adds governance and approval semantics |
| Dependency graph | Generated Index & Interdependency Graph | Clarifies generated/non-canonical nature |
| Schema registry | Versioned Contract Registry | Moves canonical schemas to `planning/contracts/v1/` |

---

## Key Decisions Trace

| Decision | Related Scope | Effect |
|---|---|---|
| Markdown remains canonical | S02 | Tools derive from Markdown instead of replacing it |
| Archon is an adapter | S01, S03, S04, S06 | 017 stays agnostic; 018 implements Archon-specific CLI behavior |
| State changes use request semantics | S01, S03, S04 | Agents/tools cannot bypass human lifecycle control |
| Generated artifacts are rebuildable | S05 | Indexes and graphs are not independent truth |
| Contract is transport-neutral | S01, S04 | Filesystem/stdin/stdout, CLI and HTTP adapters can coexist |

---

> [← planning/README.md](../../README.md)
