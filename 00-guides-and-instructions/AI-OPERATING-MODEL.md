[← Index](./README.md)

---

# AI Operating Model

This document defines how human collaborators and AI agents work together in this template. It establishes decision rights, boundaries, execution modes, and validation expectations so AI assistance remains useful, traceable, and human-governed.

## Contents

1. Purpose
2. Collaboration Model
3. Decision Rights
4. AI Execution Modes
5. Context Loading Strategy
6. Quality Gates
7. Escalation Rules
8. Anti-Patterns
9. Operating Checklist

---

## 1. Purpose

The purpose of this operating model is to prevent AI-generated documentation from becoming generic, incoherent, or disconnected from real project decisions.

AI can accelerate documentation and architecture work, but it must operate inside explicit constraints:

- Humans own intent, priorities, and architectural decisions.
- AI assists with generation, analysis, consistency, and validation.
- All non-trivial AI output must be reviewable and traceable.
- The repository remains the single source of truth.

---

## 2. Collaboration Model

This template uses a human-guided AI workflow.

| Actor | Responsibility |
|-------|----------------|
| Human collaborator | Defines goals, constraints, project reality, priorities, and final decisions |
| AI agent | Structures information, generates drafts, identifies gaps, validates consistency, and proposes improvements |
| Repository | Stores durable decisions, templates, prompts, checklists, and project documentation |

The AI agent may propose changes, but should not silently change the architecture, scope, or domain model without making the decision explicit.

---

## 3. Decision Rights

### Human-Owned Decisions

Only a human collaborator can approve:

- Product vision and business priorities
- Domain boundaries and bounded contexts
- Architectural style and major trade-offs
- Technology stack decisions
- Security and compliance posture
- Production readiness decisions
- Scope changes
- Terminology changes that affect ubiquitous language

### AI-Assisted Decisions

AI may propose:

- Candidate bounded contexts
- Candidate aggregates and entities
- Candidate ports and adapters
- Documentation structure improvements
- Missing traceability links
- Risk lists and validation checklists
- ADR drafts for human review

### AI-Executable Work

AI may execute:

- Markdown restructuring
- Template completion drafts
- Cross-reference updates
- Checklist generation
- Prompt generation
- Consistency reviews
- Gap analysis

---

## 4. AI Execution Modes

### Guided Mode

Use when a human collaborator is actively participating.

Expected behavior:

1. Understand the requested outcome.
2. Inspect existing documentation.
3. Propose a concise plan for non-trivial work.
4. Execute in small, reviewable increments.
5. Report what changed and what remains open.

### Autonomous Mode

Use when the AI must continue without immediate human input.

Expected behavior:

1. Load relevant context from the repository.
2. State assumptions in the output document or completion report.
3. Avoid irreversible architectural decisions.
4. Prefer lightweight placeholders over invented facts.
5. Produce a handoff summary for human review.

Reference: [`AI-AUTONOMOUS-WORKFLOW.md`](./AI-AUTONOMOUS-WORKFLOW.md).

### Review Mode

Use when validating existing documentation.

Expected behavior:

1. Identify the phase and target artifact.
2. Validate against phase discipline and traceability rules.
3. Separate defects from suggestions.
4. Provide actionable corrections.
5. Avoid rewriting content unless requested.

---

## 5. Context Loading Strategy

Before generating or modifying documentation, load context in this order:

1. `README.md` — repository purpose and global structure.
2. `AGENTS.md` — canonical agent rules.
3. `CLAUDE.md` — Claude Code-specific guidance, when applicable.
4. `00-guides-and-instructions/README.md` — guide index and execution paths.
5. The target phase README.
6. Existing documents in the target phase.
7. Upstream phase documents required for traceability.
8. Relevant `data-input/` materials.

Do not load every document blindly. Load only what is required to preserve context and avoid generic output.

---

## 6. Quality Gates

AI-generated changes are not complete until they pass these gates:

| Gate | Validation Question |
|------|---------------------|
| Purpose | Does the output solve the requested problem? |
| Phase discipline | Does it respect agnostic vs. technology-specific boundaries? |
| Traceability | Can each major statement be traced to upstream context or a stated assumption? |
| Specificity | Is it project-specific rather than generic? |
| Architecture integrity | Does it preserve DDD and hexagonal constraints? |
| Navigation | Are links and indexes updated? |
| Human review | Are assumptions, risks, and pending decisions visible? |

---

## 7. Escalation Rules

Stop and request human input when:

- A new business rule must be invented.
- A bounded context boundary is ambiguous.
- Two documents contradict each other.
- A security or compliance decision is required.
- A technology choice affects architecture, cost, or operations.
- A requirement cannot be traced to discovery or stakeholder input.

If the task must continue, record the uncertainty explicitly as an assumption or open question.

---

## 8. Anti-Patterns

Avoid these behaviors:

1. Generating all SDLC phases in one pass.
2. Introducing framework names in phases 1-5.
3. Treating use cases, requirements, and architecture decisions as the same artifact.
4. Creating polished documentation with unvalidated assumptions.
5. Hiding uncertainty behind confident wording.
6. Rewriting canonical terms without updating the glossary.
7. Adding prompts that are not copy-paste executable.
8. Modifying structure without updating indexes and navigation links.

---

## 9. Operating Checklist

Before starting:

- [ ] Identify the target phase and artifact.
- [ ] Load the minimum required context.
- [ ] Check `AGENTS.md` for repository rules.
- [ ] Identify required upstream inputs.
- [ ] Clarify whether the task is generation, review, refactor, or validation.

Before finishing:

- [ ] Validate phase discipline.
- [ ] Check traceability.
- [ ] Update links and indexes.
- [ ] List assumptions and pending decisions.
- [ ] Summarize changed files.

---

[← Index](./README.md)
