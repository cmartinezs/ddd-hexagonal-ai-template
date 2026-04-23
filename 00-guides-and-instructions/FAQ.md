# Frequently Asked Questions

You are an AI agent that may encounter non-standard scenarios while executing documentation workflows. This document provides decision guidance for the most common questions, edge cases, and process deviations you will encounter. Use it as a reference when the standard workflow does not clearly cover your situation.

---

## General Questions

These questions address fundamental process decisions that affect the entire documentation lifecycle. Consult this section when you are uncertain about process fundamentals or project setup.

### Q: How long does it take to complete all phases?
**A**: It depends on project complexity:
- **Small project (1-2 people)**: 4-8 weeks total
- **Medium project (5-10 people)**: 8-12 weeks total
- **Large project (10+ people)**: 12+ weeks total

Phases can overlap for independent features; do not wait for one phase to be fully complete before beginning parallel work on the next.

### Q: Can we skip phases?
**A**: No. Each phase builds on the previous one:
- Discovery informs Requirements
- Requirements inform Design
- Design informs Development

You may run phases in parallel for independent features, but skipping a phase entirely creates undetectable gaps that surface as rework in later phases.

### Q: What if the project is already being built?
**A**: Retrofit the documentation in this sequence:
1. Document what has already been decided (Discovery/Requirements)
2. Fill in Design and Data Model from the existing code
3. Document forward from the current state
4. Use ADRs for architectural decisions already made

### Q: How do we keep documentation in sync with code?
**A**:
- **Automation**: Generate API docs and schemas from code using tooling
- **Reviews**: Include documentation updates in code review requirements
- **ADRs**: Document the "why"; let code be the "what"
- **Regular audits**: Schedule monthly checks for documentation drift

### Q: Who owns each phase of documentation?
**A**:
- **Tech Lead**: Architecture, decisions, coding standards (Phase 6)
- **Product Manager**: Requirements, roadmap, scope (Phases 2, 5)
- **UX/Design**: Design flows, UI specs (Phase 3)
- **DevOps**: Deployment, operations, monitoring (Phases 8–10)
- **Everyone**: Updates their area; reviews before committing

---

## Phase Questions

These questions address situations specific to individual phases. Consult this section when you encounter an edge case within a specific phase.

### Discovery & Requirements

**Q: How detailed should personas be?**
**A**: Detailed enough to drive design decisions. Each persona must include:
- Goals and pain points
- How they use the system
- Key needs from the product
- Constraints (technical literacy, domain knowledge, etc.)

### Design

**Q: Should we include wireframes in this documentation?**
**A**:
- Yes — link to them or embed descriptions
- Use Figma or equivalent and link from documentation
- Document interaction patterns and flows
- Do not duplicate Figma content — reference it with a link

**Q: How detailed should system flows be?**
**A**: Every flow must cover:
- Happy path (main scenario)
- Exception paths (validation failures, errors)
- Edge cases (empty states, rate limits, concurrent access)
- Decision points clearly marked

### Data Model

**Q: Should we document SQL migrations?**
**A**:
- Yes — in `08-deployment/ci-cd-pipeline.md`
- Link migration scripts from the ERD document
- Document schema evolution in git commit history

### Development

**Q: API docs — here or in a separate repository?**
**A**:
- **Specifications**: Here, in OpenAPI/AsyncAPI format
- **Generated docs**: Swagger UI or equivalent, generated from specs
- **Examples**: Include inline in specs
- **Sync**: Regenerate from code automatically during CI

**Q: How much architecture detail is appropriate?**
**A**: Show:
- Overall structure (hexagonal: domain, ports, adapters)
- Main components and their responsibilities
- How components communicate
- External integrations and their protocols
- Do not document individual classes or methods — the code shows that

### Testing

**Q: How detailed should test plans be?**
**A**: Each test case must include:
- Test case name and description
- Preconditions
- Steps
- Expected results
- Exception/error variations

