# Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### "archon: command not found"

```bash
# Reinstall globally
npm install -g @archon/cli

# Verify installation
npm list -g @archon/cli

# Check PATH
npm bin -g
```

### "Permission denied" during install

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use sudo
sudo npm install -g @archon/cli
```

## Project Initialization

### "Project directory already exists"

```bash
# Check if directory exists
ls -la my-project/

# If it's an old Archon project
cd my-project
archon status

# If it's unrelated, choose a different name
archon init --name "my-project-v2"
```

### "Template not found in cache"

```bash
# Pull the template
archon templates pull ddd-hexagonal-ai-template

# Then retry
archon init --name "my-project"
```

### "Already in an Archon project"

You ran `archon init` from inside an existing Archon project. Navigate out:

```bash
cd ..
archon init --name "new-project"
```

## Phase and Prompt Issues

### "Invalid phase index" or "Must be 0-11"

Phases are numbered 0-11. Phase 0 is Documentation Planning, Phase 11 is Feedback.

```bash
# Correct
archon prompt --phase 3

# Wrong
archon prompt --phase 3  # phase 3 exists, but:
# If you meant phase "03", use --phase 3 (number, not string)
```

### AI output is too generic

1. Use `--context full` for richer prompts:
```bash
archon prompt --phase 3 --context full
```

2. Run context scan first:
```bash
archon context scan
archon prompt --phase 3 --context full
```

3. Edit `.archon/prompts/phase-N-*.md` before sending to agent

### "No project state"

You ran a command from outside an Archon project:

```bash
# Check your location
pwd
archon status

# Navigate to project
cd my-project
archon status
```

## Agent Issues

### "opencode not found in PATH"

Install opencode or switch agents:

```bash
# Install opencode
curl -fsSL https://... | sh

# Or use claude instead
archon agent --set claude
```

### Agent execution hangs

1. Check with `--dry-run` first:
```bash
archon run --agent opencode --phase 3 --dry-run
```

2. Check agent availability:
```bash
archon agent --doctor --agent opencode
```

3. Try with `--confirm` to see what's about to happen:
```bash
archon run --agent opencode --phase 3 --confirm
```

### Clipboard copy fails

```bash
# Linux: install xclip
sudo apt install xclip

# macOS: should work out of the box
# Windows: use WSL or install clip
```

## State and Checksum

### "State was modified externally"

```bash
# Check with doctor
archon doctor

# Recalculate checksum
archon doctor --fix
```

### State file corrupted

Restore from backup (if exists):

```bash
# Check backups
ls .archon/backups/

# Restore from specific version
archon upgrade --rollback 0.1.0
```

## Template Cache

### "No cached versions"

```bash
# List what's in cache
archon templates ls

# Pull latest
archon templates pull ddd-hexagonal-ai-template

# Force update
archon templates update ddd-hexagonal-ai-template
```

### Disk space issues

```bash
# Check cache size
archon templates ls

# Clean old versions
archon templates remove ddd-hexagonal-ai-template@0.1.0

# Or clean everything
rm -rf ~/.archon/templates/
```

## Upgrade Issues

### "Project version is ahead of template"

```bash
# Check versions
archon upgrade --info

# This is usually a configuration error — don't proceed without understanding why
```

### Rollback fails

```bash
# Check available backups
ls .archon/backups/

# If no backup exists, you cannot rollback
# Restore from git instead:
git checkout <previous-commit>
```

## Getting Help

```bash
# General help
archon --help

# Command-specific help
archon <command> --help

# Phase-specific help
archon guide --phase 3

# Health check
archon doctor

# Tutorial
archon tutorial
```
