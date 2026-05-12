# 006 — Archon CLI

> **Status:** COMPLETED
> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)

---

## Intent

Build `Archon` — a CLI tool that systematizes the use of the DDD + Hexagonal AI Template through structured commands, phase enforcement, AI agent integration (opencode primary), and upgrade/migration support.

---

## Key Outputs

| Output | Type |
|--------|------|
| `packages/archon-cli/` — CLI tool (Node.js/TypeScript, globally installable) | New folder |
| `.archon/` — project state folder (created per project) | Created per project |
| `~/.archon/` — global template cache | Created in user home |
| `.archon/template.lock.json` — pinned template version per project | New file |

---

## Architecture Changes (v2 — architectural pivot)

Based on `research/analisis-archon-cli-v1-global-template.md`, the architecture pivoted from "CLI inside template repo" to **globally installable CLI with global template cache**.

| Aspect | Before | After |
|--------|--------|-------|
| CLI location | `00-guides-and-instructions/archon/` | `packages/archon-cli/` |
| Project creation | Sibling folder from template dir | Child folder of cwd |
| Template source | Copy from local repo | Global cache (`~/.archon/templates/`) |
| Mode detection | template vs project from folders | user / project / dev / template-cache |
| Init flow | From template dir, copy sibling | From any dir, resolve from cache/dev path |
| Output docs | `01-discovery/` style | `docs/00-documentation-planning/` style |
| Commands | init, status, check, next | + templates, dev, upgrade separation |

## Scopes (9 total)

1. **CLI Scaffold** — project setup, package.json, tsconfig, bin entry ✅ DONE
2. **State Management** — state.json, checksum, mode detection ✅ DONE
3. **Phase Engine** — 12 phase definitions, dependency graph, validators ✅ DONE
4. **Core Commands** — init, status, check, next ✅ DONE
5. **AI Integration** — prompt generation + context scanner + agent execution (adapters) + prompts management (ls/compress/rank/merge/expand) ✅ DONE
6. **Interactive Mode** — first-interactive, config defaults ✅ DONE
7. **Guide + Tutorial + Doctor** — help system, tutorial integration, health check ✅ DONE
8. **Upgrade + Migration** — upgrade command, rollback, migration guides ✅ DONE
9. **Documentation** — README, examples, polish ✅ DONE

---

> [← active/README.md](../README.md) | [← planning/README.md](../../README.md)