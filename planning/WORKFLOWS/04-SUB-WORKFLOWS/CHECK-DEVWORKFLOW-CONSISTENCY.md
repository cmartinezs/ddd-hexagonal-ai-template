# [CHECK-DEVWORKFLOW-CONSISTENCY]

> [← README](README.md)

Verifies that the four dev workflow templates in `06-development/workflow/` are mutually consistent.

---

## Steps

1. Open all four sub-area files: `branches/`, `commits/`, `pull-requests/`, `cicd/`.
2. Verify that commit types referenced in `pull-requests/` match those defined in `commits/`.
3. Verify that branch names used in `cicd/` triggers match the strategy defined in `branches/`.
4. Verify that the PR merge strategy (squash/merge/rebase) is compatible with the branch strategy (GitFlow vs Trunk-Based).
5. Verify that CI/CD environment names (`dev`, `staging`, `prod` or equivalents) are used consistently across all four files.
6. Verify that all navigation links in these files are correct (no broken `[text](path)` references).
7. Return: `OK` if consistent; `INCONSISTENCY` + list if not.

---

**Called by:** [`GENERATE-DOCUMENT`](../02-EXECUTION-WORKFLOWS/GENERATE-DOCUMENT.md) (Phase 6 workflow area) · [`REVIEW-COHERENCE`](../02-EXECUTION-WORKFLOWS/REVIEW-COHERENCE.md)

---

> [← README](README.md)
