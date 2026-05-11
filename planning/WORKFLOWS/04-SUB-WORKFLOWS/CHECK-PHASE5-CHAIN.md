# [CHECK-PHASE5-CHAIN]

> [← README](README.md)

Verifies that the five Phase 5 planning artifacts form a consistent, internally linked chain: Roadmap → Epics → Use Cases → Milestones → Issue Mapping.

---

## Steps

1. Open all Phase 5 output documents in `01-templates/data-output/05-planning/` (or the active output folder).
2. Verify that each Epic references at least one Roadmap capability.
3. Verify that each Use Case references at least one Epic.
4. Verify that each Milestone references at least one Epic and has a completion criterion.
5. Verify that the Issue Mapping table has an entry for each Milestone.
6. Verify that the Versioning Strategy (`TEMPLATE-016`) is referenced in at least one Milestone or Epic.
7. Check that no technology names appear anywhere in these documents (`[CHECK-AGNOSTIC-BOUNDARY]`).
8. Return: `OK` if all links and rules pass; `CHAIN-BREAK` + which link is broken if not.

---

**Called by:** [`GENERATE-DOCUMENT`](../02-EXECUTION-WORKFLOWS/GENERATE-DOCUMENT.md) (Phase 5) · [`REVIEW-COHERENCE`](../02-EXECUTION-WORKFLOWS/REVIEW-COHERENCE.md)

**Uses:** [`[CHECK-AGNOSTIC-BOUNDARY]`](CHECK-AGNOSTIC-BOUNDARY.md)

---

> [← README](README.md)
