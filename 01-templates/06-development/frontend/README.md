[← Index](../README.md) | [< Anterior ../glossary/README.md)

---

# Frontend Architecture

## Purpose

This section covers frontend development across platforms: web, mobile, desktop, and non-traditional interfaces.

> **Note**: These are optional templates. Use when your project has a user interface.

## Contents

| Folder | Description |
|--------|-------------|
| [web](./web/README.md) | Browser-based applications |
| [mobile](./mobile/README.md) | iOS/Android applications |
| [desktop](./desktop/README.md) | Native desktop applications |
| [ui-design](./ui-design/README.md) | User interface principles |
| [state](./state/README.md) | Client state handling |
| [integration](./integration/README.md) | API communication |
| [project-structure](./project-structure/README.md) | Feature-first organization |
| [component-patterns](./component-patterns/README.md) | Component architecture |

---

## Platform Decision Guide

| Platform | Best For | When NOT to Use |
|----------|---------|----------------|
| **Web** | General purpose, accessibility | Complex graphics, offline-first |
| **Mobile** | Native UX, device features | Desktop-only users |
| **Desktop** | Performance, native access | Web is sufficient |

---

## Architecture Layers

```
┌─────────────────────┐
│ UI Layer            │ Components, screens
├─────────────────────┤
│ State Management    │ Global state, caching
├─────────────────────┤
│ Service Layer        │ API calls, business logic
├─────────────────────┤
│ Platform Integration│ Native APIs, storage
└─────────────────────┘
```

---

## Key Principles

| Principle | Description |
|------------|-------------|
| **Separation of Concerns** | UI ≠ State ≠ Services |
| **Platform Abstraction** | Share logic, adapt UI |
| **Offline-First** | Graceful degradation |
| **Accessibility** | Inclusive design |

---

[← Index](../README.md) | [< Anterior ../glossary/README.md)