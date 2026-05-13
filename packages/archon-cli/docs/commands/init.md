# archon init

> Initialize a new project from the DDD Hexagonal AI Template.

## Usage

```bash
archon init
archon init --name <project-name>
archon init --name <project-name> --agent <agent>
```

## Options

| Option | Description |
|--------|-------------|
| `--name <name>` | Project name. Prompted interactively if omitted. |
| `--agent <opencode\|claude\|manual>` | Default AI agent for the project. Prompted interactively if omitted. |

## Behaviour

Creates a new project directory as a child of the current working directory:

```
<project-name>/
├── docs/                         # Phase outputs (one folder per phase 0–11)
│   ├── 00-documentation-planning/
│   ├── 01-discovery/
│   └── ...
└── .archon/
    ├── state.json                # Project state (current phase, phase statuses)
    ├── state.checksum            # SHA-256 checksum for integrity validation
    ├── config.json               # Agent and defaults configuration
    ├── template.lock.json        # Pinned template version
    ├── guides/                   # AI guides copied from the template
    ├── context/                  # Generated context files
    ├── prompts/                  # Generated AI prompts
    └── runs/                     # Execution logs
```

The `.archon/guides/` folder is populated with the key guides from the template (INSTRUCTIONS-FOR-AI.md, AI-WORKFLOW-GUIDE.md, SKILLS-AND-PLUGINS-GUIDE.md, TEMPLATE-ARCHITECTURE.md) so that `archon context inject` can include them in AI agent context without requiring network access.

**Mode detection:** after `init`, commands run from within `<project-name>/` operate in `project` mode. Commands run from the template repo root operate in `template-dev` mode.

## Examples

```bash
# Interactive — prompts for name and agent
archon init

# Non-interactive
archon init --name "my-saas" --agent opencode

# Manual mode (no AI agent configured)
archon init --name "my-project" --agent manual
```

## See Also

- [`archon status`](status.md) — check current phase after init
- [`archon config`](config.md) — change agent and defaults after init
- [`archon agent`](agent.md) — configure or diagnose the AI agent
- [`archon context`](context.md) — inject template guides before the first run
