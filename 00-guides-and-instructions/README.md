[← HOME](../README.md)

---

# Guides and Instructions

You are an AI agent working within the DDD + Hexagonal AI Template framework. This folder is your operational reference: it contains all the guides, prompts, workflows, and knowledge you need to generate, validate, and manage SDLC documentation across 12 phases. Read this index before accessing any individual guide to locate the right resource for your current task.

---

## Documentation

This section lists every guide in this folder, organized by function. For each guide, the description specifies what it contains and when you should use it during a documentation project.

### Getting Started

These three guides form the core operational set. Read them in order if you are beginning a documentation project or resuming after context loss.

0. **[Archon CLI](../packages/archon-cli/README.md)** ⭐ **— Command-line tool for systematizing the template**
   - 17 commands: init, status, prompt, run, check, next, guide, tutorial, doctor, agent, config, upgrade, templates, dev
   - AI agent integration (opencode, Claude Code, Cursor, Gemini)
   - Phase enforcement, checksum validation, upgrade/migration
   - Global install: `npm install -g archon`

1. **[TEMPLATE-USAGE-GUIDE.md](./TEMPLATE-USAGE-GUIDE.md)** — Defines the required structure and content you must generate for each SDLC phase
   - Phase-by-phase file requirements
   - Format and section structure per document
   - Examples of completed documentation
   - Completion checklist per phase

2. **[INSTRUCTIONS-FOR-AI.md](./INSTRUCTIONS-FOR-AI.md)** — Your primary prompt reference for generating each phase
   - Mandatory authoring directives
   - Prompt structure and format
   - Phase-specific generation prompts
   - Validation checklist and troubleshooting

3. **[AI-WORKFLOW-GUIDE.md](./AI-WORKFLOW-GUIDE.md)** ⭐ **← Start here for phase-by-phase execution**
   - Your role and responsibilities per phase
   - What to generate vs. what to defer to your human collaborator
   - Recommended generation workflow per phase
   - Best practices for AI-human collaboration

4. **[tutorial/README.md](./tutorial/README.md)** ⭐ **Interactive step-by-step tutorial**
   - 12 step files (one per phase) with exercises, AI prompts, and done-checks
   - Guided practice applying the framework to your own project
   - Master validation checklist and consolidated AI prompts appendix
   - Start here for hands-on learning or team training workshops

### Reference

These guides provide supporting knowledge, extended context, and execution modes for specific scenarios. Use them when the core guides don't cover your current situation.

4. **[EXAMPLE-IMPLEMENTATION.md](./EXAMPLE-IMPLEMENTATION.md)** — Complete worked example of a documentation project
   - Real case: Keygo documentation project
   - Phase-by-phase execution (Days 1–10)
   - Specific prompts used and outputs generated
   - Cross-phase coherence checklist

5. **[TUTORIAL-FULL-CYCLE.md](./TUTORIAL-FULL-CYCLE.md)** ⭐ **Full-cycle example (URL Shortener)**
   - All 12 phases documented end-to-end for a real case
   - Domain vocabulary, bounded context, and design decisions explained
   - Links to actual output files in `01-templates/data-output/url-shortener/`
   - Reference for teams comparing their own documentation against a complete example

6. **[AI-AUTONOMOUS-WORKFLOW.md](./AI-AUTONOMOUS-WORKFLOW.md)** ⭐ **Autonomous execution mode**
   - Rules for operating without a human in the loop
   - Context validation protocol before each phase
   - Context handoff format between phases
   - Completion report structure

7. **[SKILLS-AND-PLUGINS-GUIDE.md](./SKILLS-AND-PLUGINS-GUIDE.md)** — Claude Code skills mapped to phases
   - Which skill to invoke at each phase and what it produces
   - Phase-by-phase recommended skill workflow
   - Pre-production validation checklist

