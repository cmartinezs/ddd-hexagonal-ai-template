[← Index](./README.md)

---

# Document Database Template

## Purpose

Template for document databases (MongoDB, etc.).

## Template

```markdown
# Collection: [collection_name]

## Document Structure

{
  "_id": "auto-generated",
  "email": "user@example.com",
  "profile": {
    "name": "John Doe",
    "avatar": "url"
  },
  "settings": {
    "notifications": true,
    "theme": "dark"
  },
  "createdAt": ISODate("2024-01-01"),
  "updatedAt": ISODate("2024-01-01"),
  "version": 0
}
```

## Indexes

| Index | Fields | Options |
|-------|--------|---------|
| email | { email: 1 } | { unique: true } |
| status | { status: 1 } | {} |

## Queries

| Operation | Query |
|------------|-------|
| Find by ID | db.users.findOne({ _id }) |
| Find by email | db.users.findOne({ email }) |
| List by status | db.users.find({ status: 'ACTIVE' }) |
```

---

[← Index](./README.md)