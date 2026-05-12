# 🔍 DEEPENING: Scope 09 — Documentation, Polish, Examples

> **Status:** DONE (2026-05-12)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Complete the Archon CLI with documentation, examples, and polish: README, `archon --help`, examples folder, and integration with the template guides index.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `archon/README.md` — CLI documentation | DONE | `packages/archon-cli/README.md` |
| 2 | Create `archon/examples/` — example projects and usage | DONE | `packages/archon-cli/examples/` — quickstart, full-workflow, ai-integration, troubleshooting |
| 3 | Implement `archon --help` with all commands and descriptions | DONE | `router.ts` (was already done in scope-01) |
| 4 | Create quick-start guide (`archon quickstart`) | DONE | `examples/quickstart.md` (guide file, not separate command) |
| 5 | Update `00-guides-and-instructions/README.md` with Archon entry | DONE | Archon entry in Getting Started + Document Index |
| 6 | Create `.archon/` template files (state.json, config.json templates) | DONE | Documented in README + examples |
| 7 | Final integration tests (end-to-end workflow) | PENDING | No test framework configured |
| 8 | Create CHANGELOG.md and VERSION file for template | DONE | VERSION (0.1.0) + CHANGELOG updated |

---

## README Structure

```markdown
# Archon — DDD Template CLI

A CLI tool that systematizes the use of the DDD + Hexagonal AI Template
through structured commands, phase enforcement, AI agent integration,
and upgrade/migration support.

## Installation

```bash
npm install -g @archon/cli
# or
npx archon init --name my-project
```

## Quick Start

```bash
archon init --name my-tcg --agent opencode
cd ../my-tcg
archon status
archon prompt --phase 0 --context full
# paste prompt into opencode
archon check
archon next
```

## Commands

| Command | Description |
|---------|-------------|
| `archon init` | Initialize new project from template |
| `archon status` | Show current phase and progress |
| `archon check` | Validate current phase constraints |
| `archon next` | Advance to next phase |
| `archon prompt` | Generate AI prompt for current phase |
| `archon prompts` | Manage accumulated prompt library |
| `archon guide` | Interactive help for current phase |
| `archon tutorial` | Guided tutorial mode |
| `archon agent` | Configure AI agent |
| `archon config` | Manage configuration defaults |
| `archon doctor` | Health check and integrity validation |
| `archon upgrade` | Upgrade template to newer version |
| `archon help` | Show help |

## Examples

- [Quick Start](./examples/quickstart.md)
- [Full Project Workflow](./examples/full-workflow.md)
- [AI Agent Integration](./examples/ai-integration.md)
```

---

## Examples Folder

```
archon/examples/
├── quickstart.md              # 5-step quick start
├── full-workflow.md           # Complete project walkthrough
├── ai-integration.md          # opencode, Claude Code, manual
├── upgrade-guide.md           # How to upgrade template
└── troubleshooting.md          # Common issues and fixes
```

---

## Guides Index Update

Add Archon to `00-guides-and-instructions/README.md` in:
- Getting Started section (as first command after AI Workflow Guide)
- Document Index table

---

## Done Criteria

- [ ] `archon/README.md` has: installation, quick start, all commands documented, examples
- [ ] `archon --help` outputs well-formatted help with all commands
- [ ] `archon examples/quickstart.md` is a working 5-step tutorial
- [ ] `archon examples/full-workflow.md` covers complete project lifecycle
- [ ] `archon examples/ai-integration.md` covers opencode, Claude Code, manual
- [ ] `archon examples/upgrade-guide.md` explains upgrade/migration system
- [ ] `00-guides-and-instructions/README.md` has Archon entry in Getting Started + Index
- [ ] `.archon/` templates (empty state.json, config.json schemas) are documented
- [ ] E2E tests verify: init → status → prompt → check → next → upgrade workflow
- [ ] `VERSION` file exists in template root with `0.1.0`
- [ ] `CHANGELOG.md` exists with Archon development entries
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)