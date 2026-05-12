# 📋 Planning

Central directory for all project plannings. Every planning follows a three-phase lifecycle and maintains its own term traceability matrix.

> For detailed structure, lifecycle, and naming conventions, see [`GUIDE.md`](GUIDE.md).

---

## 🚨 Fundamental Rule

> **Nothing is executed without being inside a planning.**

Before performing any action in this repository — generating a phase document, modifying a template, refactoring a guide, updating a process — there must be a task in a scope of an active planning that covers it.

### Bypass Parameters

When a prompt contains one of these parameters (at the start or end):

| Parameter | Behavior |
|-----------|----------|
| `--no-plan` | Ask: *"Are you sure you want to proceed without a planning entry?"*. If confirmed → execute. If not → do nothing. |
| `--no-plan-force` | Execute directly without asking or planning. |

**If something is requested that is not in any planning (and without a bypass parameter):**
1. Stop execution.
2. Ask: is this part of an existing planning or a new one?
3. If part of an existing one → identify which scope and task it belongs to, and wait for the flow to reach it.
4. If it's new → create the planning (at minimum the Initial phase) before executing.

---

## 📂 Plannings

> **In progress** (EXPANSION / DEEPENING): [`active/`](active/README.md) · **Completed**: [`finished/`](finished/README.md)

### 🌱 INITIAL

*No plannings in INITIAL state.*

### 🚧 In Progress → see [`active/README.md`](active/README.md)

| ID | Name | Phase |
|----|------|-------|
| [006](active/006-archon-cli/README.md) | Archon CLI | EXPANSION |

### ✅ Completed → see [`finished/README.md`](finished/README.md)

| ID | Name |
|----|------|
| [001](finished/001-planning-system-bootstrap/README.md) | Planning System Bootstrap |
| [002](finished/002-workflow-integration/README.md) | Workflow Integration |
| [003](finished/003-tutorial-full-cycle/README.md) | Tutorial: Full Cycle (URL Shortener) |
| [004](finished/004-tutorial-taskflow-completion/README.md) | Tutorial: TaskFlow Completion |

---

## 🔄 Workflows

Every task within a planning follows a defined workflow. The complete catalog of workflows and sub-workflows is in [`WORKFLOWS/README.md`](WORKFLOWS/README.md).

Workflow types are referenced in the **Workflow** field of each task within a scope.

For the vocabulary of the planning system, see the **[`GLOSSARY.md`](GLOSSARY.md)** — operational glossary (planning, scope, workflow, PDR, done, etc.).

---
