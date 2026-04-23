# Instructions for Generating Documentation with AI

You are an AI agent responsible for generating SDLC documentation using this template. This guide provides the specific directives, prompt structures, and phase-by-phase generation prompts you must follow to produce coherent, traceable, and high-quality documentation.

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

These principles govern how you approach every documentation task in this framework. Apply them unconditionally across all phases and all artifact types.

### 1. One phase at a time

Generate phases sequentially, not in bulk. Each phase must be validated and approved before you proceed to the next. Generating everything at once produces generic, untraced output that requires complete rework.

### 2. Provide context, don't ask it to invent

Your output is only as good as your input. Before generating any phase, require the following from your human collaborator:

- Clear problem statement
- List of requirements (if they exist)
- Decisions already made
- Known constraints

### 3. Specify the format explicitly

Every generation prompt must include:

- Expected word count or length range
- Sections the output must include
- Detail level (executive, technical, operational)
- Expected cross-references to other phases

### 4. Use examples when available

If your human collaborator provides an example from another product or a prior project, use it to calibrate the output style and specificity.

### 5. Enforce the agnostic/specific boundary

This is a non-negotiable rule:

- Phases 1–5: **Technology agnostic** — describe the "what", never the "how"
- Phases 6+: **Technology specific** — name your actual stack

If you generate a phases 1–5 document and it contains technology names, stop, identify the violations, and revise before delivering.

---

## AI Agent Authoring Directive (Mandatory)

These rules apply to every artifact you generate, without exception. Read them before producing any output.

1. Operate only with explicit inputs — do not invent business facts.
2. Mark key statements as evidence-backed or inferred when the source is not clear.
3. Keep phases 1–5 strictly technology agnostic.
4. In phases 6–12, reference prior requirements and design artifacts for each major decision.
5. Record assumptions, risks, and open questions in dedicated sections.
6. Do not mark a phase complete without checklist validation and stakeholder sign-off.
7. Preserve traceability links from discovery to feedback throughout all documents.
8. If context is missing or contradictory, stop and request clarification before proceeding.

---

## Autonomous Mode

### For Autonomous AI Execution

This section defines how you operate when working without a human in the loop. Apply these rules strictly to avoid generating documentation based on incomplete or assumed context.

When working autonomously, follow this protocol before generating any phase:

```
AUTONOMOUS MODE:

1. Read previous phase README to understand current status
2. Read all required documents from the previous phase
3. Verify required input exists — if missing, request it explicitly
4. Generate current phase with full verified context
5. Cross-reference all artifacts with previous phases
6. Report completion with structured context for the next phase
```

### Key Principle: Never Assume Context

Assuming context is the most common failure mode in autonomous operation. The distinction is absolute:

```
❌ ASSUME: "Previous phase is complete, proceed"
✅ VERIFY: "Read Phase N-1 index, verify documents exist"
✅ IF MISSING: "Request explicitly: Required: [document]"
```

### Context Validation Protocol

Before generating any phase, verify each of the following. If a check fails, take the specified action — do not proceed until all checks pass.

| Check | If Failed |
|-------|-----------|
| Required docs exist | Request them explicitly |
| Previous phase marked complete | Note partial context; request confirmation |
| Scope boundaries defined | Request clarification |
| Glossary available | Request existing glossary or create one |

### Autonomous Report Format

After completing any phase in autonomous mode, produce this completion report before delivering your output:

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
- [ ] Terminology aligned with glossary
- [ ] Scope respected — no out-of-scope content introduced
```

---

## Prompt Structure

Every generation prompt must follow this five-part structure. Deviation from this structure produces lower-quality output. Use it for every phase, every document.

```
[CONTEXT]
[CENTRAL QUESTION]
[TEMPLATE/EXAMPLE]
[SPECIFIC REQUIREMENTS]
[VALIDATION]
```

### Example Structure

The following example shows a correctly structured prompt for a Discovery phase document:

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
- [ ] Does not assume the reader knows the domain
- [ ] All stakeholders are reflected
```

---

## Prompts by Phase

