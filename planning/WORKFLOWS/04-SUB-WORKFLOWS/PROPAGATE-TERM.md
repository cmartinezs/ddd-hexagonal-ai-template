# [PROPAGATE-TERM]

> [← README](README.md)

Determines which SDLC phase codes in the traceability matrix are affected by a new or renamed term.

---

## Steps

1. Take the term or concept to propagate.
2. For each SDLC phase code (D, R, S, M, P, V, T, B, O, N, F, G, W):
   - Check if the term appears or should appear in that phase's documentation.
   - Mark: `✅` if present and correct, `⚠️` if present but inconsistent, `❌` if missing and needed, `N/A` if not applicable.
3. Update the traceability matrix row for that term.

---

**Called by:** [`UPDATE-TRACEABILITY`](../03-MAINTENANCE-WORKFLOWS/UPDATE-TRACEABILITY.md) · [`CASCADE-CHANGE`](../03-MAINTENANCE-WORKFLOWS/CASCADE-CHANGE.md)

---

> [← README](README.md)