8. **[AI-AGENT-READINESS-RECOMMENDATIONS.md](./AI-AGENT-READINESS-RECOMMENDATIONS.md)** ⭐⭐
   - Enterprise readiness requirements for AI agents
   - Prioritized implementation backlog
   - Mandatory authoring directive
   - Definition of Done per phase

### Architecture Reference

Use these guides when you need to understand the design rationale behind the framework or make structural decisions about how to adapt it.

9. **[TEMPLATE-ARCHITECTURE.md](./TEMPLATE-ARCHITECTURE.md)** — Framework design and phase rationale
   - Why 12 phases exist and how they connect
   - Key principles: agnostic, iterable, traceable, single source of truth
   - Phase dependencies and relationships
   - When and how to adapt the template

### Knowledge Base

Use this guide to handle edge cases, unexpected scenarios, and questions that arise during documentation work.

10. **[FAQ.md](./FAQ.md)** — Common scenarios and decision guidance
   - How to handle incomplete or skipped phases
   - How to maintain traceability when context is missing
   - When to deviate from standard structure
   - What to do when documentation contradicts reality

---

## Execution Paths

Choose the path that matches your current mode of operation. Each path specifies which guides to read and in what order before beginning work.

### "I need to track work and manage plannings"

Follow this path when managing active work, creating new plannings, or auditing completed ones.

1. Read [`planning/README.md`](../planning/README.md) — Check the Fundamental Rule and active plannings index
2. Read [`planning/GUIDE.md`](../planning/GUIDE.md) — Understand lifecycle (INITIAL → EXPANSION → DEEPENING → COMPLETED)
3. Read [`planning/WORKFLOWS/README.md`](../planning/WORKFLOWS/README.md) — Select the right workflow for your task
4. Create or update a planning entry before executing any documentation work

### "I need to execute a full documentation project with AI co-creation"

Follow this path when assisting a human collaborator through all phases of documentation from start to finish.

1. Read [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) — Understand your role per phase
2. Read [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) — Load phase-specific prompts
3. Execute each phase using prompts from `INSTRUCTIONS-FOR-AI.md`
4. Validate each phase using [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md)
5. Reference [`EXAMPLE-IMPLEMENTATION.md`](./EXAMPLE-IMPLEMENTATION.md) for pattern matching

### "I am operating autonomously without a human in the loop"

Follow this path when executing phases without real-time human feedback.

1. Read [`AI-AUTONOMOUS-WORKFLOW.md`](./AI-AUTONOMOUS-WORKFLOW.md) — Load autonomous execution rules
2. Validate context completeness before each phase (never assume prior context)
3. Generate the phase, then produce a structured completion report
4. Prepare context handoff input for the next phase

### "I need to validate documentation using Claude Code skills"

Follow this path when validating completed or in-progress documentation.

1. Read [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md) — Identify the skill for your current phase
2. Invoke the appropriate skill (e.g., `/domain-driven-design` for Design)
3. Apply skill output to refine and correct documentation

### "I need to generate one specific phase from scratch"

Follow this path when you have been given a single phase to produce.

1. Read the relevant phase section in [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md)
2. Verify that required inputs from previous phases exist; if not, request them
3. Use the provided prompt template populated with project-specific context
4. Validate output against the phase checklist before delivering

### "The documentation I generated is generic or incoherent"

Follow this path when output quality is insufficient and needs correction.

1. Go to [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) → "Troubleshooting" section
2. Match your problem to a known failure pattern and apply the solution
3. Or review [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) → "Best Practices" section
4. Re-generate with an improved, context-rich prompt

---

## Document Index

Use this table to find the right guide without reading all of them. The "When to Use" column specifies the exact situation that should trigger you to access each document.

