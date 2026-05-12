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
| `archon init` | Initialize a new project from the DDD template |
| `archon status` | Show current phase and progress |
| `archon next` | Advance to the next phase |
| `archon check` | Validate current phase constraints |
| `archon prompt` | Generate an AI prompt for a phase |
| `archon context` | Scan project and generate context files |
| `archon run` | Execute an AI agent via adapter |
| `archon agent` | Configure or diagnose AI agents |
| `archon prompts` | Manage the accumulated prompt library |
| `archon guide` | Interactive help for any phase |
| `archon tutorial` | Guided tutorial mode |
| `archon doctor` | Health check and integrity validation |
| `archon config` | Manage configuration defaults |
| `archon upgrade` | Upgrade template to a newer version |
| `archon templates` | Manage the global template cache |
| `archon dev` | Development commands (link template) |

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

---

[← Back to template root](../README.md)
