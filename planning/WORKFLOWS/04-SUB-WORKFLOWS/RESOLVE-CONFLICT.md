# [RESOLVE-CONFLICT]

> [← README](README.md)

Resolves a detected conflict between two documents by applying the source hierarchy rule.

---

## Steps

1. Identify document A and document B in conflict.
2. Apply the source hierarchy from `GUIDE.md` to determine which one has authority.
3. Update the lower-authority document to align with the authoritative one.
4. If both are at equal authority level: check document status (`Final` > `In Review` > `Draft`) and use the one with higher status.
5. Record the resolution in the current scope's task or in `TRACEABILITY.md`.

---

**Called by:** [`RECORD-INCONSISTENCY`](../03-MAINTENANCE-WORKFLOWS/RECORD-INCONSISTENCY.md) · [`CASCADE-CHANGE`](../03-MAINTENANCE-WORKFLOWS/CASCADE-CHANGE.md)

---

> [← README](README.md)
