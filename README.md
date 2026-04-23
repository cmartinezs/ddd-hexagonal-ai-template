# DDD Hexagonal AI Template

A comprehensive documentation framework for Domain-Driven Design (DDD) projects using hexagonal architecture, designed to be AI-assisted and human-completable.

## Overview

This template provides a structured SDLC (Software Development Lifecycle) documentation system organized in 12 phases, from discovery through feedback. Each phase has a clear purpose, deliverables, and placeholders for project-specific content.

## ✨ Key Features

- **12-Phase SDLC Framework**: Discovery → Development → Operations → Feedback
- **Technology-Agnostic**: Describes "what" before "how" (phases 1-5)
- **AI-Ready**: Built for collaboration with AI agents (Claude, ChatGPT, etc.)
- **Iterable**: Each feature/domain progresses at its own pace
- **Traceable**: Requirements → Design → Code → Tests → Metrics
- **Living Documentation**: Stays in sync with code and decisions

## 📖 Guides Included

| Guide | Duration | Purpose |
|-------|----------|---------|
| **TEMPLATE-USAGE-GUIDE.md** | 20 min | How to complete each section manually |
| **AI-WORKFLOW-GUIDE.md** | 30 min | Day-by-day workflow with AI (10-15 days) |
| **EXAMPLE-IMPLEMENTATION.md** | 20 min | Real case study: Keygo (complete walkthrough) |
| **INSTRUCTIONS-FOR-AI.md** | 20 min | Ready-to-use prompts by phase |
| **SKILLS-AND-PLUGINS-GUIDE.md** | 20 min | Claude Code skills per phase |
| **TEMPLATE-ARCHITECTURE.md** | 15 min | How the template is designed |
| **FAQ.md** | 10 min | Common questions & troubleshooting |

## Directory Structure

### Template Framework (Read-Only Guides)
```
00-guides-and-instructions/     # How to use this template
├── README.md
├── TEMPLATE-ARCHITECTURE.md     # Why each folder exists
├── TEMPLATE-USAGE-GUIDE.md      # How to complete each section
├── AI-WORKFLOW-GUIDE.md         # Using AI for documentation
├── EXAMPLE-IMPLEMENTATION.md    # Complete worked example
├── SKILLS-AND-PLUGINS-GUIDE.md  # Claude Code integration
└── FAQ.md

01-templates/00-documentation-planning/  # Framework setup
├── sdlc-framework.md                    # Customized for your project
├── macro-plan.md                        # Progress tracking
└── navigation-conventions.md             # Documentation rules
```

### Your Project Documentation
```
01-templates/data-input/        # External materials
├── external-specs/             # Reference documentation
├── user-research/              # Interviews, surveys
├── competitor-analysis/        # Market research
├── previous-projects/          # Reference implementations
├── standards/                  # Industry standards
└── raw-materials/              # Unstructured input

01-templates/data-output/       # PRODUCTION DOCUMENTATION
├── 00-documentation-planning/  # Your SDLC and conventions
├── 01-discovery/               # Your business context
├── 02-requirements/            # Your requirements
├── 03-design/                  # Your designs
├── 04-data-model/              # Your data structure
├── 05-planning/                # Your roadmap
├── 06-development/             # Your architecture
├── 07-testing/                 # Your test strategy
├── 08-deployment/              # Your CI/CD
├── 09-operations/              # Your runbooks
├── 10-monitoring/              # Your metrics
└── 11-feedback/                # Your retrospectives
```

## Quick Start

1. **Read first**: Open `START-HERE.txt` (this folder) for 5-minute overview
2. **Understand**: Read `README.md` (this file)
3. **Choose your path**:
   - **With AI** (10-15 days): Follow `00-guides-and-instructions/AI-WORKFLOW-GUIDE.md`
   - **Manual** (3-4 weeks): Follow `00-guides-and-instructions/TEMPLATE-USAGE-GUIDE.md`
