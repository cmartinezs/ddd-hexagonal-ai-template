[← Index](./README.md)

---

# Token Structure Template

## Purpose

Template for defining token contents.

## Template

```markdown
# Token: [Token Type]

## Access Token

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "tenant_id": "org-uuid",
  "roles": ["ADMIN", "USER"],
  "aud": "my-application",
  "iss": "https://api.example.com",
  "exp": 1704067200,
  "iat": 1704063600,
  "jti": "token-uuid"
}
```

## Token Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| sub | UUID | ✅ | User identifier |
| email | string | ✅ | User email |
| tenant_id | UUID | ⚠️ | Organization scope |
| roles | array | ✅ | User roles |
| aud | string | ✅ | Target application |
| iss | string | ✅ | Issuer URL |
| exp | unix | ✅ | Expiration |
| iat | unix | ✅ | Issued at |
| jti | UUID | ✅ | Token ID |

## Refresh Token

| Field | Description |
|-------|-------------|
| token | Opaque token |
| user_id | User reference |
| expires_at | Expiration |
| issued_at | Issued at |

## Token Storage (Client)

| Storage | Security | Use Case |
|---------|----------|----------|
| Memory | ✅ Secure | Web apps |
| Memory | ✅ Secure | Mobile |
| localStorage | ❌ Vulnerable | Never |

---

[← Index](./README.md)