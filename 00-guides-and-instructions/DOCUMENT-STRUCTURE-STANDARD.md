# DOCUMENT STRUCTURE STANDARD
## For AI-Directed Documentation in DDD + Hexagonal AI Template

**Version**: 1.0  
**Effective**: 2026-04-23  
**Applies To**: All templates, guides, phase READMEs  
**Audience**: AI agents (supervised by humans)  

---

## Quick Reference

Every file should follow this checklist:

- ✅ Navigation links (if sequential)
- ✅ Title (H1)
- ✅ Role context ("You are an AI agent...")
- ✅ Metadata block (What/How/Why/When/Owner)
- ✅ Diagram Convention (if applicable)
- ✅ Contents with anchors
- ✅ Sections with "What This Section Is" intro
- ✅ Templates/tables with explanatory paragraph before
- ✅ Examples with context intro
- ✅ Completion checklist with directive verbs
- ✅ Sign-off section
- ✅ Bottom navigation (if sequential)

See detailed templates below.

---

## FILE-LEVEL STRUCTURE

### Template: Standard File Structure

```markdown
[← Back] | [< Previous] | [Next >]          ← OPTIONAL: Navigation for sequential docs

---

# [Title: What is this document?]

You are [an AI agent | a human | a team] responsible for [specific task].

**What This Is**: [One-line definition of document purpose]
**How to Use**: [One-line instruction on how to apply this]
**Why It Matters**: [One-line business or process value]
**When to Use**: [Timing relative to other phases, or conditions for use]
**Owner**: [Role/team responsible for this content]

**Diagram Convention**: [If applicable] Mermaid → PlantUML → ASCII

---

## Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [✓ Optional Section](#optional-section)

---

## Section 1

**What This Section Is**: [One sentence explaining what AI will learn and why it matters]

[Explanatory paragraph or context before any template/table/example]

### Subsection 1.1

[Content]

### Subsection 1.2

[Content]

---

## Section 2

**What This Section Is**: [One sentence]

[Explanation]

### Example: [Specific Name]

**What This Example Demonstrates**: [2-3 bullet points of key learning]
- Learning point 1
- Learning point 2
- Learning point 3

[Filled example showing all points mentioned]

---

## Completion Checklist

**Before marking this [document/phase/section] complete:**

- [ ] **Define** [what must be done]
- [ ] **Document** [what must be captured]
- [ ] **Verify** [what must be validated]

### Sign-Off

- [ ] **Prepared by**: [Name], [Date]
- [ ] **Reviewed by**: [Name], [Date]
- [ ] **Approved by**: [Name], [Date]

---

[← Back] | [< Previous] | [Next >]          ← OPTIONAL: Navigation
```

---

## SECTION-LEVEL STRUCTURE

### Pattern: Every H2 Section

```markdown
## [Section Title]

**What This Section Is**: [One sentence explaining purpose]

[Explanatory paragraph or context]

### [Subsection Type A]

**When to Use This**: [When this subsection applies]

[Explanation of concept BEFORE showing template/table/example]

#### Template Block

```markdown
[Show template structure here]
```

---

### [Subsection Type B]

**When to Use This**: [Conditions for use]

[Explanation]

| [Field] | [Purpose] | [Guidance] |

---

### Example: [Specific Example]

**What This Example Demonstrates**:
- Learning point 1
- Learning point 2
- Learning point 3

[Filled example]

---
```

---

## METADATA FIELDS: REQUIRED FOR EVERY FILE

| Field | Purpose | Format | Example |
|-------|---------|--------|---------|
| **What This Is** | One-line definition | "A template for [what]" | "A template for defining system flows without technology" |
| **How to Use** | One-line instruction | "[Action] to [outcome]" | "Document each workflow to show system behavior" |
| **Why It Matters** | One-line value | "[Benefit] enables [outcome]" | "Clear flows enable consistent Design and Development" |
| **When to Use** | Timing/conditions | "After [phase], before [phase]" or "[Condition] applies" | "After Requirements (Phase 2), before Data Model (Phase 4)" |
| **Owner** | Responsible role(s) | "[Role] + [Role]" | "Architect + Domain Expert" |

