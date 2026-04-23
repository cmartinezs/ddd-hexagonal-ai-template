[← Index](./README.md] | [< Anterior] | [Siguiente >](./TEMPLATE-038-alerts.md)

---

# Metrics

Key metrics and KPIs to track system health and business performance.

## Contents

1. [Metric Categories](#metric-categories)
2. [System Metrics](#system-metrics)
3. [Application Metrics](#application-metrics)
4. [Business Metrics](#business-metrics)
5. [SLI/SLO](#slislo)

---

## Metric Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **System** | Infrastructure health | CPU, memory, disk |
| **Application** | App performance | Latency, errors |
| **Business** | User behavior | DAU, conversions |
| **SLI/SLO** | Service objectives | Uptime, error rate |

---

## System Metrics

### Infrastructure

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **CPU Usage** | Percentage of CPU used | < 60% | > 80% |
| **Memory Usage** | Percentage of RAM used | < 70% | > 85% |
| **Disk Usage** | Percentage of disk used | < 60% | > 80% |
| **Disk I/O** | Read/write operations | < 70% | > 90% |
| **Network In/Out** | Network throughput | Variable | > 80% |
| **Connection Count** | Database connections | < 70% pool | > 90% |

### Container Metrics

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **Pod Count** | Running replicas | Expected | < Expected |
| **Restart Count** | Container restarts | 0 | > 5 |
| **OOM Kills** | Out of memory kills | 0 | > 0 |

---

## Application Metrics

### Performance

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **Request Rate** | Requests per second | Baseline | > 2x |
| **Error Rate** | Percentage of 5xx errors | < 0.1% | > 1% |
| **Latency p50** | Median response time | < 100ms | > 200ms |
| **Latency p95** | 95th percentile | < 200ms | > 500ms |
| **Latency p99** | 99th percentile | < 500ms | > 1s |

### Application-Specific

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **Login Rate** | Logins per minute | Baseline | > 2x |
| **Auth Failures** | Failed auth attempts | < 1% | > 5% |
| **Active Sessions** | Concurrent users | Baseline | < Expected |
| **API Rate Limited** | Rate-limited requests | < 1% | > 5% |

---

## Business Metrics

### User Metrics

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **DAU** | Daily active users | Growth | < Previous |
| **MAU** | Monthly active users | Growth | < Previous |
| **Signups** | New user registrations | Growth | < Expected |
| **Retention** | User retention rate | > 70% | < 50% |

### Usage Metrics

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| **API Calls** | Total API requests | Growth | - |
| **Feature Usage** | Feature adoption | Growth | - |
| **Support Tickets** | Support volume | < Threshold | > Threshold |

---

## SLI/SLO

### Service Level Indicators

| SLI | Description | Measurement |
|-----|-------------|--------------|
| **Availability** | Successful requests / Total | HTTP 2xx / Total |
| **Latency** | Fast requests / Total | < 200ms / Total |
| **Quality** | Error-free requests | HTTP 2xx / Total |

### Service Level Objectives

| SLO | Target | Error Budget |
|-----|--------|---------------|
| **Availability** | 99.9% | 0.1% / month |
| **Latency** | 99% < 200ms | 1% / month |
| **Quality** | 99.9% | 0.1% / month |

### Error Budget Calculation

```
Monthly Error Budget = (1 - SLO) * Minutes in Month

99.9% SLO = 0.1% * 43,200 min = 43 minutes downtime/month
```

---

## Example Metrics

### Example: Keygo Platform

# Metrics: Keygo Authentication Platform

### System
- CPU: < 60%, alert > 80%
- Memory: < 70%, alert > 85%
- Disk: < 60%, alert > 80%

### Application
- API Latency p95: < 200ms, alert > 500ms
- Error Rate: < 0.1%, alert > 1%
- Login Latency: < 100ms, alert > 200ms

### Business
- Daily Active Tenants: Track growth
- Failed Logins: < 5%, alert > 10%

### SLOs
- Availability: 99.9%
- Auth Latency: < 100ms

---

## Completion Checklist

### Deliverables

- [ ] System metrics defined
- [ ] Application metrics defined
- [ ] Business metrics defined
- [ ] SLI/SLO established
- [ ] Targets and alerts set

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [SRE Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Measure what matters**: Focus on actionable metrics
2. **Set baselines**: Know what's normal
3. **Alert on trends**: Don't wait for failure
4. **Review regularly**: Update as system evolves

---

[← Index](./README.md] | [< Anterior] | [Siguiente >](./TEMPLATE-038-alerts.md)
