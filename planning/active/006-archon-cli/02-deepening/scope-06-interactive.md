# 🔍 DEEPENING: Scope 06 — Interactive Mode + Config Defaults

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement interactive mode (first-interactive) for all commands with required parameters, and the config system for setting per-project defaults.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Implement first-interactive system (missing params → prompts) | GENERATE-DOCUMENT | PENDING | First-interactive engine |
| 2 | Create `archon config set <key> <value>` | GENERATE-DOCUMENT | PENDING | `config set` |
| 3 | Create `archon config get <key>` | GENERATE-DOCUMENT | PENDING | `config get` |
| 4 | Create `archon config ls` | GENERATE-DOCUMENT | PENDING | `config ls` |
| 5 | Implement config defaults: context level, interactive mode, agent | GENERATE-DOCUMENT | PENDING | Config defaults |
| 6 | Create interactive prompts (inquirer/spectre question flow) | GENERATE-DOCUMENT | PENDING | Interactive prompts |
| 7 | Write integration tests for config system | GENERATE-DOCUMENT | PENDING | Integration tests |

---

## Config System

### Config Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agent` | string | `opencode` | AI agent (opencode/claude/cursor/manual) |
| `interactiveMode` | string | `missing` | When to enter interactive mode (always/missing/never) |
| `context.default` | string | `full` | Default context level for prompts (full/summary/none) |
| `validation.strict` | boolean | `false` | Treat WARN as ERROR (strict mode) |
| `prompts.autoGenerate` | boolean | `false` | Auto-generate prompt after phase advance |
| `prompts.retentionDays` | number | `90` | Days before prompts are eligible for clean |
| `upgrade.autoApply` | boolean | `true` | Auto-apply non-breaking upgrades |

### Config File Location

`project/.archon/config.json`

### Config Commands

```bash
archon config set agent opencode          # Set agent to opencode
archon config set context.default summary  # Set default context to summary
archon config set interactiveMode always  # Always enter interactive mode
archon config get agent                   # Get current agent
archon config ls                          # List all config values
```

---

## First-Interactive Rules

| Scenario | Behavior |
|----------|----------|
| Command with missing required param | Enter interactive mode, ask for value |
| `interactiveMode: always` | Ask for all params interactively even if provided |
| `interactiveMode: missing` | Only ask for missing params (default) |
| `interactiveMode: never` | Exit with error showing missing params |
| Required param is flag (boolean) | Ask yes/no question |
| Required param is enum | Show menu with options |
| Required param is string | Free-text input with validation |

---

## Interactive Prompt Library

```typescript
interface InteractivePrompt {
  question: string;
  type: 'text' | 'confirm' | 'select' | 'number';
  options?: string[];        // for select type
  default?: any;
  validator?: (input: any) => boolean;
  errorMessage?: string;
}
```

---

## Done Criteria

- [ ] `archon prompt --phase 3` (missing `--context`) enters interactive mode
- [ ] Interactive mode shows correct question type per parameter
- [ ] Interactive mode validates input (re-asks if invalid)
- [ ] `archon config set context.default summary` persists value to `config.json`
- [ ] `archon config get context.default` returns `summary`
- [ ] `archon config ls` shows all config keys with current values
- [ ] Config defaults are used when generating prompts (unless overridden by flag)
- [ ] Interactive mode uses project name from state.json as context
- [ ] Integration tests verify: set/get/ls, interactive mode triggers correctly
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)