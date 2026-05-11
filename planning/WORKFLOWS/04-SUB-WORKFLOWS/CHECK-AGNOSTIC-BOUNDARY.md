# [CHECK-AGNOSTIC-BOUNDARY]

> [← README](README.md)

Verifies that a document targeting phases 1–5 contains no technology names, frameworks, protocols, or implementation patterns.

---

## Steps

1. Identify whether the target document belongs to phases 1–5 (discovery, requirements, design, data model, planning).
2. Scan for technology-specific terms: framework names, database names, programming languages, protocols, library names.
3. If any are found: list them and flag as a boundary violation.
4. For each violation: suggest a technology-agnostic equivalent (e.g., "REST API" → "service interface"; "PostgreSQL" → "relational data store").
5. Return: `OK` if clean, `VIOLATION` + list if not.

> **Note:** Violations in phases 6–11 are expected and acceptable.

---

**Called by:** [`GENERATE-DOCUMENT`](../02-EXECUTION-WORKFLOWS/GENERATE-DOCUMENT.md) · [`REVIEW-COHERENCE`](../02-EXECUTION-WORKFLOWS/REVIEW-COHERENCE.md) · [`EXPAND-ELEMENT`](../02-EXECUTION-WORKFLOWS/EXPAND-ELEMENT.md)

---

> [← README](README.md)
