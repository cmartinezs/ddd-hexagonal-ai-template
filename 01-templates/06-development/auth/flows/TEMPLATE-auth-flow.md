[← Index](./README.md)

---

# Authentication Flow Template

## Purpose

Template for documenting authentication flows.

## Template

```markdown
# Auth Flow: [Flow Name]

## When to Use

| Client Type | Recommended |
|------------|-------------|
| Web apps | Authorization Code + PKCE |
| Mobile | Authorization Code + PKCE |
| API/CLI | Direct credentials |

## Flow Steps

### 1. Authorization Request

```
GET {baseUrl}/authorize
  ?client_id={clientId}
  &redirect_uri={redirectUri}
  &scope={scopes}
  &code_challenge={challenge}
  &code_challenge_method=S256
  &state={state}
```

### 2. Authorization Response

```
302 Found
Location: {redirectUri}?code={authCode}&state={state}
```

### 3. Token Exchange

```
POST {baseUrl}/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={authCode}
&code_verifier={verifier}
&client_id={clientId}
&client_secret={clientSecret}
```

### 4. Token Response

```json
{
  "access_token": "{token}",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "{refreshToken}",
  "scope": "{scopes}"
}
```

## Token Contents

| Field | Required | Description |
|-------|----------|-------------|
| sub | ✅ | User identifier |
| email | ✅ | User email |
| roles | ✅ | User roles |
| tenant_id | ⚠️ | Organization scope |
| exp | ✅ | Expiration |
| iat | ✅ | Issued at |
| jti | ✅ | Token ID (for revocation) |

---

[← Index](./README.md)