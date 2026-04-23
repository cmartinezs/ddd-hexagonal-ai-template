[← Index](./README.md)

---

# Rate Limiting

## Purpose

Template for implementing rate limiting to prevent abuse.

> **Note**: This is a template. Adapt to your infrastructure.

---

## Rate Limit Strategy

| Limit Type | When | Default |
|------------|------|----------|
| Login attempts | Per IP, per user | 5 per 10 min |
| API requests | Per user, per endpoint | 100 per minute |
| Bulk operations | Per user | 10 per hour |

---

## Implementation Patterns

### In-Memory (Development)

```java
// Simple rate limiter for development
@Component
public class RateLimiter {
  private final Map<String, List<Instant>> requests = new ConcurrentHashMap<>();
  
  public boolean allow(String key, int max requests, Duration window) {
    List<Instant> timestamps = requests.computeIfAbsent(key, k -> new ArrayList<>());
    Instant cutoff = Instant.now().minus(window);
    
    timestamps.removeIf(t -> t.isBefore(cutoff));
    
    if (timestamps.size() >= maxRequests) {
      return false;
    }
    
    timestamps.add(Instant.now());
    return true;
  }
}
```

### Redis (Production)

```java
@Component
public class RedisRateLimiter {
  private final RedisTemplate<String, String> redis;
  
  public boolean allow(String key, int limit, Duration window) {
    Long count = redis.opsForValue().increment("rate:" + key);
    if (count == 1) {
      redis.expire("rate:" + key, window.toSeconds(), TimeUnit.SECONDS);
    }
    return count <= limit;
  }
}
```

---

## Endpoints to Protect

| Endpoint | Limit | Window |
|-----------|-------|--------|
| `/auth/login` | 5 | 10 min |
| `/auth/register` | 3 | 1 hour |
| `/oauth2/token` | 10 | 1 min |
| General API | 100 | 1 min |

---

## Response When Limited

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later."
  }
}
```

HTTP Status: 429 Too Many Requests

---

[← Index](./README.md)