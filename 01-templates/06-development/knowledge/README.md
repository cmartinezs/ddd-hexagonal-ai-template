[← Index](../README.md)

---

# Knowledge

## Purpose

Centralized knowledge base: development tasks, lessons learned, and detected inconsistencies.

> **Note**: This is a template. Use to track work and capture learnings.

## What's Here

| Section | Description |
|---------|-------------|
| [tasks](./tasks/) | Development tasks with lifecycle tracking |
| [lessons](./lessons/) | Lessons learned by category |
| [inconsistencies](./inconsistencies/) | Doc-code inconsistencies |

---

## How to Use

### Tasks

Use for tracking development work. Each task has a lifecycle:

```
Registered → In Analysis → Planned → Approved → In Development → In Review → Completed
```

**When to create a task:**
- New feature implementation
- Bug fix requiring tracking
- Refactoring with impact

**Workflow:**
1. Create task in `tasks/registered/T-NNN-title.md`
2. Move to appropriate folder as state changes
3. Include relationships to other tasks

See [TEMPLATE-task.md](./tasks/TEMPLATE-task.md) for format.

### Lessons Learned

Use for recording patterns and decisions:

**When to add a lesson:**
- After completing a task with errors
- When a bug is found
- When a better pattern is identified

**Categories:**
- domain — Domain patterns
- api — REST, OpenAPI
- persistence — Database, migrations
- tests — Testing, coverage
- security — Auth, authorization
- tools — CLI, build

See [TEMPLATE-lesson.md](./lessons/TEMPLATE-lesson.md) for format.

### Inconsistencies

Use for tracking doc-code mismatches:

**When to create:**
- Documentation doesn't match code
- Database schema differs from models

---

## Folder Structure

```
knowledge/
├── tasks/
│   ├── TEMPLATE-task.md
│   ├── registered/      # Submitted tasks
│   ├── in-analysis/    # Being analyzed
│   ├── planned/        # Ready to start
│   ├── in-development # Currently working
│   ├── in-review/      # Under review
│   ├── completed/     # Done
│   └── archived/      # Cancelled
├── lessons/
│   ├── TEMPLATE-lesson.md
│   ├── domain.md
│   ├── api.md
│   ├── persistence.md
│   ├── tests.md
│   ├── security.md
│   └── tools.md
└── inconsistencies/
    └── README.md
```

---

[← Index](../README.md)