# AI Workflow Guide

## Using This Template with AI Co-Creation

This guide explains how to leverage AI agents and Claude Code to accelerate documentation creation while maintaining quality and accuracy.

## Workflow Overview

### 1. AI Generates Initial Draft
AI creates a first version based on templates and examples

### 2. Human Validates & Refines
Product/technical leads review, correct, and personalize

### 3. AI Assists Refinement
AI improves based on feedback

### 4. Sign-Off & Lock
Phase is approved and locked in as source of truth

---

## By Phase

### Phase 1: Discovery (AI-Assisted)

**What AI Can Do**:
- Generate persona templates from actor descriptions
- Draft vision statements from one-line descriptions
- Suggest scope boundaries based on requirements
- Research and compile similar projects' approaches
- Create initial actor/stakeholder maps

**What Needs Human Input**:
- ✅ Actual business constraints and context
- ✅ Real stakeholder goals and pain points
- ✅ Strategic decisions (go/no-go, priorities)
- ✅ Competitive positioning
- ✅ Timeline and resource constraints

**Workflow**:
```
1. Human: "We're building a collaborative project management tool"
2. AI: Generates actor templates (Project Manager, Team Member, Admin)
3. Human: Reviews and refines with actual persona details
4. AI: Assists with scope/boundary analysis
5. Sign-off: Head of Product approves
```

**AI Prompts**:
```
"Based on this context [PASTE CONTEXT], generate:
- 3-4 key personas with realistic goals and pain points
- A vision statement (1-2 sentences)
- 5 key business constraints"
```

---

### Phase 2: Requirements (AI-Assisted)

**What AI Can Do**:
- Generate functional requirement templates
- Suggest acceptance criteria based on descriptions
- Draft user stories from persona scenarios
- Create requirement matrices
- Link requirements to actors (traceability)

**What Needs Human Input**:
- ✅ Actual business rules and workflows
- ✅ Legal/compliance requirements
- ✅ Performance and scalability targets
- ✅ Security and privacy requirements
- ✅ Prioritization (MoSCoW)

**Workflow**:
```
1. Human: "Users need to upload documents, max 100MB, in PDF/DOC format"
2. AI: Generates FR with flows, exception cases, acceptance criteria
3. Human: Reviews, adjusts based on business logic
4. AI: Generates related NFRs (performance, security, storage)
5. Sign-off: Product Manager approves all requirements
```

**AI Prompts**:
```
"Generate a functional requirement for: [FEATURE DESCRIPTION]
Include:
- Clear user goal
- Main flow
- Exception flows
- Acceptance criteria (at least 5)
- Assumptions"
```

---

### Phase 3: Design (AI-Assisted for Flows, Human-Led for UX)

**What AI Can Do**:
- Generate system flow diagrams as descriptions (for Mermaid/UML tools)
- Create wireframe descriptions
- Suggest UI patterns based on use cases
- Generate process decision frameworks
- Create accessibility checklists

**What Needs Human Input**:
- ✅ Actual UI/UX design (sketches, mockups)
- ✅ Visual design language and branding
- ✅ User experience flows (validated with users)
- ✅ Critical design decisions
- ✅ Interaction patterns and microinteractions

**Workflow**:
```
1. Human: Provides use case description + rough sketch
2. AI: Generates system flow and wireframe description
3. Design team: Creates actual mockups in Figma/Adobe XD
4. AI: Documents UI specifications from designs
5. Sign-off: UX Lead and Product Manager approve
```

**AI Prompts**:
```
"Generate a detailed system flow diagram (Mermaid format) for:
[FEATURE DESCRIPTION]

Include:
- All user actions
- System responses
- Error/exception paths
- Decision points"
```

---

### Phase 4: Data Model (AI-Assisted for Initial, Expert Validation)

**What AI Can Do**:
- Generate initial entity definitions
- Create ERD diagrams (Mermaid format)
- Suggest attribute types and constraints
- Generate SQL migration suggestions
- Create data flow diagrams

**What Needs Human Input**:
- ✅ Actual database schema decisions
- ✅ Performance considerations (indexing, partitioning)
- ✅ Data retention policies
- ✅ Integrity constraints
- ✅ Historical data tracking requirements

