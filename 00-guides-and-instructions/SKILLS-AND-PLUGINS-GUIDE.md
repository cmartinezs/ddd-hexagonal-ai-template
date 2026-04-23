# Skills & Plugins Guide

You are an AI agent working within Claude Code. This guide defines which Claude Code skills you should invoke at each documentation phase, what each skill produces, and how to integrate skills into your documentation workflow. Use this guide to validate your output and enrich documentation quality beyond what you can generate alone.

## Available Skills

This section lists all skills relevant to documentation work, organized by their primary function. For each skill, the description explains what it does and the "When to Use" field specifies the exact situation that should trigger its invocation.

### Documentation & Writing

These skills generate, extend, or validate written documentation. Invoke them when generating a new phase or when reviewing output for completeness.

#### `dev-tools:project-docs`
Generates project documentation automatically from existing code and configuration files.

**When to use**: When transitioning from Phase 1–2 (Discovery, Requirements) to Phase 6 (Development) — use it to generate architecture and design documentation scaffolding.

**Usage**:
```bash
/project-docs
```

**Example Workflow**:
1. Ensure Phase 1–2 documentation is complete and approved
2. Invoke `project-docs` to generate architecture and design documentation scaffolding
3. Review and refine the generated output
4. Use it as starting input for the development team

---

#### `dev-tools:app-docs`
Generates user-facing documentation and API documentation from specifications.

**When to use**: During Phase 6–7 (Development, Testing) — invoke it when API specs are ready and you need user-facing documentation or endpoint references.

**Usage**:
```bash
/app-docs
```

---

#### `writing:proposal-writer`
Writes professional proposals, specifications, and structured documents.

**When to use**: During Phase 2 (Requirements) for requirements specifications; during Phase 5 (Planning) for roadmap proposals; when a stakeholder-facing document needs polished, formal language.

---

### Code & Architecture

These skills validate technical correctness and architectural alignment. Invoke them when generating or reviewing development documentation.

#### `domain-driven-design`
Provides deep guidance on DDD principles and implementation patterns.

**When to use**: During Phase 0–1 (Planning, Discovery) when identifying bounded contexts and domain structure; before Phase 6 (Development) when designing the hexagonal architecture.

**Usage**:
```bash
/domain-driven-design
```

**What it helps you produce**:
- Bounded context identification and boundaries
- Aggregate root definitions
- Ubiquitous language catalog
- Domain model validation

---

#### `code-craftsmanship:software-design-philosophy`
Reviews software design and architecture choices against established design principles.

**When to use**: During Phase 3–6 (Design through Development) when you need validation that architectural decisions align with SOLID, clean architecture, and DDD principles.

---

### Frontend & Design

These skills validate UI/UX decisions and frontend implementation. Invoke them when generating Design phase documentation.

#### `frontend:design-review`
Reviews visual design and UX patterns against best practices.

**When to use**: During Phase 3 (Design) when documenting UI/UX wireframes and interaction flows — invoke it to validate design choices before finalizing mockup documentation.

---

#### `frontend:react-patterns`
Reviews React code patterns and performance considerations.

**When to use**: During Phase 6–7 (Development, Testing) if the project uses React — invoke it when generating coding standards or reviewing frontend architecture documentation.

---

### DevOps & Deployment

These skills support infrastructure and deployment documentation. Invoke them when generating Phase 8 documentation.

#### `cloudflare:wrangler` (if using Cloudflare Workers)
Manages and validates deployments to Cloudflare Workers.

**When to use**: During Phase 8 (Deployment) if the target infrastructure is Cloudflare Workers — invoke it to generate or validate deployment pipeline documentation.

---

### Utilities

These skills support cross-cutting concerns: workflow management, automation, and ongoing documentation health.

#### `dev-tools:git-workflow`
Provides guided git workflows for managing documentation changes as version-controlled artifacts.

**When to use**: When committing phase documentation to version control, creating pull requests for phase sign-off, or managing branch workflows for documentation changes.

**Usage**:
```bash
/git-workflow
```

---

#### `loop`
Runs recurring checks or commands on an interval.

**When to use**: For automated documentation validation on a schedule — e.g., checking documentation completeness weekly.

**Usage**:
```bash
/loop 1w "Validate doc structure and completeness"
```

---

## Recommended Workflow by Phase

