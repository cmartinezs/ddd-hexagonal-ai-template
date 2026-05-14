# 🔗 TRACEABILITY: 015 — Archon Architectural Refactoring

> [← planning/README.md](../../README.md)

---

## Terms Introduced

| Term | Definition | SDLC Phase |
|------|-----------|-----------|
| Domain layer | Pure business logic — entities, value objects, domain services — with no I/O dependencies | V |
| Application layer | Use cases that orchestrate domain objects and infrastructure adapters; one use case per command intent | V |
| Infrastructure layer | Adapters for external systems: file system, git, state persistence, global cache, agent runners | V |
| CLI layer | Thin command files that parse arguments and delegate entirely to application use cases | V |
| Use case | A single-responsibility class in `application/` that implements one user-facing action; independently testable | V |

---

> [← planning/README.md](../../README.md)
