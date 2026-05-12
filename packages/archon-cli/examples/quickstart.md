# Quick Start — 5 Minutes to Your First Phase

This guide gets you from zero to a generated Phase 0 document in 5 minutes.

## Prerequisites

- Node.js 18+
- An AI agent installed (opencode recommended)

## Step 1: Install Archon

```bash
# Once published to npm
npm install -g @archon/cli

# For local development
cd packages/archon-cli
npm install && npm run build && npm link
```

Verify it works:

```bash
archon --version
```

## Step 2: Initialize a Project

```bash
archon init --name "URL Shortener" --agent opencode
cd url-shortener
```

You'll see:
- A `docs/` folder with the 12-phase structure created
- A `.archon/` folder with state and configuration
- A `template.lock.json` pinning the template version

## Step 3: Check Your Status

```bash
archon status
```

You should see Phase 0 (Documentation Planning) as the current phase.

## Step 4: Generate an AI Prompt

```bash
archon prompt --phase 0 --context full --copy
```

This:
1. Scans your project structure
2. Reads the Phase 0 template
3. Generates a rich, context-aware prompt
4. Copies it to your clipboard

Paste the prompt into your AI agent.

## Step 5: Validate and Advance

After the AI generates Phase 0 output:

```bash
archon check --phase 0
```

If it passes, advance:

```bash
archon next
```

Now you're at Phase 1 (Discovery). Generate your next prompt:

```bash
archon prompt --phase 1 --copy
```

## What Just Happened?

Behind the scenes, Archon:

1. Created `.archon/state.json` tracking your current phase
2. Created `.archon/prompts/phase-0-YYYY-MM-DD.md` with your prompt
3. Created `.archon/context/project-context.md` with project analysis
4. Tracked your completed phases in state.json

## Next Steps

- Run `archon guide --phase 1` to see Discovery phase help
- Run `archon tutorial` for a guided walkthrough
- Run `archon doctor` to check project health

## Common Commands

| Command | When to use |
|---------|-------------|
| `archon status` | Check current phase and progress |
| `archon prompt --phase N` | Generate AI prompt for phase N |
| `archon check` | Validate current phase |
| `archon next` | Advance to next phase |
| `archon guide` | Get help for current phase |
| `archon doctor` | Health check |
