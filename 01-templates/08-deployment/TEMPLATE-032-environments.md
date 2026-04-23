[← Index](./README.md] | [< Anterior](./TEMPLATE-031-ci-cd-pipeline.md) | [Siguiente >](./TEMPLATE-033-release-process.md)

---

# Environments

Configuration and setup for each environment (development, staging, production).

## Contents

1. [Environment Overview](#environment-overview)
2. [Environment Configuration](#environment-configuration)
3. [Infrastructure](#infrastructure)
4. [Access Control](#access-control)

---

## Environment Overview

| Environment | Purpose | Branch | Auto Deploy |
|-------------|---------|--------|-------------|
| **Development** | Developer testing | feature/* | Yes |
| **Staging** | Pre-production testing | develop | Yes |
| **Production** | Live system | main | Manual |

---

## Environment Configuration

### Development Environment

| Setting | Value |
|---------|-------|
| **Purpose** | Local development and testing |
| **URL** | dev.keygo.example.com |
| **Database** | dev-db.keygo.example.com |
| **Debug** | Enabled |
| **Logging** | Verbose |
| **Cache** | Disabled |

### Staging Environment

| Setting | Value |
|---------|-------|
| **Purpose** | Pre-production validation |
| **URL** | staging.keygo.example.com |
| **Database** | staging-db.keygo.example.com |
| **Debug** | Limited |
| **Logging** | Standard |
| **Cache** | Enabled |

### Production Environment

| Setting | Value |
|---------|-------|
| **Purpose** | Live customer system |
| **URL** | keygo.example.com |
| **Database** | prod-db.keygo.example.com |
| **Debug** | Disabled |
| **Logging** | Minimal |
| **Cache** | Enabled (Redis) |

---

## Infrastructure

### Development
```
┌─────────────┐     ┌─────────────┐
│  Developer  │────►│   Docker    │
│   Local    │     │   Compose   │
└─────────────┘     └─────────────┘
```

### Staging/Production
```
                    ┌──────────────┐
                    │ Load Balancer│
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┐┌─────▼─────┐┌─────▼─────┐
        │  Pod 1    ││  Pod 2    ││  Pod N    │
        └─────┬─────┘└─────┬─────┘└─────┬─────┘
              │            │            │
              └────────────┼────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
   ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐
   │ PostgreSQL │    │   Redis   │    │   Kafka   │
   └───────────┘    └───────────┘    └───────────┘
```

---

## Access Control

### Development
- All developers: Full access
- No customer data

### Staging
- Developers: Read/write
- QA: Full access
- No customer data

### Production
- DevOps: Full access
- Developers: Read-only
- Support: Limited access
- Customer data: Encrypted

---

## Data Management

### Data Retention

| Environment | Retention | Sanitization |
|-------------|-----------|--------------|
| Development | 7 days | Daily |
| Staging | 30 days | Weekly |
| Production | Per policy | None |

### Data Seeding
- Development: Fake data generators
- Staging: Anonymized production data
- Production: Real customer data

---

## Configuration Management

### Environment Variables

```bash
# Development
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug
DATABASE_URL=postgres://dev-db:5432/keygo

# Staging
NODE_ENV=staging
DEBUG=false
LOG_LEVEL=info
DATABASE_URL=postgres://staging-db:5432/keygo

# Production
NODE_ENV=production
DEBUG=false
LOG_LEVEL=warn
DATABASE_URL=postgres://prod-db:5432/keygo
```

### Secrets Management
- Development: .env files
- Staging: HashiCorp Vault
- Production: AWS Secrets Manager

---

## Completion Checklist

### Deliverables

- [ ] All environments defined
- [ ] Infrastructure diagrams created
- [ ] Access control configured
- [ ] Data management policies set
- [ ] Secrets management configured

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [DevOps Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Automate setup**: Infrastructure as code
2. **Mirror production**: Staging should match prod
3. **Control access**: Least privilege principle
4. **Manage secrets**: Never commit secrets
5. **Monitor costs**: Development can be expensive

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-031-ci-cd-pipeline.md) | [Siguiente >](./TEMPLATE-033-release-process.md)
