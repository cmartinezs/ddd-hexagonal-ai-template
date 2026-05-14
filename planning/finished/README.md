# ✅ Finished Plannings

> [← planning/README.md](../README.md)

Plannings that have reached the **COMPLETED** state. These are archived and read-only; they serve as reference and audit trail.

---

| ID | Name | Completed | Key Outputs |
|----|------|-----------|-------------|
| [001](001-planning-system-bootstrap/README.md) | Planning System Bootstrap | — | `planning/` directory, AGENTS.md update, CLAUDE.md update, guides update |
| [002](002-workflow-integration/README.md) | Workflow Integration | 2026-05-11 | `05-SDLC-PHASE-GUIDANCE/` (12 files), 3 new sub-workflows, WORKFLOWS/ sub-folder restructure, GUIDE.md + PROMPTING.md extensions, broken links fixed |
| [003](003-tutorial-full-cycle/README.md) | Tutorial: Full Cycle (URL Shortener) | 2026-05-11 | `TUTORIAL-FULL-CYCLE.md`, 13 data-output files (url-shortener phases 0–11), 52 traceability terms |
| [004](004-tutorial-taskflow-completion/README.md) | Tutorial: TaskFlow Completion | 2026-05-11 | `EXAMPLE-IMPLEMENTATION.md` (all 12 phases, Mermaid diagrams, real Markdown), 25 traceability terms |
| [005](005-tutorial-interactive/README.md) | Tutorial: Interactive Step-by-Step | 2026-05-12 | `tutorial/` (12 step files, README, validation checklist, AI prompts appendix), updated guides index, 4 new traceability terms |
| [006](006-archon-cli/README.md) | Archon CLI | 2026-05-12 | `packages/archon-cli/` (17 commands, 9 scopes), global template cache, AI agent adapters, interactive engine, upgrade/migration, 41 PDRs |
| [007](007-documentation-update/00-initial.md) | Documentation Update | 2026-05-13 | `docs/commands/` (16 files), `docs/guides/real-world-workflow.md`, `CHANGELOG.md`, root README + AGENTS.md + guides README updated |
| [009](009-archon-critical-bugs/00-initial.md) | Archon Critical Bugs | 2026-05-14 | Fixed `migration-manager.ts` regex bug, `Validator.checkDependencies()` wrong path, `StateManager` checksum circularity + `validate()` newline mismatch |
| [010](010-archon-versioning-and-upgrade/00-initial.md) | Archon Versioning & Upgrade Fix | 2026-05-14 | `templates pull` now parses `id@version` and clones the exact tag; `updateTemplateLock` writes full lock (ref, source, commitSha, cachePath) |
| [011](011-archon-agent-support-honesty/00-initial.md) | Archon Agent Support Honesty | 2026-05-14 | `AgentSupportTier` type + `AGENT_TIERS` map; `archon run` with `planned` agent exits 1; `archon agent ls` shows tiers; `templates remove` marked `[planned]`; `check --fix` marked `[experimental]` |
| [012](012-archon-dev-product-separation/00-initial.md) | Archon Dev/Product Mode Separation | 2026-05-14 | Removed ancestor-walk from `init.ts`; `templateResolver.getDevTemplatePath()` reads `dev.json` at runtime; no silent local-template fallback in production |
| [013](013-archon-dependency-modernization/00-initial.md) | Archon Dependency Modernization | 2026-05-14 | `compareVersions` uses `semver.compare()`; `bin/archon.ts` migrated to Commander; `execSync` replaced with `execa` in `templates.ts`; `rm -rf` replaced with `rmSync` (residuals: `env-paths`, `zod` schemas deferred) |
| [014](014-archon-code-cleanup/00-initial.md) | Archon Code Cleanup | 2026-05-14 | `promptForMissing()` removed from `state-manager.ts`; local `PHASES` array in `next.ts` replaced with `phaseEngine`; `promptForMissing` export removed from `core/index.ts` |
| [015](015-archon-architectural-refactoring/README.md) | Archon Architectural Refactoring | 2026-05-14 | `src/` restructured to DDD/hexagonal layers: `domain/`, `infrastructure/`, `application/`, `cli/`, `ui/`; `src/commands/` deleted; 6 use cases extracted; `npm run build` passes; residual: `core/` shim remains |
| [016](016-archon-new-commands/README.md) | Archon New Commands | 2026-05-14 | 6 new commands: `generate`, `review`, `trace`, `diff`, `quality`, `doctor --ci`; all use cases + commands + docs/commands reference files; build passes, typecheck clean |
| [008](008-archon-improvement-master/README.md) | Archon Improvement Master Plan | 2026-05-14 | 8 sub-plannings executed (009–016): bugs fixed, versioning aligned, architecture refactored, 6 new commands added; all tracked and archived |

---

> [← planning/README.md](../README.md)
