# 🎯 Prompting Guidelines

> [← planning/README.md](README.md)

Guidelines for writing effective prompts when using AI agents (Copilot, Claude, etc.) in the context of this planning system.

---

## Foundational Principle

> **Give context → assign scope → specify output → define constraints.**

A good prompt does not just say what to do. It tells the AI:
- **why** it's needed (context from the planning)
- **what specific thing** must be produced (file, section, template)
- **which constraints** must be respected (agnostic boundary, naming, format)
- **what success looks like** (done criteria)

---

## Prompt Structure Template

```
Context: [Brief description of the planning and current scope]
Task: [Exactly what needs to be produced or modified]
Constraints:
  - [Constraint 1: e.g., "No technology names in phases 1-5"]
  - [Constraint 2: e.g., "Follow DOCUMENT-STRUCTURE-STANDARD.md format"]
  - [Constraint 3: e.g., "Update cross-references in X, Y, Z files"]
Done when:
  - [Criterion 1]
  - [Criterion 2]
```

---

## General Rules

### 1. Reference the planning before executing
Every prompt should name the active planning and scope it belongs to. This helps the AI understand the wider intent.

> ✅ *"As part of planning 002-requirements-revamp, scope-03-glossary: create the glossary template…"*
>
> ❌ *"Create a glossary template."*

---

### 2. Be explicit about the agnostic boundary
When working on phases 1–5, always include:
> *"Do not mention technology names, frameworks, libraries, or implementation patterns. This is an agnostic phase."*

---

### 3. Specify the target document and section
Vague prompts lead to vague results. Name the exact file and section.

> ✅ *"In `01-templates/02-requirements/TEMPLATE-glossary.md`, section `## Domain Terms`, add…"*
>
> ❌ *"Update the glossary."*

---

### 4. Include the done criteria explicitly
End the prompt with a short list of what must be true for the task to be considered complete.

---

### 5. Use workflow names as triggers
When the prompt should trigger a full workflow, name it explicitly:

> *"Execute GENERATE-DOCUMENT for the requirements glossary template using DOCUMENT-STRUCTURE-STANDARD.md as format reference."*

---

### 6. Cascade prompts for long chains
If the task involves a cascade (e.g., renaming a term across 5 files), split into individual prompts per file, or use `CASCADE-CHANGE` workflow explicitly.

---

### 7. For inconsistencies, use RECORD-INCONSISTENCY
If you discover a contradiction while reviewing, use:
> *"Record an inconsistency: [description]. Mark it as residual if not immediately resolvable."*

---

## Prompt Library (Reusable)

### Advance to next scope

```
Context: Planning [NNN-name], current scope is [scope-NN], status DONE.
Task: Execute [NEXT-SCOPE] sub-workflow. Verify all scope done criteria are met,
      update TRACEABILITY.md, and identify the next scope to execute.
```

---

### Generate a new document from template

```
Context: Planning [NNN-name], scope [NN-name].
Task: Execute GENERATE-DOCUMENT workflow for [document name].
      Use `01-templates/XX-phase/TEMPLATE-YYY-[name].md` as base.
      Output goes to `01-templates/data-output/XX-phase/[name].md`.
Constraints:
  - [Agnostic boundary if phase 1-5]
  - Follow DOCUMENT-STRUCTURE-STANDARD.md
  - Include navigation links at top and bottom
Done when:
  - File exists at the correct output path
  - Navigation links are correct
  - Metadata block is complete
  - All sections have "What This Section Is" intro
```

---

### Review coherence after changes

```
Context: Planning [NNN-name]. Scope [NN-name] just completed document [X].
Task: Execute REVIEW-COHERENCE workflow.
      Check cross-references from [list of related documents].
      Update links and terminology as needed.
Done when:
  - No broken links found
  - All cross-references point to correct current paths
  - Terminology matches GLOSSARY.md
```

---

### Update traceability

