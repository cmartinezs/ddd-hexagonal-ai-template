# Skills & Plugins Guide

## Using Claude Code Skills with This Template

This guide explains how to integrate Claude Code skills and AI agents to accelerate documentation creation.

## Available Skills

### Documentation & Writing

#### `dev-tools:project-docs`
Generate project documentation automatically

**When to use**: Creating comprehensive project documentation across phases

**Usage**:
```bash
/project-docs
```

**Example Workflow**:
1. Have Phase 1-2 documentation ready (Discovery, Requirements)
2. Use `project-docs` to generate architecture and design documentation
3. Review and refine the output
4. Use as input for development team

---

#### `dev-tools:app-docs`
Generate user-facing documentation and API documentation

**When to use**: Phase 6-7, for API specs and user guides

**Usage**:
```bash
/app-docs
```

---

#### `writing:proposal-writer`
Write professional proposals and specifications

**When to use**: Phase 2, for requirements specifications; Phase 5 for roadmap proposals

---

### Code & Architecture

#### `domain-driven-design`
Deep guidance on DDD principles and implementation

**When to use**: Phase 0-1 (planning discovery), before Phase 6 (development)

**Usage**:
```bash
/domain-driven-design
```

**Helps with**:
- Identifying bounded contexts
- Defining aggregate roots
- Understanding ubiquitous language
- Domain modeling

---

#### `code-craftsmanship:software-design-philosophy`
Review software design and architecture choices

**When to use**: Phase 3-6, for design validation

---

### Frontend & Design

#### `frontend:design-review`
Review visual design and UX

**When to use**: Phase 3 (Design), validate UI/UX mockups

---

#### `frontend:react-patterns`
Review React code patterns and performance

**When to use**: Phase 6-7, if using React

---

### DevOps & Deployment

#### `cloudflare:wrangler` (if using Cloudflare Workers)
Manage deployments to Cloudflare

**When to use**: Phase 8 (Deployment)

---

### Utilities

#### `dev-tools:git-workflow`
Guided git workflows for managing documentation changes

**When to use**: Keep documentation changes organized

**Usage**:
```bash
/git-workflow
```

---

#### `loop`
Run recurring documentation checks or updates

**When to use**: Automated documentation validation

**Usage**:
```bash
/loop 1w "Validate doc structure and completeness"
```

---

## Recommended Workflow by Phase

### Phase 1: Discovery

**Skills to use**:
1. Start with context in natural language
2. Use `domain-driven-design` to identify core domains
3. Let AI help brainstorm actors and use cases
4. Manual refinement with stakeholders

**Commands**:
```bash
# Get DDD guidance
/domain-driven-design

# For research-heavy projects
/dev-tools:deep-research
```

---

### Phase 2: Requirements

**Skills to use**:
1. Have AI expand feature descriptions into full requirements
2. Use `functional-requirements` skill if available
3. Generate traceability matrices
4. Manual validation of business rules

**Workflow**:
```
1. Paste feature descriptions
2. Use AI to generate requirement templates
3. Refine with business logic
4. Generate acceptance criteria
5. Review and sign-off
```

---

### Phase 3: Design

**Skills to use**:
1. `frontend:design-review` for UI validation
2. AI to generate system flow diagrams (Mermaid format)
3. UX patterns and best practices

**Workflow**:
```
1. Have mockups ready
2. Use design-review for feedback
3. Have AI generate system flows
4. Document design decisions
5. Get stakeholder approval
```

---

### Phase 4: Data Model

**Skills to use**:
1. AI to generate ERD from entity descriptions
2. Validation by database architect
3. Generate schema suggestions

**Workflow**:
```
1. Describe entities and relationships
2. AI generates ERD
3. DBA reviews and optimizes
4. Document constraints and validation
```

---

### Phase 5: Planning

**Skills to use**:
1. `dev-tools:roadmap` — Create product roadmap
2. AI to expand user stories
3. Epic breakdown assistance

**Commands**:
```bash
/roadmap
```

---

### Phase 6: Development

**Skills to use**:
1. `code-craftsmanship:software-design-philosophy`
2. `domain-driven-design` for architecture validation
3. `claude-api` for API design if using Claude API

**Workflow**:
```
1. Define architecture (hexagonal)
2. Design APIs with AI assistance
3. Create coding standards
4. Validate with team reviews
```

---

### Phase 7: Testing

**Skills to use**:
1. `dev-tools:vitest` for testing setup
2. AI to generate test cases
3. Security review: `security-review` skill

**Commands**:
```bash
/vitest
```

---

### Phase 8: Deployment

**Skills to use**:
1. `cloudflare:wrangler` (if using Cloudflare)
2. AI to generate CI/CD pipelines
3. `dev-tools:project-health` for readiness checks

