# Instructions for Generating Documentation with AI

How to collaborate with Claude (or similar) to generate each phase of documentation coherently and with quality.

---

## Contents

- [General principles](#general-principles)
- [AI agent authoring directive (mandatory)](#ai-agent-authoring-directive-mandatory)
- [Prompt structure](#prompt-structure)
- [Prompts by phase](#prompts-by-phase)
- [Validation checklist](#validation-checklist)
- [Troubleshooting](#troubleshooting)

---

## General Principles

### 1. One phase at a time

**DO NOT** ask for everything at once. Generate phase by phase, validate, adjust.

### 2. Provide context, don't ask it to invent

AI is a better generator than inventor. Give it:

- Clear problem statement
- List of requirements (if they exist)
- Decisions already made
- Known constraints

### 3. Specify the format

Always include in the prompt:

- Expected word count
- Sections it must include
- Detail level (executive vs. technical)
- Expected cross-references

### 4. Use examples if possible

If you have an example from another product, provide an extract so AI replicates the style.

### 5. Validate agnostic vs. specific

- Phases 1-5: **technology agnostic**
- Phases 6+: **specific to your stack**

If AI mentions technology names in phases 1-5, ask it to abstract.

---

## AI Agent Authoring Directive (Mandatory)

Use these rules for any generated artifact:

1. Operate only with explicit inputs; do not invent business facts.
2. Mark key statements as evidence-backed or inferred.
3. Keep phases 1-5 strictly technology agnostic.
4. In phases 6-12, reference prior requirements/design artifacts for each major decision.
5. Record assumptions, risks, and open questions in dedicated sections.
6. Do not mark a phase complete without checklist validation and stakeholder sign-off.
7. Preserve traceability links from discovery to feedback.
8. If context is missing or contradictory, stop and request clarification.

---

## Autonomous Mode

### For Autonomous AI Execution

When AI agents work without human-in-the-loop, use autonomous mode:

```
AUTONOMOUS MODE:

1. Read previous phase README to understand status
2. Read required documents from previous phase
3. Verify required input exists (if missing, request explicitly)
4. Generate current phase with full context
5. Cross-reference all artifacts with previous phases
6. Report completion with context for next phase
```

### Key Principle: Never Assume Context

```
❌ ASSUME: "Previous phase is complete, proceed"
✅ VERIFY: "Read Phase N-1 index, verify documents exist"
✅ IF MISSING: "Request explicit: Required: [document]"
```

### Context Validation Protocol

For each phase, verify before generating:

| Check | If Failed |
|-------|-----------|
| Required docs exist | Request them |
| Previous phase complete | Note partial context |
| Scope boundaries clear | Request clarification |
| Glossary available | Request or create |

### Autonomous Report Format

After completing any phase in autonomous mode:

```markdown
## Phase N Completion Report

### Generated
| File | Status |
|------|--------|
| doc.md | ✅ |

### Context for Next Phase
- Primary output: [file]
- Key decisions: [list]
- Open questions: [list]

### Validation
- [ ] All Phase N-1 outputs addressed
- [ ] Terminology aligned
- [ ] Scope respected
```

---

## Prompt Structure

Use this structure for all prompts:

```
[CONTEXT]
[CENTRAL QUESTION]
[TEMPLATE/EXAMPLE]
[SPECIFIC REQUIREMENTS]
[VALIDATION]
```

### Example structure:

```markdown
# Context
[Your product information, problem, users]

# Task
Generate the document "context-motivation.md" for the Discovery phase.

# Template
[Copy the TEMPLATE section from the template]

# Requirements
- Length: 2000-2500 words
- Sections: [exact list]
- Agnostic: DO NOT mention specific technologies
- References: Link to [other docs]
- Tone: Professional but accessible

# Validation
After writing, validate:
- [ ] Answers the question "What problem do we solve?"
- [ ] Includes risk and opportunity analysis
- [ ] Doesn't assume the reader knows the domain
- [ ] Stakeholders are reflected
```

---

## Prompts by Phase

### PHASE 1: Discovery

**Central question**: What problem do we solve and for whom?

#### Prompt 1.1: Context & Motivation

```markdown
# Context
My product is: [DESCRIPTION 2-3 SENTENCES]

Problem: [SPECIFIC PROBLEM]
Users: [WHO USES IT]
Market: [MARKET CONTEXT]
Opportunity: [WHY NOW]

# Task
Generate "01-templates/01-discovery/context-motivation.md" based on the attached template.

# Template
[COPY TEMPLATE-context-motivation.md]

# Requirements
- Length: 2000-2500 words
- Mandatory sections:
  1. Problem (clear formulation)
  2. Market context (competition, opportunity)
  3. Strategic motivation (why now)
  4. Stakeholders and impacted
  5. Initial risks (what could go wrong)
  6. Opportunities (what we gain if it works)
  7. Key assumptions (what we take for true)

# Style
- Technology agnostic (no framework names, languages, etc.)
- Accessible to non-technical (ex: PM, executives)
- Professional but narrative
- Include examples if possible

# Post-generation validation
- [ ] Is the real problem clear (not the solution)?
- [ ] Is it understood why it's important now?
- [ ] Are all stakeholders mentioned?
- [ ] Is there concrete risk analysis?
- [ ] Is it agnostic? (without mentioning "database", "API", "frontend", etc.)
```

#### Prompt 1.2: System Vision

```markdown
# Context
[From previous document: context-motivation.md]

# Task
Generate "01-templates/01-discovery/system-vision.md" based on the template.

# Template
[COPY TEMPLATE-system-vision.md]

# Requirements
- Length: 1500-2000 words
- Mandatory sections:
  1. Long-term vision (3-5 years)
  2. What is [PRODUCT] (clear definition)
  3. What it is NOT (explicit limits)
  4. Guiding principles (3-5 values)
  5. Expected benefits (for users and business)
  6. Differentiation (how we differ)
  7. Success metrics (how we'll know we won)

# Style
- Inspirational but realistic
- Technology agnostic
- Tangible (not just aspiration)

# Validation
- [ ] Is it different from context-motivation (one is problem, other is vision)?
- [ ] Are limits clear (what it is NOT)?
- [ ] Are success metrics measurable?
```

#### Prompt 1.3: Actors & Needs

```markdown
# Context
[System vision + context-motivation]

# Task
Generate two documents:
1. "01-templates/01-discovery/actors.md"
2. "01-templates/01-discovery/needs-expectations.md"

# Requirements
Actors (1500 words):
- List 4-7 main actors (users, stakeholders, external systems)
- Per actor: who they are, what they do, what incentives they have, what constraints
- Include diagrams or tables

Needs (2000 words):
- Per actor: what they need, what they expect, pain points, alternative solutions
- Prioritization: must-have vs. nice-to-have
- Need conflicts (if they exist)

# Style
- User-centric (real people, not abstractions)
- Technology agnostic
- Include concrete examples

# Validation
- [ ] Do they cover all identified stakeholders?
- [ ] Are specific pain points understood?
- [ ] Do needs connect with future requirements?
```

---

### PHASE 2: Requirements

**Central question**: What must the system do?

#### Prompt 2.1: Glossary

```markdown
# Context
[Discovery completed]

# Task
Generate "01-templates/02-requirements/glossary.md"

# Template
[COPY TEMPLATE-glossary.md]

# Requirements
- 30-50 domain terms
- For each term:
  1. Definition (1-2 sentences)
  2. Context (when/where it's used)
  3. Synonyms (if applicable)
  4. Related to (other terms)
  5. Example

# Style
- Clear and precise (like a dictionary)
- Agnostic (ex: no "JWT", but yes "session token")
- Include business AND key technical terms

# Validation
- [ ] Is every term defined without using undefined ones?
- [ ] Does it cover key domain concepts?
```

#### Prompt 2.2: Functional & Non-Functional Requirements

```markdown
# Context
[Discovery + Glossary]

# Requirements List (provide a base list)
FR1: User can log in
FR2: User can view their profile
NFR1: System must respond in <500ms
NFR2: System must support 10k concurrent users
...

# Task
Generate individual documents:
- "01-templates/02-requirements/functional/fr-001-*.md"
- "01-templates/02-requirements/non-functional/rnf-001-*.md"

# Template per Requirement
[COPY TEMPLATE-fr-template.md AND TEMPLATE-rnf-template.md]

# Structure per Requirement
1. ID and name (FR-001: User Authentication)
2. Description (what it must do)
3. Justification (why it's important)
4. Acceptance criteria (Gherkin Given/When/Then)
5. Dependencies (other FR it needs)
6. Risks (what can go wrong)
7. Implementation notes (agnostic, but useful context)

# Special Requirements
- Agnostic: Describe "what", never "how"
- Examples: "The system must allow a user to..." not "using JWT..."
- Acceptance criteria: Gherkin format (Cucumber)

# Validation
- [ ] Is each requirement independent?
- [ ] Are acceptance criteria verifiable?
- [ ] Is there no technological prescription?
- [ ] Does each FR connect with Discovery needs?
```

#### Prompt 2.3: Priority Matrix & Scope Boundaries

```markdown
# Context
[All FR/NFR generated]

# Task
Generate two documents:
1. "01-templates/02-requirements/priority-matrix.md"
2. "01-templates/02-requirements/scope-boundaries.md"

# Priority Matrix
- Use MoSCoW: Must, Should, Could, Won't
- Table: FR/NFR | Category | Justification | Effort (low/med/high)
- Comment: what is the MVP (what is absolutely necessary)

# Scope Boundaries
- What is WITHIN (MVP + phase 2)
- What is EXPLICITLY OUTSIDE (future, depends on others, etc.)
- Reasons (time, technical, business constraints)
- Decision table (what was candidate and why it was discarded)

# Validation
- [ ] Is the MVP clear?
- [ ] Are limits explicit (not just the unmentioned)?
- [ ] Are reasons clear?
```

---

### PHASE 3: Design & Process

**Central question**: How does the system flow and what is the domain model?

#### Prompt 3.1: Strategic Design (Bounded Contexts)

```markdown
# Context
[Requirements completed]
[Bounded Contexts identified in preparation]

# Initial Contexts List
[Ex: Identity, Authorization, Billing, Organization]

# Task
Generate "01-templates/03-design/strategic-design.md"

# Template
[COPY TEMPLATE-strategic-design.md]

# Structure
1. Domain Vision Statement (why these contexts)
2. Subdomain Classification:
   - Core Domains (competitive differentiation)
   - Supporting Domains (necessary but generic)
   - Generic Domains (commodity)
3. Bounded Contexts (name, responsibility, ubiquitous language)
4. Ubiquitous Language (key terms per context)
5. Aggregate Locations (aggregate roots per context)

# Style
- DDD-centric (contexts, subdomains, aggregates language)
- Implementation agnostic
- Include rationale (why these boundaries)

# Validation
- [ ] Does each context have a unique and clear responsibility?
- [ ] Is ubiquitous language distinct per context?
- [ ] Is classification justified (Core/Supporting/Generic)?
```

#### Prompt 3.2: System Flows

```markdown
# Context
[Strategic Design + Requirements]

# Task
Generate "01-templates/03-design/system-flows.md"

# Structure
Document 5-10 main flows, including:
1. User Registration / Authentication
2. Main business process (ex: Purchase, Account Setup, etc.)
3. Error/Exception handling
4. Admin operations
5. Integration points (with external systems if any)

# Per Flow
- Name and brief description
- Involved actors
- Steps (1. User does X, 2. System responds Y, etc.)
- Decisions (if there are branches)
- Successful exit and alternatives
- Diagram (Mermaid: sequence or flowchart)

# Style
- Narrative + diagram
- Agnostic (don't mention "database query" but "obtain information from X")
- Include involved domain contexts

# Validation
- [ ] Do they cover main FR?
- [ ] Are actors clear?
- [ ] Are diagrams readable?
```

#### Prompt 3.3: Bounded Context Models

```markdown
# Context
[Strategic Design completed]

# Task
Generate domain models for each Bounded Context.
Ex: "01-templates/03-design/bounded-contexts/identity.md"

# Template
[COPY TEMPLATE-context.md]

# Per Context, Document
1. Context purpose
2. Ubiquitous language (10-15 key terms)
3. Main aggregates (root entities, value objects)
4. Domain invariants (what must always be true)
5. Domain events (what happens when something important occurs)
6. Interfaces (how it interacts with other contexts)
7. Design decisions (alternatives considered)

# Style
- DDD tactical (aggregates, value objects, events)
- Technology agnostic
- Based on specific context requirements

# Validation
- [ ] Is the context responsibility understood?
- [ ] Are domain events business events, not technical?
- [ ] Are invariants clear?
```

---

### PHASE 4: UI Design (Optional in agnostic version)

**Central question**: How does the user interact with the system?

```markdown
# Note
UI Design is agnostic at structure level, but specific in details.
It's recommended to do this phase AFTER the design team completes it.

# Task (if you want to document conceptual UI)
Generate "01-templates/03-design/ui/wireframes.md"

# Structure
- Per main screen:
  1. Name
  2. Purpose (what flow it solves)
  3. Actors (who sees it)
  4. Main components (not technical names, but "form", "table", etc.)
  5. Interaction flow (1. User does X, 2. System responds Y)
  6. States (normal, loading, error)
  7. Diagram (ASCII or Mermaid)

# Validation
- [ ] Does each screen have a clear purpose?
- [ ] Is the flow understood without knowing UI frameworks?
```

---

### PHASE 5: Data Model

**Central question**: How is information structured and how does it flow?

#### Prompt 5.1: Entities & Relationships

```markdown
# Context
[Complete Design]

# Task
Generate "01-templates/04-data-model/entities.md" and "relationships.md"

# Template
[COPY TEMPLATE-entities.md AND TEMPLATE-relationships.md]

# Entities Document
- Per domain entity:
  1. Name and description
  2. Attributes (type, optional/required, constraints)
  3. Invariants (what must always hold)
  4. Origin (from which requirement or flow it comes)
  5. Notes (ex: "soft delete", "auditable", etc.)
- Consolidated table with all entities

# Relationships Document
- ERD Diagram (Mermaid: entity relationship)
- Per relationship: (1:1, 1:N, N:N, mandatory/optional)
- Relationships table with justification

# Style
- DB Agnostic (don't mention "SERIAL", "VARCHAR", but "unique identifier", "text")
- Based on domain entities (from Design)

# Validation
- [ ] Does each entity correspond to a domain concept?
- [ ] Do relationships support Design flows?
- [ ] Are there no unnecessary "generic" tables?
```

---

### PHASE 6: Planning

**Central question**: When and how do we deliver?

```markdown
# Context
[Requirements + Design + Data Model]

# Task
Generate "01-templates/05-planning/roadmap.md" and "epics.md"

# Roadmap
- 6-12 month vision
- Phases (MVP → Phase 2 → Phase 3...)
- Per phase: name, estimated duration, included FR, expected result
- Dependencies between phases

# Epics
- Group FR by feature/capability
- Per epic: name, description, included FR, priority, estimation (story points)

# Validation
- [ ] Is the MVP clear?
- [ ] Are dependencies explicit?
- [ ] Are estimations reasonable?
```

---

### PHASE 7: Development

**Central question**: How do we build this technically?

HERE is where you use your specific stack. Provide:

```markdown
# Technical stack
Backend: [ex: Java 21, Spring Boot 3.x]
Frontend: [ex: React 19, TypeScript]
Database: [ex: PostgreSQL 15]
Infrastructure: [ex: Docker, Kubernetes]

# Task
Generate "01-templates/06-development/architecture.md" + "api-reference.md" + "coding-standards.md"

# Architecture
- Hexagonal / clean / layered architecture (according to your stack)
- Modules to Bounded Contexts map
- Key patterns (ex: Repository, Factory, Anti-Corruption Layer)
- Request flow (how a request enters, how it's processed)

# API Reference
- Per endpoint: method, route, parameters, response, errors
- Request/response examples
- Security notes (ex: what roles can access)

# Coding Standards
- Conventions (naming, formatting)
- Naming pattern per role (Controller, UseCase, Entity, etc.)
- Anti-patterns to avoid
- Testing expectations

# Validation
- [ ] Does architecture reflect domain model?
- [ ] Are APIs RESTful (or your standard)?
- [ ] Are conventions clear and consistent?
```

---

### PHASES 8-12: Testing, Deployment, Operations, Monitoring, Feedback

For these phases, the prompt is similar:

```markdown
# Context
[All previous phases]

# Task
Generate "01-templates/07-testing/test-strategy.md" (or equivalent per phase)

# Structure
[Specific to the phase — see templates]

# Validation
- [ ] Does it connect with FR and Design?
- [ ] Is it executable by the team?
- [ ] Does it include concrete examples?
```

---

## Validation Checklist

After generating each document, validate:

### ✅ Content

- [ ] Answers the central question of the phase
- [ ] Includes all required sections
- [ ] Provides sufficient detail (neither superficial nor excessive)
- [ ] Has concrete examples (not just theory)

### ✅ Style

- [ ] Accessible to expected audience (technical, non-technical, executives)
- [ ] Professional but not pretentious
- [ ] No unexplained jargon
- [ ] Paragraphs not too long (max 3-4 sentences)

### ✅ Consistency

- [ ] Maintains tone of previous documents
- [ ] Uses same terms (glossary)
- [ ] Cross-references work
- [ ] Data doesn't contradict

### ✅ Agnostic (phases 1-5)

- [ ] Doesn't mention technology names
- [ ] Describes "what", not "how"
- [ ] Doesn't assume technical solutions
- [ ] Can be understood without knowing the stack

### ✅ Format

- [ ] Valid Markdown
- [ ] Titles in correct hierarchy (H1, H2, H3...)
- [ ] Lists and tables are well formed
- [ ] Diagrams are readable (Mermaid or ASCII)

---

## Troubleshooting

### Problem: AI generates very generic content

**Cause**: Insufficient context

**Solution**: Provide specific examples from your product:
- Concrete use cases
- Real constraints (ex: "must comply with GDPR")
- Real numbers (ex: "10k simultaneous users")

### Problem: AI mentions technologies in agnostic phases

**Cause**: Model bias

**Solution**: Add explicit instruction:
```
IMPORTANT: This document is technology agnostic.
DO NOT mention: databases, languages, frameworks, specific protocols.
Replace "PostgreSQL" with "relational database".
Replace "REST API" with "programmatic interface".
```

### Problem: AI forgets sections or requirements

**Cause**: Prompt too long or poorly structured

**Solution**: Use explicit lists:
```
This document MUST include:
1. [section]
2. [section]
3. [section]
```

### Problem: Documents don't connect between phases

**Cause**: Context isn't shared between prompts

**Solution**: For each phase, include:
```
# Context from previous phases
[Briefly summarize discovery, requirements, design]

# How this document connects
[Explain what RF/design decisions it supports]
```

### Problem: Documentation is too long or short

**Cause**: Poorly defined expectation

**Solution**: Specify exactly:
```
Length: 2000-2500 words
Style: Executive (maximum 2 paragraphs per section)
Level: Overview (no implementation details)
```

---

## Complete Example: Discovery Generation

### Input (what YOU provide to AI):

```markdown
# Your Product

**Name**: TaskFlow
**Problem**: Small teams spend 5+ hours/day on task synchronization

**Context**:
- Target: Teams of 3-15 people (startups, agencies)
- Competition: Jira (too complex), Asana (too expensive)
- Opportunity: Simple, cheap tool with AI

**Stack** (just FYI, MUST NOT be mentioned in docs):
- Backend: Node.js + Express
- Frontend: React
- DB: PostgreSQL

---

# Task for AI

Generate the document "discovery/context-motivation.md" for TaskFlow.

# Template
[PASTE TEMPLATE-context-motivation.md]

# Specifications
- Length: 2000-2500 words
- Agnostic: DO NOT mention specific technologies
- Sections: Problem, Market Context, Strategic Motivation, Stakeholders,
  Initial Risks, Opportunities, Key Assumptions
- Tone: Professional, inspiring but realistic
- Include:
  - How much time teams spend (concrete data)
  - Mentioned competitors (Jira, Asana) without saying how they implement
  - Specific market segment
```

### Output (what AI generates):

```markdown
[Generated document: discovery/context-motivation.md]

[Long, structured, agnostic, with clear sections]
```

### Validation (what YOU review):

```
✅ Is the problem clear?
✅ Is market context understood?
✅ Does it mention Jira/Asana without prescribing solutions?
✅ 2000+ words?
✅ No technologies mentioned?

If all OK → Next document
If NOT → Request specific adjustments from AI
```

---

## Next Steps

1. 📖 Read [`TEMPLATE-USAGE-GUIDE.md`](./TEMPLATE-USAGE-GUIDE.md) to understand the end-to-end process
2. 📋 Use the prompts above to generate each phase
3. ✅ Apply validation checklist after each document
4. 🔗 Ensure cross-references between phases

---

[← Index](./README.md)
