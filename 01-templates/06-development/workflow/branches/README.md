[← Index](../README.md) | [< Anterior](../README.md) | [Siguiente >](../commits/README.md)

---

# Branch Strategy

## Description

Branch naming and organization for development.

## Common Strategies

### GitFlow
| Branch | Purpose | Base | Merges To |
|--------|---------|------|-----------|
| main | Production | - | - |
| develop | Integration | main | main |
| feature/* | New features | develop | develop |
| bugfix/* | Bug fixes | develop | develop |
| hotfix/* | Production fixes | main | main + develop |
| release/* | Release prep | develop | main |

### Trunk-Based
| Branch | Purpose |
|--------|----------|
| main | Direct commits |

---

## Naming Conventions

| Branch Type | Pattern | Example |
|------------|----------|----------|
| Feature | feature/{id}-{description} | feature/123-user-login |
| Bugfix | bugfix/{id}-{description} | bugfix/456-fix-login |
| Hotfix | hotfix/{id}-{description} | hotfix/789-security |
| Release | release/v{major}.{minor} | release/v1.0.0 |

---

## Files in this folder

- `README.md` — This file

---

[← Index](../README.md) | [< Anterior](../README.md) | [Siguiente >](../commits/README.md)