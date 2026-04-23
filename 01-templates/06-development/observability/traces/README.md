[← Index](../README.md) | [< Anterior](../metrics/README.md) | [Siguiente >](../health/README.md)

---

# Traces

## Description

Distributed tracing: request flow across services.

## When to Use

| Use Case | Recommended |
|---------|-------------|
| Microservices | ✅ |
| Debug slow requests | ✅ |
| Multi-service debugging | ✅ |
| Single service | Minimal |

---

## Trace Structure

```
Trace: [trace-id]
├── Span: Service A
├── Span: Service B
│   └── Span: Database
└── Span: Service A (response)
```

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-trace.md` — Trace template

---

[← Index](../README.md) | [< Anterior](../metrics/README.md) | [Siguiente >](../health/README.md)