[← Index](./README.md) | [< Previous](./TEMPLATE-005-discovery-closure-and-validation.md)

---

# Decision Rationale: Why Key Choices Were Made

You are an AI agent generating Discovery phase documentation. This template documents the reasoning behind each critical decision made during Discovery. Capturing this context prevents future teams from second-guessing choices, provides institutional memory, and creates a traceable record of why the system is designed the way it is. Complete this template after TEMPLATE-003 and before TEMPLATE-005.

## Contents

1. [Decision Format](#decision-format)
2. [Critical Decisions](#critical-decisions)
3. [Trade-Offs Considered](#trade-offs-considered)
4. [Open Questions & Deferred Decisions](#open-questions--deferred-decisions)

---

## Decision Format

This section defines the standard structure for documenting each critical decision. Apply this structure consistently to every decision you record — the structured format makes decisions searchable and comparable across phases.

**Standard structure** for documenting each critical decision: context, question, options, choice, and consequences.

### Template

Use this template for each critical decision you document.

```markdown
## Decision: [Title]

### Context
[Background: what problem or situation required this decision?]

### Question
[What specifically were we deciding?]

### Options Considered
1. Option A: [Description]
   - Pros: [Why this could work]
   - Cons: [Drawbacks]

2. Option B: [Description]
   - Pros: [Why this could work]
   - Cons: [Drawbacks]

3. Option C: [Description]
   - Pros: [Why this could work]
   - Cons: [Drawbacks]

### Decision
**Chosen**: Option A (or B or C)

**Why**: [Concise explanation of the primary reason]

### Consequences
- What this enables: [New capabilities or improvements]
- What this constrains: [Limitations or requirements]
- What this requires: [Future work needed to support this]

### Revisit Trigger
[When/if we should reconsider this decision]

### Owner
[Who was responsible for this decision]
```

### Prompts for AI

Use these questions to identify the decisions worth documenting in this template.

- What were the main debates during Discovery?
- What decisions almost went a different direction?
- Where is there consensus vs. residual doubt?
- What decisions are reversible vs. locking in the architecture?

---

## Critical Decisions

This section contains the 5-10 major choices that shaped the system. Document every decision that, if reversed later, would require significant redesign — these are the decisions that must be understood by every team member.

**Major choices** that shaped the system. Document 5-10 of the most important ones.

### Example: Decision 1

The following example shows a fully documented critical decision from an IAM platform project.

## Decision: Centralization as Core Principle

### Context
In ecosystems with multiple applications, identity management is typically fragmented. Each app implements its own auth, defines its own roles, and maintains its own user store. This leads to credential duplication, inconsistent policies, and poor auditability.

### Question
Should we build a *centralized platform for identity* (one source of truth) or a *toolkit that helps apps build auth locally* (decentralized)?

### Options Considered

**Option A: Centralized IAM Platform** (chosen)
- Keygo becomes the single source of truth for auth and authz
- Apps delegate identity validation to Keygo
- Policies are defined once in Keygo; all apps inherit them
- Pros:
  - One source of truth eliminates inconsistency
  - Easier to audit and monitor access
  - Reduces duplicated work across apps
- Cons:
  - Higher upfront complexity
  - Apps have dependency on Keygo availability
  - Requires standardized integration contracts

**Option B: Decentralized Auth Toolkit**
- Keygo provides libraries/templates; apps build auth locally
- Shared patterns and best practices
- Pros:
  - Apps are independent
  - Lower dependency on Keygo
- Cons:
  - Doesn't solve the problem (inconsistency remains)
  - Each app replicates work
  - Auditability is still fragmented

### Decision
**Chosen**: Centralized IAM Platform

**Why**: The central problem we're solving is *fragmentation*. A decentralized toolkit doesn't solve that. The value of Keygo is being the *single source of truth*, not providing libraries.

### Consequences
- **Enables**: Centralized policy management, ecosystem-wide auditability, consistent user experience
- **Constrains**: Apps must integrate with Keygo (and trust its availability); Keygo becomes a critical platform dependency
- **Requires**: High availability guarantees (99.9%+ uptime), stable integration contracts, transparent communication if outages occur

### Revisit Trigger
If 50%+ of ecosystem apps opt out of Keygo in favor of alternatives, reconsider whether centralization is achievable.

### Owner
Product Owner + Steering Committee

---

### Example: Decision 2

The following example shows a security-critical decision with a strong "never revisit" constraint.

## Decision: Multi-Tenant Isolation as Design Constraint (Not Configuration)

### Context
Keygo will serve multiple organizations simultaneously. Each organization's data (users, roles, access logs) must be completely invisible to every other organization.

### Question
Should isolation be a *design constraint* (impossible to violate by design) or a *configuration option* (possible but disabled)?

### Options Considered

**Option A: Design Constraint** (chosen)
- Isolation is baked into the architecture at every layer
- Every query, every API, every storage operation enforces isolation
- Violation is structurally impossible
- Pros:
  - Zero possibility of cross-org data leak by accident
  - Generates maximum confidence in security model
  - No operational decisions that could weaken isolation
- Cons:
  - Higher design complexity
  - Might exclude some operational use cases (e.g., analytics across orgs)

**Option B: Configuration Option**
- Default: isolation enabled
- Configuration: can be disabled for authorized scenarios
- Pros:
  - More flexibility for future capabilities
  - Simpler architecture
- Cons:
  - Risk of misconfiguration
  - Creates a "back door" that could be exploited
  - Compliance teams will require stricter auditing

### Decision
**Chosen**: Design Constraint

**Why**: A data leak between organizations is a *P0 incident* that invalidates Keygo's entire value proposition. The risk of misconfiguration outweighs the flexibility. We'd rather build flexibility into the *application layer* (using aggregated data) than weaken the core isolation.

### Consequences
- **Enables**: Maximum security posture; unquestionable compliance story
- **Constrains**: No cross-org reporting in MVP; analytics must be built on aggregated, anonymized data
- **Requires**: Architecture design to enforce isolation at database, cache, and API layers

### Revisit Trigger
Never revisit this in a way that weakens isolation. Future flexibility should come from app-layer features, not from relaxing isolation.

### Owner
Security Lead + Tech Lead

---

## Trade-Offs Considered

This section documents difficult choices where no option was clearly "best." Record what was gained and what was given up — future teams need to understand the trade-off to avoid reversing a decision without understanding its cost.

**Difficult choices where no option was clearly "best"**. Document what we gave up.

### Trade-Off Template

Use this table to document each trade-off with explicit gains and losses.

| Choice | We Gained | We Gave Up | Reasoning |
|--------|-----------|-----------|-----------|
| [Decision] | [What we got] | [What we lost] | [Why this trade-off was worth it] |

### Prompts for AI

Use these questions to identify trade-offs worth documenting.

- Where did the team have to choose between equally good options?
- What features were we tempted to include but didn't?
- Where did cost/timeline force a sacrifice?

### Example Trade-Offs (from Keygo)

The following example shows trade-offs documented with clear reasoning for each sacrifice.

| Choice | We Gained | We Gave Up | Reasoning |
|---|---|---|---|
| MVP includes basic billing | Sustainable business model | Complex billing features (multi-currency, subscriptions, usage-based tiers) | Validate business model with simple plan; add complexity in Phase 2 |
| Autonomous org management in MVP | Self-service, no ops bottleneck | Advanced features (auto-provisioning, SSO federation) | MVP focused on core value; federation adds risk and complexity |
| Standardized protocols only (OAuth, OIDC) | Interoperability, faster integrations | Custom integrations that might fit niche use cases | Market standard is "good enough"; custom integrations dilute focus |
| Manual user management in MVP | Simple design, fast to build | Automated provisioning from HR systems | Phase 1 assumes manual ops are acceptable; automation in Phase 2 |

---

## Open Questions & Deferred Decisions

This section documents what was explicitly NOT decided during Discovery and explains when each open question will be resolved. Every deferred decision must have an owner and a target resolution phase — unowned deferrals become permanent gaps.

**What we *didn't* decide** (and when we'll revisit).

### Deferred Template

Use this table to document each deferred decision with its owner and resolution timeline.

| Question | Why Deferred | When We'll Decide | Who Decides | Impact if Wrong |
|----------|---|---|---|---|
| [Question] | [Reason] | [Timeline] | [Owner] | [Consequence of bad decision] |

### Prompts for AI

Use these questions to identify open questions worth documenting.

- What seemed important but wasn't urgent enough for Discovery?
- What requires market validation before deciding?
- What depends on technical proof-of-concept?

### Example Deferred Decisions (from Keygo)

The following example shows deferred decisions with specific owners and impact assessments.

| Question | Why Deferred | When We'll Decide | Who | Impact |
|---|---|---|---|---|
| Which payment provider (Stripe, Adyen, etc)? | Requires vendor evaluation + contract negotiation | Week 2 Requirements | Product Owner + Finance | Blocks billing implementation |
| How to handle multi-tenancy in database (shared vs. isolated schemas)? | Architectural choice; needs design phase | Week 1 Design | Tech Lead + Data Architect | Impacts schema design + deployment strategy |
| What's the maximum # of users per org in MVP? | Depends on infrastructure capacity; test in Phase 4 | Week 2 Testing | Tech Lead + Infra | Sets SLA commitments to customers |
| Should we support custom roles or predefined roles only? | MVP uses predefined; custom requires more design | Phase 2 planning | Product Manager | Flexibility vs. simplicity |
| Will we support SSO integrations? | Deferred to Phase 2; MVP uses username/password | Phase 2 Requirements | Product Owner | Limits enterprise attractiveness initially |

---

## Paso a Paso

Follow these steps in order to complete this template. Start with the most consequential decisions — decisions that are hard to reverse or that affect multiple phases.

1. **Identify critical decisions**: What were the 5-10 biggest choices?
2. **Capture context**: What problem/situation required the decision?
3. **List options**: What were the realistic alternatives?
4. **Document the choice**: Which option won and why?
5. **Note consequences**: What does this enable/constrain/require?
6. **Identify trade-offs**: What did we gain vs. lose?
7. **List deferred decisions**: What didn't we decide (and why)?
8. **Assign ownership**: Who was responsible for each decision?

---

## Ejemplo

The following examples show completed decision rationale documents from two different project types.

### Ejemplo Proyecto Alpha (SaaS de tareas)

**Critical Decision 1**: Collaborative real-time editing vs. eventual consistency?
- **Chosen**: Eventual consistency (simpler to build, sufficient for teams)
- **Trade-off**: Gained speed-to-market; lost real-time co-editing
- **Consequence**: Phase 2 can add real-time features once MVP is stable

**Critical Decision 2**: Self-hosted vs. SaaS only?
- **Chosen**: SaaS only (focus on core product, not operations)
- **Trade-off**: Gained speed-to-market and deployment simplicity; lost enterprise self-hosted revenue opportunity
- **Consequence**: Phase 2 can evaluate demand for self-hosted version

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**Critical Decision 1**: Escrow payments vs. direct payment to providers?
- **Chosen**: Escrow (protects both sides during disputes)
- **Trade-off**: Gained trust; complexity + cash flow impact
- **Consequence**: Need payment processor that supports escrow; cash flow implications for small providers

**Critical Decision 2**: Strict verification of providers vs. permissive?
- **Chosen**: Strict verification (compliance + trust)
- **Trade-off**: Gained compliance story; slower onboarding for providers
- **Consequence**: Onboarding takes 1 week; must staff verification team

---

## Completion Checklist

Verify every item below before marking this template complete and advancing to TEMPLATE-005.

### Deliverables

- [ ] 5-10 critical decisions identified and documented
- [ ] Each decision has: context, question, options, choice, consequences
- [ ] Trade-offs are explicit (what we gained vs. lost)
- [ ] Deferred decisions documented (when we'll revisit)
- [ ] Each decision has an owner
- [ ] Revisit triggers identified (when to reconsider)
- [ ] No contradictions between decisions

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Manager, Tech Lead, Date]
- [ ] Approved by: [Steering Committee, Date]

---

## Phase Discipline Rules

Before advancing to TEMPLATE-005 (Discovery Closure and Validation), verify all rules below. Undocumented decisions create silent constraints that surface as surprises in Design and Development.

**Before leaving Discovery, verify**:

1. ✅ All major decisions are documented (not buried in emails/notes)
2. ✅ Context for each decision is clear (future teams understand the "why")
3. ✅ Trade-offs are explicit (what was given up)
4. ✅ Deferred decisions are documented (what we'll revisit and when)
5. ✅ No contradictions or conflicting decisions
6. ✅ Each decision has an owner (accountability)
7. ✅ Revisit triggers are identified (don't forget to reconsider)

---

## Operating Guidelines

Apply these guidelines when generating content for this template. They prevent the most common failures in decision documentation.

1. **Document the debates**: What were people arguing about? That context helps future teams
2. **Be honest about uncertainty**: "We're not 100% sure but X seems reasonable" is valid
3. **Identify reversible vs. locking-in decisions**: Some decisions are expensive to reverse (database schema); others are cheap to change (UI)
4. **Revisit periodically**: Flag decisions for re-evaluation at Phase 2, Phase 3, or annually
5. **Use data when possible**: "Market feedback showed X", not just "we think X"
6. **Document dissent**: If stakeholders disagreed, note that (don't pretend there was consensus)

---

[← Index](./README.md) | [< Previous](./TEMPLATE-005-discovery-closure-and-validation.md)
