# Frequently Asked Questions

## General Questions

### Q: How long does it take to complete all phases?
**A**: It depends on project complexity:
- **Small project (1-2 people)**: 4-8 weeks total
- **Medium project (5-10 people)**: 8-12 weeks total
- **Large project (10+ people)**: 12+ weeks total

Phases can overlap; don't wait for one to finish before starting the next.

### Q: Can we skip phases?
**A**: Not recommended. Each phase builds on previous ones:
- Discovery informs Requirements
- Requirements inform Design
- Design informs Development

You can run them in parallel, but skipping creates rework later.

### Q: What if we're already building?
**A**: Retrofit the documentation:
1. Document what you've already decided (Discovery/Requirements)
2. Fill in Design and Data Model from code
3. Document as you go forward
4. Use ADRs for architectural decisions

### Q: How do we keep docs in sync with code?
**A**: 
- **Automation**: Generate API docs, schemas from code
- **Reviews**: Include docs in code review requirements
- **ADRs**: Document why, let code be the what
- **Regular audits**: Monthly check for drift

### Q: Who should own documentation?
**A**: 
- **Tech Lead**: Architecture, decisions, coding standards
- **Product Manager**: Requirements, roadmap, scope
- **UX/Design**: Design flows, UI specs
- **DevOps**: Deployment, operations, monitoring
- **Everyone**: Updates their area, reviews before commit

---

## Phase Questions

### Discovery & Requirements

**Q: How detailed should personas be?**
**A**: Enough to guide design decisions. Include:
- Goals and pain points
- How they use the system
- Key needs from the product
- Any constraints (technical, domain knowledge, etc.)

### Design

**Q: Should we include wireframes in this documentation?**
**A**: 
- Yes, link to them or embed descriptions
- Use tools like Figma and link from docs
- Document interaction patterns and flows
- Don't duplicate Figma — reference it

**Q: How detailed should system flows be?**
**A**: Cover:
- Happy path (main scenario)
- Exception paths (errors, validation failures)
- Edge cases (empty states, rate limits, etc.)
- Decision points clearly marked

### Data Model

**Q: Should we document SQL migrations?**
**A**: 
- Yes, in 08-deployment/ci-cd-pipeline.md
- Link migration scripts from ERD
- Document schema evolution in git history

### Development

**Q: API docs — here or separate?**
**A**: 
- **Specifications**: Here (OpenAPI/AsyncAPI format)
- **Generated docs**: Swagger UI or equivalent
- **Examples**: Include in specs
- **Keep in sync**: Regenerate from code during CI

**Q: How much architecture detail?**
**A**: Show:
- Overall structure (hexagonal: domain, ports, adapters)
- Main components and their responsibilities
- How components communicate
- External integrations
- Not every class/method (code shows that)

### Testing

**Q: Test plans — how detailed?**
**A**: List:
- Test case name and description
- Preconditions
- Steps
- Expected results
- Exception/error cases

Link to actual test code in repositories.

### Operations

**Q: What goes in runbooks vs. dashboards?**
**A**: 
- **Runbooks**: Step-by-step procedures for humans
- **Dashboards**: Visual metrics and health status
- **Alerts**: Trigger human action (runbooks)

---

## AI & Automation Questions

### Q: Can AI write all documentation?
**A**: 
- ✅ AI can generate templates and structure
- ✅ AI can draft based on good prompts
- ❌ AI can't make strategic decisions
- ❌ AI can't validate accuracy without human input

Plan for 30-50% AI draft, 50-70% human review/refinement.

### Q: How do we use AI for requirements?**
**A**: 
1. Human provides feature description
2. AI generates initial requirement template with flows
3. Human adds business-specific details
4. AI generates acceptance criteria
5. Human reviews and approves

**Q: Can AI generate code from specs?**
**A**: Yes, but:
- Use as starting point, not production code
- Architect first, generate second
- Engineers review and refactor
- Don't skip code review

### Q: How do we ensure AI-generated docs are accurate?**
**A**: 
1. Validate against project context
2. Compare with similar projects
3. Have domain experts review
4. Test with actual use (can we build from this?)
5. Update based on reality

---

## Process Questions

### Q: How often should we update documentation?**
**A**: 
- **During phase**: Continuously as decisions are made
- **Between phases**: Before moving to next phase
- **During development**: Update if reality changes
- **Post-launch**: Monthly review, update as needed

### Q: What if we discover something during development that contradicts earlier decisions?**
**A**: 
1. Document the contradiction
2. Update relevant phases with the discovery
3. Track as a change log entry
4. Use ADRs for significant decisions
5. Don't delete old info — archive to bkp/