This section maps each documentation phase to the specific skills you should invoke. Use the corresponding workflow sequence as a checklist before and after generating phase documentation.

### Phase 1: Discovery

During Discovery, your primary tool is the `domain-driven-design` skill to identify and validate the core domain structure before committing to any design decisions.

**Skills to invoke**:
1. Start with context from the human collaborator in natural language
2. Invoke `domain-driven-design` to identify core domains and bounded contexts
3. Use AI to brainstorm actors and use cases from the domain structure
4. Deliver to human collaborator for manual refinement with stakeholders

**Commands**:
```bash
# Identify domain structure and bounded contexts
/domain-driven-design

# For research-heavy projects needing external information
/dev-tools:deep-research
```

---

### Phase 2: Requirements

During Requirements, use AI to expand feature descriptions into structured requirement artifacts. Validate the output structure against the template before delivery.

**Skills to invoke**:
1. Use AI to expand feature descriptions into full requirement templates
2. Generate traceability matrices connecting requirements to Discovery
3. Invoke validation against template structure

**Workflow**:
```
1. Paste feature descriptions from the human collaborator
2. Use AI to generate requirement templates
3. Refine with business logic from the human collaborator
4. Generate acceptance criteria
5. Review, validate, and deliver for sign-off
```

---

### Phase 3: Design

During Design, invoke `frontend:design-review` for UI validation and use AI to generate system flow diagrams in Mermaid format. Ensure all flows trace to requirements.

**Skills to invoke**:
1. `frontend:design-review` — Validate UI/UX patterns when mockups are available
2. AI — Generate system flow diagrams (Mermaid format)
3. AI — Document UX patterns and interaction standards

**Workflow**:
```
1. Receive mockups from design team
2. Invoke design-review for feedback on documented patterns
3. Generate system flows from requirement descriptions
4. Document design decisions with rationale
5. Deliver for stakeholder approval
```

---

### Phase 4: Data Model

During Data Model, use AI to generate the ERD from entity descriptions. The DBA or architect validates and optimizes the result.

**Skills to invoke**:
1. AI — Generate ERD from entity descriptions
2. DBA validation — human review of performance and constraint decisions
3. AI — Document constraints and validation rules after DBA review

**Workflow**:
```
1. Receive entity descriptions from architect
2. Generate ERD (Mermaid format)
3. DBA reviews and optimizes
4. Document constraints and validation
```

---

### Phase 5: Planning

During Planning, invoke `dev-tools:roadmap` to create the product roadmap structure, then use AI to expand requirements into epics.

**Skills to invoke**:
1. `dev-tools:roadmap` — Generate product roadmap structure
2. AI — Expand requirements into user stories
3. AI — Produce epic breakdowns from requirements

**Commands**:
```bash
/roadmap
```

---

### Phase 6: Development

During Development, invoke `code-craftsmanship:software-design-philosophy` to validate the hexagonal architecture design and use `domain-driven-design` to verify that the architecture aligns with the domain model from Phase 3.

**Skills to invoke**:
1. `code-craftsmanship:software-design-philosophy` — Validate architecture decisions
2. `domain-driven-design` — Verify architecture aligns with bounded contexts
3. `claude-api` — For API design if using Claude API

**Workflow**:
```
1. Receive architecture definition from engineering team
2. Document architecture in hexagonal template
3. Invoke software-design-philosophy skill for validation
4. Design APIs with AI assistance
5. Create coding standards
6. Deliver for team review
```

---

### Phase 7: Testing

During Testing, invoke `dev-tools:vitest` for testing framework guidance and `security-review` when documenting security testing strategy.

**Skills to invoke**:
1. `dev-tools:vitest` — Generate testing setup and test scaffolding
2. AI — Generate test case templates
3. `security-review` — Validate security testing documentation

**Commands**:
```bash
/vitest
```

---

### Phase 8: Deployment

During Deployment, use `dev-tools:project-health` to verify documentation readiness and `cloudflare:wrangler` if the infrastructure is on Cloudflare.

**Skills to invoke**:
1. `cloudflare:wrangler` — If using Cloudflare for deployment
2. AI — Generate CI/CD pipeline templates
3. `dev-tools:project-health` — Verify documentation readiness before launch

---

### Phase 9: Operations

During Operations, use AI to generate runbook templates and SLA structures. All content requires human review before finalization.

