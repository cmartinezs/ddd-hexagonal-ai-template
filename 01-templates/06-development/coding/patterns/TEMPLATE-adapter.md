[← Index../README.md)

---

# Adapter Pattern Template

## Purpose

Template for implementing Adapter pattern for legacy integration.

## Template

```typescript
// === Existing interface ===

interface LegacyUserService {
  saveUser(data: LegacyUserData): void;
}

// === Target interface ===

interface UserRepository {
  save(user: User): void;
}

// === Adapter ===

class UserRepositoryAdapter implements UserRepository {
  private legacyService: LegacyUserService;
  
  constructor(legacyService: LegacyUserService) {
    this.legacyService = legacyService;
  }
  
  save(user: User): void {
    const legacyData = this.toLegacyFormat(user);
    this.legacyService.saveUser(legacyData);
  }
  
  private toLegacyFormat(user: User): LegacyUserData {
    return {
      userId: user.id,
      userEmail: user.email,
      // mapping logic
    };
  }
}

// === Usage ===

const adapter = new UserRepositoryAdapter(legacyService);
adapter.save(user);
```

---

[← Index../README.md)