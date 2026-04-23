[← Index ../README.md) | [< Anterior ../pull-requests/README.md)

---

# CI/CD Pipeline

## Description

Automated testing and deployment pipelines.

## Pipeline Stages

| Stage | Purpose | Auto/Manual |
|-------|---------|-------------|
| **Lint** | Code quality | Auto |
| **Test** | Tests | Auto |
| **Build** | Artifacts | Auto |
| **Security** | Vulnerability scan | Auto |
| **Deploy** | Deployment | Usually manual |

## Environments

| Environment | Trigger | Approval |
|-------------|---------|----------|
| Development | Push to develop | ❌ |
| Staging | PR to main | ❌ |
| Production | Release tag | ✅ |

## Common Tools

| Category | Tools |
|-----------|-------|
| CI/CD | GitHub Actions, GitLab CI, Jenkins, CircleCI |
| Build | Maven, Gradle, npm, Docker |
| Deploy | ArgoCD, Spinnaker, AWS CodeDeploy |

---

## Files in this folder

- `README.md` — This file

---

[← Index ../README.md) | [< Anterior ../pull-requests/README.md)