This section contains ready-to-use generation prompts for each phase. Populate the bracketed placeholders with your project's specific information before submitting. Do not submit prompts without filling in the context fields.

### PHASE 1: Discovery

The central question for this phase is: **What problem do we solve and for whom?** All documents you generate here must answer this question from multiple angles — context, vision, actors, and needs — without mentioning any technology.

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
  7. Key assumptions (what we take as true)

# Style
- Technology agnostic (no framework names, languages, etc.)
- Accessible to non-technical readers (PM, executives)
- Professional but narrative
- Include examples where possible

# Post-generation validation
- [ ] Is the real problem clear (not the solution)?
- [ ] Is it understood why it's important now?
- [ ] Are all stakeholders mentioned?
- [ ] Is there concrete risk analysis?
- [ ] Is it agnostic? (no "database", "API", "frontend", etc.)
```

#### Prompt 1.2: System Vision

Use this prompt after Context & Motivation is approved. The vision document must feel distinct from the context document — one describes the problem, the other describes the future state.

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
  7. Success metrics (how we will know we succeeded)

# Style
- Inspirational but realistic
- Technology agnostic
- Tangible — not just aspiration

# Validation
- [ ] Is it clearly different from context-motivation (one is problem, other is vision)?
- [ ] Are limits explicit (what it is NOT)?
- [ ] Are success metrics measurable?
```

#### Prompt 1.3: Actors & Needs

Generate both documents together since they are tightly coupled. The actors document defines who; the needs document defines what they require.

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
- Per actor: who they are, what they do, their incentives, their constraints
- Include diagrams or tables

Needs (2000 words):
- Per actor: what they need, what they expect, pain points, alternatives they currently use
- Prioritization: must-have vs. nice-to-have
- Need conflicts (if they exist)

# Style
- User-centric (real people, not abstractions)
- Technology agnostic
- Include concrete examples

# Validation
- [ ] Do they cover all identified stakeholders?
- [ ] Are specific pain points documented?
- [ ] Do needs connect with future requirements?
```

---

### PHASE 2: Requirements

The central question for this phase is: **What must the system do?** Requirements must be precise, verifiable, and technology-agnostic. Every requirement must trace back to a Discovery actor or need.

#### Prompt 2.1: Glossary

Generate the glossary before any requirements. It defines the shared vocabulary that all subsequent documents must use consistently.

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
- Agnostic — e.g., no "JWT" but yes "session token"
- Include both business AND key technical concepts

# Validation
- [ ] Is every term defined without using undefined terms?
- [ ] Does it cover the key domain concepts?
```

#### Prompt 2.2: Functional & Non-Functional Requirements

Generate individual requirement documents using the standard template. Each document must be self-contained and fully traceable.

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

Generate these two documents together. They answer the questions of what is included in the MVP and why certain items are out of scope.

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
- Comment: what constitutes the MVP

# Scope Boundaries
- What is WITHIN scope (MVP + phase 2)
- What is EXPLICITLY OUTSIDE scope (future, depends on others, etc.)
- Reasons (time, technical, business constraints)
- Decision table (what was a candidate and why it was discarded)

# Validation
- [ ] Is the MVP clear?
- [ ] Are limits explicit (not just unmentioned)?
- [ ] Are reasons clearly stated?
```

---

### PHASE 3: Design & Process

The central question for this phase is: **How does the system flow and what is the domain model?** Design documents must trace every flow back to at least one requirement.

#### Prompt 3.1: Strategic Design (Bounded Contexts)

Generate the strategic design document before individual context models. It establishes the domain structure that all subsequent design documents follow.

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

Generate system flows after the strategic design is approved. Cover all major user-facing processes and ensure exception paths are documented for every flow.

```markdown
# Context
[Strategic Design + Requirements]

# Task
Generate "01-templates/03-design/system-flows.md"

