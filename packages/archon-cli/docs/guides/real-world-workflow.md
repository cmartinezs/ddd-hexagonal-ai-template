# Real-World Workflow with Archon + DDD Hexagonal Template

A practical guide for taking a project from zero to complete documentation using Archon CLI and the DDD + Hexagonal Architecture template.

---

## Prerequisites

- Node.js 18+
- Archon installed: `npm install -g @archon/cli`
- An AI agent available (opencode recommended; Claude Code and others also supported)

---

## 1. Initialize the project

```bash
archon init --name "my-saas" --agent opencode
cd my-saas
```

Archon creates:
- `docs/` — phase folders 00 through 11, each with the template files
- `.archon/state.json` — project state (current phase, phase statuses)
- `.archon/guides/` — AI guides copied from the template for offline use
- `.archon/config.json` — agent and default configuration

```
✅ Project "my-saas" initialized at ../my-saas
✅ Template v0.1.0 pinned in .archon/template.lock.json
✅ Guides copied to .archon/guides/
```

→ [`archon init`](../commands/init.md)

---

## 2. Understand where you are

```bash
archon status
archon guide --phase 0
```

`status` shows the current phase and the progress of all 12 phases at a glance:

```
Phase 0 — Documentation Planning   [in_progress]
Phase 1 — Discovery                [pending]
...
```

`guide` loads the phase-specific guide from `.archon/guides/` and explains what to produce, what questions to answer, and common pitfalls.

→ [`archon status`](../commands/status.md) · [`archon guide`](../commands/guide.md)

---

## 3. Enrich AI context before running

Before generating the first prompt, give the AI agent access to the full template framework:

```bash
archon context inject    # loads template guides → .archon/context/context.md
archon context scan      # adds project-specific state (phase history, tech stack, glossary)
```

`inject` concatenates INSTRUCTIONS-FOR-AI.md, AI-WORKFLOW-GUIDE.md, SKILLS-AND-PLUGINS-GUIDE.md, and TEMPLATE-ARCHITECTURE.md into a single context file that is automatically included in the next `archon run` or `archon prompt --context full`.

→ [`archon context`](../commands/context.md)

---

## 4. Generate the AI prompt

```bash
archon prompt --phase 0 --context full
```

Archon generates a structured markdown prompt in `.archon/prompts/phase-00-<timestamp>.md` and prints it to stdout. With `--copy`, it also copies to the clipboard.

The prompt includes:
- Phase goals and expected deliverables
- The project context from `context.md`
- Instructions for the AI agent

→ [`archon prompt`](../commands/prompt.md)

---

## 5. Run the AI agent

```bash
archon run --agent opencode --phase 0
```

Archon invokes opencode with the generated prompt attached as a file. The execution is logged to `.archon/runs/`. Context from `context inject` is automatically prepended.

To preview the resolved command without executing:

```bash
archon run --agent opencode --phase 0 --dry-run
```

→ [`archon run`](../commands/run.md)

---

## 6. Validate and advance

```bash
archon check
archon next
```

`check` validates the phase constraints (required sections present, no unfilled placeholders) and reports pass/fail per rule.

`next` marks the current phase complete and sets the next phase to `in_progress`.

→ [`archon check`](../commands/check.md) · [`archon next`](../commands/next.md)

---

## 7. The loop: phases 1–11

The same pattern applies to each of the 12 phases:

```
guide → context inject → prompt → run → check → next
```

| Phase | Name | Focus |
|-------|------|-------|
| 0 | Documentation Planning | Framework setup, navigation conventions |
| 1 | Discovery | Problem context, vision, actors |
| 2 | Requirements | User stories, functional/non-functional reqs, scope |
| 3 | Design | DDD strategic design, bounded contexts, UI flows |
| 4 | Data Model | Entities, relationships, ERD |
| 5 | Planning | Roadmap, epics, versioning strategy |
| 6 | Development | Hexagonal architecture, APIs, ADRs, coding standards |
| 7 | Testing | Test strategy and plans |
| 8 | Deployment | CI/CD, environments, release process |
| 9 | Operations | Runbooks, incident response |
| 10 | Monitoring | Metrics, alerts, dashboards |
| 11 | Feedback | Retrospectives, user feedback |

> **Phase discipline (phases 1–5):** never mention technology names (no "React", no "PostgreSQL"). Business logic before technology choices.

---

## 8. Jumping phases

If a phase does not apply to your project (e.g. phase 9 Operations for a prototype):

```bash
archon next --phase 10    # skip phase 9, jump directly to phase 10
```

Archon detects the jump and asks for confirmation:

```
⚠️  Jump detected: skipping phases 9 to 9
? Are you sure you want to jump from phase 8 to 10? (y/N)
```

To bypass in automated contexts:

```bash
archon next --phase 10 --force
```

A skipped phase can be reactivated at any time:

```bash
archon next --phase 9    # reactivates the skipped phase
```

→ [`archon next — jump detection`](../commands/next.md#jump-detection)

---

## 9. Managing the prompt library

Over the project lifecycle, prompts accumulate in `.archon/prompts/`. Use the library to review, reuse, and optimize them:

```bash
archon prompts ls                      # list all prompts
archon prompts rank phase              # rank by phase number
archon prompts compress <id>           # reduce token count while preserving intent
archon prompts merge <id1> <id2>       # merge two similar prompts
archon prompts export <id> ./shared/   # export for reuse in another project
archon prompts clean                   # remove all prompts (fresh start)
```

→ [`archon prompts`](../commands/prompts.md)

---

## 10. Keeping the template up to date

When a new version of the DDD Hexagonal Template is released:

```bash
archon upgrade --dry-run    # preview what would change
archon upgrade              # apply the update
```

Safe (additive) changes are applied automatically. Breaking changes are shown as a diff and require explicit confirmation.

To revert an upgrade:

```bash
archon upgrade --rollback 0.1.0
```

→ [`archon upgrade`](../commands/upgrade.md) · [`archon templates`](../commands/templates.md)

---

## 11. Troubleshooting

| Symptom | Command | What it does |
|---------|---------|--------------|
| AI agent lacks template context | `archon context inject` | Rebuilds the context file from `.archon/guides/` |
| Phase won't advance | `archon check` | Shows which constraints are failing and why |
| State seems corrupted | `archon doctor --fix` | Validates and repairs state, checksum, and config |
| Configured agent doesn't respond | `archon agent --doctor` | Diagnoses agent availability and transport capabilities |
| Not sure which version of template you have | `archon status --json \| jq .templateVersion` | Reads pinned version from `template.lock.json` |

→ [`archon doctor`](../commands/doctor.md) · [`archon agent`](../commands/agent.md)

---

[← Back to archon-cli README](../../README.md)
