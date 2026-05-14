# Archon — DDD Template CLI

A globally installable CLI tool that systematizes the DDD + Hexagonal AI Template through structured commands, phase enforcement, AI agent integration, and upgrade/migration support.

## Installation

```bash
npm install -g @archon/cli
```

Or use directly with npx (no installation required):

```bash
npx @archon/cli init --name my-project
```

## Requirements

- Node.js 18+
- npm or yarn

## Quick Start

```bash
# Initialize a new project
archon init --name "My Project" --agent opencode

# Navigate into the project
cd my-project

# Check current status
archon status

# Generate an AI prompt for the current phase
archon prompt --phase 0

# Validate the phase
archon check

# Advance to the next phase
archon next

# Run the AI agent (requires --agent)
archon run --agent opencode --phase 0
```

## Commands

| Command | Description |
|---------|-------------|
| `archon generate phase <N> [--force]` | Scaffold phase docs from template. [→ ref](docs/commands/generate.md) |
| `archon review [--phase <N>] [--json]` | Review documentation quality for a phase. [→ ref](docs/commands/review.md) |
| `archon trace [--phase <N>] [--json]` | Cross-phase traceability matrix. [→ ref](docs/commands/trace.md) |
| `archon diff --from <v> --to <v>` | Diff template versions. [→ ref](docs/commands/diff.md) |
| `archon quality [--phase <N>] [--json]` | Project health score and breakdown. [→ ref](docs/commands/quality.md) |
| `archon doctor [--fix] [--ci] [--json]` | Health check (CI mode exits 0/1). [→ ref](docs/commands/doctor.md) |
| `archon init [--name <n>] [--agent <a>]` | Initialize a new project. [→ ref](docs/commands/init.md) |
| `archon status [--json]` | Show current phase and progress. [→ ref](docs/commands/status.md) |
| `archon next [--phase <N>] [--force]` | Advance phase (jump detection). [→ ref](docs/commands/next.md) |
| `archon check [--phase <N>] [--force]` | Validate phase constraints. [→ ref](docs/commands/check.md) |
| `archon prompt [--phase <N>] [--context <l>] [--copy]` | Generate AI prompt. [→ ref](docs/commands/prompt.md) |
| `archon context <scan\|inject> [--output <p>]` | Context files. [→ ref](docs/commands/context.md) |
| `archon run --agent <a> --phase <N>` | Execute AI agent. [→ ref](docs/commands/run.md) |
| `archon agent [--set <a>] [--doctor]` | Configure agent. [→ ref](docs/commands/agent.md) |
| `archon prompts <ls\|rank\|compress\|merge\|...>` | Prompt library. [→ ref](docs/commands/prompts.md) |
| `archon guide [--phase <N>]` | Phase help. [→ ref](docs/commands/guide.md) |
| `archon tutorial [--mode <m>] [--step <N>]` | Guided tutorial. [→ ref](docs/commands/tutorial.md) |
| `archon doctor [--fix]` | Health check. [→ ref](docs/commands/doctor.md) |
| `archon config <set\|get\|ls>` | Config defaults. [→ ref](docs/commands/config.md) |
| `archon upgrade [--target <v>] [--rollback <v>]` | Upgrade template. [→ ref](docs/commands/upgrade.md) |
| `archon templates <ls\|pull\|update\|remove\|doctor>` | Template cache. [→ ref](docs/commands/templates.md) |
| `archon dev <link-template\|unlink-template\|status>` | Dev commands. [→ ref](docs/commands/dev.md) |

## AI Agent Integration

Archon supports multiple AI agents with a transport-priority system:

1. **file-attachment** (default) — Most stable. Prompts are written to `.archon/prompts/` and attached as files.
2. **attach** — Persistent server mode. Avoids cold boot of MCPs/plugins.
3. **stdin** — Experimental. Passes prompt via stdin.

Supported agents: `opencode`, `claude`, `cursor`, `gemini`, `manual`.

```bash
# Set your preferred agent
archon agent --set opencode

# Test agent availability
archon agent --doctor --agent opencode

# Generate prompt and copy to clipboard
archon prompt --phase 3 --context full --copy
```

## Project Structure

When you run `archon init`, it creates:

```
my-project/
├── docs/                    # Phase outputs
│   ├── 00-documentation-planning/
│   ├── 01-discovery/
│   ├── 02-requirements/
│   └── ...
└── .archon/               # Archon metadata
    ├── state.json          # Project state
    ├── config.json         # Agent configuration
    ├── template.lock.json  # Pinned template version
    ├── context/            # Project context files
    ├── prompts/            # Generated AI prompts
    └── runs/               # Execution logs
```

## Examples

- [Quick Start](./examples/quickstart.md) — Get up and running in 5 minutes
- [Full Workflow](./examples/full-workflow.md) — Complete project lifecycle
- [AI Integration](./examples/ai-integration.md) — opencode, Claude Code, manual modes
- [Troubleshooting](./examples/troubleshooting.md) — Common issues and fixes

## Configuration

```bash
# Set default context level
archon config set defaults.context.default full

# Set interactive mode (always/missing/never)
archon config set interactiveMode missing

# View all config
archon config ls
```

## Template Cache

Archon stores templates in `~/.archon/templates/`:

```bash
# List cached templates
archon templates ls

# Pull the latest template
archon templates pull ddd-hexagonal-ai-template

# Remove a cached version
archon templates remove ddd-hexagonal-ai-template@0.1.0
```

## Development

The package name is `@archon/cli` (scoped) — the `archon` name on npm is taken by battlecode.org.

```bash
cd packages/archon-cli

# Install dependencies
npm install

# Build the TypeScript (compiles src/ + bin/ to dist/)
npm run build

# Link globally — the `archon` command now points to your local dist/
npm link

# After linking, the `archon` command works
archon --version
Archon v0.1.0
DDD Template CLI — Systematizing Domain-Driven Design workflows

# Any code changes: modify → rebuild → test
npm run build && archon --help

# Type check without building
npm run typecheck

# To unlink when done
npm uninstall -g @archon/cli
```

**To publish to npm** (when ready):

```bash
cd packages/archon-cli
npm version patch  # or minor / major
npm publish --access public
```

Then users can install with:
```bash
npm install -g @archon/cli
```

## Architecture

Archon follows a plugin-friendly architecture:

- **`AgentAdapter`** interface — Add new agents by implementing `detect()`, `doctor()`, and `execute()`
- **Transport abstraction** — File-attachment, attach, and stdin are all supported
- **Global template cache** — Templates are cached at `~/.archon/` and resolved at runtime

## Command Reference

Full per-command documentation with options, examples, and cross-navigation between related commands: [`docs/commands/`](docs/commands/)

## Guides

- [Real-World Workflow](docs/guides/real-world-workflow.md) — complete walkthrough using Archon with the DDD Hexagonal Template

---

[← Back to template root](../README.md)
