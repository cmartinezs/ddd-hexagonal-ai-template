[← Index](./README.md) | [< Anterior](./TEMPLATE-big-bang.md) | [Siguiente >](./TEMPLATE-canary.md)

---

# Rolling Deployment

Gradual replacement of instances with the new version.

## Purpose

Deploy new version incrementally to existing infrastructure, replacing instances one by one or in small groups.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Standard SaaS applications | ✅ |
| Kubernetes clusters | ✅ |
| Systems with multiple instances | ✅ |
| Incremental feature rollouts | ✅ |
| Teams with DevOps experience | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Single-instance applications | ❌ |
| Zero-downtime requirements | ❌ |
| Databases requiring schema changes | ❌ |
| Applications with shared state | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | Medium |
| **Downtime** | No |
| **Rollback** | Easy |
| **Infrastructure** | 1x |
| **Cost** | Low |
| **Complexity** | Medium |

## Process

### Phased Rollout

```
Phase 1: 10% of instances → Phase 2: 25% → Phase 3: 50% → Phase 4: 100%
```

### Step 1: Initial Phase
1. Deploy to 10% of instances
2. Monitor application metrics
3. Verify functionality
4. Check error rates

### Step 2: Expansion
1. Deploy to 25% of instances
2. Monitor longer window
3. Collect user feedback
4. Check performance

### Step 3: Full Rollout
1. Deploy to all instances
2. Complete validation
3. Monitor for 24h
4. Archive previous version

## Rollback Procedure

### If Issues Detected
1. Stop rollout at current phase
2. Keep previous version on remaining instances
3. Re-deploy to affected instances
4. Verify recovered state

## Configuration

### Kubernetes Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2
      maxUnavailable: 1
```

### Parameters

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| maxSurge | Additional replicas during update | 1-2 |
| maxUnavailable | Unavailable replicas during update | 1 |
| waitTimeBetween | Time between phases | 5-15 min |

## Pros

- No downtime
- Early issue detection
- Easy rollback per phase
- Low infrastructure cost
- Gradual user exposure

## Cons

- More complex than big-bang
-新旧版本共存可能导致兼容性问题
- Longer deployment time
- Requires multiple instances
- State management complexity

## Checklist

### Pre-Deployment
- [ ] Define phase percentages
- [ ] Configure health checks
- [ ] Set up monitoring per phase
- [ ] Prepare rollback triggers

### During Rollout
- [ ] Monitor each phase
- [ ] Check metrics at each milestone
- [ ] Collect feedback
- [ ] Document issues

### Post-Deployment
- [ ] Verify all instances
- [ ] Archive previous version
- [ ] Monitor for 24h
- [ ] Update documentation

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-big-bang.md) | [Siguiente >](./TEMPLATE-canary.md)