# Macro Plan - Progress Tracking

You are an AI agent responsible for initializing and maintaining this progress tracking document. Fill in every placeholder with project-specific values at the start of Phase 0. Update the status table and current phase section every week during active development. Update blockers immediately when they appear — do not wait for the weekly update.

**What This Is**: A single source of truth showing where the project stands across all 12 phases. Updated weekly.  
**How to Use**: Initialize all phases at project start. Update blockers immediately when they appear. Review in the weekly sync meeting.  
**Why It Matters**: Provides visibility, accountability, and early warning of blockers. Without this, the team works without a shared view of project health.  
**When to Update**: Initially during Phase 0, then weekly during active development. Blockers → update immediately.  
**Owner**: Project Lead or Tech Lead (the person responsible for overall project health).

---

**Project**: [PROJECT NAME]  
**Last Updated**: [DATE]  
**Lead**: [NAME]

---

## Contents

- [Project Status Summary](#project-status-summary)
- [Current Phase](#current-phase)
- [Next Phase Preview](#next-phase-preview)
- [Risks & Decisions](#risks--decisions)
- [Milestones](#milestones)
- [Team Capacity](#team-capacity)
- [Meeting Schedule](#meeting-schedule)
- [Communication](#communication)

---

## Project Status Summary

This table is the central status view for the entire project. It must be accurate at all times — an outdated status table is worse than no table because it creates false confidence. Update it weekly.

| Phase | Status | Completion | Owner | Target Date | Notes |
|-------|--------|------------|-------|-------------|-------|
| 00 Planning | ⬜ | 0% | [Name] | [Date] | Framework setup |
| 01 Discovery | ⬜ | 0% | [Name] | [Date] | Context & actors |
| 02 Requirements | ⬜ | 0% | [Name] | [Date] | FRs & NFRs |
| 03 Design | ⬜ | 0% | [Name] | [Date] | Flows & UX |
| 04 Data Model | ⬜ | 0% | [Name] | [Date] | Schema & ERD |
| 05 Planning | ⬜ | 0% | [Name] | [Date] | Roadmap & sprints |
| 06 Development | ⬜ | 0% | [Name] | [Date] | Architecture & code |
| 07 Testing | ⬜ | 0% | [Name] | [Date] | Test strategy |
| 08 Deployment | ⬜ | 0% | [Name] | [Date] | CI/CD & release |
| 09 Operations | ⬜ | 0% | [Name] | [Date] | Runbooks & SLA |
| 10 Monitoring | ⬜ | 0% | [Name] | [Date] | Metrics & alerts |
| 11 Feedback | ⬜ | 0% | [Name] | [Date] | Retros & learning |

**Legend**: ⬜ Planned | 🟨 In Progress | 🟩 Complete | 🟥 Blocked

---

## Current Phase

This section provides detailed tracking for the phase currently in progress. Replace the template fields with real values when a phase begins. The `Blockers` field must be updated immediately when a blocker appears — do not leave it empty if a blocker exists.

### Phase: [NUMBER - NAME]

**Status**: [Planned/In Progress/Complete]  
**Completion**: [X]%  
**Due Date**: [DATE]

**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2
- [ ] Deliverable 3

**Blockers**:
- [None] / [List blockers with owner and date raised]

**Next Steps**:
- [Action 1 — Owner, Due Date]
- [Action 2 — Owner, Due Date]

**Example** (Phase 2: Requirements in progress):
```
### Phase: 02 - Requirements

**Status**: 🟨 In Progress
**Completion**: 60%
**Due Date**: 2024-02-15

**Deliverables**:
- [x] FR-001 through FR-015
- [x] NFR-001 through NFR-005
- [ ] FR-016 through FR-020 (in review)
- [ ] Acceptance criteria for all FRs

**Blockers**:
- None

**Next Steps**:
- Complete FR-016 through FR-020 (Alice, today)
- Write acceptance criteria for FR-016 (Bob, tomorrow)
- Peer review all requirements (Team, Feb 12)
```

---

## Next Phase Preview

This section prepares for the upcoming phase while the current one is still active. Filling this in before the current phase ends prevents delays at the phase boundary. Update it at least one week before the current phase is expected to complete.

### Phase: [NUMBER - NAME]

**Start Date**: [DATE]  
**Estimated Duration**: [X days/weeks]  
**Key Dependencies**: [List what must be complete before this phase can start]

**Preparation**:
- [ ] [Prep item 1 — Owner, Due Date]
- [ ] [Prep item 2 — Owner, Due Date]

---

## Risks & Decisions

This section tracks active risks and pending decisions that could affect the project timeline or scope. Record every risk and decision here — do not leave them in chat threads or emails.

### Critical Risks

A critical risk is one that, if it materializes, would delay a phase or reduce deliverable quality. List every known risk and assign a mitigation owner.

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|-----------|-------|
| [Risk 1] | [High/Med/Low] | [High/Med/Low] | [Plan] | [Name] |

### Open Decisions

An open decision is one that has not been made yet but must be resolved before a future phase can proceed. Every open decision must have an owner and a target resolution date.

| Decision | Options | Owner | Target Date |
|----------|---------|-------|-------------|
| [Decision 1] | [Option A / Option B] | [Name] | [Date] |

---

## Milestones

This section lists the major delivery milestones for the project. Dates must match the `sdlc-framework.md` timeline. Update immediately if dates shift — do not let this section lag reality.

- **[Date]**: Phase 1–2 complete (requirements locked)
- **[Date]**: Phase 3–4 complete (design approved)
- **[Date]**: Phase 6 begin (development starts)
- **[Date]**: MVP ready (Phase 6–7 complete)
- **[Date]**: Production launch (Phase 8)

---

## Team Capacity

This section tracks team availability to identify bandwidth risks before they become blockers. Update at the start of each phase or when team allocation changes significantly.

| Role | Capacity | Allocated | Available |
|------|-----------|-----------|-----------|
| Product Manager | [X%] | [X%] | [X%] |
| Tech Lead | [X%] | [X%] | [X%] |
| Senior Engineers | [X people] | [X people] | [X people] |
| QA Lead | [X%] | [X%] | [X%] |

---

## Meeting Schedule

This section records the recurring meeting cadence for tracking project health. Fill in the actual meeting times when Phase 0 is complete.

- **Weekly Sync**: [Day] [Time] — Phase status, blockers, next steps
- **Bi-weekly Review**: [Day] [Time] — Progress review, roadmap adjustments
- **Sprint Planning**: [Day] [Time] — Sprint work (active after Phase 5)

---

## Communication

This section defines how project status is communicated and how blockers are escalated. Fill in the actual channels and processes for this project.

**Status Updates**: [Frequency and channel — e.g., Weekly summary in Slack #project-status]  
**Escalations**: [Process — e.g., Blocker → Project Lead within 24h → Stakeholder within 48h]  
**Documentation Home**: [Link to this repository or documentation portal]

---

## How to Update This Plan

Follow this update protocol to keep the macro plan reliable. Deviating from it degrades its usefulness for the entire team.

1. Every week, update the completion percentage for the current phase
2. Document blockers immediately when they appear — include owner and date raised
3. Adjust target dates if the timeline has shifted — do not leave stale dates
4. Move to the next phase only when all current phase deliverables are complete and approved

---

**Previous Updates**:
- [2024-01-01]: Initial plan created
