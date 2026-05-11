[← 01-discovery/](../01-discovery/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../03-design/README.md)

---

# Phase 2 — Requirements
## LinkSnap (URL Shortener)

> **What This Is:** Requirements phase output for the LinkSnap URL Shortener. Defines functional requirements (what the system must do), non-functional requirements (how well it must do it), the project glossary, and an explicit out-of-scope list.
> **How to Use:** Read after Phase 1 (Discovery). Every FR and NFR traces back to an actor or success criterion from Discovery. Phase 3 (Design) will consume these requirements.
> **Owner:** Tutorial contributor (DDD + Hexagonal AI Template)

---

## Contents

1. [Glossary](#glossary)
2. [Functional Requirements](#functional-requirements)
3. [Non-Functional Requirements](#non-functional-requirements)
4. [Out of Scope](#out-of-scope)
5. [Traceability Summary](#traceability-summary)

---

## Glossary

> All terms used in this document follow the ubiquitous language established in Phase 1 and the domain vocabulary in [`TUTORIAL-FULL-CYCLE.md`](../../../../00-guides-and-instructions/TUTORIAL-FULL-CYCLE.md#domain-vocabulary).

| Term | Definition |
|------|-----------|
| **ShortURL** | The core entity: a mapping from a short code to an original URL |
| **Short Code** | The unique alphanumeric identifier that forms the URL path (e.g., `/abc123`) |
| **Original URL** | The full, valid URL that a ShortURL maps to |
| **Redirect** | The act of resolving a short code and forwarding the request to the original URL |
| **Click** | A single recorded access of a ShortURL via redirect |
| **Click Count** | The total number of Clicks for a given ShortURL |
| **Alias** | A user-supplied short code used instead of the system-generated one |
| **Expiry** | An optional date/time after which a ShortURL no longer redirects |
| **Creator** | The actor who creates a ShortURL |
| **Visitor** | The actor who follows a short link |
| **Analytics Consumer** | The actor who reads click statistics |

---

## Functional Requirements

### FR-001: Create Short URL

**Description:** A Creator can submit a valid, absolute URL and receive a short code that maps to it.

#### Scope Includes
- Accept any syntactically valid, absolute URL (http:// or https://)
- Generate a unique short code automatically
- Return the complete short URL (base URL + short code) to the Creator
- Store the mapping persistently

#### Does NOT Include (v1.0)
- Validation that the target URL is reachable (liveness check)
- Deduplication of identical original URLs across creators
- Batch creation of multiple short URLs in one request

#### Dependencies
- None (this is the foundational requirement)

#### Acceptance Criteria
1. A valid URL submitted produces a short URL in return
2. The generated short code is unique across the system
3. The short URL is immediately usable for redirect after creation
4. An invalid URL (malformed, relative path) returns a descriptive error
5. The response includes the short code and the full short URL

---

### FR-002: Redirect Visitor

**Description:** When a Visitor accesses a short URL, the system resolves the short code and redirects to the original URL.

#### Scope Includes
- Resolve the short code to the stored original URL
- Respond with a 302 redirect to the original URL
- Record a Click event (timestamp, optional referrer, optional user agent)
- Return an appropriate error response if the code is unknown or expired

#### Does NOT Include (v1.0)
- Storing the Visitor's IP address
- Per-Visitor tracking or cookies
- Click deduplication (same visitor following the link twice counts as 2)

#### Dependencies
- FR-001 (a short URL must exist before it can be redirected)

#### Acceptance Criteria
1. A valid short code resolves to the original URL with HTTP 302 status
2. An unknown short code returns HTTP 404
3. An expired short URL returns HTTP 410 (Gone) with an "expired" message
4. A Click event is recorded for every successful redirect
5. Redirect latency is ≤ 100 ms at p95 (see NFR-001)

---

### FR-003: View Click Count

**Description:** An Analytics Consumer can request the click count for a given short code and receive the total number of times that short URL has been redirected.

#### Scope Includes
- Return the total Click count for a valid short code
- Return zero if no clicks have been recorded yet (not an error)

#### Does NOT Include (v1.0)
- Click breakdown by time period, referrer, or geography
- Comparison between multiple short URLs
- Exporting click data

#### Dependencies
- FR-001 (the short URL must exist)
- FR-002 (clicks are created by the redirect operation)

#### Acceptance Criteria
1. A request for click count on a known short code returns the current total
2. A short URL with zero clicks returns count = 0 (not an error)
3. An unknown short code returns HTTP 404
4. The count reflects all clicks recorded up to the time of the request

---

### FR-004: Custom Alias

**Description:** A Creator can optionally supply a custom short code (alias) instead of having one generated automatically.

#### Scope Includes
- Accept an alias string on URL creation
- Validate that the alias is unique across the system
- Validate alias format: alphanumeric + hyphens, 3–30 characters
- Use the alias as the short code if valid and available

#### Does NOT Include (v1.0)
- Editing or updating an alias after creation
- Reserving aliases without creating a ShortURL

#### Dependencies
- FR-001 (alias is a variation of short URL creation)

#### Acceptance Criteria
1. A creation request with a valid, available alias uses that alias as the short code
2. A request with an already-taken alias returns HTTP 409 (Conflict)
3. A request with an alias that violates format rules returns HTTP 400 with the specific violation
4. The created short URL behaves identically to a generated-code short URL (FR-002, FR-003 apply)

---

### FR-005: Short URL Expiry

**Description:** A Creator can optionally set an expiry date/time when creating a short URL. After that date/time, the short URL stops redirecting.

#### Scope Includes
- Accept an optional expiry date/time on creation (ISO 8601 format)
- When a Visitor accesses an expired short URL, return HTTP 410 (Gone)
- Return the expiry date/time in the creation response and in the stats endpoint

#### Does NOT Include (v1.0)
- Updating the expiry after creation
- Extending an expired short URL
- Deleting expired short URLs automatically (they remain in storage)

#### Dependencies
- FR-001 (expiry is set at creation time)
- FR-002 (expiry check happens during redirect)

#### Acceptance Criteria
1. A creation request with a future expiry date stores the expiry and returns it in the response
2. A redirect request for a short URL whose expiry has passed returns HTTP 410
3. A redirect request for a short URL whose expiry has NOT passed proceeds normally (FR-002 applies)
4. An expiry set in the past at creation time returns HTTP 400 (invalid input)

---

## Non-Functional Requirements

### NFR-001: Redirect Latency

| Field | Value |
|-------|-------|
| **ID** | NFR-001 |
| **Category** | Performance |
| **Statement** | The redirect operation (FR-002) must complete within 100 ms at the 95th percentile |
| **Measurement** | p95 latency from request receipt to 302 response sent |
| **Applies to** | `GET /:code` endpoint |
| **Test** | Load test at 1,000 concurrent requests for 60 seconds |
| **Traces from** | SC-002, SC-006 |

---

### NFR-002: Concurrent Load Capacity

| Field | Value |
|-------|-------|
| **ID** | NFR-002 |
| **Category** | Scalability |
| **Statement** | The system must handle 1,000 concurrent redirect requests without violating NFR-001 |
| **Measurement** | Latency remains ≤ 100 ms p95 under sustained load of 1,000 concurrent connections |
| **Applies to** | Redirect endpoint |
| **Test** | Load test: 1,000 virtual users, 60-second ramp-up, 120-second steady state |
| **Traces from** | SC-006 |

---

### NFR-003: Availability

| Field | Value |
|-------|-------|
| **ID** | NFR-003 |
| **Category** | Availability |
| **Statement** | The redirect endpoint must achieve 99.5% uptime measured monthly |
| **Measurement** | Uptime percentage over a 30-day window |
| **Applies to** | `GET /:code` endpoint (redirect) |
| **Excludes** | Planned maintenance windows (announced 24 h in advance) |
| **Traces from** | Discovery constraints |

---

### NFR-004: Privacy — No Visitor PII Storage

| Field | Value |
|-------|-------|
| **ID** | NFR-004 |
| **Category** | Privacy / Compliance |
| **Statement** | The system must not store the Visitor's IP address or any personally identifiable information |
| **Measurement** | Code review + data schema audit — no IP address field in Click entity |
| **Applies to** | Click recording (FR-002) |
| **Traces from** | Discovery constraints |

---

### NFR-005: Short Code Uniqueness

| Field | Value |
|-------|-------|
| **ID** | NFR-005 |
| **Category** | Correctness |
| **Statement** | No two active ShortURLs may share the same short code (generated or alias) |
| **Measurement** | System-enforced uniqueness constraint; no duplicates in production |
| **Applies to** | FR-001, FR-004 |
| **Traces from** | Domain invariant (ubiquitous language) |

---

## Out of Scope

Explicitly deferred to future versions. Any item below that appears in a pull request for v1.0 must be rejected.

| Item | Reason | Target |
|------|--------|--------|
| User accounts / authentication | Requires identity model | v2.0 |
| Per-creator analytics dashboard | Requires authentication | v2.0 |
| QR code generation | Not core to redirect/analytics | v2.0 |
| Link editing or deletion | Requires ownership model | v2.0 |
| Bulk creation API | Added complexity, edge case | v2.0 |
| Click breakdown by time / geography | Requires analytics schema expansion | v2.0 |
| Custom domain (e.g., short.example.com) | Infrastructure complexity | v3.0 |
| Team / workspace management | Requires multi-tenancy | v3.0 |

---

## Traceability Summary

| FR / NFR | Actor | Success Criterion | Discovery Constraint |
|----------|-------|------------------|---------------------|
| FR-001 | Creator | SC-001 | — |
| FR-002 | Visitor | SC-002 | Redirect latency ≤ 100 ms |
| FR-003 | Analytics Consumer | SC-003 | — |
| FR-004 | Creator | SC-004 | — |
| FR-005 | Creator | SC-005 | — |
| NFR-001 | — | SC-002 | Redirect latency ≤ 100 ms |
| NFR-002 | — | SC-006 | Handle 1,000 concurrent redirects |
| NFR-003 | — | — | 99.5% availability |
| NFR-004 | — | — | No Visitor IP storage |
| NFR-005 | — | — | Short code uniqueness (domain invariant) |

---

[← 01-discovery/](../01-discovery/README.md) | [← url-shortener/README.md](../README.md) | [Next >](../03-design/README.md)
