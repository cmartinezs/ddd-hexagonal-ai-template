[← Index](./README.md) | [< Anterior](./TEMPLATE-019-coding-standards.md) | [Siguiente >](../07-testing/README.md)

---

# Architecture Decision Records (ADR)

Document significant architectural decisions with context, decision, and consequences. Capture the "why" behind choices.

## Contents

1. [ADR Format](#adr-format)
2. [ADR Lifecycle](#adr-lifecycle)
3. [Example ADRs](#example-adrs)
4. [ADR List Template](#adr-list-template)

---

## ADR Format

### Standard ADR Structure

```markdown
# ADR-[NNN]: [Title]

**Date**: [YYYY-MM-DD]
**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Author**: [Name]
**Reviewers**: [Names]

## Context
[What is the issue that we're seeing that is motivating this decision?]

## Decision
[What is the change that we're proposing and/or doing?]

## Consequences
[What becomes easier or more difficult because of this change?]

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Trade-off 1]
- [Trade-off 2]

### Neutral
- [Impact 1]

## Alternatives Considered
### Option 1: [Name]
- **Pros**: [Benefits]
- **Cons**: [Drawbacks]
- **Why rejected**: [Reason]

### Option 2: [Name]
- **Pros**: [Benefits]
- **Cons**: [Drawbacks]
- **Why rejected**: [Reason]

## Related ADRs
- [ADR-XXX]: [Title]
- [ADR-YYY]: [Title]

## Notes
[Any additional notes, links, or references]
```

### ADR Status

| Status | Meaning |
|--------|---------|
| **Proposed** | Under review |
| **Accepted** | Approved and implemented |
| **Deprecated** | No longer recommended |
| **Superseded** | Replaced by newer ADR |

---

## ADR Lifecycle

### Creating an ADR

1. **Identify the decision**: What needs to be decided?
2. **Gather context**: Research options, gather requirements
3. **Write the ADR**: Document context, decision, consequences
4. **Review**: Get feedback from team
5. **Accept**: Formal acceptance
6. **Implement**: Build the solution
7. **Reference**: Link in code and docs

### ADR Review

- Review within 1 week of creation
- Include relevant stakeholders
- Document disagreements
- Reach consensus or escalate

---

## Example ADRs

### Example: Database Choice

# ADR-001: Use PostgreSQL as Primary Database

**Date**: 2024-01-15
**Status**: Accepted
**Author**: John Smith
**Reviewers**: Jane Doe, Bob Wilson

## Context
We need to select a primary database for the Keygo authentication platform. The database must support:
- Relational data with complex queries
- Multi-tenant isolation
- High write throughput
- JSON for flexible schemas

We evaluated PostgreSQL, MySQL, and MongoDB.

## Decision
We will use **PostgreSQL** as the primary database.

## Consequences

### Positive
- Strong ACID compliance for data integrity
- Excellent JSON support for flexible schemas
- Rich query capabilities for complex relationships
- Proven at scale by many organizations
- Strong ecosystem and community support

### Negative
- Horizontal scaling more complex than NoSQL
- Requires more setup than managed solutions

### Neutral
- Team needs to learn PostgreSQL-specific features

## Alternatives Considered

### MySQL
- **Pros**: Easier horizontal scaling
- **Cons**: JSON support less mature, less powerful queries
- **Why rejected**: PostgreSQL's JSON and query capabilities better fit our needs

### MongoDB
- **Pros**: Easy to scale, flexible schemas
- **Cons**: ACID concerns, less mature for complex relationships
- **Why rejected**: Our data is highly relational, not document-centric

## Related ADRs
- ADR-002: Database Connection Pooling

## Notes
- PostgreSQL 15+ recommended
- Consider Amazon RDS or self-hosted
```

---

### Example: Authentication Approach

# ADR-002: Use JWT with Refresh Tokens

**Date**: 2024-01-15
**Status**: Accepted
**Author**: Jane Doe
**Reviewers**: John Smith, Security Team

## Context
We need to implement user authentication. Options include:
- Server-side sessions
- JWT access tokens
- JWT with refresh tokens
- OAuth2/OIDC delegation

## Decision
We will use **JWT with refresh token rotation**.

## Consequences

### Positive
- Stateless: scales horizontally
- Mobile-friendly: works with native apps
- Refresh tokens allow long sessions without long-lived access tokens
- Token rotation provides security

### Negative
- More complex than simple sessions
- Token revocation is challenging
- Requires secure token storage

### Neutral
- Need to handle token expiration gracefully

## Alternatives Considered

### Server-side Sessions
- **Pros**: Easy revocation, simple
- **Cons**: Doesn't scale well, not mobile-friendly
- **Why rejected**: Need horizontal scaling, mobile support

### Simple JWT (no refresh)
- **Pros**: Very simple
- **Cons**: Short-lived tokens inconvenience users
- **Why rejected**: Poor user experience

## Related ADRs
- ADR-001: Use PostgreSQL
- ADR-005: Session Invalidation Strategy

## Notes
- Access token: 15 minutes
- Refresh token: 7 days (rotates on use)
- Store refresh token hash in database
```

---

### Example: API Style

# ADR-003: Use REST API with JSON

**Date**: 2024-01-16
**Status**: Accepted
**Author**: Bob Wilson
**Reviewers**: Engineering Team

## Context
We need to design our API. Options include:
- REST with JSON
- GraphQL
- gRPC

## Decision
We will use **REST with JSON**.

## Consequences

### Positive
- Well-understood by developers
- Easy to debug and test
- Good tooling support
- Works well with standard HTTP

### Negative
- May lead to over-fetching or under-fetching
- Not as flexible as GraphQL
- Versioning can be complex

### Neutral
- GraphQL can be added later if needed

## Alternatives Considered

### GraphQL
- **Pros**: Flexible queries, single endpoint
- **Cons**: Complexity, N+1 query issues, caching challenges
- **Why rejected**: Added complexity for our use case

### gRPC
- **Pros**: Performance, code generation
- **Cons**: Not browser-friendly, steeper learning curve
- **Why rejected**: Not needed for our scale

## Related ADRs
- ADR-006: API Versioning Strategy

## Notes
- Consider GraphQL for complex queries in v2
```

---

## ADR List Template

### ADR Registry

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| ADR-001 | Use PostgreSQL | Accepted | 2024-01-15 |
| ADR-002 | JWT with Refresh Tokens | Accepted | 2024-01-15 |
| ADR-003 | REST API with JSON | Accepted | 2024-01-16 |
| ADR-004 | Use Redis for Caching | Proposed | - |

### New ADR Template

```markdown
# ADR-[NNN]: [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed
**Author**: [Name]
**Reviewers**: [Names]

## Context
[What is the issue?]

## Decision
[What are we doing?]

## Consequences
[What happens next?]

---
```

---

## Paso a Paso

1. **Identify decisions**: What architectural choices need documenting?
2. **Gather context**: Research options and requirements
3. **Write ADR**: Follow the format
4. **Review**: Get feedback from stakeholders
5. **Accept**: Formal acceptance
6. **Implement**: Build the solution
7. **Track**: Maintain ADR list

---

## Ejemplo

### Ejemplo Proyecto Alpha

- ADR-001: Use React for frontend
- ADR-002: Use PostgreSQL database
- ADR-003: REST API approach

### Ejemplo Proyecto Beta

- ADR-001: Use GraphQL
- ADR-002: Use MongoDB
- ADR-003: Event-driven architecture

---

## Completion Checklist

### Deliverables

- [ ] ADRs created for major decisions
- [ ] Each ADR has context, decision, consequences
- [ ] Alternatives documented
- [ ] Status tracked
- [ ] ADR list maintained

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Architecture Team, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Record decisions early**: Capture while context is fresh
2. **Be specific**: Vague decisions aren't useful
3. **Document alternatives**: Show you considered options
4. **Acknowledge trade-offs**: No perfect solutions
5. **Keep ADRs current**: Update if circumstances change
6. **Link in code**: Reference ADRs in code comments

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-019-coding-standards.md) | [Siguiente >](../07-testing/README.md)
