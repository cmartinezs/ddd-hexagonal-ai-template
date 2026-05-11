# 🔩 Sub-workflows

> [← WORKFLOWS/README.md](README.md)

Reusable step sequences invoked within main workflows using `[SUB-WORKFLOW-NAME]` notation.

---

## [NEXT-SCOPE]

Identifies the next scope to be executed within the current planning's DEEPENING phase.

**Steps:**
1. Open the planning's `02-deepening/` directory and list all scope files.
2. Find the scope with the lowest sequence number that has status `PENDING`.
3. Check that all dependencies of that scope (if any) are `DONE`.
4. If dependencies are not done: find the next scope with satisfied dependencies.
5. Return the identified scope as the next to execute.

**Called by:** `ADVANCE-PLANNING`

---

## [EXECUTE-SCOPE]

Validates the done criteria of the current scope before advancing.

**Steps:**
1. Open the current scope file in `02-deepening/`.
2. Read the `Done Criteria` section.
3. For each criterion: verify it is satisfied (file exists, section is present, link is valid, etc.).
4. If all criteria are met: return `DONE`.
5. If any criterion is not met: list the unmet criteria and return `BLOCKED`.

**Called by:** `ADVANCE-PLANNING`

---

## [RESOLVE-CONFLICT]

Resolves a detected conflict between two documents by applying the source hierarchy rule.

**Steps:**
1. Identify document A and document B in conflict.
2. Apply the source hierarchy from `GUIDE.md` to determine which one has authority.
3. Update the lower-authority document to align with the authoritative one.
4. If both are at equal authority level: check document status (`Final` > `In Review` > `Draft`) and use the one with higher status.
5. Record the resolution in the current scope's task or in `TRACEABILITY.md`.

**Called by:** `RECORD-INCONSISTENCY`, `CASCADE-CHANGE`

---

## [APPLY-RESIDUAL-ABSORPTION]

Applies a previously deferred residual that has now been unblocked.

**Steps:**
1. Open the residual entry from `TRACEABILITY.md`.
2. Identify the documents it originally applied to.
3. Apply the change or resolution that the residual was waiting for.
4. Execute `REVIEW-COHERENCE` on the modified documents.
5. Mark the residual as `RESOLVED` and move it from the residuals section to the resolved section.

**Called by:** `RESIDUAL-VERIFICATION`

---

## [PROPAGATE-TERM]

Determines which SDLC phase codes in the traceability matrix are affected by a new or renamed term.

**Steps:**
1. Take the term or concept to propagate.
2. For each SDLC phase code (D, R, S, M, P, V, T, B, O, N, F, G, W):
   - Check if the term appears or should appear in that phase's documentation.
   - Mark: `✅` if present and correct, `⚠️` if present but inconsistent, `❌` if missing and needed, `N/A` if not applicable.
3. Update the traceability matrix row for that term.

**Called by:** `UPDATE-TRACEABILITY`, `CASCADE-CHANGE`

---

## [CHECK-AGNOSTIC-BOUNDARY]

Verifies that a document targeting phases 1–5 contains no technology names, frameworks, protocols, or implementation patterns.

**Steps:**
1. Identify whether the target document belongs to phases 1–5 (discovery, requirements, design, data model, planning).
2. Scan for technology-specific terms: framework names, database names, programming languages, protocols, library names.
3. If any are found: list them and flag as a boundary violation.
4. For each violation: suggest a technology-agnostic equivalent (e.g., "REST API" → "service interface"; "PostgreSQL" → "relational data store").
5. Return: `OK` if clean, `VIOLATION` + list if not.

**Called by:** `GENERATE-DOCUMENT`, `REVIEW-COHERENCE`, `EXPAND-ELEMENT`

**Note:** Violations in phases 6–11 are expected and acceptable.

---

## [CHECK-PHASE-CONTEXT]

Verifies that the previous phase's output documents exist before generating a document for the current phase.

**Steps:**
1. Identify the target document's SDLC phase (e.g., requirements = phase 2).
2. Identify the preceding phase (e.g., phase 1 = discovery).
3. Check that at least one non-template document exists in the preceding phase's `data-output/` folder.
4. If no prior phase output exists: return `MISSING` + which phase needs to be done first.
5. If prior phase output exists: return `OK`.

**Called by:** `GENERATE-DOCUMENT`

---

## [CHECK-TRACEABILITY]

