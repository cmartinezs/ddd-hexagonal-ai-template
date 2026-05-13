# 🔍 DEEPENING: Scope 04 — 00-guides-and-instructions: CLI Consistency Review

> **Status:** DONE (2026-05-13)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Review the guides in `00-guides-and-instructions/` for consistency with current Archon CLI behaviour. Identify any references to commands, flags, or workflows that differ from the implemented CLI, and update them.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Audit `AI-WORKFLOW-GUIDE.md` for Archon command references | REVIEW-COHERENCE | DONE | Diff list / updated file |
| 2 | Audit `INSTRUCTIONS-FOR-AI.md` for Archon command references | REVIEW-COHERENCE | DONE | Diff list / updated file |
| 3 | Audit `SKILLS-AND-PLUGINS-GUIDE.md` for Archon command references | REVIEW-COHERENCE | DONE | Diff list / updated file |
| 4 | Verify `00-guides-and-instructions/README.md` Archon entry is current | REVIEW-COHERENCE | DONE | Updated README if needed |

---

## Scope Constraint

Only update CLI-specific content (command names, flags, workflow steps). Do not rewrite narrative content or restructure documents. Record any structural gaps as inconsistencies rather than fixing them in this scope.

---

## Done Criteria

- [ ] All audited guides correctly describe `archon next --phase N` jump behaviour
- [ ] All audited guides correctly describe `archon context inject`
- [ ] `--force` flag is mentioned where automation workflows are discussed
- [ ] No guide references a command or flag that no longer exists or was renamed
- [ ] Inconsistencies table populated (even if empty = no issues found)
- [ ] TRACEABILITY.md updated

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet — fill during audit* | — | — | — |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)
