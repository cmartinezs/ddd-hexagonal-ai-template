# 🔍 DEEPENING: Scope 08 — Upgrade + Migration System

> **Status:** PENDING
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Implement the template upgrade system: `archon upgrade`, rollback support, migration file structure, and versioning strategy.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Implement template versioning (semantic: MAJOR.MINOR.PATCH) | GENERATE-DOCUMENT | PENDING | Versioning system |
| 2 | Create `UPGRADE/` folder with migration guides per version | GENERATE-DOCUMENT | PENDING | Migration guides |
| 3 | Implement `archon upgrade [--target <version>] [--dry-run]` | GENERATE-DOCUMENT | PENDING | `upgrade.ts` command |
| 4 | Implement `archon upgrade --rollback <version>` | GENERATE-DOCUMENT | PENDING | Rollback command |
| 5 | Implement breaking change detection | GENERATE-DOCUMENT | PENDING | Breaking change detector |
| 6 | Implement auto-apply for non-breaking changes | GENERATE-DOCUMENT | PENDING | Auto-apply logic |
| 7 | Create migration log (`.archon/migration-log.md`) | GENERATE-DOCUMENT | PENDING | Migration log |
| 8 | Create upgrade command integration tests | GENERATE-DOCUMENT | PENDING | Integration tests |

---

## Versioning Strategy

### Version File

Template root: `VERSION` (e.g., `1.0.0`)

### Semantic Versioning Rules

| Change | Version Bump | Migration Required |
|--------|-------------|-------------------|
| Bug fixes, template additions | PATCH (`1.0.0` → `1.0.1`) | No (auto-apply) |
| New phases, new files, non-breaking changes | MINOR (`1.0.0` → `1.1.0`) | Optional (show changelog) |
| Phase renamed, file removed, schema change | MAJOR (`1.0.0` → `2.0.0`) | Yes (manual migration guide) |

### Version Detection

`archon` reads `template/VERSION` to get current template version.

---

## Migration File Structure

```
ddd-template/
├── VERSION                     # e.g., "1.0.0"
├── CHANGELOG.md                # Full changelog (semantic commits)
└── UPGRADE/
    ├── 1.0-to-1.1.md           # Migration guide: 1.0 → 1.1
    ├── 1.1-to-1.2.md           # Migration guide: 1.1 → 1.2
    └── 2.0-to-2.1.md           # Migration guide: 2.0 → 2.1
```

### Migration Guide Template (`UPGRADE/X-to-Y.md`)

```markdown
# Upgrade from X to Y

Released: YYYY-MM-DD

## Breaking Changes

### Phase renamed
- Before: Phase 3 was called "Design"
- After: Phase 3 is now "Strategic Design"
- Action: Rename your Phase 3 folder and update all references

### File removed
- `TEMPLATE-old.md` was removed
- Action: Delete `TEMPLATE-old.md` from your project if present

## New Features

### New phase: Phase 12
- New: Phase 12 "Architecture Review" added
- Action: (Optional) Implement if applicable

## Non-Breaking Changes

### New template: TEMPLATE-new.md
- Added to Phase 4 (Data Model)
- Action: (Optional) Generate using `archon prompt --phase 4`

## Verification

After migration, run:
```bash
archon doctor
```
```

---

## Command Details

### `archon upgrade [--target <version>] [--dry-run]`

**Flow:**

1. Read current template version from `template/VERSION`
2. Read project template version from `project/.archon/template-version`
3. Compare versions:
   - If same: "Already on latest version (v1.0.0)"
   - If project > template: "Project is ahead of template. Inconsistent state."
   - If template > project: continue

4. Determine upgrade type:
   - PATCH: auto-apply
   - MINOR: show changelog, offer auto-apply
   - MAJOR: show breaking changes, require manual confirmation

5. **PATCH upgrade:**
   ```
   ✅ PATCH upgrade available (1.0.0 → 1.0.1)
   Non-breaking changes: 3 fixes, 1 new template
   Auto-applying...
   ✅ Upgrade complete
   ```

6. **MINOR upgrade:**
   ```
   📋 MINOR upgrade available (1.0.0 → 1.1.0)
   New features: Phase 12 (Architecture Review), new templates
   [Show changelog from CHANGELOG.md]
   Apply? (yes/no) › yes
   ✅ Upgrade complete
   ```

7. **MAJOR upgrade:**
   ```
   ⚠️  MAJOR upgrade available (1.0.0 → 2.0.0)
   Breaking changes: 2 items
   
   Breaking change 1:
   - Phase 3 renamed from "Design" to "Strategic Design"
   - See UPGRADE/1.0-to-2.0.md for full instructions
   
   Breaking change 2:
   - `TEMPLATE-old.md` removed
   
   Migration guide: UPGRADE/1.0-to-2.0.md
   This requires manual steps. Run `archon upgrade --guide 1.0-to-2.0` for step-by-step.
   
   Proceed with manual migration? (yes/no) › yes
   → Open UPGRADE/1.0-to-2.0.md
   ```

8. `--dry-run`: Show what would change without applying

### `archon upgrade --rollback <version>`

**Flow:**

1. Read migration log (`.archon/migration-log.md`)
2. List available rollback targets (previous versions)
3. Confirm rollback: "Rollback to v1.0.0? This will revert template files and state."
4. On confirm:
   - Restore template files from backup (`.archon/backups/v1.0.0/`)
   - Restore state.json from backup
   - Update `.archon/template-version` to rollback version
   - Log rollback in migration log
   - Output: "✅ Rolled back to v1.0.0"

### Rollback Implementation

- Before every upgrade (including patch), backup template files to `.archon/backups/<version>/`
- Backup includes: `01-templates/` (full), `.archon/state.json`, `.archon/config.json`
- Rollback restores from most recent backup for target version

---

## Migration Log Format

`.archon/migration-log.md`:

```markdown
# Archon Migration Log

## 2026-05-12: Upgrade 1.0.0 → 1.0.1
- Type: PATCH (auto-applied)
- Non-breaking: 3 bug fixes, 1 new template (TEMPLATE-new.md)
- Backup: .archon/backups/1.0.0/

## 2026-05-15: Upgrade 1.0.1 → 1.1.0
- Type: MINOR (user-confirmed)
- New features: Phase 12 added, 2 new templates
- Changed files: 5 added, 0 removed
- Backup: .archon/backups/1.0.1/

## 2026-05-20: Rollback 1.1.0 → 1.0.1
- Reason: Compatibility issue with existing project
- Restored from: .archon/backups/1.0.1/
```

---

## Done Criteria

- [ ] `VERSION` file exists in template root with semantic version
- [ ] `CHANGELOG.md` documents all version changes
- [ ] `UPGRADE/` contains one migration guide per major/minor version jump
- [ ] `archon upgrade` correctly detects upgrade type (PATCH/MINOR/MAJOR)
- [ ] PATCH upgrades auto-apply without user confirmation
- [ ] MINOR upgrades show changelog, require yes/no confirmation
- [ ] MAJOR upgrades show breaking changes, link to manual migration guide
- [ ] `archon upgrade --dry-run` shows what would change without applying
- [ ] `archon upgrade --rollback <version>` restores template files and state from backup
- [ ] Rollback is logged in migration log
- [ ] Migration log tracks all upgrades and rollbacks
- [ ] Integration tests cover: patch auto-apply, minor confirmation, major guide display, rollback
- [ ] TRACEABILITY.md updated

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)