# Structure
Document 5-10 main flows, including:
1. User Registration / Authentication
2. Main business process (e.g., Purchase, Account Setup, etc.)
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
- Agnostic (don't write "database query" — write "obtain information from X")
- Include involved domain contexts

# Validation
- [ ] Do they cover main FR?
- [ ] Are actors clearly identified in each flow?
- [ ] Are diagrams readable without explanation?
```

#### Prompt 3.3: Bounded Context Models

Generate individual context model files after the strategic design is approved. Each context file must be self-contained and reference the strategic design.

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
- [ ] Is the context responsibility clear?
- [ ] Are domain events business events, not technical ones?
- [ ] Are invariants stated in the ubiquitous language?
```

---

### PHASE 4: UI Design (Optional in agnostic version)

The central question for this phase is: **How does the user interact with the system?** UI documentation captures the interaction structure, not the visual design — that belongs to the design team's tools.

```markdown
# Note
UI Design is agnostic at the structural level but specific in its details.
Complete this phase AFTER the design team finalizes mockups.

# Task (for conceptual UI documentation)
Generate "01-templates/03-design/ui/wireframes.md"

# Structure
- Per main screen:
  1. Name
  2. Purpose (which flow it solves)
  3. Actors (who sees it)
  4. Main components (not technical names — "form", "table", "button")
  5. Interaction flow (1. User does X, 2. System responds Y)
  6. States (normal, loading, error)
  7. Diagram (ASCII or Mermaid)

# Validation
- [ ] Does each screen have a clear, singular purpose?
- [ ] Is the flow understandable without knowing any UI framework?
```

---

### PHASE 5: Data Model

The central question for this phase is: **How is information structured and how does it flow?** Every entity must trace back to at least one domain concept from the Design phase.

#### Prompt 5.1: Entities & Relationships

Generate the entities and relationships documents together. They must be consistent with the bounded contexts defined in Phase 3.

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
  5. Notes (e.g., "soft delete", "auditable", etc.)
- Consolidated table with all entities

# Relationships Document
- ERD Diagram (Mermaid: entity relationship)
- Per relationship: (1:1, 1:N, N:N, mandatory/optional)
- Relationships table with justification

# Style
- DB agnostic (use "unique identifier" not "SERIAL", "text" not "VARCHAR")
- Based on domain entities from the Design phase

# Validation
- [ ] Does each entity correspond to a domain concept?
- [ ] Do relationships support Design flows?
- [ ] Are there no unnecessary "generic" or "utility" tables?
```

---

### PHASE 6: Planning

The central question for this phase is: **When and how do we deliver?** Planning documents must connect directly to the requirements and scope boundaries from Phase 2.

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
- [ ] Is the MVP clearly defined?
- [ ] Are dependencies between phases explicit?
- [ ] Are estimations internally consistent?
```

---

### PHASE 7: Development

The central question for this phase is: **How do we build this technically?** This is the first phase where you may mention specific technologies. Reference the actual stack provided by the engineering team.

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
- Key patterns (e.g., Repository, Factory, Anti-Corruption Layer)
- Request flow (how a request enters and how it's processed)

# API Reference
- Per endpoint: method, route, parameters, response, errors
- Request/response examples
- Security notes (e.g., what roles can access)

# Coding Standards
- Conventions (naming, formatting)
- Naming pattern per role (Controller, UseCase, Entity, etc.)
- Anti-patterns to avoid
- Testing expectations

# Validation
- [ ] Does architecture reflect the domain model?
- [ ] Are APIs RESTful (or your defined standard)?
- [ ] Are conventions clear and consistent?
```

---

### PHASES 8–12: Testing, Deployment, Operations, Monitoring, Feedback

For these phases, use the following base prompt structure. The specific content varies per phase — refer to the corresponding templates in `01-templates/` for the exact sections required.

```markdown
# Context
[All previous phases]

# Task
Generate "01-templates/07-testing/test-strategy.md" (or equivalent per phase)

# Structure
[Specific to the phase — see templates in 01-templates/]

# Validation
- [ ] Does it connect with FR and Design?
- [ ] Is it executable by the team without ambiguity?
- [ ] Does it include concrete examples?
```

---

## Validation Checklist

After generating each document, validate it against all four categories before delivering. A document that fails any category must be revised.

### Content

- [ ] Answers the central question of the phase
- [ ] Includes all required sections
- [ ] Provides sufficient detail (neither superficial nor excessive)
- [ ] Contains concrete examples (not just theoretical statements)

### Style

- [ ] Accessible to the expected audience (technical, non-technical, executive)
- [ ] Professional tone
- [ ] No unexplained jargon
- [ ] Paragraphs are concise (max 3-4 sentences each)

### Consistency

- [ ] Maintains the tone of all previous documents
- [ ] Uses the same terms defined in the glossary
- [ ] Cross-references are valid and point to real documents
- [ ] Data does not contradict prior decisions

### Agnostic (phases 1–5 only)

- [ ] Does not mention technology names
- [ ] Describes "what", not "how"
- [ ] Does not assume any technical solution
- [ ] Can be understood without knowing the implementation stack

### Format

- [ ] Valid Markdown
- [ ] Headers in correct hierarchy (H1 > H2 > H3)
- [ ] Lists and tables are well-formed
- [ ] Diagrams are readable (Mermaid or ASCII)

---

## Troubleshooting

These are the most common failure modes and how to resolve them. Match your problem to a pattern and apply the corresponding solution before re-generating.

### Problem: Output is very generic and not project-specific

**Cause**: Insufficient context was provided in the prompt.

**Solution**: Add specific examples from the project before generating:
- Concrete use cases
- Real constraints (e.g., "must comply with GDPR")
- Real numbers (e.g., "10k simultaneous users")
- Named actors and goals from Discovery

### Problem: Technology names appear in phases 1–5 output

**Cause**: Model bias toward technical vocabulary.

**Solution**: Add this explicit instruction to the prompt:
```
IMPORTANT: This document is technology agnostic.
DO NOT mention: databases, languages, frameworks, specific protocols.
Replace "PostgreSQL" with "relational database".
Replace "REST API" with "programmatic interface".
```

### Problem: Sections or requirements are missing from output

**Cause**: Prompt too long or poorly structured.

**Solution**: Use an explicit numbered list of required sections:
```
This document MUST include:
1. [section]
2. [section]
3. [section]
```

### Problem: Documents from different phases do not connect

**Cause**: Context from previous phases was not passed in the prompt.

**Solution**: For each phase, include a context summary section:
```
# Context from previous phases
[Summarize discovery, requirements, design decisions]

# How this document connects
[Explain which FR or design decisions it supports]
```

### Problem: Documentation is too long or too short

**Cause**: Expected length and depth were not specified.

**Solution**: Specify them explicitly:
```
Length: 2000-2500 words
Style: Executive (maximum 2 paragraphs per section)
Level: Overview (no implementation details)
```

---

## Complete Example: Discovery Generation

The following example shows the full input-output-validation cycle for a Discovery phase document. Use this pattern for all phases.

### Input (what you provide to the generation prompt)

```markdown
# Your Product

**Name**: TaskFlow
**Problem**: Small teams spend 5+ hours/day on task synchronization

**Context**:
- Target: Teams of 3-15 people (startups, agencies)
- Competition: Jira (too complex), Asana (too expensive)
- Opportunity: Simple, cheap tool with AI assistance

**Stack** (FYI only — MUST NOT be mentioned in phases 1-5 docs):
- Backend: Node.js + Express
- Frontend: React
- DB: PostgreSQL

---

# Task

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
  - Concrete data on how much time teams spend
  - Competitor mentions (Jira, Asana) without prescribing solutions
  - Specific market segment definition
```

### Output (what you generate)

```markdown
[Generated document: discovery/context-motivation.md]

[Long, structured, agnostic content with all required sections]
```

### Validation (what you verify before delivery)

```
✅ Is the problem statement clear?
✅ Is the market context documented?
✅ Are Jira/Asana mentioned without prescribing solutions?
✅ 2000+ words?
✅ No technology names mentioned?

If all OK → Deliver to human collaborator for sign-off
If NOT → Identify specific violations and revise
```

---

## Next Steps

1. Read [`TEMPLATE-USAGE-GUIDE.md`](./TEMPLATE-USAGE-GUIDE.md) for document structure requirements
2. Use the prompts above to generate each phase
3. Apply the validation checklist after every document
4. Maintain cross-references between phases throughout

---

[← Index](./README.md)
