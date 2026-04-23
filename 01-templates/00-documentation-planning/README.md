# Phase 0: Documentation Planning

**What This Is**: The foundation phase. Establishes how the project will be documented, from discovery through operations. A one-time setup that defines structure, conventions, and tracking.  
**How to Use**: Read `HOW-TO-USE.md` first. Then customize the framework, conventions, and macro plan for your project.  
**Why It Matters**: Without this foundation, documentation becomes inconsistent, hard to find, and loses value over time. With it, any document is findable and traceable.  
**When to Complete**: Before starting Phase 1 (Discovery). Reviewed when scope changes significantly.  
**Owner**: Tech Lead + Product Manager.

---

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## Contents

- [Key Objectives](#key-objectives)
- [Files](#files)
- [Completion Checklist](#completion-checklist)
- [Sign-Off](#sign-off)
- [Tips](#tips)
- [Next Steps](#next-steps)

---

## Key Objectives

- [ ] Define project SDLC framework and phase structure
- [ ] Establish documentation conventions and navigation rules
- [ ] Create macro plan for tracking progress across all phases
- [ ] Set up document versioning and change management

## Files

| File | Description | Time to Complete | Who |
|------|-------------|----------------|------|
| **`HOW-TO-USE.md`** | Guide explaining each file, when to use, and why it matters | 30 min read | Everyone |
| **`sdlc-framework.md`** | Customized SDLC defining phase structure, deliverables, timeline | 1-2 hours | Tech Lead + PM |
| **`macro-plan.md`** | Project status tracking template (updated weekly) | 1 hour | Project Lead |
| **`navigation-conventions.md`** | Rules for naming, linking, and organizing documents | 1-2 hours | Tech Lead |

### How to Use These Files

```
START HERE → Read HOW-TO-USE.md first (30 min)
           ↓
Customize → sdlc-framework.md (adapt to your project)
           ↓
Set up    → navigation-conventions.md (learn the rules)
           ↓
Track    → macro-plan.md (use weekly)
```

### Example Output

**After completing Phase 0, you'll have**:

```
sdlc-framework.md:
- 12 phases defined with durations
- Timeline with milestones
- Deliverables per phase

macro-plan.md:
- All phases tracked with status
- Current phase: 00 Planning (90% complete)
- Next: Phase 1 Discovery starts Monday

navigation-conventions.md:
- Naming rules understood
- Document template in use
- Linking patterns established
```

**What Phase 0 enables**:

- ✅ Clear phase boundaries (no scope creep)
- ✅ Findable documents (no searching)
- ✅ Traceable requirements (link to design → test → code)
- ✅ Visible project status (weekly updates)
- ✅ Preserved history (bkp/ folder)

---

## Completion Checklist

- [ ] **Read HOW-TO-USE.md** — Understand what each file does
- [ ] **Customize sdlc-framework.md** — Adapt to your project
- [ ] **Define navigation conventions** — Document the rules
- [ ] **Create initial macro-plan.md** — Set up tracking
- [ ] **Share conventions with team** — Everyone uses them
- [ ] **Review and approve** — Tech Lead + PM sign-off

### Sign-Off

- [ ] **Prepared by**: [Name, Date]
- [ ] **Reviewed by**: [Tech Lead, Date]
- [ ] **Approved by**: [Project Manager, Date]

---

## Tips

1. **Customize the framework**: The 12 phases are a starting point. Adjust for your project:
   - Small project: Combine phases 3-4, 7-8
   - Large project: Add sub-phases for formal review

2. **Keep it simple**: Convention over configuration. Consistency matters more than perfection.

3. **Make it discoverable**: Ensure team members can find and understand docs. Use the navigation rules.

4. **Plan for updates**: Document change process before starting. Use `bkp/` for old versions.

5. **Invest time here**: 3-4 hours now saves 10x that in maintenance later.

**Common Mistakes to Avoid**:
- Skipping Phase 0 → Documentation becomes inconsistent
- Not following naming rules → Files become hard to find
- Rarely updating macro-plan → Status becomes unreliable
- Deleting old material → Loses historical context

---

## Next Steps

Once Phase 0 is complete:

1. **Phase 1: Discovery** — Start understanding the problem
2. **Use the macro-plan** — Update as you progress
3. **Follow navigation conventions** — Every document, every time

---

## Summary

| File | Purpose | When to Use |
|------|---------|-------------|
| `HOW-TO-USE.md` | Guide | Read first |
| `sdlc-framework.md` | Define how we work | Once + updates |
| `macro-plan.md` | Track progress | Weekly |
| `navigation-conventions.md` | Rulebook | Always |

**Time Estimate**: 3-4 hours total (plus 30 min read of HOW-TO-USE.md)  
**Team**: Tech Lead, Product Manager  
**Output**: Foundation for all documentation
