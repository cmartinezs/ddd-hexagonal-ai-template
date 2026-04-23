# Agent Instructions

This file contains context and conventions for AI coding agents (Claude Code, GitHub Copilot, etc.) working in this repository.

> If you are a human contributor, you can ignore this file. See `CONTRIBUTING.md` instead.

---

## Repository Purpose

This is a **documentation template** for software projects using **Domain-Driven Design (DDD)** and **Hexagonal Architecture**. It is not an application — it is a structured set of markdown templates, guides, and prompts designed to help teams generate complete product documentation with AI assistance.

Key traits:
- **12-phase SDLC framework**: Discovery → Requirements → Design → Data Model → Planning → Development → Testing → Deployment → Operations → Monitoring → Feedback
- **Agnostic-first**: Phases 1-5 must never mention specific technologies (no "React", no "PostgreSQL").
- **AI-native**: Contains prompts, workflows, and checklists optimized for LLM collaboration.

---

## Directory Structure

```
.
├── 00-guides-and-instructions/ # Guides for humans and AI
│   ├── README.md               # Entry point for guides
│   ├── AI-WORKFLOW-GUIDE.md    # Day-by-day workflow with AI
│   ├── INSTRUCTIONS-FOR-AI.md  # Prompts per phase
│   ├── TEMPLATE-USAGE-GUIDE.md # Manual usage without AI
│   ├── TEMPLATE-ARCHITECTURE.md # Philosophy and design of the template
│   ├── EXAMPLE-IMPLEMENTATION.md # Real-world example (Keygo)
│   ├── SKILLS-AND-PLUGINS-GUIDE.md # Claude Code skills integration
│   └── FAQ.md                  # Common questions
│
├── 01-templates/               # Actual templates per phase
│   ├── 00-documentation-planning/ # SDLC framework, navigation conventions
│   ├── 01-discovery/           # Problem context, vision, actors
│   ├── 02-requirements/        # Glossary, RF/RNF, scope
│   ├── 03-design/              # Strategic design, bounded contexts, UI
│   ├── 04-data-model/          # Entities, relationships, ERD
│   ├── 05-planning/            # Roadmap, epics, versioning
│   ├── 06-development/         # Architecture, APIs, coding standards
│   ├── 07-testing/             # Test strategy, plans
│   ├── 08-deployment/          # CI/CD, environments, releases
│   ├── 09-operations/          # Runbooks, incident response
│   ├── 10-monitoring/          # Metrics, alerts, dashboards
│   └── 11-feedback/            # Retrospectives, user feedback
│
├── CONTRIBUTING.md
├── LICENSE
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── AGENTS.md                   # This file
```

---

## Editing Conventions

### Diagram Convention

All diagrams in this repository follow this precedence:

1. **Mermaid** (preferred): Use for all diagrams where supported
   ```mermaid
   graph TD
       A --> B
   ```

2. **PlantUML**: Use only if diagram type is not expressible in Mermaid
   ```plantuml
   @startuml
   A --> B
   @enduml
   ```

3. **ASCII**: Use only when neither Mermaid nor PlantUML is viable
   ```
   A --> B
   ```

No embedded images or external diagram tools as primary source.

---

## Markdown Style
- Use ATX-style headers (`#` not underline).
- Keep lines under 120 characters when possible.
- Use fenced code blocks with language hints.
- Prefer tables for structured comparisons.

### Links
- Use **relative paths** for internal links.
- Every `TEMPLATE-*.md` and `README.md` must have navigation links:
  - `[← HOME](../README.md)` or `[← Index](./README.md)` at top/bottom.
  - `[Next >](./next-file.md)` where applicable.

### Language
- **All files**: English.

### Template Format
Every `TEMPLATE-*.md` must follow this structure:
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

[← Índice](./README.md) | [< Anterior] | [Siguiente >]
```

---

## Agent Workflow & Communication

### Planning & Confirmation
- **Always propose a plan** before executing non-trivial tasks.
- **Wait for user confirmation** before starting implementation.
- Break large tasks into steps; present them clearly.

### Skills & Plugins
- **Use relevant skills/plugins** when available and beneficial.
- Reference `00-guides-and-instructions/SKILLS-AND-PLUGINS-GUIDE.md` for phase-specific skill recommendations.
- Do not use skills blindly; match them to the task at hand.

### Post-Task Protocol
- After a **long or complex task**, always **compact your context**.
- Ask the user: *"Will you continue with this topic or switch to something different?"*
- If the user will switch topics, **suggest starting a new session** to maintain clarity and performance.

### Communication Style
- Be **precise, direct, and exact**.
- No unnecessary paraphrasing, filler, or rhetorical questions.
- High quality, zero verbosity.
- State facts and instructions plainly.

---

## AI Collaboration Rules

When modifying files in this repo:

1. **Preserve agnostic/specific boundary**:
   - Phases 1-5 templates: Do not add technology names.
   - Phases 6-12: Technology-specific content is expected.

2. **Maintain traceability**:
   - If you add a requirement template, ensure it references Discovery.
   - If you add a design template, ensure it references Requirements.

3. **Keep prompts actionable**:
   - Prompts in `INSTRUCTIONS-FOR-AI.md` must be copy-paste ready.
   - Include context → task → template → requirements → validation structure.

4. **Update cross-references**:
   - If you rename a file, update all links pointing to it.
   - If you move a folder, update all path references (see recent refactoring of `00-PLANNING/` → `01-templates/00-documentation-planning`).

5. **Do not break navigation**:
   - Every README must link to its children.
   - Every document must link back to its folder index.

---

## Common Tasks

### Adding a New Phase Template
1. Create `01-templates/XX-name/TEMPLATE-document.md`.
2. Update `01-templates/XX-name/README.md` to list it.
3. Update `01-templates/00-documentation-planning/sdlc-framework.md` mapping table.
4. Update `01-templates/00-documentation-planning/MACRO-PLAN.md` deliverables list.
5. Add a prompt to `00-guides-and-instructions/INSTRUCTIONS-FOR-AI.md` if AI-generated.

### Refactoring Folder Names
1. Rename folder.
2. Update all markdown links (use grep for `[text](path)` and plain path strings).
3. Update diagrams in `README.md`, `MACRO-PLAN.md`, and `sdlc-framework.md`.
4. Update `.gitignore` or `.gitattributes` if needed.
5. Update `AGENTS.md` directory structure section.

---

## Questions?

If you are an AI agent and unsure about a change:
- Check `00-guides-and-instructions/TEMPLATE-ARCHITECTURE.md` for design philosophy.
- Check `00-guides-and-instructions/FAQ.md` for common edge cases.
- Prefer asking over assuming when restructuring.
