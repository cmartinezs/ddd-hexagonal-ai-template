# Phase 5 — Planning

> [← README](README.md)

**What This Phase Is**: Product roadmap, epics, use cases, milestones, versioning strategy, issue mapping. Traces to Requirements and Design.

> ⚠️ **Important distinction**: `01-templates/05-planning/` documents the **product roadmap and delivery plan** for the project being documented. The `planning/` root directory is the **workflow management system** for documentation work. These are two different things.

---

| Item | Value |
|------|-------|
| Phase code | `P` |
| Required input | Phase 2 requirements (scope matrix), Phase 3 bounded contexts |
| Key templates | `TEMPLATE-014` (roadmap), `TEMPLATE-015` (epics), `TEMPLATE-016` (versioning), `TEMPLATE-017` (use cases), `TEMPLATE-018` (milestones), `TEMPLATE-019` (issue mapping) |
| Agnostic boundary | **Strictly enforced** — roadmap describes capabilities, not tech stacks |
| Chain requirement | Roadmap → Epics → Use Cases → Milestones → Issue Mapping must be internally consistent |

**Key Checks**: [`[CHECK-AGNOSTIC-BOUNDARY]`](../04-SUB-WORKFLOWS/CHECK-AGNOSTIC-BOUNDARY.md) · [`[CHECK-PHASE-CONTEXT]`](../04-SUB-WORKFLOWS/CHECK-PHASE-CONTEXT.md) · [`[CHECK-PHASE5-CHAIN]`](../04-SUB-WORKFLOWS/CHECK-PHASE5-CHAIN.md)

---

## Done Criteria

- [ ] Roadmap has at least one phase defined with goal and capabilities
- [ ] Each capability traces to at least one RF/RNF
- [ ] Epics reference roadmap phases
- [ ] Use cases map to bounded contexts from Phase 3
- [ ] Milestones map to epics
- [ ] Issue mapping covers all milestones
- [ ] Versioning strategy defines MAJOR.MINOR.PATCH semantics
- [ ] No technology names anywhere

---

> [← README](README.md)
