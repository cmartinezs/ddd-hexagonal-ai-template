# Example Implementation

## Complete Worked Example: Task Management Application

This document shows a complete example of a small project documented using the DDD Hexagonal AI Template. Use this as a reference for how each section should look when completed.

---

## Phase 1: Discovery

### Vision & Context
**Project**: TaskFlow — Collaborative task management for teams

**Vision**: Empower distributed teams to organize work transparently and collaborate effectively.

**Problem**: Teams struggle with scattered task information across email, Slack, and multiple tools.

**Success**: Teams adopt TaskFlow as their single source of truth for project work.

---

## Phase 2: Requirements

### Functional Requirement Example

```
## [FR-001] Create Task

**Description**: Users should be able to create tasks with title, description, and assignment

**Actor**: Team Member
**Trigger**: User clicks "New Task" button
**Preconditions**: User is authenticated and in a project

**Main Flow**:
1. User opens project workspace
2. User clicks "New Task" button
3. Modal opens with form
4. User enters task title
5. User optionally adds description
6. User optionally assigns to team member
7. User sets priority (Low/Medium/High)
8. User clicks "Create"
9. Task appears in task list
10. Confirmation notification shown

**Exception Flows**:
- If title empty: Show validation error, highlight field
- If assigned user not found: Show error, keep assignment open
- If create fails: Show error, preserve form data

**Acceptance Criteria**:
- [ ] Task created with title and description
- [ ] Task can be assigned to team member
- [ ] Priority set and visible in list
- [ ] Creator automatically assigned as owner
- [ ] New task appears in project feed
- [ ] Timestamps (created_at, updated_at) recorded
- [ ] Task validation prevents empty titles
- [ ] Success notification shown

**Assumptions**:
- User is already a team member of the project
- Team member email is known to system

**Dependencies**:
- FR-002 (User authentication)
- FR-003 (Project access control)
```

### Non-Functional Requirement Example

```
## [NFR-001] Performance - Task List Loading

**Category**: Performance
**Requirement**: Task list loads in < 500ms for projects with < 1000 tasks
**Rationale**: User experience degrades with slow loading
**Measurement**: Load time tracked in performance dashboard
**Target SLA**: p95 < 500ms
```

---

## Phase 3: Design

### System Flow Example

```
## [SF-001] Create Task Flow

### Actors
- User (authenticated team member)
- System (TaskFlow backend)
- Notification Service

### Happy Path
1. User opens project
2. User clicks "New Task" button
   → System: Opens create task modal
3. User fills form (title, description, assignment, priority)
   → System: Validates form in real-time
4. User clicks "Create"
   → System: Validates all required fields
   → System: Creates task in database
   → System: Publishes task.created event
   → Notification Service: Sends notifications to assignee
5. System returns to task list with new task visible
   → User: Sees confirmation notification

### Exception Flow: Validation Fails
1. User submits form without title
   → System: Returns 400 error
   → UI: Shows error message under title field
2. User corrects and resubmits
   → System: Creates task

### Exception Flow: Assigned User Not Found
1. User submits form with non-existent user email
   → System: Returns 400 error
   → UI: Shows "User not found" message
2. User selects valid team member from dropdown
   → System: Creates task

### Data Flow
User Input → Validation → Domain Service → Repository → Database
         ← Event Published ← Notification Service ← Database
```

### UI Design Example

```
## [UI-001] Create Task Modal

### Components
- Modal Header: "Create Task"
- Form:
  - Text Input: "Task Title" (required, placeholder)
  - Textarea: "Description" (optional)
  - Dropdown: "Assign To" (optional, searchable)
  - Radio Buttons: Priority (Low/Medium/High, default Medium)
  - Button: "Create" (disabled until title filled)
  - Button: "Cancel"

### Interactions
- Title field: Validate on blur (min 3 characters)
- Description: Show char count (max 2000)
- Assign To: Show team member list with avatars
- Priority: Visual indicators (colors)
- Create button: Show loading spinner on click

### Accessibility
- Labels associated with inputs
- ARIA descriptions for form sections
- Keyboard navigation (Tab through fields)
- Error messages linked to inputs
```

---

## Phase 4: Data Model

### Entity Example

