# CASCADE-CHANGE

> [← README](README.md)

Executes a change that originated in one document but must be propagated to many other documents to maintain consistency.

---

```mermaid
flowchart TD
    A[Identify origin change] --> B[Identify all affected documents]
    B --> C[Order by source hierarchy]
    C --> D[For each affected doc: apply change]
    D --> E[[PROPAGATE-TERM]]
    E --> F[Run REVIEW-COHERENCE on all modified docs]
    F --> G[Update TRACEABILITY.md]
```

---

## Steps

1. Identify the original change (e.g., a term was renamed, a section was restructured).
2. Use grep to find all documents referencing the changed element.
3. Order affected documents by **source hierarchy** (see `GUIDE.md`) — most authoritative first.
4. Apply the change to each document in order.
5. Execute `[PROPAGATE-TERM]` if a term was renamed or redefined.
6. Execute `REVIEW-COHERENCE` on all modified files.
7. Update `TRACEABILITY.md` to document the cascade scope.

---

**Sub-workflows used:** [`[PROPAGATE-TERM]`](../04-SUB-WORKFLOWS/PROPAGATE-TERM.md) · [`[RESOLVE-CONFLICT]`](../04-SUB-WORKFLOWS/RESOLVE-CONFLICT.md)

**Leads to:** [`REVIEW-COHERENCE`](../02-EXECUTION-WORKFLOWS/REVIEW-COHERENCE.md)

---

> [← README](README.md)
