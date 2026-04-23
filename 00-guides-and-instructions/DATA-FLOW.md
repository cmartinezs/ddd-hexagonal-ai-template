# Data Flow Architecture

## Overview

This template uses a clear separation between input materials and output documentation:

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

### Purpose
Collect all external documentation, research, and materials that inform your project documentation.

### Contents
- **external-specs/**: Specifications from clients or partners
- **user-research/**: Interviews, surveys, user feedback
- **competitor-analysis/**: Market research, competitor features
- **previous-projects/**: Reference implementations, old specs
- **standards/**: Industry standards, best practices
- **raw-materials/**: Unprocessed input (emails, notes, etc.)

### Usage
1. **Collect**: Place all external materials here
2. **Organize**: Create subfolders by source/type
3. **Reference**: Link from `01-templates/data-output/` when using these materials
4. **Archive**: Keep as reference for future decisions
5. **Don't modify**: Keep original materials intact

### Example
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

### Purpose
Your actual project documentation, customized and complete—not template text.

### Structure
Mirrors the 12-phase SDLC:
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

1. **No TEMPLATE- Prefix**: Files are named after their actual content
   - ❌ `TEMPLATE-context-motivation.md`
   - ✅ `context-motivation.md`

2. **Real Project Content Only**: All text is specific to your project
   - ❌ "This is where you describe..." (template instructions)
   - ✅ "Our platform provides collaborative task management..." (real content)

3. **No Template Guidance**: Helper text stays in `00-guides-and-instructions/`
   - ❌ Include "complete these sections" instructions
   - ✅ Include only your actual project documentation

4. **Input-Informed**: Content draws from `data-input/` materials
   - Reference what informed each decision
   - Link to external materials that support your documentation
   - Note which user research or specs influenced requirements

5. **Production Ready**: This is what you share with team and stakeholders
   - Every document should be complete and accurate
   - No placeholder text or "[FILL IN X]" sections
   - Sign-off from appropriate stakeholders

---

## Workflow: From Input to Output

### For Each Phase:

#### 1. Gather Materials
```
→ Place relevant materials in 01-templates/data-input/
  ├── User interviews for Discovery phase
  ├── Competitor specs for Requirements
  ├── Design references for Design phase
  └── Etc.
```

#### 2. Reference Template Guides
```
→ Use 00-guides-and-instructions/ as reference
  ├── Read TEMPLATE-USAGE-GUIDE.md for format
  ├── Check EXAMPLE-IMPLEMENTATION.md for patterns
  ├── Use templates as outline, not content
  └── AI can generate initial drafts from templates
```

#### 3. Generate/Write in 01-templates/data-output/
```
→ Create actual project documentation
  ├── Use template structure as starting point
  ├── Replace all template text with real content
  ├── Reference 01-templates/data-input/ materials
  ├── Customize for your domain
  └── Remove all instructions/placeholder text
```

#### 4. Review & Validate
```
→ Ensure 01-templates/data-output/ documents are:
  ├── Specific to your project (not generic)
  ├── Complete (no placeholder sections)
  ├── Accurate (reflect real decisions)
  ├── Linked to inputs (trace back to 01-templates/data-input/)
  └── Approved (stakeholder sign-off)
```

### Example: Requirements Phase

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

### Template Files (00-guides-and-instructions/)
```
TEMPLATE-[purpose].md

Examples:
- TEMPLATE-ARCHITECTURE.md
- TEMPLATE-USAGE-GUIDE.md
- TEMPLATE-context-motivation.md (example in guide)
```

### Production Files (01-templates/data-output/)
```
[purpose].md (NO TEMPLATE- prefix)

Examples:
- context-motivation.md
- functional-requirements.md
- system-flows.md
- architecture.md
```

### Reference Files (01-templates/data-input/)
```
[source]-[type]-[date].md (or original naming)

Examples:
- customer-interviews-2024-01.md
- competitor-feature-matrix-jan.csv
- user-research-survey-results.md
```

---

## Best Practices

### In 01-templates/data-input/:
- ✅ Keep materials as-is (don't modify original sources)
- ✅ Add context with README files
- ✅ Link from 01-templates/data-output/ documents
- ✅ Date materials and note their source
- ✅ Archive old materials instead of deleting

### In 01-templates/data-output/:
- ✅ Use consistent IDs (FR-001, SF-001, TC-001)
- ✅ Link back to 01-templates/data-input/ materials
- ✅ Remove all template instructions
- ✅ Customize every section for your project
- ✅ Get stakeholder sign-off before completion

### Workflow:
- ✅ Reference templates while writing (don't copy them)
- ✅ Use AI to generate initial drafts from templates
- ✅ Always review and customize AI output
- ✅ Commit only production-ready content to data-output/
- ✅ Keep template guides unchanged for future reference

---

## Checklist: Ready to Use data-output/

Before considering a `01-templates/data-output/` document complete:

### Content Quality
- [ ] All template instructions removed
- [ ] All placeholder text replaced with real content
- [ ] Domain-specific details included
- [ ] Project context is clear
- [ ] No generic or example text remains

### Traceability
- [ ] Links to relevant data-input/ materials
- [ ] References to other phases created
- [ ] IDs are consistent and unique
- [ ] Acceptance criteria are specific

### Validation
- [ ] Team members reviewed and approved
- [ ] Stakeholder sign-off obtained
- [ ] Linked to previous phase outputs
- [ ] Ready for next phase input

### Documentation
- [ ] Format matches team standards
- [ ] Links are valid (no broken refs)
- [ ] Spelling and grammar correct
- [ ] Committed to version control

---

## FAQ

**Q: Should I keep template files in 01-templates/data-output/?**
A: No. Templates belong in `00-guides-and-instructions/`. Production docs go in `01-templates/data-output/` without TEMPLATE- prefix.

**Q: How do I handle materials that don't fit standard categories?**
A: Create a custom subfolder in `01-templates/data-input/` with a README explaining its purpose.

**Q: Can I reference 01-templates/data-input/ documents in 01-templates/data-output/?**
A: Yes, include links like: `See [Customer Research](../../data-input/user-research/interviews.md) for details.`

**Q: What if I want to revise something in 01-templates/data-input/?**
A: Create a new version (don't overwrite original). Track changes in a README.

**Q: Should I commit 01-templates/data-input/ to Git?**
A: Yes, for traceability. But be careful with confidential materials (add to .gitignore if needed).

---

## Summary

- **Template Guides** (00-guides-and-instructions/): How to document
- **Data Input** (01-templates/data-input/): What you're documenting (reference materials)
- **Data Output** (01-templates/data-output/): Your actual project documentation (production)

Follow this flow for each phase:
1. Gather external materials → `01-templates/data-input/`
2. Reference template guide → `00-guides-and-instructions/`
3. Write production docs → `01-templates/data-output/`
4. Link inputs to outputs → Traceability

The separation keeps template guidance separate from your project documentation, making everything clear and organized.

---

**Last Updated**: [DATE]  
**Owner**: [NAME]
