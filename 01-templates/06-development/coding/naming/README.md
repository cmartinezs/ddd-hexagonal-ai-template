[← Index../README.md) | [< Anterior](../patterns/README.md)

---

# Naming Conventions

## Description

Consistent naming across the codebase.

## Conventions

### Variables

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName`, `isActive` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES` |
| Boolean | is/has/can + noun | `isValid`, `hasPermission` |
| Lists | plural noun | `users`, `items` |

### Functions

| Type | Convention | Example |
|------|------------|---------|
| Functions | camelCase | `getUserById` |
| Methods | camelCase | `user.save()` |
| Private | underscore prefix | `_internalFunction` |

### Classes and Types

| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | `UserService` |
| Interfaces | PascalCase + er/able | `UserRepository` |
| Structs/Records | PascalCase | `UserRequest` |

### Files

| Type | Convention | Example |
|------|------------|---------|
| General | snake_case or kebab-case | `user_service.ts`, `user-service.ts` |
| Tests | same + _test | `user_service_test.ts` |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-conventions.md` — Full conventions template

---

[← Index](../README.md) | [< Anterior](../patterns/README.md)