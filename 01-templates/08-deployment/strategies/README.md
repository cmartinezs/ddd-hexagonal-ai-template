[← Index](../README.md) | [< Anterior](./README.md) | [Siguiente >](./TEMPLATE-all-strategies-fillable.md)

---

# Deployment Strategies

This folder contains deployment strategy templates for selecting and implementing the right release approach.

## When to Use

Choose a strategy based on:

| Factor | Strategy Options |
|--------|-----------------|
| Risk tolerance | Low → Shadow/Blue-Green; High → Big-Bang |
| Downtime allowed | No → Rolling/Canary/Blue-Green; Yes → Big-Bang/Recreate |
| Team size | Small → Big-Bang/Rolling; Large → Blue-Green/Shadow |
| Traffic volume | High → Shadow + Canary; Standard → Rolling |
| Infrastructure cost | Low → Big-Bang; High → Blue-Green/Shadow |

## Strategy Comparison

| Strategy | Risk | Downtime | Rollback | Infrastructure |
|-----------|------|----------|----------|-----------------|
| Big-Bang | High | Yes | Complex | 1x |
| Rolling | Medium | No | Easy | 1x |
| Canary | Low | No | Easy | 1.5x |
| Blue-Green | Very Low | No | Instant | 2x |
| Recreate | High | Yes | Redeploy | 1x |
| Shadow | None | No | N/A | 2x |

## Files in this Folder

### Index
- `README.md` — This file

### Strategy Templates (Individual)

| File | Strategy | Use Case |
|------|----------|----------|
| `TEMPLATE-big-bang.md` | Big-Bang | Non-critical internal apps |
| `TEMPLATE-rolling.md` | Rolling | Most SaaS applications |
| `TEMPLATE-canary.md` | Canary | Critical apps, power users first |
| `TEMPLATE-blue-green.md` | Blue-Green | Zero-risk required systems |
| `TEMPLATE-recreate.md` | Recreate | Non-production only |
| `TEMPLATE-shadow.md` | Shadow | Load testing in production |

### Comprehensive
- `TEMPLATE-all-strategies-fillable.md` — Fillable template with all strategies

---

## Decision Guide

### Step 1: Assess Risk Tolerance
- **Zero tolerance**: Blue-Green
- **Low tolerance**: Canary
- **Medium tolerance**: Rolling
- **High tolerance**: Big-Bang, Recreate

### Step 2: Assess Infrastructure
- **Single environment**: Big-Bang, Recreate
- **Multiple environments**: Rolling, Canary, Blue-Green, Shadow

### Step 3: Assess Traffic
- **High traffic with no risk**: Shadow + Canary
- **Standard traffic**: Any

### Step 4: Choose Strategy
Use the matrix above to select the best strategy for your context.

---

## Related Templates

| Template | Folder |
|----------|--------|
| CI/CD Pipeline | `../` |
| Environments | `../TEMPLATE-032-environments.md` |
| Release Process | `../TEMPLATE-033-release-process.md` |

---

## Tips

1. **Start simple**: Big-Bang or Rolling for teams new to deployment automation
2. **Add feature flags**: Any strategy can be combined with feature flags
3. **Use metrics**: Monitor success at each stage
4. **Automate rollback**: Define automated rollback criteria

---

[← Index](../README.md) | [< Anterior](./README.md) | [Siguiente >](./TEMPLATE-all-strategies-fillable.md)