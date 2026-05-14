# 🔗 TRACEABILITY: 012 — Archon Dev/Product Mode Separation

> [← planning/README.md](../../README.md)

---

## Terms Introduced

| Term | Definition | SDLC Phase |
|------|-----------|-----------|
| Product mode | Archon operating without any local template override — resolves templates only from `~/.archon/templates/` (global cache) | V |
| Dev mode | Archon operating with an explicit local template path, activated via `ARCHON_DEV_TEMPLATE_PATH` env var or `archon dev link-template` | V |

---

> [← planning/README.md](../../README.md)
