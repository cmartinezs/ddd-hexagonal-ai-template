[← Index](../README.md) | [< Anterior](../principles/README.md) | [Siguiente >](../patterns/README.md)

---

# SOLID Principles

## Description

Five object-oriented design principles for better software.

## The Five Principles

### S — Single Responsibility

> A class/function should have one reason to change.

```
Bad:  class UserManager { authenticate(), validate(), sendEmail(), log() }
Good: class AuthService { authenticate() }, class EmailService { sendEmail() }
```

### O — Open/Closed

> Open for extension, closed for modification.

```
Bad:  Modify existing class for new behavior
Good: Add new class/method that extends existing behavior
```

### L — Liskov Substitution

> Subtypes must be substitutable for their base types.

```
Bad:  Subclass removes behavior from parent
Good: Subclass extends behavior, never removes
```

### I — Interface Segregation

> Prefer many specific interfaces over one general interface.

```
Bad:  interface IUser { login(), delete(), backup(), render() }
Good: interface IAuth { login() }, interface IAdmin { delete() }
```

### D — Dependency Inversion

> Depend on abstractions, not concretions.

```
Bad:  class Service { db *MySQL }
Good: class Service { db DB interface{} }
```

---

## Files in this folder

- `README.md` — This file
- `TEMPLATE-s-examples.md` — Single Responsibility examples

---

[← Index](../README.md) | [< Anterior](../principles/README.md) | [Siguiente >](../patterns/README.md)