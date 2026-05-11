# 📚 Planning System — Glossary

> [← planning/README.md](README.md)

Operational vocabulary used in this planning system. For domain-specific DDD / Hexagonal Architecture terminology, see `01-templates/02-requirements/TEMPLATE-glossary.md`.

---

## Terms

### Planning
A self-contained unit of work inside the planning system. Each planning has a lifecycle (`INITIAL → EXPANSION → DEEPENING → COMPLETED`), its own folder, and its own term traceability matrix. It is **not** the same as an SDLC phase.

---

### Scope
A transversal work unit within a planning. Defined during the EXPANSION phase and detailed in a file under `02-deepening/`. Each scope targets a specific area of the repository (a phase template, a guide, a workflow file, etc.) and contains individual tasks with assigned workflows.

---

### Workflow
A defined sequence of steps for executing a specific type of task. Every task in a scope must specify which workflow governs its execution. See [`WORKFLOWS/README.md`](WORKFLOWS/README.md) for the full catalog.

---

### Sub-workflow
A reusable step sequence used inside multiple workflows. Called by embedding `[SUB-WORKFLOW-NAME]` within a workflow step. See [`WORKFLOWS/04-sub-workflows.md`](WORKFLOWS/04-sub-workflows.md).

---

### INITIAL
The first phase of a planning lifecycle. The planning exists as a general idea: what needs to be done, why, and approximate scope. No detailed dimensioning.

---

### EXPANSION
The second phase. All transversal scopes are identified, dependencies between them are mapped, and impact per SDLC phase is documented. The planning moves to `active/`.

---

### DEEPENING
The third phase. One file per scope under `02-deepening/`. Each file specifies detailed tasks with workflow types. This is where actual execution occurs.

---

### COMPLETED
The final state of a planning. All scopes are done, all traceability is updated, and the planning is archived in `finished/`. Documents are not modified after this point.

---

### Traceability
The process of registering how a term, decision, or concept affects each SDLC phase of the repository. Maintained in `TRACEABILITY.md` per planning and consolidated in `TRACEABILITY-GLOBAL.md`.

---

### PDR (Project Decision Record)
A record of a significant decision affecting multiple phases or the framework level (e.g., a naming convention change, a new glossary term). Stored in `planning/NNN-name/` folder. Different from an **ADR** (Architecture Decision Record), which is stored at `01-templates/06-development/` and documents technical implementation decisions.

---

### ADR (Architecture Decision Record)
A record of a technical decision affecting the architecture of a specific project being documented. Stored in `01-templates/06-development/`. Different from a **PDR**, which affects the template framework itself.

---

### Done Criteria
The set of conditions that must be met for a task or scope to be marked as completed. Each scope file includes its own Done Criteria section. Used by the `[EXECUTE-SCOPE]` sub-workflow.

---

### Inconsistency
A detected contradiction, ambiguity, or gap between two or more documents in the repository. Managed via the `RECORD-INCONSISTENCY` workflow and tracked as a residual if not immediately resolvable.

---

### Residual
A task or inconsistency that cannot be resolved in the current scope but is documented and deferred to a later planning or scope. Not the same as "blocked" — a residual is acknowledged and intentionally deferred.

---

### Bypass
A mechanism to skip the Fundamental Rule check and execute without a planning entry. Uses `--no-plan` (asks for confirmation) or `--no-plan-force` (executes directly). Should be used sparingly.

---

### Document Status
Each major document has a status badge (`Draft`, `In Review`, `Final`, `Obsolete`) to reflect its maturity. Format: `> **Status:** Draft`.

---

### SDLC Phase
One of the 12 documentation phases in this repository's framework (Discovery → Feedback). Represented by single-letter codes (`D`, `R`, `S`, `M`, `P`, `V`, `T`, `B`, `O`, `N`, `F`) in traceability matrices.

---

> [← planning/README.md](README.md)
