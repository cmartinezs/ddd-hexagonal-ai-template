# [EXECUTE-SCOPE]

> [← README](README.md)

Validates the done criteria of the current scope before advancing.

---

## Steps

1. Open the current scope file in `02-deepening/`.
2. Read the `Done Criteria` section.
3. For each criterion: verify it is satisfied (file exists, section is present, link is valid, etc.).
4. If all criteria are met: return `DONE`.
5. If any criterion is not met: list the unmet criteria and return `BLOCKED`.

---

**Called by:** [`ADVANCE-PLANNING`](../01-PLANNING-WORKFLOWS/ADVANCE-PLANNING.md)

---

> [← README](README.md)
