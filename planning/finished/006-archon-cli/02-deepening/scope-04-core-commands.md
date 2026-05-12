# 🔍 DEEPENING: Scope 04 — Core Commands (init, status, check, next)

> **Status:** DONE (2026-05-12)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement the four core commands that form the operational backbone: `archon init`, `archon status`, `archon check`, `archon next`. These commands handle project initialization, status display, validation, and phase advancement.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Implement `archon init [--name <proj>] [--agent <agent>]` | GENERATE-DOCUMENT | DONE | Full init command |
| 2 | Implement template copier (copy template to sibling project) | GENERATE-DOCUMENT | DONE | Template copier |
| 3 | Implement `archon status` with progress bar + phase map | GENERATE-DOCUMENT | DONE | Full status command |
| 4 | Implement `archon check [--json] [--phase <N>]` | GENERATE-DOCUMENT | DONE | Full check command |
| 5 | Implement `archon next [--phase <N>] [--confirm]` | GENERATE-DOCUMENT | DONE | Full next command |
| 6 | Implement switch prompt after init ("Switch to project directory?") | GENERATE-DOCUMENT | DONE | Switch prompt |
| 7 | Write integration tests for init + status | GENERATE-DOCUMENT | PENDING | Integration tests |

---

## Command Details

### `archon init [--name <project>] [--agent <opencode|claude|manual>]`

**Flow:**
1. Detect current mode (template vs. project)
2. If already in project mode: error — "Already in a project. Run from template directory."
3. Ask for project name (if not provided via `--name`)
4. Validate project name (no spaces, valid folder name)
5. Create sibling directory `../<projectName>/`
6. Copy template structure into `project/01-templates/` (template content, adapted with project name)
7. Create `project/.archon/state.json` with Phase 0 initialized
8. Create `project/.archon/state.checksum`
9. Prompt: "Switch to project directory? (yes/no)" → if yes, print `cd ../<projectName>`
10. Output: welcome message + `archon status` summary

### `archon status`

**Output:**
```
PHASE 3: Design                              ████████░░░░░░░░░░░  30%
══════════════════════════════════════════════════════════
[0] Documentation Planning    ✅  complete
[1] Discovery                  ✅  complete
[2] Requirements               ✅  complete
[3] Design                     ◉  in_progress ← YOU ARE HERE
[4] Data Model                ○  pending
[5] Planning                   ○  pending
[6-11] Dev→Feedback            ○  pending (locked)

Agent: opencode | Project: tcg-trading-cards | Template: v1.0.0
Last activity: 2026-05-12

Next recommended: Run `archon prompt` to generate your opencode prompt for Phase 3
Run `archon guide` for interactive help
Run `archon check` to validate current phase
```

### `archon check [--json] [--phase <N>]`

**Output:**
```
⚠️  WARN: Technology name "PostgreSQL" found in phase-03-design.md (line 42)
    → Phase 3 is technology-agnostic. Replace with domain concept.
    → Run `archon check --fix` for suggestions.

❌  ERROR: Bounded context "Player Registry" has no aggregate root defined
    → Required by Phase 4 (Data Model)
    → Complete before advancing to Phase 4.

✅  PASS: Phase 2 requirements trace to Phase 1 actors (100%)
✅  PASS: Glossary consistency (42 terms, no circular definitions)
```

### `archon next [--phase <N>] [--confirm]`

**Flow:**
1. Read current phase from state.json
2. Show what was accomplished in current phase (files, key decisions)
3. Show what next phase produces and its required inputs
4. Check if prerequisites are met:
   - If not: `WARN` + show what's missing, ask to confirm advancement
5. If confirmed: update state.json, move to next phase, output next steps

---

## Template Copier Behavior

- Copy `01-templates/` into `project/01-templates/`
- Copy `00-guides-and-instructions/` into `project/00-guides-and-instructions/` (guides are project-specific)
- Do NOT copy `planning/` (meta-planning system is template-only)
- Template files are the canonical source; project may not modify them (symlinks not used in MVP)

---

## Done Criteria

- [x] `archon init --name my-tcg` creates `../my-tcg/` with full template structure
- [x] Init validates project name, handles errors gracefully
- [x] Init shows switch prompt with correct path
- [x] `archon status` shows correct progress bar, phase map, agent, last activity
- [x] `archon check` outputs ERROR/WARN/INFO with line references and fix suggestions
- [x] `archon check --json` outputs valid JSON with structured results
- [x] `archon next` shows phase summary, prerequisites check, confirmation prompt
- [x] `archon next --confirm` skips confirmation (for scripting)
- [ ] Integration tests verify init creates valid state.json, status shows correct data
- [x] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)