### Example: Filled Metadata

```markdown
**What This Is**: A template for documenting system workflows without mentioning technology
**How to Use**: Create one flow per functional requirement, showing actors, happy path, exceptions, and data transformations
**Why It Matters**: Flows bridge Requirements and Design, making system behavior explicit before implementation
**When to Use**: After Requirements (Phase 2) is complete and approved
**Owner**: Architect + Product Manager
```

---

## TONE & VOICE GUIDELINES

### For AI Agents (Direct, Imperative)

✅ **DO**:
- Use imperative mood: "Define the requirement", "Document the flow", "Verify the design"
- Be prescriptive: "You must complete", "You should consider", "You need to ensure"
- Provide conditionals: "If [condition], then [action]"
- Ground decisions: "Because [reason]", "Given that [context]"

❌ **DON'T**:
- Use passive voice: "The requirement should be defined" ← bad
- Be vague: "Handle the case" ← bad
- Assume context: Don't skip explanations
- Over-comment: Be concise, not chatty

### Example: Section Intro

❌ **Bad**:
```
## Requirements

Requirements should be defined clearly. Use this template to document them.
```

✅ **Good**:
```
## Requirements

**What This Section Is**: Requirements translate business needs into specific, measurable capabilities the system must provide. You must define every requirement from Phase 1 (Discovery) with clear acceptance criteria.

**When to Use This**: After Discovery is complete. Create one requirement per business capability.

[Explanation paragraph]
```

---

## VISUAL MARKERS (STANDARDIZED)

Use only these markers, for the purposes shown:

| Marker | Meaning | Usage |
|--------|---------|-------|
| ✅ | "Do this" / "Included" / "Good" / "Correct" | Include lists, good examples, completed items |
| ❌ | "Don't do this" / "Excluded" / "Bad" / "Incorrect" | Exclude lists, bad examples, anti-patterns |
| 🎯 | "Key principle" / "North star" / "Core concept" | Strategic statements, core principles |
| ⚠️ | "Warning" / "Critical" / "Important note" | Risks, critical constraints, gotchas |
| 📋 | "Summary" / "Table" / "Structured data" | Data structures, lists, checklists |
| [← Back] | Navigation backward | At top/bottom of sequential files |
| [Next >] | Navigation forward | At top/bottom of sequential files |

### Usage Rule
- **Consistency**: Use same marker for same concept across all files
- **Not decorative**: Markers must add meaning, not just beautify
- **Sparingly**: One marker per concept, not multiple per sentence

---

## EXAMPLES: REQUIREMENTS FOR EVERY EXAMPLE

Every example in any document must have:

1. **Context intro** (1-2 sentences): "This example demonstrates X. Observe:"
2. **Learning points** (2-3 bullets): "Key points you should notice in this example"
3. **Filled content**: The actual example
4. **No explanation after**: Let the example speak for itself

### Template: Example

```markdown
### Example: [Specific Example Name]

**What This Example Demonstrates**:
- Learning point 1 (what's important about this example)
- Learning point 2 (what pattern you should replicate)
- Learning point 3 (what to avoid based on this example)

[Filled example content here]

---
```

### Bad Example ❌
```
### Example: User Registration

## [FR-001] User Registration

**Description**: User creates account...
```
❌ No intro explaining what to learn  
❌ AI doesn't know what's important  

### Good Example ✅
```
### Example: User Registration

**What This Example Demonstrates**:
- Clear preconditions that must be true before flow starts
- Step-by-step actor actions with system responses
- Multiple exception flows for validation and delivery failures

## [FR-001] User Registration

**Description**: User creates account...
```
✅ Intro explains what to notice  
✅ AI knows what to replicate  

---

## CHECKLISTS: REQUIREMENTS FOR COMPLETION SECTIONS

Every checklist must:

