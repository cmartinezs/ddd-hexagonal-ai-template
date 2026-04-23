[← Index](./README.md)

---

# AI Agents in Development

## Purpose

Guidelines for using AI agents (LLM-based coding assistants) in the development workflow.

> **Note**: This is a template. Adapt to your project's tools and workflows.

---

## TL;DR

- **Repo**: Multi-module project
- **Stack**: [Language] + [Framework] + [Library]
- **Architecture**: Hexagonal / Ports and Adapters
- **Security**: Bearer JWT in protected routes
- **Persistence**: [Database] + ORM

---

## Module Structure

```
mermaid
flowchart TD
    domain["domain<br/>pure domain, no framework"]
    app["app<br/>use cases + outbound ports"]
    infra["infra<br/>persistence, external adapters"]
    api["api<br/>controllers + DTOs"]
    run["run<br/>main, wiring, configuration"]
    
    app --> domain
    infra --> app
    api --> app
    run --> api
    run --> infra
```

---

## Active Modules

| Module | Role |
|--------|------|
| **domain** | Pure domain logic |
| **app** | Use cases + outbound ports |
| **infra** | External adapters |
| **api** | REST, DTOs, errors, OpenAPI |
| **run** | Main, wiring, configuration |

---

## Architecture Decisions

| Decision | Value |
|----------|-------|
| API path prefix | `/api/v1` |
| REST envelope | `{ data, meta }` |
| Domain layer | No framework dependencies |
| Documentation | In `doc/` folder |

---

## Read First

1. Project README (index)
2. Architecture document
3. Coding standards
4. This operations guide

---

## Critical Rules

| Rule | Description |
|------|-------------|
| **Concise responses** | Short, precise, no filler |
| **Domain purity** | No framework dependencies in domain layer |
| **Nullable handling** | Use wrapper types (Optional<T>) |
| **No ID assignment** | Let the database generate IDs |
| **JSON naming** | Use snake_case for request/response |
| **Entity annotation** | Avoid @Data, use @Getter/@Setter |
| **Read first** | Check existing patterns before writing |
| **Wait for approval** | Don't implement until user confirms |

---

## Workflow

### Before Any Change

1. **Analyze existing code** — Find patterns, reuse if exists
2. **Check documentation** — Read relevant docs
3. **Create plan** — Document solution before implementing
4. **Wait for approval** — Don't implement until user confirms

### Task Lifecycle

```
⬜ Registered → 🔍 Analyzing → 📋 Planned → ✅ Approved → 🔵 In Development → 🔄 In Review → Completed
```

- Agent can move task to **Planned**
- Only user can **Approve** — Without approval, don't implement
- Large changes require RFC approval

### Closing Protocol

1. **Ask what to remember** — Any learnings, patterns, issues?
2. **Compress and persist** — Save only what's not derivable from code
3. **Update indices** — If new docs created, update folder READMEs

---

## Required Reading

| Topic | Document |
|-------|----------|
| Architecture | architecture.md |
| Data model | data-model.md |
| API contracts | api-reference.md |
| Frontend guide | (if UI affected) |
| Roadmap | roadmap.md |

---

## Build Commands

| Language | Build | Test | Run |
|----------|-------|------|------|
| Java/Maven | `./mvnw clean package` | `./mvnw test` | `./mvnw spring-boot:run` |
| JavaScript | `npm run build` | `npm test` | `npm run dev` |
| Python | `pip install -e .` | `pytest` | `python -m app` |
| Go | `go build` | `go test ./...` | `go run main.go` |

---

## Documentation Maintenance

| Change | Update |
|-------|--------|
| New endpoint | API docs + (frontend guide if UI affected) |
| New migration | data-model.md + entity-relationships.md |
| New pattern | lessons-learned/ |
| Architecture decision | adr/ |
| Feedback resolved | Reference task/RFC in resolution |

---

## Quick Checklist

- [ ] Domain layer has no framework dependencies
- [ ] Nullable fields use Optional<T>
- [ ] Entities don't use @Data
- [ ] JSON uses snake_case
- [ ] Documentation updated
- [ ] Indices maintained
- [ ] Wait for user approval before implementing

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-operations.md` — Common operations

---

[← Index](./README.md)