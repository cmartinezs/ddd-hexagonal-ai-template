# Phase 9: Operations

You are an operations engineer or SRE responsible for keeping the system running reliably 24/7. This phase defines runbooks, incident response procedures, SLAs, and support workflows that enable rapid problem resolution.

## Overview

**What This Is**: The phase where you define procedures for reliably running and maintaining the system in production—runbooks, incident response, SLAs, and support

**How to Use**: Create runbooks for every common operational task. Define SLA targets and incident severity levels. Establish on-call rotation. Use this to operate the system day-to-day

**Why It Matters**: Clear operational procedures enable faster incident response, reduce human error, and enable junior engineers to handle production issues. This directly impacts uptime and customer satisfaction

**When to Complete**: After Deployment (Phase 8) is complete. Before going live (Phase 8+)

**Owner**: DevOps Lead / SRE

## Key Objectives

- [ ] Create operational runbooks
- [ ] Define SLA targets and response times
- [ ] Document incident response procedures
- [ ] Establish on-call rotation
- [ ] Plan for disaster recovery
- [ ] Set up support ticket system

## Files to Complete

### 1. Runbooks
**Purpose**: Step-by-step procedures for common operational tasks

**Per runbook**:
- When to use it
- Prerequisites
- Step-by-step instructions
- Troubleshooting tips
- When to escalate

**Examples**:
- Restart service
- Database backup/restore
- Emergency rollback
- Scale up/down
- Update configuration

### 2. Incident Response
**Purpose**: How to handle and resolve incidents

**Sections**:
- Incident severity levels (SEV1-SEV4)
- Response time targets per severity
- Escalation paths
- Communication procedures
- Postmortem process

### 3. SLA
**Purpose**: Service Level Agreements and targets

**Targets**:
- Uptime target (e.g., 99.9%)
- Response times
- Recovery time
- Maintenance windows

### 4. Support
**Purpose**: Support ticket system and procedures

**Sections**:
- Tool selection (third-party vs internal)
- Ticket flow and states
- Categories and priorities
- Incident integration
- Entry channels

---

## Files

| File | Purpose |
|------|---------|
| `TEMPLATE-034-runbooks.md` | Operational procedures |
| `TEMPLATE-035-incident-response.md` | Incident handling |
| `TEMPLATE-036-sla.md` | Service Level Agreements |
| `TEMPLATE-037-support.md` | Support ticket system |

**Time Estimate**: 4-6 hours  
**Team**: SRE, DevOps, On-call Lead, Support Lead  
**Output**: Reliable operational procedures