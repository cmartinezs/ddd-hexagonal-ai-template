# Guide: How to Use Phase 0 Documentation Planning

This guide explains Phase 0 files, when and how to use each one, and why they matter for the project.

---

## What Is Phase 0?

Phase 0 establishes the **foundation** for all documentation that follows. It's where you define:
- How the project will be documented (SDLC framework)
- Where everything goes (naming and structure)
- Who does what (macro plan)
- How to navigate (conventions)

**Without this phase**, documentation becomes inconsistent, hard to find, and loses value over time.

**When to complete**: Before starting Phase 1 (Discovery). This is a one-time setup.

**Who participates**: Tech Lead, Product Manager, key stakeholders.

---

## File-by-File Guide

### 1. SDLC Framework (`sdlc-framework.md`)

#### What It Is

A customized Software Development Lifecycle that describes **how your project moves from idea to production**. It's not generic — it's tailored to your project.

#### How to Use It

1. **Customize the phase names** if needed (e.g., rename "Design" to "UX Design" if your project is design-heavy)
2. **Set realistic durations** based on project size:
   - Small project (< 3 months): 1-2 weeks per early phase
   - Large project (> 6 months): More time for discovery/requirements
3. **Define deliverables per phase** — what's required to move forward?
4. **Identify participants** — who owns each phase?

#### Why It Matters

- **Prevents scope creep**: Each phase has clear boundaries
- **Enables planning**: Team knows timeline and dependencies
- **Creates accountability**: Each deliverable has an owner

#### Example Output

```markdown
### Phase 1: Discovery
**Duration**: 2 weeks
**Participants**: Product Manager, Tech Lead, 2 Stakeholders
**Deliverables**:
- Vision statement (1 page max)
- Actor definitions
- Scope boundaries
- Key constraints (budget, timeline, tech)
```

---

### 2. Navigation Conventions (`navigation-conventions.md`)

#### What It Is

Rules that ensure **every document is findable and linked** to others. Think of it as the "GPS" for the documentation.

#### How to Use It

1. **Read before creating any document** in the project
2. **Follow naming conventions** strictly (e.g., `TEMPLATE-filename.md`, not `Template_Filename.md`)
3. **Use the document template** — always include header, content index, footer
4. **Link proactively** — if you mention something, link to it
5. **Use IDs consistently**: `FR-001`, `SF-001`, `TC-001`

#### Why It Matters

- **Traceability**: You can trace a requirement through design → test → code
- **Findability**: No document is more than 3 clicks away
- **Maintenance**: Updates propagate correctly

#### The Core Rules

| Rule | Why |
|------|-----|
| Every document has navigation links | Reader never gets stuck |
| Every phase has a README | Entry point exists |
| Use relative paths | Works across environments |
| Link IDs are unique | Prevents confusion |
| Old material → `bkp/` | History preserved, not lost |

---

### 3. Macro Plan (`macro-plan.md`)

#### What It Is

A **single source of truth** for where the project stands across all phases. Updated regularly by the lead.

#### How to Use It

1. **Create at project start** — fill in Phase 0
2. **Update weekly** during active development
3. **Update blockers immediately** when they appear
4. **Review in weekly sync** — discuss blockers and next steps

#### Why It Matters

- **Visibility**: Everyone sees project status at a glance
- **Accountability**: Blockers are documented, not buried
- **Planning**: Next phase prep starts before current ends

#### Key Sections

| Section | What It Shows |
|---------|-------------|
| Phase Status | What's done, in progress, blocked |
| Current Phase | What's happening now |
| Blockers | What's stopping progress |
| Risks | What could go wrong |
| Milestones | Key dates |

---

### 4. README (`README.md`)

#### What It Is

The **entry point** for Phase 0. Explains what files exist and how to use them.

#### How to Use It

1. **Start here** — always read this first
2. **Use the checklist** to ensure completeness
3. **Follow the tips** for best practices

#### Why It Matters

- **Onboarding**: New team members understand the structure
- **Quality gate**: Checklist ensures nothing is missed

---

## When to Update Each File

| File | When to Update |
|------|---------------|
| `sdlc-framework.md` | Initially, plus major scope changes |
| `navigation-conventions.md` | Only when conventions change |
| `macro-plan.md` | Weekly during development |
| `README.md` | When phase deliverables change |

---

## Common Mistakes to Avoid

| Mistake | Why It's a Problem |
|--------|----------------|
| Skipping Phase 0 | Documentation becomes inconsistent |
| Not linking documents | Readers get lost |
| Updating macro plan rarely | Status becomes unreliable |
| Breaking naming conventions | Files become hard to find |
| Deleting old material | Loses historical context |

---

## Relationship to Other Phases

Phase 0 creates the rules that **all other phases follow**.

```
Phase 0 (Planning)
    ├── Defines: Phase structure → Discovery follows it
    ├── Rules: Navigation → All phases use it
    ├── Tracks: Progress → macro plan updates across all phases
    └── Sets: Conventions → Design, Requirements, etc. all follow
```

---

## Example Workflow

### Starting a New Project

```
Week 1:
1. Read this guide
2. Customize sdlc-framework.md (2 hours)
3. Define navigation conventions (1 hour)
4. Create initial macro-plan.md (1 hour)
5. Team reviews and approves

Week 2:
- Start Phase 1: Discovery
- Use macro-plan.md to track progress
- Follow navigation conventions for all new docs
```

### Ongoing Maintenance

```
Weekly:
- Update macro-plan.md (15 minutes)
- Check for broken links

Monthly:
- Review phase completions
- Update milestone dates

As Needed:
- Update sdlc-framework.md for scope changes
- Update navigation conventions if needed
```

---

## Summary

| File | Purpose | How Often | Owner |
|------|---------|----------|-------|
| `sdlc-framework.md` | Define how we work | Once + updates | Tech Lead |
| `navigation-conventions.md` | Rulebook for docs | Once + updates | Tech Lead |
| `macro-plan.md` | Project health dashboard | Weekly | Project Lead |
| `README.md` | Phase 0 entry point | When deliverables change | Any |

**Remember**: Phase 0 is the foundation. Invest time here to save time later.

---

**Last Updated**: [DATE]
**Owner**: [NAME]