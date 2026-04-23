# Guide: How to Use Phase 0 Documentation Planning

You are an AI agent configuring the documentation foundation for a software project. This guide explains each Phase 0 file: what it is, what you must do with it, and why it is required before any other phase begins. Read this entire guide before modifying any Phase 0 file.

---

## What Is Phase 0?

Phase 0 establishes the **foundation** for all documentation that follows. Before you generate any Discovery, Requirements, or Design content, the following must be defined and agreed upon:

- How the project will be documented (SDLC framework)
- Where everything goes (naming and structure)
- Who is responsible for what (macro plan ownership)
- How to navigate across phases (conventions)

**Without this phase**, documentation becomes inconsistent, hard to find, and loses traceability. Skipping Phase 0 is the most common cause of documentation debt.

**When to complete**: Before starting Phase 1 (Discovery). This is a one-time setup with periodic updates when scope changes.

**Who participates**: Tech Lead, Product Manager, key stakeholders.

---

## File-by-File Guide

This section explains each Phase 0 file, what you must configure in it, and what problems it prevents. Read each file's section before opening the file.

### 1. SDLC Framework (`sdlc-framework.md`)

#### What It Is

The SDLC framework is the customized Software Development Lifecycle for this specific project. It defines how the project moves from idea to production through 12 phases. This is not a generic document — every field must be filled with project-specific values.

#### What You Must Do With It

Customize each field for this project before Phase 1 begins:

1. **Customize the phase names** if needed (e.g., rename "Design" to "UX Design" if the project is design-heavy)
2. **Set realistic durations** based on project size:
   - Small project (< 3 months): 1-2 weeks per early phase
   - Large project (> 6 months): More time for discovery/requirements
3. **Define deliverables per phase** — what must be produced to advance to the next phase?
4. **Identify participants** — who owns each phase?

#### Why It Matters

- **Prevents scope creep**: Each phase has clear, documented boundaries
- **Enables planning**: The team knows timeline, dependencies, and deliverables
- **Creates accountability**: Every deliverable has a named owner

#### Example Output

```markdown
### Phase 1: Discovery
**Duration**: 2 weeks
**Participants**: Product Manager, Tech Lead, 2 Stakeholders
**Deliverables**:
- Vision statement (1 page max)
- Actor definitions
- Scope boundaries
- Key constraints (budget, timeline, compliance)
```

---

### 2. Navigation Conventions (`navigation-conventions.md`)

#### What It Is

The navigation conventions document is the rulebook for how every document in this project is named, structured, and linked. It ensures that any document is findable and that traceability links between phases work correctly.

#### What You Must Do With It

Read this file before creating any document in the project. Apply its rules to every file you generate:

1. **Follow naming conventions** strictly (e.g., `TEMPLATE-filename.md`, not `Template_Filename.md`)
2. **Use the document template** — every file must include a navigation header, content index, and footer
3. **Link proactively** — whenever you reference something, link to it
4. **Use IDs consistently**: `FR-001`, `SF-001`, `TC-001` — never free-form text references

#### Why It Matters

- **Traceability**: You can trace a requirement from Discovery → Design → Test → Code
- **Findability**: No document is more than 3 clicks from any other
- **Maintenance**: When you update a document, links make it clear what else is affected

#### The Core Rules

| Rule | Why |
|------|-----|
| Every document has navigation links | Reader never gets stuck in a dead end |
| Every phase has a README | Entry point always exists |
| Use relative paths | Links work across environments |
| Link IDs are unique | No ambiguity when referencing across phases |
| Old material → `bkp/` | History preserved, not lost |

---

### 3. Macro Plan (`macro-plan.md`)

#### What It Is

The macro plan is the single source of truth for the project's progress across all 12 phases. It must be initialized during Phase 0 and updated weekly throughout the project.

#### What You Must Do With It

Initialize and maintain this file as follows:

1. **Initialize at project start** — fill in all phases with owners and target dates
2. **Update weekly** during active development — completion percentages and blockers
3. **Update blockers immediately** when they appear — do not wait for the weekly update
4. **Use in phase transitions** — verify that the current phase is complete before advancing

#### Why It Matters

- **Visibility**: Any stakeholder can see project status at a glance
- **Accountability**: Blockers are documented with owners, not buried in conversation
- **Planning**: Next phase preparation can begin while the current phase finishes

#### Key Sections

| Section | What It Shows |
|---------|-------------|
| Phase Status table | All phases with status, completion, owner, target date |
| Current Phase | Active phase details, deliverables, blockers, next steps |
| Next Phase Preview | Preparation items for the upcoming phase |
| Risks & Decisions | Open risks with mitigation and pending decisions |
| Milestones | Key dates and delivery targets |

