# [CHECK-TRACEABILITY]

> [← README](README.md)

Verifies that all new terms, concepts, and decisions introduced in the current task are registered in the traceability matrix.

---

## Steps

1. List all new terms or concepts introduced in this task's output.
2. Open `TRACEABILITY.md` for the current planning.
3. For each term: check if there is an entry in the matrix.
4. If any term is missing: add it immediately and execute `[PROPAGATE-TERM]`.
5. Return: `OK` if all terms are tracked, `MISSING` + list if not.

---

**Called by:** [`ADVANCE-PLANNING`](../01-PLANNING-WORKFLOWS/ADVANCE-PLANNING.md) · [`INTEGRATE-MILESTONE`](../02-EXECUTION-WORKFLOWS/INTEGRATE-MILESTONE.md) · [`UPDATE-TRACEABILITY`](../03-MAINTENANCE-WORKFLOWS/UPDATE-TRACEABILITY.md)

**Uses:** [`[PROPAGATE-TERM]`](PROPAGATE-TERM.md)

---

> [← README](README.md)
