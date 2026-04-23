# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **documentation-only template framework** — not an executable application. It provides structured markdown templates for teams documenting software projects using DDD + Hexagonal Architecture, organized in a 12-phase SDLC.

There are no build, test, or lint commands. All work is editing markdown files.

## Directory Structure

```
00-guides-and-instructions/   # How-to guides for humans and AI (read-only reference)
01-templates/                  # All phase templates
├── data-input/                # External source materials (research, specs, interviews)
├── data-output/               # Production documentation — real project content goes here
│   ├── 00-documentation-planning/
│   ├── 01-discovery/ through 11-feedback/
└── 00–11 phase folders/       # Template source files (TEMPLATE-*.md)
AGENTS.md                      # AI agent conventions (canonical — check before editing)
SETUP-CHECKLIST.md             # Steps to customize this template for a new project
```

**Key guides** (in `00-guides-and-instructions/`):
- `AI-WORKFLOW-GUIDE.md` — Day-by-day AI-assisted workflow (10–15 days)
- `INSTRUCTIONS-FOR-AI.md` — Copy-paste prompts per phase
- `TEMPLATE-ARCHITECTURE.md` — Why each phase and folder exists
- `SKILLS-AND-PLUGINS-GUIDE.md` — Claude Code skills per phase
- `EXAMPLE-IMPLEMENTATION.md` — Complete worked example (Keygo project)

## 12-Phase SDLC Overview

| Phase | Folder | Focus |
|-------|--------|-------|
| 0 | `00-documentation-planning/` | Framework setup, navigation conventions |
| 1 | `01-discovery/` | Problem context, vision, actors |
| 2 | `02-requirements/` | User stories, functional/non-functional reqs, scope |
| 3 | `03-design/` | System flows, UI, DDD strategic design, bounded contexts |
| 4 | `04-data-model/` | Entities, relationships, ERD |
| 5 | `05-planning/` | Roadmap, epics, versioning |
| 6 | `06-development/` | Hexagonal architecture, APIs, coding standards, ADRs |
| 7 | `07-testing/` | Test strategy and plans |
| 8 | `08-deployment/` | CI/CD, environments, release process |
| 9 | `09-operations/` | Runbooks, incident response |
| 10 | `10-monitoring/` | Metrics, alerts, dashboards |
| 11 | `11-feedback/` | Retrospectives, user feedback |

**Phase discipline**: Phases 1–5 must never mention technology names (no "React", no "PostgreSQL"). Business logic before technology choices.

## Data Flow

```
01-templates/data-input/   →   01-templates/data-output/
(external research, specs)      (your production docs — no template text)
```

`data-output/` must contain only actual project content. Remove all instructional placeholder text before committing.

## Editing Conventions

### Markdown Style
- ATX headers (`#`, not underlines)
- Lines under 120 characters
- Fenced code blocks with language hints
- Tables for structured comparisons
- All files in English

### Diagrams (in order of preference)
1. **Mermaid** — use for all diagrams where supported
2. **PlantUML** — only when the diagram type can't be expressed in Mermaid
3. **ASCII** — last resort only

No embedded images or external diagram tools as the primary source.

### Navigation Links
Every `TEMPLATE-*.md` and `README.md` must include:
- `[← Index](./README.md)` or `[← HOME](../README.md)` at top and bottom
- `[Next >](./next-file.md)` where applicable

### Template File Structure
```markdown
[← Index](./README.md) | [< Previous] | [Next >]

---

# [DOCUMENT NAME]

[1-2 sentence purpose]

## Contents
[Section index]

---

## Section 1
[Content]

[↑ Back to top](#document-name)

---

[← Index](./README.md) | [< Previous] | [Next >]
```

## AI Collaboration Rules

1. **Preserve agnostic/specific boundary**: Never add technology names to phases 1–5 templates.
2. **Maintain traceability**: New requirement templates must reference Discovery; new design templates must reference Requirements.
3. **Keep prompts actionable**: Prompts in `INSTRUCTIONS-FOR-AI.md` must be copy-paste ready with context → task → template → requirements → validation structure.
4. **Update cross-references**: Renaming a file requires updating all links pointing to it.
5. **Don't break navigation**: Every README must link to its children; every document must link back to its folder index.

## Common Tasks

### Adding a New Phase Template
1. Create `01-templates/XX-name/TEMPLATE-document.md`
2. Update `01-templates/XX-name/README.md` to list it
3. Update `01-templates/00-documentation-planning/sdlc-framework.md` mapping table
4. Update `01-templates/00-documentation-planning/MACRO-PLAN.md` deliverables list
5. Add a prompt to `00-guides-and-instructions/INSTRUCTIONS-FOR-AI.md`

### Refactoring Folder Names
1. Rename folder
2. Update all markdown links (grep for both `[text](path)` patterns and plain path strings)
3. Update diagrams in `README.md`, `MACRO-PLAN.md`, and `sdlc-framework.md`
4. Update `AGENTS.md` directory structure section

## Claude Code Skills Integration

| Phase | Skill |
|-------|-------|
| Design (phase 3) | `/domain-driven-design` |
| Development (phase 6) | `/code-craftsmanship:clean-code` |
| Security (phase 7) | `/security-review` |
| Testing (phase 7) | `/dev-tools:vitest` |
| Deployment (phase 8) | `/dev-tools:git-workflow` |
| Health check | `/dev-tools:project-health` |

See `00-guides-and-instructions/SKILLS-AND-PLUGINS-GUIDE.md` for phase-specific skill recommendations.
