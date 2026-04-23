[← Index](./README.md)

---

# Component Patterns

## Purpose

Component architecture patterns for frontend development.

> **Note**: This is a template. Adapt to your framework.

---

## Patterns

### Presentational vs Container

| Pattern | Responsibility | Example |
|----------|---------------|---------|
| **Presentational** | UI rendering, markup | UserForm.tsx |
| **Container** | Data fetching, state | UserFormContainer.tsx |

### Compound Components

Components that work together:

```tsx
// Parent
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

### Hooks Patterns

| Pattern | Use |
|---------|-----|
| Custom hooks | Encapsulate logic |
| Composition | Combine hooks |
| Context | Share state |

---

## Component Hierarchy

```
App (Routing)
├── Layout (wrapper)
│   ├── Page (container)
│   │   ├── Component (presentational)
│   │   │   └── Atom (basic element)
```

---

## Naming

| Layer | Suffix | Example |
|-------|--------|---------|
| Page | Page | UsersPage.tsx |
| Container | Container | UserFormContainer.tsx |
| Component | (none) | UserForm.tsx |
| Atom | (none) | Button.tsx |

---

## Files in this folder

- `README.md` — This file

---

[← Index](./README.md)