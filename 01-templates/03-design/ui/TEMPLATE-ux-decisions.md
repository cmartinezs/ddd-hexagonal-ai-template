[← UI Index](./README.md)

---

# UX Decisions Template

**What This Is**: A template for documenting design decisions with alternatives considered and justification.

**How to Use**: For each major UX decision, document what was decided, what alternatives were considered, and why this was the best choice.

**When to Use**: When design choices have trade-offs or when stakeholders might question the decision.

**Owner**: UX Designer

---

## Decision Template

**When to document UX decisions**: Document decisions when there are multiple reasonable approaches with different trade-offs. Trivial choices ("use blue button") don't need documentation; strategic choices ("email vs SMS verification") do. If you can justify the choice in 30 seconds, it's probably not worth documenting.

**How to structure**: Describe the decision clearly, list the alternatives you considered and why they didn't work, explain why you chose this one (grounded in user research, business constraints, or technical feasibility), and be honest about what you sacrificed.

```markdown
## UX-[XXX] Decision: [Title]

**Decision**: [What was decided]

### Alternatives Considered
- **[Option A]**: [Description]
- **[Option B]**: [Description]

### Justification

[Why you chose this one — ground this in user research, business goals, constraints, or technical feasibility. Don't say "it feels better"; say "user testing showed X" or "business requirement Y demands this"]

### Trade-offs

[What users lose / What costs more to build / What's harder to maintain / What's faster but less flexible]
```

---

## Example Decisions

### UX-001 Decision: Registration Email vs. Phone

**Decision**: Use email for registration, not phone number

### Alternatives Considered
- **Email**: Traditional, all users have
- **Phone**: Faster but requires SMS delivery

### Justification
- Email is universal and doesn't cost per SMS
- Email verification link provides longer lifetime
- Most users have email for password recovery anyway

### Trade-offs
- Phone verification is faster for users
- Some users don't check email immediately

---

### UX-002 Decision: Modal vs. Page for Forms

**Decision**: Use modal for small forms, redirect to page for complex forms

### Alternatives Considered
- **Modal for all**: Faster, stays on context
- **Page for all**: More space, clearer navigation

### Justification
- Simple forms (login, forgot password) use modal — quick task
- Complex forms (registration, checkout) use page — multiple steps, more space needed

### Trade-offs
- Users might not expect modal vs. page difference
- More development effort to support both

---

## Completion Checklist

- [ ] Major UX decisions documented
- [ ] Alternatives considered
- [ ] Justification provided
- [ ] Trade-offs documented

---

[← UI Index](./README.md)