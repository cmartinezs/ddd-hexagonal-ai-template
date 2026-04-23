[← Index](./README.md)

---

# Database Performance Optimization

## Purpose

Template for database performance optimization patterns.

> **Note**: This is a template. Adapt to your database and ORM.

---

## Query Optimization

### Use Projections

```sql
-- ❌ BAD: Fetches entire entity
SELECT * FROM users WHERE tenant_id = :id;

-- ✅ GOOD: Only required columns
SELECT id, name, email FROM users WHERE tenant_id = :id;
```

### Use Pagination

```sql
-- ❌ BAD: Fetches all rows
SELECT * FROM users;

-- ✅ GOOD: Paginate
SELECT * FROM users LIMIT 20 OFFSET 0;
```

### Avoid SELECT *

Specify columns explicitly in JOIN queries.

---

## N+1 Query Problem

### Detection

```sql
-- Enable SQL logging
logging.level.hibernate.SQL: DEBUG

-- Look for:
-- Query 1: SELECT * FROM users
-- Query 2-100: SELECT * FROM roles WHERE user_id = ?
```

### Solutions

### Solution 1: JOIN FETCH

```sql
-- Load related data in single query
SELECT DISTINCT u FROM User u
LEFT JOIN FETCH u.roles
WHERE u.tenantId = :tenantId;
```

### Solution 2: Batch Fetching

```sql
-- Configure batch size in entity
@OneToMany
@BatchSize(size = 20)
private List<Role> roles;
```

---

## Indexing Strategy

### Common Indexes

| Table | Columns | Reason |
|-------|---------|-------|
| users | tenant_id | Multi-tenant filter |
| users | (tenant_id, status) | Common filter |
| users | (tenant_id, email) | Lookup |
| audit_logs | created_at | Date queries |

### Multi-Tenant Index

```sql
-- Always index tenant_id first
CREATE INDEX idx_users_tenant ON users(tenant_id);

-- Composite for common queries
CREATE INDEX idx_users_tenant_status ON users(tenant_id, status);
```

### Check Index Usage

```sql
-- See which indexes are used
SELECT * FROM pg_stat_statements 
WHERE query LIKE '%users%'
ORDER BY calls DESC;

-- Unused indexes
SELECT * FROM pg_stat_user_indexes 
WHERE idx_scan = 0;
```

---

## Connection Pooling

### Configuration

| Parameter | Recommended |
|-----------|-------------|
| max-pool-size | 20 |
| min-idle | 5 |
| connection-timeout | 30000ms |
| idle-timeout | 600000ms |
| max-lifetime | 1800000ms |

### Monitor Pool

```java
// Example: Log pool metrics
log.info("Pool: active={} idle={} waiting={}", 
    active, idle, waiting);
```

---

## Performance Checklist

- [ ] Use projections, not SELECT *
- [ ] Paginate large result sets
- [ ] Use JOIN FETCH for relationships
- [ ] Index tenant_id first for multi-tenant
- [ ] Index filter columns
- [ ] Configure connection pool
- [ ] Monitor slow queries

---

[← Index](./README.md)