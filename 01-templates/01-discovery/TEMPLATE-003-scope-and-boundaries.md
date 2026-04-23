[← Index](./README.md) | [< Anterior](./TEMPLATE-002-actors-and-personas.md) | [Siguiente >](../02-requirements/README.md)

---

# Scope and Boundaries

Define what's in scope, what's out of scope, and the rationale. Clear boundaries prevent scope creep and focus team effort.

## Contents

1. [In Scope (MVP)](#in-scope-mvp)
2. [Out of Scope](#out-of-scope)
3. [Functional Capabilities Traceability](#functional-capabilities-traceability)
4. [Operational Limits](#operational-limits)
5. [Assumptions](#assumptions)
6. [Dependencies](#dependencies)
7. [Acceptance Criteria](#acceptance-criteria)
8. [Risks & Mitigations](#risks--mitigations)
9. [Phase Roadmap](#phase-roadmap)

---

## In Scope (MVP)

**Features and capabilities** that will be delivered in the initial release. Be specific—what exactly will work?

### Scope Definition Template

| Feature | Description | Actor(s) | Priority |
|---------|-------------|----------|----------|
| Feature name | What it does | Who uses it | P0/P1 |

### Example In Scope

> **Core Authentication**:
> - User registration with email verification
> - Username/password login
> - Password reset via email
> - Session management
> - Multi-factor authentication (TOTP)
>
> **Organization Management**:
> - Create and manage organizations (tenants)
> - Invite users to organization
> - Assign roles (Admin, Member)
> - Remove users from organization
>
> **Access Control**:
> - Role-based access control (RBAC)
> - Custom roles per organization
> - Permission inheritance
> - Resource-level permissions
>
> **Admin Dashboard**:
> - Organization settings
> - User management UI
> - Basic usage analytics
> - Audit log viewer

---

## Out of Scope

**Explicitly state what the system will NOT do** in the initial release. This prevents feature creep and sets expectations.

### Out of Scope Template

| Feature | Reason | Future Consideration |
|---------|--------|---------------------|
| Feature name | Why not in scope | When to revisit |

### Example Out of Scope

> **Future Phases (Not in MVP)**:
> - **Social login (Google, GitHub, etc.)**: Add after MVP validation
> - **SAML/SSO integrations**: Complex; add in Phase 2
> - **Passwordless authentication**: Emerging trend; evaluate post-MVP
> - **Custom branding/white-label**: Enterprise feature for Phase 3
> - **Mobile SDKs**: Focus on web SDKs first
> - **Advanced reporting**: Basic analytics in MVP, advanced in Phase 2
> - **Webhooks**: Add after core platform stabilizes
> - **API rate limiting**: Add when traffic warrants
>
> **Technical Decisions Deferred**:
> - **Database selection**: Defer to Development phase
> - **Cloud provider**: Evaluate based on customer requirements
> - **Caching strategy**: Optimize after performance testing

---

## Functional Capabilities Traceability

**Maps each capability to its contribution toward strategic objectives**. Ensures every feature has clear strategic value and prevents feature creep.

### Traceability Matrix Template

| # | Capability | Objective 1<br>[Name] | Objective 2<br>[Name] | Objective 3<br>[Name] | Objective 4<br>[Name] |
|---|------------|:--:|:--:|:--:|:--:|
| 1 | [Capability name] | 🟢 | 🟡 | ⬜ | ⬜ |
| 2 | [Next capability] | 🟢 | 🟢 | 🟡 | ⬜ |

**Legend**:
- 🟢 **Primary contribution** — Capability directly enables or achieves the objective
- 🟡 **Secondary contribution** — Capability supports or reinforces the objective
- ⬜ **No impact** — Capability not directly related

### Prompts for AI

- How does each capability advance the strategic objectives?
- Are there any capabilities with zero strategic value? (Consider removing)
- Are all objectives covered by at least one 🟢-level capability?

### Example Traceability

| Capability | Centralize<br>IAM | Tenant<br>Isolation | Standard<br>Protocols | Granular<br>AuthZ | Auditability | Ecosystem<br>Integration |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Organization Management | 🟢 | 🟢 | ⬜ | 🟡 | 🟡 | 🟡 |
| User Authentication | 🟢 | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 |
| RBAC | 🟢 | 🟢 | ⬜ | 🟢 | 🟡 | 🟡 |
| Audit Logging | 🟡 | 🟡 | ⬜ | ⬜ | 🟢 | ⬜ |

---

## Operational Limits

**Quantified constraints for the system** (if applicable). Helps with capacity planning and sets realistic expectations.

### Operational Limits Template

| Concept | Limit | Notes | Review Trigger |
|---------|-------|-------|-----------------|
| [Metric] | [Value] | [Rationale or TBD status] | [When to reassess] |

### Categories

- **Scale limits**: Users per org, apps per org, concurrent sessions
- **Data retention**: How long audit logs/history are kept
- **Performance**: Response times for critical operations
- **Availability**: SLA targets
- **Costs**: Per-tenant or per-user pricing bands

### Example Operational Limits

| Metric | MVP Limit | Notes | Review at |
|--------|-----------|-------|-----------|
| Active users per organization | 10,000 | Scalable up; tested to this level | Phase 2 |
| Client applications per organization | 50 | Sufficient for most orgs; revisit if demand exceeds | Month 6 |
| Audit log retention | 12 months | Balance compliance and storage costs | Quarterly |
| API response time (p95) | 200ms | Must not be auth bottleneck | Each release |
| Service availability | 99.9% | Industry standard; formalized in SLA | Post-launch |

---

## Assumptions

**Things believed to be true** without proof. Document assumptions to identify risks early.

**Things believed to be true** without proof. Document assumptions to identify risks early.

### Categories of Assumptions

| Category | Example | Risk if Wrong |
|----------|---------|---------------|
| **User** | Users have email addresses | Excludes internal-only users |
| **Technical** | Internet connectivity available | Offline scenarios not supported |
| **Business** | Target market is enterprise | May need pivot for SMB |
| **Regulatory** | GDPR is the only compliance need | Miss other regulations |
| **Resource** | Team can deliver in timeline | Scope needs adjustment |

### Example Assumptions

> **User Assumptions**:
> - Users have corporate email addresses
> - Target users are comfortable with technology
> - Users will have modern browsers (Chrome, Firefox, Safari, Edge)
>
> **Market Assumptions**:
> - Primary market is North America and Europe
> - Enterprise segment will be main revenue source
> - Competition creates pressure for feature parity but also differentiation
>
> **Technical Assumptions**:
> - Authentication requests will average 1000 per second at launch
> - Most organizations have < 1000 users
> - Single sign-on is important for enterprise adoption
>
> **Resource Assumptions**:
> - Core team of 5 engineers available for MVP
> - Can hire 1 additional engineer for Phase 2
> - Budget allows for cloud infrastructure costs

---

## Dependencies

**External factors** required for success. Identify what you need from others.

### Dependency Categories

| Category | Dependency | Owner | Status | Risk |
|----------|------------|-------|--------|------|
| **External Service** | Email delivery service | Vendor selection | Pending | Medium |
| **Integration** | HR system for provisioning | IT Team | Planned | Low |
| **Regulatory** | Security compliance certification | Legal | Not started | High |
| **Resource** | Additional engineering hire | HR | In progress | Medium |

### Example Dependencies

> **Critical Dependencies**:
> - **Email Service Provider**: Need reliable email delivery for auth flows (verification, password reset)
>   - Alternative: SendGrid, AWS SES, Postmark
>   - Risk if delayed: Auth flows won't work
>
> - **Identity Provider Integrations**: Enterprise customers require SSO
>   - Must support SAML 2.0, OAuth 2.0, OpenID Connect
>   - Risk if delayed: Can't close enterprise deals
>
> **Important Dependencies**:
> - **Security Audit**: SOC 2 Type II certification required for enterprise sales
>   - Timeline: 3-4 months for initial audit
>   - Risk if delayed: Enterprise sales blocked
>
> - **Legal/Compliance**: GDPR compliance assessment
>   - EU user data handling requirements
>   - Risk if delayed: Cannot launch to EU market

---

## Acceptance Criteria

**High-level criteria** showing how you'll know each major requirement is satisfied in production. Not detailed test cases, but acceptance signals that bridge Requirements and Testing.

### Acceptance Criteria Template

| Requirement | How You'll Know It's Met | Verification Method | Success Metric |
|------------|---------------------------|---------------------|----|
| [Requirement] | [Observable outcome] | [How to verify] | [Measurable target] |

### Prompts for AI

- For each major capability, how will you demonstrate it's working?
- What would a stakeholder need to see to agree it's "done"?
- What metrics indicate success vs. failure?

### Example Acceptance Criteria

| Requirement | How You'll Know It's Met | Verification Method | Success Metric |
|---|---|---|---|
| **Organization Admin can manage users independently** | Admin completes full lifecycle (create, modify, suspend, delete) without ops team intervention | Process walk-through; zero support tickets for user management | 100% operational autonomy per org |
| **All auth events are immutably logged** | Audit trail shows complete history queryable by org; zero missing events | Audit log review; spot checks against system events | 100% event capture |
| **Multi-tenant isolation is enforced** | No cross-org data access; isolation tests pass in every build | Automated test suite; penetration testing | 0 cross-tenant incidents in production |
| **API integrations require ≤1 day setup** | Developer can integrate sample app with documentation in 1 day | Time-to-first-auth from blank repo | ≤8 hours average |
| **Service is available 99.9%** | Platform uptime monitored; SLA honored | Synthetic monitoring; uptime dashboard | 99.9%+ monthly uptime |

---

## Risks & Mitigations

**Key risks that could prevent success**, along with mitigation strategies. Moves risks from unknown unknowns to managed knowns.

### Risks & Mitigations Template

| # | Risk | Affected Goals | Prob. | Impact | Mitigation Strategy | Owner | Monitor |
|---|------|---|---|---|---|---|---|
| R1 | [Risk description] | [Which objectives/requirements] | Med | High | [How to reduce probability or impact] | [Responsible person] | [KPI to track] |

### Risk Categories

- **Adoption**: Users won't use the system
- **Security**: Unauthorized access, data breaches
- **Performance**: System becomes a bottleneck
- **Technical**: Integration failures, scalability issues
- **Regulatory**: Compliance violations, legal issues
- **Organizational**: Team capacity, resource conflicts

### Example Risks & Mitigations

| # | Risk | Affected Goals | Prob. | Impact | Mitigation | Owner | Monitor |
|---|---|---|---|---|---|---|---|
| R1 | **Low adoption by admins** | Centralize IAM, Ecosystem integration | Medium | High | - Design onboarding flow with templates<br>- Early validation with pilot orgs<br>- Continuous UX feedback | Product | Monthly adoption rate |
| R2 | **Cross-org data access incident** | Tenant isolation, Trust | Low | Critical | - Isolation enforced via design<br>- Mandatory tests every build<br>- Active audit trail from day 1 | Tech Lead | 0 incidents |
| R3 | **API becomes performance bottleneck** | Ecosystem integration | Medium | High | - Load testing before launch<br>- Proactive monitoring<br>- Documented scaling strategy | Infra | Response time p95 |
| R4 | **Difficulty integrating with existing systems** | Ecosystem integration | Medium | Medium | - Standard protocols only<br>- Docs + examples ready early<br>- Dev support during onboarding | Integration PM | Integration time |
| R5 | **Regulatory changes break assumptions** | Auditability, Compliance | Low | Medium | - Legal review aligned with markets<br>- Privacy-by-design architecture<br>- Adaptable without core rewrites | Legal | Regulatory watch |

---

## Phase Roadmap

**What will be delivered when**. Separate MVP from future phases.

### Roadmap Template

| Phase | Timeline | Scope | Key Features |
|-------|----------|-------|--------------|
| MVP | Months 1-3 | Core platform | Auth, RBAC, Admin UI |
| Phase 2 | Months 4-5 | Enhanced features | SSO, Audit, API |
| Phase 3 | Months 6-8 | Enterprise | White-label, Advanced RBAC |

### Example Roadmap

> **Phase 1: MVP (Months 1-3)**
> - User authentication (email/password, MFA)
> - Organization management
> - Role-based access control
> - Basic admin dashboard
> - Core API for integrations
>
> **Phase 2: Enhanced (Months 4-5)**
> - SAML/SSO integrations
> - Comprehensive audit logging
> - Advanced API with rate limiting
> - User provisioning (SCIM)
> - Usage analytics and reporting
>
> **Phase 3: Enterprise (Months 6-8)**
> - Custom branding/white-label
> - Advanced authorization policies
> - Premium support features
> - SLA guarantees
> - Advanced compliance reporting

---

## Paso a Paso

1. **Review Discovery artifacts**: Use context-motivation and actors-personas
2. **Map capabilities to objectives**: Build traceability matrix to ensure strategic alignment
3. **Define MVP scope**: What is the minimum viable product?
4. **List out-of-scope**: Be explicit about what's NOT included
5. **Define operational limits**: Set quantified boundaries (users, apps, retention, SLA, etc.)
6. **Document assumptions**: What do you believe to be true?
7. **Identify dependencies**: What do you need from others?
8. **Define acceptance criteria**: How will you know each requirement is met?
9. **Identify and rank risks**: What could prevent success? What's the mitigation?
10. **Create phase roadmap**: What comes after MVP?
11. **Validate with stakeholders**: Ensure alignment on scope, risks, and roadmap
12. **Get formal sign-off**: Document agreement

---

## Ejemplo

### Ejemplo Proyecto Alpha (SaaS de tareas)

**In Scope (MVP)**:
- User registration and authentication
- Create/read/update/delete tasks
- Assign tasks to team members
- Track task status (To-Do, In Progress, Done)
- Basic email notifications
- Project workspace for team

**Out of Scope**:
- Mobile native apps (web only, MVP)
- Advanced reporting and analytics
- Third-party integrations (Slack, GitHub)
- File attachments
- Gantt charts and timelines

**Assumptions**:
- Teams of 3-20 members (not enterprise yet)
- Users have email and modern browsers
- Basic notifications are sufficient

**Dependencies**:
- Email service for notifications
- Cloud hosting provider

---

### Ejemplo Proyecto Beta (Marketplace B2B)

**In Scope (MVP)**:
- Provider profiles and verification
- Service listing and search
- Messaging between parties
- Basic escrow payment
- Rating and review system

**Out of Scope**:
- Video conferencing
- Contract templates
- Advanced insurance verification
- API for third-party integrations

**Assumptions**:
- Initial focus on US market
- Service providers are individual consultants initially
- Transaction value under $10,000

**Dependencies**:
- Payment processor
- Identity verification service

---

## Completion Checklist

### Deliverables

- [ ] MVP scope clearly defined (features, not implementations)
- [ ] Out of scope explicitly listed with rationale and future phase
- [ ] Functional Capabilities Traceability Matrix (capabilities → objectives)
- [ ] Operational Limits defined (quantified or placeholders with review triggers)
- [ ] Assumptions documented and tagged by category (user, business, technical, regulatory)
- [ ] Dependencies identified with owners, status, and impact
- [ ] Acceptance Criteria defined (high-level: how you'll know each requirement is met)
- [ ] Risks identified, ranked (probability × impact), and mitigated
- [ ] Phase roadmap defined (MVP + 2-3 future phases)
- [ ] Stakeholder alignment on scope, risks, and roadmap

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Manager, Date]
- [ ] Approved by: [Stakeholders, Date]

---

## Phase Discipline Rules

**Before moving to Requirements, verify**:

1. ✅ MVP scope is specific and achievable
2. ✅ Out of scope is explicit (not just "everything else")
3. ✅ Capabilities are traced to strategic objectives; every capability has clear value
4. ✅ Operational limits are defined (quantified, even if placeholder values)
5. ✅ Assumptions are documented and categorized
6. ✅ Dependencies have owners and timelines
7. ✅ Acceptance criteria are clear and verifiable (not just technical tests)
8. ✅ Key risks are identified, ranked, and mitigated; no unmanaged unknowns
9. ✅ Future phases are outlined (not detailed)
10. ✅ No technology names in scope definitions
11. ✅ Stakeholder sign-off obtained on scope, risks, and roadmap

---

## Tips

1. **Be ruthless with MVP**: Include only what's essential for value delivery
2. **Document "not now" features**: Clear out-of-scope prevents scope creep
3. **Question assumptions**: Challenge each assumption—validate or mitigate
4. **Track dependencies early**: External dependencies are common failure points
5. **Phase thoughtfully**: Don't dump everything into MVP; plan for iteration
6. **Get agreement in writing**: Scope disputes are common; documented agreement helps
7. **Plan for change**: Scope will evolve; build in review checkpoints

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-002-actors-and-personas.md) | [Siguiente >](../02-requirements/README.md)
