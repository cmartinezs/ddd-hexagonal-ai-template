[← Index](./README.md)

---

# Validation Layers

## Purpose

Define where validation happens in each layer of the application.

> **Note**: This is a template. Define layers for your architecture.

---

## Layer Validation Strategy

| Layer | Type | When |
|-------|------|------|
| **API/Input** | Structural | Type, format, required |
| **Domain** | Business rules | Invariants |
| **Application** | Contextual | Uniqueness, preconditions |

---

## Example: By Architecture

### Layered Architecture

```
HTTP Layer     → @NotBlank, @Size, @Email (bean validation)
Domain Layer  → Value Objects with invariant checks
Use Case     → Contextual validation
```

### Hexagonal Architecture

```
Inbound Port  → Input DTOs (structural)
Domain       → Entities (business invariants)
Application → Use Cases (contextual)
Outbound     → Repository (persistence)
```

---

## Validation by Type

### Structural Validation

| Layer | Examples |
|-------|----------|
| API | @NotNull, @Size, @Pattern, @Email |
| DTO | Type casting, null checks |
| Request | Field presence |

### Business Validation

| Layer | Examples |
|-------|----------|
| Domain | Invariants in entities |
| Value Objects | Email format, positive amounts |
| Services | State transitions |

### Contextual Validation

| Layer | Examples |
|-------|----------|
| Use Case | Uniqueness, permissions, preconditions |
| Application | Cross-field validation |

---

[← Index](./README.md)