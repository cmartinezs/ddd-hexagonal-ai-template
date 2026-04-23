# Phase 1: Discovery

## Overview

Discovery is about understanding the **WHAT** and **WHY** — the business context, problems, actors, needs, and critical decisions that drive the project. **No implementation details yet**. This phase establishes the foundation for all subsequent work: Requirements, Design, and Development are built on the clarity defined here.

**Diagram Convention**: Mermaid → PlantUML → ASCII (see root README.md)

---

## 🎯 Key Principle: Focus on "WHAT", NOT "HOW"

✅ **INCLUDE**: 
- Business needs and problems being solved
- Actor goals, pain points, constraints
- System capabilities and boundaries
- Strategic objectives and success metrics
- Assumptions, risks, and critical decisions
- Why each decision matters

❌ **EXCLUDE**: 
- Technology names (JWT, OAuth, PostgreSQL, React, AWS, etc.)
- Implementation patterns (REST, microservices, MVC, CQRS, etc.)
- Protocol names (HTTP, gRPC, MQTT, WebSockets, etc.)
- Code-level details or architectural patterns
- "How we'll build it" — that's Design & Development

---

## 📋 Discovery in One Page

| What | Where | Completable By | Time | Output |
|------|-------|---|---|---|
| **Why does this project exist?** Vision, mission, strategic objectives, KPIs | TEMPLATE-001 | Human & AI | 1-2h | 1-page vision statement + 5-7 strategic objectives |
| **Who will use it?** Actors, personas, needs, access boundaries | TEMPLATE-002 | Human (AI assists) | 2-3h | 3-5 personas with goals, pain points, needs |
| **What will it do?** Scope, boundaries, capabilities, risks, acceptance criteria | TEMPLATE-003 | Human | 2-3h | MVP scope + out-of-scope list + risk matrix |
| **What critical decisions were made?** Trade-offs, rationale, alternatives considered | TEMPLATE-006 | Human (for reflection) | 1-2h | 5-10 documented decisions with "why" |
| **What happens next?** Phases, handoff criteria, dependencies | TEMPLATE-004 | Human | 1-2h | Roadmap with phase sequence and success gates |
| **Is Discovery complete?** Validation, sign-off, readiness for Requirements | TEMPLATE-005 | Human | 1h | Sign-off from stakeholders + readiness checklist |

**Total Time Estimate**: 8-13 hours  
**Team**: Product Owner, Tech Lead, 1-2 Stakeholders, 1 Engineer

---

## 📂 Complete Template Suite (6 Templates)

### Context Phase (Foundation)

#### **1️⃣ TEMPLATE-001-context-motivation.md** `[Completable by: Human & AI]`

**Answers**: Why does this project exist? What problem are we solving? What will success look like?

**Sections**:
- 🎯 **Vision** — Aspirational 1-2 sentence goal
- 💼 **Mission** — How we'll achieve the vision
- 🔴 **Problem Statement** — Current pain, impact, scale
- 🚀 **Strategic Objectives** (5-7) — Measurable outcomes with KPIs
- 🎁 **Key Capabilities** (6-8) — What the system will be able to do
- 🏛️ **Critical Principles** (5-7) — Non-negotiable design constraints
- ✅ **Success Criteria** — SMART criteria; how we'll know we won
- 📅 **Timeline** — Phases with milestones and decision points
- 🔒 **Constraints** — Regulatory, business, technical, resource

**Example Output**:
```
Vision: Enable teams to manage projects with a single unified platform

Strategic Objective 1: Centralize task management
  KPI: ≥80% of teams using platform as primary project tool within 6 months

Critical Principle 1: All team data visible to project members (transparency)
  → Prevents information silos and improves collaboration
```

**Flexibility**: 100%-0%
- 100%: Follow all sections with detailed examples
- 50%: Use Vision + Objectives only; defer others
- 0%: Skip if vision is already crystal clear elsewhere

---

#### **2️⃣ TEMPLATE-002-actors-and-personas.md** `[Completable by: Human + AI assist]`

**Answers**: Who will use this system? What are their goals? What are their boundaries?

