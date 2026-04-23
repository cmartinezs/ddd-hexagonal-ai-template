[← Index](./README.md) | [< Anterior] | [Siguiente >](./TEMPLATE-032-environments.md)

---

# CI/CD Pipeline

Automated build, test, and deployment pipeline for continuous delivery.

## Contents

1. [Pipeline Stages](#pipeline-stages)
2. [Pipeline Configuration](#pipeline-configuration)
3. [Quality Gates](#quality-gates)
4. [Example Pipeline](#example-pipeline)

---

## Pipeline Stages

### Stage 1: Commit Stage
**Trigger**: Every push to any branch

| Step | Tools | Duration | Failure Action |
|------|-------|----------|----------------|
| Checkout | git | - | - |
| Install | npm/yarn | 1-2 min | Block |
| Lint | ESLint | 30 sec | Warn |
| Type Check | TypeScript | 1 min | Block |
| Unit Tests | Jest | 2-5 min | Block |
| Coverage | Istanbul | - | Warn |
| Build | webpack/tsc | 2-3 min | Block |
| Docker Build | Docker | 2-5 min | Block |
| Push Image | registry | 1-2 min | Block |

### Stage 2: Integration Stage
**Trigger**: Every PR to main

| Step | Tools | Duration | Failure Action |
|------|-------|----------|----------------|
| Deploy Test | k8s | 2-3 min | Block |
| Integration Tests | Jest | 5-10 min | Block |
| Contract Tests | Postman | 5-10 min | Block |
| DB Migration | CLI | 1-2 min | Block |
| Security Scan | SonarQube | 5-10 min | Block |

### Stage 3: Staging Deploy
**Trigger**: Merge to main

| Step | Tools | Duration | Failure Action |
|------|-------|----------|----------------|
| Deploy | ArgoCD | 3-5 min | Rollback |
| Smoke Tests | Playwright | 5-10 min | Rollback |
| Notify | Slack | - | - |

### Stage 4: Production Deploy
**Trigger**: Manual approval required

| Step | Tools | Duration | Failure Action |
|------|-------|----------|----------------|
| Approval | GitHub | - | Wait |
| Blue/Green | k8s | 5-10 min | Rollback |
| Health Check | curl | - | Rollback |
| Traffic Switch | LB | - | - |
| Smoke Tests | Playwright | 10-15 min | Rollback |
| Notify | Slack | - | - |

---

## Pipeline Configuration

### GitHub Actions Example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Test
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Docker Build
        run: docker build -t app:${{ github.sha }} .

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: kubectl apply -f staging/
        
  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Manual Approval
        run: echo "Requires approval"
```

---

## Quality Gates

### Commit Gate
- [ ] All unit tests passing
- [ ] Coverage > 80%
- [ ] No linting errors
- [ ] Build succeeds

### PR Gate
- [ ] All integration tests passing
- [ ] Security scan clean
- [ ] Code review approved
- [ ] Documentation updated

### Release Gate
- [ ] All E2E tests passing
- [ ] Performance tests within thresholds
- [ ] Security audit passed
- [ ] Manual approval obtained

---

## Example Pipeline

### Example: Keygo Platform

# CI/CD Pipeline: Keygo

## Stages

### Commit Stage
1. Checkout code
2. Install dependencies
3. Run linters
4. Run type checks
5. Run unit tests (>80% coverage)
6. Build application
7. Build Docker image
8. Push to registry

### Integration Stage
1. Deploy to test environment
2. Run integration tests
3. Run contract tests
4. Run security scans
5. Build release artifacts

### Staging Stage
1. Deploy to staging
2. Run smoke tests
3. Notify team

### Production Stage
1. Wait for approval
2. Deploy to production (blue-green)
3. Run smoke tests
4. Switch traffic
5. Monitor for errors
6. Notify team

---

## Paso a Paso

1. **Design stages**: Commit → Integration → Staging → Production
2. **Configure tools**: Select CI/CD platform
3. **Define gates**: Quality checks at each stage
4. **Automate**: Everything in code
5. **Monitor**: Track pipeline health

---

## Completion Checklist

### Deliverables

- [ ] Pipeline stages defined
- [ ] Tools configured
- [ ] Quality gates set
- [ ] Automated tests integrated
- [ ] Notifications configured

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [DevOps Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Fail fast**: Catch issues early
2. **Automate everything**: No manual steps
3. **Parallelize**: Run tests concurrently
4. **Cache dependencies**: Faster builds
5. **Monitor pipelines**: Track health

---

[← Index](./README.md] | [< Anterior] | [Siguiente >](./TEMPLATE-032-environments.md)
