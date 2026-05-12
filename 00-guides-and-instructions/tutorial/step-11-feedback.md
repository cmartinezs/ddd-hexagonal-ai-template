[← Tutorial README](./README.md) | [< Previous](./step-10-monitoring.md)

---

# Step 11: Feedback

**What This Is**: Closing the documentation loop by collecting retrospectives, user feedback, and lessons learned — then converting them into actionable improvements for the next cycle.

**How to Use**: Run the retrospective for the completed cycle, collect user feedback, document lessons learned, and update the roadmap for the next planning phase.

**Why It Matters**: Feedback is where the system improves. Without systematic collection and action, the same mistakes repeat and opportunities are lost.

**When to Use**: After each release cycle. Informs the next Planning phase (Phase 5).

**Owner**: Product Manager / Engineering Lead.

---

## Contents

1. [Goal](#1-goal)
2. [Prerequisites](#2-prerequisites)
3. [Instructions](#3-instructions)
4. [AI Prompt](#4-ai-prompt)
5. [Done Check](#5-done-check)
6. [Next Step](#6-next-step)

---

## 1. Goal

Produce the Feedback package for your project:

- `retrospectives/` — one retro document per completed cycle
- `user-feedback.md` — feedback collection workflows and results
- `lessons-learned.md` — cross-cycle technical and process learnings
- `documentation-update-log.md` — what changed in documentation and why

---

## 2. Prerequisites

- [ ] At least one milestone/release cycle has been completed
- [ ] Phase 5 (Planning) roadmap has milestone definitions to compare against
- [ ] Team is available for retrospective session
- [ ] You have access to `01-templates/11-feedback/`

---

## 3. Instructions

1. **Run the Retrospective**
   - Structure: What worked → What didn't → Action items
   - Per phase (0–10): what was done well, what could be improved
   - DDD maturity assessment: how well did the team apply bounded contexts, aggregates, ubiquitous language?
   - Documentation quality review: which documents were useful, which were ignored?

   Retro format per phase:
   - **What worked**: concrete examples of effective practices
   - **What didn't work**: specific failure modes with context
   - **Action items**: named owner + target date for improvements

2. **Collect User Feedback**
   - NPS (Net Promoter Score) surveys
   - Bug reports and feature requests
   - Usage analytics (from Phase 10 dashboards)
   - Support ticket themes (from Phase 9 operations)

3. **Generate `retrospectives/[cycle-name].md`**
   - Cycle name: `retro-[milestone-id]-[date].md`
   - Per phase: what worked, what didn't, action items
   - DDD maturity score (1–5) with justification
   - Overall cycle assessment: on time? on budget? scope met?

4. **Generate `user-feedback.md`**
   - Feedback channels: NPS, surveys, bug reports, feature requests
   - Feedback summary per cycle: themes, volumes, key insights
   - Feedback-to-roadmap linkage: which items from feedback are in the next planning?

5. **Generate `lessons-learned.md`**
   - Technical lessons: architectural decisions that worked/didn't, patterns to repeat/avoid
   - Process lessons: which documentation was useful, what slowed the team down
   - Anti-patterns: identified patterns that created problems

6. **Update the documentation update log**
   - Track what changed in documentation across cycles
   - Note why changes were made (feedback, learnings, scope changes)
   - Maintain living documentation

> **You're done with the full SDLC cycle!** After completing Feedback, the next step is to start a new Planning phase (Phase 5) with the insights gathered here.

---

## 4. AI Prompt

> Copy the prompt below and use it to generate the Feedback documents.

```
# Context
[Completed milestones: list milestones from Phase 5 roadmap]
[Retrospective results: what worked, what didn't, action items]
[User feedback: NPS, surveys, bug reports, feature requests]
Project: [your project name]

# Task
Generate:
- "01-templates/11-feedback/retrospectives/retro-[milestone]-[date].md" — per phase retrospective
- "01-templates/11-feedback/user-feedback.md" — feedback collection and summary
- "01-templates/11-feedback/lessons-learned.md" — technical and process learnings
- "01-templates/11-feedback/documentation-update-log.md" — documentation changes log

# Retrospective Requirements
Per phase (0-10):
- What worked (specific examples)
- What didn't work (failure modes with context)
- Action items (owner + target date)

DDD maturity assessment:
- Bounded contexts: were boundaries clear and stable?
- Ubiquitous language: was terminology consistent?
- Aggregates: were they correctly sized?
Score: 1-5 with justification

Overall cycle assessment:
- On time? On budget? Scope met?
- Key metrics: cycle time, defect rate, documentation coverage

# User Feedback Requirements
- Summary per channel (NPS, surveys, bugs, features)
- Key themes (top 3 issues, top 3 requests)
- Feedback-to-roadmap linkage

# Lessons Learned Requirements
Technical:
- Architectural decisions that worked
- Patterns to repeat / anti-patterns to avoid

Process:
- Documentation that was useful
- Documentation that was ignored or burdensome
- Process improvements identified

# Validation
- [ ] Are action items specific with owners and dates?
- [ ] Is DDD maturity scored with concrete justification?
- [ ] Are feedback insights linked to roadmap changes?
- [ ] Are lessons learned specific enough to act on?
```

---

## 5. Done Check

- [ ] Retrospective covers all phases (0–10) with what worked/didn't and action items
- [ ] DDD maturity is scored (1–5) with justification
- [ ] User feedback is collected from multiple channels (NPS, bugs, features)
- [ ] Key feedback items are linked to roadmap changes in the next planning phase
- [ ] Lessons learned are specific and actionable (not generic "improve communication")
- [ ] Documentation update log tracks what changed and why
- [ ] Product Manager and Engineering Lead have reviewed and signed off

---

## 6. Next Step

**You're done!** You have completed the full SDLC documentation cycle (Phases 0–11).

**Next steps:**

- **Start a new cycle**: Use your lessons learned to plan Phase 5 (Planning) improvements
- **Reference the tutorial**: Use this tutorial to onboard new team members
- **Explore further**: Check [`SKILLS-AND-PLUGINS-GUIDE.md`](../../SKILLS-AND-PLUGINS-GUIDE.md) for phase-specific skills
- **Review the full-cycle example**: See [`TUTORIAL-FULL-CYCLE.md`](../../TUTORIAL-FULL-CYCLE.md) for the URL Shortener case study

[← Tutorial README](./README.md) | [< Previous](./step-10-monitoring.md)