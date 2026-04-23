[← Index](./README.md) | [< Previous](./TEMPLATE-040-user-feedback.md)

---

# Feedback Analytics

Analysis and metrics for user feedback: NPS, surveys, bugs, and feature requests.

## Contents

1. [NPS Analytics](#nps-analytics)
2. [Survey Analytics](#survey-analytics)
3. [Bug Analytics](#bug-analytics)
4. [Feature Request Analytics](#feature-request-analytics)
5. [Dashboards](#dashboards)

---

## NPS Analytics

### NPS Score Formula

```
NPS = %Promoters - %Detractors
```

### Key Metrics

| Metric | Description | Range |
|--------|-------------|-------|
| **NPS Score** | Net Promoter Score | -100 to +100 |
| **Promoters %** | Score 9-10 | 0-100% |
| **Passives %** | Score 7-8 | 0-100% |
| **Detractors %** | Score 0-6 | 0-100% |
| **Response Rate** | % users who respond | 0-100% |
| **Avg Score** | Average score | 0-10 |

### Queries

```sql
-- NPS Score
SELECT
  COUNT(CASE WHEN score >= 9 THEN 1 END) * 100.0 / COUNT(*) as promoters_pct,
  COUNT(CASE WHEN score <= 6 THEN 1 END) * 100.0 / COUNT(*) as detractors_pct
FROM feedback
WHERE type = 'nps'
  AND tenant_id = :tenant_id
  AND created_at >= :from_date
  AND created_at <= :to_date;
```

### Trends

```sql
-- NPS by month
SELECT
  DATE_TRUNC('month', created_at) as month,
  COUNT(CASE WHEN score >= 9 THEN 1 END) * 100.0 / COUNT(*) as promoters,
  COUNT(CASE WHEN score <= 6 THEN 1 END) * 100.0 / COUNT(*) as detractors
FROM feedback
WHERE type = 'nps'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;
```

### Segmentation

| Segment | Query |
|----------|-------|
| By plan | `GROUP BY tenant_plan` |
| By tenure | `GROUP BY days_since_signup` |
| By feature usage | `GROUP BY feature_used` |
| By region | `GROUP BY user_region` |

---

## Survey Analytics

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Completion Rate** | % who complete the survey |
| **Avg Time** | Average completion time |
| **Drop-off Rate** | Questions abandoned |
| **Answer Distribution** | Response distribution |

### Rating Question

```sql
SELECT
  question_id,
  answer,
  COUNT(*) as count,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as pct
FROM survey_responses
WHERE survey_id = :survey_id
  AND question_id = :question_id
GROUP BY question_id, answer;
```

### Text Question

```sql
-- Word frequency
SELECT
  word,
  COUNT(*) as count
FROM survey_responses,
  LATERAL SPLIT_TO_TABLE(answer, ' ')
WHERE survey_id = :survey_id
  AND question_id = :question_id
GROUP BY word
ORDER BY count DESC
LIMIT 20;
```

### Funnel Analysis

```sql
-- Completion funnel
SELECT
  question_id,
  response_count,
  LAG(response_count) OVER (ORDER BY question_order) as prev_count,
  response_count * 100.0 / LAG(response_count) OVER (ORDER BY question_order) as dropoff_pct
FROM (
  SELECT
    question_id,
    question_order,
    COUNT(DISTINCT response_id) as response_count
  FROM survey_responses
  WHERE survey_id = :survey_id
  GROUP BY question_id, question_order
) t
ORDER BY question_order;
```

---

## Bug Analytics

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Bug Count** | Total bugs reported |
| **By Severity** | Distribution by severity |
| **Time to Fix** | Average resolution time |
| **Reopen Rate** | % bugs reopened |
| **By Component** | Distribution by component |

### By Severity

```sql
SELECT
  severity,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) * 100.0 / COUNT(*) as resolution_rate
FROM feedback
WHERE type = 'bug'
  AND tenant_id = :tenant_id
GROUP BY severity;
```

### Time to Resolution

```sql
SELECT
  severity,
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))) / 3600 as avg_hours
FROM feedback
WHERE type = 'bug'
  AND status = 'resolved'
GROUP BY severity;
```

### By Component

```sql
SELECT
  component,
  COUNT(*) as count
FROM feedback
WHERE type = 'bug'
GROUP BY component
ORDER BY count DESC
LIMIT 10;
```

---

## Feature Request Analytics

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Request Count** | Total requests |
| **Unique Users** | Unique users |
| **Vote Count** | Total votes |
| **Duplicates** | Duplicate requests |
| **Approved Rate** | % approved by product |

### Top Features

```sql
SELECT
  title,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_votes,
  MAX(created_at) as latest_request
FROM feedback
WHERE type = 'feature'
GROUP BY title
ORDER BY total_votes DESC
LIMIT 20;
```

### Funnel

```
Feature Request
     │
     ▼
Product Review
     │
     ├──► Approved ──► 15%
     │
     └──► Rejected ──► 85%
              │
              ▼
         Not Planned ──► 70%
              │
              ▼
         Planned ──► 15%
```

---

## Dashboards

### NPS Dashboard

```yaml
- title: "NPS Overview"
  panels:
    - NPS Score (gauge)
    - NPS Trend (line)
    - Response Rate (stat)
    - Score Distribution (bar)
    - By Plan (table)

- title: "NPS Details"
  panels:
    - Recent Responses (table)
    - Sentiment Analysis (word cloud)
    - By Segment (heatmap)
```

### Survey Dashboard

```yaml
- title: "Survey Overview"
  panels:
    - Completion Rate (gauge)
    - Response Count (stat)
    - Avg Time to Complete (stat)

- title: "Question Analysis"
  panels:
    - Answer Distribution (bar)
    - Text Responses (table)
    - Drop-off Analysis (funnel)
```

### Bug Dashboard

```yaml
- title: "Bug Overview"
  panels:
    - Bug Count (stat)
    - By Severity (pie)
    - Time to Fix (line)
    - By Component (bar)

- title: "Bug Details"
  panels:
    - Recent Bugs (table)
    - Reopen Rate (gauge)
    - Unresolved Aging (table)
```

### Feature Request Dashboard

```yaml
- title: "Feature Requests"
  panels:
    - Request Count (stat)
    - Top Voted (table)
    - Approval Funnel (funnel)
    - By Status (pie)
```

---

## Completion Checklist

### Deliverables
- [ ] NPS queries defined
- [ ] Survey analytics configured
- [ ] Bug metrics tracked
- [ ] Feature request funnel defined
- [ ] Dashboards created

### Sign-Off
- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Lead, Date]
- [ ] Approved by: [Analytics Lead, Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-040-user-feedback.md)