# 🔍 DEEPENING: Scope 02 — State Management + Mode Detection

> **Status:** DONE (2026-05-12)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement state management (`state.json` + checksum) and mode detection (template vs. project). This is the foundation that all other commands depend on.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Create `src/core/mode-detector.ts` — detect template vs. project mode | GENERATE-DOCUMENT | DONE | `mode-detector.ts` |
| 2 | Create `src/core/state-manager.ts` — read/write state.json + checksum | GENERATE-DOCUMENT | DONE | `state-manager.ts` |
| 3 | Create `src/core/types.ts` — TypeScript interfaces for state, config, phase | GENERATE-DOCUMENT | DONE | `types.ts` |
| 4 | Create `src/core/config-manager.ts` — read/write config.json | GENERATE-DOCUMENT | DONE | `config-manager.ts` |
| 5 | Implement checksum (SHA-256) for state.json integrity | GENERATE-DOCUMENT | DONE | Checksum implementation |
| 6 | Implement first-interactive param handling in state manager | GENERATE-DOCUMENT | DONE | First-interactive logic |
| 7 | Write unit tests for mode detector and state manager | GENERATE-DOCUMENT | PENDING | Tests |

---

## State Schema

```typescript
interface ArchonState {
  projectName: string;
  templateVersion: string;
  createdAt: string;
  agent: 'opencode' | 'claude' | 'cursor' | 'manual';
  mode: 'template' | 'project';
  currentPhase: number; // 0-11
  phases: Record<string, PhaseStatus>;
  checksum: string;
  warnings: Warning[];
}

interface PhaseStatus {
  status: 'pending' | 'in_progress' | 'complete';
  completedAt?: string;
  startedAt?: string;
  files: string[];
}

interface ArchonConfig {
  agent: string;
  defaults: Record<string, string | boolean | number>;
  interactiveMode: 'always' | 'missing' | 'never';
}
```

---

## Mode Detection Rules

| Condition | Mode |
|-----------|------|
| Running from `00-guides-and-instructions/archon/` without `.archon/` in parent | `template` |
| `../.archon/state.json` exists | `project` |
| Project name passed via `--project <name>` | `project` (creates sibling) |
| Running from `ddddd-template/` with `.archon/` in current dir | `project` |

---

## Done Criteria

- [x] `mode-detector.ts` correctly identifies template vs. project mode in all 4 scenarios
- [x] `state-manager.ts` creates `state.json` with all required fields on `init`
- [x] Checksum (SHA-256) is computed on write and verified on read
- [x] Mismatch triggers warning: "State was modified externally. Run `archon doctor` to validate."
- [x] `config-manager.ts` reads/writes `.archon/config.json` with agent and defaults
- [x] First-interactive: missing required params trigger interactive prompt (not error)
- [x] All interfaces are documented with JSDoc
- [ ] Unit tests cover: mode detection, checksum write/read, config read/write
- [x] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)