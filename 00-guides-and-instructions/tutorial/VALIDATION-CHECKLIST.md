[← Tutorial README](./README.md)

---

# Validation Checklist

**What This Is**: A master checklist for verifying completed documentation across all 12 SDLC phases. Use this after completing each phase to ensure output is complete, consistent, and correct.

**How to Use**: Run through the applicable phase checklist before advancing. For phases 1–5, also run the agnostic boundary check. For phases 6–11, verify technology specificity and linkage to prior phases.

**Why It Matters**: Validation prevents defects from propagating downstream. A missing link or violated boundary discovered early costs minutes to fix; discovered in review costs hours.

**Owner**: AI Agent + Tech Lead / Product Manager.

---

## Contents

1. [Phase 0: Documentation Planning](#phase-0-documentation-planning)
2. [Phase 1: Discovery](#phase-1-discovery)
3. [Phase 2: Requirements](#phase-2-requirements)
4. [Phase 3: Design](#phase-3-design)
5. [Phase 4: Data Model](#phase-4-data-model)
6. [Phase 5: Planning](#phase-5-planning)
7. [Phase 6: Development](#phase-6-development)
8. [Phase 7: Testing](#phase-7-testing)
9. [Phase 8: Deployment](#phase-8-deployment)
10. [Phase 9: Operations](#phase-9-operations)
11. [Phase 10: Monitoring](#phase-10-monitoring)
12. [Phase 11: Feedback](#phase-11-feedback)
13. [Global Checks (All Phases)](#global-checks-all-phases)

---

## Phase 0: Documentation Planning

**Focus**: Project foundation and structure setup.

- [ ] `sdlc-framework.md` has all 12 phases with project-specific durations and deliverables
- [ ] `macro-plan.md` has Phase 0 marked complete with target start date for Phase 1
- [ ] `navigation-conventions.md` has concrete naming rules (not just "use kebab-case" — give examples)
- [ ] `PHASE-INPUT.md` references all 12 phases with required inputs per phase
- [ ] Tech Lead and Product Manager have signed off
- [ ] Phase 0 status is tracked in macro-plan

---

## Phase 1: Discovery

**Focus**: Problem understanding, user identification, strategic context.

- [ ] `context-motivation.md` has all 7 sections (Problem, Market, Strategic Motivation, Stakeholders, Risks, Opportunities, Assumptions)
- [ ] `system-vision.md` has vision, explicit limits ("what it is NOT"), guiding principles, and measurable success metrics
- [ ] `actors.md` lists 4–7 actors with roles, incentives, and constraints
- [ ] `needs-expectations.md` documents needs per actor with must-have vs. nice-to-have distinction
- [ ] **Agnostic boundary**: No technology names appear in any Discovery document (no databases, frameworks, languages, APIs, or protocols)
- [ ] Every stakeholder from context-motivation has a corresponding entry in actors
- [ ] Tech Lead and Product Manager have reviewed and signed off

---

## Phase 2: Requirements

**Focus**: Traceable, verifiable functional and non-functional requirements.

- [ ] `glossary.md` has 30–50 domain terms with definition, context, synonyms, related terms, and example per term
- [ ] Every term is defined without using other undefined terms (circularity check)
- [ ] Each functional requirement (`fr-*.md`) traces to a Discovery actor or need
- [ ] Each non-functional requirement (`rnf-*.md`) has quantified criteria (e.g., "<500ms", "99.9% uptime")
- [ ] Acceptance criteria are in Gherkin format (Given/When/Then)
- [ ] `priority-matrix.md` applies MoSCoW correctly; MVP is clearly defined
- [ ] `scope-boundaries.md` explicitly lists in-scope and out-of-scope items with rationale
- [ ] **Agnostic boundary**: No technology names in any Requirements document
- [ ] No functional requirement exists without a trace to a Discovery need
- [ ] Tech Lead and Product Manager have reviewed and signed off

---

## Phase 3: Design

**Focus**: Domain structure, bounded contexts, system flows.

- [ ] `strategic-design.md` has all 5 sections (Domain Vision, Subdomain Classification, Bounded Contexts, Ubiquitous Language, Aggregate Locations)
- [ ] Bounded contexts are classified: Core / Supporting / Generic with justification
- [ ] Ubiquitous language per context is distinct — no shared terms used without explicit definition
- [ ] At least one Mermaid context map diagram is present and readable
- [ ] `system-flows.md` has 5–10 flows, each with: name, actors, steps, decisions, successful exit, alternatives
- [ ] Each system flow traces to at least one functional requirement from Phase 2
- [ ] Each bounded context has a model file with: aggregates, invariants, domain events, interfaces
- [ ] **Agnostic boundary**: No technology names in any Design document
- [ ] Tech Lead and Domain Expert have reviewed and signed off

---

## Phase 4: Data Model

**Focus**: Information structure, entities, relationships.

- [ ] `entities.md` lists all entities with: name, description, attributes (type, required/optional, constraints), invariants
- [ ] Aggregate roots are marked explicitly
- [ ] Each entity traces to a bounded context from Phase 3
- [ ] `relationships.md` has ERD diagram in Mermaid
- [ ] Every relationship has cardinality (1:1, 1:N, N:N) and rationale
- [ ] Every relationship supports at least one system flow from Phase 3
- [ ] **Agnostic boundary**: No database-specific terms (use domain vocabulary: "unique identifier", not "UUID/SERIAL"; "text", not "VARCHAR")
- [ ] No entity exists without a trace to a domain concept
- [ ] Tech Lead and Data Architect have reviewed and signed off

---

## Phase 5: Planning

**Focus**: Delivery roadmap, epics, milestones, versioning.

- [ ] `roadmap.md` has 3+ delivery phases with: name, duration, included epics, expected result, dependencies
- [ ] MVP is the first milestone with testable acceptance criteria
- [ ] `epics.md` groups all functional requirements into epics
- [ ] Each epic has: name, description, included FR list, priority, story point estimation
- [ ] `milestones.md` has: name, target date, acceptance criteria, included epics
- [ ] `versioning-strategy.md` defines semantic versioning (major.minor.patch) with increment rules
- [ ] **Agnostic boundary**: No technology names in Planning documents
- [ ] Phase 5 chain validated: every FR → Epic → Milestone → Roadmap Phase
- [ ] MVP milestone covers all MoSCoW "Must" requirements from Phase 2
- [ ] Product Manager and Tech Lead have reviewed and signed off

---

## Phase 6: Development

**Focus**: Technical architecture, API design, coding standards.

- [ ] `architecture.md` has hexagonal/layered diagram with module-to-context mapping
- [ ] All bounded contexts from Phase 3 are represented in the module structure
- [ ] `api-reference.md` has all endpoints documented with: method, route, parameters, response codes, errors, examples
- [ ] `coding-standards.md` covers: naming conventions per layer, SOLID principles, anti-patterns, testing expectations
- [ ] At least 3 ADRs documented with: Context, Decision, Consequences, Alternatives considered
- [ ] `workflow/` has: branch strategy, commit conventions, PR rules, CI/CD integration
- [ ] Each ADR traces to a specific design decision from Phase 3
- [ ] Architecture reflects domain model from Phase 3 (not a generic template)
- [ ] Tech Lead and Architecture have reviewed and signed off

---

## Phase 7: Testing

**Focus**: Test strategy, coverage targets, test plans.

- [ ] `test-strategy.md` defines the testing pyramid with proportions and rationale
- [ ] Coverage targets are quantified (e.g., 80% line coverage for unit tests)
- [ ] Tools and frameworks match the technology stack from Phase 6
- [ ] `test-plan.md` has at least one test case per functional requirement
- [ ] MVP requirements are covered by P0 (mandatory) tests
- [ ] Each test case traces to an FR from Phase 2
- [ ] Quality gates are explicit (what must pass before merge)
- [ ] QA Lead has reviewed and signed off

---

## Phase 8: Deployment

**Focus**: CI/CD pipeline, environments, release procedures, rollback.

- [ ] `ci-cd-pipeline.md` has all stages with: jobs, gates, triggers, artifacts
- [ ] Pipeline versioning aligns with Phase 5 `versioning-strategy.md`
- [ ] `environments.md` defines dev, staging, prod with: purpose, access control, configuration differences
- [ ] `release-process.md` has a step-by-step checklist with approvers defined per step
- [ ] `rollback-procedures.md` defines: trigger criteria, step-by-step rollback per environment, communication protocol
- [ ] Migration scripts are documented for database changes
- [ ] DevOps Lead has reviewed and signed off

---

## Phase 9: Operations

**Focus**: Runbooks, incident response, SLAs, on-call.

- [ ] At least 5 runbooks exist with: trigger, prerequisites, numbered steps, expected outcome, troubleshooting, escalation criteria
- [ ] `incident-response.md` defines SEV1–SEV4 with response time targets and escalation paths
- [ ] `sla.md` has quantified targets for uptime, response time, and error rate
- [ ] `on-call.md` has: rotation schedule, primary/secondary contacts, handoff procedure
- [ ] Post-mortem requirements are defined (when required, SLA for delivery)
- [ ] SRE/DevOps Lead has reviewed and signed off

---

## Phase 10: Monitoring

**Focus**: Metrics, alerts, dashboards.

- [ ] `metrics.md` has SLI/SLO definitions with error budgets per target
- [ ] Key metrics defined per category: System Health, Application, Business
- [ ] `alerts.md` has alert rules with: condition, duration, severity, who is notified, response action
- [ ] Alert thresholds are set to fire before SLOs are breached
- [ ] `dashboards.md` defines layouts for: system health, application, SLO (error budget burn rate)
- [ ] SLI/SLO targets are aligned with Phase 9 SLA document
- [ ] SRE/Platform Lead has reviewed and signed off

---

## Phase 11: Feedback

**Focus**: Retrospectives, user feedback, lessons learned.

- [ ] Retrospective covers all phases (0–10) with: what worked, what didn't, action items (owner + date)
- [ ] DDD maturity is scored (1–5) with justification per bounded context
- [ ] User feedback is collected from multiple channels (NPS, surveys, bug reports, feature requests)
- [ ] Feedback-to-roadmap linkage: key feedback items are translated into next planning changes
- [ ] Lessons learned are specific and actionable (not generic)
- [ ] `documentation-update-log.md` tracks what changed in documentation and why
- [ ] Product Manager and Engineering Lead have reviewed and signed off

---

## Global Checks (All Phases)

Apply these checks to every phase document.

### Navigation

- [ ] Every document has navigation links (back to index, previous/next where applicable)
- [ ] All internal links are valid and point to existing files
- [ ] All external links (to other phases, guides) are valid

### Structure

- [ ] Every document has: title (H1), metadata block (What/How/Why/When/Owner), contents section
- [ ] Every H2 section starts with "What This Section Is" intro
- [ ] Every template/table has an explanatory paragraph before it
- [ ] Every example has a "What This Example Demonstrates" context intro
- [ ] Completion checklist uses directive verbs ("Define", "Document", not "Defined", "Documented")
- [ ] Sign-off section is present with: Prepared by, Reviewed by, Approved by

### Consistency

- [ ] Terminology is consistent with the glossary from Phase 2
- [ ] No term is used without being defined (or linked to glossary)
- [ ] No cross-phase contradiction exists (verify: Discovery → Requirements → Design)
- [ ] Source hierarchy respected: later phases do not contradict earlier phases

### Agnostic Boundary (Phases 0–5 only)

- [ ] No technology names (databases, frameworks, languages, protocols, APIs)
- [ ] No implementation details — only business behavior and domain concepts
- [ ] Can be understood by a non-technical stakeholder
- [ ] Describes "what" and "why" — never "how"

### Technology Specificity (Phases 6–11)

- [ ] Technology stack is named explicitly (frameworks, languages, tools)
- [ ] Architecture decisions are justified against requirements and design
- [ ] Every major decision has an ADR (Architecture Decision Record)
- [ ] Implementation choices trace to Phase 3 bounded contexts

---

[← Tutorial README](./README.md)