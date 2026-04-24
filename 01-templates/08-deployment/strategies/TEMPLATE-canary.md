[← Index](./README.md) | [< Previous](./TEMPLATE-rolling.md) | [Next >](./TEMPLATE-blue-green.md)

---

# Canary Deployment

Deploy to a small subset of users first to validate before full rollout.

## Purpose

Release new version to a small group of users (canary) before general availability, using real traffic to validate.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Critical production applications | ✅ |
| New features with uncertain impact | ✅ |
| Power user validation | ✅ |
| Data-driven feature decisions | ✅ |
| A/B testing integration | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Non-production environments | ❌ |
| Security or critical patches | ❌ |
| Very small user base | ❌ |
| No infrastructure for routing | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | Low |
| **Downtime** | No |
| **Rollback** | Easy |
| **Infrastructure** | 1.5x |
| **Cost** | Medium |
| **Complexity** | Medium-High |

## Process

### Canary Flow

```
1% → 5% → 10% → 25% → 50% → 100%
     │    │    │    │    │
     ▼    ▼    ▼    ▼    ▼
  Monitor Metrics at Each Phase
```

### Step 1: Initial Canary (1%)
1. Deploy new version to canary environment
2. Route 1% of traffic
3. Monitor key metrics:
   - Error rate
   - Latency
   - Conversion
   - User feedback

### Step 2: Expanded Canary (5-10%)
1. Expand to 5-10% if phase 1 passes
2. Monitor same metrics
3. Collect user feedback
4. Check for regressions

### Step 3: General Rollout
1. Expand to 50%, then 100%
2. Continue monitoring
3. Archive canary version

## Routing Strategies

### By User Segment

| Segment | Percentage |
|---------|------------|
| Power users | 1% |
| Beta testers | 5% |
| Free tier | 10% |
| Paid tier | 25% |
| All users | 100% |

### By Attribute

| Attribute | Routing |
|-----------|--------|
| User ID (hash) | Deterministic |
| Geographic region | Geography-based |
| Device type | Device-based |
| Account age | Age-based |

## Metrics to Monitor

### Success Criteria

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | < 1% | Continue |
| P95 latency | < 500ms | Continue |
| Conversion rate | No drop | Continue |
| Support tickets | No spike | Continue |

### Rollback Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 5% | Rollback |
| P95 latency | > 2s | Rollback |
| Crash rate | > 1% | Rollback |
| Support tickets | > 10x | Rollback |

## Configuration

### Service Mesh Example (Istio)

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: app
spec:
  http:
    - route:
        - destination:
            host: app-v1
          weight: 90
        - destination:
            host: app-v2
          weight: 10
```

## Pros

- Real traffic validation
- Early issue detection
- User feedback before full rollout
- Data-driven decisions
- Low risk per phase

## Cons

- Requires traffic routing capability
-新旧版本共存可能导致兼容性问题
- More complex setup
- Longer total deployment time
- Metrics infrastructure needed

## Checklist

### Pre-Deployment
- [ ] Define canary percentage
- [ ] Configure traffic routing
- [ ] Set up metrics collection
- [ ] Define rollback criteria

### During Canary
- [ ] Monitor error rate
- [ ] Monitor latency
- [ ] Monitor business metrics
- [ ] Collect user feedback

### Post-Deployment
- [ ] Verify canary success
- [ ] Expand or rollback
- [ ] Document findings
- [ ] Archive canary version

---

[← Index](./README.md) | [< Previous](./TEMPLATE-rolling.md) | [Next >](./TEMPLATE-blue-green.md)