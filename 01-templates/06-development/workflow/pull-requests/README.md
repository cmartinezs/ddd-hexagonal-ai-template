[← Index../README.md) | [< Anterior../commits/README.md) | [Siguiente >../cicd/README.md)

---

# Pull Request Process

## Description

How to create, review, and merge PRs.

## PR Template

```markdown
## Description

Brief description of changes

## Changes

- Change 1
- Change 2

## Testing

- [ ] Unit tests passing
- [ ] Integration tests passing

## Checklist

- [ ] Code follows standards
- [ ] No secrets in code
- [ ] Documentation updated
```

## Review Rules

| Change Type | Min Reviewers |
|--------------|----------------|
| Bug fix | 1 |
| Feature | 2 |
| Breaking | 3 |
| Security | 2 + Security team |

## Merge Strategies

| Strategy | When to Use |
|-----------|--------------|
| Squash and merge | Default - clean history |
| Rebase and merge | Linear history for related |
| Merge commit | Shared history (rare) |

---

## Files in this folder

- `README.md` — This file

---

[← Index../README.md) | [< Anterior../commits/README.md) | [Siguiente >../cicd/README.md)