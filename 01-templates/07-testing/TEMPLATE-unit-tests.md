[← Index ./README.md)

---

# Unit Tests Template

## Purpose

Template for writing unit tests.

> **Note**: This is a template. Adapt to your language and framework.

---

## Principles

| Principle | Description |
|-----------|-------------|
| Framework-agnostic | No Spring context, no render |
| Fast | Milliseconds per test |
| Deterministic | Same result every time |
| Isolated | Test one behavior |

---

## Structure

### Test Class

```java
// Java
@ExtendWith(MockitoExtension.class)
class CreateUserUseCaseTest {

  @Mock
  private UserRepository userRepository;
  
  @InjectMocks
  private CreateUserUseCase createUserUseCase;
  
  @Test
  void execute_whenEmailExists_throwsException() {
    // Given
    when(userRepository.existsByEmail(any())).thenReturn(true);
    
    // When / Then
    assertThatThrownBy(() -> createUserUseCase.execute(cmd))
        .isInstanceOf(DuplicateEmailException.class);
  }
}
```

```typescript
// TypeScript
describe('useAuth', () => {
  it('should return user when logged in', () => {
    // Given
    const mockToken = 'valid-token';
    
    // When
    const result = useAuth(mockToken);
    
    // Then
    expect(result.isAuthenticated).toBe(true);
  });
});
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Test class | `<Class>Test` | `UserServiceTest` |
| Test method | `should_<expected>_when_<condition>` | `shouldThrowException_whenEmailExists` |
| Test file | `<name>.test.ts` | `user.test.ts` |

---

## AAA Pattern

```
// Arrange - Given
// Act - When
// Assert - Then
```

---

## What to Test

| Include | Exclude |
|---------|---------|
| Domain logic | Framework plumbing |
| Value objects | Controller wiring |
| Use cases | HTTP requests |
| Edge cases | Database |

---

[← Index ./README.md)