**Workflow**:
```
1. Human: Describes entities and relationships
2. AI: Generates ERD and SQL schema suggestions
3. DBA/Architect: Reviews, optimizes for performance
4. AI: Documents constraints and validation rules
5. Sign-off: Architecture lead approves
```

**AI Prompts**:
```
"Generate a complete data model (ERD + attributes) for:
[DOMAIN DESCRIPTION]

Consider:
- All entities from requirements
- Relationships and cardinality
- Attributes and their types
- Constraints and validation rules"
```

---

### Phase 5: Planning (Hybrid)

**What AI Can Do**:
- Generate roadmap templates
- Create epic breakdowns from requirements
- Suggest user story formats
- Generate sprint planning templates
- Estimate story complexity (rough)

**What Needs Human Input**:
- ✅ Actual timelines and milestones
- ✅ Resource availability
- ✅ Business priorities
- ✅ Dependencies between epics
- ✅ Release strategy

**Workflow**:
```
1. Human: "We have 6 months, 5 engineers, must launch by Q3"
2. AI: Generates roadmap template with phases
3. Product: Fills in actual milestones and priorities
4. Engineering: Estimates and adjusts
5. Sign-off: Product Lead approves roadmap
```

---

### Phase 6: Development (Human-Led, AI-Assists)

**What AI Can Do**:
- Generate architecture diagrams (from description)
- Create API specification templates
- Suggest coding standards
- Generate example code patterns
- Create ADR (Architecture Decision Record) templates

**What Needs Human Input**:
- ✅ Actual technology choices
- ✅ Architectural patterns and rationale
- ✅ Specific API designs
- ✅ Code examples in chosen language
- ✅ Performance and scalability considerations

**Workflow**:
```
1. Engineering: Defines architecture (hexagonal, layers, services)
2. AI: Documents architecture in templates
3. Tech Lead: Creates API specifications
4. Engineers: Implement, documenting decisions in ADRs
5. Architecture Review: Approves design
```

**Note**: AI can write code examples, but engineers own the actual implementation and architectural decisions.

---

### Phase 7: Testing (Hybrid)

**What AI Can Do**:
- Generate test case templates
- Suggest test scenarios based on requirements
- Create testing checklists
- Generate test data factories
- Suggest coverage targets

**What Needs Human Input**:
- ✅ Actual test cases and edge cases
- ✅ Security testing scenarios
- ✅ Performance test setup
- ✅ Test data strategies
- ✅ Coverage goals

**Workflow**:
```
1. QA: Creates initial test plan
2. AI: Generates test case templates
3. QA/Dev: Write actual test cases
4. AI: Assists with test data and edge cases
5. Sign-off: QA Lead approves test strategy
```

---

### Phase 8: Deployment (Hybrid)

**What AI Can Do**:
- Generate CI/CD pipeline templates (GitHub Actions, GitLab, etc.)
- Create deployment checklists
- Suggest rollback strategies
- Generate runbook templates
- Create release notes templates

**What Needs Human Input**:
- ✅ Actual infrastructure setup
- ✅ Deployment tools and configurations
- ✅ Environment specifications
- ✅ Security and compliance controls
- ✅ Disaster recovery procedures

**Workflow**:
```
1. DevOps: Designs deployment architecture
2. AI: Generates pipeline templates and checklists
3. DevOps: Implements actual pipelines
4. AI: Documents procedures
5. Sign-off: DevOps Lead approves
```

---

### Phase 9: Operations (Hybrid)

**What AI Can Do**:
- Generate runbook templates
- Suggest SLA targets (industry standards)
- Create incident response templates
- Generate on-call procedures
- Create monitoring setup guides

**What Needs Human Input**:
- ✅ Actual operational procedures
- ✅ Service level agreements (business decisions)
- ✅ Incident classification and response times
- ✅ Escalation paths
- ✅ On-call rotation and contact info

---

### Phase 10: Monitoring (Hybrid)

**What AI Can Do**:
- Suggest key metrics by domain
- Generate alert rule templates
- Create dashboard specifications
- Suggest monitoring architecture
- Generate health check implementations

**What Needs Human Input**:
- ✅ Actual business metrics and KPIs
- ✅ Alert thresholds and escalation
- ✅ Dashboard designs
- ✅ Monitoring tool selection
- ✅ Alerting infrastructure

---