```
Context: Planning [NNN-name]. New term/concept "[term]" was introduced.
Task: Execute UPDATE-TRACEABILITY workflow.
      Map "[term]" across the traceability matrix in TRACEABILITY.md.
      Mark which SDLC phase codes (D, R, S, M, P, V, T, B, O, N, F, G, W) are affected.
      If globally significant, update TRACEABILITY-GLOBAL.md.
```

---

### Audit a completed planning

```
Context: Planning [NNN-name] is about to be archived.
Task: Execute AUDIT-PLANNING workflow.
      Verify all scopes are DONE, all tasks have outputs, traceability is updated,
      no open inconsistencies, no pending residuals.
      If all checks pass, move to `planning/finished/`.
```

---

### Generate a Phase 5 (Planning) document

```
Context: Planning [NNN-name], scope [NN-name]. Working on Phase 5 product planning.
Task: Execute GENERATE-DOCUMENT for [roadmap | epics | use-cases | milestones | versioning | issue-mapping].
      Use `01-templates/05-planning/TEMPLATE-0NN-[name].md` as base.
      Output goes to `01-templates/data-output/05-planning/[name].md`.
Constraints:
  - STRICTLY agnostic — no technology names, frameworks, or databases allowed.
  - Phase 3 (design) and Phase 2 (requirements) outputs must exist before writing.
  - Use [CHECK-PHASE5-CHAIN] to verify the roadmap→epics→use-cases→milestones→issue-mapping chain after writing.
  - Follow DOCUMENT-STRUCTURE-STANDARD.md formatting.
Done when:
  - File exists at the correct output path.
  - No technology names are present.
  - Document references its predecessor in the chain (e.g., epics reference roadmap capabilities).
  - [CHECK-AGNOSTIC-BOUNDARY] returns OK.
  - [CHECK-PHASE5-CHAIN] returns OK (if entire chain is present).
```

---

### Generate a Phase 6 Dev Workflow document

```
Context: Planning [NNN-name], scope [NN-name]. Working on Phase 6 dev workflow configuration.
Task: Execute GENERATE-DOCUMENT for [branches | commits | pull-requests | cicd].
      Use `01-templates/06-development/workflow/[area]/README.md` as base.
      Populate with the project's specific conventions and tool choices.
Constraints:
  - Technology-specific content is expected (git, GitHub Actions, ArgoCD, etc.).
  - All four sub-areas (branches, commits, pull-requests, cicd) must be mutually consistent.
  - Navigation links must follow the convention: [← Index](../README.md) | [< Previous](../X/README.md) | [Next >](../Y/README.md)
  - Run [CHECK-DEVWORKFLOW-CONSISTENCY] after producing all four files.
Done when:
  - All four files exist and are populated.
  - Branch strategy matches PR merge strategy.
  - Commit types match PR labels.
  - CI/CD environments match deployment phase environments.
  - [CHECK-DEVWORKFLOW-CONSISTENCY] returns OK.
  - Navigation links are correct and working.
```

---

### Verify Phase 5 chain consistency

```
Context: All Phase 5 documents have been produced or modified.
Task: Execute [CHECK-PHASE5-CHAIN] sub-workflow.
      Verify roadmap → epics → use-cases → milestones → issue-mapping chain.
      Report any broken links in the chain or missing cross-references.
Done when:
  - Each Epic references a Roadmap capability.
  - Each Use Case references an Epic.
  - Each Milestone references an Epic.
  - Issue Mapping covers all Milestones.
  - Versioning strategy is referenced.
  - [CHECK-PHASE5-CHAIN] returns OK.
```

---

### Verify dev workflow consistency

```
Context: One or more dev workflow files (branches/commits/pull-requests/cicd) have been modified.
Task: Execute [CHECK-DEVWORKFLOW-CONSISTENCY] sub-workflow.
      Check for inconsistencies between branch strategy, commit types, PR merge strategy, and CI/CD environments.
Done when:
  - All four areas are mutually consistent.
  - [CHECK-DEVWORKFLOW-CONSISTENCY] returns OK.
```

---

> [← planning/README.md](README.md)
