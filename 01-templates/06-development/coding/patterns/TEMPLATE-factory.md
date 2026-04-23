[← Index../README.md)

---

# Factory Pattern Template

## Purpose

Template for implementing Factory pattern.

## Template

```typescript
// === Interface ===

interface UserFactory {
  create(type: string): User;
}

// === Implementation ===

class AdminFactory implements UserFactory {
  create(type: string): User {
    switch (type) {
      case 'admin': return new AdminUser();
      case 'user': return new RegularUser();
      default: throw new Error('Unknown type');
    }
  }
}

// === Usage ===

const factory = new AdminFactory();
const user = factory.create('admin');
```

---

[← Index../README.md)