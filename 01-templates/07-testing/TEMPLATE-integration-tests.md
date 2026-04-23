[← Index ./README.md)

---

# Integration Tests Template

## Purpose

Template for integration tests that verify component collaboration.

> **Note**: This is a template. Use for testing with real infrastructure.

---

## Principles

| Principle | Description |
|-----------|-------------|
| Real infrastructure | Real database, real components |
| Slower than unit | Run in separate suite |
| E2E-like | Tests full flow |

---

## Structure

### Testcontainers Example (Java)

```java
@Testcontainers
class UserRepositoryTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
    .withDatabaseName("testdb")
    .withUsername("test")
    .withPassword("test");

  @Test
  void findById_shouldReturnUser() {
    // Given
    User user = new User("test@example.com");
    repository.save(user);
    
    // When
    Optional<User> result = repository.findById(user.id());
    
    // Then
    assertThat(result).isPresent();
    assertThat(result.get().email()).isEqualTo("test@example.com");
  }
}
```

### React Testing Library (Frontend)

```typescript
describe('UserList', () => {
  it('should render users from API', async () => {
    // Given
    const mockUsers = [{ id: '1', name: 'John' }];
    server.use(http.get('/api/users', () => HttpResponse.json(mockUsers)));
    
    // When
    render(<UserList />);
    
    // Then
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
```

---

## What to Test

| Include | Exclude |
|---------|---------|
| Repository queries | Unit logic |
| API endpoints | UI rendering alone |
| Component integration | Mock-only scenarios |

---

## Tools

| Language | Tool |
|----------|------|
| Java | Testcontainers |
| JavaScript | React Testing Library, MSW |
| Python | pytest + testcontainers |

---

[← Index ./README.md)