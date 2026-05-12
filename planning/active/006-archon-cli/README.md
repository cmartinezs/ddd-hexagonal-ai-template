# 006 — Archon CLI

> **Status:** EXPANSION
> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)

---

## Intent

Build `Archon` — a CLI tool that systematizes the use of the DDD + Hexagonal AI Template through structured commands, phase enforcement, AI agent integration (opencode primary), and upgrade/migration support.

---

## Key Outputs

| Output | Type |
|--------|------|
| `00-guides-and-instructions/archon/` — CLI tool | New folder (Node.js/TypeScript) |
| `.archon/` — project state folder | Created per project |
| `UPGRADE/` — migration files | New folder in template root |
| `CHANGELOG.md` — version history | Updated in template root |

---

## Scopes (9 total)

1. **CLI Scaffold** — project setup, package.json, tsconfig, bin entry
2. **State Management** — state.json, checksum, mode detection
3. **Phase Engine** — 12 phase definitions, dependency graph, validators
4. **Core Commands** — init, status, check, next
5. **AI Integration** — prompt generation + context scanner + agent execution (adapters) + prompts management (ls/compress/rank/merge/expand)
6. **Interactive Mode** — first-interactive, config defaults
7. **Guide + Tutorial + Doctor** — help system, tutorial integration, health check
8. **Upgrade + Migration** — upgrade command, rollback, migration guides
9. **Documentation** — README, examples, polish

---

> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)