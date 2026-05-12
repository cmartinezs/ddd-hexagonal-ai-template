# 🔍 DEEPENING: Scope 05 — AI Prompt Generation + Prompts Management

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement `archon prompt` (AI prompt generation) and `archon prompts` (prompt library management). Prompt generation is the core AI integration: it produces a fully context-rich prompt file per phase for opencode (primary) and other agents. Prompts management provides tools to organize, compress, rank, merge, and expand accumulated prompts.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/core/ai-prompt-builder.ts` — prompt generator per phase | GENERATE-DOCUMENT | PENDING | `ai-prompt-builder.ts` |
| 2 | Create prompt templates for all 12 phases | GENERATE-DOCUMENT | PENDING | `prompts/` base templates |
| 3 | Implement `archon prompt --phase <N> [--context full|summary|none]` | GENERATE-DOCUMENT | PENDING | `prompt.ts` command |
| 4 | Implement `archon prompts ls` — list all accumulated prompts | GENERATE-DOCUMENT | PENDING | `prompts ls` |
| 5 | Implement `archon prompts rank [--by usage|last-accessed]` | GENERATE-DOCUMENT | PENDING | `prompts rank` |
| 6 | Implement `archon prompts compress <id>` — remove intermediate steps | GENERATE-DOCUMENT | PENDING | `prompts compress` |
| 7 | Implement `archon prompts merge <id1> <id2>` — combine prompts | GENERATE-DOCUMENT | PENDING | `prompts merge` |
| 8 | Implement `archon prompts expand <id>` — re-expand compressed prompt | GENERATE-DOCUMENT | PENDING | `prompts expand` |
| 9 | Implement `archon prompts export <id> [--to <file>]` | GENERATE-DOCUMENT | PENDING | `prompts export` |
| 10 | Implement `archon prompts clean [--older-than <days>]` | GENERATE-DOCUMENT | PENDING | `prompts clean` |
| 11 | Create `prompts/` folder with base templates per phase | GENERATE-DOCUMENT | PENDING | Base prompt templates |

---

## Prompt File Structure (output)

```markdown
# archon prompt — Phase 3: Design
Generated: 2026-05-12T10:30:00Z
Project: tcg-trading-cards
Agent: opencode

## Context
- Previous phases: 0-2 COMPLETE
- Glossary: 42 terms (see glossary.md)
- MVP scope: core game loop + deck builder
- Bounded contexts to define: Game Session, Player Registry, Deck Builder

## Goal
Generate Phase 3 (Design) documentation:
1. `strategic-design.md` — bounded contexts, subdomain classification
2. `system-flows.md` — 5+ flows with Mermaid diagrams

## Critical Constraints
- PHASE 3 is technology-agnostic. DO NOT mention databases, frameworks, languages, protocols.
- Every flow must trace to at least one FR from Phase 2
- Every bounded context must map to a domain concept from Phase 2 glossary

## Validation Checklist
- [ ] No technology names in output
- [ ] Context map (Mermaid) present and readable
- [ ] All flows traced to FRs
- [ ] Bounded contexts classified (Core/Supporting/Generic)

## Template Location
Use: `../../template/01-templates/03-design/`

---
Copy this prompt into your opencode session.
```

---

## Prompts Management Commands

| Command | Description | Example |
|---------|-------------|---------|
| `archon prompts ls` | List all prompts with phase, date, size, first line | Shows table: ID, Phase, Date, Size, Description |
| `archon prompts rank` | Rank prompts by usage (frequency) or last accessed | Shows top 10 most-used prompts |
| `archon prompts compress <id>` | Remove intermediate steps; keep first + last | For prompts with many sub-steps |
| `archon prompts merge <id1> <id2>` | Combine two prompts into one sequential flow | For combining related phases |
| `archon prompts expand <id>` | Re-expand compressed prompt back to original steps | Uses stored metadata |
| `archon prompts export <id> [--to <file>]` | Export single prompt as standalone file | `archon prompts export abc123 --to prompt.md` |
| `archon prompts clean [--older-than 30]` | Archive prompts older than N days | Removes old prompts, keeps archive |

---

## Prompt Metadata (stored alongside each prompt)

```json
{
  "id": "phase-3-2026-05-12-103000",
  "phase": 3,
  "createdAt": "2026-05-12T10:30:00Z",
  "projectName": "tcg-trading-cards",
  "agent": "opencode",
  "contextLevel": "full",
  "size": 3240,
  "firstLine": "Generate Phase 3 (Design) documentation",
  "usageCount": 2,
  "lastUsedAt": "2026-05-12T11:00:00Z",
  "compressed": false,
  "parentIds": []
}
```

---

## First-Interactive Behavior

```
$ archon prompt --phase 3
⚠️  Missing required parameter: --context (full|summary|none)
   Entering interactive mode...

? Select context depth: (full/summary/none) › full
? Include validation checklist: (yes/no) › yes
? Include previous phase summary: (yes/no) › yes
→ Generating .archon/prompts/phase-3-2026-05-12-103000.md
✅ Prompt written to .archon/prompts/phase-3-2026-05-12-103000.md
```

---

## Agent-Specific Formatting

| Agent | Format |
|-------|--------|
| **opencode** | Markdown prompt file, copy-paste ready, includes `@project` context note |
| Claude Code | Uses `/` slash commands and context injection format |
| Manual | Prints prompt to stdout, no file generation |

---

## Done Criteria

- [ ] `archon prompt --phase 3 --context full` generates valid, context-rich prompt file
- [ ] Prompt includes: project name, previous phases, glossary summary, goal, constraints, validation checklist, template location
- [ ] First-interactive triggers when `--context` is missing (not error)
- [ ] `archon prompts ls` shows table with ID, Phase, Date, Size, Description
- [ ] `archon prompts rank --by usage` sorts by usageCount descending
- [ ] `archon prompts compress <id>` removes intermediate steps, keeps metadata
- [ ] `archon prompts merge <id1> <id2>` creates combined prompt with both contexts
- [ ] `archon prompts expand <id>` restores original from compressed using parentIds
- [ ] `archon prompts export <id>` creates standalone `.md` file
- [ ] `archon prompts clean --older-than 30` archives prompts older than 30 days
- [ ] All prompts stored in `.archon/prompts/` with metadata JSON sidecar
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)