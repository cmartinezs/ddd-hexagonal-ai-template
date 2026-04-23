[← Index](./README.md] | [< Anterior](./TEMPLATE-035-incident-response.md) | [Siguiente >](../10-monitoring/README.md)

---

# SLA

Service Level Agreements defining uptime, response times, and support commitments.

## Contents

1. [SLA Overview](#sla-overview)
2. [Uptime Targets](#uptime-targets)
3. [Performance Targets](#performance-targets)
4. [Support Commitments](#support-commitments)

---

## SLA Overview

### SLA Structure

| Tier | Uptime | Support Level | Price |
|------|--------|----------------|-------|
| **Free** | 99.5% | Community | $0 |
| **Pro** | 99.9% | Email | $29/mo |
| **Enterprise** | 99.99% | 24/7 Phone | Custom |

---

## Uptime Targets

### Monthly Uptime Calculation

```
Uptime % = ((Total Minutes - Downtime) / Total Minutes) * 100
```

### Target by Tier

| Tier | Monthly Downtime | Annual Downtime |
|------|------------------|-----------------|
| **99.5%** | 3.6 hours | 43.8 hours |
| **99.9%** | 43.8 minutes | 8.76 hours |
| **99.99%** | 4.38 minutes | 52.6 minutes |

### Exclusions
- Scheduled maintenance (with notice)
- Force majeure
- Third-party service failures

---

## Performance Targets

### API Response Times

| Metric | Target | Enterprise |
|--------|--------|------------|
| **p50** | < 100ms | < 50ms |
| **p95** | < 200ms | < 100ms |
| **p99** | < 500ms | < 200ms |

### Availability

| Metric | Target |
|--------|--------|
| **API Uptime** | 99.9% |
| **Dashboard** | 99.9% |
| **Auth Service** | 99.99% |

### Throughput

| Metric | Target |
|--------|--------|
| **Requests/sec** | 1,000 |
| **Concurrent users** | 10,000 |

---

## Support Commitments

### Response Times

| Severity | Response Time | Resolution Target |
|----------|---------------|-------------------|
| **P1 (Critical)** | 15 minutes | 4 hours |
| **P2 (High)** | 1 hour | 8 hours |
| **P3 (Medium)** | 4 hours | 3 business days |
| **P4 (Low)** | 1 business day | Next release |

### Support Channels

| Tier | Email | Chat | Phone | Hours |
|------|-------|------|-------|-------|
| **Free** | ✓ | - | - | Business |
| **Pro** | ✓ | ✓ | - | Business |
| **Enterprise** | ✓ | ✓ | ✓ | 24/7 |

---

## Credits and Remedies

### Service Credit Schedule

| Downtime | Credit |
|----------|---------|
| < 30 minutes | 0% |
| 30 min - 2 hours | 10% |
| 2 - 6 hours | 25% |
| 6 - 24 hours | 50% |
| > 24 hours | 100% |

### Limitations
- Maximum credit: 30% of monthly fee
- Excludes scheduled maintenance

---

## Example SLA

### Example: Keygo Platform

# SLA: Keygo Authentication Platform

### Uptime Commitment
- **Standard**: 99.9% monthly uptime
- **Enterprise**: 99.99% monthly uptime

### Performance
- **API Latency**: p95 < 200ms
- **Authentication**: < 100ms

### Support
- **Standard**: Email, business hours
- **Enterprise**: 24/7 phone + email

### Remedies
- Service credits for missed SLA
- Maximum 30% monthly credit

---

## Completion Checklist

### Deliverables

- [ ] SLA tiers defined
- [ ] Uptime targets set
- [ ] Performance targets set
- [ ] Support commitments documented
- [ ] Credit schedule defined

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product, Date]
- [ ] Approved by: [Executive, Date]

---

## Tips

1. **Be realistic**: Don't overcommit
2. **Communicate**: Make SLA visible
3. **Monitor**: Track SLA compliance
4. **Review**: Update as needed

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-035-incident-response.md) | [Siguiente >](../10-monitoring/README.md)
