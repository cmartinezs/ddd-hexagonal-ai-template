# Data Flow Architecture

You are an AI agent generating documentation for this template framework. This document defines the data flow architecture you must follow: where to store input materials, where to produce output documentation, and how to trace content from its source to its final form. Understanding this structure prevents you from mixing template guidance with production content or placing files in the wrong location.

## Overview

The framework separates documentation into two distinct areas: reference materials (data input) and production documentation (data output). All template guides remain read-only. You generate content into the data output area exclusively.

```
                    TEMPLATE GUIDES
                        (Read-Only)
                            ↓
    00-guides-and-instructions/   ← Reference how to document
    01-templates/00-documentation-planning/ ← Framework examples
            ↓
            │
            ├─────────────────────────────────────┐
            │                                     │
      DATA INPUT                            DATA OUTPUT
    (Reference)                          (Production)
            ↓                                     ↓
    01-templates/data-input/      01-templates/data-output/
    ├── external-specs            ├── 00-documentation-planning/
    ├── user-research    ────→    ├── 01-discovery/
    ├── competitor-analysis       ├── 02-requirements/
    ├── previous-projects         ├── 03-design/
    ├── standards                 ├── 04-data-model/
    └── raw-materials             ├── 05-planning/
                                  ├── 06-development/
                                  ├── 07-testing/
                                  ├── 08-deployment/
                                  ├── 09-operations/
                                  ├── 10-monitoring/
                                  └── 11-feedback/
```

---

## Data Input (Reference Materials)

This section defines the purpose of the `data-input` folder and how you must handle materials placed there. These are source materials provided by the human collaborator — not documentation you generate.

### Purpose

The `data-input` folder holds all external documentation, research, and materials that inform the project. You read from it; you do not write to it.

### Contents

