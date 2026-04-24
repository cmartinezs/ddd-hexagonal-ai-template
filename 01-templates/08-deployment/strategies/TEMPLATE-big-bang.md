[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-rolling.md)

---

# Big-Bang Deployment

Deploy all changes at once, affecting all users simultaneously.

## Purpose

Simultaneous deployment to entire infrastructure with potential downtime during the transition.

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Non-critical internal applications | ✅ |
| Small applications with small user base | ✅ |
| Limited infrastructure budget | ✅ |
| First deployment of a new system | ✅ |
| Emergency hotfixes with no staging | ✅ |

## When NOT to Use

| Scenario | Not Recommended |
|----------|----------------|
| Mission-critical applications | ❌ |
| User-facing SaaS products | ❌ |
| Systems requiring zero downtime | ❌ |
| Applications with high traffic | ❌ |

## Overview

| Aspect | Value |
|--------|-------|
| **Risk** | High |
| **Downtime** | Yes |
| **Rollback** | Complex |
| **Infrastructure** | 1x |
| **Cost** | Low |
| **Complexity** | Low |

## Process

### Step 1: Pre-Deployment
1. Notify users of downtime window
2. Create full backup
3. Document current state
4. Prepare rollback plan

### Step 2: Deployment
1. Stop application
2. Run database migrations
3. Deploy new version
4. Run smoke tests

### Step 3: Post-Deployment
1. Verify all services
2. Monitor metrics
3. Notify users of completion
4. Document deployment time

## Rollback Procedure

### If Issues Detected
1. Identify issue scope
2. Deploy previous version
3. Restore from backup if needed
4. Analyze root cause

## Example Timeline

| Phase | Duration | Example |
|-------|----------|---------|
| Notification | 24h before | Email to users |
| Backup | 30 min | pg_dump |
| Migration | 5-15 min | Flyway |
| Deploy | 2-5 min | Docker pull |
| Verification | 10 min | Health checks |
| **Total** | **~60 min** | |

## Pros

- Simple to implement
- Low infrastructure cost
- Quick initial deployment
- Easy to understand
- No environment synchronization

## Cons

- Potential data loss during downtime
- All users affected by issues
- Difficult to rollback
- No gradual validation
- User impact is immediate

## Checklist

### Pre-Deployment
- [ ] Users notified
- [ ] Backup created
- [ ] Rollback plan documented
- [ ] Communication prepared

### Deployment
- [ ] Application stopped
- [ ] Migrations run
- [ ] New version deployed
- [ ] Smoke tests passed

### Post-Deployment
- [ ] Services verified
- [ ] Metrics monitored
- [ ] Users notified
- [ ] Deployment logged

---

[← Index](./README.md) | [< Previous] | [Next >](./TEMPLATE-rolling.md)