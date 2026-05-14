# 🔗 TRACEABILITY: 009 — Archon Critical Bugs

> [← planning/README.md](../../README.md)

---

## Terms Introduced

| Term | Definition | SDLC Phase |
|------|-----------|-----------|
| Canonical checksum | State integrity hash computed from `JSON.stringify(state, null, 2)` with no `checksum` field and no trailing newline, stored only in the external `state.checksum` file | V |

---

> [← planning/README.md](../../README.md)
