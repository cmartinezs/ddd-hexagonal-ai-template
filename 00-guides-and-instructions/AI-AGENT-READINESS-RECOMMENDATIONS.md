[← HOME](../README.md) | [← Index](./README.md)

---

# AI Agent Readiness Recommendations (Enterprise)

Practical recommendations to make this repository safer, clearer, and more reliable for enterprise use when AI agents
are the primary documentation operators under stakeholder supervision.

---

## Contents

- [Current Strengths](#current-strengths)
- [Gaps Blocking Enterprise Adoption](#gaps-blocking-enterprise-adoption)
- [Recommended Improvements (Prioritized)](#recommended-improvements-prioritized)
- [Global Authoring Directive for AI Agents](#global-authoring-directive-for-ai-agents)
- [Minimum Definition of Done per Phase](#minimum-definition-of-done-per-phase)
- [Suggested Repository Backlog](#suggested-repository-backlog)

---

## Current Strengths

1. Strong SDLC decomposition (12 phases) with clear intent.
2. Good agnostic/specific boundary in the framework (phases 1-5 vs. 6-12).
3. Existing AI-oriented guides and phase prompts.
4. Good structure for traceability between business and technical artifacts.

---

## Gaps Blocking Enterprise Adoption

1. **Missing global execution contract for AI agents**
   - Guidance exists, but not as a single mandatory protocol.

2. **Inconsistent template strictness**
   - Some templates are descriptive, but do not enforce machine-checkable output sections.

3. **No explicit evidence model**
   - Templates do not consistently force source references, assumptions, and confidence levels.

4. **Weak governance for document freshness**
   - No hard policy for review cadence, stale detection, and ownership rotation.

5. **Insufficient stakeholder approval gates**
   - Human validation is implied, but formal sign-off checkpoints are not standardized.

---

## Recommended Improvements (Prioritized)

### Priority 0 — Mandatory Before Enterprise Rollout

1. **Create one canonical “AI Agent Operating Contract”**
   - Single document with mandatory rules for all phases.
   - Include: required inputs, validation flow, forbidden behavior, escalation path, and output format.

2. **Add a machine-checkable section schema to every template**
   - Required sections in fixed order:
     - Inputs
     - Decisions
     - Assumptions
     - Risks
     - Traceability Links
     - Validation Checklist
     - Approval
   - This enables deterministic QA by agents and CI.

3. **Enforce evidence tagging**
   - Every non-trivial claim should state source type:
     - `stakeholder-input`
     - `legacy-doc`
     - `market-research`
     - `agent-inference`
   - Add confidence score per key statement.

4. **Introduce phase gate policy**
   - Phase cannot be marked complete without:
     - mandatory sections filled,
     - traceability links validated,
     - stakeholder approval recorded.

### Priority 1 — Strongly Recommended

5. **Define a documentation freshness SLA**
   - Example: critical docs reviewed every 30 days; all docs every 90 days.

6. **Add role-based review matrix**
   - For each phase: required reviewers (Product, Domain, Security, Platform, Ops).

7. **Add conflict-resolution protocol**
   - If stakeholder feedback conflicts with existing docs, force decision log entry before overwrite.

8. **Create anti-hallucination policy**
   - Agent must explicitly mark inferred content and request confirmation for high-impact assumptions.

### Priority 2 — Operational Maturity

9. **Build CI checks for documentation quality**
   - Broken links, missing sections, missing traceability IDs, stale review dates.

10. **Add phase-level KPIs**
    - Coverage %, unresolved assumptions, stale documents count, approval cycle time.

11. **Standardize handoff packets between phases**
    - Structured summary to reduce context loss across long-running agent workflows.

---

## Global Authoring Directive for AI Agents

Use this block as a mandatory preamble in `INSTRUCTIONS-FOR-AI.md` and in phase-level READMEs.

```markdown
AI AGENT AUTHORING DIRECTIVE (MANDATORY)

1. Operate only with explicit inputs; do not invent business facts.
2. Mark each key statement as: evidence-backed or inferred.
3. Keep phases 1-5 technology agnostic.
4. For phases 6-12, tie technical decisions to prior requirements/design references.
5. Record assumptions, risks, and open questions in dedicated sections.
6. Never mark a phase complete without validation checklist and stakeholder sign-off.
7. Preserve traceability IDs across all phases.
8. If context is missing or conflicting, stop and request clarification.
```

---

## Minimum Definition of Done per Phase

A phase is complete only when all checks pass:

- [ ] All required template sections completed.
- [ ] Terminology aligned with ubiquitous language.
- [ ] Traceability links to previous phase artifacts are present.
- [ ] Assumptions and confidence levels are explicit.
- [ ] Risks include owner and mitigation action.
- [ ] Stakeholder approver and approval date recorded.
- [ ] Next phase input package generated.

---

## Suggested Repository Backlog

| ID | Type | Recommendation | Scope |
|----|------|----------------|-------|
| R-001 | Governance | Add `AI-AGENT-OPERATING-CONTRACT.md` | `00-guides-and-instructions/` |
| R-002 | Standardization | Add mandatory section schema to all `TEMPLATE-*.md` files | `01-templates/` |
| R-003 | Quality | Add docs lint and link checks in CI | repo-wide |
| R-004 | Traceability | Define canonical traceability ID format and validator | planning + requirements |
| R-005 | Freshness | Add review cadence fields to templates | all phases |
| R-006 | Approval | Add standardized sign-off blocks | all phases |
| R-007 | Safety | Add anti-hallucination and confidence policy | guides + templates |

---

[← HOME](../README.md) | [← Index](./README.md)