1. **Start with directive**: "Before marking [X] complete:"
2. **Use action verbs**: "Define", "Document", "Verify", "Create", not "Defined", "Documented"
3. **Include context**: Explain why each item matters or what it means
4. **Order by dependency**: Items that must happen first come first
5. **Group related items**: Group by category (Deliverables, Sign-off, etc.)

### Template: Completion Checklist

```markdown
## Completion Checklist

Before marking this [document/section/phase] complete, verify every item below:

### Deliverables

- [ ] **Define** [what AI creates/documents with context about why]
- [ ] **Document** [what must be captured, with guidance]
- [ ] **Verify** [what must be validated, with success criteria]

### Sign-Off

- [ ] **Prepared by**: [Name], [Date]
- [ ] **Reviewed by**: [Name], [Date]
- [ ] **Approved by**: [Name], [Date]
```

### Bad Checklist ❌
```
## Completion Checklist

- [ ] Flow created
- [ ] Exceptions documented
- [ ] Data flow identified
- [ ] Reviewed
```
❌ Passive voice ("created", "documented")  
❌ No context  
❌ Unclear success criteria  

### Good Checklist ✅
```
## Completion Checklist

Before marking this flow complete, ensure every item below is done:

### Deliverables

- [ ] **Create** a system flow for each functional requirement (FR → SF relationship)
- [ ] **Document** happy path step-by-step with system responses, ensuring actors and system roles are clear
- [ ] **Identify** at least 2-3 exception flows for each flow (validation errors, external service failures, etc.)
- [ ] **Map** data flow clearly (input → process → output, with state changes)

### Sign-Off

- [ ] **Prepared by**: [Name], [Date]
- [ ] **Reviewed by**: [Name], [Date]
- [ ] **Approved by**: [Name], [Date]
```
✅ Directive verbs  
✅ Context in each item  
✅ Clear success criteria  

---

## NAVIGATION: FOR SEQUENTIAL DOCUMENTS

### Files That Need Navigation

- ✅ Phase README files (link to next/previous phase)
- ✅ Template files in a phase (link to prior/next template)
- ✅ Guides that form a sequence (link to previous/next guide)

### Files That DON'T Need Navigation

- ❌ Standalone reference guides (FAQ, architecture overview)
- ❌ Technology-specific tutorials
- ❌ Individual decision documents

### Format (Standardized)

```markdown
[← Index](./README.md) | [< Previous](./TEMPLATE-001.md) | [Next >](./TEMPLATE-003.md)
```

### Placement

- **Top**: After navigation line, before title
- **Bottom**: After sign-off section, before end of file

### Example

```markdown
[← Index](./README.md) | [< Previous](./TEMPLATE-008-system-flows.md) | [Next >](./TEMPLATE-011-ubiquitous-language.md)

---

# Domain Events Template

...

---

[← Index](./README.md) | [< Previous](./TEMPLATE-008-system-flows.md) | [Next >](./TEMPLATE-011-ubiquitous-language.md)
```

---

## CONSISTENCY RULES (The 10 Laws)

### Rule 1: File Opening
Every file must start with:
1. Navigation links (if sequential)
2. Horizontal rule (`---`)
3. Title (H1)
4. Role context ("You are...")

### Rule 2: Metadata Block
Every TEMPLATE file and Phase README must have (in this order):
1. What This Is
2. How to Use
3. Why It Matters
4. When to Use
5. Owner
6. Diagram Convention (if applicable)

### Rule 3: Contents Section
Every file must have Contents with:
- All H2 sections listed
- Anchor links in format `#section-name`
- Checkmark for optional sections: `[✓ Optional]`

### Rule 4: Section Structure
Every H2 section must have:
1. "What This Section Is" intro (one sentence)
2. Explanatory paragraph (before any template/table)
3. Subsections (if complex)
4. Examples (optional but recommended)

### Rule 5: Template/Table Intros
Before showing any template block or table:
- Add explanatory paragraph
- Explain purpose and why it matters
- Provide guidance on how to fill it

