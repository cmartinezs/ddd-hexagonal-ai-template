# Navigation Conventions

**What This Is**: The rulebook ensuring every document is findable and linked to others. Think of it as the "GPS" for the documentation.  
**How to Use**: Read before creating any document. Follow strictly. Link proactively — if you mention something, link to it.  
**Why It Matters**: Without these rules, documentation becomes a maze. With them, any document is at most 3 clicks away.  
**When to Reference**: Every time you create, move, or link documents. Not just once — ongoing.  
**Owner**: Tech Lead (can delegate to documentation owner).

---

## Contents

- [File Structure Rules](#file-structure-rules)
- [Linking Between Documents](#linking-between-documents)
- [Document Templates](#document-templates)
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

### Naming Conventions

**Directories**:
```
Phase directories: 00-PLANNING, 01-discovery, 02-requirements, etc.
Prefix: Phase number (00-11)
Format: lowercase with hyphens
```

**Files**:
```
README.md                    # Phase overview (required in every phase directory)
TEMPLATE-filename.md         # Template files (prefix TEMPLATE-)
[filename].md               # Regular documentation files
adr/                        # Architecture Decision Records subdirectory
bkp/                        # Backup/historical material
```

**Examples**:
- ✅ `01-templates/01-discovery/README.md` — Phase overview
- ✅ `01-templates/01-discovery/TEMPLATE-context-motivation.md` — Template file
- ✅ `01-templates/02-requirements/functional-requirements.md` — Requirements file
- ✅ `01-templates/06-development/adr/ADR-001-hexagonal-architecture.md` — Decision record
- ❌ `Discovery/README.md` — Wrong directory name
- ❌ `01-templates/01-discovery/CONTEXT-TEMPLATE.md` — Wrong naming convention

### Why These Rules Matter

| Rule | Problem Without It | Solution |
|------|-------------------|----------|
| Phase prefix | Can't tell phase order | 01-discovery vs 02-requirements |
| TEMPLATE- prefix | Can't find templates | TEMPLATE-filename.md |
| bkp/ folder | Deleted = lost forever | Preserves history |
| README in each folder | No entry point | Always know where to start |

---

## Linking Between Documents

### Internal Links (within repo)

**Format**:
```markdown
See [Document Title](relative/path/to/file.md) for details.
See [Requirement FR-001](../01-templates/02-requirements/functional-requirements.md#fr-001) for acceptance criteria.
```

**Rules**:
- Use relative paths (not absolute)
- Link to specific sections using #anchor
- Use descriptive link text (not "click here")
- Test links before committing

### Why Linking Matters

- **Traceability**: You can trace a requirement from Discovery → Design → Test → Code
- **Navigation**: Reader can jump to related content without searching
- **Maintenance**: Broken links surface problems immediately
- **Context**: Reader understands how pieces connect

### Cross-Phase References

**Standard linking patterns**:
- Phase 1 → Phase 2: Discovery context guides requirements
- Phase 2 → Phase 3: Requirements inform design
- Phase 3 → Phase 6: Design drives architecture
- Phase 6 → Phase 7: Implementation drives test strategy
- Phase 8 → Phase 9: Deployment drives operations

**Example**:
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

### Every Phase README Must Include

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

**Header**:
```markdown
# [Phase Number]: Document Title

**Purpose**: One-line statement of why this document exists
**Owner**: Who maintains this?
**Last Updated**: [DATE]
**Status**: [Draft/In Review/Approved]
```

**Footer** (optional):
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

Use consistent IDs for traceability:

**Format**: `[TYPE]-[NNN]` where:
- TYPE: FR (Functional Requirement), NFR (Non-Functional), SF (System Flow), UI (UI Element), DD (Design Decision), etc.
- NNN: Sequential number (001, 002, etc.)

**Examples**:
```
FR-001   User can create a task
NFR-001  Response time < 200ms
SF-001   Create task happy path
UI-001   Create task modal
DD-001   Authentication approach
TC-001   Test: Create task
```

**Why**:
- Consistent references across documents
- Enables traceability (FR-001 → SF-001 → TC-001)
- Easier searching and organization

---

## Markdown Standards

### Formatting

**Headings**:
```markdown
# Title (H1 — use once per document)
## Section (H2 — main sections)
### Subsection (H3 — details)
#### Details (H4 — rarely needed)
```

**Emphasis**:
```markdown
**bold** for important terms
*italic* for emphasis (sparingly)
`code` for technical terms, file names
```

**Lists**:
```markdown
Bullet points for unordered lists
1. Numbered for ordered lists
- [ ] Checkboxes for tasks/completeness
```

**Code Blocks**:
````markdown
```language
code here
```
````

### Examples in Documents

Every template should have an "EXAMPLE" section:

```markdown
## EXAMPLE

This section shows what a completed version looks like.

### Example: [Item Name]

[Show completed example with context and explanation]
```

---

## Phase Discipline

### What Goes Where

**Discovery (Phase 1)**:
- ✅ Business needs, problems, constraints
- ✅ Actors and personas
- ❌ Technology names, frameworks, implementation details

**Requirements (Phase 2)**:
- ✅ Functional requirements with acceptance criteria
- ✅ Non-functional targets (performance, security)
- ❌ Technology choices, code patterns, APIs

**Design (Phase 3+)**:
- ✅ System flows, UI mockups, architecture
- ✅ Technology and implementation decisions
- ✅ Code patterns and architectural choices

---

## Review & Approval Process

### Before Phase Completion

1. **Author** completes all deliverables
2. **Peer review** by someone not on original team
3. **Phase owner** validates completeness
4. **Stakeholder sign-off** gets formal approval

### Making Updates

**Minor updates** (grammar, typo, clarity):
- No approval needed, just commit with message

**Content updates** (change requirement, decision, etc.):
- Flag the change clearly
- Document why it changed
- Get stakeholder approval
- Update related documents (traceability)

### Historical Material

**Moving documents to `bkp/`**:
- Old specifications from previous attempts
- Deprecated decisions
- Historical context

**Keep in bkp/**: Version as subdirectories
```
bkp/
├── 2023-initial-proposal/
├── 2024-redesign-attempt/
└── old-decisions/
```

---

## Version Control

### Commit Messages

```
Format: [PHASE] [TYPE]: Brief description

Examples:
- [02-req] feature: Add NFR for API performance targets
- [03-design] fix: Correct flow description for exception case
- [06-dev] adr: Document hexagonal architecture choice
```

### Tags

Mark completed phases:
```bash
git tag phase-01-discovery-complete
git tag phase-02-requirements-complete
```

---

## Common Patterns

### Traceability Chain

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

```
1. Link to actor need: [FR-001](../01-templates/02-requirements/...)
2. Create acceptance criteria
3. Design flow for FR: [SF-001](../01-templates/03-design/...)
4. Create test case: [TC-001](../01-templates/07-testing/...)
5. Implementation links back to FR in comments
```

---

## Tools & Automation

### Markdown Validation

**Checklist** before committing:
- [ ] No broken links (test with link checker)
- [ ] Consistent heading structure
- [ ] Code blocks have language specified
- [ ] IDs are consistent (no duplicates)

### Auto-Generation

Some docs can be generated from code:
- API specs from OpenAPI/AsyncAPI files
- Data model from schema definitions
- Architecture from code comments

Link to generated docs rather than duplicating.

---

## FAQ

**Q: When should I create a new file vs. adding to existing?**
- A: New file if > 1000 words or distinct topic. Otherwise add to existing.

**Q: How many levels of nesting?**
- A: Max 2 levels (phase/section). Keep it flat.

**Q: Should all requirements be in one file?**
- A: Yes for small projects (< 50 requirements). Split if larger.

**Q: How often should I update the macro plan?**
- A: Weekly during active development. Monthly otherwise.

---

## Summary

**Remember**:
- ✅ Consistent naming and structure
- ✅ Link across phases for traceability
- ✅ Every phase has a README
- ✅ Every doc has a clear purpose
- ✅ Old material goes to bkp/, not deleted
- ✅ Phase discipline (what vs. how)

---

**Last Updated**: [DATE]  
**Owner**: [NAME]

---

**When to apply these rules**:
- Every document you create
- Every link you make
- Every time you move to a new phase
- Every file you commit
