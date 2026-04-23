[← Index](./README.md) | [< Anterior](./TEMPLATE-004-transition-and-phases.md) | [Siguiente >](./TEMPLATE-006-decision-rationale.md)

---

# Discovery Closure & Validation

Formal closure of the Discovery phase. Validates that all bases are solid, ambiguities are resolved, and the team is ready to move forward with full alignment.

## Contents

1. [Discovery Validation Checklist](#discovery-validation-checklist)
2. [Stakeholder Alignment Verification](#stakeholder-alignment-verification)
3. [Risk Assessment Review](#risk-assessment-review)
4. [Readiness for Next Phase](#readiness-for-next-phase)
5. [Key Assumptions Re-Validation](#key-assumptions-re-validation)
6. [Sign-Off and Approval](#sign-off-and-approval)

---

## Discovery Validation Checklist

**Verify that Discovery is complete** and all required elements are present, validated, and coherent.

### Validation Checklist Template

| Element | Status | Reviewer | Date | Notes |
|---------|--------|----------|------|-------|
| [Document/Artifact] | ✅/⚠️/❌ | [Who reviewed] | [Date] | [Any gaps or concerns] |

### Prompts for AI

- Is everything documented or still in discussions?
- Are there contradictions between documents?
- Are all critical decisions made?
- Is there consensus or unresolved debate?

### Example Checklist (from Keygo)

| Element | Status | Reviewer | Date | Notes |
|---------|--------|----------|------|-------|
| Vision & Purpose documented | ✅ | Product Manager | 2026-04-22 | Clear and agreed |
| Strategic objectives (5-7) with KPIs | ✅ | Steering Committee | 2026-04-22 | All measurable |
| Key actors identified | ✅ | Product Manager | 2026-04-22 | 5 actors, roles clear |
| Scope: In/Out/MVP defined | ✅ | Product Manager + Tech Lead | 2026-04-22 | MVP scope locked |
| Critical risks identified (6+) | ✅ | Tech Lead + Product Manager | 2026-04-22 | Mitigations proposed |
| Assumptions documented | ✅ | Product Manager | 2026-04-22 | 6 assumptions identified |
| Success criteria established | ✅ | Product Manager + Steering | 2026-04-22 | KPIs measurable |
| Next phases defined | ✅ | Tech Lead | 2026-04-22 | 5 phases with owners |
| Stakeholder alignment achieved | ✅ | Product Manager | 2026-04-22 | All stakeholders aligned |
| No unresolved blockers | ✅ | Tech Lead | 2026-04-22 | Ready to move forward |

---

## Stakeholder Alignment Verification

**Confirm that all key stakeholders agree** on the Discovery output. Unresolved disagreements must be surfaced and resolved before moving forward.

### Alignment Template

| Stakeholder | Element | Position | Resolution |
|-------------|---------|----------|-----------|
| [Role] | [What they care about] | Agree / Disagree / Clarify | [How resolved] |

### Prompts for AI

- Who are the key decision makers?
- Is there any disagreement on direction?
- Are there concerns about scope, timeline, or risk?
- Do all stakeholders understand the MVP vs. future phases?

### Example Alignment (from Keygo)

| Stakeholder | Element | Position | Resolution |
|---|---|---|---|
| Product Manager | MVP scope is minimal but sufficient | ✅ Agree | Clear MVP + future roadmap accepted |
| Tech Lead | Isolation must be design constraint, not config | ✅ Agree | Enforced in architecture phase |
| Security Lead | Aislamiento multi-tenant critical for compliance | ✅ Agree | P0 requirement with verification tests |
| CFO | Facturación básica required in MVP | ✅ Agree | Basic plan/subscription model in scope |
| CEO | Timeline realistic? | ⚠️ Clarify | 3 months MVP (not 6); validated with team |
| Steering Committee | Moving forward with this plan? | ✅ Approve | Green light to Requirements phase |

---

## Risk Assessment Review

**Reassess key risks** identified in Discovery. Are mitigations adequate? Are any new risks surfaced?

### Risk Review Template

| Risk | Original Mitigation | Still Valid? | Update Needed? | Owner |
|------|-------------------|---|---|---|
| [Risk] | [Mitigation strategy] | Yes/No | [If no, what changes] | [Who monitors] |

### Prompts for AI

- Have any risks been resolved during Discovery?
- Are any new risks surfaced that need mitigation?
- Is the mitigation strategy sufficient?
- Who owns monitoring each risk?

### Example Risk Review (from Keygo)

| Risk | Original Mitigation | Still Valid? | Update | Owner |
|---|---|---|---|---|
| Low adoption by org admins | Onboarding UX design; pilot org validation | ✅ Yes | Add: accessibility review + first-time user testing | UX Lead |
| Cross-org data access incident | Isolation as design constraint + mandatory tests | ✅ Yes | Confirmed: will be in Architecture phase | Tech Lead |
| Performance bottleneck | Load testing before launch + monitoring strategy | ✅ Yes | Baseline: target 200ms p95 response time | Infra Lead |
| Regulatory changes break assumptions | Design with privacy-by-design principles | ⚠️ Partial | Add: quarterly legal review | Legal + Product |
| Difficulty integrating with apps | Standard protocols only; docs + examples | ✅ Yes | Pilot app integration before public launch | Integration PM |

---

## Readiness for Next Phase

**Verify that the team is ready to move from Discovery to Requirements/Design**. What's still missing?

### Readiness Template

| Readiness Area | Ready? | What's Needed | Target Date |
|---|---|---|---|
| [Area] | Yes/No | [If no, what's blocking] | [When ready] |

### Prompts for AI

- Do we have the right people for the next phase?
- Are there tools or systems needed?
- Is the team aligned on approach?
- Do we need external input (legal, compliance)?

### Example Readiness (from Keygo)

| Area | Ready? | What's Needed | Target |
|---|---|---|---|
| Product understanding | ✅ Yes | Team has read and validated Discovery docs | Immediate |
| Stakeholder alignment | ✅ Yes | All stakeholders signed off on roadmap | Immediate |
| Technical readiness | ✅ Yes | Architecture review scheduled; ADR process defined | Week 1 Requirements |
| Security/Compliance readiness | ⚠️ Partial | Legal review of data handling needed | Week 2 Requirements |
| Resource allocation | ✅ Yes | Product + Tech Lead + 1 architect assigned | Immediate |
| Pilot organization ready | ⚠️ Partial | Need to finalize 1 pilot org agreement | Week 1 Requirements |
| Tooling ready | ✅ Yes | Jira, design tools, CI/CD pipeline ready | Immediate |

---

## Key Assumptions Re-Validation

**Double-check critical assumptions** identified in Discovery. If any are now invalid, adjust scope.

### Assumption Review Template

| Assumption | Original Risk Level | Still Valid? | Adjusted? | Action |
|-----------|---|---|---|---|
| [Assumption] | High/Medium/Low | Yes/No/Uncertain | [If no, update] | [What changes] |

### Prompts for AI

- Which assumptions are most critical?
- Has anything happened since Discovery that invalidates an assumption?
- Should we do quick validation (survey, interview) on any assumption?

### Example Assumption Review (from Keygo)

| Assumption | Risk | Still Valid? | Adjusted | Action |
|---|---|---|---|---|
| Target orgs have technical teams | Medium | ✅ Yes | — | Proceed |
| Standard protocols enough for integration | Medium | ✅ Yes | — | Proceed |
| Pilot org available for MVP validation | High | ⚠️ Uncertain | — | Confirm by Week 1 Requirements |
| Cloud infrastructure can handle 1000 auth/sec | Medium | ✅ Yes | — | Validate in load testing (Phase 4) |
| Payment processor supports MVP requirements | Medium | ⚠️ Need to verify | Yes | Confirm choice by Week 2 Requirements |
| GDPR is only compliance requirement | High | ⚠️ Partially | Yes | Add: check SOC 2 applicability for enterprise |

---

## Sign-Off and Approval

**Formal closure of Discovery phase**. All stakeholders confirm readiness.

### Sign-Off Template

| Role | Name | Approval | Date | Notes |
|------|------|----------|------|-------|
| [Role] | [Name] | ✅ / ⚠️ / ❌ | [Date] | [Any conditions] |

### Prompts for AI

- Who must sign off (not just participate)?
- Are there conditional approvals (yes, if X is done)?
- What happens if someone doesn't approve?

### Example Sign-Off (from Keygo)

| Role | Name | Approval | Date | Notes |
|---|---|---|---|---|
| Product Manager | [PM Name] | ✅ Approved | 2026-04-22 | Roadmap validated with stakeholders |
| Tech Lead | [CTO Name] | ✅ Approved | 2026-04-22 | Architecture approach agreed |
| Security Lead | [Security Name] | ✅ Approved | 2026-04-22 | Isolation requirements clear |
| CFO / Finance | [CFO Name] | ⚠️ Conditional | 2026-04-22 | Approved IF pilot org payment confirmed by Week 1 |
| Steering Committee Chair | [CEO Name] | ✅ Approved | 2026-04-22 | Green light to Requirements phase |

**Conditions**:
- Pilot organization payment confirmed by 2026-04-29
- Legal compliance review (SOC 2 applicability) completed by 2026-05-06

**Next Step**: Requirements phase begins 2026-04-29 with kick-off meeting.

---

## Paso a Paso

1. **Run validation checklist**: Ensure all Discovery artifacts present
2. **Verify stakeholder alignment**: Get explicit approval from key decision makers
3. **Reassess risks**: Are mitigations still valid?
4. **Check readiness**: Do we have people, tools, and alignment for next phase?
5. **Re-validate assumptions**: Has anything changed since Discovery?
6. **Collect sign-offs**: Get explicit approval from all stakeholders
7. **Document conditions**: Any approvals that are conditional?
8. **Schedule kickoff**: Plan start of next phase

---

## Ejemplo

### Ejemplo Proyecto Alpha (SaaS de tareas)

**Discovery Closure Checklist**:
- ✅ Vision approved by CEO + investors
- ✅ 3 personas validated with target users
- ✅ MVP scope locked (no feature creep)
- ✅ Timeline realistic (8 weeks MVP dev)
- ✅ Key risk: user adoption → mitigation: early beta with 10 pilot teams

**Sign-Off**:
- Product Manager: ✅ Ready for Requirements
- CTO: ✅ Architecture approach clear
- CEO: ✅ Go ahead with 8-week MVP plan

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**Discovery Closure Checklist**:
- ✅ Problem validated: procurement cycle takes 3-6 months (expensive)
- ✅ Target personas: procurement managers + service providers
- ✅ MVP scope: provider profiles + messaging + escrow payments
- ✅ Key risk: compliance complexity → mitigation: legal review in Requirements phase

**Sign-Off**:
- Product Manager: ✅ MVP is achievable
- Legal: ⚠️ Conditional—need SOC 2 compliance plan before dev
- Board: ✅ Proceed with 12-week timeline (including legal prep)

---

## Completion Checklist

### Deliverables

- [ ] All Discovery artifacts validated (completeness, no contradictions)
- [ ] Stakeholder alignment documented and signed
- [ ] Key risks re-assessed; mitigations confirmed adequate
- [ ] Readiness for next phase verified (people, tools, alignment)
- [ ] Critical assumptions re-validated; actions if invalid
- [ ] Sign-off collected from all key stakeholders
- [ ] Conditions noted (e.g., "approved if X is resolved")
- [ ] Next phase kickoff scheduled

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Manager, Tech Lead, Date]
- [ ] Approved by: [Steering Committee/Executive Sponsor, Date]

---

## Phase Discipline Rules

**Before leaving Discovery, verify**:

1. ✅ All Discovery documents complete and coherent
2. ✅ No unresolved contradictions between documents
3. ✅ All key decisions made (or explicitly deferred)
4. ✅ Stakeholder alignment confirmed in writing
5. ✅ Key risks identified and mitigation strategies documented
6. ✅ Critical assumptions validated or flagged for future confirmation
7. ✅ Next phase success criteria are clear
8. ✅ Formal sign-off obtained from decision makers
9. ✅ Resources assigned for next phase

---

## Tips

1. **Document disagreements**: If stakeholders don't agree, make it explicit (don't hide it)
2. **Be realistic about readiness**: "Almost ready" is not ready—flag what's blocking
3. **Validate assumptions early**: Don't wait until Requirements to discover a critical assumption is wrong
4. **Get executive sign-off**: One stakeholder disagreeing can derail the whole project
5. **Plan for course correction**: Discovery is not final; build in review gates
6. **Communicate clearly**: Handoff to Requirements should be crystal clear

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-004-transition-and-phases.md) | [Siguiente >](./TEMPLATE-006-decision-rationale.md)
