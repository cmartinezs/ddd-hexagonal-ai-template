[← Index](./README.md] | [< Anterior] | [Siguiente >](./TEMPLATE-035-incident-response.md)

---

# Runbooks

Step-by-step procedures for common operational tasks.

## Contents

1. [Runbook Format](#runbook-format)
2. [Common Runbooks](#common-runbooks)
3. [Troubleshooting](#troubleshooting)

---

## Runbook Format

```markdown
## Runbook: [Title]

**When to use**: [Situation that triggers this runbook]

**Impact**: [What this operation affects]

**Prerequisites**:
- [ ] Prerequisites

### Steps

1. Step 1
2. Step 2
3. Step 3

### Verification

- [ ] Verification step 1
- [ ] Verification step 2

### Rollback

1. Rollback step 1

### Escalation

**If this doesn't work**: Contact [role/team]
```

---

## Common Runbooks

### Runbook: Restart Service

**When to use**: Service is unresponsive or showing errors

**Impact**: Brief downtime (< 1 minute)

**Prerequisites**:
- [ ] SSH access to server
- [ ] Service name

### Steps

```bash
# 1. Check current service status
systemctl status keygo-api

# 2. Check recent errors
journalctl -u keygo-api --since "30 minutes ago" | tail -50

# 3. Restart service
sudo systemctl restart keygo-api

# 4. Verify service is running
systemctl status keygo-api

# 5. Check logs for startup errors
journalctl -u keygo-api -f
```

### Verification
- [ ] Service status: active (running)
- [ ] Health endpoint returns 200
- [ ] No errors in logs

### Rollback
```bash
sudo systemctl restart keygo-api
```

---

### Runbook: Database Backup

**When to use**: Before major changes, routine backups

**Impact**: None (read operation)

**Prerequisites**:
- [ ] Database credentials
- [ ] Backup storage access

### Steps

```bash
# 1. Create backup
pg_dump -h prod-db.keygo.com -U keygo -d keygo_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Compress backup
gzip backup_*.sql

# 3. Upload to storage
aws s3 cp backup_*.sql.gz s3://keygo-backups/production/

# 4. Verify upload
aws s3 ls s3://keygo-backups/production/ | tail -5

# 5. Clean up local files
rm backup_*.sql.gz
```

### Verification
- [ ] Backup file exists in S3
- [ ] File size > 0

### Escalation
**If backup fails**: Contact DBA team

---

### Runbook: Scale Service

**When to use**: High traffic, performance issues

**Impact**: Brief rolling restart

**Prerequisites**:
- [ ] Kubernetes access
- [ ] Current pod count

### Steps

```bash
# 1. Check current replicas
kubectl get deployment keygo-api

# 2. Scale up
kubectl scale deployment keygo-api --replicas=5

# 3. Verify new pods
kubectl get pods -l app=keygo-api

# 4. Monitor load
kubectl top pods
```

### Verification
- [ ] All pods running
- [ ] CPU/memory normalized

### Rollback
```bash
kubectl scale deployment keygo-api --replicas=3
```

---

### Runbook: Database Connection Issues

**When to use**: Service cannot connect to database

**Impact**: Service unavailable

### Steps

```bash
# 1. Check database status
pg_isready -h prod-db.keygo.com

# 2. Check service logs
kubectl logs keygo-api | grep -i "database\|connection"

# 3. Check connection pool
kubectl exec -it keygo-api-xxx -- psql -h prod-db -U keygo -c "SELECT count(*) FROM pg_stat_activity"

# 4. Test connection from service
kubectl exec -it keygo-api-xxx -- nc -zv prod-db 5432
```

### Verification
- [ ] pg_isready returns OK
- [ ] Service can connect

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| High CPU | Traffic spike or bug | Scale up, check logs |
| Memory leak | Bug or cache | Restart service |
| DB connection | DB overload or down | Check DB, scale down |
| 502 errors | Service down | Restart service |

---

## Completion Checklist

### Deliverables

- [ ] Runbooks for common operations
- [ ] Each runbook tested
- [ ] Escalation paths defined
- [ ] Team trained

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [SRE Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Keep it simple**: Step-by-step, not paragraphs
2. **Test regularly**: Practice makes perfect
3. **Update often**: Fix when issues arise
4. **Include verification**: Confirm it worked

---

[← Index](./README.md] | [< Anterior] | [Siguiente >](./TEMPLATE-035-incident-response.md)
