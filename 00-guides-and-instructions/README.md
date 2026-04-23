[← HOME](../README.md)

---

# Guides and Instructions

Control center for understanding and using the DDD + Hexagonal template.

---

## 📚 Documentation

### Getting Started

1. **[TEMPLATE-USAGE-GUIDE.md](./TEMPLATE-USAGE-GUIDE.md)** — Complete step-by-step
   - Preparation (15 min)
   - Adaptation (20 min)
   - Generation (2-3 days)
   - Validation
   - Keeping documentation alive

2. **[INSTRUCTIONS-FOR-AI.md](./INSTRUCTIONS-FOR-AI.md)** — Quick reference: principles and structure
   - General principles
   - Prompt structure
   - Prompts by phase (discovery, requirements, design, etc.)
   - Validation checklist
   - Troubleshooting

3. **[AI-WORKFLOW-GUIDE.md](./AI-WORKFLOW-GUIDE.md)** ⭐ **← START HERE if you work with AI**
   - General step-by-step flow
   - Detailed preparation (Day 1)
   - Discovery with practical examples (Day 2-3)
   - Requirements with ready templates (Day 4-5)
   - Design with DDD patterns (Day 6-7)
   - Data Model, Planning, Development (Day 8-10+)
   - Integral validation
   - Advanced troubleshooting

### Examples and Reference

4. **[EXAMPLE-IMPLEMENTATION.md](./EXAMPLE-IMPLEMENTATION.md)** — Complete day-by-day example
   - Real case: Keygo documentation
   - What to do each day (Day 1-10)
   - Specific prompts and validation
   - Cross-phase coherence checklist

5. **[AI-AUTONOMOUS-WORKFLOW.md](./AI-AUTONOMOUS-WORKFLOW.md)** ⭐ **Autonomous execution mode**
   - Phase context requirements and input data structure
   - Autonomous execution rules
   - Context handoff protocol
   - For AI working without human in the loop

6. **[SKILLS-AND-PLUGINS-GUIDE.md](./SKILLS-AND-PLUGINS-GUIDE.md)** — Using Claude Code skills
   - Skills by phase (Discovery, Design, Development, Testing, Deployment, Ops, Monitoring)
   - Which skill to use when and for what
   - How to install/activate (MCP, OAuth)
   - Recommended workflow with skills
   - Pre-production checklist

### To Understand the Architecture

6. **[TEMPLATE-ARCHITECTURE.md](./TEMPLATE-ARCHITECTURE.md)** — How the template is designed
   - Philosophy (why 12 phases)
   - Principles (agnostic, iterable, alive)
   - Phase relationships
   - When to adapt/extend

### Help

7. **[FAQ.md](./FAQ.md)** — Frequently Asked Questions
   - "How long does it take to complete everything?"
   - "Can I skip phases?"
   - "How do I update documents when code changes?"
   - And more...

---

## 🚀 Quick Start (30 minutes)

**If you work with AI:**
1. Read this README (5 min)
2. Open [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) and start with "Preparation (Day 1)"
3. Follow the day-by-day flow
4. Check [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) for specific prompts

**If you work without AI:**
1. Read this README (5 min)
2. Open [`TEMPLATE-USAGE-GUIDE.md`](./TEMPLATE-USAGE-GUIDE.md) and complete "Step 1: Preparation"
3. Complete "Step 2: Structure Adaptation"
4. Document manually or use your own tools

---

## 📖 Document Index (by reading order)

| Order | Document | Duration | For Whom | Purpose |
|-------|----------|----------|----------|---------|
| 1 | [`TEMPLATE-USAGE-GUIDE.md`](./TEMPLATE-USAGE-GUIDE.md) | 20 min | Everyone | Understand complete process |
| 2 | [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) ⭐ | 30 min | **With AI** | Practical day-by-day flow |
| 3 | [`AI-AUTONOMOUS-WORKFLOW.md`](./AI-AUTONOMOUS-WORKFLOW.md) ⭐⭐ | 15 min | **Autonomous AI** | Self-execution with context handoff |
| 4 | [`EXAMPLE-IMPLEMENTATION.md`](./EXAMPLE-IMPLEMENTATION.md) | 20 min | **With AI** | Real case (Keygo) Day 1-10 |
| 5 | [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md) ⭐ | 20 min | **Everyone** | Skills by phase, how to use, setup |
| 6 | [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) | 20 min | Reference | Specific prompts by phase |
| 7 | [`TEMPLATE-ARCHITECTURE.md`](./TEMPLATE-ARCHITECTURE.md) | 15 min | Curious | Internal template design |
| 8 | [`FAQ.md`](./FAQ.md) | 10 min | Skeptical | Common problems |

