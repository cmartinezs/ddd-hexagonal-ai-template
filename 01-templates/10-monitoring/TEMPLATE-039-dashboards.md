[← Index](./README.md] | [< Anterior](./TEMPLATE-038-alerts.md) | [Siguiente >](../11-feedback/README.md)

---

# Dashboards

Monitoring and observability dashboards for different audiences.

## Contents

1. [Dashboard Types](#dashboard-types)
2. [Dashboard Structure](#dashboard-structure)
3. [Example Dashboards](#example-dashboards)

---

## Dashboard Types

| Dashboard | Audience | Purpose | Refresh |
|-----------|----------|---------|---------|
| **Executive** | Management | Business metrics | Hourly |
| **Operational** | On-call | System health | Real-time |
| **Application** | Developers | App performance | Real-time |
| **Business** | Product | User behavior | Daily |

---

## Dashboard Structure

### Executive Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                    KEY METRICS                          │
├─────────────────┬─────────────────┬───────────────────┤
│   Total Users   │  Active Today   │   Revenue (MTD)   │
│     12,345     │     2,891       │     $45,230        │
│     ▲ 5.2%     │     ▲ 8.1%      │      ▲ 12.3%      │
└─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────┐
│                     USAGE TRENDS                        │
│                                                         │
│  [Line chart: DAU over time]                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Operational Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                  SYSTEM HEALTH                           │
├─────────────────┬─────────────────┬───────────────────┤
│  API Uptime    │  Error Rate     │   Latency p95     │
│    99.95%      │     0.12%       │      145ms        │
│      ✓         │       ✓         │       ✓           │
└─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    SERVICES                             │
├─────────────────┬─────────────────┬───────────────────┤
│  API Pods      │  Database       │    Cache          │
│  5/5 running  │   Healthy       │    Hit: 94%       │
│       ✓        │       ✓         │       ✓           │
└─────────────────┴─────────────────┴───────────────────┘
```

### Application Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                 APPLICATION PERFORMANCE                  │
├─────────────────┬─────────────────┬───────────────────┤
│  Request Rate   │  Latency p50    │   Latency p99     │
│    450/s        │     45ms        │      180ms        │
└─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    ERROR BREAKDOWN                      │
│                                                         │
│  200: 98.5%  │  400: 1.2%  │  500: 0.3%          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   TOP ENDPOINTS                         │
│  1. POST /api/v1/auth/login    120ms                  │
│  2. GET  /api/v1/users          85ms                   │
│  3. POST /api/v1/users          95ms                   │
└─────────────────────────────────────────────────────────┘
```

---

## Example Dashboards

### Example: Keygo Operations Dashboard

# Operations Dashboard: Keygo

### Key Panels

**Service Health**
- API pods running (target: 5)
- Database connections
- Redis hit rate

**Performance**
- Request rate (requests/second)
- Latency p50, p95, p99
- Error rate

**Resources**
- CPU usage by service
- Memory usage by service
- Disk usage

**Errors**
- Error rate by type
- Recent errors
- Top 5xx endpoints

---

### Example: Keygo Business Dashboard

# Business Dashboard: Keygo

### Key Panels

**Growth**
- Daily active users
- New signups
- Organizations created

**Engagement**
- DAU/MAU ratio
- Feature adoption
- API usage

**Revenue**
- MRR
- New subscriptions
- Churn rate

---

## Tools

| Tool | Use Case |
|------|----------|
| **Grafana** | Dashboards and visualization |
| **DataDog** | APM + dashboards |
| **CloudWatch** | AWS monitoring |
| **PagerDuty** | On-call and alerts |

---

## Completion Checklist

### Deliverables

- [ ] Executive dashboard created
- [ ] Operations dashboard created
- [ ] Application dashboard created
- [ ] Business dashboard created
- [ ] Dashboards shared with stakeholders

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [SRE Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Know your audience**: Different people need different data
2. **Keep it simple**: Don't overwhelm with data
3. **Highlight issues**: Make problems visible
4. **Update regularly**: Data should be fresh

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-038-alerts.md) | [Siguiente >](../11-feedback/README.md)