```
## Entity: Task

**Primary Key**: task_id (UUID)

**Attributes**:
- task_id: UUID, primary key, auto-generated
- project_id: UUID, foreign key → Project
- title: String, 3-200 chars, not null
- description: String, 0-2000 chars, nullable
- status: Enum (To-Do, In Progress, Done), default To-Do
- priority: Enum (Low, Medium, High), default Medium
- assigned_to: UUID, foreign key → User, nullable
- created_by: UUID, foreign key → User, not null
- created_at: Timestamp, not null, default current_timestamp
- updated_at: Timestamp, not null, default current_timestamp
- completed_at: Timestamp, nullable

**Relationships**:
- Belongs to Project (N:1)
- Assigned to User (N:1)
- Created by User (N:1)
- Has many Comments (1:N)
- Has many Attachments (1:N)
- Has many Activity Logs (1:N)

**Constraints**:
- title: NOT NULL, length >= 3
- project_id: NOT NULL, must exist in projects table
- created_at <= updated_at
- completed_at: must be NULL or >= created_at
- assigned_to: if not null, user must be team member

**Soft Delete**: is_deleted: Boolean, default false
  - Allows recovery of accidentally deleted tasks
  - Filtered from normal queries

**Indexes**:
- PRIMARY KEY: task_id
- FOREIGN KEY: project_id, assigned_to, created_by
- QUERY: (project_id, status, is_deleted) for list queries
- QUERY: (assigned_to, created_at) for user's tasks
```

### ERD Example

```
User
├── user_id (PK, UUID)
├── email (unique, string)
├── name (string)
└── created_at (timestamp)

Project
├── project_id (PK, UUID)
├── name (string)
├── created_by (FK → User)
└── created_at (timestamp)

ProjectMember
├── project_member_id (PK, UUID)
├── project_id (FK → Project)
├── user_id (FK → User)
└── role (enum: owner, admin, member)

Task
├── task_id (PK, UUID)
├── project_id (FK → Project)
├── title (string)
├── description (text, nullable)
├── status (enum)
├── priority (enum)
├── assigned_to (FK → User, nullable)
├── created_by (FK → User)
├── created_at (timestamp)
└── updated_at (timestamp)

Comment
├── comment_id (PK, UUID)
├── task_id (FK → Task)
├── author_id (FK → User)
├── content (text)
└── created_at (timestamp)
```

---

## Phase 5: Planning

### Roadmap Example

```
## TaskFlow Roadmap

### Phase 1 (MVP - 6 weeks)
**Goal**: Core task management for small teams
- [ ] User authentication
- [ ] Project creation and access control
- [ ] Create/read/update tasks
- [ ] Task assignment and status tracking
- [ ] Basic comments on tasks
- [ ] Email notifications

**Target Users**: 5-10 person teams
**Go/No-Go Decision Point**: Week 4

### Phase 2 (Enhanced - 4 weeks)
**Goal**: Improve collaboration and visibility
- [ ] Advanced search and filtering
- [ ] Task dependencies
- [ ] Custom fields
- [ ] Activity timeline
- [ ] Bulk operations
- [ ] Mobile app (basic)

### Phase 3 (Scale - 4 weeks)
**Goal**: Enterprise features
- [ ] Role-based access control (RBAC)
- [ ] Audit logs
- [ ] Webhooks
- [ ] API for integrations
- [ ] Advanced reporting
```

### Epic Example

```
## Epic: Task Management Core

**Description**: Implement basic task CRUD operations with assignment and status tracking

**Business Value**: Enables teams to organize and track work

**User Stories**:
1. Create task (FR-001)
2. View task list with filtering
3. Update task details
4. Assign/reassign tasks
5. Change task status
6. Delete/archive tasks
7. View task history

**Acceptance Criteria**:
- [ ] All user stories implemented and tested
- [ ] API documented
- [ ] UI meets accessibility standards
- [ ] Performance targets met (list loads < 500ms)
- [ ] Security review passed

**Estimated Points**: 21
**Priority**: P0 (Must-have)
**Timeline**: Weeks 1-3 of Phase 1
```

---

## Phase 6: Development

### Architecture Example

```
## Hexagonal Architecture for TaskFlow

### Core Domain Layer
**Entities**:
- User, Project, Task, Comment

**Aggregates**:
- ProjectAggregate (Project + ProjectMembers)
- TaskAggregate (Task + Comments + ActivityLogs)

**Value Objects**:
- TaskStatus, TaskPriority, UserRole

**Domain Services**:
- TaskCreationService (business rules for task creation)
- AccessControlService (authorization logic)
- NotificationService (event-driven)

**Domain Events**:
- TaskCreated
- TaskAssigned
- TaskStatusChanged
- CommentAdded

### Ports (Interfaces)
**Input Ports (Use Cases)**:
- ICreateTaskUseCase
- IUpdateTaskUseCase
- IListTasksUseCase

**Output Ports (Dependencies)**:
- ITaskRepository
- IUserRepository
- IProjectRepository
- INotificationAdapter
- IEmailAdapter

### Adapters
**Input Adapters**:
- REST API (Spring @RestController)
- GraphQL API
- gRPC (future)

**Output Adapters**:
- PostgreSQL Repository
- Email (SendGrid)
- Notifications (WebSocket)
- Event Queue (RabbitMQ)

### Layer Structure
```
┌─────────────────────────────────────┐
│     Presentation (REST/GraphQL)     │ ← Input Adapters
├─────────────────────────────────────┤
│     Application Services            │ ← Use Cases/Handlers
├─────────────────────────────────────┤
│     Domain (Entities, Services)     │ ← Core Business Logic
├─────────────────────────────────────┤
│     Ports (Interfaces)              │ ← Contracts
├─────────────────────────────────────┤
│     Infrastructure (Adapters)       │ ← Output Adapters
└─────────────────────────────────────┘
        (Database, Email, Events, etc.)
