# Navigation Conventions

You are an AI agent generating documentation for this project. This file defines the rules you must follow every time you create, name, move, or link a document. These conventions are not optional — apply them to every file you produce, in every phase. Inconsistency in naming or linking breaks traceability and makes documentation unmaintainable.

**What This Is**: The rulebook ensuring every document is findable and linked to others. The navigation system for the entire documentation project.  
**How to Use**: Read before creating any document. Apply every rule to every file. Link proactively — whenever you reference something, link to it.  
**Why It Matters**: Without these rules, documentation becomes a maze. With them, any document is reachable within 3 clicks and every requirement is traceable end-to-end.  
**When to Reference**: Every time you create, move, or link documents — not just once.  
**Owner**: Tech Lead (can delegate to a documentation owner).

---

## Contents

- [File Structure Rules](#file-structure-rules)
- [Linking Between Documents](#linking-between-documents)
- [Document Structure](#document-structure)
- [Linking IDs](#linking-ids)
- [Markdown Standards](#markdown-standards)
- [Phase Discipline](#phase-discipline)
- [Review & Approval Process](#review--approval-process)
- [Version Control](#version-control)
- [Common Patterns](#common-patterns)
- [Tools & Automation](#tools--automation)
- [FAQ](#faq)

---

## File Structure Rules

This section defines the naming conventions you must follow for directories and files. Every deviation creates a file that cannot be reliably found or referenced by automated tools or other contributors.

### Naming Conventions

**Directories** follow this structure:
```
Phase directories: 00-documentation-planning, 01-discovery, 02-requirements, etc.
Prefix: Phase number (00-11)
Format: lowercase with hyphens
```

**Files** follow this structure:
```
README.md                    # Phase overview (required in every phase directory)
TEMPLATE-filename.md         # Template files (always use TEMPLATE- prefix)
[filename].md               # Production documentation files
adr/                        # Architecture Decision Records subdirectory
bkp/                        # Backup/historical material
```

**Correct examples**:
- ✅ `01-templates/01-discovery/README.md` — Phase overview
- ✅ `01-templates/01-discovery/TEMPLATE-context-motivation.md` — Template file
- ✅ `01-templates/02-requirements/functional-requirements.md` — Requirements file
- ✅ `01-templates/06-development/adr/ADR-001-hexagonal-architecture.md` — Decision record

**Incorrect examples** (do not use):
- ❌ `Discovery/README.md` — Missing phase number prefix
- ❌ `01-templates/01-discovery/CONTEXT-TEMPLATE.md` — Wrong naming convention order

### Why These Rules Matter

Every rule prevents a specific failure mode. Understand why before deviating:

| Rule | Problem Without It | Solution |
|------|-------------------|----------|
| Phase number prefix | Cannot determine phase order at a glance | 01-discovery vs 02-requirements |
| `TEMPLATE-` prefix | Cannot distinguish template from production content | `TEMPLATE-filename.md` |
| `bkp/` folder for old content | Deleted = lost forever | Preserves history |
| `README.md` in each folder | No entry point for the phase | Always know where to start |

---

## Linking Between Documents

This section defines how you must link documents across and within phases. Correct linking is what makes documentation traceable — without it, requirements cannot be tracked from Discovery through to Tests.

### Internal Links (within repo)

All internal links must use relative paths and anchor syntax. Never use absolute paths.

**Format**:
```markdown
See [Document Title](relative/path/to/file.md) for details.
See [Requirement FR-001](../01-templates/02-requirements/functional-requirements.md#fr-001) for acceptance criteria.
```

**Rules**:
- Use relative paths (not absolute URLs)
- Link to specific sections using `#anchor` syntax
- Use descriptive link text — never "click here" or "see this"
- Verify all links work before committing

### Why Linking Matters

Correct linking creates a traceable chain from business need to code. When a link is missing, that chain breaks.

- **Traceability**: Trace a requirement from Discovery → Design → Test → Code
- **Navigation**: Jump to related content without searching
- **Maintenance**: Broken links immediately signal outdated references
- **Context**: Reader understands how every piece connects

### Cross-Phase References

These are the standard linking patterns you must establish between phases. Every phase's documents must link backward to their source phase.

- Phase 1 → Phase 2: Discovery context guides requirements
- Phase 2 → Phase 3: Requirements inform design
- Phase 3 → Phase 6: Design drives architecture
- Phase 6 → Phase 7: Implementation drives test strategy
- Phase 8 → Phase 9: Deployment drives operations

**Example of a correctly linked requirements document**:
```markdown
## Requirements Traceability

Based on:
- [Actor: Project Manager](../01-templates/01-discovery/actors-and-personas.md#project-manager)
- [Need: Task Tracking](../01-templates/01-discovery/scope-and-boundaries.md#in-scope)

Links to:
- [Design: Create Task Flow](../01-templates/03-design/system-flows.md#sf-001)
- [Test: Create Task Test Plan](../01-templates/07-testing/test-plan.md#tc-001)
```

---

## Document Structure

This section defines the required structure for two types of documents: phase READMEs and substantive content files. Every file you generate must follow the matching template.

### Every Phase README Must Include

A phase README is the entry point for that phase. Anyone reading the phase for the first time starts here. Every field is required.

```markdown
# Phase [N]: Phase Name

## Overview
Brief explanation of the phase purpose

## Key Objectives
- [ ] Objective 1
- [ ] Objective 2

## Files to Complete
- **File 1** — Description
- **File 2** — Description

## Completion Checklist
- [ ] Deliverable 1
- [ ] Deliverable 2

## Sign-Off
- [ ] Prepared by: [Name, Date]
- [ ] Approved by: [Name, Date]

## Next Steps
What comes after this phase?

## Time Estimate
X hours total
```

### Every Substantive File Must Include

Substantive files are the production documents that contain actual project content. The header and footer fields are required in every file.

**Header**:
```markdown
# [Phase Number]: Document Title

**Purpose**: One-line statement of why this document exists
**Owner**: Who maintains this?
**Last Updated**: [DATE]
**Status**: [Draft/In Review/Approved]
```

**Footer** (optional but recommended):
```markdown
---

**Related Documents**:
- [Document](link)
- [Document](link)

**Last Updated**: [DATE]
**Reviewed by**: [Name]
```

---

## Linking IDs

IDs are the cross-phase reference system. Every functional requirement, system flow, test case, and design decision must have a unique ID so it can be referenced unambiguously from any other phase.

Use the `[TYPE]-[NNN]` format:
- **TYPE**: FR (Functional Requirement), NFR (Non-Functional), SF (System Flow), UI (UI Element), DD (Design Decision), TC (Test Case), ADR (Architecture Decision Record)
- **NNN**: Sequential three-digit number (001, 002, etc.)

**Examples**:
```
FR-001   User can create a task
NFR-001  Response time < 200ms
SF-001   Create task happy path
UI-001   Create task modal
DD-001   Authentication approach
TC-001   Test: Create task
ADR-001  Hexagonal architecture decision
```

**Why IDs matter**:
- Consistent references across phases — no ambiguity
- Enables full traceability (FR-001 → SF-001 → TC-001 → code)
- Makes searching and cross-referencing reliable

---

## Markdown Standards

This section defines the markdown formatting you must use in all documentation. Consistent formatting makes documents readable and compatible with documentation rendering tools.

### Formatting

**Headings** — use ATX style (`#`), never underline style:
```markdown
# Title (H1 — use once per document)
## Section (H2 — main sections)
### Subsection (H3 — details)
#### Details (H4 — use sparingly)
```

**Emphasis** — use sparingly and purposefully:
```markdown
**bold** for important terms and field names
*italic* for emphasis (use sparingly)
`code` for technical terms, file names, IDs, and commands
```

**Lists** — choose the correct type:
```markdown
- Bullet points for unordered lists
1. Numbered for ordered sequences
- [ ] Checkboxes for tasks and completion tracking
```

**Code Blocks** — always specify the language:
````markdown
```language
code here
```
````

### Examples in Documents

Every template and production document must include an `EXAMPLE` section showing what a completed version looks like. This removes ambiguity about expected output.

```markdown
## EXAMPLE

This section shows what a completed version looks like for this project.

### Example: [Item Name]

[Completed example with real project values — not placeholders]
```

---

## Phase Discipline

This section defines what content belongs in each phase group. Violating phase discipline — for example, mentioning technology names in Discovery — is a defect that must be corrected before the phase is approved.

### What Goes Where

**Discovery (Phase 1)** — Technology agnostic:
- ✅ Business needs, problems, constraints
- ✅ Actors and personas with goals and pain points
- ❌ Technology names, frameworks, implementation details

**Requirements (Phase 2)** — Technology agnostic:
- ✅ Functional requirements with acceptance criteria
- ✅ Non-functional targets (performance, security, scalability)
- ❌ Technology choices, code patterns, specific APIs

**Design and beyond (Phase 3+)**:
- ✅ System flows, UI mockups, architecture
- ✅ Technology and implementation decisions (from Phase 6)
- ✅ Code patterns and architectural choices

---

## Review & Approval Process

This section defines the review and sign-off process that every phase must follow before it is marked complete. Do not advance to the next phase without completing this process.

### Before Phase Completion

Every phase must go through this four-step review before the sign-off is recorded:

1. **Author** completes all deliverables and self-reviews
2. **Peer review** by someone who was not on the original authoring team
3. **Phase owner** validates completeness against the phase checklist
4. **Stakeholder sign-off** provides formal approval

### Making Updates

Not all updates require the same approval level. Apply the matching process:

**Minor updates** (grammar, typos, formatting):
- No formal approval required
- Commit with a clear commit message

**Content updates** (changing a requirement, decision, or scope):
- Flag the change clearly in the document
- Document why it changed
- Get stakeholder approval
- Update all related documents (traceability chain)

### Historical Material

When a document or decision is superseded, archive it rather than deleting it. History provides context for future decisions.

**Moving documents to `bkp/`** — use dated subdirectories:
```
bkp/
├── 2023-initial-proposal/
├── 2024-redesign-attempt/
└── old-decisions/
```

---

## Version Control

This section defines the commit message format and tagging conventions for documentation changes. Consistent commit messages make the documentation history searchable.

### Commit Messages

Use the `[PHASE] [TYPE]: Brief description` format:

```
Examples:
- [02-req] feature: Add NFR for API performance targets
- [03-design] fix: Correct flow description for exception case
- [06-dev] adr: Document hexagonal architecture choice
```

### Tags

Mark phase completions with git tags so the documentation history can be audited:
```bash
git tag phase-01-discovery-complete
git tag phase-02-requirements-complete
```

---

## Common Patterns

This section shows the recurring patterns you must apply when creating documents and establishing traceability. Use these patterns as templates for the traceability structures in every phase.

### Traceability Chain

Every requirement must be traceable from Discovery through to code. Build this chain explicitly in your documents:

```
Discovery Need → Requirement → Design Flow → Test Case → Code

[Actor needs help]
    ↓
[FR-001: Feature]
    ↓
[SF-001: System Flow]
    ↓
[TC-001: Test Case]
    ↓
[Code + ADR]
```

### Adding a Requirement

When you create a new functional requirement, complete the full traceability chain across phases:

```
1. Link to actor need: [FR-001](../01-templates/02-requirements/...)
2. Create acceptance criteria
3. Create a design flow for the FR: [SF-001](../01-templates/03-design/...)
4. Create a test case: [TC-001](../01-templates/07-testing/...)
5. Reference the FR in code comments or ADRs
```

---

## Tools & Automation

This section describes validation tools and automation patterns that support these conventions. Use them to catch errors before they propagate across phases.

### Markdown Validation

Before committing any documentation, verify:
- [ ] No broken links (run a link checker)
- [ ] Consistent heading structure (H1 once, H2 for sections)
- [ ] All code blocks have a language specified
- [ ] All IDs are consistent and unique (no duplicates)

### Auto-Generation

Some documentation can be generated from code artifacts. When this is possible, generate and link — do not duplicate:
- API specs from OpenAPI/AsyncAPI files
- Data model from schema definitions
- Architecture diagrams from code annotations

Link to generated docs rather than duplicating their content.

---

## FAQ

Common edge cases and their correct resolution:

**Q: When should I create a new file vs. adding to an existing one?**
- A: Create a new file if the content exceeds 1000 words or covers a clearly distinct topic. Otherwise, add to an existing file.

**Q: How many levels of directory nesting are allowed?**
- A: Maximum 2 levels (phase/section). Keep structure flat to maintain navigability.

**Q: Should all requirements be in one file?**
- A: Yes for small projects (< 50 requirements). Split into functional/ and non-functional/ subdirectories if larger.

**Q: How often should I update the macro plan?**
- A: Weekly during active development. Monthly during low-activity periods.

---

## Summary

Apply these conventions without exception:

- ✅ Consistent naming and structure across all phases
- ✅ Link across phases for traceability
- ✅ Every phase has a README entry point
- ✅ Every document has a clear stated purpose
- ✅ Old material goes to `bkp/`, never deleted
- ✅ Phase discipline enforced (what vs. how in phases 1–5)

---

**Last Updated**: [DATE]  
**Owner**: [NAME]

---

**Apply these rules**:
- Every document you create
- Every link you make
- Every time you transition to a new phase
- Every file you commit
