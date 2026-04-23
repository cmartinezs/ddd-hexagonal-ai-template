[← Index](./README.md) | [< Anterior](./TEMPLATE-recreate.md) | [Siguiente >](./README.md)

---

# Shadow Deployment

Deploy to parallel environment, mirror production traffic.

## Purpose

Run new version alongside production without serving live traffic. Mirror production requests to both versions and compare outputs.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Load testing in production | ✅ |
| Performance benchmarking | ✅ |
| High-risk changes | ✅ |
| New infrastructure testing | ✅ |
| Regression detection | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Small teams | ❌ |
| Limited infrastructure | ❌ |
| Non-performance changes | ❌ |
| Quick deployments | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | None |
| **Downtime** | No |
| **Rollback** | N/A |
| **Infrastructure** | 2x |
| **Cost** | High |
| **Complexity** | High |

## Process

### Shadow Flow

```
┌──────────────────┐
│  Production      │
│  Traffic        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ LIVE  │ │SHADOW │   (Both receive same requests)
│(prod) │ │(new)  │
└───┬───┘ └───┬───┘
    │         │
    │    Compare responses
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│Serve  │ │ No    │   (Shadow: no user impact)
│User   │ │serve  │
└───────┘ └───────┘
```

### Step 1: Deploy Shadow
1. Deploy new version to shadow environment
2. Configure traffic mirroring
3. Start collecting metrics

### Step 2: Run in Shadow
1. Mirror production traffic
2. Compare responses
3. Measure performance delta

### Step 3: Analyze
1. Compare error rates
2. Compare latencies
3. Verify output correctness
4. Decide on production rollout

## Traffic Mirroring

### By Request Type

| Type | Mirror Percentage |
|------|-------------------|
| All requests | 100% |
| Read-only | 100% |
| POST/PUT | 10% |
| Critical paths | 100% |

### Configuration

#### Istio Traffic Mirror

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: app
spec:
  http:
    - route:
        - destination:
            host: app-prod
          weight: 100
      mirrors:
        - destination:
            host: app-shadow
          percentage:
            value: 100
```

## Metrics Comparison

### Key Metrics

| Metric | Live | Shadow | Delta Acceptable |
|--------|------|--------|----------------|
| Error rate | 0.1% | 0.1% | < 0.5% |
| P95 latency | 200ms | 250ms | < 50ms |
| CPU usage | 50% | 55% | < 20% |
| Memory | 1GB | 1.1GB | < 20% |

### Success Criteria

| Condition | Action |
|-----------|--------|
| Error rate same or better | Approve |
| Latency within threshold | Approve |
| Output differences found | Investigate |
| Errors in shadow only | Rollback |

## Pros

- Zero user risk
- Real production load testing
- Performance baseline comparison
- Output validation
- No user impact during testing

## Cons

- High infrastructure cost
- Complex setup
- No actual user validation
- Requires traffic mirroring
- Longer time to decision

## Checklist

### Pre-Deployment
- [ ] Shadow environment configured
- [ ] Traffic mirroring set up
- [ ] Metrics comparison defined
- [ ] Success criteria documented

### Shadow Run
- [ ] Traffic mirrored
- [ ] Metrics collected
- [ ] Responses compared
- [ ] Performance measured

### Post-Analysis
- [ ] Results analyzed
- [ ] Decision documented
- [ ] Cleanup scheduled
- [ ] Production rollout planned

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-recreate.md) | [Siguiente >](./README.md)