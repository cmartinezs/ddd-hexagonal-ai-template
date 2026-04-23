[← Index](./README.md) | [< Anterior](./TEMPLATE-blue-green.md) | [Siguiente >](./TEMPLATE-shadow.md)

---

# Recreate Deployment

Terminate old version, deploy new version.

## Purpose

Complete infrastructure wipe and redeploy. Downtime required during deployment.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Non-production environments | ✅ |
| Development environments | ✅ |
| Testing environments | ✅ |
| DevOps learning | ✅ |
| Quick prototyping | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Production environments | ❌ |
| User-facing systems | ❌ |
| Mission-critical applications | ❌ |
| High-availability requirements | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | High |
| **Downtime** | Yes |
| **Rollback** | Redeploy |
| **Infrastructure** | 1x |
| **Cost** | Low |
| **Complexity** | Low |

## Process

### Recreate Flow

```
┌─────────────┐
│  Current    │      Phase 1: Terminate
│  Version    │ ───────────────────►
└─────────────┘      (Stop all instances)
                          │
                          ▼
┌─────────────┐
│   Deploy    │      Phase 2: Deploy
│   New      │ ───────────────────►
└─────────────┘      (Deploy new version)
                          │
                          ▼
┌─────────────┐
│  Verify     │      Phase 3: Verify
│  Success    │ ───────────────────►
└─────────────┘      (Smoke tests)
```

### Step 1: Terminate
1. Stop all running instances
2. Ensure no active connections
3. Backup current state if needed

### Step 2: Deploy
1. Deploy new version
2. Run migrations
3. Start services

### Step 3: Verify
1. Run smoke tests
2. Verify functionality
3. Monitor logs

## Configuration

### Docker Compose Example

```yaml
version: '3'
services:
  app:
    image: app:latest
    deploy:
      mode: recreate
```

### Kubernetes Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 5
  strategy:
    type: Recreate
```

## Pros

- Simple to implement
- No新旧版本共存问题
- Low infrastructure cost
- Clean start
- Easy to understand

## Cons

- Downtime required
- No rollback without redeploy
- Data loss risk if not backed up
- All users affected
- No gradual validation

## Checklist

### Pre-Deployment
- [ ] Backup created
- [ ] Users notified of downtime
- [ ] Rollback plan documented
- [ ] Communication prepared

### Deployment
- [ ] Terminate old version
- [ ] Deploy new version
- [ ] Run migrations
- [ ] Run smoke tests

### Post-Deployment
- [ ] Verify all services
- [ ] Monitor metrics
- [ ] Users notified
- [ ] Document deployment

---

[← Index](./README.md) | [< Anterior](./TEMPLATE-blue-green.md) | [Siguiente >](./TEMPLATE-shadow.md)