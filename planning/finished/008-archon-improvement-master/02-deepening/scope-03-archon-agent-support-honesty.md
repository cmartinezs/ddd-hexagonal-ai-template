# 🔍 DEEPENING: Scope 03 — Archon Agent Support Honesty (011)

> **Status:** DONE
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../../README.md)

---

## Objective

Activate planning 011, execute all its scopes, and archive it as completed. This scope aligns what Archon declares as supported with what is actually implemented, eliminating runtime failures from accepted but unimplemented user input.

**Child planning:** [`011-archon-agent-support-honesty`](../../../011-archon-agent-support-honesty/00-initial.md)

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Promote 011 to `active/`: fill `01-expansion.md`, move folder | ADVANCE-PLANNING | DONE | `active/011-archon-agent-support-honesty/01-expansion.md` |
| 2 | Execute scope: implement three-tier agent support model in `AgentAdapterFactory` | GENERATE-DOCUMENT | DONE | `AgentSupportTier` in `types.ts`, `AGENT_TIERS` + `getTier()` in `agent-adapter.ts`, tier display in `agent.ts` |
| 3 | Execute scope: `archon run` with `planned` agent prints clear error and exits 1 | GENERATE-DOCUMENT | DONE | `src/commands/run.ts` updated |
| 4 | Execute scope: mark experimental/unimplemented commands | GENERATE-DOCUMENT | DONE | `templates remove` → `[planned]`; `check --fix` → `[experimental]` |
| 5 | Archive 011 to `finished/`, update `finished/README.md` | ADVANCE-PLANNING | DONE | `finished/011-archon-agent-support-honesty/` |
| 6 | Update indexes (`planning/README.md`, `active/README.md`) | ADVANCE-PLANNING | DONE | indexes updated |

---

## Done Criteria

- [ ] `AgentAdapterFactory` classifies agents as `supported` / `prompt-only` / `planned`
- [ ] `archon agent --set cursor` is accepted but `archon run` exits 1 with "agent not yet implemented" message
- [ ] `archon agent --set gemini` behaves the same as cursor
- [ ] `templates remove` and `check --fix` are marked `[planned]`/`[experimental]` in `--help` output
- [ ] README agent support table reflects the three tiers
- [ ] Planning 011 archived to `finished/`
- [ ] TRACEABILITY.md updated with `agent support tier` term

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