### Rule 6: Examples
Every example must have:
1. Context intro: "This example demonstrates..."
2. Learning points (2-3 bullets)
3. Filled content
4. No explanation after

### Rule 7: Checklists
All checklists must:
- Use directive verbs ("Define", "Document", not "Defined", "Documented")
- Include context for each item
- Order by dependency
- Have Sign-Off section at end

### Rule 8: Navigation
Sequential files must have:
- Navigation at top: `[← Index] | [< Previous] | [Next >]`
- Navigation at bottom: same format
- Consistent format across all phases

### Rule 9: Visual Markers
Use markers only for meaning:
- ✅ = do / include / good
- ❌ = don't / exclude / bad
- 🎯 = principle / north star
- ⚠️ = warning / critical
- 📋 = data / table / summary

### Rule 10: Sign-Off
Every document must end with:
- Completion Checklist (with directive verbs)
- Sign-Off section (Prepared by, Reviewed by, Approved by)
- Navigation links (if sequential)

---

## EXCEPTIONS & FLEXIBILITY

### When You Can Deviate

1. **Standalone guides** (not sequential): May skip navigation
2. **Reference documents** (data tables, glossaries): May skip some metadata
3. **Very short documents** (<2 pages): May condense structure
4. **External content** (quoted material): Quote as-is, don't reformat

### When You MUST Follow Standard

1. ✅ All TEMPLATE files (mandatory)
2. ✅ All Phase README files (mandatory)
3. ✅ All guide files in `00-guides-and-instructions/` (mandatory)
4. ✅ All new documents added to the framework (mandatory)

### How to Document Exceptions

If a file deviates from this standard:
1. Add note at top: "⚠️ This document deviates from DOCUMENT-STRUCTURE-STANDARD.md because [reason]"
2. Explain why deviation was necessary
3. Tech Lead must approve before commit

---

## VALIDATION CHECKLIST

Before publishing any document, verify:

- [ ] File has navigation links at top and bottom (if sequential)
- [ ] Role context statement present ("You are...")
- [ ] Metadata block complete (What/How/Why/When/Owner)
- [ ] Diagram Convention listed (if applicable)
- [ ] Contents section with anchors
- [ ] Every H2 section has "What This Section Is" intro
- [ ] Every template/table has explanatory paragraph before it
- [ ] Every example has context intro ("This example demonstrates...")
- [ ] Checklist uses directive verbs ("Define", "Document")
- [ ] Visual markers used consistently (✅ ❌ 🎯 ⚠️ 📋)
- [ ] Sign-Off section present
- [ ] No passive voice in checklists or instructions
- [ ] No unexplained jargon or acronyms
- [ ] No technology names in agnostic phases (1–5)

---

## Questions This Standard Answers

| Question | Answer |
|----------|--------|
| **Where should metadata go?** | After role context, before Contents |
| **Should every section have an intro?** | Yes. "What This Section Is" + explanatory paragraph |
| **How many examples per section?** | At least 1; more if complex |
| **When should I use ✅ vs ❌?** | ✅ for do/include/good, ❌ for don't/exclude/bad |
| **What tone should I use?** | Direct, imperative (for AI agents) |
| **Should checklists be passive or directive?** | Directive only: "Define X", not "X defined" |
| **Do all files need navigation?** | Only sequential files; standalone guides may skip |
| **Can I deviate from this standard?** | Only with Tech Lead approval; document why |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-23 | Initial standard created based on framework analysis |

---

## See Also

- **AGENTS.md**: Agent responsibilities and conventions
- **INSTRUCTIONS-FOR-AI.md**: Detailed authoring directives
- **AI-WORKFLOW-GUIDE.md**: Day-by-day execution workflow
- **TEMPLATE-USAGE-GUIDE.md**: Phase-by-phase deliverables

---

**Last Updated**: 2026-04-23  
**Maintained By**: Tech Lead  
**Questions?**: Refer to INSTRUCTIONS-FOR-AI.md or contact Tech Lead
