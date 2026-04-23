[← Index](./README.md)

---

# Search Index Template

## Purpose

Template for search engine indices.

## Template

```markdown
# Index: [index_name]

## Mapping

| Field | Type | Searchable | Stored |
|-------|------|-------------|--------|
| id | keyword | false | true |
| title | text | true | true |
| description | text | true | true |
| status | keyword | false | true |
| createdAt | date | false | true |

## Settings

{
  "number_of_shards": 1,
  "number_of_replicas": 1
}
```

---

[← Index](./README.md)