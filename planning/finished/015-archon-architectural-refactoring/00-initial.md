# 🌱 INITIAL: Archon Architectural Refactoring

> **Status:** EXPANSION (promoted from Initial)
> [← planning/README.md](../../README.md)

---

## Intent

Restructure `packages/archon-cli/src/` to a DDD/hexagonal layout where commands contain zero business logic — they only parse input and delegate to use cases.

---

## Why

The current structure puts business logic, I/O operations, agent orchestration, token tracking, and UX prompts all inside command classes. `RunCommand` alone handles: mode detection, interactive prompts, context generation, prompt construction, agent diagnosis, token tracking, dry-run, user confirmation, execution, and run tracking.

This makes testing impossible without integration, prevents reusing logic across commands, and makes adding new commands require duplicating patterns that should be centralized. The refactoring is the prerequisite for confidently building the new commands in plan 016.

This plan should only start after 009–014 are complete — restructuring while known bugs or dead code exist means carrying problems into the new structure.

---

## Target Structure

```
packages/archon-cli/src/
├── cli/
│   ├── program.ts              # commander root + command registration
│   └── commands/
│       ├── init.command.ts     # parse → call InitProjectUseCase
│       ├── run.command.ts      # parse → call RunAgentUseCase
│       ├── check.command.ts
│       ├── next.command.ts
│       └── ...
│
├── domain/
│   ├── phase/                  # Phase entity, PhaseEngine, phase definitions
│   ├── template/               # TemplateLock, TemplateRef value objects
│   ├── project-state/          # ArchonState, StateValidator
│   └── validation/             # ValidationResult, CheckResult
│
├── application/
│   ├── init-project.usecase.ts
│   ├── generate-prompt.usecase.ts
│   ├── run-agent.usecase.ts
│   ├── check-phase.usecase.ts
│   └── upgrade-project.usecase.ts
│
├── infrastructure/
│   ├── fs/                     # File system adapters
│   ├── git/                    # Git operations via execa
│   ├── cache/                  # GlobalCache, env-paths
│   ├── agents/
│   │   ├── opencode.adapter.ts
│   │   └── claude.adapter.ts
│   ├── state/                  # StateManager (persistence only)
│   └── template-registry/      # TemplateRegistry, pull, resolve
│
└── ui/
    ├── renderers/              # Console output formatters
    └── prompts/                # inquirer wrappers
```

**Rule:** `cli/commands/` only parse input and call `application/` use cases. No business logic, no I/O, no rendering in commands.

---

## Approximate Scope

- [ ] `packages/archon-cli/src/` — full restructure (move + rename + refactor)
- [ ] `packages/archon-cli/src/cli/program.ts` — new commander root
- [ ] `packages/archon-cli/package.json` — update `main` / `bin` entry if needed
- [ ] All import paths updated

---

## Initiator

- **Requested by:** Carlos Martínez
- **Date:** 2026-05-13
- **Master plan:** [008](../008-archon-improvement-master/README.md)
- **Depends on:** [009](../../finished/009-archon-critical-bugs/00-initial.md), [010](../../finished/010-archon-versioning-and-upgrade/00-initial.md), [011](../../finished/011-archon-agent-support-honesty/00-initial.md), [012](../../finished/012-archon-dev-product-separation/00-initial.md), [013](../../finished/013-archon-dependency-modernization/00-initial.md), [014](../../finished/014-archon-code-cleanup/00-initial.md)

---

## Next Step

- [x] 009–014 all completed
- [x] Promoted to EXPANSION — see `01-expansion.md`

---

> [← planning/README.md](../../README.md)
