[← Index](../README.md) | [< Previous](../README.md)

---

# Tasks

## Purpose

Development tasks with lifecycle tracking.

## How to Use

### Creating a Task

1. **Determine next task ID** — Check existing tasks for next number (T-001, T-002...)
2. **Create file** — In `registered/` folder: `T-NNN-title.md`
3. **Fill template** — Use [TEMPLATE-task.md](./TEMPLATE-task.md)
4. **Track relationships** — Link to blocking/enabling tasks

### Task Lifecycle

```
⬜ Registered    →  🔍 In Analysis  →  📋 Planned
        ↑                                    ↓
✅ Completed    ←  🔄 In Review   ←  🔵 In Development
        ↑
   🧩 Pending UI   ←   🛂 Change Control
```

### State Descriptions

| State | Emoji | Meaning |
|-------|-------|---------|
| Registered | ⬜ | Submitted, not started |
| In Analysis | 🔍 | Being analyzed |
| Planned | 📋 | Ready to start |
| Approved | 🟢 | Approved to implement |
| In Development | 🔵 | Currently implementing |
| In Review | 🔄 | Under review |
| Completed | ✅ | Implemented and verified |
| Blocked | 🚫 | Blocked by dependency |
| Pending UI | 🧩 | Waiting for UI integration |
| Change Control | 🛂 | Change control in progress |
| Archived | ⬛ | Cancelled or superseded |

### Relationships

When task references another:

| Type | Meaning |
|------|---------|
| blocking | Cannot proceed until referenced task completes |
| enables | Makes referenced task possible |
| derived from | Spawned from referenced task |
| complement | Works alongside referenced task |

---

## Folder Structure

| Folder | State |
|--------|-------|
| `registered/` | Submitted |
| `in-analysis/` | Being analyzed |
| `planned/` | Ready to start |
| `approved/` | Approved |
| `in-development/` | Working |
| `in-review/` | Under review |
| `completed/` | Done |
| `blocked/` | Blocked |
| `pending-ui/` | Waiting UI |
| `change-control/` | In change control |
| `archived/` | Cancelled |

---

## Templates

- [TEMPLATE-task.md](./TEMPLATE-task.md) — Task format

---

## Examples

### Creating a Task

```markdown
# Task: T-001-user-login-feature

## Summary
Implement user login with email/password.

## Context
Need authentication for mobile app.

## Proposal
- Create login endpoint
- Validate credentials
- Return JWT token

## State
⬜ Registered

## Verification
- Login returns 200 with token
- Invalid credentials return 401
```

### Relationship Example

```markdown
## Relationships
| Type | Reference |
|------|-----------|
| blocking | T-001 |
| enables | T-003 |
```

---

[← Index](../README.md) | [< Previous ../README.md)