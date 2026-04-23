[← Index](./README.md)

---

# RBAC Template

## Purpose

Template for Role-Based Access Control.

## Template

```markdown
# RBAC: [Project Name]

## Roles

| Role | Description | Scope |
|------|-------------|-------|
| ADMIN | Full access | Organization |
| USER | Standard user | Organization |
| VIEWER | Read-only | Organization |

## Role Hierarchy

```
PLATFORM_ADMIN
    ↓
    ORG_ADMIN
    ↓
    ORG_USER
    ↓
    VIEWER
```

## Permissions Matrix

| Resource | ADMIN | USER | VIEWER |
|----------|-------|------|-------|
| users:read | ✅ | ✅ | ✅ |
| users:write | ✅ | ❌ | ❌ |
| users:delete | ✅ | ❌ | ❌ |
| org:read | ✅ | ✅ | ✅ |
| org:write | ✅ | ❌ | ❌ |

## Implementation Pattern

```typescript
// Check permission
function hasPermission(user: User, permission: string): boolean {
  const rolePermissions = rolePermissionsMap[user.role];
  return rolePermissions.includes(permission);
}

// Decorator/attribute
@RequirePermission('users:write')
function updateUser() { }
```

---

[← Index](./README.md)