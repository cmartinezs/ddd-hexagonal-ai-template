[← Index ./README.md)

---

# Deployment Strategy Template

## Purpose

Template for defining deployment strategy including canary, blue-green, rolling, and other strategies.

> **Note**: This is a template. Choose strategy based on risk tolerance and infrastructure.

---

## Deployment Strategies

### 1. Big-Bang Deployment

Deploy all changes at once, affecting all users simultaneously.

| Aspect | Description |
|--------|-------------|
| **Risk** | High |
| **Downtime** | Yes |
| **Rollback** | Complex |
| **When to use** | Small, non-critical apps |

### 2. Rolling (Incremental) Deployment

Gradual rollout to increasing percentage of users.

```
10% → 25% → 50% → 100%
```

| Aspect | Description |
|--------|-------------|
| **Risk** | Medium |
| **Downtime** | No |
| **Rollback** | Easy |
| **When to use** | Most applications |

### 3. Canary Deployment

Target small subset of users first (like "power users").

```
1% → 5% → 10% → 100%
```

| Aspect | Description |
|--------|-------------|
| **Risk** | Low |
| **Downtime** | No |
| **Rollback** | Easy |
| **When to use** | Critical apps, real user feedback |

### 4. Blue/Green Deployment

Two identical environments. Switch traffic when green is validated.

```
Blue (current) ← traffic → Green (new)
```

| Aspect | Description |
|--------|-------------|
| **Risk** | Very Low |
| **Downtime** | No |
| **Rollback** | Instant |
| **When to use** | Zero-risk required |

### 5. Recreate Deployment

Terminate old version, deploy new version.

| Aspect | Description |
|--------|-------------|
| **Risk** | High |
| **Downtime** | Yes |
| **Rollback** | Redeploy old |
| **When to use** | Non-production only |

### 6. Shadow Deployment

Deploy to parallel environment, mirror production traffic.

| Aspect | Description |
|--------|-------------|
| **Risk** | None |
| **Downtime** | No |
| **Rollback** | N/A |
| **When to use** | Load testing in production |

---

## Choosing Strategy

### By Application

| Application Type | Recommended Strategy |
|-----------------|-------------------|
| Non-critical, internal | Big-bang |
| Standard SaaS | Rolling, Canary |
| Mission critical | Blue/Green |
| High-traffic | Shadow + Canary |

### By Team Capability

| Team Size | Strategy |
|----------|----------|
| Small | Big-bang, Rolling |
| Medium | Rolling, Canary |
| Large | Blue/Green, Shadow |

---

## Feature Flags Integration

Feature flags can enhance any strategy:

| Without Flags | With Flags |
|--------------|-----------|
| Deploy = Release | Deploy before Release |
| Rollback entire app | Toggle single feature |
| All-or-nothing | Gradual rollout |

---

[← Index ./README.md)