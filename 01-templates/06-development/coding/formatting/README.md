[← Index](./README.md)

---

# Code Formatting

## Purpose

Basic formatting rules for consistent code style.

> **Note**: This is a template. Adapt rules to your language and framework.

## Universal Rules

| Rule | Recommendation |
|------|-------------|
| Encoding | UTF-8 |
| Line ending | LF (Unix-style) |
| Max line length | 100-120 characters |
| Indentation | Consistent (spaces, no tabs) |

---

## By Language

### Indentation

| Language | Convention |
|----------|------------|
| Java, JavaScript, C# | 2 or 4 spaces |
| Python | 4 spaces |
| Go | Tab (idiomatic) |
| Rust | 4 spaces |
| YAML | 2 spaces |

### Line Length

| Language | Max |
|----------|-----|
| Java, JavaScript | 100-120 |
| Python | 79-100 (PEP 8) |
| Go | No hard limit |
| Rust | 100 |

### Naming Conventions

| Language | Classes | Functions | Variables | Constants |
|----------|---------|-----------|-----------|----------|
| Java | PascalCase | camelCase | camelCase | SCREAMING_SNAKE |
| JavaScript | PascalCase | camelCase | camelCase | UPPER_SNAKE |
| Python | PascalCase | snake_case | snake_case | UPPER_SNAKE |
| Go | PascalCase | PascalCase | camelCase | PascalCase |
| Rust | PascalCase | snake_case | snake_case | SCREAMING_SNAKE |

### File Naming

| Language | Convention | Example |
|----------|------------|---------|
| Java | PascalCase.java | UserService.java |
| JavaScript | kebab-case.js | user-service.js |
| Python | snake_case.py | user_service.py |
| Go | snake_case.go | user_service.go |
| TypeScript | kebab-case.ts | user-service.ts |

### Imports

| Language | Rule |
|----------|------|
| Java | No wildcard (`import java.util.*`) |
| Python | Absolute imports (Python 3) |
| Go | Group: stdlib → external → internal |

---

## Tools

| Language | Formatter |
|----------|-----------|
| Java | Spotless |
| JavaScript/TypeScript | Prettier |
| Python | Black |
| Go | gofmt |
| Rust | rustfmt |

---

[← Index](./README.md)