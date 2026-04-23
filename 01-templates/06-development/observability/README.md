[← Index](../README.md) | [< Anterior](./auth/README.md) | [Siguiente >](./database/README.md)

---

# Observability

## Purpose

This section covers observability: logs, metrics, traces, and health checks.

> **Note**: These are optional templates. Use when your project needs production monitoring.

## Contents

1. [Overview](#overview)
2. [Logs](./logs/README.md) — Log management
3. [Metrics](./metrics/README.md) — Metrics collection
4. [Traces](./traces/README.md) — Distributed tracing
5. [Health](./health/README.md) — Health checks

---

## When to Use

| Environment | Recommended |
|-------------|-------------|
| Development | Minimal |
| Production | ✅ Full observability |
| Debugging issues | ✅ Logs + traces |

## Three Pillars

| Pillar | Purpose | Question |
|--------|---------|----------|
| **Logs** | Event recording | What happened? |
| **Metrics** | Quantitative data | How much? |
| **Traces** | Request flow | Why? |

---

## Decision Guide

```
Production deployment?
  └── No → Skip observability
  └── Yes → Add observability
       ↓
       Logs → Metrics → Traces → Health
```

---

[← Index](../README.md) | [< Anterior](./auth/README.md) | [Siguiente >](./database/README.md)