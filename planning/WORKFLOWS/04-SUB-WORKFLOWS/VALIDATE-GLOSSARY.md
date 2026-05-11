# [VALIDATE-GLOSSARY]

> [← README](README.md)

Verifies that terminology used in a document matches the definitions in `GLOSSARY.md` and the project-level glossary (if it exists).

---

## Steps

1. Identify all domain terms used in the target document.
2. Compare each term against `planning/GLOSSARY.md` (system terms) and `01-templates/data-output/02-requirements/` glossary (project terms, if present).
3. Flag any term that is used with a definition inconsistent with the glossary.
4. Flag any term that is used but not defined in any glossary.
5. Return: `OK` if consistent, `INCONSISTENCY` + list if not.

---

**Called by:** [`REVIEW-COHERENCE`](../02-EXECUTION-WORKFLOWS/REVIEW-COHERENCE.md) · [`EXPAND-ELEMENT`](../02-EXECUTION-WORKFLOWS/EXPAND-ELEMENT.md)

---

> [← README](README.md)
