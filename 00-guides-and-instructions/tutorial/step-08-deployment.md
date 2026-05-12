[← Tutorial README](./README.md) | [< Previous](./step-07-testing.md) | [Next >](./step-09-operations.md)

---

# Step 08: Deployment

**What This Is**: Defining the CI/CD pipeline, environments, and release procedures that move code from development to production safely and reliably.

**How to Use**: Design the pipeline stages, define each environment's purpose and configuration, document the release checklist, and plan rollback procedures.

**Why It Matters**: Deployment procedures determine how quickly you can release, how safe releases are, and how fast you can roll back. Clear procedures enable confident, frequent deployments.

**When to Use**: After Testing (Phase 7) is defined. Before the system goes live.

**Owner**: DevOps Lead / Platform Engineer.

---

## Contents

1. [Goal](#1-goal)
2. [Prerequisites](#2-prerequisites)
3. [Instructions](#3-instructions)
4. [AI Prompt](#4-ai-prompt)
5. [Done Check](#5-done-check)
6. [Next Step](#6-next-step)

---

## 1. Goal

Produce the Deployment package for your project:

- `ci-cd-pipeline.md` — pipeline stages, triggers, quality gates
- `environments.md` — dev, staging, prod configuration and access
- `release-process.md` — step-by-step release checklist
- `rollback-procedures.md` — how to roll back safely

---

## 2. Prerequisites

- [ ] Phase 7 (Testing) is defined — test targets and quality gates are set
- [ ] Phase 5 (Planning) is complete — versioning strategy is defined
- [ ] Infrastructure team has chosen deployment platform
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASES 8–12"
- [ ] You have access to `01-templates/08-deployment/`

---

## 3. Instructions

1. **Exercise — Versioning Consistency Check**
   - Verify that the versioning approach defined in `versioning-strategy.md` (Phase 5) aligns with the CI/CD pipeline tags
   - CI should auto-increment patch on every merge to main
   - Manual increment for minor (feature releases) and major (milestone releases)
   - Release notes must reference milestone from Phase 5 roadmap

2. **Generate `ci-cd-pipeline.md`**
   - Pipeline stages: commit → build → test → staging → production
   - Per stage: what runs, what gates, what artifacts are produced
   - Triggers: on push, on PR, on schedule, on manual
   - Artifact management: where build artifacts are stored and how long they are retained

   ```mermaid
   flowchart LR
       Commit --> Build --> Test --> Stage --> Prod
       Test --> |fail| Notify
       Stage --> |manual approval| Prod
       Prod --> |rollback trigger| Rollback
   ```

3. **Generate `environments.md`**
   - Per environment: purpose, access control, configuration, data retention
   - Key environments: dev, staging, production
   - Configuration differences (what varies between envs: URLs, credentials, feature flags)
   - Maintenance windows and change freeze periods

4. **Generate `release-process.md`**
   - Step-by-step release checklist:
     - Code review complete
     - All tests passing
     - Documentation updated
     - Migration scripts tested
     - Staging verification
     - Release notes prepared
     - Rollback plan ready
     - Communication sent
   - Who approves each step

5. **Generate `rollback-procedures.md`**
   - Criteria for initiating rollback (error rate, latency spike, data corruption)
   - Step-by-step rollback procedure per environment
   - Communication protocol during rollback
   - Post-mortem requirements after rollback

> **Technology-specific**: This phase names deployment tools, platforms, and infrastructure. Use the stack defined in Phase 6.

> **Versioning consistency**: CI/CD pipeline version tags must match the semantic versioning defined in Phase 5. Check `01-templates/05-planning/versioning-strategy.md` before finalizing.

---

## 4. AI Prompt

> Copy the prompt below, replace placeholders with your deployment stack, and use it to generate the Deployment documents.

```
# Context
[Phase 5 versioning strategy: semantic versioning approach]
[Phase 6 technology stack: deployment tools and infrastructure]
[Phase 7 quality gates: test targets]
Project: [your project name]

# Task
Generate:
- "01-templates/08-deployment/ci-cd-pipeline.md" — pipeline stages and triggers
- "01-templates/08-deployment/environments.md" — dev, staging, prod configuration
- "01-templates/08-deployment/release-process.md" — release checklist
- "01-templates/08-deployment/rollback-procedures.md" — rollback steps

# CI/CD Requirements
- Pipeline stages: commit → build → test → staging → production
- Per stage: jobs, gates, artifacts
- Versioning: align with Phase 5 semantic versioning (patch auto-increment on merge, minor/major manual)
- Rollback triggers and procedure

# Environment Requirements
- Dev: purpose, access (open), config (debug on)
- Staging: purpose, access (team), config (mirror prod)
- Prod: purpose, access (restricted), config (optimized)

# Release Requirements
- Pre-release checklist (10+ items)
- Staging verification steps
- Rollback criteria and procedure
- Communication protocol

# Validation
- [ ] Pipeline stages match Phase 7 quality gates?
- [ ] Versioning is consistent with Phase 5 versioning strategy?
- [ ] Rollback procedure is actionable (numbered steps)?
- [ ] Environments are distinct and documented?
```

---

## 5. Done Check

- [ ] `ci-cd-pipeline.md` has all pipeline stages with gates and triggers
- [ ] Versioning strategy aligns with Phase 5 (`versioning-strategy.md`)
- [ ] `environments.md` defines dev, staging, and prod with distinct configurations
- [ ] `release-process.md` has a step-by-step checklist with approvers
- [ ] `rollback-procedures.md` defines criteria, steps, and communication protocol
- [ ] Migration scripts are documented for database changes
- [ ] DevOps Lead has reviewed and signed off

---

## 6. Next Step

Proceed to [Step 09: Operations](./step-09-operations.md) — define runbooks, incident response procedures, and SLA targets for day-to-day reliability.

[← Tutorial README](./README.md) | [< Previous](./step-07-testing.md) | [Next >](./step-09-operations.md)