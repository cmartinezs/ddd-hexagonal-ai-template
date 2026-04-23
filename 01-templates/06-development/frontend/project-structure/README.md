[← Index](./README.md)

---

# Project Structure

## Purpose

Feature-first organization for frontend projects.

> **Note**: This is a template. Adapt to your framework.

---

## Folder Structure

```
src/
├── main.tsx                    # Bootstrap: i18n, QueryClient, Router
├── App.tsx                     # Routes, guards, layouts
│
├── app/                        # App-level code
│   ├── guards/                # Route guards (AuthGuard, RoleGuard)
│   └── layouts/                # Shared layouts
│
├── features/                   # Feature-first modules by domain
│   ├── auth/                   # Authentication
│   ├── user/                   # User management
│   ├── billing/                # Billing (if applicable)
│   └── admin/                   # Admin panel
│
├── shared/                     # Cross-cutting code
│   ├── api/                   # HTTP client, helpers
│   ├── hooks/                 # Reusable hooks
│   ├── lib/                   # Infrastructure (auth, config, i18n)
│   ├── mocks/                 # MSW setup (if used)
│   ├── types/                 # Shared types & DTOs
│   └── ui/                    # Reusable UI components
│
└── styles/                    # Global styles
```

---

## Layers

| Layer | Purpose |
|-------|---------|
| **app/** | Guards, layouts, routing |
| **features/** | Business logic by domain |
| **shared/** | Reusable infrastructure |

---

## Naming Conventions

| Layer | Naming | Example |
|-------|--------|---------|
| Page | `<Feature>Page` | `UsersPage.tsx` |
| Container | `<Feature>Container` | `UserFormContainer.tsx` |
| Component | `<Component>` | `UserForm.tsx` |
| Atom | `<Element>` | `TextField.tsx` |
| Compound | `<Compound>.*` | `Modal.Header`, `Modal.Body` |

---

## By Framework

### React/Vue

```
features/
├── auth/
│   ├── pages/
│   ├── containers/
│   ├── components/
│   └── hooks/
└── shared/
    ├── api/
    ├── hooks/
    └── ui/
```

### Mobile (React Native/Flutter)

```
lib/
├── api/
├── screens/
├── components/
└── navigation/
```

---

## Files in this folder

- `README.md` — This file

---

[← Index](./README.md)