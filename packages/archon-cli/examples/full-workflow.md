# Full Workflow — Complete Project Lifecycle

This guide walks through a complete documentation project using Archon from Phase 0 to Phase 11.

## Project: URL Shortener (Domain: link management)

### Phase 0: Documentation Planning

```bash
archon prompt --phase 0 --context full
# Paste into opencode
archon check --phase 0
archon next
```

**Expected output:** `docs/00-documentation-planning/sdlc-framework.md`, `docs/00-documentation-planning/macro-plan.md`

### Phase 1: Discovery

```bash
archon prompt --phase 1 --context full
# Paste into opencode
archon check --phase 1
archon next
```

**Expected output:** `docs/01-discovery/context-motivation.md`, `docs/01-discovery/system-vision.md`, `docs/01-discovery/actors.md`, `docs/01-discovery/needs-expectations.md`

### Phase 2: Requirements

```bash
archon prompt --phase 2 --context full
# Paste into opencode
archon check --phase 2
archon next
```

**Expected output:** `docs/02-requirements/glossary.md`, `docs/02-requirements/fr-*.md`, `docs/02-requirements/rnf-*.md`, `docs/02-requirements/priority-matrix.md`

### Phase 3: Design

```bash
archon prompt --phase 3 --context full
# Paste into opencode
archon check --phase 3
archon next
```

**Expected output:** `docs/03-design/strategic-design.md`, `docs/03-design/system-flows.md`, `docs/03-design/bounded-contexts/*.md`

### Phase 4: Data Model

```bash
archon prompt --phase 4 --context full
# Paste into opencode
archon check --phase 4
archon next
```

### Phase 5: Planning

```bash
archon prompt --phase 5 --context full
# Paste into opencode
archon check --phase 5
archon next
```

### Phase 6-11: Technology-Specific

From Phase 6 onward, the prompts will reference your technology stack (e.g., TypeScript, PostgreSQL, Docker). These phases require you to specify the stack.

```bash
# Generate prompt with full context including your stack
archon prompt --phase 6 --context full

# Or use the AI agent directly
archon run --agent opencode --phase 6
```

## Running with AI Agent

For a fully automated flow:

```bash
# Dry run first to see the command
archon run --agent opencode --phase 0 --dry-run

# Execute the agent
archon run --agent opencode --phase 0 --confirm

# Check what was generated
archon check --phase 0

# Advance
archon next
```

## Tracking Progress

```bash
# View progress
archon status

# View generated prompts
archon prompts ls

# View run history
archon prompts stats

# Health check
archon doctor
```

## Troubleshooting

**AI output is generic:** Use `--context full` and run `archon context scan` before generating prompts.

**Phase validation fails:** Run `archon guide --phase N` for help, then `archon check --phase N --fix` if auto-fix is available.

**Agent not found:** Run `archon agent --doctor --agent opencode` to diagnose.

## Upgrading Template

```bash
# Check for upgrades
archon upgrade --info

# Apply latest
archon upgrade

# Rollback if needed
archon upgrade --rollback 0.1.0
```