### Q: How do we handle documentation for sub-systems or services?**
**A**: 
- Each service has its own doc folder
- Services linked in parent architecture
- Shared templates across services
- Central bkp/ for historical decisions

### Q: Can we use this template for documentation only, without the full SDLC?**
**A**: 
Yes, you can:
- Document existing systems (retrofit phases)
- Focus on specific phases only
- Use as reference architecture
- Adapt the structure to your needs

---

## Template Customization

### Q: Can we modify the template structure?**
**A**: 
Yes, but:
- Preserve the phase progression logic
- Keep "what" separate from "how" in discovery/requirements
- Maintain traceability across phases
- Document your customizations

### Q: Do we need all the files in each phase?**
**A**: 
No. Use what's relevant:
- Keep README to explain the phase
- Delete files that don't apply
- Add files for domain-specific needs
- Document your structure choices

### Q: How do we handle multiple projects in one repo?**
**A**: 
```
repo/
├── project-a/
│   ├── 00-documental-planning/
│   ├── 01-discovery/
│   └── ...
├── project-b/
│   ├── 00-documental-planning/
│   ├── 01-discovery/
│   └── ...
└── shared/
    └── standards/
```

### Q: Should documentation be in the main repo or separate?**
**A**: 
- **Option 1**: Docs in main repo (easier to keep in sync)
- **Option 2**: Docs in separate repo, submodule in main
- **Option 3**: Docs in each service repo, aggregated in central docs

Choose based on team size and project scope.

---

## Tools & Integration

### Q: What tools should we use?**
**A**: 
- **Documents**: Markdown + Git (version control)
- **Diagrams**: Mermaid, PlantUML, or Lucidchart
- **API Docs**: OpenAPI/AsyncAPI (Swagger UI)
- **Mockups**: Figma, Adobe XD
- **Roadmap**: Jira, Linear, or spreadsheet
- **Decision Records**: Markdown in adr/ folder

### Q: How do we integrate with GitHub/GitLab?**
**A**: 
- Use Wiki for navigation
- Use Discussions for feedback
- Use Issues for doc TODOs
- Keep source in repo
- Use CI to validate doc structure (optional)

### Q: Can we publish documentation automatically?**
**A**: 
Yes:
- Use MkDocs or Docusaurus
- GitHub Pages with static generator
- GitBook integration
- Always keep source in Git

---

## Scaling Questions

### Q: How do we manage documentation for a large team?**
**A**: 
1. **Assign owners**: Each phase has a responsible person
2. **Review process**: Changes require review + approval
3. **Templates**: Enforce through automated checks
4. **Regular audits**: Monthly sync to catch drift
5. **Clear governance**: Decision-making process documented

### Q: How do we handle documentation across teams?**
**A**: 
- **Shared phases**: 00-PLANNING, 01-DISCOVERY, 02-REQUIREMENTS
- **Team-specific**: 03-DESIGN onwards, with shared architecture
- **Integration points**: Document service boundaries clearly
- **Cross-team reviews**: Before moving to next phase

### Q: What about legacy systems documentation?**
**A**: 
- Retrofit existing documentation
- Document "as-is" state
- Plan for modernization in roadmap
- Use bkp/ for historical decisions
- Clear migration path to new architecture

---

## Troubleshooting

### Q: Documentation is outdated, what do we do?**
**A**: 
1. Identify what's outdated
2. Audit affected phases
3. Update source of truth
4. Regenerate dependent docs
5. Get re-approval for changed phases
6. Set up monitoring to prevent recurrence

### Q: Team is too busy to document, what's the solution?**
**A**: 
- **Priority 1**: Document architecture and critical decisions (ADRs)
- **Priority 2**: Keep diagrams updated
- **Priority 3**: Detailed specs for APIs and data models
- **Use AI**: To create first drafts, save time
- **Assign ownership**: Make documentation someone's responsibility

### Q: How do we know when documentation is "complete"?**
**A**: 
Use the completion checklist in each phase:
- [ ] All sections addressed (customized for project)
- [ ] Examples and templates filled in
- [ ] Linked to related documents
- [ ] Reviewed and approved by stakeholders
- [ ] Committed to version control

### Q: How do we handle documentation in Agile/fast-moving projects?**
**A**: 
- **Continuous Documentation**: Document as you build
- **Lightweight Specs**: Templates with just-enough detail
- **Just-in-Time Details**: Add detail as needed
- **Retrospectives**: Update what we learned
- **ADRs**: Quick records of decisions
- **README-Driven**: Docs in code repositories too

---

**Still have questions?** Create an issue in the repository or ask in team discussions.
