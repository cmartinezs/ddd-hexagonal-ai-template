[← Index](./README.md] | [< Anterior](./TEMPLATE-034-runbooks.md) | [Siguiente >](./TEMPLATE-036-sla.md)

---

# Incident Response

How to handle and resolve incidents effectively.

## Contents

1. [Severity Levels](#severity-levels)
2. [Response Process](#response-process)
3. [Escalation](#escalation)
4. [Post-Mortem](#post-mortem)

---

## Severity Levels

| Level | Name | Description | Response Time | Example |
|-------|------|-------------|----------------|---------|
| **P1** | Critical | Service down, data loss | 15 min | Production database down |
| **P2** | High | Major feature broken | 1 hour | Login not working |
| **P3** | Medium | Minor feature broken | 4 hours | Search slow |
| **P4** | Low | Cosmetic, minor issue | 24 hours | Typo in UI |

---

## Response Process

### P1: Critical Incident Flow

```
Discovery → Triage → Response → Resolution → Post-Mortem
    ↓           ↓          ↓           ↓            ↓
  Alert      Severity   Fix/Workaround  Deploy     Document
  received   confirmed  communicated   complete    lessons
```

### Step 1: Discovery
- Alert triggers
- On-call paged
- Incident channel created

### Step 2: Triage
- Confirm severity
- Assess impact
- Assign incident commander

### Step 3: Response
- Communicate status
- Implement fix or workaround
- Update stakeholders

### Step 4: Resolution
- Deploy fix
- Verify recovery
- Confirm stability

### Step 5: Post-Mortem
- Document timeline
- Identify root cause
- Plan prevention

---

## Escalation

### Escalation Path

| Severity | First Response | Escalate To | Escalate If |
|----------|---------------|--------------|-------------|
| P1 | On-call engineer (15 min) | Engineering lead (30 min) | No progress |
| P2 | On-call engineer (1 hr) | Team lead (2 hr) | No progress |
| P3 | Ticket (4 hr) | Team lead (24 hr) | No response |
| P4 | Ticket (24 hr) | Product manager (72 hr) | Not resolved |

### Communication Template

```
# Incident: [Brief Title]

**Severity**: P1
**Status**: [Investigating/Identified/Monitoring/Resolved]
**Impact**: [Who is affected]

## Timeline
- [Time] Incident detected
- [Time] Incident acknowledged
- [Time] Root cause identified
- [Time] Fix deployed
- [Time] Incident resolved

## Current Status
[What we're doing now]

## Next Steps
[What comes next]
```

---

## Post-Mortem

### Post-Mortem Template

```markdown
# Post-Mortem: [Incident Title]

**Date**: [YYYY-MM-DD]
**Duration**: [X hours]
**Severity**: P1

## Summary
[Brief description of what happened]

## Timeline
- 10:00 - Alert triggered
- 10:15 - Incident acknowledged
- 10:45 - Root cause identified
- 11:30 - Fix deployed
- 12:00 - Incident resolved

## Root Cause
[Technical explanation of what went wrong]

## Impact
- Users affected: [Number]
- Duration: [X hours]
- Data loss: [Yes/No]

## What Went Well
- [Positive 1]
- [Positive 2]

## What Could Improve
- [Improvement 1]
- [Improvement 2]

## Action Items
- [ ] Action 1 (Owner: @name, Due: date)
- [ ] Action 2 (Owner: @name, Due: date)
```

---

## Example Incident

### Example: Database Outage

**Incident**: PostgreSQL database became unresponsive

**Timeline**:
- 14:00 - Alert: High DB CPU
- 14:15 - On-call acknowledged
- 14:30 - Identified runaway query
- 14:45 - Killed query, DB recovered
- 15:00 - Incident resolved

**Root Cause**: Missing index on frequently queried column

**Action Items**:
- [ ] Add index (DBA, due: tomorrow)
- [ ] Add monitoring for slow queries (SRE, due: next week)

---

## Completion Checklist

### Deliverables

- [ ] Severity levels defined
- [ ] Response process documented
- [ ] Escalation paths set
- [ ] Post-mortem template created

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [SRE Lead, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Stay calm**: Panic makes things worse
2. **Communicate**: Keep stakeholders informed
3. **Document**: Write down what you do
4. **Learn**: Post-mortems prevent recurrence

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-034-runbooks.md) | [Siguiente >](./TEMPLATE-036-sla.md)