The following subfolders organize source materials by type:
- **external-specs/**: Specifications from clients or partners
- **user-research/**: Interviews, surveys, user feedback
- **competitor-analysis/**: Market research, competitor features
- **previous-projects/**: Reference implementations, prior documentation
- **standards/**: Industry standards and best practices
- **raw-materials/**: Unprocessed input (emails, notes, transcripts)

### How to Use Data Input

When working with source materials from `data-input/`:
1. **Read**: Extract insights and constraints from the materials
2. **Reference**: Link from `01-templates/data-output/` documents when using these materials
3. **Do not modify**: Keep original materials intact — never overwrite source files
4. **Archive**: Treat as a permanent record for future decisions

### Example

When referencing a source material in a production document:
```
01-templates/data-input/user-research/
├── README.md
│   "Customer interviews conducted Jan-Feb 2024
│    Key insights inform 01-discovery and 02-requirements"
├── interview-notes-2024-01-15.md
├── survey-results-jan-2024.csv
└── user-journey-map.pdf

# In 01-templates/data-output/01-discovery/context-motivation.md:
"Based on [user research](../../data-input/user-research/)"
```

---

## Data Output (Production Documentation)

This section defines where you write production documentation and what standards it must meet. Every file you write to `data-output/` must be real project content — never template instructions or placeholder text.

### Purpose

The `data-output` folder holds your actual project documentation: customized, complete, and approved. It mirrors the 12-phase SDLC and is what stakeholders and engineers work from.

### Structure

`data-output/` mirrors the 12-phase SDLC structure exactly:
```
01-templates/data-output/
├── 00-documentation-planning/ # Your SDLC framework & conventions
├── 01-discovery/              # Your business context
├── 02-requirements/           # Your functional & non-functional requirements
├── 03-design/                 # Your system flows & UI designs
├── 04-data-model/             # Your entities & relationships
├── 05-planning/               # Your roadmap & epics
├── 06-development/            # Your architecture & APIs
├── 07-testing/                # Your test strategy
├── 08-deployment/             # Your CI/CD & release process
├── 09-operations/             # Your runbooks & SLAs
├── 10-monitoring/             # Your metrics & alerts
└── 11-feedback/               # Your retrospectives & lessons
```

### Key Principles

Apply these principles to every file you write in `data-output/`:

1. **No `TEMPLATE-` Prefix**: Files you produce are named for their content, not their template
   - ❌ `TEMPLATE-context-motivation.md`
   - ✅ `context-motivation.md`

2. **Real Project Content Only**: Every line of text describes this specific project
   - ❌ "This is where you describe..." (template instructions)
   - ✅ "Our platform provides collaborative task management..." (real content)

3. **No Template Guidance**: Instructional text stays in `00-guides-and-instructions/`
   - ❌ Include "complete these sections" instructions
   - ✅ Include only your actual project documentation

4. **Input-Informed**: Content draws from `data-input/` materials with explicit links
   - Reference what informed each decision
   - Link to the external materials that support your documentation

5. **Production Ready**: Every document is what you would share with stakeholders
   - No placeholder text, no "[FILL IN X]" sections
   - Approved by the appropriate stakeholder before marked complete

---

## Workflow: From Input to Output

This section defines the four-step workflow you follow for each phase. Apply this workflow sequentially — do not jump to writing output without completing the earlier steps.

### For Each Phase

#### Step 1: Gather Materials
Before generating output, verify that relevant source materials exist in `data-input/`:
```
→ Place relevant materials in 01-templates/data-input/
  ├── User interviews for Discovery phase
  ├── Competitor specs for Requirements
  ├── Design references for Design phase
  └── Technical standards for Development phase
```

#### Step 2: Reference Template Guides
Read the relevant guide before generating:
```
→ Use 00-guides-and-instructions/ as reference
  ├── Read TEMPLATE-USAGE-GUIDE.md for document format
  ├── Check EXAMPLE-IMPLEMENTATION.md for patterns
  ├── Use the template structure as your outline
  └── AI generates initial drafts using the template structure
```

#### Step 3: Generate in 01-templates/data-output/
Write production documentation:
```
→ Create actual project documentation in data-output/
  ├── Use template structure as starting point
  ├── Replace all template text with real project content
  ├── Reference 01-templates/data-input/ materials with links
  ├── Customize for your domain
  └── Remove all instructional or placeholder text
```

#### Step 4: Review & Validate
Verify the document meets production standards:
```
→ Ensure 01-templates/data-output/ documents are:
  ├── Project-specific (not generic)
  ├── Complete (no placeholder sections)
  ├── Accurate (reflect real decisions)
  ├── Linked to inputs (trace back to 01-templates/data-input/)
  └── Approved (stakeholder sign-off obtained)
```

### Example: Requirements Phase

The following example shows the complete workflow for the Requirements phase.

**Step 1: Gather Input**
```
01-templates/data-input/user-research/
  ├── customer-interviews-2024.md
  ├── feature-requests.csv
  └── competitor-feature-matrix.md
```

**Step 2: Reference Template**
```
Read: 00-guides-and-instructions/TEMPLATE-USAGE-GUIDE.md
  "Format for each requirement:
   ## [FR-001] Requirement Title
   **Description**: ...
   **Acceptance Criteria**: ...
   **Dependencies**: ..."
```

**Step 3: Write Production Docs**
```
01-templates/data-output/02-requirements/
  ├── functional-requirements.md
  │   "## [FR-001] Create Task
  │    Based on customer interviews,
  │    users need to create tasks in shared projects.
  │    
  │    **Acceptance Criteria**:
  │    - [ ] Task created with title, description, assignee
  │    - [x] Each user can be assigned via dropdown..."
  │
  └── non-functional-requirements.md
```

**Step 4: Trace Back to Input**
```
In 01-templates/data-output/02-requirements/traceability-matrix.md:
  | FR-ID | Title | Data Input | Priority |
  |-------|-------|-----------|----------|
  | FR-001 | Create Task | customer-interviews-2024.md | Must |
  | FR-002 | Search Tasks | feature-requests.csv | Should |
```

---

## File Naming Conventions

This section defines the naming rules for each area of the repository. Follow these conventions to keep the structure navigable and consistent.

### Template Files (00-guides-and-instructions/)

Guide files follow the `TEMPLATE-[purpose].md` convention:
```
Examples:
- TEMPLATE-ARCHITECTURE.md
- TEMPLATE-USAGE-GUIDE.md
- TEMPLATE-context-motivation.md (template inside a guide)
```

### Production Files (01-templates/data-output/)

Production files are named for their content without the `TEMPLATE-` prefix:
```
Examples:
- context-motivation.md
- functional-requirements.md
- system-flows.md
- architecture.md
```

### Reference Files (01-templates/data-input/)

Source materials are named with a `[source]-[type]-[date]` convention or their original name:
```
Examples:
- customer-interviews-2024-01.md
- competitor-feature-matrix-jan.csv
- user-research-survey-results.md
```

---

## Standards Checklist

### Standards for 01-templates/data-input/
- ✅ Keep materials as-is (do not modify original sources)
- ✅ Add a README file explaining the context of each folder
- ✅ Link from `data-output/` documents to relevant source materials
- ✅ Date materials and note their source
- ✅ Archive old materials instead of deleting them

### Standards for 01-templates/data-output/
- ✅ Use consistent IDs (FR-001, SF-001, TC-001)
- ✅ Link back to `data-input/` materials for every major decision
- ✅ Remove all template instructions before finalizing
- ✅ Customize every section for the specific project
- ✅ Obtain stakeholder sign-off before marking a phase complete

### Workflow Standards
- ✅ Reference templates while writing — do not copy template text into output
- ✅ Use AI to generate initial drafts from template structure
- ✅ Always review and customize AI output before delivery
- ✅ Commit only production-ready content to `data-output/`
- ✅ Keep template guides unchanged for future reference

---

## Checklist: Ready to Deliver data-output/

Before considering a `01-templates/data-output/` document complete and ready for stakeholder review, verify all of the following:

### Content Quality
- [ ] All template instructions removed
- [ ] All placeholder text replaced with real project content
- [ ] Domain-specific details included throughout
- [ ] Project context is clear to a reader with no prior knowledge
- [ ] No generic or example text remains

### Traceability
- [ ] Links to relevant `data-input/` materials are present
- [ ] References to other phases are present and valid
- [ ] IDs are consistent and unique across the phase
- [ ] Acceptance criteria are project-specific and verifiable

### Validation
- [ ] Team members have reviewed and approved
- [ ] Stakeholder sign-off obtained
- [ ] Linked to previous phase outputs
- [ ] Ready to serve as input for the next phase

### Documentation Standards
- [ ] Format matches project conventions
- [ ] All links are valid (no broken references)
- [ ] Committed to version control with a meaningful commit message

---

## FAQ

**Q: Should I keep template files in 01-templates/data-output/?**
A: No. Templates belong in `00-guides-and-instructions/`. Production docs go in `01-templates/data-output/` without the `TEMPLATE-` prefix.

**Q: How do I handle materials that don't fit standard categories?**
A: Create a custom subfolder in `01-templates/data-input/` with a README explaining its purpose and how it informs the documentation.

**Q: Can I reference 01-templates/data-input/ documents in 01-templates/data-output/?**
A: Yes. Use relative links: `See [Customer Research](../../data-input/user-research/interviews.md) for details.`

**Q: What if I need to revise something in 01-templates/data-input/?**
A: Create a new version — do not overwrite the original. Track changes in a README inside the folder.

**Q: Should I commit 01-templates/data-input/ to Git?**
A: Yes, for traceability. Be careful with confidential materials — add them to `.gitignore` if they must remain private.

---

## Summary

The data flow architecture has three distinct zones, each with a clear role:

- **Template Guides** (`00-guides-and-instructions/`): How to document — read-only reference
- **Data Input** (`01-templates/data-input/`): What you are documenting — source materials
- **Data Output** (`01-templates/data-output/`): Your actual project documentation — production content

Follow this sequence for every phase:
1. Gather external materials → `01-templates/data-input/`
2. Reference the template guide → `00-guides-and-instructions/`
3. Write production documentation → `01-templates/data-output/`
4. Link inputs to outputs → Traceability

---

**Last Updated**: [DATE]  
**Owner**: [NAME]
