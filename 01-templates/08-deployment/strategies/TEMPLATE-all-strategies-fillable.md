[← Index](./README.md) | [< Anterior](./README.md) | [Siguiente >]

---

# Deployment Strategy — Fillable Template

Complete template for selecting and documenting deployment strategy.

> Use this template when you need to choose and document a specific deployment strategy for your project.

---

## 1. Strategy Selection

### 1.1 Assessment

Complete this matrix to determine the best strategy:

| Factor | Your Context | Notes |
|--------|-------------|-------|
| **Criticality** | | |
| User-facing? | [Yes/No] | |
| Revenue-impacting? | [Yes/No] | |
| Data-sensitive? | [Yes/No] | |
| **Infrastructure** | | |
| Available environments | [1/2/many] | |
| Container orchestration | [None/K8s/Other] | |
| Load balancer available? | [Yes/No] | |
| **Team** | | |
| DevOps experience | [Low/Medium/High] | |
| Team size | [1-5/5-15/15+] | |
| On-call capacity | [24/7/Weekdays] | |
| **Risk** | | |
| Downtime tolerance | [None/Short/Long] | |
| Data loss tolerance | [None/Short/Long] | |
| Rollback urgency | [Immediate/1h/24h] | |

### 1.2 Strategy Recommendation

Based on assessment above, recommended strategy:

| Recommendation | Strategy |
|--------------|----------|
| **If Criticality = High** | Blue-Green / Canary |
| **If Criticality = Medium** | Canary / Rolling |
| **If Criticality = Low** | Rolling / Big-Bang |
| **If Infrastructure = 1** | Big-Bang / Recreate |
| **If Infrastructure = 2+** | Any strategy |
| **If Team = Small** | Big-Bang / Rolling |
| **If Team = Large** | Blue-Green / Shadow |

**Selected Strategy**: [_________________]

---

## 2. Strategy Details

### 2.1 Big-Bang Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | High |
| **Downtime** | Yes |
| **Rollback** | Complex |
| **Infrastructure** | 1x |
| **Use Cases** | |
| Non-critical internal apps | [ ] |
| Small applications | [ ] |
| Limited infrastructure | [ ] |
| First deployment | [ ] |

**Timeline**:
| Phase | Duration | Notes |
|-------|----------|-------|
| Notification | | |
| Backup | | |
| Migration | | |
| Deploy | | |
| Verification | | |

**Rollback Procedure**:
1. 
2. 
3. 

### 2.2 Rolling Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | Medium |
| **Downtime** | No |
| **Rollback** | Easy |
| **Infrastructure** | 1x |
| **Use Cases** | |
| Standard SaaS | [ ] |
| Kubernetes | [ ] |
| Multiple instances | [ ] |

**Phases**:
| Phase | Percentage | Duration | Criteria |
|-------|------------|----------|----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Configuration**:
| Parameter | Value |
|-----------|-------|
| maxSurge | |
| maxUnavailable | |
| waitTimeBetween | |

### 2.3 Canary Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | Low |
| **Downtime** | No |
| **Rollback** | Easy |
| **Infrastructure** | 1.5x |
| **Use Cases** | |
| Critical apps | [ ] |
| Power users first | [ ] |
| Data-driven | [ ] |

**User Segments**:
| Segment | Percentage | Criteria |
|---------|------------|----------|
| | | |
| | | |
| | | |

**Metrics**:
| Metric | Continue | Rollback |
|--------|----------|----------|
| Error rate | < % | > % |
| P95 latency | < ms | > ms |
| Conversion | No drop | < % drop |
| Support | No spike | > x baseline |

### 2.4 Blue-Green Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | Very Low |
| **Downtime** | No |
| **Rollback** | Instant |
| **Infrastructure** | 2x |
| **Use Cases** | |
| Mission critical | [ ] |
| Zero downtime | [ ] |
| Compliance | [ ] |

**Environment Setup**:
| Component | Blue | Green |
|-----------|------|-------|
| Compute | | |
| Database | | Shared |
| Cache | | |
| Storage | | |

**Switch Procedure**:
1. 
2. 
3. 

**Rollback Procedure** (instant):
1. 
2. 

### 2.5 Recreate Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | High |
| **Downtime** | Yes |
| **Rollback** | Redeploy |
| **Infrastructure** | 1x |
| **Use Cases** | |
| Non-production only | [ ] |
| Development | [ ] |
| Testing | [ ] |

**Process**:
| Phase | Action | Duration |
|-------|--------|----------|
| 1 | Terminate | |
| 2 | Deploy | |
| 3 | Verify | |

### 2.6 Shadow Deployment

| Field | Value |
|-------|-------|
| **Risk Level** | None |
| **Downtime** | No |
| **Rollback** | N/A |
| **Infrastructure** | 2x |
| **Use Cases** | |
| Load testing | [ ] |
| Performance | [ ] |
| High-risk | [ ] |

**Mirroring**:
| Type | Percentage |
|------|------------|
| All requests | % |
| Read-only | % |

**Comparison**:
| Metric | Live | Shadow | Threshold |
|--------|------|--------|-----------|
| Error rate | | | < delta |
| P95 latency | | | < delta |
| CPU | | | < delta |

---

## 3. Pre-Deployment Checklist

- [ ] Strategy selected and approved
- [ ] Infrastructure ready
- [ ] Monitoring configured
- [ ] Rollback procedure documented
- [ ] Communication plan prepared
- [ ] Team notified
- [ ] Backup created (if applicable)
- [ ] Migration strategy defined

---

## 4. During Deployment

**Current Phase**: 
**Start Time**: 
**Status**: 

### Log

| Time | Event | Action | Result |
|------|-------|--------|--------|
| | | | |

---

## 5. Post-Deployment Checklist

- [ ] All tests passed
- [ ] Metrics within thresholds
- [ ] Rollback procedure tested
- [ ] Documentation updated
- [ ] Stakeholders notified
- [ ] Deployment logged

---

## 6. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Prepared by | | | |
| Reviewed by | | | |
| Approved by | | | |

---

[← Index](./README.md) | [< Anterior](./README.md)