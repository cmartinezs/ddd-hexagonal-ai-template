# Phase 0: Documentation Planning

You are an AI agent setting up or reviewing the documentation foundation for a software project. Phase 0 is the prerequisite for all other phases — it defines the SDLC structure, naming conventions, and progress tracking that every subsequent phase relies on. Complete this phase before generating any Phase 1 content.

**What This Is**: The foundation phase. Establishes how the project will be documented, from discovery through operations. A one-time setup that defines structure, conventions, and tracking.  
**How to Use**: Read `HOW-TO-USE.md` first. Then customize the framework, conventions, and macro plan for the specific project.  
**Why It Matters**: Without this foundation, documentation becomes inconsistent, hard to find, and loses traceability over time. With it, every document is findable and every requirement is traceable end-to-end.  
**When to Complete**: Before starting Phase 1 (Discovery). Revisit when scope changes significantly.  
**Owner**: Tech Lead + Product Manager.

---

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Key Objectives](#key-objectives)
- [Files](#files)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)
- [Operating Guidelines](#operating-guidelines)
- [Next Steps](#next-steps)

---

## Key Objectives

These are the outcomes you must produce before Phase 0 is considered complete. Each item is a gate — do not advance to Phase 1 until all are checked.

- [ ] Define project SDLC framework and phase structure
- [ ] Establish documentation conventions and navigation rules
- [ ] Create macro plan for tracking progress across all phases
- [ ] Set up document versioning and change management

## Files

This section lists every file in Phase 0 and specifies when to use each one. Read `HOW-TO-USE.md` before touching any other file — it explains the purpose and sequence.

| File | Description | Time to Complete | Who |
|------|-------------|----------------|------|
| **`HOW-TO-USE.md`** | Explains each file, when to use it, and why it matters | 30 min read | Everyone |
| **`sdlc-framework.md`** | Customized SDLC defining phase structure, deliverables, timeline | 1-2 hours | Tech Lead + PM |
| **`macro-plan.md`** | Project status tracking template (updated weekly) | 1 hour | Project Lead |
| **`navigation-conventions.md`** | Rules for naming, linking, and organizing documents | 1-2 hours | Tech Lead |
| **`PHASE-INPUT.md`** | Required inputs per phase for autonomous AI execution | Reference | AI Agent |

### File Sequence

Process these files in order. Each file depends on the previous one being understood or partially completed.

```
START HERE → Read HOW-TO-USE.md first (30 min)
           ↓
Customize → sdlc-framework.md (adapt to your project)
           ↓
Set up    → navigation-conventions.md (learn the rules)
           ↓
Track    → macro-plan.md (initialize and maintain weekly)
           ↓
Reference → PHASE-INPUT.md (use before each phase in autonomous mode)
```

### Expected Output

After completing Phase 0, the following must exist and be project-specific (not template text):

```
sdlc-framework.md:
- 12 phases defined with project-specific durations
- Timeline with actual milestones
- Deliverables per phase, specific to this project

macro-plan.md:
- All phases tracked with status
- Current phase: 00 Planning (complete)
- Next: Phase 1 Discovery — start date defined

navigation-conventions.md:
- Naming rules documented
- Document template in use
- Linking patterns established
```

**What Phase 0 enables for all subsequent phases**:

- ✅ Clear phase boundaries (prevents scope creep)
- ✅ Findable documents (no searching required)
- ✅ Traceable requirements (link to design → test → code)
- ✅ Visible project status (weekly updates)
- ✅ Preserved history (`bkp/` folder in use)

---

## Completion Checklist

Verify each item before marking Phase 0 complete and advancing to Phase 1. Every unchecked item is a gap that will cost time later.

- [ ] **Read HOW-TO-USE.md** — Understand what each file does and when to use it
- [ ] **Customize sdlc-framework.md** — Adapt phase names, durations, and deliverables to this project
- [ ] **Define navigation conventions** — All naming and linking rules are documented
- [ ] **Create initial macro-plan.md** — Phase tracking table is initialized with correct dates and owners
- [ ] **Share conventions with team** — All contributors are aware of the rules
- [ ] **Review and approve** — Tech Lead + PM have signed off

### Sign-Off

Phase 0 is not complete until the following sign-offs are recorded. Do not begin Phase 1 without them.

- [ ] **Prepared by**: [Name, Date]
- [ ] **Reviewed by**: [Tech Lead, Date]
- [ ] **Approved by**: [Project Manager, Date]

---

## Operating Guidelines

These guidelines apply whenever you create, modify, or reference documentation in this project. They are not one-time rules — apply them continuously.

1. **Customize the framework for this project**: The 12 phases are a starting point, not a fixed structure. Adjust for project size:
   - Small project: Combine phases 3–4, 7–8
   - Large project: Add sub-phases for formal review gates

2. **Prioritize consistency over perfection**: Follow the naming and linking conventions strictly. Minor inconsistencies compound into navigation problems at scale.

3. **Make every document discoverable**: Apply navigation rules to every file so that any document is reachable within 3 clicks from the project root.

4. **Plan for documentation changes**: Use `bkp/` for old versions. Never delete historical material — archive it.

5. **Treat Phase 0 as an investment**: The time spent here prevents 10× that time in documentation maintenance across all subsequent phases.

**Errors to Avoid**:
- Skipping Phase 0 → Documentation becomes inconsistent across phases
- Not following naming rules → Files become hard to locate and reference
- Rarely updating macro-plan → Project status becomes unreliable
- Deleting old material → Historical context is lost permanently

---

## Next Steps

Once Phase 0 is complete and all sign-offs are obtained, proceed in this order:

1. **Phase 1: Discovery** — Begin understanding the problem and actors
2. **Use the macro-plan** — Update it at the start of Phase 1 and weekly thereafter
3. **Follow navigation conventions** — Apply them to every document, every time

---

## Summary

| File | Purpose | When to Use |
|------|---------|-------------|
| `HOW-TO-USE.md` | Operational guide for Phase 0 files | Read first, before anything else |
| `sdlc-framework.md` | Define the project's phase structure | Once at start, update on scope changes |
| `macro-plan.md` | Track project progress | Weekly during active development |
| `navigation-conventions.md` | Rulebook for all documentation | Every time you create or link a document |
| `PHASE-INPUT.md` | Required inputs per phase | Before each phase in autonomous mode |
