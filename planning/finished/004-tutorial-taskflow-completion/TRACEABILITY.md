# TRACEABILITY — 004 Tutorial: TaskFlow Completion

> Local traceability matrix for planning 004. Each row tracks a term introduced or reinforced in this planning and which SDLC phases it appears in.

---

## Term × Phase Matrix

| Term | P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | W | Notes |
|------|----|----|----|----|----|----|----|----|----|----|-----|-----|---|-------|
| Vision Statement | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | Single-sentence product vision |
| Actor | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | System participant with a role and goal |
| Glossary | N/A | N/A | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | Shared language for the domain |
| Functional Requirement | N/A | N/A | ✅ | ✅ | N/A | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | Behavior the system must exhibit |
| Non-Functional Requirement | N/A | N/A | ✅ | N/A | N/A | ✅ | N/A | ✅ | ✅ | ✅ | ✅ | N/A | N/A | Quality attribute the system must satisfy |
| Bounded Context | N/A | N/A | N/A | ✅ | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | Explicit boundary where a model applies |
| Context Map | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | Diagram of relationships between bounded contexts |
| Aggregate | N/A | N/A | N/A | N/A | ✅ | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | Cluster of domain objects forming a consistency boundary |
| Invariant | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | Business rule that must always hold |
| Value Object | N/A | N/A | N/A | ✅ | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | Immutable domain concept with no identity |
| Domain Event | N/A | N/A | N/A | ✅ | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | Record that something happened in the domain |
| Epic | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Large body of work traceable to FRs |
| Milestone | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | Deliverable checkpoint in the roadmap |
| Hexagonal Architecture | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | Ports and adapters pattern isolating domain from infra |
| Port | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | N/A | Interface defining a contract (inbound or outbound) |
| Adapter | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | ✅ | N/A | N/A | N/A | N/A | Concrete implementation of a port |
| ADR | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | Architecture Decision Record |
| Test Pyramid | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | Layered testing strategy (unit/integration/E2E) |
| CI/CD Pipeline | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | N/A | N/A | N/A | Automated build, test, and deployment workflow |
| SLA | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | N/A | Service Level Agreement; availability and latency targets |
| Runbook | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | Step-by-step operational procedure |
| Incident Severity | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | N/A | P1..P4 classification of operational incidents |
| Metric | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | N/A | Measured signal for alerting and dashboards |
| Retrospective | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | Post-release reflection (Start/Stop/Continue) |
| Backlog Item | N/A | N/A | N/A | N/A | N/A | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | ✅ | Work item surfaced from feedback for next cycle |

---

## Changelog

| Date | Scope | Terms Added |
|------|-------|------------|
| 2026-05-11 | 004 scope-01 | Vision Statement, Actor, Glossary |
| 2026-05-11 | 004 scope-02 | Functional Requirement, Non-Functional Requirement, Bounded Context, Context Map, Aggregate, Invariant, Value Object, Domain Event |
| 2026-05-11 | 004 scope-03 | Epic, Milestone, Hexagonal Architecture, Port, Adapter, ADR, Test Pyramid, CI/CD Pipeline |
| 2026-05-11 | 004 scope-04 | SLA, Runbook, Incident Severity, Metric, Retrospective, Backlog Item |