Link to actual test code in the implementation repository.

### Operations

**Q: What goes in runbooks vs. dashboards?**
**A**:
- **Runbooks**: Step-by-step procedures for humans responding to incidents
- **Dashboards**: Visual metrics and system health status
- **Alerts**: Trigger human action by linking to runbooks

---

## AI & Automation Questions

These questions address your capabilities and boundaries as an AI agent in this documentation workflow. Use this section to clarify what you should and should not attempt to generate autonomously.

### Q: Can AI write all documentation?
**A**:
- ✅ You can generate templates and structure
- ✅ You can draft content from clear prompts and context
- ❌ You cannot make strategic business decisions
- ❌ You cannot validate accuracy without human input

Plan for 30–50% AI draft, 50–70% human review and refinement.

### Q: How do you use AI for requirements?
**A**: Follow this sequence:
1. Human provides feature description
2. You generate initial requirement template with flows
3. Human adds business-specific details
4. You generate acceptance criteria
5. Human reviews and approves

### Q: Can AI generate code from specs?
**A**: Yes, but with important constraints:
- Treat generated code as a starting point, not production code
- Architecture decisions must come first; code generation follows
- Engineers must review and refactor all generated code
- Never skip code review on AI-generated implementations

### Q: How do we ensure AI-generated documentation is accurate?
**A**: Apply this validation sequence:
1. Validate against the project context provided
2. Compare with the example implementation (Keygo case)
3. Have domain experts review domain-specific content
4. Test with a practical check: "Can a team member build from this?"
5. Update based on feedback from reality

---

## Process Questions

These questions address process management, documentation lifecycle, and change management scenarios.

### Q: How often should documentation be updated?
**A**:
- **During a phase**: Continuously as decisions are made
- **Between phases**: Before moving to the next phase
- **During development**: Update when reality changes
- **Post-launch**: Monthly review and update as needed

### Q: What if something discovered in development contradicts an earlier decision?
**A**:
1. Document the contradiction explicitly
2. Update all relevant phases with the new finding
3. Add a change log entry
4. Record the decision change as an ADR
5. Do not delete old information — archive it

### Q: How do we handle documentation for sub-systems or microservices?
**A**:
- Each service has its own documentation folder following the same 12-phase structure
- Services are linked from the parent architecture document
- Shared templates are reused across services
- Cross-service decisions are documented in the top-level architecture

### Q: Can we use this template for documentation only, without the full SDLC?
**A**:
Yes. Valid use cases:
- Documenting existing systems (retrofitting phases)
- Focusing on specific phases only (e.g., just Architecture + API)
- Using as a reference architecture without generating all phases
- Adapting the structure to your team's workflow

---

## Template Customization

These questions address how to adapt the template for non-standard projects or team contexts.

### Q: Can we modify the template structure?
**A**:
Yes, but preserve these invariants:
- Phase progression logic (each phase depends on the prior)
- The agnostic/specific boundary in phases 1–5
- Traceability across phases
- Your customizations must be documented in Phase 0

### Q: Do we need all files in each phase?
**A**:
No. Use what is relevant:
- Keep the README to explain the phase
- Delete template files that do not apply to your project
- Add custom files for domain-specific needs
- Document your structural choices in Phase 0

### Q: How do we handle multiple projects in one repository?
**A**:
```
repo/
├── project-a/
│   ├── 00-documentation-planning/
│   ├── 01-discovery/
│   └── ...
├── project-b/
│   ├── 00-documentation-planning/
│   ├── 01-discovery/
│   └── ...
└── shared/
    └── standards/
```

### Q: Should documentation live in the main repository or a separate one?
**A**:
- **Option 1**: Documentation in the main repo (easier to keep in sync with code)
- **Option 2**: Documentation in a separate repo, submoduled into the main repo
- **Option 3**: Documentation in each service repo, aggregated in a central docs repo

