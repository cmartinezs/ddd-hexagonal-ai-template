# 📋 Planning System Guide

> [← planning/README.md](README.md)

---

Detailed reference for the lifecycle, structure, and naming conventions of the planning system.

---

## 🔁 Planning Lifecycle

```mermaid
flowchart LR
    A[INITIAL\nUndimensioned idea] --> B[EXPANSION\nTransversal scopes]
    B --> C[DEEPENING\nTasks per scope]
    C --> D[COMPLETED]
```

| Phase | File(s) | Description |
|-------|---------|-------------|
| **INITIAL** | `00-initial.md` | General idea without dimensioning. What needs to be achieved, why, approximate context. Clarity of intent — not exhaustiveness. |
| **EXPANSION** | `01-expansion.md` | All transversal scopes are identified and listed. Dependencies between them are mapped. Impact per SDLC phase is documented. |
| **DEEPENING** | `02-deepening/` | One `.md` file per scope. Each one details its specific tasks with assigned workflow types. |

---

## 🗂️ Folder Structure per Planning

```
planning/
├── README.md                        # General index + plannings in INITIAL state
├── TRACEABILITY-GLOBAL.md           # Global consolidated term matrix
├── GUIDE.md                         # This file
├── GLOSSARY.md                      # Operational vocabulary
├── PROMPTING.md                     # AI prompting guidelines
├── _template/                       # Template for new plannings
│
├── NNN-planning-name/               # Plannings in INITIAL state (just created)
│   └── ...
│
├── active/                          # Plannings in EXPANSION or DEEPENING
│   ├── README.md                    # Index of in-progress plannings
│   └── NNN-planning-name/           # Moved here when INITIAL → EXPANSION
│       ├── README.md
│       ├── 00-initial.md
│       ├── 01-expansion.md
│       ├── 02-deepening/
│       │   ├── scope-01-[name].md
│       │   └── scope-NN-[name].md
│       └── TRACEABILITY.md
│
└── finished/                        # COMPLETED plannings (read-only / reference)
    ├── README.md                    # Index of archived plannings
    └── NNN-planning-name/           # Moved here when DEEPENING → COMPLETED
```

### Folder movement cycle

| State transition | Action |
|-----------------|--------|
| New planning | Create at root `planning/NNN-name/` |
| `INITIAL` → `EXPANSION` | Move `planning/NNN-name/` → `planning/active/NNN-name/` |
| `DEEPENING` → `COMPLETED` | Move `planning/active/NNN-name/` → `planning/finished/NNN-name/` |

---

## 🔗 Term Traceability

Each planning has its local `TRACEABILITY.md` with its own terms mapped against the SDLC phases of the repository.

The [`TRACEABILITY-GLOBAL.md`](TRACEABILITY-GLOBAL.md) consolidates all terms from all plannings into a single view.

The **macro structures** (columns of the matrix) are the documentation sections of the repository:

| Code | SDLC Phase / Section |
|------|---------------------|
| `D` | `01-templates/01-discovery/` |
| `R` | `01-templates/02-requirements/` |
| `S` | `01-templates/03-design/` |
| `M` | `01-templates/04-data-model/` |
| `P` | `01-templates/05-planning/` |
| `V` | `01-templates/06-development/` |
| `T` | `01-templates/07-testing/` |
| `B` | `01-templates/08-deployment/` |
| `O` | `01-templates/09-operations/` |
| `N` | `01-templates/10-monitoring/` |
| `F` | `01-templates/11-feedback/` |
| `G` | `00-guides-and-instructions/` |
| `W` | `planning/` |

---

## 📌 Naming Conventions

- File and folder names are in **English**, in **kebab-case**.
- Plannings are numbered sequentially: `001-`, `002-`, etc.
- The name describes the topic: `001-planning-system-bootstrap`
- Scopes inside `02-deepening/` follow the same pattern: `scope-01-name.md`
- Content inside files may be in any language the team uses.

---

## 🔑 Source Hierarchy

When a conflict exists between phases, this order of authority applies (most authoritative first):

```
01-discovery > 02-requirements > 03-design > 04-data-model > 05-planning
> 06-development > 07-testing > 08-deployment > 09-operations > 10-monitoring > 11-feedback
```

- At equal hierarchy level: the document with the higher status wins, then the most recently updated.
- An active PDR overrides any content document for the element it covers.

---

## 🗺️ Two Distinct Planning Domains — Do Not Confuse

This repository contains two separate "planning" concepts. They must never be conflated:

| Domain | Location | What it is |
|--------|----------|------------|
| **Meta-planning system** | `planning/` (this folder) | Tracks HOW documentation work is managed in this repo. Controls agent workflow. Contains plannings, scopes, traceability matrices, PDRs. |
| **Project planning (Phase 5)** | `01-templates/05-planning/` | Documents the PRODUCT's roadmap, epics, milestones, versioning, and issue tracking. Part of the SDLC for the project being documented. |
| **Dev workflow (Phase 6)** | `01-templates/06-development/workflow/` | Documents git workflow, branch strategy, commit conventions, PRs, and CI/CD for the project being documented. |

### When you are in the meta-planning system (`planning/`)

You are managing documentation work. Tasks here are:
- Creating and advancing plannings (ADVANCE-PLANNING, CREATE-PLANNING)
- Generating SDLC phase outputs (GENERATE-DOCUMENT)
- Maintaining traceability (UPDATE-TRACEABILITY)
- Resolving inconsistencies (RECORD-INCONSISTENCY)

These tasks operate on the templates and output files in `01-templates/`.

### When you are in Phase 5 project planning (`01-templates/05-planning/`)

You are documenting the product's delivery plan. The output is customer-facing or team-facing planning documentation:
- Product roadmap
- Epics and user stories
- Milestones with acceptance criteria
- Versioning strategy
- Issue tracking map

These documents describe **what the software project will deliver and when**, not how this documentation repo is managed.

### When you are in Phase 6 dev workflow (`01-templates/06-development/workflow/`)

You are documenting the team's engineering practices: git strategy, commit conventions, PR rules, and CI/CD configuration. These are **technology-specific** and form one cohesive system (see `[CHECK-DEVWORKFLOW-CONSISTENCY]`).

---

> [← planning/README.md](README.md)
