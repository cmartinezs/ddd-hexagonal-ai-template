[← Index](./README.md)

---

# Naming Conventions Template

## Purpose

Complete template for defining project naming conventions.

## Template

```markdown
# Naming Conventions: [Project Name]

## Variables

| Type | Convention | Example |
|------|------------|---------|
| Regular variables | camelCase | userName |
| Constants | SCREAMING_SNAKE | MAX_RETRY_COUNT |
| Boolean variables | is/has/can + noun | isActive |
| List variables | plural noun | users |
| Map/set | plural noun + type | userMap, roleSet |

## Functions

| Type | Convention | Example |
|------|------------|---------|
| Regular functions | camelCase | getUserById |
| Private functions | underscore prefix | _internalHelper |
| Async functions | async suffix | fetchUsers |

## Classes and Types

| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | UserService |
| Interfaces | PascalCase + er/able | UserRepository |
| Abstract classes | Abstract prefix | AbstractRepository |
| Exceptions | Exception suffix | ValidationException |

## Files

| Type | Convention | Example |
|------|------------|---------|
| Source files | [module]-[type].ext | user_service.ts |
| Test files | [module].[type].test.ext | user_service.test.ts |
| Type files | [module].types.ts | user_types.ts |

## Database

| Type | Convention | Example |
|------|------------|---------|
| Tables | plural snake_case | user_profiles |
| Columns | snake_case | created_at |
| Primary keys | id or [table]_id | id, user_id |
| Indexes | idx_[table]_[column] | idx_users_email |
```

---

[← Index](./README.md)