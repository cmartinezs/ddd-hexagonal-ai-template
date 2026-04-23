[← Index](./README.md)

---

# Permissions Template

## Purpose

Template for detailed permissions specification.

## Template

```markdown
# Permissions: [Project Name]

## Permission Structure

```
{resource}:{action}:
- resource: users, org, applications, etc.
- action: read, write, delete, etc.
```

## Permission Examples

| Permission | Description |
|------------|-------------|
| users:read | View user list |
| users:write | Create/update users |
| users:delete | Delete users |
| org:read | View organization |
| org:admin | Manage organization |

## Resource Hierarchy

```
Organization
├── users
│   ├── users:read
│   ├── users:write
│   └── users:delete
├── applications
│   ├── applications:read
│   ├── applications:write
│   └── applications:delete
└── billing
    ├── billing:read
    └── billing:write
```

## Assignment

```
User → Roles → Permissions
```

---

[← Index](./README.md)