**Skills to invoke**:
1. AI — Generate runbook templates
2. AI — SLA template generation
3. AI — Incident response playbook structure

---

### Phase 10: Monitoring

During Monitoring, use AI to suggest metric categories and generate alert rule templates. Threshold values and business KPIs require human input.

**Skills to invoke**:
1. AI — Alert rule design and template generation
2. AI — Dashboard specification templates
3. AI — Metric definition guidance by domain

---

### Phase 11: Feedback

During Feedback, invoke `dev-tools:brains-trust` to get an independent review of the lessons learned and retrospective output.

**Skills to invoke**:
1. `dev-tools:brains-trust` — Get second opinion on process and architectural lessons
2. AI — Retrospective template generation
3. AI — Lessons learned consolidation from provided inputs

---

## Integration with Claude Code Settings

This section shows how to configure Claude Code to make skill invocation more efficient for documentation work. Apply these settings to reduce manual skill invocation for common workflows.

### Configure Default Skills

In `.claude/settings.json`, you can configure skills that are pre-loaded for documentation work:

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

You can create shortcut commands for common documentation workflows:

```json
{
  "customCommands": {
    "/doc-phase": "Use phase-appropriate skills and validate deliverables",
    "/validate-docs": "Check documentation completeness and linking"
  }
}
```

---

## Agent Roles and Prompt Patterns

Each documentation task maps to a specific agent role. Use the matching role and prompt pattern when invoking AI assistance for documentation work.

### Discovery Agent
Helps identify contexts, actors, and system boundaries from a high-level description.

**When to use**: Early in Phase 1, when you have domain description but no structured documentation yet.

**Prompt**:
```
Use domain-driven-design skill to help me:
1. Identify bounded contexts in: [DOMAIN]
2. Define the ubiquitous language
3. List core entities and relationships
```

---

### Requirements Agent
Expands feature descriptions into detailed, traceable requirement documents.

**When to use**: During Phase 2, when expanding brief feature descriptions.

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
Generates system flows and process documentation in Mermaid format.

**When to use**: During Phase 3, when documenting system flows.

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
Creates comprehensive test plans and test case templates.

**When to use**: During Phase 7, when generating the test strategy and test plans.

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

## Example: Skill Chain for a Real Project

The following example shows a complete skill chain for an e-commerce platform documentation project. Use this as a reference for structuring skill invocation across phases.

### Phase 1: Discovery
```bash
# Identify bounded contexts for the e-commerce domain
/domain-driven-design

# Expected output:
# - Catalog Bounded Context
# - Order Bounded Context
# - Payment Bounded Context
```

### Phase 2: Requirements
```bash
# Expand features into requirements:
# Input: "Users should be able to add items to cart"
# Output: Full functional requirement with flows, acceptance criteria, dependencies
```

### Phase 3: Design
```bash
# Validate UI patterns against design review
/frontend:design-review

# Generate system flows
# AI: "Generate system flow for checkout process in Mermaid format"
```

### Phase 6: Development
```bash
# Validate architecture against design principles
/code-craftsmanship:software-design-philosophy

# Generate API specification:
# Input: "Design payment API"
# Output: OpenAPI specification with request/response examples
```

### Phase 8: Deployment
```bash
# If using Cloudflare Workers
/cloudflare:wrangler

# Or generate CI/CD pipeline with AI assistance
```

---

## Troubleshooting Skill Usage

These are the most common issues when working with skills and their solutions. Match your problem and apply the solution before re-invoking.

**Q: Skill output doesn't fit the project's domain**
- Refine the prompt with more domain-specific context
- Use multiple prompts to narrow the scope before invoking the skill
- Provide examples from the existing documentation as calibration

**Q: AI generated incorrect or outdated information**
- Provide corrective feedback and iterate
- Always have domain experts review technical output
- Document corrections in the generation history for future runs

**Q: Skill is not available in this environment**
- Check `.claude/settings.json` for plugin configuration
- Some skills require OAuth authentication — check the skill documentation
- Ensure Claude Code is up to date

---

## Advanced: Creating Custom Skills

You can create custom skills for project-specific documentation workflows. The following example creates a documentation validation skill.

```bash
/update-config

# Add to settings.json:
# "customSkills": {
#   "validate-docs": "Check phase completeness and cross-reference integrity"
# }
```

---

**Next**: EXAMPLE-IMPLEMENTATION.md — See a complete worked example
