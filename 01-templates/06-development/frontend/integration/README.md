[← Index](./README.md) | [< Anterior](../state/README.md)

---

# API Integration

## Purpose

Communication between frontend and backend.

> **Note**: This is a template. Adapt to your HTTP client and data fetching.

## Layer Architecture

```
┌──────────────────┐
│ HTTP Client      │ Axios, Fetch
├──────────────────┤
│ Response Helper │ Unwrap response
├──────────────────┤
│ Error Normalizer│ Translate errors
├──────────────────┤
│ Query Manager   │ TanStack Query, SWR
└──────────────────┘
```

## HTTP Client Setup

| Component | Purpose |
|-----------|---------|
| Request Interceptor | Add auth token |
| Response Interceptor | Handle errors |
| Retry Logic | Transient failures |

## Data Fetching Patterns

| Pattern | When to Use |
|---------|-------------|
| Query | Read data, caching |
| Mutation | Write data |
| Subscription | Real-time |

## Authentication

| Flow | Description |
|------|-------------|
| Bearer Token | Access token in header |
| Cookie | HttpOnly cookie |
| Refresh | Automatic token refresh |

## Error Handling

| Status | Handling |
|--------|----------|
| 4xx | Show user message |
| 5xx | Retry or show error |
| Network | Show offline message |

---

[← Index](./README.md) | [< Anterior](../state/README.md)