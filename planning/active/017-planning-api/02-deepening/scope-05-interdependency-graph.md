# 🔍 DEEPENING: Scope 05 — Index, Manifest & Interdependency Graph

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Define generated machine-readable artifacts that expose planning state, dependencies, traceability and workflow usage to tools.

These artifacts are derived from canonical Markdown and metadata. They must be rebuildable, versioned, and protected against drift through source hashes, timestamps and validation rules.

---

## Design Constraints

- Generated artifacts are not canonical planning truth.
- Generated artifacts must identify the source files and source hash/commit they were produced from.
- Tools must be able to detect stale index/graph files before acting on them.
- The artifact layout must not be owned by Archon or any other adapter.
- The graph model must support cross-planning dependencies and term traceability.

---

## Artifact Layout

| Path | Purpose | Canonical? |
|---|---|---:|
| `.planning/index/v1/plannings.json` | Snapshot of active/finished planning entities | No |
| `.planning/index/v1/scopes.json` | Snapshot of scopes and statuses | No |
| `.planning/index/v1/tasks.json` | Snapshot of task metadata and evidence | No |
| `.planning/index/v1/workflows.json` | Workflow usage and references | No |
| `.planning/index/v1/manifest.json` | Generation metadata: version, source hash, generatedAt | No |
| `.planning/graph/v1/dependencies.json` | Planning/scope/task dependency graph | No |
| `.planning/graph/v1/traceability.json` | Terms, inconsistencies and residuals graph | No |
| `.planning/reports/*.json` | Validation and drift reports | No |

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define generated index artifact schemas | GENERATE-DOCUMENT | PENDING | Index artifact definitions in `planning/API.md` or contracts |
| 2 | Define generated graph artifact schemas | GENERATE-DOCUMENT | PENDING | Graph artifact definitions |
| 3 | Define `manifest.json` with contract version, generatedAt, source files and source hash/commit | GENERATE-DOCUMENT | PENDING | Manifest schema and example |
| 4 | Define stale artifact detection rules | GENERATE-DOCUMENT | PENDING | Drift detection rules |
| 5 | Define dependency graph node/edge model across plannings, scopes and tasks | GENERATE-DOCUMENT | PENDING | Dependency graph model |
| 6 | Define traceability graph model for terms, inconsistencies and residuals | GENERATE-DOCUMENT | PENDING | Traceability graph model |
| 7 | Document `GET-GRAPH` and `graph.validate` behavior | GENERATE-DOCUMENT | PENDING | Workflow/API entries |
| 8 | Generate example artifacts for 017 as pilot outputs | GENERATE-DOCUMENT | PENDING | Example `.planning/index/v1` and `.planning/graph/v1` artifacts |

---

## Manifest Example

```json
{
  "apiVersion": "planning.local/v1",
  "artifactKind": "planning-index-manifest",
  "generatedAt": "2026-05-14T00:00:00Z",
  "generatedFrom": {
    "sourceRoot": "planning/",
    "commit": "<git-commit-sha>",
    "sourceHash": "<content-hash>"
  },
  "artifacts": [
    ".planning/index/v1/plannings.json",
    ".planning/graph/v1/dependencies.json"
  ]
}
```

---

## Done Criteria

- [ ] Index and graph artifacts are clearly marked as generated and non-canonical.
- [ ] Manifest includes version, generation metadata and source hash/commit.
- [ ] Stale artifact detection is documented.
- [ ] Dependency graph model supports planning, scope and task nodes.
- [ ] Traceability graph model supports terms, inconsistencies and residuals.
- [ ] `GET-GRAPH` and graph validation behavior are documented.
- [ ] 017 has example generated artifacts or documented sample payloads.

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| I09 | Previous target paths used `planning/_graph/` as if generated artifacts lived beside canonical planning docs. | Previous `scope-05-interdependency-graph.md` | RESOLVED IN 017 | Move generated artifacts to `.planning/index/v1/` and `.planning/graph/v1/` to make their generated nature explicit. |
| I10 | Previous scope did not define drift detection for generated graph files. | Previous `scope-05-interdependency-graph.md` | RESOLVED IN 017 | Add manifest and source hash/commit requirements. |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| R07 | Concrete indexer implementation and performance optimization. | Future implementation planning | DEFERRED |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