**Sections**:
- 👥 **Actor Identification** — All user types, systems, stakeholders
- 🚫 **Explicitly Excluded Actors** — Who we're NOT supporting (and when we'll reconsider)
- 📊 **Actor Hierarchy** — Relationships, authority, delegation structure
- 🧑 **Persona Templates** — 3-5 detailed personas (goals, pain points, needs)
- 🔐 **Access Boundaries** — What each actor CAN and CANNOT do (critical for multi-tenant/secure systems)
- 🗺️ **Actor Map** — Visual representation of interactions
- 📈 **Needs Prioritization** — P0-P3 matrix (what's critical vs. nice-to-have)

**Example Output**:
```
Actor: Project Manager
  CAN: Create projects, assign tasks, track progress
  CANNOT: Approve budgets, manage company settings

Excluded Actors: External project management systems (Jira, Asana)
  → Deferred to Phase 2; MVP focuses on core team collaboration
```

**Flexibility**: 100%-0%
- 100%: Full personas + hierarchy + boundaries
- 60%: Just personas + main actors
- 0%: Use existing stakeholder list; skip template

---

#### **3️⃣ TEMPLATE-003-scope-and-boundaries.md** `[Completable by: Human]`

**Answers**: What's in scope? What's out? What are the risks? How will we know it's successful?

**Sections**:
- ✅ **In Scope (MVP)** — Specific capabilities, features, use cases
- ❌ **Out of Scope** — Explicitly deferred; with rationale and future phase
- 🎯 **Functional Capabilities Traceability** — Maps each capability to strategic objectives (🟢🟡⬜ matrix)
- ⚙️ **Operational Limits** — Quantified constraints (users per org, retention, SLA, etc.)
- 📋 **Assumptions** — What we believe to be true (user assumptions, business, technical, regulatory)
- 🔗 **Dependencies** — External systems, resources, people needed
- ✔️ **Acceptance Criteria** — High-level "how we'll know it's done" per requirement
- ⚠️ **Risks & Mitigations** — 5-8 key risks ranked by probability × impact
- 🛣️ **Phase Roadmap** — MVP vs Phase 2 vs Phase 3; sequencing

**Example Output**:
```
In Scope (MVP):
  ✅ User registration, task creation/tracking, team collaboration, notifications

Out of Scope:
  ❌ Mobile native app → Phase 2
  ❌ Advanced analytics → Phase 3

Risk: Low adoption by team leads [Medium probability, High impact]
  Mitigation: UX research + validation with 3 pilot teams
```

**Flexibility**: 100%-0%
- 100%: All sections filled with detail
- 70%: In/Out scope + Dependencies + Phase roadmap
- 30%: Just scope boundaries; risks/criteria can come later

---

### Transition & Validation Phase (Closure)

#### **4️⃣ TEMPLATE-004-transition-and-phases.md** `[Completable by: Human]`

**Answers**: What happens after Discovery? How do we transition to Requirements? What's the roadmap?

**Sections**:
- 📊 **Phase Overview** — What each post-Discovery phase does
- 🔀 **Phase Sequencing** — Dependencies (what blocks what); critical path
- 📦 **Deliverables by Phase** — Specific outputs, format, owner, success criteria
- ✅ **Success Criteria** — How to know each phase succeeded (not just completed)
- 🔗 **Dependencies Between Phases** — What inputs each phase needs from prior phases
- 🚪 **Handoff Criteria** — Go/no-go gates; explicit requirements to move forward

**Example Output**:
```
Phase 2: Requirements (2 weeks)
  Deliverable: Prioritized functional + non-functional requirements
  Success: ≥85% user stories have acceptance criteria
  Handoff Gate: Product Owner + Engineering Lead sign-off required

Phase 3: Design (3 weeks)
  Depends On: Phase 2 requirements complete
  Deliverable: UI mockups + data model + API design
  Handoff Gate: Designs reviewed by team + stakeholder approval
```

**Flexibility**: 100%-0%
- 100%: Detailed phases, dependencies, handoff gates
- 70%: High-level phases + milestones
- 0%: Skip if phases already planned elsewhere

---

#### **5️⃣ TEMPLATE-005-discovery-closure-and-validation.md** `[Completable by: Human]`

**Answers**: Is Discovery actually complete? Are we aligned? Is the team ready to move forward?

**Sections**:
- 📋 **Discovery Validation Checklist** — All required artifacts present? No contradictions?
- 👥 **Stakeholder Alignment Verification** — Do all key stakeholders agree? Any unresolved disagreements?
- ⚠️ **Risk Assessment Review** — Are documented risks still valid? Any new risks?
- 🚀 **Readiness for Next Phase** — People, tools, alignment in place?
- 🤔 **Key Assumptions Re-Validation** — Have any assumptions become invalid since Discovery?
- 🖊️ **Sign-Off and Approval** — Explicit approval from decision makers

**Example Output** (from Keygo):
```
Validation Checklist:
  ✅ Strategic objectives documented and agreed
  ✅ Actors identified; personas validated
  ⚠️ Pilot organization: needs final confirmation by Week 1 Requirements

Sign-Off:
  ✅ Product Manager: Approved
  ✅ Tech Lead: Approved
  ⚠️ CFO: Conditional—approved IF pilot org payment confirmed by 2026-04-29
```

**Flexibility**: 100%-0%
- 100%: Full checklist + validation + sign-off
- 50%: Quick checklist + executive sign-off
- 0%: Informal sign-off via email/meeting notes

---

#### **6️⃣ TEMPLATE-006-decision-rationale.md** `[Completable by: Human]`

**Answers**: Why did we make key decisions? What trade-offs did we accept? What alternatives did we consider?

**Sections**:
- 📌 **Decision Format** — Standardized template (context → question → options → choice → consequences)
- 🔑 **Critical Decisions** (5-10) — Major choices that shaped the system
- ⚖️ **Trade-Offs Considered** — What we gained vs. lost for each decision
- ❓ **Open Questions & Deferred Decisions** — What we decided NOT to decide yet (and when we'll revisit)

**Example Output** (from Keygo):
```
Decision: Multi-tenant isolation as design constraint (not config)

Options Considered:
  A) Design constraint (impossible to violate)
  B) Configuration option (default enabled, can disable)

Chosen: A (Design constraint)

Why: Data leak between orgs = P0 incident. Risk of misconfiguration > benefit of flexibility.

Trade-Off: Gained security; lost future flexibility for cross-org analytics 
  → Solution: analytics built at app layer from aggregated data

Revisit Trigger: Never weaken isolation. Reconsider flexibility at app layer in Phase 2.
```

**Flexibility**: 100%-0%
- 100%: All critical decisions documented with trade-offs
- 50%: Top 3-5 decisions; rationale + consequences
- 0%: Skip if decisions already documented in meeting notes

---

## 🔄 How the 6 Templates Connect

```
TEMPLATE-001 (Context & Vision)
    ↓ (establishes strategic objectives & capabilities)
TEMPLATE-002 (Actors & Personas)
    ↓ (identifies who needs what)
TEMPLATE-003 (Scope & Boundaries)
    ↓ (defines MVP scope, risks, acceptance criteria based on actors + vision)
TEMPLATE-006 (Decision Rationale)
    ↓ (documents WHY decisions were made)
TEMPLATE-004 (Transition & Phases)
    ↓ (outlines next steps post-Discovery)
TEMPLATE-005 (Discovery Closure)
    ↓ (validates everything is solid before moving forward)
→ MOVE TO PHASE 2: REQUIREMENTS
```

---

## ✅ Completion Checklist

### Discovery Phase Deliverables
- [ ] Vision, mission, and strategic objectives (5-7) documented
- [ ] Key actors identified; personas created; boundaries defined
- [ ] Scope clearly defined (in/out/MVP/future); capabilities mapped to objectives
- [ ] Risks identified (5-8) with mitigations; acceptance criteria clear
- [ ] Assumptions explicitly listed; dependencies tracked
- [ ] Critical decisions documented (with alternatives and rationale)
- [ ] Transition plan and phase roadmap defined
- [ ] Validation checklist complete; stakeholder sign-offs collected
- [ ] No contradictions between documents
- [ ] No unresolved blockers

### Sign-Off
- [ ] **Prepared by**: [Name, Date]
- [ ] **Reviewed by**: [Product Manager, Tech Lead, Stakeholders, Date]
- [ ] **Approved by**: [Executive Sponsor/Steering Committee, Date]

---

## 🏛️ Phase Discipline Rules

**Before moving to Requirements, verify**:

1. ✅ **No technology mentions** — JWT, OAuth, PostgreSQL, React, Kubernetes, AWS, etc. (That's Design/Dev)
2. ✅ **No implementation patterns** — REST, microservices, event-driven, CQRS, etc.
3. ✅ **No protocol names** — HTTP, gRPC, MQTT, WebSockets, etc.
4. ✅ **Clear WHAT, not HOW** — "The system will authenticate users" ✅ vs. "We'll use JWT tokens" ❌
5. ✅ **All critical decisions made** — Or explicitly deferred with revisit trigger
6. ✅ **All actors and needs documented** — No surprises mid-project
7. ✅ **Scope is locked** — MVP is realistic and agreed
8. ✅ **Risks identified and mitigated** — No hidden unknowns
9. ✅ **Stakeholder alignment** — Written sign-offs, not vague agreement
10. ✅ **Success criteria are measurable** — SMART criteria; trackable KPIs

---

## 🤖 AI Assistance Recommendations

### What AI Can Do Well
- **Brainstorm**: Generate additional actors, use cases, risks not yet considered
- **Draft**: Create persona templates, capability descriptions, risk matrices
- **Structure**: Organize rough notes into template sections
- **Validate**: Cross-reference between documents (e.g., "Is this actor mentioned in scope?")
- **Refine**: Polish language, improve clarity, add missing details

### What Needs Human Input
- **Business reality**: Actual constraints, timelines, budget, competitive landscape
- **Strategic decisions**: Go/no-go choices; direction of the product
- **Stakeholder perspective**: What matters to executives, customers, users
- **Domain expertise**: Knowledge of the specific problem space
- **Validation**: Review AI suggestions and refine with real context

### Suggested Workflow
```
1. Human: "Describe the project in 2-3 paragraphs" (business context + problem)
2. AI: Generate initial actor list + suggested personas
3. Human: Review, refine, add real context
4. AI: Suggest scope boundaries, risks, operational limits based on personas
5. Human: Finalize scope, validate with stakeholders, lock it down
6. AI: Help document decisions, create traceability matrices
7. Human: Review everything, collect sign-offs, validate for completeness
```

---

## 💡 Best Practices

1. **Start with WHY** — Before any features, understand the business problem and market
2. **Interview real stakeholders** — Don't guess actor goals; ask actual users
3. **Document everything** — Assumptions, decisions, debates; future teams will thank you
4. **Get buy-in early** — Discovery alignment prevents rework later
5. **Be specific, not generic** — "Improve user experience" ❌; "Reduce login time from 30s to <5s" ✅
6. **Identify reversible vs. locking decisions** — Some choices are cheap to change; others lock architecture
7. **Keep it concise** — 1-2 pages per section; focus on signal, not noise
8. **Use multiple perspectives** — Get input from Product, Tech, Security, Ops
9. **Validate assumptions early** — Don't wait until Implementation to discover a critical assumption is wrong
10. **Plan review gates** — Discovery isn't final; schedule re-evaluation in Phase 2

---

## 🚀 Next Steps

Once Discovery is complete and signed off:

1. **Share context** with full team (Requirements, Design, Development)
2. **Use findings** to drive Requirements phase (every requirement traces back to actors + objectives)
3. **Monitor assumptions** — Flag if any assumptions become invalid
4. **Move to Phase 2: Requirements** with full stakeholder alignment and clarity

---

## 📚 Files in This Directory

| File | Purpose | Completable By | Time |
|------|---------|---|---|
| TEMPLATE-001-context-motivation.md | Vision, mission, objectives, principles, success criteria | Human & AI | 1-2h |
| TEMPLATE-002-actors-and-personas.md | Actors, personas, needs, access boundaries, hierarchy | Human (AI assists) | 2-3h |
| TEMPLATE-003-scope-and-boundaries.md | Scope, boundaries, risks, capabilities, acceptance criteria | Human | 2-3h |
| TEMPLATE-004-transition-and-phases.md | Next phases, sequencing, handoff criteria, roadmap | Human | 1-2h |
| TEMPLATE-005-discovery-closure-and-validation.md | Validation, sign-offs, readiness for next phase | Human | 1h |
| TEMPLATE-006-decision-rationale.md | Critical decisions, trade-offs, alternatives, rationale | Human | 1-2h |

---

**Total Time to Complete Discovery**: 8-13 hours  
**Definition of Done**: All actors understood, scope agreed, decisions documented, stakeholders aligned and signed off  
**Success Indicator**: Team can start Requirements phase with zero ambiguity about project direction and scope