| Priority | Document | When to Use |
|----------|----------|-------------|
| 0 | [`planning/README.md`](../planning/README.md) | Before any task — check the Fundamental Rule and active plannings |
| 0b | [`Archon CLI`](../packages/archon-cli/README.md) | When using the CLI tool — 17 commands for systematizing the template |
| 0c | [`Archon Examples`](../packages/archon-cli/examples/) | Quick start, full workflow, AI integration, troubleshooting |
| 1 | [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) | At the start of each phase; to understand your role and boundaries |
| 2 | [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) | When generating any phase document; your prompt reference |
| 3 | [`AI-AUTONOMOUS-WORKFLOW.md`](./AI-AUTONOMOUS-WORKFLOW.md) | When operating without a human in the loop |
| 3b | [`tutorial/README.md`](./tutorial/README.md) | When you want guided, hands-on practice through all 12 phases |
| 4 | [`TUTORIAL-FULL-CYCLE.md`](./TUTORIAL-FULL-CYCLE.md) | When you need a complete, filled-out reference for all 12 phases |
| 5 | [`EXAMPLE-IMPLEMENTATION.md`](./EXAMPLE-IMPLEMENTATION.md) | When you need a compact cross-phase reference (TaskFlow — all 12 phases) |
| 6 | [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md) | When validating phase output with Claude Code skills |
| 7 | [`AI-AGENT-READINESS-RECOMMENDATIONS.md`](./AI-AGENT-READINESS-RECOMMENDATIONS.md) | When operating in enterprise governance contexts |
| 8 | [`TEMPLATE-USAGE-GUIDE.md`](./TEMPLATE-USAGE-GUIDE.md) | When generating a phase document; format and structure reference |
| 9 | [`TEMPLATE-ARCHITECTURE.md`](./TEMPLATE-ARCHITECTURE.md) | When making structural decisions or adapting the framework |
| 10 | [`FAQ.md`](./FAQ.md) | When handling edge cases or unexpected scenarios |

---

## Key Concepts

These are the foundational principles that govern all decisions in this framework. Internalize them before executing any phase — they determine what you generate, how you generate it, and when to stop and request input.

### Agnostic vs. Specific Phases

The framework enforces a strict boundary between business-focused phases and technology-specific phases. This boundary is one of the most important rules you must enforce in your output.

- **Phases 1–5** (Discovery → Planning): Technology agnostic
  - Describe "what" and "why" — never "how"
  - Do not mention framework names, languages, databases, or protocols
  - Focus on business value, user needs, and domain logic

- **Phases 6–12** (Development → Feedback): Technology specific
  - Name the actual stack, frameworks, and tools used
  - Include real architecture, API designs, and coding standards
  - Reference specific technologies with explicit rationale

### Iterative Execution, Not Waterfall

Each feature or domain area can progress through phases independently. Do not treat documentation as a strict linear sequence in which all of phase N must be complete before phase N+1 begins.

### Traceability

Every artifact you generate must be traceable backward to its origin and forward to its consumers. Requirements trace from Discovery; Designs trace from Requirements; Development traces from Design. You are responsible for maintaining these links in every document you produce.

---

## Errors to Avoid

These are failure modes you must check for before and after generating any documentation. Review this list before starting each phase to prevent the most common problems.

1. **Skipping phases** — Each phase's output is the required input for the next. Skipping creates undetectable incoherence downstream. When time is constrained, produce a lightweight version rather than skipping entirely.

2. **Technology names in phases 1–5** — Never mention specific databases, frameworks, languages, or protocols in discovery, requirements, design, data model, or planning phases. If you detect "PostgreSQL", "React", or "REST API" in a phase 1–5 document, stop and abstract it.

3. **Not validating with skills** — After generating documentation, invoke the appropriate Claude Code skill for the current phase. Raw generated output without validation is considered incomplete.

4. **Batch-generating all phases without validation** — Generate one phase at a time, validate it against its checklist, then move to the next. Batch generation consistently produces generic, untraced output.

5. **Insufficient context in prompts** — Generic prompts produce generic output. Always include the project's problem statement, constraints, actors, and existing decisions as context before generating any phase document.

---

[← HOME](../README.md)
