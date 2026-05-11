# 📋 Planning Workflows

> [← WORKFLOWS/README.md](README.md)

Core workflows for managing the planning system lifecycle itself.

---

## ADVANCE-PLANNING

Advances a planning from its current scope to the next. Used when the current scope in DEEPENING is complete and the next scope must begin.

```mermaid
flowchart TD
    A[Check current scope status] --> B{All tasks done?}
    B -- No --> Z[Stop: resolve pending tasks first]
    B -- Yes --> C[[EXECUTE-SCOPE]]
    C --> D[Update scope status to DONE]
    D --> E[[CHECK-TRACEABILITY]]
    E --> F[[NEXT-SCOPE]]
    F --> G{More scopes?}
    G -- Yes --> H[Set next scope to IN PROGRESS]
    G -- No --> I[Execute MILESTONE-FEEDBACK]
    I --> J[Execute AUDIT-PLANNING]
    J --> K[Move planning to finished/]
```

### Steps

1. Verify all tasks in the current scope are completed (outputs exist, criteria met).
2. Execute `[EXECUTE-SCOPE]` sub-workflow to validate done criteria.
3. Mark current scope as `DONE` in its file.
4. Execute `[CHECK-TRACEABILITY]` — ensure all new terms/decisions are recorded.
5. Execute `[NEXT-SCOPE]` sub-workflow to identify the next pending scope.
6. If more scopes remain: set next scope to `IN PROGRESS`, proceed.
7. If no more scopes: execute `MILESTONE-FEEDBACK` → `AUDIT-PLANNING` → archive.

---

## CREATE-PLANNING

Creates a new planning from scratch. Used when a new body of work needs to be tracked that is not covered by any existing active planning.

```mermaid
flowchart TD
    A[Define planning intent] --> B[Copy _template/ to planning/NNN-name/]
    B --> C[Fill 00-initial.md with scope and why]
    C --> D{Dimensioning ready?}
    D -- No --> E[Stop at INITIAL: document intent only]
    D -- Yes --> F[Fill 01-expansion.md with all scopes]
    F --> G[Move to planning/active/NNN-name/]
    G --> H[Create 02-deepening/ with one file per scope]
    H --> I[Update planning/README.md index]
    I --> J[Update planning/active/README.md]
```

### Steps

1. Define the intent of the planning in a short statement (what + why).
2. Copy `planning/_template/` to `planning/NNN-name/`.
3. Fill `00-initial.md` — captures purpose, approximate scope, and initiator.
4. If there is enough clarity:
   - Fill `01-expansion.md` — list all transversal scopes and dependencies.
   - Move folder to `planning/active/NNN-name/`.
   - Create `02-deepening/scope-NN-name.md` for each scope.
5. If not enough clarity: stop at INITIAL. Return to CREATE-PLANNING later.
6. Update `planning/README.md` (INITIAL table or active link).
7. Update `planning/active/README.md` index.

---

> [← WORKFLOWS/README.md](README.md)
