# Phase 8 — Deployment

> [← README](README.md)

**What This Phase Is**: CI/CD pipeline definition, environment matrix, release process. Traces to dev workflow and versioning strategy.

---

| Item | Value |
|------|-------|
| Phase code | `B` |
| Required input | Phase 6 dev workflow (branch strategy, CI/CD), Phase 5 versioning strategy |
| Key templates | `TEMPLATE-031` (CI/CD pipeline) |
| Agnostic boundary | Specific — CI/CD tools and cloud environments are expected |
| Consistency requirement | Environments (dev/staging/prod) must match Phase 6 CI/CD environments; release tags must follow Phase 5 versioning |

**Key Checks**: [`[CHECK-VERSIONING-ALIGNMENT]`](../04-SUB-WORKFLOWS/CHECK-VERSIONING-ALIGNMENT.md)

---

## Done Criteria

- [ ] Pipeline stages defined (lint, test, build, deploy)
- [ ] Environments mapped to branch triggers
- [ ] Release process references versioning strategy

---

> [← README](README.md)
