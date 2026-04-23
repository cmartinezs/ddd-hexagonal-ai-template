[← Index](./README.md)

---

# API Documentation Standard

## Purpose

Standard for documenting APIs using OpenAPI specification, endpoint documentation, examples, and error references.

---

## OpenAPI Specification

### Use OpenAPI 3.0

All endpoints must be documented in OpenAPI 3.0 format. Enables:
- Auto-generated API documentation (Swagger UI)
- Client code generation
- API mocking
- Contract testing

### Schema Definition

```yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  description: My API description

servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging

paths:
  /resources:
    post:
      summary: Create resource
      tags: [Resources]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateResourceRequest'
      responses:
        '201':
          description: Resource created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResourceResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          $ref: '#/components/responses/Conflict'

components:
  schemas:
    CreateResourceRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 100
          example: My Resource

    ResourceResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        createdAt:
          type: string
          format: date-time

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

---

## Endpoint Documentation Structure

Every endpoint must include:

| Field | Description |
|-------|-------------|
| **Summary** | One-line description |
| **Description** | Multi-line if needed |
| **Tags** | Categorization |
| **Parameters** | Query, path, header |
| **Request body** | If applicable |
| **Responses** | All possible status codes |
| **Examples** | curl, request/response |

### Example

```yaml
/resources/{id}:
  get:
    summary: Get resource by ID
    description: |
      Retrieve a single resource by its unique identifier.
      **Permissions Required:** RESOURCE_READ

    tags: [Resources]

    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        example: 550e8400-e29b-41d4-a716-446655440000

    responses:
      '200':
        description: Resource found
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ResourceResponse'

      '401':
        $ref: '#/components/responses/Unauthorized'

      '403':
        $ref: '#/components/responses/Forbidden'

      '404':
        $ref: '#/components/responses/NotFound'
```

---

## Request/Response Examples

### Working Example

For every endpoint, provide at least one complete curl example:

```bash
# Example: Create resource
curl -X POST https://api.example.com/v1/resources \
  -H "Authorization: Bearer eyJ..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Resource"
  }'

# Response (201):
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Resource",
    "createdAt": "2026-04-20T14:30:00Z"
  }
}

# Error response (409):
{
  "error": {
    "code": "DUPLICATE_RESOURCE",
    "message": "Resource with name 'My Resource' already exists",
    "details": {
      "field": "name",
      "constraint": "must be unique"
    }
  }
}
```

---

## Pagination

### Pagination Schema

```yaml
Pagination:
  type: object
  properties:
    page:
      type: integer
      example: 0
    size:
      type: integer
      example: 20
    totalElements:
      type: integer
      example: 50
    totalPages:
      type: integer
      example: 3
    last:
      type: boolean
      example: true
```

---

## Error Documentation

### Standard Error Response Format

```yaml
ErrorResponse:
  type: object
  required:
    - code
    - message
  properties:
    code:
      type: string
      enum:
        - INVALID_INPUT
        - UNAUTHORIZED
        - FORBIDDEN
        - NOT_FOUND
        - DUPLICATE_RESOURCE
        - RATE_LIMITED
        - INTERNAL_ERROR
      example: INVALID_INPUT

    message:
      type: string
      description: Human-readable error message
      example: Validation failed for request body

    details:
      type: object
      description: Additional context (optional)
      additionalProperties: true
      example:
        field: name
        constraint: minLength exceeded
```

### Status Codes

```yaml
responses:
  '200':
    description: Success

  '201':
    description: Resource created

  '204':
    description: Success (no content)

  '400':
    description: Bad request (validation error)
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'

  '401':
    description: Unauthorized (missing or invalid token)

  '403':
    description: Forbidden (user lacks permission)

  '404':
    description: Resource not found

  '409':
    description: Conflict (duplicate resource)

  '429':
    description: Rate limited (too many requests)

  '500':
    description: Internal server error
```

---

## Version in Documentation

### Include Version Constraints

```yaml
paths:
  /api/v1/resources:
    post:
      deprecated: false
      x-since: 1.0.0
      x-until: null  # Still supported

  /api/v1/resources-legacy:
    post:
      deprecated: true
      x-since: 1.0.0
      x-until: 2.0.0
      x-deprecation-date: 2027-10-01
      description: |
        ⚠️ **DEPRECATED** as of v1.2.0
        Use `/api/v2/resources` instead.
        Sunset date: 2027-10-01
```

---

## Checklist

- [ ] OpenAPI spec defined
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Error codes documented
- [ ] Pagination schema defined
- [ ] Version constraints in docs

---

[← Index](./README.md)