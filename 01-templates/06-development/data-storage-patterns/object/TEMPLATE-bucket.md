[← Index](./README.md)

---

# Object Bucket Template

## Purpose

Template for object storage configuration.

## Template

```markdown
# Bucket: [bucket-name]

## Configuration

| Setting | Value |
|---------|-------|
| Region | us-east-1 |
| Versioning | Enabled |
| Encryption | AES256 |
| Public Access | Blocked |

## Permissions

| Principal | Action |
|-----------|--------|
| Service account | s3:* |

## Lifecycle Rules

| Rule | Action | After |
|------|--------|-------|
| Delete old versions | Delete | 90 days |
| Archive to cold storage | Move to Glacier | 30 days |
```

---

[← Index](./README.md)