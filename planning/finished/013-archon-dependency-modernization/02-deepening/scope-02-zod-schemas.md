# 🔍 DEEPENING: Scope 02 — Add `zod` schema validation

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Parse and validate all persistent data structures (state, config, lock, registry) through `zod` schemas on read, producing descriptive errors on schema mismatch instead of silent type coercion.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Add `zod` to `packages/archon-cli/package.json` if not present | GENERATE-DOCUMENT | PENDING | `package.json` updated |
| 2 | Write `ArchonStateSchema` in `src/schemas/state.schema.ts` | GENERATE-DOCUMENT | PENDING | Schema file created |
| 3 | Write `ArchonConfigSchema` in `src/schemas/config.schema.ts` | GENERATE-DOCUMENT | PENDING | Schema file created |
| 4 | Write `TemplateLockSchema` in `src/schemas/template-lock.schema.ts` | GENERATE-DOCUMENT | PENDING | Schema file created |
| 5 | Write `TemplateRegistryEntrySchema` in `src/schemas/registry.schema.ts` | GENERATE-DOCUMENT | PENDING | Schema file created |
| 6 | Update `StateManager`, config loader, and registry reader to parse through schemas | GENERATE-DOCUMENT | PENDING | Loaders updated |
| 7 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `zod` is in `package.json` dependencies
- [ ] Schema files exist for: `ArchonState`, `ArchonConfig`, `TemplateLock`, `TemplateRegistryEntry`
- [ ] All four data structures are validated through their schema on every read from disk
- [ ] Invalid file content produces a `ZodError` with field-level messages (not a silent cast)
- [ ] Inferred types from schemas replace manually-written interfaces where applicable
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
