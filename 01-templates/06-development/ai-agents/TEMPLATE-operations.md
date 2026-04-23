[← Index](./README.md)

---

# AI Agent Operations Template

## Purpose

Template for documenting common AI agent operations per project.

> **Note**: Adapt to your language, framework, and tooling.

---

## Navigation Rules

### By Indices

Documentation is hierarchical. Before opening a document:

1. **Read folder README** — Find if it's the right document
2. **Ask for starting point** — If user doesn't specify
3. **Don't open files blindly** — Use indices

### Index Maintenance

New documentation must follow:

- **New file in existing folder** → Update folder README.md
- **New folder** → Create README.md with index
- **New top-level section** → Update master README

---

## Search Operations

### File Search

```bash
# Find by extension
glob "**/*.java"
glob "**/*.ts"
glob "**/*.py"

# Find by pattern in content
grep "pattern" --include "*.md"
grep "function" --include "*.js"
```

### Reading Files

```bash
# Read single file
read "path/to/file.md"

# Read with offset (for large files)
read "file.md" --offset 50

# Read range
read "file.md" --limit 30
```

---

## Project Patterns

### Adding New Feature

```
1. domain/          → Create domain model
2. application/     → Create use case
3. infrastructure/  → Create repository adapter
4. api/            → Create controller + DTOs
5. tests/           → Add tests
6. docs/           → Update documentation
```

### Adding New API Endpoint

```
1. Create request DTO
2. Create response DTO
3. Add controller endpoint
4. Add validation
5. Update OpenAPI spec
6. Add frontend guide (if UI affected)
```

### Adding Database Migration

```
1. Create migration file
2. Update data-model.md
3. Update entity-relationships.md
```

---

## Build Commands

### By Language

| Language | Build | Test | Run |
|----------|-------|------|-----|
| Java/Maven | `./mvnw clean package` | `./mvnw test` | `./mvnw spring-boot:run` |
| JavaScript | `npm run build` | `npm test` | `npm run dev` |
| Python | `pip install -e .` | `pytest` | `python -m app` |
| Go | `go build` | `go test ./...` | `go run main.go` |

---

## Common Operations

### Before Writing Code

1. ✅ Find existing patterns
2. ✅ Check coding standards
3. ✅ Verify dependencies
4. ✅ Create plan
5. ✅ Wait for approval

### After Completing

1. ✅ Update documentation
2. ✅ Maintain indices
3. ✅ Run tests
4. ✅ Report to user

---

## Task Documentation

### Plan Format

```markdown
# Task: T-NNN-slug

## Requirement
What needs to be done.

## Solution
Proposed approach.

## Steps
1. Step 1 [PENDING]
2. Step 2 [PENDING]

## Verification
How to verify it works.
```

### RFC Format (for large changes)

```markdown
# RFC: Title

## Context
Background and motivation.

## Proposal
What, how, where.

## Impact
Modules, migrations, docs.

## Acceptance Criteria
How to verify.
```

---

## Checklist

- [ ] Read relevant docs first
- [ ] Follow coding standards
- [ ] Use existing patterns
- [ ] Write tests
- [ ] Update documentation
- [ ] Maintain indices
- [ ] Wait for approval

---

[← Index](./README.md)