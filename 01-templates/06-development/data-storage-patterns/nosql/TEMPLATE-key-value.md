[← Index ./README.md)

---

# Key-Value Template

## Purpose

Template for key-value databases (Redis, DynamoDB, etc.).

## Template

```markdown
# Key Design: [domain]

## Keys

| Key Pattern | Value Type | TTL | Description |
|-------------|------------|-----|-------------|
| user:{userId} | Hash | 24h | User session |
| token:{tokenId} | String | 1h | Refresh token |
| rate:{ip}:{action} | Counter | 60s | Rate limit |

## Value Structures

### Session Hash

```
Key: user:user-123
Hash:
  - userId: user-123
  - email: user@example.com
  - roles: ["ADMIN"]
  - createdAt: timestamp
```

### Rate Limit Counter

```
Key: rate:192.168.1.1:login
Value: 5
TTL: 60 seconds
```

---

[← Index ./README.md)