[← Index](./README.md)

---

# Package Structure

## Purpose

Define how code is organized in packages/modules.

> **Note**: This is a template. Adapt to your architecture.

## Core Principle

> Organize by **feature**, not by **layer**.

---

## By Language

### Java/Kotlin

```
src/main/java/com/example/app/
├── user/
│   ├── controller/
│   ├── usecase/
│   ├── domain/
│   └── infrastructure/
└── shared/
```

### JavaScript/TypeScript

```
src/
├── features/
│   ├── user/
│   └── auth/
├── shared/
└── app.ts
```

### Python

```
src/
├── user/
└── shared/
```

### Go

```
internal/
├── user/
└── shared/
```

---

## By Architecture

### Hexagonal

| Layer | Folder |
|------|--------|
| API | controller, dto |
| Application | usecase |
| Domain | entity, value |
| Infrastructure | adapter, repository |

### Clean Architecture

```
src/
├── domain/        # Business rules
├── application/  # Use cases
├── infrastructure/
└── presentation/
```

---

## Naming by Type

| Type | Suffix | Example |
|------|--------|---------|
| Use Case | UseCase | CreateUserUseCase |
| Controller | Controller | UserController |
| Port | Port | UserPort |
| Repository | Repository | UserRepository |
| DTO | Request/Response | UserResponse |
| Exception | Exception | UserException |

---

[← Index](./README.md)