Choose based on team size, repository structure, and how tightly documentation must track code changes.

---

## Tools & Integration

These questions address tool selection and integration with external systems.

### Q: What tools should we use alongside this template?
**A**:
- **Documents**: Markdown + Git (version-controlled documentation)
- **Diagrams**: Mermaid (preferred), PlantUML, or Lucidchart
- **API Docs**: OpenAPI/AsyncAPI (Swagger UI for rendering)
- **Mockups**: Figma, Adobe XD (linked from documentation)
- **Roadmap**: Jira, Linear, or spreadsheet (linked from Phase 5)
- **Decision Records**: Markdown in `adr/` folder (Phase 6)

### Q: How do we integrate with GitHub/GitLab?
**A**:
- Use GitHub Wiki for navigation of rendered documentation
- Use Discussions for stakeholder feedback on phases
- Use Issues for documentation TODOs and missing sections
- Keep source Markdown in the repository
- Use CI to validate documentation structure (optional lint step)

### Q: Can we publish documentation automatically?
**A**:
Yes:
- Use MkDocs or Docusaurus with GitHub Pages
- GitBook integration from the repository
- Always keep source Markdown in Git as the source of truth

---

## Scaling Questions

These questions address documentation governance for larger teams and organizations.

### Q: How do we manage documentation for a large team?
**A**:
1. **Assign owners**: Each phase has one responsible person
2. **Review process**: Changes require peer review and phase-owner approval
3. **Templates**: Enforce using automated checks in CI
4. **Regular audits**: Monthly sync to identify and resolve drift
5. **Clear governance**: Decision-making process documented in Phase 0

### Q: How do we handle documentation across multiple teams?
**A**:
- **Shared phases**: 00-documentation-planning, 01-discovery, 02-requirements
- **Team-specific phases**: 03-design onwards, with shared architecture decisions
- **Integration points**: Service boundaries documented in the architecture phase
- **Cross-team reviews**: Required before advancing to the next phase

### Q: What about legacy systems that already exist?
**A**:
- Retrofit existing documentation by mapping current state to phases
- Document "as-is" state first, then plan the modernization
- Use `data-input/` for historical documentation
- Create a migration path in the planning phase
- Use ADRs to explain why historical decisions were made

---

## Troubleshooting

These questions address common operational problems and how to resolve them without derailing the documentation process.

### Q: Documentation is outdated — what do we do?
**A**:
1. Identify which phases and documents are out of date
2. Audit affected phases for contradictions with current reality
3. Update the source of truth
4. Regenerate dependent documents
5. Obtain re-approval for changed phases
6. Add a documentation review step to the team's regular process

### Q: The team is too busy to document — what is the solution?
**A**:
- **Priority 1**: Document architecture and critical decisions (ADRs)
- **Priority 2**: Keep diagrams updated (ERD, architecture)
- **Priority 3**: Detailed specs for APIs and data models
- **Use AI**: Generate first drafts to reduce writing time
- **Assign ownership**: Documentation must be someone's explicit responsibility

### Q: How do we know when documentation is "complete"?
**A**:
A phase is complete when all of the following are true:
- [ ] All sections are addressed (customized for the project — no template text)
- [ ] All examples are replaced with real project content
- [ ] All links to related documents are valid
- [ ] Reviewed and approved by the appropriate stakeholder
- [ ] Committed to version control with a meaningful commit message

### Q: How do we handle documentation in Agile/fast-moving projects?
**A**:
- **Continuous documentation**: Document as you build, not after
- **Lightweight specs**: Use just-enough detail for each decision
- **Just-in-time**: Add detail as the team needs it, not in advance
- **Retrospectives**: Update documentation with what was learned
- **ADRs**: Quick records of decisions as they happen
- **README-driven**: Maintain README files in code repositories too

---

**Still have questions?** Create an issue in the repository or ask in team discussions.
