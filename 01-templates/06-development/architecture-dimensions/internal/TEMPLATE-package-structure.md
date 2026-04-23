[← Index](./README.md)

---

# Package Structure Template

## Purpose

Template for defining package structure.

## Template

```markdown
# Project: [Project Name]

## Package Structure

src/
├── domain/                    # Pure business logic
│   ├── [Aggregate1]/
│   │   ├── [Aggregate1].ts    # Aggregate root
│   │   ├── [Entity].ts        # Entity
│   │   └── events/           # Domain events
│   ├── [Aggregate2]/
│   ├── value-objects/
│   │   ├── Email.ts
│   │   └── UserId.ts
│   └── services/             # Domain services
│
├── application/             # Use cases orchestration
│   ├── use-cases/
│   │   ├── CreateUserUseCase.ts
│   │   └── AuthenticateUserUseCase.ts
│   └── ports/              # Input/output interfaces
│       ├── input/          # Primary ports
│       │   └── IUserService.ts
│       └── output/         # Secondary ports
│           └── IUserRepository.ts
│
├── adapters/               # Concrete implementations
│   ├── http/            # REST controllers
│   │   └── UserController.ts
│   ├── persistence/     # Database
│   │   └── PostgresUserRepository.ts
│   └── cache/          # Cache
│
└── main.ts
```

## Layer Responsibilities

| Layer | Responsibility | Dependencies |
|-------|-------------|--------------|
| **Domain** | Business rules | None (pure) |
| **Application** | Use cases | Domain, Ports |
| **Ports** | Interfaces | None |
| **Adapters** | Implementations | Ports |

## DDD Constructs

```markdown
## Aggregates

[Aggregate Name]:
  - Root Entity: [Entity name]
  - Entities: [List]
  - Value Objects: [List]
  - Invariants: [List]

## Domain Events

- [Event1]: [Description]
- [Event2]: [Description]
```

---

[← Index](./README.md)