---

## 🎯 Learning Paths

### "I want to generate documentation FAST with AI" ⭐

1. Open [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) — "General Flow" section
2. Prepare your product information (20 min)
3. Follow "Day 1: Preparation"
4. Then Day 2-3: Discovery, Day 4-5: Requirements, etc.
5. Check [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) if you need specific prompts
6. **Result**: Complete documentation in 10-15 days

### "I want to validate my work with Claude Code Skills" ⭐⭐

1. Read [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md) — "General: All useful skills"
2. Identify skill by phase (Design → `/domain-driven-design`, Code → `/code-craftsmanship:clean-code`, etc.)
3. Follow "Recommended Workflow by Day"
4. Run "Checklist: Before Production"
5. **Result**: Code and docs validated by experts

### "I want to see a real example step by step"

1. Read [`EXAMPLE-IMPLEMENTATION.md`](./EXAMPLE-IMPLEMENTATION.md)
2. Case: Generating docs for Keygo (real product)
3. Day 1: Prepare information
4. Day 2-3: Generate Discovery
5. Follow the pattern for remaining days
6. Adapt examples to your product

### "I have disorganized documentation and want to centralize it"

1. Read this folder to understand structure
2. Map your existing documentation to the 12 phases
3. Fill gaps with AI
4. Centralize in this structure

### "I want to understand if the DDD + Hexagonal approach is for me"

1. Read [`TEMPLATE-ARCHITECTURE.md`](./TEMPLATE-ARCHITECTURE.md)
2. Read `../01-templates/00-documentation-planning/sdlc-framework.md`
3. Decide whether to adapt or create your own structure

### "I have problems generating documentation with AI"

1. Go to [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) → "Troubleshooting"
2. Read the case that resembles yours
3. Or check [`AI-WORKFLOW-GUIDE.md`](./AI-WORKFLOW-GUIDE.md) → "Advanced Troubleshooting"
4. Adjust your prompt according to the suggested solution

---

## 🔑 Key Concepts

### 1. Agnostic vs. Specific

- **Phases 1-5** (Discovery → Planning): **Technology agnostic**
  - Describes "what", not "how"
  - No framework names, languages, DB
  - Focus on business and user

- **Phases 6-12** (Development → Feedback): **Specific to your stack**
  - Here you mention your technology
  - Real architecture, APIs, code
  - Technical focus

### 2. Iterative, not Waterfall

Each feature/domain can be in different phases simultaneously.

### 3. Traceability

Requirements traced from Discovery → Design → Development → Testing → Monitoring.

---

## ⚠️ Common Mistakes

1. **Skipping phases** — Tempting but causes incoherence
   - Solution: Make quick versions if in a hurry, but don't skip

2. **Mixing agnostic with specific in phases 1-5**
   - Solution: Use [`INSTRUCTIONS-FOR-AI.md`](./INSTRUCTIONS-FOR-AI.md) as checklist

3. **Not validating documents with skills**
   - Solution: Read [`SKILLS-AND-PLUGINS-GUIDE.md`](./SKILLS-AND-PLUGINS-GUIDE.md), use skill by phase

4. **Generating everything at once without validating**
   - Solution: Generate phase by phase, validate with corresponding skill, adjust

5. **Not providing enough context to AI**
   - Solution: See ["Provide context, don't ask it to invent"](./INSTRUCTIONS-FOR-AI.md#2-provide-context-dont-ask-it-to-invent)

---

[← HOME](../README.md)