```
```

### API Example

```
## [API-001] POST /projects/{projectId}/tasks

**Description**: Create a new task in a project

**Authentication**: Bearer token (JWT)

**Path Parameters**:
- projectId (UUID): ID of the project

**Request Body**:
```json
{
  "title": "Fix login bug",
  "description": "Users can't reset password on mobile",
  "assignedTo": "user-uuid",
  "priority": "high"
}
```

**Response** (201 Created):
```json
{
  "id": "task-uuid",
  "projectId": "project-uuid",
  "title": "Fix login bug",
  "description": "Users can't reset password on mobile",
  "status": "To-Do",
  "priority": "high",
  "assignedTo": {
    "id": "user-uuid",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "createdBy": {
    "id": "creator-uuid",
    "name": "John Doe"
  },
  "createdAt": "2024-02-01T10:30:00Z",
  "updatedAt": "2024-02-01T10:30:00Z"
}
```

**Status Codes**:
- 201: Task created successfully
- 400: Invalid request (validation error)
- 401: Unauthorized (no valid token)
- 403: Forbidden (no access to project)
- 404: Project not found
- 500: Server error

**Error Response** (400):
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title must be at least 3 characters"
    }
  ]
}
```
```

---

## Phase 7: Testing

### Test Plan Example

```
## Test Case: Create Task - Happy Path

**ID**: TC-001
**Feature**: Task Creation
**Priority**: Critical

**Preconditions**:
- User is authenticated
- User is a member of target project
- User has task creation permission

**Test Steps**:
1. Navigate to project page
2. Click "New Task" button
3. Enter title: "Fix login bug"
4. Enter description: "Users can't reset password"
5. Select assignee: "Jane Smith"
6. Select priority: "High"
7. Click "Create Task"

**Expected Result**:
- Task created with all fields
- Task visible in task list
- Success notification displayed
- Assignee notified via email
- Task creation event logged

**Actual Result**: [To be filled during testing]

**Status**: [PASS/FAIL]

**Notes**: [Any observations]
```

### Test Strategy Example

```
## Testing Strategy

**Test Pyramid**:
- Unit Tests (70%): 100+ tests
  - Domain logic, services, utilities
  - Mock all external dependencies
  - Target: >85% code coverage

- Integration Tests (20%): 30+ tests
  - API endpoints with real DB
  - Event publishing and handling
  - Repository operations

- E2E Tests (10%): 10+ tests
  - Critical user workflows
  - Cross-browser (Chrome, Firefox, Safari)
  - Mobile responsiveness

**Coverage Targets**:
- Core domain: 90%+
- Application services: 85%+
- Controllers/API: 70%+
- Overall: 80%+

**Security Testing**:
- SQL injection attempts
- XSS prevention
- CSRF protection
- Auth bypass attempts
- Permission escalation
```

---

## Phase 8: Deployment

### CI/CD Pipeline Example

```
## TaskFlow CI/CD Pipeline

### Commit Stage (On Every Push)
**Duration**: 2-3 minutes
- Code checkout
- Unit tests (Jest)
- Linting (ESLint/Prettier)
- Security scanning (SonarQube)
- Coverage reporting
- Build Docker image

**Failure**: Block merge

### Integration Stage (On PR)
**Duration**: 5-7 minutes
- Integration tests (Docker Compose)
- API contract tests (Pact)
- Database migration tests
- Performance tests (Gatling)

**Failure**: Block merge

### Staging Deployment
**Duration**: 5 minutes
- Deploy to staging environment
- Run smoke tests
- Update docs
- Notify team

### Production Deployment
**Duration**: 10 minutes
- Manual approval required
- Blue-green deploy
- Smoke tests
- Performance verification
- Automatic rollback if health checks fail

### Monitoring
- Error rate < 1%
- Latency p95 < 200ms
- CPU < 80%
- Memory < 85%
```

---

## Phase 9: Operations

### Runbook Example

```
## Runbook: Restart Task Service

**When to use**: Service is degraded, responding slowly, or throwing errors

**Impact**: Users may experience slowness or failures creating/updating tasks

**Prerequisites**: SSH access to production, on-call escalation rights

### Step-by-Step

1. **Verify the issue**
   ```bash
   curl -s https://api.taskflow.com/health | jq .
   systemctl status taskflow
   tail -100 /var/log/taskflow/error.log
   ```
   
   Look for:
   - High error rates
   - Database connection errors
   - Memory issues
   - Stuck processes

2. **Create incident**
   - Notify on-call: `#incident` Slack channel
   - Create incident ticket in Linear
   - Assign severity (P1: service down, P2: degraded, P3: minor)

3. **Perform restart**
   ```bash
   sudo systemctl restart taskflow
   sleep 30
   curl -s https://api.taskflow.com/health | jq .
   ```

4. **Monitor recovery**
   - Watch error rates drop
   - Verify response times normalize
   - Check database connection pool

5. **If service still unhealthy**
   - Check logs for errors: `tail -f /var/log/taskflow/error.log`
   - Check database: `psql -U taskflow -d taskflow_prod -c "SELECT 1"`
   - Check external services (Email, Notifications)
   - Consider rollback to previous version

6. **Rollback (if needed)**
   ```bash
   docker pull taskflow:previous-version
   docker run ... # Deploy previous version
   ```

7. **Communicate status**
   - Update status page
   - Notify affected users
   - Post update in #incidents channel

8. **Post-incident**
   - Review logs after 30 min to confirm stability
   - Schedule post-mortem if P1 incident
   - Update runbook if process unclear
```

---

## Phase 10: Monitoring

### Key Metrics Example

```
## TaskFlow Monitoring Dashboard

### System Health (Every 10 seconds)
- CPU usage: Target < 60%, Alert > 80%
- Memory: Target < 70%, Alert > 85%
- Disk: Target < 60%, Alert > 80%
- Network I/O: Monitor for anomalies

### Application Metrics
- Request latency (p50/p95/p99)
  - Target: p50 < 50ms, p95 < 200ms, p99 < 500ms
- Error rate
  - Target: < 0.1%, Alert > 1%
- Request throughput
  - Target: 1000+ req/s
- Database query time
  - Target: p95 < 100ms

### Business Metrics
- Daily Active Users (DAU)
- Tasks created per day
- Feature adoption rate
- User retention rate
- Error budget remaining

### Alerts
| Metric | Threshold | Severity | Action |
|--------|-----------|----------|--------|
| Error rate | > 1% | Critical | Page on-call |
| Latency p95 | > 1s | High | Create ticket |
| CPU | > 85% | High | Auto-scale |
| Memory | > 90% | Critical | Page on-call |
```

---

## Phase 11: Feedback

### Retrospective Example

```
## Sprint 5 Retrospective (Feb 1-15, 2024)

**Team**: 5 engineers, 1 product manager, 1 designer

**What Went Well** ✅
- Strong API design collaboration between frontend/backend
- Smooth deployment to production (zero rollbacks)
- Good code review culture (all PRs reviewed within 2 hours)
- Test coverage exceeded targets (85%)
- Early user feedback helped prioritize features

**What Could Improve** 🔄
- Testing took 40% longer than estimated
- Database migration strategy was unclear (took 2 hours to resolve)
- Documentation was behind implementation
- Mobile performance testing done too late

**Action Items**:
- [ ] Document database migration process (Assign: @alice, Due: Feb 20)
- [ ] Invest in test automation framework (Assign: @bob, Due: Mar 1)
- [ ] Establish doc-first development approach (All, discuss next standup)
- [ ] Add mobile performance tests to CI/CD (Assign: @charlie, Due: Feb 25)

**Metrics**:
- Velocity: 18 story points (baseline: 16)
- Bug escape rate: 0% to production
- Average PR review time: 1.5 hours
- Test coverage: 85% (target: 80%)
- Deployment frequency: 12 times

**Reflection**:
Despite over-running on testing, we maintained high quality and shipped all committed features. The investment in test infrastructure is paying off. Next sprint focus: improve documentation and mobile performance.
```

---

## Summary

This example shows how each phase builds on the previous one:
1. **Discovery**: Understand the problem (task management for teams)
2. **Requirements**: Define what to build (specific features and constraints)
3. **Design**: Plan how it looks and works (flows, UI, architecture)
4. **Data Model**: Define the structure (entities, relationships)
5. **Planning**: Organize the work (roadmap, epics, sprints)
6. **Development**: Build the system (architecture, APIs, code)
7. **Testing**: Verify it works (test strategy, test cases)
8. **Deployment**: Release to production (CI/CD, procedures)
9. **Operations**: Run it reliably (runbooks, SLAs)
10. **Monitoring**: Measure health (metrics, alerts)
11. **Feedback**: Learn from it (retrospectives, improvements)

Each document is referenced by the next phase, creating a complete traceability chain from business need to production operation.

---

**Next**: Use this as a template for your own project. Start with Phase 1 (Discovery) and follow the progression.