4. **Set up**: Follow `SETUP-CHECKLIST.md` to customize for your project
5. **Begin documenting**: Start with `01-templates/01-discovery/`

### 3. Start Documenting
- Begin with `01-templates/data-output/00-documentation-planning/` — Customize framework
- Move to `01-templates/data-output/01-discovery/` — Understand your problem
- Follow the phase progression through `01-templates/data-output/11-feedback/`

### 4. Use Data Flow
```
01-templates/data-input/       01-templates/data-output/
(External materials)           (Your production docs)
    ↓                              ↑
  Research          Generate/Write using templates
  Specifications    Review/Customize
  User feedback     Remove template text
  Competitor data   Add real project content
    ↓                              ↑
  ├─→ Extract insights ←──────────┤
  └─→ Inform decisions ←──────────┘
```

## Key Principles

- **Single Source of Truth**: All documentation lives here; submódules link to this repo
- **Phase-Oriented**: Each phase has a clear purpose and deliverables
- **AI-Assisted**: Templates include placeholders and sections designed for AI co-creation
- **Human-Completable**: All templates can be completed manually with clear instructions
- **DDD-First**: Domain language and bounded contexts guide the architecture
- **Hexagonal Focus**: Clear separation of domain, ports, and adapters

## Macro Plan

Track progress across all phases in `01-templates/00-documentation-planning/macro-plan.md`:
- Current phase status
- Blockers and dependencies
- Next steps for each sprint

## ⚡ Claude Code Skills Integration

Validate your work with Claude Code skills:

| Phase | Skill | Command |
|-------|-------|---------|
| Design | domain-driven-design | `/domain-driven-design` |
| Code | clean-code | `/code-craftsmanship:clean-code` |
| Security | security-review | `/security-review` |
| Tests | testing | `/dev-tools:vitest` |
| Deploy | git workflow | `/dev-tools:git-workflow` |
| Health | project health | `/dev-tools:project-health` |

## 📊 Results

After 10-15 days:
- ~30,000 words of documentation
- 12 interconnected phases
- Clear traceability from requirement to metric
- Living documentation framework
- Ready for architecture, development, and operations

## 🤝 Who This Is For

- Teams starting a new product
- Teams with scattered documentation
- Teams wanting AI-assisted documentation
- Teams practicing Domain-Driven Design
- Teams learning Hexagonal Architecture

## Standards

- **Language**: English (unless otherwise specified)
- **Phase Discipline**: No implementation details (code, frameworks) in Discovery/Requirements
- **Data Input**: External materials stay in `01-templates/data-input/`, organized and referenced
- **Data Output**: Production documentation goes in `01-templates/data-output/` without TEMPLATE- prefix
- **Templates**: Reference guides in `00-guides-and-instructions/`, use to complete `01-templates/data-output/`
- **No Template Text**: Remove all instruction text before committing to `01-templates/data-output/`
- **Real Content Only**: `01-templates/data-output/` contains only actual project documentation

## Diagram Convention

All diagrams in this repository follow this precedence:

1. **Mermaid** (preferred): Use for all diagrams where supported
   ```mermaid
   graph TD
       A --> B
   ```

2. **PlantUML**: Use only if diagram type is not expressible in Mermaid
   ```plantuml
   @startuml
   A --> B
   @enduml
   ```

3. **ASCII**: Use only when neither Mermaid nor PlantUML is viable
   ```
   A --> B
   ```

No embedded images or external diagram tools as primary source.

## Repository Governance

- **License**: MIT (see `LICENSE`)
- **Code of Conduct**: Community standards in `CODE_OF_CONDUCT.md`
- **Contributing**: How to contribute in `CONTRIBUTING.md`
- **Security**: Vulnerability reporting in `SECURITY.md`
- **AI Agents**: Agent instructions in `AGENTS.md`

---

**Based on**: DDD framework by Eric Evans + Hexagonal Architecture by Alistair Cockburn + Keygo SDLC (2026)  
**Last Updated**: 2026-04-22  
**Template Version**: 1.0
