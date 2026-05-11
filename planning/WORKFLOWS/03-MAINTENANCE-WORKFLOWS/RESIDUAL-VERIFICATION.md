# RESIDUAL-VERIFICATION

> [← README](README.md)

Checks if a previously deferred residual can now be resolved, given new work completed in subsequent scopes or plannings.

---

```mermaid
flowchart TD
    A[List open residuals from TRACEABILITY.md] --> B{Any residuals pending?}
    B -- No --> Z[Done: no residuals to verify]
    B -- Yes --> C[For each residual: check if blocker is resolved]
    C --> D{Blocker resolved?}
    D -- No --> E[Maintain residual status, update notes]
    D -- Yes --> F[[APPLY-RESIDUAL-ABSORPTION]]
    F --> G[Remove from residuals, mark resolved]
```

---

## Steps

1. Open `TRACEABILITY.md` and list all rows with residual status.
2. For each residual: check if the blocker condition mentioned in the notes has been resolved by recent work.
3. If still blocked: update notes with current status and move on.
4. If unblocked: execute `[APPLY-RESIDUAL-ABSORPTION]` sub-workflow.
5. Update `TRACEABILITY.md` — remove from residual section, mark as resolved.

---

**Sub-workflows used:** [`[APPLY-RESIDUAL-ABSORPTION]`](../04-SUB-WORKFLOWS/APPLY-RESIDUAL-ABSORPTION.md)

---

> [← README](README.md)
