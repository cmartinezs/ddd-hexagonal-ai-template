# 🔗 TRACEABILITY: 008 — Archon Improvement Master Plan

> [← planning/README.md](../../README.md)

---

## Terms Introduced

| Term | Definition | SDLC Phase |
|------|-----------|-----------|
| Wave execution | Grouping of independent plans that can run in parallel within the same release window | W |
| Product mode | Archon operating without any local template path — resolves templates only from `~/.archon/templates/` | V |
| Dev mode | Archon operating with an explicit local template path (`ARCHON_DEV_TEMPLATE_PATH` or `archon dev link-template`) | V |
| Canonical checksum | State integrity hash calculated from normalized JSON (no checksum field included) stored in `state.checksum` only | V |
| Agent support tier | Classification of agent availability: `supported` / `prompt-only` / `planned` | V |
| Generate command | CLI command that scaffolds phase documentation files from the active template | V |
| Review command | CLI command that analyzes documentation quality for a given phase | V |
| Quality score | Aggregated metric (0–100) reflecting documentation completeness across all phases | V |
| Traceability matrix | Cross-phase mapping showing which domain entities and requirements are referenced in which documents | V |
| Template diff | Comparison of two template versions showing added, removed, and changed sections | V |
| CI mode | Non-interactive execution mode that exits with a machine-readable status code | V |

---

> [← planning/README.md](../../README.md)
