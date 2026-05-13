# archon agent

> Configure or diagnose the AI agent for the current project.

## Usage

```bash
archon agent --set <agent>
archon agent --doctor
archon agent --doctor --agent <agent>
```

## Options

| Option | Description |
|--------|-------------|
| `--set <opencode\|claude\|cursor\|gemini\|manual>` | Set the default agent for this project. Saved to `.archon/config.json`. |
| `--doctor` | Run a health check on the configured (or specified) agent. |
| `--agent <name>` | Agent to diagnose (used with `--doctor`). |

## Behaviour

### Setting an agent

Updates the `agent` field in `.archon/config.json`. The configured agent is used as default by [`archon run`](run.md) when `--agent` is not explicitly specified.

```bash
archon agent --set opencode
```

### Doctor mode

Checks whether the specified agent is available and functional:

- Detects if the agent binary/command exists in PATH
- Tests file-attachment capability
- Tests stdin transport (if supported)
- Reports transport capabilities: `supportsFileAttachment`, `supportsStdin`, `supportsAttach`

```bash
archon agent --doctor
archon agent --doctor --agent claude
```

## Supported Agents

| Agent | Description |
|-------|-------------|
| `opencode` | Recommended. Full transport support including persistent server (`--attach`). |
| `claude` | Claude Code CLI. File-attachment and stdin. |
| `cursor` | Cursor IDE integration. File-attachment. |
| `gemini` | Google Gemini CLI. File-attachment. |
| `manual` | No agent. Prints prompt to stdout for manual copy-paste. |

## Examples

```bash
# Set default agent to opencode
archon agent --set opencode

# Check if the configured agent is working
archon agent --doctor

# Check a specific agent
archon agent --doctor --agent claude
```

## See Also

- [`archon run`](run.md) — execute the configured agent
- [`archon config`](config.md) — manage other project defaults
- [`archon init`](init.md) — set agent at project creation
