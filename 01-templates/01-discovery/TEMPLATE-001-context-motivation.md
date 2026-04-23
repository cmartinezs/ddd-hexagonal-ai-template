[← Index](./README.md) | [< Anterior] | [Siguiente >](./TEMPLATE-002-actors-and-personas.md)

---

# Context and Motivation

Establish shared understanding of why the project exists, the vision it pursues, and the context in which it will operate.

## Contents

1. [Vision](#vision)
2. [Mission](#mission)
3. [Problem Statement](#problem-statement)
4. [Strategic Objectives](#strategic-objectives)
5. [Key Capabilities](#key-capabilities)
6. [Critical Principles](#critical-principles)
7. [Success Criteria](#success-criteria)
8. [Timeline](#timeline)
9. [Constraints](#constraints)

---

## Vision

**One-paragraph statement** describing the long-term aspirational goal of the project.

### Prompts for AI

- What problem does this project solve in the world?
- Who benefits from this solution?
- How will the world be different because this project exists?

### Example Vision

> *To become the leading identity and access management platform for SaaS applications, enabling organizations to securely manage user authentication, authorization, and access across all their applications from a single unified control plane.*

---

## Mission

**Concrete statement** of the project's purpose and how it will achieve the vision.

### Prompts for AI

- What specific value does this project deliver?
- Who are the primary beneficiaries?
- What is the core approach to solving the problem?

### Example Mission

> *Provide a multi-tenant authentication and authorization platform that simplifies user management, enforces security policies, and integrates seamlessly with any application through standardized protocols.*

---

## Problem Statement

**Clear articulation** of the specific problem being solved, including:

- Current state (what's broken or missing)
- Impact on users and business
- Root causes if understood

### Questions to Answer

- What specific pain points do users experience today?
- How are they currently solving the problem (if at all)?
- What are the consequences of not solving this problem?
- How large is the affected market or user base?

### Example Problem Statement

> **Current State**: Organizations manage user access across multiple SaaS applications using separate identity systems, leading to:
> - User password fatigue (average 25+ passwords per employee)
> - Security vulnerabilities from weak or reused passwords
> - Inconsistent access policies across applications
> - High IT support costs for password resets and account management
>
> **Impact**: Security breaches cost enterprises an average of $4.45M per incident in 2023, with 74% involving human element (phishing, stolen credentials).

---

## Strategic Objectives

**7+ strategic objectives** that translate the vision into concrete, measurable outcomes. Each objective is accompanied by KPIs showing how success will be measured.

### Objective Template

```markdown
### N. [Objective Name]

> **What we seek**: [Concise goal statement]
> **Why it's strategic**: [Business rationale—what fails without this]
> **KPI**: [Measurable outcome with target and timeline]
```

### Prompts for AI

- What are the 5-7 most important results this project needs to achieve?
- If the project succeeds, what changes in the world/business?
- What would a competitor need to do to invalidate this objective?

### Example Objectives

> **1. Centralize identity and access management**
> - What we seek: Keygo is the single source of truth for authentication and authorization
> - Why it's strategic: Without centralization, each app duplicates policies and auditability is impossible
> - KPI: ≥90% of ecosystem applications authenticating via Keygo within 12 months
>
> **2. Guarantee complete tenant isolation**
> - What we seek: Zero possibility of cross-organization access, verifiable by design and tests
> - Why it's strategic: Data leak between tenants invalidates the entire value proposition
> - KPI: 0 incidents of cross-tenant access in production; isolation testing mandatory in every release
>
> **3. Enable granular role-based authorization**
> - What we seek: Each tenant can define and enforce fine-grained access policies
> - Why it's strategic: Must serve both small teams and complex enterprise structures
> - KPI: Permission validation response time < 50ms p95; all operations have explicit documented policies

---

## Key Capabilities

**High-level description** of what the system will be able to do—the bridge between vision and detailed requirements. Focus on *capabilities*, not implementations.

### Capability Template

| Capability | Description | Strategic Value |
|------------|-------------|-----------------|
| [Name] | One sentence describing what the system does | How it advances objectives |

### Prompts for AI

- What are the 6-8 core things this system must be capable of?
- What business outcomes does each capability enable?
- Which capabilities are truly foundational vs. nice-to-have?

### Example Capabilities

> **User Authentication Lifecycle Management**: System manages the complete cycle of login, credential renewal, logout, and access revocation. Apps delegate auth validation to the platform rather than implementing it themselves.
>
> **Multi-Tenant Organizational Isolation**: Each organization operates in a completely separate space. Users, roles, and sessions of one organization are never visible or accessible from another. This isolation is a design constraint, not a configuration option.
>
> **Role-Based Access Control**: Each tenant defines its own roles and assigns them to users and applications. The system automatically enforces permissions on each operation.
>
> **Organization and Billing Management**: Platform manages tenant registration, configuration, subscription plans, and usage-based billing, enabling each organization to self-serve.
>
> **Audit and Traceability**: All security-relevant events (login, logout, role changes, user lifecycle, access revocations) are recorded immutably and queryable by the organization.
>
> **Integration with Application Ecosystem**: Applications can integrate without building proprietary adapters. Contracts are stable and based on industry standards.

---

## Critical Principles

**Foundational design principles** that are non-negotiable from the start and guide all subsequent decisions. These are the "why" behind major architecture choices.

### Prompts for AI

- What design decisions are so important they must be made NOW, not deferred?
- What would break the core value proposition if violated?
- What trade-offs are we willing to accept to uphold these principles?

### Example Critical Principles

> **Centralization as Strategic Foundation**
> The core proposal of Keygo is to replace fragmented identity management with a unified system. Every design decision must reinforce this consolidation. Any feature that allows apps to bypass Keygo undermines the entire platform.
>
> **Multi-Tenant Isolation as Security Constraint**
> Isolation is not optional. It is a first-order security constraint. Every entity, every query, every API must enforce that cross-tenant access is impossible. A data leak between tenants is treated as a P0 security incident and invalidates the platform's credibility.
>
> **Open Standards as Integration Base**
> Integration will use industry-standard protocols (OAuth 2.0, OIDC, SAML, etc.), not proprietary contracts. This lowers the cost for applications to integrate and enables third-party tooling (gateways, audit systems, monitoring) to operate seamlessly.
>
> **Modularity and Bounded Domains**
> The system is organized into independent functional domains (authentication, organization management, access control, billing) that can evolve separately without impacting others. This enables scale and iteration without core rewrites.
>
> **Auditability from Day One**
> All security-relevant actions are logged immutably. The audit trail is not an afterthought—it's part of the core contract. Organizations can query their own audit history without depending on operations.

---

## Success Criteria

**Measurable outcomes** that indicate the project has achieved its objectives. Use SMART criteria:

| Criterion | Metric | Target | Timeline |
|-----------|--------|--------|----------|
| User Adoption | Monthly Active Tenants | 50+ | 12 months |
| Platform Reliability | System Uptime | 99.9% | Ongoing |
| Security | Zero Critical Vulnerabilities | 0 CVEs | Per release |
| Customer Satisfaction | NPS Score | 40+ | 6 months |
| Time-to-Value | First Authentication | < 1 hour | Post-launch |

### Prompts for AI

- What would success look like at 3 months, 6 months, 12 months?
- What metrics would indicate the project is failing?
- What is the minimum viable success?

---

## Timeline

**Phased approach** with key milestones and decision points.

### Timeline Template

| Phase | Duration | Key Milestones | Decision Points |
|-------|----------|----------------|-----------------|
| Discovery | 2 weeks | Vision confirmed, actors identified | Go/No-Go to Requirements |
| Requirements | 3 weeks | Requirements documented | Scope locked |
| Design | 4 weeks | Architecture approved | Tech choices finalized |
| Development | 8 weeks | MVP feature-complete | Beta release |
| Testing | 3 weeks | All tests passing | Production ready |
| Deployment | 2 weeks | Live in production | Launch public |

### Example Timeline

> **Phase 1 (MVP)**: 3 months
> - Core authentication (login, logout, password reset)
> - Multi-tenant organization management
> - Basic role-based access control
> - Admin dashboard
>
> **Phase 2 (Enhanced)**: 2 months
> - Advanced authorization policies
> - SSO integrations
> - Audit logging
> - API access
>
> **Phase 3 (Enterprise)**: 3 months
> - Custom branding
> - Advanced reporting
> - SLA guarantees
> - Premium support features

---

## Constraints

**Boundaries** within which the project must operate. Document all constraints upfront.

### Categories

| Category | Constraint | Rationale |
|----------|------------|-----------|
| **Regulatory** | GDPR compliance | Users are EU-based |
| **Business** | Must integrate with existing customer systems | Market requirement |
| **Budget** | $500K total budget | Board approval |
| **Timeline** | Launch by Q4 2025 | Competitive pressure |
| **Resource** | Team of 5 engineers | Available capacity |
| **Technical** | Must support 10,000+ concurrent users | Projected load |

### Example Constraints

> **Regulatory Constraints**:
> - Must comply with GDPR (EU user data)
> - Must support data residency requirements
> - Must maintain audit trail for financial compliance
>
> **Business Constraints**:
> - Must integrate with existing customer identity providers (Okta, Azure AD)
> - Must offer same-day support response for enterprise tier
> - Pricing must be competitive with Auth0, Clerk
>
> **Technical Constraints**:
> - Must handle 10,000+ concurrent authentication requests
> - Must respond to auth requests in < 200ms (p95)
> - Must support horizontal scaling for peak loads

---

## Paso a Paso

1. **Gather context**: Interview stakeholders, review existing documentation, understand market position
2. **Draft vision**: Write 1-2 sentence vision statement; refine with stakeholders
3. **Articulate problem**: Document current state, pain points, and impact in business terms
4. **Define success**: Establish measurable criteria with specific targets
5. **Map timeline**: Create phased roadmap with milestones and decision points
6. **Document constraints**: List all known constraints (regulatory, business, technical)
7. **Validate**: Review with key stakeholders; iterate until alignment

---

## Ejemplo

### Ejemplo Proyecto Alpha (SaaS de tareas)

**Vision**: Enable distributed teams to collaborate on work in one unified platform.

**Mission**: Provide an intuitive task management system that replaces scattered spreadsheets and email with a single source of truth.

**Problem**: Teams juggle tasks across email, Slack, and spreadsheets, losing context and accountability. Project managers spend 5+ hours weekly just gathering status updates.

**Success Criteria**:
- 100+ teams adopt platform within 6 months
- 80% reduction in time spent on status updates
- NPS score of 50+ after 3 months

**Timeline**:
- MVP: 8 weeks (core task management)
- Beta: 4 weeks (feedback integration)
- Launch: 2 weeks (production hardening)

**Constraints**:
- Must be GDPR compliant (EU users)
- Must work on mobile browsers
- Maximum 5-person core team

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**Vision**: Become the trusted marketplace for business-to-business services, connecting enterprises with specialized service providers.

**Problem**: Enterprises spend 3-6 months procurement cycles to vet and contract specialized service providers. Small providers struggle to reach enterprise buyers.

**Success Criteria**:
- 500+ verified providers on platform
- $10M in transaction volume by month 12
- < 2 weeks average time-to-contract

**Constraints**:
- Must comply with procurement regulations
- Must support enterprise SSO
- Must maintain SOC 2 compliance

---

## Completion Checklist

### Deliverables

- [ ] Vision statement (1-2 sentences, aspirational)
- [ ] Mission statement (action-oriented, how vision is achieved)
- [ ] Problem statement (clear, specific, quantified; current impact)
- [ ] 5-7 Strategic Objectives with KPIs (measurable outcomes)
- [ ] 6-8 Key Capabilities (what system will do, not how)
- [ ] 5-7 Critical Principles (non-negotiable design constraints)
- [ ] Success criteria (SMART: specific, measurable, achievable, relevant, time-bound)
- [ ] Timeline (phased, with decision points and milestones)
- [ ] Constraints documented (regulatory, business, technical, resource)

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Stakeholders, Date]
- [ ] Approved by: [Product Manager, Date]

---

## Phase Discipline Rules

**Before moving to Requirements, verify**:

1. ✅ Vision is aspirational but grounded in real problem
2. ✅ Mission is concrete and shows how vision is achieved
3. ✅ Problem is specific and quantified (not generic)
4. ✅ Strategic Objectives are 5-7 items with clear KPIs
5. ✅ Key Capabilities are described (not implementation details)
6. ✅ Critical Principles document non-negotiable design constraints
7. ✅ Success criteria are measurable (SMART: specific, achievable, time-bound)
8. ✅ Timeline includes decision points and milestones (not just duration)
9. ✅ All known constraints are documented (regulatory, business, technical)
10. ✅ No technology/implementation mentions (this is Discovery, not Design)
11. ✅ Stakeholder alignment achieved on vision, objectives, and success criteria

---

## Tips

1. **Start with WHY**: Before features, understand the business need and market context
2. **Quantify impact**: Use numbers to justify the project (market size, current costs, projected savings)
3. **Get alignment**: Vision should be co-created with key stakeholders, not imposed
4. **Document assumptions**: Anything you're assuming about market, users, or constraints—write it down
5. **Keep it concise**: This document should be 2-3 pages maximum; detail goes in later phases
6. **Be realistic about timeline**: Add buffer for unknowns; overestimate timeline, underestimate scope

---

[← Index](./README.md) | [< Anterior] | [Siguiente >](./TEMPLATE-002-actors-and-personas.md)
