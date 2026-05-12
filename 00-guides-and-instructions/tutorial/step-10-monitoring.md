[← Tutorial README](./README.md) | [< Previous](./step-09-operations.md) | [Next >](./step-11-feedback.md)

---

# Step 10: Monitoring

**What This Is**: Defining what metrics matter, what thresholds trigger alerts, and what dashboards teams use to monitor system health. Monitoring provides the visibility needed to detect and respond to problems before customers notice.

**How to Use**: Define key metrics (system, application, business), set alert thresholds, and create dashboards. Wire monitoring to the infrastructure defined in Phase 8.

**Why It Matters**: Without metrics, problems go unnoticed until customers report them. With good monitoring, you detect issues in seconds and respond before they impact users.

**When to Use**: Parallel with Deployment (Phase 8). Before go-live.

**Owner**: Platform Lead / SRE.

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

Produce the Monitoring package for your project:

- `metrics.md` — key metrics per category (system, application, business) with SLI/SLO definitions
- `alerts.md` — alert rules with thresholds, severity, and response actions
- `dashboards.md` — monitoring dashboard designs and layouts

---

## 2. Prerequisites

- [ ] Phase 8 (Deployment) is complete — environments and infrastructure are defined
- [ ] Phase 6 (Development) architecture is documented — service dependencies are known
- [ ] Phase 9 (Operations) SLA targets are defined
- [ ] You have access to `01-templates/10-monitoring/`

---

## 3. Instructions

1. **Exercise — SLI/SLO Definition**
   - Define what "available" means for your system
   - SLI (Service Level Indicator): how you measure availability (e.g., successful requests / total requests)
   - SLO (Service Level Objective): the target (e.g., 99.9% availability)
   - Error budget: how much downtime is acceptable per month

   | SLI | Measurement | SLO Target | Error Budget (monthly) |
   |-----|-------------|-----------|----------------------|
   | Availability | (successful requests / total requests) × 100 | 99.9% | 43.8 min |
   | Latency (p95) | Response time at 95th percentile | < 500ms | — |
   | Error Rate | (5xx responses / total requests) × 100 | < 0.1% | 43.8 min |

2. **Generate `metrics.md`**
   - Categories: System Health, Application, Business, SLI/SLO
   - Per metric: name, description, measurement method, target, alert threshold
   - System Health: CPU, memory, disk, network utilization
   - Application: latency (p50/p95/p99), error rate, throughput (requests/sec)
   - Business: DAU, feature adoption, conversion rate

3. **Generate `alerts.md`**
   - Per alert: name, what triggers it, severity (critical/high/warning), who is notified, how to respond
   - Align with Phase 9 incident severity levels
   - Set thresholds based on SLO targets (alert before SLO is breached)

   | Alert | Condition | Severity | Action |
   |-------|-----------|----------|--------|
   | High Error Rate | error_rate > 1% for 5 min | Critical | Page on-call |
   | High Latency | p95 > 1s for 5 min | High | Create ticket |
   | Disk Usage | disk > 85% | High | Create ticket |
   | CPU | cpu > 90% for 10 min | Warning | Monitor |

4. **Generate `dashboards.md`**
   - System health dashboard: CPU, memory, disk, network
   - Application dashboard: latency, error rate, throughput
   - Business dashboard: DAU, key feature metrics
   - SLO dashboard: current availability vs. target, error budget burn rate

> **Technology-specific**: This phase references the monitoring infrastructure and tools defined in Phase 6 and Phase 8.

---

## 4. AI Prompt

> Copy the prompt below and use it to generate the Monitoring documents.

```
# Context
[Phase 9 SLA targets: uptime, response time, error rate]
[Phase 8 environments: services and infrastructure]
[Phase 6 architecture: service dependencies and critical paths]
Project: [your project name]

# Task
Generate:
- "01-templates/10-monitoring/metrics.md" — SLI/SLO definitions, key metrics per category
- "01-templates/10-monitoring/alerts.md" — alert rules, thresholds, severity, actions
- "01-templates/10-monitoring/dashboards.md" — dashboard layouts and key panels

# Metrics Requirements
Per metric:
- Name and description
- Measurement method (how you collect it)
- Target (SLO)
- Alert threshold (when to page)

Categories:
- System Health: CPU, memory, disk, network
- Application: latency p50/p95/p99, error rate, throughput
- Business: DAU, MAU, feature adoption
- SLI/SLO: availability, latency, error budget

# Alert Requirements
Per alert:
- What triggers it (condition + duration)
- Severity (critical/high/warning)
- Who gets notified
- How to respond (link to runbook)

Alignment with Phase 9 incident response:
- Critical alerts = SEV1, High = SEV2, Warning = SEV3/SEV4

# Dashboard Requirements
- System health: real-time resource usage
- Application: latency, errors, throughput
- SLO: error budget burn rate, availability trend
- Business: DAU/MAU trend, feature usage

# Validation
- [ ] Are SLI/SLO targets aligned with Phase 9 SLA document?
- [ ] Are alert thresholds set to trigger before SLO is breached?
- [ ] Are dashboards actionable (not just data, but insight)?
- [ ] Are critical paths from Phase 6 monitored?
```

---

## 5. Done Check

- [ ] `metrics.md` has SLI/SLO definitions with error budgets
- [ ] Key metrics defined per category: System, Application, Business
- [ ] `alerts.md` has alert rules with thresholds, severity, and response actions
- [ ] Alert thresholds are set to fire before SLOs are breached
- [ ] `dashboards.md` defines layouts for system health, application, and SLO dashboards
- [ ] Each alert connects to an incident response procedure from Phase 9
- [ ] SRE/Platform Lead has reviewed and signed off

---

## 6. Next Step

Proceed to [Step 11: Feedback](./step-11-feedback.md) — close the loop by collecting retrospectives, user feedback, and lessons learned to inform the next cycle.

[← Tutorial README](./README.md) | [< Previous](./step-09-operations.md) | [Next >](./step-11-feedback.md)