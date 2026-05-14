# 🔍 DEEPENING: Scope 01 — Three-tier agent support model

> **Status:** IN PROGRESS
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Introduce a formal `supported` / `prompt-only` / `planned` classification in `AgentAdapterFactory` so that accepted agent names always map to a predictable behavior — no accepted input leads to a silent runtime crash.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Define `AgentSupportTier` type: `'supported' \| 'prompt-only' \| 'planned'` in `types.ts` | GENERATE-DOCUMENT | PENDING | `src/types.ts` updated |
| 2 | Add tier metadata to `AgentAdapterFactory` registry entries | GENERATE-DOCUMENT | PENDING | `src/` agent factory updated |
| 3 | `archon run` with a `planned` agent: print "Agent X is not yet implemented" and exit 1 | GENERATE-DOCUMENT | PENDING | `src/commands/run.ts` updated |
| 4 | `archon run` with a `prompt-only` agent (`manual`): generate prompt, print it, prompt user to paste | GENERATE-DOCUMENT | PENDING | `src/commands/run.ts` updated |
| 5 | `archon agent --set <name>` validates against known tiers; rejects unknown names | GENERATE-DOCUMENT | PENDING | `src/commands/agent.ts` updated |
| 6 | Run `npm run typecheck` | GENERATE-DOCUMENT | PENDING | Clean output |

---

## Done Criteria

- [ ] `AgentSupportTier` type exists in `types.ts`
- [ ] `opencode` and `claude` are classified as `supported`
- [ ] `manual` is classified as `prompt-only`
- [ ] `cursor` and `gemini` are classified as `planned`
- [ ] `archon run` with a `planned` agent exits 1 with a descriptive message
- [ ] `archon run` with `manual` prints the prompt and stops without invoking any subprocess
- [ ] `archon agent --set unknownAgent` exits 1 with "unknown agent" error
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
