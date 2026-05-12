[← Tutorial README](./README.md) | [< Previous](./step-08-deployment.md) | [Next >](./step-10-monitoring.md)

---

# Step 09: Operations

**What This Is**: Defining how the system is reliably operated day-to-day — runbooks, incident response, SLAs, and support workflows. This phase ensures the team can maintain production reliably.

**How to Use**: Create runbooks for common tasks, define incident severity levels and response times, set SLA targets, and establish the on-call rotation.

**Why It Matters**: Clear operational procedures enable faster incident response, reduce human error, and empower junior engineers to handle production issues independently.

**When to Use**: After Deployment (Phase 8) is complete. Before or during go-live.

**Owner**: DevOps Lead / SRE.

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

Produce the Operations package for your project:

- `runbooks/` — one runbook per common operational task
- `incident-response.md` — severity levels, response procedures, escalation paths
- `sla.md` — service level agreements with targets
- `on-call.md` — rotation schedule, escalation contacts, tooling

---

## 2. Prerequisites

- [ ] Phase 8 (Deployment) is complete — CI/CD pipeline and environments are defined
- [ ] Phase 6 (Development) architecture is documented — service boundaries are known
- [ ] On-call rotation has been agreed upon with the engineering team
- [ ] You have access to `01-templates/09-operations/`

---

## 3. Instructions

1. **Exercise — Runbook Inventory**
   - List every operational task the team performs regularly
   - Group by category: deployment, data, scaling, debugging, maintenance
   - Prioritize: which tasks are most frequent? Which have the highest risk if done wrong?
   - Aim for 5–10 runbooks covering 80% of operational work

2. **Generate runbooks** (one per common task)
   - Per runbook:
     - When to use it (trigger, symptoms)
     - Prerequisites (access, tools, notifications)
     - Step-by-step instructions (numbered, no ambiguity)
     - Expected outcome (what success looks like)
     - Troubleshooting tips (what can go wrong and how to recover)
     - When to escalate (which symptoms mean you need help)

   Common runbook topics:
   - Restart service
   - Database backup and restore
   - Emergency rollback
   - Scale service up/down
   - Update configuration without redeploy
   - Clear cache
   - Investigate elevated error rate

3. **Generate `incident-response.md`**
   - Severity levels (SEV1–SEV4) with definitions
   - Response time targets per severity
   - Escalation paths (who is paged, when, how)
   - Communication procedures (internal, external, status page)
   - Post-mortem requirements (when required, SLA for delivery)

4. **Generate `sla.md`**
   - Uptime targets per service
   - Response time targets
   - Error rate thresholds
   - Data availability guarantees
   - Maintenance window definitions

5. **Generate `on-call.md`**
   - Rotation schedule (weekly, bi-weekly)
   - Primary and secondary on-call contacts
   - Tools for alerting (PagerDuty, OpsGenie, etc.)
   - Handoff procedure (what to communicate at shift change)

> **Technology-specific**: Reference the infrastructure and tools defined in Phase 6 and Phase 8.

---

## 4. AI Prompt

> Copy the prompt below and use it to generate the Operations documents.

```
# Context
[Phase 8 deployment: environments, rollback procedures]
[Phase 6 architecture: service boundaries and dependencies]
[On-call team: rotation agreed]
Project: [your project name]

# Task
Generate:
- "01-templates/09-operations/runbooks/restart-service.md" — restart a service
- "01-templates/09-operations/runbooks/backup-restore.md" — database backup/restore
- "01-templates/09-operations/runbooks/emergency-rollback.md" — emergency rollback
- "01-templates/09-operations/incident-response.md" — severity, escalation, postmortem
- "01-templates/09-operations/sla.md" — uptime, response time, error rate targets
- "01-templates/09-operations/on-call.md" — rotation, tools, handoff

# Runbook Structure
Per runbook:
- When to use (trigger symptoms)
- Prerequisites (access, tools, notifications)
- Step-by-step instructions (numbered, unambiguous)
- Expected outcome
- Troubleshooting tips
- Escalation criteria

# Incident Response Requirements
- SEV1-SEV4 definitions (with examples)
- Response time targets per severity
- Escalation paths (primary, secondary, leadership)
- Communication protocol (internal, external, status page)
- Post-mortem SLA (when required, delivery timeline)

# SLA Requirements
- Uptime: [target, e.g., 99.9%]
- Response time: [p50/p95/p99 targets]
- Error rate: [acceptable threshold]
- Maintenance windows: [if any]

# Validation
- [ ] Are runbooks actionable (no ambiguous steps)?
- [ ] Do incident severity definitions have concrete examples?
- [ ] Is escalation path clear (who pages whom)?
- [ ] Are SLA targets quantified (not "as fast as possible")?
```

---

## 5. Done Check

- [ ] At least 5 runbooks exist, each with trigger, steps, outcome, and escalation
- [ ] `incident-response.md` defines SEV1–SEV4 with response time targets
- [ ] `sla.md` has quantified targets for uptime, response time, and error rate
- [ ] `on-call.md` has rotation schedule and handoff procedure
- [ ] Runbooks cover the most common operational tasks
- [ ] Post-mortem requirements are defined (when required, SLA for delivery)
- [ ] SRE/DevOps Lead has reviewed and signed off

---

## 6. Next Step

Proceed to [Step 10: Monitoring](./step-10-monitoring.md) — define metrics, SLI/SLOs, alert rules, and dashboards for system health visibility.

[← Tutorial README](./README.md) | [< Previous](./step-08-deployment.md) | [Next >](./step-10-monitoring.md)