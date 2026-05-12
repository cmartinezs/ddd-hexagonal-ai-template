# 🔍 DEEPENING: Scope 07 — Guide + Tutorial + Doctor Commands

> **Status:** DONE (2026-05-12)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement the help and guidance system: `archon guide` (interactive phase help), `archon tutorial` (guided tutorial mode), and `archon doctor` (health check and integrity validation).

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Implement `archon guide [--phase <N>] [--step <step>]` | DONE | `guide.ts` command — phase help, pitfalls, prerequisites, next action |
| 2 | Implement `archon tutorial [--mode project|template] [--step <N>]` | DONE | `tutorial.ts` command — full step navigation, progress tracking |
| 3 | Implement `archon doctor [--fix]` | DONE | `doctor.ts` command — template/project integrity, glossary, links, --fix |
| 4 | Implement `archon agent [--set <opencode|claude|manual>]` | DONE | `agent.ts` command (from scope-05) |
| 5 | Integrate tutorial step files from `tutorial/` folder | DONE | Loads step-*.md files from template |
| 6 | Implement template integrity check (file presence, checksums) | DONE | Template + project health checks |
| 7 | Write integration tests for guide + tutorial | PENDING | Not applicable (no test framework) |

---

## Command Details

### `archon guide [--phase <N>]`

Shows the tutorial step file for the current (or specified) phase. Uses existing `tutorial/step-*.md` files.

**Output:**
```
═══════════════════════════════════════════════════════
PHASE 3: Design
═══════════════════════════════════════════════════════

Goal: Define bounded contexts, system flows, and domain models.

What this phase produces:
- strategic-design.md (bounded contexts, subdomain classification)
- system-flows.md (5-10 flows with Mermaid diagrams)
- bounded-contexts/*.md (one model file per context)

Prerequisites:
- Phase 2 (Requirements) complete
- Glossary with 30-50 terms defined
- Bounded contexts identified

Current status:
◉ in_progress — 3/10 tasks done

Next recommended action:
Run `archon prompt --phase 3` to generate your AI prompt

Common pitfalls:
- Defining too many bounded contexts (start with 2-3)
- Using technology terms instead of domain language
- Forgetting Mermaid diagrams for context map

Tutorial step: tutorial/step-03-design.md
```

### `archon tutorial [--mode project|template] [--step <N>]`

Guided tutorial session using existing `tutorial/` step files.

**Two modes:**
- `template` — Learn the system using URL Shortener as reference project (no project needed)
- `project` — Practice with user's own project in `../<project>/`

**Flow:**
1. Show tutorial overview (12 steps)
2. Allow selection: "Start from step 0" or "Resume from step N"
3. Per step: show goal, instructions, AI prompt, done-check
4. Track progress in `state.json` (tutorial step completed)
5. After step: "Continue to next step?" or "Go back to tutorial menu"

### `archon doctor [--fix]`

Health check for project and template integrity.

**Checks:**
1. Template integrity: all required files present in `01-templates/`
2. Phase chain: all phase outputs exist as documented
3. State integrity: checksum matches, no external modifications
4. Glossary consistency: terms used are defined
5. Navigation links: all internal links are valid
6. Template version: project template version vs. current template

**Output:**
```
🔍 Running health check...
✅ Template integrity: 12/12 phase folders present
✅ Phase chain: 3 phases documented (0-2)
✅ State integrity: checksum valid
⚠️  Glossary: 3 terms used but not defined (see .archon/issues.md)
✅ Navigation: 47/47 links valid
✅ Template version: 1.0.0 (current)

Run `archon doctor --fix` to auto-fix fixable issues.
```

`--fix` flag: auto-fix what can be auto-fixed (navigation, glossary references), flag the rest.

### `archon agent [--set <opencode|claude|manual>]`

Configure or view AI agent. Persisted in `.archon/config.json`.

```
$ archon agent --set opencode
✅ Agent set to opencode
   Prompts will be formatted for opencode (markdown, copy-paste format)
   Run `archon prompt` to generate your first prompt

$ archon agent
Current agent: opencode
   Supported commands:
   - archon prompt    (generates .archon/prompts/phase-N-*.md)
   - archon check     (writes findings to .archon/issues.md)
```

---

## Tutorial Step File Mapping

| Archon Phase | Tutorial Step |
|--------------|---------------|
| Phase 0 | `tutorial/step-00-documentation-planning.md` |
| Phase 1 | `tutorial/step-01-discovery.md` |
| Phase 2 | `tutorial/step-02-requirements.md` |
| Phase 3 | `tutorial/step-03-design.md` |
| Phase 4 | `tutorial/step-04-data-model.md` |
| Phase 5 | `tutorial/step-05-planning.md` |
| Phase 6 | `tutorial/step-06-development.md` |
| Phase 7 | `tutorial/step-07-testing.md` |
| Phase 8 | `tutorial/step-08-deployment.md` |
| Phase 9 | `tutorial/step-09-operations.md` |
| Phase 10 | `tutorial/step-10-monitoring.md` |
| Phase 11 | `tutorial/step-11-feedback.md` |

---

## Done Criteria

- [ ] `archon guide` shows current phase help with prerequisites, status, next action
- [ ] `archon guide --phase 5` shows specific phase help (bypasses current phase)
- [ ] `archon tutorial --mode template` runs tutorial without project (uses URL Shortener)
- [ ] `archon tutorial --mode project` runs tutorial with user's project
- [ ] Tutorial progress is tracked in state.json (completed steps)
- [ ] `archon doctor` runs all 6 health checks and outputs results
- [ ] `archon doctor --fix` auto-fixes fixable issues
- [ ] `archon agent --set opencode` sets agent and shows confirmation with next action
- [ ] `archon agent` shows current agent and supported commands
- [ ] Integration tests verify: guide output format, tutorial step navigation, doctor checks
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)