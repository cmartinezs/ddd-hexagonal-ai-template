# archon config

> Manage project configuration defaults stored in `.archon/config.json`.

## Usage

```bash
archon config ls
archon config get --key <key>
archon config set --key <key> --value <value>
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `ls` | List all configuration keys and their current values. |
| `get` | Get the value of a single key. |
| `set` | Set the value of a key. |

## Options

| Option | Description |
|--------|-------------|
| `--key <key>` | Configuration key (dot-notation: e.g. `defaults.context.default`). |
| `--value <value>` | Value to set. |

## Configuration Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agent` | string | `manual` | Default AI agent (`opencode`, `claude`, `cursor`, `gemini`, `manual`). |
| `interactiveMode` | string | `missing` | When to prompt interactively: `always`, `missing`, `never`. |
| `defaults.context.default` | string | `full` | Default context level for `archon prompt`: `full`, `summary`, `none`. |

## Behaviour

Reads and writes `.archon/config.json` in the current project directory. Configuration set here applies to all subsequent commands within this project. To configure the agent, prefer [`archon agent --set`](agent.md) which has validation.

## Examples

```bash
# View all config
archon config ls

# Change default context level
archon config set --key defaults.context.default --value summary

# Set interactive mode to never prompt
archon config set --key interactiveMode --value never

# Read a single key
archon config get --key agent
```

## See Also

- [`archon agent`](agent.md) — configure the AI agent (with validation)
- [`archon init`](init.md) — sets initial configuration at project creation