---

### 4. Phase Input (`PHASE-INPUT.md`)

#### What It Is

`PHASE-INPUT.md` defines the required input data you must verify before beginning each phase in autonomous mode. It provides the context map table, the standard input structure, and the validation checklist you must apply before generating any phase content.

#### What You Must Do With It

Consult this file before starting any phase when operating autonomously:

1. **Check the context map** — verify which documents are required from the previous phase
2. **Validate inputs exist** — read and confirm each required document is complete
3. **If inputs are missing, stop and request them** — never generate a phase without its required inputs
4. **Use the standard input structure** — produce a structured input record before generating output

#### Why It Matters

- **Prevents incoherent output**: Generating without verified context produces generic, untraced documentation
- **Enables autonomous operation**: Structured input/output makes phase transitions reliable without human intervention

---

### 5. README (`README.md`)

#### What It Is

The `README.md` is the entry point and navigation index for Phase 0. It provides the completion checklist, sign-off record, and summary of all Phase 0 files.

#### What You Must Do With It

1. **Read it first** — always the first file to open in Phase 0
2. **Use its completion checklist** — verify each item before advancing to Phase 1
3. **Record sign-offs** — populate the sign-off section when the phase is approved

#### Why It Matters

- **Onboarding**: New contributors understand the Phase 0 structure immediately
- **Quality gate**: The checklist ensures nothing is skipped

---

## When to Update Each File

Each file has a different update cadence. Applying updates at the wrong time (or failing to update at the right time) degrades documentation reliability.

| File | When to Update |
|------|---------------|
| `sdlc-framework.md` | Once at project start; again on significant scope changes |
| `navigation-conventions.md` | Once at project start; only when conventions must change |
| `macro-plan.md` | Weekly during development; immediately when blockers appear |
| `PHASE-INPUT.md` | Before each phase in autonomous mode |
| `README.md` | When phase deliverables or sign-offs change |

---

## Errors to Avoid

These are the most common Phase 0 mistakes and their consequences. Recognizing them prevents documentation failures downstream.

| Mistake | Consequence |
|--------|-------------|
| Skipping Phase 0 entirely | Documentation across phases becomes inconsistent and hard to maintain |
| Not linking documents | Readers lose traceability — requirements can't be traced to design or tests |
| Updating macro plan rarely | Project status becomes unreliable; blockers go unnoticed |
| Breaking naming conventions | Files become hard to locate; automated tooling breaks |
| Deleting old material instead of archiving | Historical context and decision rationale is lost permanently |

---

## Relationship to Other Phases

Phase 0 creates the rules and structure that all other phases follow. No phase produces documentation correctly without Phase 0 being complete first.

```
Phase 0 (Planning)
    ├── Defines: Phase structure → All phases follow it
    ├── Rules: Navigation → All phases use it
    ├── Tracks: Progress → macro-plan updates across all phases
    └── Sets: Conventions → Design, Requirements, etc. all follow them
```

---

## Operational Workflow

### Starting a New Project

When setting up Phase 0 for the first time, follow this sequence:

```
Day 1:
1. Read this guide (30 min)
2. Customize sdlc-framework.md with project-specific values (2 hours)
3. Configure navigation-conventions.md for this project's context (1 hour)
4. Initialize macro-plan.md with all 12 phases, owners, and target dates (1 hour)
5. Human collaborator reviews and approves

Day 2+:
- Begin Phase 1: Discovery
- Use macro-plan.md to track progress
- Apply navigation conventions to every new document
```

### Ongoing Maintenance

Phase 0 files require periodic maintenance throughout the project lifecycle:

```
Weekly:
- Update macro-plan.md (15 minutes — completion percentages, blockers)
- Verify no broken links in recent commits

Monthly:
- Review phase completions in macro-plan.md
- Update milestone dates if timeline has shifted

As Needed:
- Update sdlc-framework.md for significant scope changes
- Update navigation-conventions.md if team processes change
```

---

## Summary

| File | Purpose | How Often | Owner |
|------|---------|----------|-------|
| `sdlc-framework.md` | Define the project's SDLC structure | Once + scope changes | Tech Lead |
| `navigation-conventions.md` | Rulebook for all documentation | Once + process changes | Tech Lead |
| `macro-plan.md` | Project health dashboard | Weekly | Project Lead |
| `PHASE-INPUT.md` | Required inputs per phase (autonomous mode) | Before each phase | AI Agent |
| `README.md` | Phase 0 entry point and checklist | When deliverables change | Any |

**Remember**: Phase 0 is the foundation. Errors here propagate across all 12 phases.

---

**Last Updated**: [DATE]
**Owner**: [NAME]
