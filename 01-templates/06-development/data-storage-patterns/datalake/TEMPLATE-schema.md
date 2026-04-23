[← Index ./README.md)

---

# Data Warehouse Schema Template

## Purpose

Template for data warehouse schema.

## Template

```markdown
# Schema: [data_warehouse]

## Tables (Facts)

| Table | Description | Source |
|-------|-------------|--------|
| orders_fact | Order transactions | DB |
| events_fact | User events | App |

## Tables (Dimensions)

| Table | Description | Type |
|-------|-------------|------|
| users_dim | User attributes | SCD Type 2 |
| products_dim | Product catalog | SCD Type 1 |
| dates_dim | Date hierarchy | Static |

## ETL Jobs

| Job | Frequency | Source | Target |
|-----|-----------|--------|--------|
| orders_etl | Hourly | DB | warehouse |
| users_etl | Daily | DB | warehouse |
```

---

[← Index ./README.md)