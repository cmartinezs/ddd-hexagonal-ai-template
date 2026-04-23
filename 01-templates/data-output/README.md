# Data Output

This is the **production documentation** directory for your actual project. All files here contain real project content, not templates.

## Structure

```
01-templates/data-output/
├── 01-templates/00-documentation-planning/           # Project SDLC framework and conventions
├── 01-templates/01-discovery/          # Business context and requirements
├── 01-templates/02-requirements/       # Functional and non-functional specifications
├── 01-templates/03-design/            # System flows and UI/UX designs
├── 01-templates/04-data-model/        # Data entities and relationships
├── 01-templates/05-planning/          # Roadmap and sprint planning
├── 01-templates/06-development/       # Architecture and implementation details
├── 01-templates/07-testing/           # Test strategy and test plans
├── 01-templates/08-deployment/        # CI/CD and release procedures
├── 01-templates/09-operations/        # Runbooks and SLA definitions
├── 01-templates/10-monitoring/        # Metrics and alerting
└── 01-templates/11-feedback/          # Retrospectives and lessons learned
```

## Key Differences from Template

- ✅ **No TEMPLATE- prefixes**: Files are named after their actual content
- ✅ **Real project content**: All documentation reflects your actual project
- ✅ **No instruction text**: Template guidance is in `../00-guides-and-instructions/`
- ✅ **Production-ready**: This is what you share with stakeholders and team
- ✅ **Customized**: Tailored to your specific domain and needs

## How to Populate

### Option 1: AI-Assisted Generation
1. Use `../00-guides-and-instructions/AI-WORKFLOW-GUIDE.md`
2. Generate initial drafts from inputs in `../01-templates/data-input/`
3. Place generated documents here (without TEMPLATE- prefix)
4. Review and refine with team

### Option 2: Manual Completion
1. Use templates from `../00-guides-and-instructions/` as reference
2. Write content directly for your project
3. Place completed files here
4. Ensure all sections are customized (not template text)

### Option 3: Hybrid (Recommended)
1. AI generates initial structure/content
2. Team reviews and adds project-specific details
3. Iterate until production-ready
4. Commit to `01-templates/data-output/`

## Workflow

```
01-templates/data-input/                     01-templates/data-output/
(External materials)            (Production docs)
        ↓                               ↑
     Research                      Generate/Write
   Specifications              (Use templates as guide)
   User feedback                     ↑
   Competition                    Review
   Standards                     Customize
        ↓                          Refine
   ├─→ Extract insights        ←──┤
   └─→ Inform design           ←──┘
```

## Phase Progression

Follow these phases in order:

1. **Phase 0 (PLANNING)**: Framework and conventions
2. **Phase 1 (DISCOVERY)**: Understand the problem
3. **Phase 2 (REQUIREMENTS)**: Define what to build
4. **Phase 3 (DESIGN)**: Design the system
5. **Phase 4 (DATA MODEL)**: Define data structure
6. **Phase 5 (PLANNING)**: Plan implementation
7. **Phase 6 (DEVELOPMENT)**: Build the system
8. **Phase 7 (TESTING)**: Test strategy
9. **Phase 8 (DEPLOYMENT)**: Release process
10. **Phase 9 (OPERATIONS)**: Running the system
11. **Phase 10 (MONITORING)**: Health metrics
12. **Phase 11 (FEEDBACK)**: Learn and improve

## Sign-Off Requirements

Each phase should have sign-off from appropriate stakeholders:

- **Phase 0-1**: Product Manager, Business Stakeholders
- **Phase 2**: Product Manager, Engineering Lead
- **Phase 3-4**: Architecture Lead, Design Lead
- **Phase 5-6**: Engineering Lead, Tech Lead
- **Phase 7-8**: QA Lead, DevOps Lead
- **Phase 9-11**: All team members

## Status Tracking

### Phase Completion

Update status in each phase README:

- ⬜ **Planned**: Not started
- 🟨 **In Progress**: Active work
- 🟩 **Complete**: Ready for review
- ✅ **Approved**: Stakeholder sign-off received

### Documentation Checklist

For each phase:
- [ ] All required sections completed
- [ ] Content customized (not template text)
- [ ] Links validated (no broken references)
- [ ] Stakeholders reviewed
- [ ] Sign-off obtained

---

## Tips

1. **Start with inputs**: Review materials in `../01-templates/data-input/` before writing each phase
2. **Reference template examples**: Look at `../00-guides-and-instructions/EXAMPLE-IMPLEMENTATION.md`
3. **Use consistent IDs**: FR-001, SF-001, TC-001 for traceability
4. **Link across phases**: Each output should reference relevant inputs
5. **Version control**: Commit regularly, tag phase completions

---

## Getting Started

1. **Copy files from `../01-templates/00-documentation-planning/`** → Customize for your project
2. **Start Phase 1**: Create `01-templates/01-discovery/` documents
3. **Use `../00-guides-and-instructions/` as reference** while writing
4. **Remove template text** before committing
5. **Get stakeholder review** before moving to next phase

---

**Project**: [YOUR PROJECT NAME]  
**Start Date**: [DATE]  
**Current Phase**: [NUMBER - NAME]  
**Owner**: [NAME]

---

This is your production documentation. Keep it accurate, complete, and up-to-date!