---

### Phase 9: Operations

**Skills to use**:
1. AI to generate runbooks
2. SLA templates
3. Incident response playbooks

---

### Phase 10: Monitoring

**Skills to use**:
1. Alert design assistance
2. Dashboard specifications
3. Metric definition help

---

### Phase 11: Feedback

**Skills to use**:
1. `dev-tools:brains-trust` — Get second opinions
2. Retrospective facilitation
3. Lessons learned synthesis

---

## Integration with Claude Code Settings

### Configure Default Skills

In `.claude/settings.json`:

```json
{
  "defaultSkills": [
    "domain-driven-design",
    "dev-tools:project-docs"
  ],
  "hooks": {
    "beforeDocumentationPhase": "/domain-driven-design --check-alignment"
  }
}
```

### Create Custom Commands

```json
{
  "customCommands": {
    "/doc-phase": "Use phase-appropriate skills and validate deliverables",
    "/validate-docs": "Check documentation completeness and linking"
  }
}
```

---

## AI Agents for Documentation

### Discovery Agent
Helps identify contexts, actors, and system boundaries

**When to use**: Early in Phase 1

**Prompt**:
```
Use domain-driven-design skill to help me:
1. Identify bounded contexts in: [DOMAIN]
2. Define the ubiquitous language
3. List core entities and relationships
```

---

### Requirements Agent
Expands features into detailed requirements

**When to use**: Phase 2

**Prompt**:
```
Create detailed functional requirements for: [FEATURE]
Include:
- User stories
- Acceptance criteria
- Exception cases
- Assumptions
```

---

### Design Agent
Generates system flows and designs

**When to use**: Phase 3

**Prompt**:
```
Generate system flow diagrams (Mermaid format) for:
[FEATURE]
Include:
- Happy path
- Exception flows
- Decision points
```

---

### Testing Agent
Creates test plans and test cases

**When to use**: Phase 7

**Prompt**:
```
Create comprehensive test plan for: [FEATURE]
Include:
- Unit test scenarios
- Integration tests
- E2E test cases
- Performance tests
- Security tests
```

---

## Example: Using Skills in a Real Project

### Scenario: Building an E-commerce Platform

**Phase 1: Discovery**
```bash
# Get DDD guidance on bounded contexts
/domain-driven-design

# Example output:
# - Catalog Bounded Context
# - Order Bounded Context
# - Payment Bounded Context
```

**Phase 2: Requirements**
```bash
# Have AI expand features:
# Input: "Users should be able to add items to cart"
# Output: Full functional requirement with flows
```

**Phase 3: Design**
```bash
# Get design review
/frontend:design-review

# Generate flows
# AI: "Generate system flow for checkout process"
```

**Phase 6: Development**
```bash
# Architecture review
/code-craftsmanship:software-design-philosophy

# API design:
# Input: "Design payment API"
# Output: OpenAPI specification with examples
```

**Phase 8: Deployment**
```bash
# If using Cloudflare:
/cloudflare:wrangler

# Or generate CI/CD pipeline with AI help
```

---

## Tips for Effective Skill Use

1. **Prepare Context**: Have discovery/requirements ready before asking for design
2. **Iterate**: Use skills multiple times, refining each iteration
3. **Review Output**: Never blindly accept AI-generated content
4. **Link to Skills**: Reference which skill generated content for traceability
5. **Combine Skills**: Use multiple skills for different perspectives

---

## Skill Chain Examples

### Complete Discovery-to-Design Chain
```bash
1. /domain-driven-design  # Understand domain structure
2. AI: Generate actors and personas
3. AI: Expand into requirements
4. /frontend:design-review  # Validate design choices
5. AI: Generate system flows
```

### Development-Ready Documentation
```bash
1. /code-craftsmanship:software-design-philosophy  # Review architecture
2. AI: Generate API specifications
3. AI: Create coding standards
4. AI: Generate example implementations
5. Manual code review and refinement
```

---

## Troubleshooting Skill Usage

**Q: Skill output doesn't fit our project**
- A: Refine the prompt with more context
- A: Use multiple prompts to narrow down

**Q: AI generated something wrong**
- A: Provide feedback and iterate
- A: Always have domain experts review
- A: Document corrections for future runs

**Q: Skill isn't available in my environment**
- A: Check `.claude/settings.json` for plugin configuration
- A: Some skills require authentication
- A: Ensure Claude Code is up to date

---

## Advanced: Creating Custom Skills

You can create custom skills for your specific workflow:

**Example: Documentation Validation Skill**
```bash
/update-config

# Add to settings.json:
# "customSkills": {
#   "validate-docs": "Check phase completeness"
# }
```

---

**Next**: EXAMPLE-IMPLEMENTATION.md — See a complete worked example
