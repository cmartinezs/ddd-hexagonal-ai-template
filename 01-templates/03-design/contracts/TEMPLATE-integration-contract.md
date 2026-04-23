[← Contracts Index](./README.md)

---

# Integration Contract Template

**What This Is**: A template for defining partner/integration agreements — scope, data exchange, SLAs, and support.

**How to Use**: For external integrations or partnerships, document what's exchanged, how, and what happens if things go wrong.

**When to Use**: External partners, payment providers, or third-party integrations.

**Owner**: Product Manager + Architect

---

## Integration Contract Template

```markdown
## [INT-XXX] Integration: [Partner Name]

**Partner**: [Name]
**Related Flow**: SF-XXX

### Scope
- **What's included**: [Features/capabilities]
- **What's excluded**: [Out of scope]

### Data Exchange
- **[Data 1]**: [Direction: Send/Receive]
- **[Data 2]**: [Direction: Send/Receive]

### Technical Details
- **Connection**: [How connected]
- **Authentication**: [How authenticated]
- **Format**: [JSON, XML, etc.]

### SLAs
- **Uptime**: [Percentage]
- **Response time**: [Target]
- **Support**: [Contact process]

### Onboarding
- [Steps to integrate]
```

---

## Example: Payment Provider

## [INT-010] Integration: Payment Provider

**Partner**: Stripe
**Related Flow**: SF-010 (Checkout)

### Scope
- **What's included**: Card payments, refunds
- **What's excluded**: ACH transfers, international payments

### Data Exchange
- **Payment intent**: Send (create charge)
- **Payment result**: Receive (success/failure)
- **Refund**: Send (initiate refund)

### Technical Details
- **Connection**: HTTPS API
- **Authentication**: API key
- **Format**: JSON

### SLAs
- **Uptime**: 99.99%
- **Response time**: < 5 seconds
- **Support**: Email support@provider.com

### Onboarding
1. Create account on provider
2. Get API keys
3. Configure webhook
4. Test in sandbox

---

## Completion Checklist

- [ ] Integration scope defined
- [ ] Data exchange documented
- [ ] Technical details specified
- [ ] SLAs defined
- [ ] Onboarding process documented

---

[← Contracts Index](./README.md)