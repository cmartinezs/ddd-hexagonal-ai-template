# Phase 10: Monitoring

You are a platform engineer or SRE responsible for providing visibility into system health and performance. This phase defines metrics, alerts, and dashboards that enable fast detection and response to problems.

## Overview

**What This Is**: The phase where you define what metrics matter, what thresholds trigger alerts, and what dashboards teams use to monitor system health

**How to Use**: Define key metrics (system, application, business). Set alert thresholds. Create dashboards. Wire up monitoring system. Use this to make data-driven decisions about scaling, optimization, and features

**Why It Matters**: Metrics provide visibility into whether the system is working correctly and how it's performing. Without metrics, problems go unnoticed until customers report them

**When to Complete**: Parallel with Deployment (Phase 8). Before go-live (Phase 8+)

**Owner**: Platform Lead / SRE

## Key Objectives

- [ ] Define key metrics (KPIs, SLI/SLOs)
- [ ] Design alert rules and thresholds
- [ ] Create monitoring dashboards
- [ ] Establish observability strategy (logs, metrics, traces)
- [ ] Plan for capacity planning

## Files to Complete

### 1. **metrics.md**
**Purpose**: Key metrics and KPIs to track

**Categories**:
- **System Health**: CPU, memory, disk, network
- **Application**: Latency, error rate, throughput
- **Business**: DAU, feature adoption, revenue
- **SLI/SLO**: Service Level Indicators and Objectives

**Per metric**:
- Name and description
- Measurement method
- Target or baseline
- Alert threshold

### 2. **alerts.md**
**Purpose**: Alert rules and escalation

**Per alert**:
- What triggers it?
- Severity level (critical, high, warning)
- Who gets notified?
- How to respond?

**Example**:
- Error rate > 1% → Page on-call (critical)
- CPU > 80% → Create ticket (high)
- Disk > 90% → Create ticket (high)

### 3. **dashboards.md**
**Purpose**: Monitoring and observability dashboards

**Sections**:
- System health dashboard
- Application performance dashboard
- Business metrics dashboard
- On-call dashboard

---

**Files**:
- `metrics.md`
- `alerts.md`
- `dashboards.md`

**Time Estimate**: 4-6 hours  
**Team**: SRE, DevOps, Engineering Lead  
**Output**: Comprehensive monitoring strategy
