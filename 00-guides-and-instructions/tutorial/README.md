[← Index](../README.md) | [Next >](./_step-template.md)

---

# Tutorial: Interactive Step-by-Step

**What This Is**: A guided, hands-on tutorial that walks you through the complete SDLC documentation workflow — one phase at a time — with exercises, AI prompts, and validation checklists.

**How to Use**: Follow each step file in order. Each step guides you through a specific SDLC phase with clear instructions, copy-paste AI prompts, and a done-check to validate your work before moving on.

**Why It Matters**: Provides experiential learning beyond conceptual guides. You practice the workflow by applying it to your own project, building muscle memory for DDD + Hexagonal documentation as you go.

**When to Use**: When onboarding to this framework, when starting a new documentation project and wanting guided practice, or when refreshing your workflow knowledge through active repetition.

**Owner**: DDD + Hexagonal AI Template contributors.

---

## Who Is This For

- **New contributors** getting familiar with the documentation system
- **AI agents** following structured execution steps
- **Teams** running a documentation workshop or training session
- **Individuals** wanting hands-on practice rather than just reading

No prior DDD experience is required. Each step is self-contained.

---

## What You Need

Before starting, ensure you have:

- Access to the `01-templates/` folder structure
- The guides in `00-guides-and-instructions/`:
  - [`AI-WORKFLOW-GUIDE.md`](../AI-WORKFLOW-GUIDE.md) — your execution reference
  - [`INSTRUCTIONS-FOR-AI.md`](../INSTRUCTIONS-FOR-AI.md) — prompts for each phase
  - [`SKILLS-AND-PLUGINS-GUIDE.md`](../SKILLS-AND-PLUGINS-GUIDE.md) — validation skills per phase
- A project in mind (it can be any domain — the tutorial is project-agnostic)
- A desire to learn by doing

---

## How This Tutorial Works

Each step file follows a consistent structure:

1. **Goal** — what you produce in this phase
2. **Prerequisites** — what must be done before starting
3. **Instructions** — actionable tasks to complete the phase
4. **AI Prompt** — a copy-paste ready prompt from `INSTRUCTIONS-FOR-AI.md`
5. **Done Check** — a checklist to validate your output before proceeding
6. **Next Step** — link to the following step file

> **Important**: Phases 0–5 are **technology agnostic**. Do not mention databases, frameworks, languages, or protocols in these phases. Phases 6–11 are **technology specific** — name your actual stack.

---

## Phase Navigation

| Step | Phase | Topic | Agnostic? |
|------|-------|-------|-----------|
| [step-00](./step-00-documentation-planning.md) | 0 | Documentation Planning | G |
| [step-01](./step-01-discovery.md) | 1 | Discovery | D |
| [step-02](./step-02-requirements.md) | 2 | Requirements | R |
| [step-03](./step-03-design.md) | 3 | Design | S |
| [step-04](./step-04-data-model.md) | 4 | Data Model | M |
| [step-05](./step-05-planning.md) | 5 | Planning | P |
| [step-06](./step-06-development.md) | 6 | Development | V |
| [step-07](./step-07-testing.md) | 7 | Testing | T |
| [step-08](./step-08-deployment.md) | 8 | Deployment | B |
| [step-09](./step-09-operations.md) | 9 | Operations | O |
| [step-10](./step-10-monitoring.md) | 10 | Monitoring | N |
| [step-11](./step-11-feedback.md) | 11 | Feedback | F |

**"Agnostic?"** column: D/R/S/M/P = phases 1–5 (technology agnostic). V/T/B/O/N/F = phases 6–11 (technology specific).

---

## Reference Materials

| Material | Location | Purpose |
|----------|----------|---------|
| Step template | [`_step-template.md`](./_step-template.md) | Structure used by all step files |
| AI Prompts Appendix | [`AI-PROMPTS-APPENDIX.md`](./AI-PROMPTS-APPENDIX.md) | Consolidated prompts for all 12 phases |
| Validation Checklist | [`VALIDATION-CHECKLIST.md`](./VALIDATION-CHECKLIST.md) | Master validation criteria |
| AI Workflow Guide | [`../AI-WORKFLOW-GUIDE.md`](../AI-WORKFLOW-GUIDE.md) | Phase-by-phase execution guide |
| Instructions for AI | [`../INSTRUCTIONS-FOR-AI.md`](../INSTRUCTIONS-FOR-AI.md) | Phase-specific generation prompts |
| Full-Cycle Tutorial | [`../TUTORIAL-FULL-CYCLE.md`](../TUTORIAL-FULL-CYCLE.md) | Complete worked example (URL Shortener) |

---

## Start Here

Begin with [step-00: Documentation Planning](./step-00-documentation-planning.md) to set up the planning foundation for your project.

If you already have a project with documented discovery or requirements, you may start at the appropriate phase. Use the navigation table above to find your entry point.

[← Index](../README.md) | [Next >](./_step-template.md)