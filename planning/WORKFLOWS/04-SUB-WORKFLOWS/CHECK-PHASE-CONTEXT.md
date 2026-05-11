# [CHECK-PHASE-CONTEXT]

> [← README](README.md)

Verifies that the previous phase's output documents exist before generating a document for the current phase.

---

## Steps

1. Identify the target document's SDLC phase (e.g., requirements = phase 2).
2. Identify the preceding phase (e.g., phase 1 = discovery).
3. Check that at least one non-template document exists in the preceding phase's `data-output/` folder.
4. If no prior phase output exists: return `MISSING` + which phase needs to be done first.
5. If prior phase output exists: return `OK`.

---

**Called by:** [`GENERATE-DOCUMENT`](../02-EXECUTION-WORKFLOWS/GENERATE-DOCUMENT.md)

---

> [← README](README.md)
