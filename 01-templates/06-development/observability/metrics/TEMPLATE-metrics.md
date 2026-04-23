[← Index](./README.md)

---

# Metrics Template

## Purpose

Template for metrics specification.

## Template

```markdown
# Metrics: [Service]

## Counters

| Metric | Description | Labels |
|--------|-------------|--------|
| requests_total | Total requests | method, status |
| errors_total | Total errors | type |

## Gauges

| Metric | Description |
|--------|-------------|
| active_connections | Active connections |
| memory_usage_bytes | Memory usage |

## Histograms

| Metric | Description | Buckets |
|--------|-------------|----------|
| request_duration_ms | Request duration | 100, 250, 500, 1000 |
| response_size_bytes | Response size | 1000, 10000, 100000 |
```

## Alert Rules

| Metric | Condition | Action |
|--------|-----------|--------|
| error_rate | > 5% for 5min | PagerDuty |
| p99_latency | > 1000ms | Email |
```

---

[← Index](./README.md)