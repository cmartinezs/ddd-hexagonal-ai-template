[← UI Index](./README.md)

---

# UX Decisions Template

**What This Is**: A template for documenting design decisions with alternatives considered and justification.

**How to Use**: For each major UX decision, document what was decided, what alternatives were considered, and why this was the best choice.

**When to Use**: When design choices have trade-offs or when stakeholders might question the decision.

**Owner**: UX Designer

---

## Decision Template

```markdown
## UX-[XXX] Decision: [Title]

**Decision**: [What was decided]

### Alternatives Considered
- **[Option A]**: [Description]
- **[Option B]**: [Description]

### Justification
[Why this decision was made]

### Trade-offs
[What was sacrificed for this choice]
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