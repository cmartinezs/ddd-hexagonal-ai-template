[← 07-testing/](../07-testing/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../09-operations/README.md)

---

# Phase 8 — Deployment
## LinkSnap (URL Shortener)

> **What This Is:** Deployment phase output for LinkSnap. Defines the CI/CD pipeline, environment matrix, release process, and rollback procedure. Consistent with Phase 5 versioning strategy and Phase 6 dev workflow.
> **How to Use:** Read after Phase 7 (Testing). Phase 9 (Operations) uses the environment definitions and runbook triggers established here.
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [Environment Matrix](#environment-matrix)
2. [CI/CD Pipeline](#cicd-pipeline)
3. [Release Process](#release-process)
4. [Rollback Procedure](#rollback-procedure)
5. [Infrastructure Sketch](#infrastructure-sketch)
6. [Versioning Alignment Verification](#versioning-alignment-verification)

---

## Environment Matrix

| Environment | Purpose | Branch / Trigger | Auto-deploy | Database | URL |
|-------------|---------|-----------------|-------------|----------|-----|
| `ci` | Validate PRs | `pull_request` to `main` | ✅ Yes (ephemeral) | SQLite in-process (unit) + Postgres Docker (integration) | — |
| `staging` | Pre-prod verification | push to `main` | ✅ Yes | Staging PostgreSQL 15 | `staging.lnk.io` |
| `production` | Live service | tag `v*.*.*` + manual approval | ⬜ Manual gate | Production PostgreSQL 15 (HA) | `lnk.io` |

### Environment Variables (per environment)

| Variable | `ci` | `staging` | `production` |
|----------|------|-----------|-------------|
| `DATABASE_URL` | `postgres://test:test@localhost:5432/linksnap_test` | Secret: `DB_URL_STAGING` | Secret: `DB_URL_PROD` |
| `PORT` | 3000 | 3000 | 3000 |
| `LOG_LEVEL` | `silent` | `info` | `warn` |
| `NODE_ENV` | `test` | `staging` | `production` |

---

## CI/CD Pipeline

> Tool: **GitHub Actions** · Config path: `.github/workflows/`

### Pipeline Stages Overview

```mermaid
flowchart LR
    PR[Pull Request\nopened/updated] --> CI

    subgraph CI["CI (pull_request)"]
        L[lint] --> TC[type-check] --> UT[test:unit] --> IT[test:integration]
    end

    CI -->|merged to main| STAGING

    subgraph STAGING["Staging Deploy (push: main)"]
        B[build] --> MI[migrate:db] --> DS[deploy:staging] --> ST[smoke-test]
    end

    STAGING -->|tag v*.*.* + approval| PROD

    subgraph PROD["Production Deploy (tag v*.*.*)"]
        BP[build] --> MIP[migrate:db] --> DP[deploy:prod] --> STP[smoke-test]
    end
```

### Workflow: `ci.yml` (Pull Request)

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint

  type-check:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run type-check

  test-unit:
    runs-on: ubuntu-latest
    needs: type-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run test:unit

  test-integration:
    runs-on: ubuntu-latest
    needs: type-check
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: linksnap_test
        ports: ['5432:5432']
        options: --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/linksnap_test
```

### Workflow: `deploy-staging.yml` (push to `main`)

```yaml
name: Deploy Staging

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci && npm run build
      - uses: docker/build-push-action@v5
        with:
          tags: ghcr.io/org/linksnap:${{ github.sha }}
          push: true

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build
    environment: staging
    steps:
      - name: Migrate DB
        run: npm run migrate:latest
        env:
          DATABASE_URL: ${{ secrets.DB_URL_STAGING }}
      - name: Deploy container
        run: |
          # Deploy new image to staging VM / Kubernetes namespace
          echo "Deploying ghcr.io/org/linksnap:${{ github.sha }} to staging"
      - name: Smoke test
        run: curl -f https://staging.lnk.io/healthz
```

### Workflow: `deploy-prod.yml` (version tag)

```yaml
name: Deploy Production

on:
  push:
    tags: ['v[0-9]+.[0-9]+.[0-9]+']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: docker/build-push-action@v5
        with:
          tags: ghcr.io/org/linksnap:${{ github.ref_name }}
          push: true

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    environment: production   # requires manual approval in GitHub Environments
    steps:
      - name: Migrate DB
        run: npm run migrate:latest
        env:
          DATABASE_URL: ${{ secrets.DB_URL_PROD }}
      - name: Deploy container
        run: echo "Deploying ${{ github.ref_name }} to production"
      - name: Smoke test
        run: curl -f https://lnk.io/healthz
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```

---

## Release Process

### Steps to Release v1.0.0

1. All milestone M-004 acceptance criteria verified on staging.
2. Performance test (k6) passed on staging (NFR-001, NFR-002).
3. Operations runbook reviewed and approved (Phase 9).
4. Create and push tag: `git tag v1.0.0 && git push origin v1.0.0`
5. GitHub Actions `deploy-prod.yml` triggers; manual approval gate in GitHub Environments.
6. Post-deploy smoke test passes (healthz + one redirect test).
7. GitHub Release auto-generated from commit log.
8. Announce in #deployments Slack channel.

### Tag Format (from Phase 5 versioning strategy)

| Version type | Tag format | Example |
|-------------|-----------|---------|
| Release | `v{MAJOR}.{MINOR}.{PATCH}` | `v1.0.0` |
| Release candidate | `v{MAJOR}.{MINOR}.{PATCH}-rc.{N}` | `v1.0.0-rc.1` |
| Hotfix | `v{MAJOR}.{MINOR}.{PATCH}` (incremented PATCH) | `v1.0.1` |

> **Alignment with Phase 5:** v1.0 maps to `v1.0.0`; v2.0 maps to `v2.0.0`. Minor improvements from v1.1 are tagged `v1.1.0`.

---

## Rollback Procedure

| Scenario | Procedure |
|----------|-----------|
| Staging deploy fails smoke test | Automatic — pipeline fails; no user impact |
| Production deploy fails smoke test | Re-deploy last known-good image tag; create `fix/*` branch |
| Production regression detected post-deploy | Revert via `git revert`; push new tag `v{prev+PATCH}` |
| DB migration cannot be rolled back | Restore from pre-deploy snapshot; alert on-call engineer (Phase 9 runbook) |

### Rollback Decision Matrix

```mermaid
flowchart TD
    FAIL[Deployment failure] --> Q1{Smoke test passed?}
    Q1 -->|No| AUTO[Auto rollback\nRe-deploy previous tag]
    Q1 -->|Yes| Q2{User impact?}
    Q2 -->|No| MON[Monitor for 15 min\nthen investigate]
    Q2 -->|Yes| Q3{DB migration safe?}
    Q3 -->|Yes| REVERT[git revert + new tag]
    Q3 -->|No| SNAP[Restore DB snapshot\n+ re-deploy]
```

---

## Infrastructure Sketch

```mermaid
graph TD
    GH[GitHub Actions] -->|build + push| GHCR[GitHub Container Registry]
    GHCR -->|pull on deploy| STAGING_VM[Staging VM\nDocker Compose]
    GHCR -->|pull on deploy| PROD_K8S[Production\nKubernetes / Cloud VM]
    STAGING_VM --> STAGING_PG[Staging PostgreSQL 15]
    PROD_K8S --> PROD_PG[Production PostgreSQL 15\nManaged — HA]
    DNS[DNS\nlnk.io] --> PROD_K8S
    DNS_S[DNS\nstaging.lnk.io] --> STAGING_VM
```

> v1.0 infrastructure is intentionally simple: Docker Compose on a single VM for staging, a single-node container deployment for production. Multi-region and auto-scaling are out of scope until v2.0+.

---

## Versioning Alignment Verification

> `[CHECK-VERSIONING-ALIGNMENT]`: verify tags in Phase 8 match Phase 5 roadmap.

| Phase 5 Version | Phase 8 Tag | CI/CD Trigger | Consistent? |
|----------------|------------|--------------|-------------|
| v1.0 | `v1.0.0` | `v1.0.0` tag → prod deploy | ✅ |
| v1.1 | `v1.1.0` | `v1.1.0` tag → prod deploy | ✅ |
| v2.0 | `v2.0.0` | `v2.0.0` tag → prod deploy | ✅ |
| Hotfix | `v1.0.{PATCH}` | patch tag → prod deploy | ✅ |

**[CHECK-VERSIONING-ALIGNMENT] — PASS**: All Phase 5 versions map to consistent Phase 8 tags and deployment triggers. No misalignment detected.

---

[↑ Back to top](#phase-8--deployment)

---

[← 07-testing/](../07-testing/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../09-operations/README.md)
