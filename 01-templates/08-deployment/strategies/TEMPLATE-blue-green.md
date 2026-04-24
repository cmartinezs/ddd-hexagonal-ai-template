[← Index](./README.md) | [< Previous](./TEMPLATE-canary.md) | [Next >](./TEMPLATE-recreate.md)

---

# Blue-Green Deployment

Two identical environments. Switch traffic when new version is validated.

## Purpose

Maintain two identical production environments (Blue = current, Green = new). Deploy to Green, validate, then switch traffic atomically.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Mission-critical applications | ✅ |
| Zero-downtime requirements | ✅ |
| Banking/financial systems | ✅ |
| Healthcare applications | ✅ |
| Regulatory compliance needed | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Limited infrastructure budget | ❌ |
| Small teams without ops capacity | ❌ |
| Non-production deployments | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | Very Low |
| **Downtime** | No |
| **Rollback** | Instant |
| **Infrastructure** | 2x |
| **Cost** | High |
| **Complexity** | Medium |

## Process

### Blue-Green Flow

```
┌─────────────┐     ┌─────────────┐
│   BLUE      │────►│   Traffic   │   (Current, live)
│  (current)  │     └─────────────┘
└─────────────┘            │
                          │
┌─────────────┐            │
│   GREEN     │────────────┘   (New, validated)
│   (new)     │           │
└─────────────┘           ▼
                    ┌─────────────┐
                    │  Switch     │
                    │  Traffic    │  (Atomic swap)
                    └─────────────┘
```

### Step 1: Deploy to Green
1. Deploy new version to Green environment
2. Run smoke tests
3. Validate functionality

### Step 2: Validate
1. Run integration tests
2. Check performance metrics
3. Verify data integrity

### Step 3: Switch Traffic
1. Update load balancer
2. Route traffic to Green
3. Monitor for issues

### Step 4: Post-Switch
1. Keep Blue environment idle
2. Monitor for 24h
3. Promote Blue to Green if needed

## Rollback Procedure

### Instant Rollback
1. Switch load balancer back to Blue
2. Traffic restored immediately
3. No data migration needed
4. Analyze issues on Green

## Infrastructure Requirements

### Environment Parity

| Component | Blue | Green |
|-----------|------|-------|
| Compute | ✅ | ✅ |
| Database | Shared | Shared |
| Cache | ✅ | ✅ |
| Storage | ✅ | ✅ |
| Network | ✅ | ✅ |

### Database Considerations

| Approach | Description |
|----------|-------------|
| Shared database | Schema migrations must be backward-compatible |
| Dual databases | Data sync required, more complex |
| Read-only schema | Green reads from Blue during validation |

## Configuration

### Load Balancer Example

```yaml
# AWS ALB routing
resource "aws_lb_listener_rule" "blue_green" {
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
  
  action {
    type               = "forward"
    target_group_arn_1 = aws_lb_target_group.blue.arn
    target_group_arn_2 = aws_lb_target_group.green.arn
  }
}
```

## Pros

- Zero downtime switch
- Instant rollback
- Complete validation before traffic
- No新旧版本共存问题
- Easy compliance verification

## Cons

- 2x infrastructure cost
- Database migration complexity
- Requires environment parity
- Longer initial deployment
- Coordination required

## Checklist

### Pre-Deployment
- [ ] Environment parity verified
- [ ] Database migration strategy defined
- [ ] Rollback procedure documented
- [ ] Monitoring configured

### Deployment
- [ ] Deploy to Green environment
- [ ] Run validation tests
- [ ] Verify metrics
- [ ] Check data integrity

### Traffic Switch
- [ ] Update load balancer
- [ ] Monitor for issues
- [ ] Verify functionality
- [ ] Keep Blue idle

---

[← Index](./README.md) | [< Previous](./TEMPLATE-canary.md) | [Next >](./TEMPLATE-recreate.md)