### Phase 11: Feedback (Human-Led)

**What AI Can Do**:
- Generate retrospective templates
- Analyze trends in feedback
- Suggest improvement areas
- Create action item tracking
- Generate lessons learned summaries

**What Needs Human Input**:
- ✅ Actual team retrospective discussions
- ✅ Real user feedback collection
- ✅ Performance metrics analysis
- ✅ Strategic reflections

---

## AI Agent Types & When to Use

### 1. **General Discovery Agent**
Best for: Understanding context, brainstorming, initial analysis

Usage:
```bash
claude "Analyze this business context and suggest [items]"
```

### 2. **Documentation Generator**
Best for: Creating templates, boilerplate, structured outlines

Usage:
```bash
claude "Generate a complete [phase] documentation outline for [project]"
```

### 3. **Code & Architecture Agent**
Best for: Technical documentation, API specs, ADRs

Usage:
```bash
claude "Design a REST API for [feature] with full specifications"
```

### 4. **Requirements Analyzer**
Best for: Breaking down features, acceptance criteria, traceability

Usage:
```bash
claude "Create detailed functional requirements from: [feature description]"
```

### 5. **Design Flow Agent**
Best for: System flows, process diagrams, user journeys

Usage:
```bash
claude "Create a detailed system flow (Mermaid format) for: [process]"
```

---

## Best Practices for AI-Human Collaboration

### 1. Clear Input = Better Output
```
❌ "Generate requirements"
✅ "Generate functional requirements for a file upload feature with these constraints: 
   - Max 100MB, 
   - PDF/DOC only, 
   - Virus scanning required,
   - Retention: 7 years for compliance"
```

### 2. Review & Personalize
Always review AI output:
- ✅ Is it accurate for our project?
- ✅ Does it match our context?
- ✅ Are the examples relevant?
- ✅ Any missing domain-specific details?

### 3. Iterate with Feedback
```
1. AI: Generates first draft
2. Human: "Good, but add X, change Y, remove Z"
3. AI: Refines based on feedback
4. Human: Reviews again
5. Sign-off: Phase complete
```

### 4. Lock Phases
Once a phase is complete and signed off:
- Mark as "APPROVED" in README
- Use as source of truth for next phase
- Only update with explicit change requests
- Track changes like code (commits, diffs)

### 5. Use AI for Bulk Generation, Humans for Details
```
AI Strong Points:
- Generating multiple variations
- Creating templates and examples
- Documenting patterns
- Organizing information

Human Strong Points:
- Strategic decisions
- Domain expertise
- Validation and accuracy
- User empathy
- Judgment calls
```

---

## Template Prompts

### For Any Phase:
```markdown
"I have a [PHASE NAME] to complete for [PROJECT DESCRIPTION].

Context:
[PASTE RELEVANT INFO FROM PREVIOUS PHASES]

Complete this template:
[PASTE TEMPLATE]

Focus on [SPECIFIC AREA]"
```

### For Requirements Expansion:
```markdown
"Take this requirement: '[REQUIREMENT]'

Generate:
1. Detailed functional requirement with flows
2. 5+ acceptance criteria
3. Exception/error cases
4. Assumptions and dependencies"
```

### For Design Flows:
```markdown
"Create a detailed system flow diagram (Mermaid format) for:
[FEATURE/PROCESS DESCRIPTION]

Include:
- All actors
- Decision points
- Exception paths
- System actions"
```

---

## Quality Checklist for AI Output

Before accepting AI-generated content:

- [ ] **Accuracy**: Does it match project context?
- [ ] **Completeness**: Are all sections filled?
- [ ] **Relevance**: Is it specific to our project or generic?
- [ ] **Traceability**: Are links to other phases correct?
- [ ] **Formatting**: Consistent with template structure?
- [ ] **Examples**: Do examples make sense for our domain?
- [ ] **Tone**: Does it match project documentation style?
- [ ] **Actionable**: Can next phase use this as input?

---

## When NOT to Use AI

- ❌ Strategic business decisions
- ❌ Technical decisions with major architectural impact
- ❌ Security & compliance policies (review with experts)
- ❌ Final sign-off authority (only project leads)
- ❌ Actual implementation (AI drafts, humans code)

---

**Next**: EXAMPLE-IMPLEMENTATION.md — Full worked example