Verifies that all new terms, concepts, and decisions introduced in the current task are registered in the traceability matrix.

**Steps:**
1. List all new terms or concepts introduced in this task's output.
2. Open `TRACEABILITY.md` for the current planning.
3. For each term: check if there is an entry in the matrix.
4. If any term is missing: add it immediately and execute `[PROPAGATE-TERM]`.
5. Return: `OK` if all terms are tracked, `MISSING` + list if not.

**Called by:** `ADVANCE-PLANNING`, `INTEGRATE-MILESTONE`, `UPDATE-TRACEABILITY`

---

## [VALIDATE-GLOSSARY]

Verifies that terminology used in a document matches the definitions in `GLOSSARY.md` and the project-level glossary (if it exists).

**Steps:**
1. Identify all domain terms used in the target document.
2. Compare each term against `planning/GLOSSARY.md` (system terms) and `01-templates/data-output/02-requirements/` glossary (project terms, if present).
3. Flag any term that is used with a definition inconsistent with the glossary.
4. Flag any term that is used but not defined in any glossary.
5. Return: `OK` if consistent, `INCONSISTENCY` + list if not.

**Called by:** `REVIEW-COHERENCE`, `EXPAND-ELEMENT`

---

## [CHECK-PHASE5-CHAIN]

Verifies that the five Phase 5 planning artifacts form a consistent, internally linked chain: Roadmap → Epics → Use Cases → Milestones → Issue Mapping.

**Steps:**
1. Open all Phase 5 output documents in `01-templates/data-output/05-planning/` (or the active output folder).
2. Verify that each Epic references at least one Roadmap capability.
3. Verify that each Use Case references at least one Epic.
4. Verify that each Milestone references at least one Epic and has a completion criterion.
5. Verify that the Issue Mapping table has an entry for each Milestone.
6. Verify that the Versioning Strategy (`TEMPLATE-016`) is referenced in at least one Milestone or Epic.
7. Check that no technology names appear anywhere in these documents (`[CHECK-AGNOSTIC-BOUNDARY]`).
8. Return: `OK` if all links and rules pass; `CHAIN-BREAK` + which link is broken if not.

**Called by:** `GENERATE-DOCUMENT` (Phase 5), `REVIEW-COHERENCE`

---

## [CHECK-DEVWORKFLOW-CONSISTENCY]

Verifies that the four dev workflow templates in `06-development/workflow/` are mutually consistent.

**Steps:**
1. Open all four sub-area files: `branches/`, `commits/`, `pull-requests/`, `cicd/`.
2. Verify that commit types referenced in `pull-requests/` match those defined in `commits/`.
3. Verify that branch names used in `cicd/` triggers match the strategy defined in `branches/`.
4. Verify that the PR merge strategy (squash/merge/rebase) is compatible with the branch strategy (GitFlow vs Trunk-Based).
5. Verify that CI/CD environment names (`dev`, `staging`, `prod` or equivalents) are used consistently across all four files.
6. Verify that all navigation links in these files are correct (no broken `[text](path)` references).
7. Return: `OK` if consistent; `INCONSISTENCY` + list if not.

**Called by:** `GENERATE-DOCUMENT` (Phase 6 workflow area), `REVIEW-COHERENCE`

---

## [CHECK-VERSIONING-ALIGNMENT]

Verifies that the versioning strategy defined in Phase 5 is consistently referenced in Phase 8 (Deployment) and Phase 11 (Feedback).

**Steps:**
1. Open the versioning strategy document in Phase 5 output and extract the version format (e.g., `MAJOR.MINOR.PATCH`), pre-release tags (e.g., `alpha`, `beta`), and release trigger rules.
2. Open Phase 8 (Deployment) output and verify:
   - Release tags follow the versioning format from Phase 5.
   - CI/CD pipeline has a stage or step for creating/tagging releases.
3. Open Phase 11 (Feedback) output and verify:
   - Retrospective or feedback templates reference version milestones.
4. Open Phase 6 dev workflow (`commits/`, `pull-requests/`) and verify:
   - Release commit types or PR labels align with versioning conventions.
5. Return: `OK` if aligned; `MISALIGNMENT` + what differs if not.

**Called by:** `GENERATE-DOCUMENT` (Phase 8), `REVIEW-COHERENCE`

---

> [← WORKFLOWS/README.md](README.md)
