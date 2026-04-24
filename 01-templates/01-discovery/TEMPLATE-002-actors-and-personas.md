[← Index](./README.md) | [< Previous](./TEMPLATE-001-context-motivation.md) | [Next >](./TEMPLATE-003-scope-and-boundaries.md)

---

# Actors and Personas

You are an AI agent generating Discovery phase documentation. This template identifies who will use the system, their goals, pain points, and needs, and defines the access boundaries between actor types. Complete this template after TEMPLATE-001 — the vision and objectives established there provide the context for actor identification.

## Contents

1. [Actor Identification](#actor-identification)
2. [Explicitly Excluded Actors](#explicitly-excluded-actors)
3. [Actor Hierarchy](#actor-hierarchy)
4. [Persona Template](#persona-template)
5. [Access Boundaries](#access-boundaries)
6. [Actor Map](#actor-map)
7. [Needs Prioritization](#needs-prioritization)

---

## Actor Identification

This section enumerates everyone who interacts with the system or is affected by it. Identify actors early and exhaustively — missing an actor type in Discovery means their needs are not represented in Requirements.

**An actor** is anyone who interacts with the system or is affected by it. Identify all actors early—users, administrators, external systems, and stakeholders.

### Actor Categories

Use this table to organize actors into categories before writing detailed personas.

| Category | Description | Examples |
|----------|-------------|----------|
| **Primary Users** | Direct system users | End users, customers, employees |
| **Secondary Users** | Indirect beneficiaries | Managers, auditors, HR |
| **Administrators** | System managers | Super admins, tenant admins |
| **External Systems** | Integrations | API consumers, webhooks |
| **Stakeholders** | Business owners | Executives, product owners |

### Prompts for AI

Use these questions to ensure all actor types are identified, including those that are easy to overlook.

- Who will log into this system?
- Who benefits from the system but doesn't use it directly?
- Who manages or administers the system?
- What external systems interact with this system?
- Who approves or finances this project?

### Example Actor List

The following example shows a complete actor identification for an IAM platform.

> **Primary Actors**:
> - End User: Authenticates to access applications
> - Developer: Integrates authentication into applications
>
> **Secondary Actors**:
> - IT Administrator: Manages organization settings
> - Security Officer: Reviews access policies and audit logs
> - Compliance Officer: Ensures regulatory adherence
>
> **External Systems**:
> - Customer Applications: Rely on authentication service
> - Identity Providers: SSO integrations (Okta, Azure AD)
> - HR Systems: User provisioning

---

## Explicitly Excluded Actors

This section documents actor types that are out of scope for this phase. Explicit exclusions prevent scope creep and set clear expectations with stakeholders — "not now" is a decision that must be recorded.

**Actors that are NOT in scope for this phase**. Document exclusions to prevent scope creep and set clear expectations. Revisit these in future phases as capabilities expand.

### Excluded Actors Template

Use this table to document each excluded actor with the reason and future revisit plan.

| Actor | Reason for Exclusion | Future Consideration |
|-------|---------------------|--------------------|
| [Actor name] | Why not in MVP scope | When to revisit (phase, timeline) |

### Prompts for AI

Use these questions to identify actor types that should be explicitly excluded.

- What actors would be logical to support but aren't in MVP?
- Which integration points are deferred (e.g., LDAP, third-party identity providers)?
- What external systems are explicitly out of scope?

### Example Excluded Actors

The following example shows well-documented exclusions with rationale and future phase.

> **External Directory Systems** (LDAP, Active Directory)
> - Reason: MVP assumes manual user management by organization admin
> - Future: Phase 2+ can add automated directory sync
>
> **Third-Party Identity Providers** (Google, GitHub, Azure AD login)
> - Reason: Focus on username/password auth in MVP
> - Future: SSO federation in Phase 2
>
> **Automated Provisioning Systems** (HR platforms, HRIS integrations)
> - Reason: Manual onboarding sufficient for MVP
> - Future: SCIM-based provisioning in Phase 3
>
> **External Audit and SIEM Systems**
> - Reason: Internal audit logs accessible to organization; external integrations deferred
> - Future: Webhook-based audit feeds in later phases
>
> **Anonymous/Unauthenticated Users**
> - Reason: All interactions require verified identity
> - Future: May support special use cases (limited guest access) later

---

## Actor Hierarchy

This section shows how actors relate to each other and the system boundaries. A clear hierarchy makes authority chains and data isolation requirements explicit before the design phase begins.

**Tree structure** showing how actors relate to each other and the system boundaries. This makes clear who has authority over whom and how data flows.

### Hierarchy Template

Use this diagram structure to represent the actor hierarchy for the project.

```
┌─────────────────────────────────┐
│ Platform Administrator          │
│ (Global system oversight)       │
└──────────────┬──────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────────┐   ┌────▼──────────────────┐
│  Organization   │   │ Ops Team              │
│  Administrator  │   │ (Platform maintenance)│
├────────────────┤   └───────────────────────┘
│  Manages:       │
│  - Users        │
│  - Roles        │
│  - Apps         │
│  - Billing      │
│                 │
├────┬────────┬──┤
│    │        │  │
│    │        │  │
▼    ▼        ▼  ▼
```

### Prompts for AI

Use these questions to validate the hierarchy is complete and correct.

- Who manages whom in this system?
- What's the delegation/authority chain?
- Are there peer actors or only hierarchical relationships?
- Where are the hard boundaries (tenants, security contexts)?

### Example Hierarchy

The following example shows a three-tier actor hierarchy with clear isolation boundaries.

> **Platform Tier** (Global):
> - Platform Administrator: Registers/deregisters organizations, manages global settings
>
> **Organization Tier** (Per-tenant):
> - Organization Administrator: Full control over users, roles, apps, billing within their org
> - Regular Users: Can only access apps/resources assigned to them
> - Applications: Can only interact with users/roles in their registered org
>
> **Operations Tier**:
> - Ops Team: No access to user data; can access metrics, logs, infrastructure

---

## Access Boundaries

This section defines explicitly what each actor can and cannot do. This is the most critical security input for the design phase — missing a boundary here means a potential authorization gap in the system.

**Explicit definition of what each actor CAN and CANNOT do**. Critical for multi-tenant systems and security. Prevents misunderstandings about scope and creates the basis for permission modeling.

### Access Boundaries Template

Use this table to document each actor's permissions and restrictions.

| Actor | CAN Access/Do | CANNOT Access/Do | Notes |
|-------|---|---|---|
| [Actor] | [Resources, operations] | [Restricted operations, cross-boundaries] | [Enforcement mechanism] |

### Prompts for AI

Use these questions to ensure access boundaries are complete and enforceable.

- For each actor, what data can they see?
- What operations can each actor perform?
- What are hard boundaries they cannot cross?
- How are boundaries enforced (technical, process)?

### Example Access Boundaries

The following example shows access boundaries defined for each actor type with enforcement mechanisms.

> **Organization Administrator**:
> - ✅ CAN: Manage all users in their org, define roles, register apps, manage billing, view audit logs
> - ❌ CANNOT: See users from other organizations, access global platform settings, manage other orgs, view ops metrics
> - Enforcement: All queries filtered by `organization_id`; API rejects cross-org access
>
> **End User**:
> - ✅ CAN: Authenticate, view own profile, change own password, logout
> - ❌ CANNOT: Manage other users, change roles, see other users' data, manage org settings
> - Enforcement: User context always tied to their identity and org
>
> **Client Application**:
> - ✅ CAN: Verify tokens, query user info (within org), get role info for auth decisions
> - ❌ CANNOT: Create/delete users, change roles, see users from other orgs, access raw passwords
> - Enforcement: Application scoped to organization; signed requests validated
>
> **Ops Team**:
> - ✅ CAN: Access infrastructure metrics, logs, performance data, emergency incident investigation
> - ❌ CANNOT: Access user credentials, see user data without audit trail, modify customer data
> - Enforcement: Privileged access logged and audited; credentials stored in secure vault
>
> **Platform Administrator**:
> - ✅ CAN: Register/deregister organizations, manage global platform settings, handle escalations
> - ❌ CANNOT: Access organization user data (except in documented emergency), modify user data directly
> - Enforcement: Admin operations logged; cross-org access denied except for emergency procedures

---

## Persona Template

This section defines the structure for each user persona. A persona is more than a role — it represents a fictional character whose goals, pain points, and needs drive requirements. Complete one section per distinct user type.

**Complete one section per distinct user type**. A persona is more than a role—it's a fictional character representing a user type.

### Persona Structure

Use this template for each persona you generate.

```markdown
## [Persona Name]

### Who
- Role: [Job title/function]
- Department: [Team or division]
- Experience Level: [Junior/Mid/Senior/Executive]
- Technical Savviness: [Low/Medium/High/Technical]

### Goals
- What they want to achieve (1-3 bullets, prioritized)

### Pain Points
- Current frustrations with existing solutions
- Problems the new system will solve

### Needs
- What will make their life better?
- Specific requirements derived from their context

### Volume
- How many of this type?
- Frequency of use (daily/weekly/monthly)
```

### Example Persona

The following examples show three completed personas at different seniority and technical levels.

---

## Persona: Application Developer

**Who**:
- Role: Full-stack Developer
- Department: Engineering
- Experience Level: Mid-level (3-5 years)
- Technical Savviness: High

**Goals**:
- Integrate authentication quickly without being a security expert
- Have clear, working documentation
- Debug authentication issues easily

**Pain Points**:
- Current solutions require deep security knowledge
- Documentation is scattered across multiple sources
- Debugging auth issues is time-consuming

**Needs**:
- SDKs in popular languages (JavaScript, Python, Go)
- Clear error messages and debugging tools
- Working code examples for common scenarios
- Responsive support when stuck

**Volume**:
- 50-100 developers per enterprise customer
- Daily integration work during initial setup
- Occasional debug sessions post-launch

---

## Persona: IT Administrator

**Who**:
- Role: IT Administrator
- Department: Information Technology
- Experience Level: Senior
- Technical Savviness: Medium-High

**Goals**:
- Manage user access efficiently across all company applications
- Enforce security policies consistently
- Reduce IT support tickets related to access

**Pain Points**:
- Managing separate identity systems per application
- No visibility into who has access to what
- Manual provisioning/deprovisioning is error-prone

**Needs**:
- Centralized admin dashboard
- Bulk user management tools
- Clear audit logs of all access changes
- Automated user lifecycle management

**Volume**:
- 1-5 administrators per organization
- Daily user management tasks
- Weekly security reviews

---

## Persona: Security Officer

**Who**:
- Role: Security Officer / CISO
- Department: Security
- Experience Level: Executive
- Technical Savviness: High (security domain)

**Goals**:
- Ensure compliance with security regulations
- Minimize security vulnerabilities
- Demonstrate due diligence to auditors

**Pain Points**:
- No visibility into authentication patterns
- Can't prove who accessed what and when
- Concerns about unauthorized access

**Needs**:
- Comprehensive audit logs
- Real-time security alerts
- Compliance reports (SOC 2, ISO 27001)
- Risk assessment tools

**Volume**:
- 1-2 per enterprise organization
- Monthly security reviews
- Ad-hoc incident investigations

---

## Actor Map

This section provides a visual representation of how actors relate to each other and to the system. Use it to verify that the actor identification and hierarchy are internally consistent.

**Visual representation** of how actors relate to each other and the system.

### Actor Map Template

Use this diagram structure to map actor relationships.

```
                    ┌─────────────────┐
                    │   EXTERNAL      │
                    │   SYSTEMS       │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  APPLICATION    │
                    │  DEVELOPER      │
                    │  (Integration)  │
                    └────────┬────────┘
                             │
┌──────────┐          ┌──────▼──────┐         ┌──────────────┐
│ SECURITY │◄─────────│   KEYGO     │────────►│  HR SYSTEM   │
│ OFFICER │          │   PLATFORM  │         │  (Provisioning)│
└──────────┘          └──────┬──────┘         └──────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
       ┌──────▼──────┐ ┌────▼────┐ ┌──────▼──────┐
       │      IT      │ │   END   │ │  EXTERNAL   │
       │  ADMIN      │ │  USER   │ │  USERS      │
       │              │ │         │ │             │
       └──────────────┘ └─────────┘ └─────────────┘
```

### Actor Relationships

Use this table to document the relationship type between each actor and the system.

| Actor | Relationship | Interaction Type |
|-------|--------------|------------------|
| End User | Uses system directly | Authentication, profile management |
| Developer | Integrates system | API calls, SDK usage |
| IT Admin | Manages organization | User management, settings |
| Security Officer | Oversees compliance | Audits, reports, alerts |
| HR System | Provisions users | SCIM, bulk operations |

---

## Needs Prioritization

This section ranks actor needs by priority to guide the Requirements phase. Not all needs are equally important — the P0-P3 matrix ensures the MVP contains what is truly essential.

**Not all needs are equal**. Prioritize based on frequency, impact, and feasibility.

### Prioritization Matrix

Use this matrix to assign a priority level to each actor need.

| Priority | Definition | Criteria |
|----------|------------|----------|
| **P0 - Must Have** | Core to product value | 80%+ users need this; blocking without |
| **P1 - Should Have** | Important but not blocking | Significant user segment; high impact |
| **P2 - Nice to Have** | Enhancement | Improves experience; not critical |
| **P3 - Future** | Not in scope | Good ideas to revisit later |

### Example Needs Prioritization

The following example shows needs prioritized across multiple personas.

| Persona | Need | Priority | Rationale |
|---------|------|----------|------------|
| Developer | SDK with documentation | P0 | Core integration path |
| Developer | Debug tools | P1 | Significantly improves experience |
| Developer | Support response < 24h | P2 | Important for enterprise |
| IT Admin | Bulk user import | P0 | Daily operation requirement |
| IT Admin | Audit logs | P0 | Compliance requirement |
| IT Admin | Custom branding | P2 | Enterprise nice-to-have |
| Security Officer | Real-time alerts | P1 | Important for incident response |
| Security Officer | Compliance reports | P0 | Audit requirement |

---

## Paso a Paso

Follow these steps in order to complete this template. Validate each step with a human collaborator before proceeding to the next.

1. **List all actors**: Brainstorm all user types, including edge cases
2. **Group by category**: Primary, secondary, admin, external, stakeholder
3. **Create personas**: Write detailed persona for each distinct type
4. **Identify needs**: What does each persona need from the system?
5. **Prioritize needs**: Use P0-P3 matrix
6. **Validate with stakeholders**: Review personas with actual users or domain experts
7. **Map relationships**: Visualize how actors interact with each other and system

---

## Ejemplo

The following examples show completed actor and persona sets from two different project types.

### Ejemplo Proyecto Alpha (SaaS de tareas)

**Persona: Project Manager**
- Who: Manages team projects and timelines
- Goals: See all team work in one place, identify bottlenecks
- Pain Points: Info scattered across email and Slack
- Needs: Unified dashboard, status reports, capacity view
- Priority Needs: Task visibility, reporting, assignment tracking

**Persona: Team Member**
- Who: Executes tasks assigned to them
- Goals: Know what to work on, complete tasks efficiently
- Pain Points: Unclear priorities, duplicate requests
- Needs: Clear task lists, easy updates, notification of changes
- Priority Needs: Task list view, quick status updates

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**Persona: Service Provider**
- Who: Offers professional services on marketplace
- Goals: Get leads, close deals, deliver service
- Pain Points: Hard to reach enterprise buyers
- Needs: Profile management, proposal tools, payment processing
- Priority Needs: Profile visibility, lead management

**Persona: Enterprise Buyer**
- Who: Procurement manager evaluating service providers
- Goals: Find qualified providers quickly, ensure compliance
- Pain Points: Lengthy procurement cycles, vetting complexity
- Needs: Verified provider directory, compliance documentation
- Priority Needs: Search/filter, verification badges, reviews

---

## Completion Checklist

Verify every item below before marking this template complete and advancing to TEMPLATE-003.

### Deliverables

- [ ] All actors identified (primary, secondary, admin, external, systems, stakeholders)
- [ ] Explicitly excluded actors documented (with rationale and future revisit timeline)
- [ ] Actor hierarchy (tree structure showing relationships and authority)
- [ ] Personas created for each distinct user type
- [ ] Goals documented for each persona (prioritized)
- [ ] Pain points captured for each persona
- [ ] Needs identified and prioritized (P0-P3)
- [ ] Access boundaries defined (what each actor CAN and CANNOT do)
- [ ] Actor map created (visual relationships)
- [ ] Validated with actual users or domain experts (not assumptions)

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Manager, Date]
- [ ] Approved by: [Stakeholders, Date]

---

## Phase Discipline Rules

Before advancing to TEMPLATE-003 (Scope and Boundaries), verify all rules below. Violations here propagate directly into incorrect scope and access control design.

**Before moving to Requirements, verify**:

1. ✅ All actor types covered (primary, secondary, admin, external, systems, stakeholders)
2. ✅ Excluded actors explicitly listed (and why deferred)
3. ✅ Actor hierarchy shows relationships and authority (tree or org chart)
4. ✅ Each persona has clear goals, pain points, and needs
5. ✅ Needs are specific, testable, and prioritized (P0-P3)
6. ✅ Access boundaries defined for each actor (what they CAN and CANNOT do)
7. ✅ Boundaries are enforced by design/architecture, not just documentation
8. ✅ No technology solutions mentioned (needs/goals, not implementation)
9. ✅ Actor map shows relationships and interactions
10. ✅ Validation obtained from actual users or domain experts (not assumptions)

---

## Operating Guidelines

Apply these guidelines when generating content for this template. They prevent the most common failures in actor and persona documentation.

1. **Interview real users**: Don't guess—talk to actual users when possible
2. **Start with goals, not features**: Focus on what users want to achieve
3. **Look for patterns**: Group similar needs across personas
4. **Consider edge cases**: What about unauthenticated users? Failed logins?
5. **Mind the admin**: Admin users are often overlooked but critical
6. **External systems matter**: API consumers and integrations are actors too
7. **Keep personas grounded**: Use real quotes or observations when possible

---

[← Index](./README.md) | [< Previous](./TEMPLATE-001-context-motivation.md) | [Next >](./TEMPLATE-003-scope-and-boundaries.md)
