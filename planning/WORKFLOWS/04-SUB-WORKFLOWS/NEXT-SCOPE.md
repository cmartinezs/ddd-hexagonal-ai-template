# [NEXT-SCOPE]

> [← README](README.md)

Identifies the next scope to be executed within the current planning's DEEPENING phase.

---

## Steps

1. Open the planning's `02-deepening/` directory and list all scope files.
2. Find the scope with the lowest sequence number that has status `PENDING`.
3. Check that all dependencies of that scope (if any) are `DONE`.
4. If dependencies are not done: find the next scope with satisfied dependencies.
5. Return the identified scope as the next to execute.

---

**Called by:** [`ADVANCE-PLANNING`](../01-PLANNING-WORKFLOWS/ADVANCE-PLANNING.md)

---

> [← README](README.md)
