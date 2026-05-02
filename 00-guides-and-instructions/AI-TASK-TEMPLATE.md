[← Index](./README.md)

---

# AI Task Template

This template standardizes how tasks are given to AI agents to ensure high-quality, traceable, and non-generic outputs.

## Purpose

Prevent vague prompts and enforce structured, context-rich AI execution.

---

## Task Structure

Use this format for ALL non-trivial AI tasks.

```markdown
# Context
[Describe the project, domain, and relevant phase]

# Objective
[What must be produced — document, analysis, refactor, etc.]

# Inputs
[List existing documents, files, or assumptions]

# Constraints
- Phase discipline (agnostic vs specific)
- Architecture rules (DDD, hexagonal)
- Any technical or business constraints

# Expected Output
[Describe structure, format, and level of detail]

# Validation
- Traceability check
- Non-generic output
- Consistency with previous phases

# Notes
[Any additional clarifications]
```

---

## Example

```markdown
# Context
We are in Phase 2 — Requirements.
Discovery phase is already completed.

# Objective
Generate Functional Requirements (RF).

# Inputs
- discovery/vision.md
- discovery/actors.md

# Constraints
- No technology names
- Must be business-focused

# Expected Output
- RF list with description and rationale

# Validation
- Each RF must trace to discovery
- No generic requirements
```

---

## Rules

- Never skip sections
- Never provide low-context prompts
- Prefer over-specification over ambiguity
- Always include validation criteria

---

[← Index](./README.md)
