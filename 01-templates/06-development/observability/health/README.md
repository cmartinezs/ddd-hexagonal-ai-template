[← Index](../README.md) | [< Anterior ../traces/README.md)

---

# Health Checks

## Description

Health checks for orchestrators: liveness, readiness.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Kubernetes | ✅ |
| Container orchestration | ✅ |
| Load balancer checks | ✅ |
| Local development | Minimal |

---

## Check Types

| Check | Purpose | When |
|-------|---------|------|
| **Liveness** | Is app running? | Always |
| **Readiness** | Can handle traffic? | Dependencies up |
| **Startup** | Finished startup? | During startup |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-health.md` — Health check template

---

[← Index ../README.md) | [< Anterior ../traces/README.md)