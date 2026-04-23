[← Index](./README.md)

---

# Infrastructure Template

## Purpose

Template for infrastructure specification.

## Template

```markdown
# Infrastructure Specification

## Compute

| Component | Type | Provider |Specs |
|-----------|------|----------|------|
| API | Container | [Cloud] | 2 vCPU, 4GB RAM |
| Worker | Container | [Cloud] | 1 vCPU, 2GB RAM |
| Scheduler | Serverless | [Cloud] | 256MB, 30s timeout |

## Data Stores

| Store | Type | Provider | Configuration |
|-------|------|----------|---------------|
| Primary DB | PostgreSQL | [Cloud] | HA, multi-AZ |
| Cache | Redis | [Cloud] | Cluster mode |
| Queue | SQS/Kafka | [Cloud] | FIFO support |

## Networking

| Component | Type | Notes |
|-----------|------|-------|
| Load Balancer | Application | TLS termination |
| CDN | [Provider] | Static assets |
| DNS | [Provider] | Route 53 |
| TLS | ACM | Auto-renewal |

## Monitoring

| Component | Purpose |
|-----------|----------|
| Logs | [Service] |
| Metrics | [Service] |
| Traces | [Service] |
| Alerts | PagerDuty |

## Environment

| Env | Region | AZs | Backup |
|------|--------|-----|-----|-------|
| Production | [region] | 3 | Daily |
| Staging | [region] | 1 | Weekly |
| Development | [region] | 1 | None |

## Disaster Recovery

| Metric | Target |
|--------|--------|
| RTO | 1 hour |
| RPO | 15 minutes |
| Backup retention | 30 days |
```

---

[← Index](./README.md)