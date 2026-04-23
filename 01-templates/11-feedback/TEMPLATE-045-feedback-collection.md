[← Index](./README.md) | [< Previous](./TEMPLATE-044-feedback-analytics.md)

---

# Feedback Collection

Methods for collecting user feedback: in-app widgets, email campaigns, dashboards, and APIs.

## Contents

1. [In-App Widget](#in-app-widget)
2. [Email Campaigns](#email-campaigns)
3. [Dashboard Widget](#dashboard-widget)
4. [API](#api)
5. [Integrations](#integrations)

---

## In-App Widget

### Floating Widget

```tsx
// FeedbackWidget.tsx
import { FeedbackWidget } from '@project/ui';

<FeedbackWidget
  position="bottom-right"
  trigger={{
    type: 'time_on_page',
    value: 300  // 5 minutes
  }}
  types={['nps', 'bug', 'feature']}
/>
```

### Bug Report Button

```tsx
<Button
  icon="bug"
  onClick={() => openFeedbackModal('bug')}
>
  Report Bug
</Button>
```

### Feedback Modal

```tsx
<FeedbackModal
  defaultType="nps"
  onSubmit={handleFeedbackSubmit}
  // NPS
  npsProps={{
    question: 'How would you rate your experience?',
    showReason: true,
    showFollowUp: true
  }}
  // Bug Report
  bugProps={{
    severityOptions: ['critical', 'high', 'medium', 'low'],
    includeStepsToReproduce: true,
    includeEnvironment: true
  }}
/>
```

### Configuration by Tenant

```json
{
  "feedback": {
    "widget": {
      "enabled": true,
      "position": "bottom-right",
      "triggers": [
        { "type": "time_on_page", "value": 300 },
        { "type": "action", "value": "logout" },
        { "type": "manual", "value": true }
      ],
      "types": ["nps", "bug", "feature"]
    },
    "nps": {
      "enabled": true,
      "score_threshold": 9
    }
  }
}
```

---

## Email Campaigns

### NPS Campaign

```yaml
# Email campaign config
feedback:
  email_campaigns:
    - id: weekly_nps
      name: "Weekly NPS"
      schedule: "0 9 * * 1"  # Monday 9am
      template: nps_survey
      recipients:
        type: active_users
        filter: days_since_login <= 7
      send_if:
        - days_since_login >= 7
        - no_nps_last_30_days
```

### Email Template

```html
<!-- nps-survey.html -->
<h2>How would you rate your experience?</h2>

<p>Your opinion helps us improve.</p>

<div class="nps-scale">
  {% for score in 0..10 %}
    <a href="{{feedback_url}}?score={{score}}">{{score}}</a>
  {% endfor %}
</div>

<p>Promoter: 9-10 | Passive: 7-8 | Detractor: 0-6</p>

<p>
  <small>
    <a href="{{unsubscribe_url}}">Unsubscribe</a>
  </small>
</p>
```

### Open/Click Tracking

```sql
-- Track email opens
UPDATE feedback_campaign_recipient
SET opened_at = NOW()
WHERE email = :email AND campaign_id = :campaign_id;
```

---

## Dashboard Widget

### Feedback Summary Widget

```tsx
<DashboardWidget
  title="User Feedback"
  type="feedback_summary"
  config={{
    period: 'last_30_days',
    show_nps: true,
    show_bugs: true,
    show_features: true
  }}
/>
```

### Widget Content

- Current NPS score
- NPS trend (graph)
- Bugs reported (count)
- Top feature requests (list)

### Placement

- Admin dashboard
- Tenant admin dashboard
- Platform admin dashboard

---

## API

### Submit Feedback (External)

```bash
# For external integrations
curl -X POST https://api.example.com/api/v1/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "source": "zendesk",
    "type": "nps",
    "tenant_id": "tenant-uuid",
    "score": 8,
    "reason": "Great service"
  }'
```

### Webhook

```yaml
# Configure webhook for new feedback
feedback:
  webhooks:
    - url: https://your-app.com/feedback
      events:
        - feedback.created
        - nps.received
        - bug.reported
```

### Payload

```json
{
  "event": "feedback.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": "fb-uuid",
    "type": "nps",
    "tenant_id": "tenant-uuid",
    "user_id": "user-uuid",
    "score": 9
  }
}
```

---

## Integrations

### Zendesk Integration

```yaml
feedback:
  integrations:
    zendesk:
      enabled: true
      auto_create_ticket:
        - type: bug
          priority: severity_mapping
        - type: feature
          priority: low
```

### Slack Integration

```yaml
feedback:
  integrations:
    slack:
      enabled: true
      channels:
        - name: "#team-feedback"
          events:
            - bug.reported
            - feature.high_votes
        - name: "#product"
          events:
            - nps.score_change
```

### PagerDuty Integration

```yaml
feedback:
  integrations:
    pagerduty:
      enabled: true
      critical_bugs:
        - severity: critical
          create_incident: true
```

---

## Completion Checklist

### Deliverables
- [ ] In-app widget configured
- [ ] Email campaigns set up
- [ ] Dashboard widgets implemented
- [ ] API endpoints defined
- [ ] Integrations configured

### Sign-Off
- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Product Lead, Date]
- [ ] Approved by: [Engineering Lead, Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-044-feedback-analytics.md)