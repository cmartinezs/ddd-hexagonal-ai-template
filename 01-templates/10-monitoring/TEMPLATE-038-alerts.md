[← Index](./README.md] | [< Anterior](./TEMPLATE-037-metrics.md) | [Siguiente >](./TEMPLATE-039-dashboards.md)

---

# Alerts

Alert rules, thresholds, and escalation procedures.

## Contents

1. [Alert Principles](#alert-principles)
2. [Alert Rules](#alert-rules)
3. [Alert Configuration](#alert-configuration)
4. [Escalation](#escalation)

---

## Alert Principles

| Principle | Description |
|-----------|-------------|
| **Actionable** | Every alert requires action |
| **No noise** | Avoid alert fatigue |
| **Clear** | Know what to do |
| **Timely** | Alert before it's too late |

### Alert Severity

| Level | Meaning | Response | Example |
|-------|---------|----------|---------|
| **Critical** | Immediate action needed | Page on-call | Service down |
| **High** | Urgent, same day | Page on-call | Error rate > 5% |
| **Warning** | Attention needed | Ticket | Disk > 70% |
| **Info** | FYI only | None | Deploy complete |

---

## Alert Rules

### System Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| **CPU High** | cpu > 80% for 5 min | Warning | Create ticket |
| **CPU Critical** | cpu > 90% for 2 min | Critical | Page on-call |
| **Memory High** | memory > 85% for 5 min | Warning | Create ticket |
| **Memory Critical** | memory > 95% for 2 min | Critical | Page on-call |
| **Disk Full** | disk > 90% | Critical | Page on-call |
| **Disk Warning** | disk > 80% | Warning | Create ticket |

### Application Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| **Error Rate High** | errors > 1% for 5 min | High | Page on-call |
| **Error Rate Critical** | errors > 5% for 2 min | Critical | Page on-call |
| **Latency High** | p95 > 500ms for 5 min | Warning | Create ticket |
| **Latency Critical** | p95 > 1s for 2 min | High | Page on-call |
| **5xx Errors** | any 5xx for 2 min | High | Page on-call |
| **Service Down** | health check fails | Critical | Page on-call |

### Business Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| **Login Failures** | failures > 10% | High | Page on-call |
| **Signups Stopped** | 0 signups for 24h | Warning | Ticket |
| **High Support** | tickets > threshold | Warning | Ticket |

---

## Alert Configuration

### Prometheus Alert Example

```yaml
groups:
- name: application
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.01
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }}% for {{ $labels.service }}"

  - alert: HighLatency
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High latency detected"
      description: "p95 latency is {{ $value }}s"
```

---

## Escalation

### Escalation Path

| Severity | First Contact | Escalate To | After |
|----------|---------------|-------------|-------|
| Critical | On-call engineer (15 min) | Team lead (30 min) | No response |
| High | On-call engineer (1 hr) | Team lead (2 hr) | No response |
| Warning | Ticket (24 hr) | Team lead (48 hr) | No response |

### On-Call Rotation

| Shift | Days | Hours |
|-------|------|-------|
| **Primary** | Mon-Sun | 24/7 |
| **Secondary** | Mon-Sun | 24/7 |
| **Manager** | Mon-Fri | Business |

---

## Example Alert Configuration

### Example: Keygo Platform

# Alert Configuration: Keygo

### Critical Alerts
- Service down → Page immediately
- Error rate > 5% → Page immediately
- Database down → Page immediately

### High Alerts
- Error rate > 1% → Page within 15 min
- Latency p95 > 1s → Page within 30 min

### Warning Alerts
- Disk > 80% → Ticket
- Error rate > 0.5% → Ticket

---

## Completion Checklist

### Deliverables

- [ ] Alert rules defined
- [ ] Thresholds configured
- [ ] Escalation paths set
- [ ] On-call rotation established
- [ ] Alert system configured

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [SRE Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Avoid noise**: Only alert on actionable issues
2. **Set proper thresholds**: Don't alert on normal variation
3. **Test alerts**: Verify they work
4. **Review regularly**: Tune as needed

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-037-metrics.md) | [Siguiente >](./TEMPLATE-039-dashboards.md)
