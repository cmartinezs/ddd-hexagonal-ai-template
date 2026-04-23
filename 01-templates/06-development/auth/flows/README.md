[← Index](../README.md) | [< Anterior](../README.md) | [Siguiente >](../authorization/README.md)

---

# Authentication Flows

## Description

Authentication flows for different client types and security requirements.

## When to Use

| Client Type | Recommended Flow |
|-------------|------------------|
| Web apps with browser | Authorization Code + PKCE |
| Mobile apps | Authorization Code + PKCE |
| SPAs | Authorization Code + PKCE |
| API/CLI clients | Direct credentials |
| Service-to-service | Client credentials |

---

## Common Flows

| Flow | Security Level | Use Case |
|------|---------------|----------|
| **Authorization Code** | High | Web, Mobile |
| **Authorization Code + PKCE** | Higher | Public clients |
| **Direct Credentials** | Medium | Trusted clients |
| **Client Credentials** | Medium | Service-to-service |
| **Refresh Token** | Session management | Long-lived sessions |

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-auth-flow.md` — Auth flow template
- `TEMPLATE-token-structure.md` — Token template

---

[← Index](../README.md) | [< Anterior](../README.md) | [Siguiente >](../authorization/README.md)