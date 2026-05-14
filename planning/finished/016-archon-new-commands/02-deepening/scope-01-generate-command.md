# 🔍 DEEPENING: Scope 01 — `archon generate phase <N>`

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Add `archon generate phase <N>` command that scaffolds base documentation files for phase N from the active template into `docs/<phase-folder>/`. Skips existing files unless `--force`.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/application/generate-phase.usecase.ts` — resolve template, enumerate expected files for phase N, copy missing files to `docs/<phase>/` | GENERATE-DOCUMENT | PENDING | `application/generate-phase.usecase.ts` |
| 2 | Create `src/cli/commands/generate.command.ts` — parse phase arg, call use case, render output | GENERATE-DOCUMENT | PENDING | `cli/commands/generate.command.ts` |
| 3 | Register `generate` in `cli/router.ts` and `cli/program.ts` | GENERATE-DOCUMENT | PENDING | Router + program updated |
| 4 | Create `docs/commands/generate.md` — reference documentation | GENERATE-DOCUMENT | PENDING | `docs/commands/generate.md` |
| 5 | Run `npm run typecheck` — must exit 0 | GENERATE-DOCUMENT | PENDING | Clean typecheck |

---

## Done Criteria

- [ ] `archon generate phase 3` copies template files for phase 3 to `docs/03-design/` without overwriting existing
- [ ] `archon generate phase 3 --force` overwrites existing files
- [ ] `archon generate --help` shows usage
- [ ] `npm run typecheck` exits 0

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet* | — | — | — |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)
