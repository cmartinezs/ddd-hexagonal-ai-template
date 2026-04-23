# Setup Checklist

## Template Customization & Project Setup

Use this checklist to customize the template for your specific project.

---

## Step 1: Project Information (30 minutes)

- [ ] **Project Name**: _________________________________
- [ ] **Project Description**: _________________________________
- [ ] **Start Date**: _________________________________
- [ ] **Team Lead**: _________________________________
- [ ] **Key Stakeholders**: _________________________________

**Files to update**:
- [ ] Update `README.md` — Replace project name and description
- [ ] Update `START-HERE.txt` — Replace contact info at bottom
- [ ] Update `01-templates/data-output/00-documentation-planning/README.md` — Set project name
- [ ] Update `01-templates/data-output/00-documentation-planning/sdlc-framework.md` — Set project name, dates, team

---

## Step 2: Framework Customization (1-2 hours)

### SDLC Customization

- [ ] Review `01-templates/data-output/00-documentation-planning/sdlc-framework.md`
- [ ] Adjust timeline if needed (add/remove phases)
- [ ] Define team participants per phase
- [ ] Update success criteria
- [ ] Add any project-specific phases or customizations

### Navigation Setup

- [ ] Review `00-guides-and-instructions/navigation-conventions.md` (reference)
- [ ] Create `01-templates/data-output/00-documentation-planning/navigation-conventions.md` (your copy)
- [ ] Adjust naming conventions if needed (e.g., team preferences)
- [ ] Define approval process (who signs off?)
- [ ] Set up Git workflow (commits, PRs, tags)

### Macro Plan

- [ ] Edit `01-templates/data-output/00-documentation-planning/macro-plan.md`
- [ ] Set phase owners for each phase
- [ ] Set target dates for each phase
- [ ] Define team capacity percentages
- [ ] Set up meeting schedule

**Files updated**:
- [ ] `01-templates/data-output/00-documentation-planning/sdlc-framework.md`
- [ ] `01-templates/data-output/00-documentation-planning/navigation-conventions.md`
- [ ] `01-templates/data-output/00-documentation-planning/macro-plan.md`

---

## Step 3: Discovery Preparation (1-2 hours)

### Gather Discovery Materials

- [ ] Schedule discovery kickoff meeting (30-60 min)
- [ ] Invite: Product Manager, Business Stakeholders, Lead Engineer
- [ ] Prepare: Business context, goals, constraints
- [ ] Identify: Key decision makers and their priorities

### Collect Input Materials

- [ ] Place external specs in `01-templates/data-input/external-specs/`
- [ ] Place user research in `01-templates/data-input/user-research/`
- [ ] Place competitor analysis in `01-templates/data-input/competitor-analysis/`
- [ ] Add README to each `01-templates/data-input/` subfolder explaining its source

### Prepare for Discovery

- [ ] Review `00-guides-and-instructions/TEMPLATE-USAGE-GUIDE.md` (reference)
- [ ] Review `01-templates/data-output/01-discovery/README.md` (your copy)
- [ ] Prepare list of actors to identify
- [ ] Create initial scope draft (what's definitely in/out?)
- [ ] Schedule discovery kickoff meeting

**Files to work with**:
- [ ] `01-templates/data-input/` — Organize external materials
- [ ] `01-templates/data-output/01-discovery/` — Start writing your discovery

---

## Step 4: Repository Setup (30 minutes)

### Git Configuration

- [ ] Initialize/configure Git repository
- [ ] Create .gitignore (exclude temp files, secrets)
- [ ] Set up branch protection rules (require reviews)
- [ ] Create initial commit with template

### Documentation Standards

- [ ] Install markdown linter (optional)
- [ ] Set up spell check (optional)
- [ ] Configure link checker (optional)
- [ ] Define PR template for doc changes

**Commands**:
```bash
# Initialize repo (if not already done)
git init
git add .
git commit -m "docs: Add DDD Hexagonal AI Template"
git tag setup-template-initialized
```

---

## Step 5: Team Onboarding (1-2 hours)

### Share Template with Team

- [ ] Send START-HERE.txt to all team members
- [ ] Schedule template training session (30-45 min)
- [ ] Cover: Phases, phase discipline, file structure, linking
- [ ] Answer: Common questions about process

### Clarify Expectations

- [ ] Phase discipline: "What" vs "How"
- [ ] Completion criteria for each phase
- [ ] Review/approval process
- [ ] How to use AI for documentation

### Tools Setup

- [ ] Git access for all team members
- [ ] Markdown editor (VS Code, etc.)
- [ ] Optional: Collaborative writing tools (Figma for mockups, etc.)
- [ ] Optional: API tools (Postman for API specs)

**Send to team**:
- [ ] START-HERE.txt
- [ ] TEMPLATE-USAGE-GUIDE.md
- [ ] EXAMPLE-IMPLEMENTATION.md
- [ ] Phase expectations (when → what → who)

---

## Step 6: Phase 0 Completion (2-3 hours)

### Complete Planning Phase in 01-templates/data-output/

- [ ] ✅ `01-templates/data-output/00-documentation-planning/sdlc-framework.md` customized
- [ ] ✅ `01-templates/data-output/00-documentation-planning/macro-plan.md` with team and dates
- [ ] ✅ `01-templates/data-output/00-documentation-planning/navigation-conventions.md` established
- [ ] ✅ `01-templates/data-input/` organized with external materials
- [ ] ✅ Git workflow defined
- [ ] ✅ Team onboarded and trained

### Get Sign-Off

- [ ] Tech Lead reviews and approves
- [ ] Product Manager reviews and approves
- [ ] Stakeholder reviews and approves

### Create Phase Completion Tag

```bash
git add 01-templates/data-output/00-documentation-planning/
git commit -m "docs(phase-0): Complete planning framework"
git tag phase-00-planning-complete
git push origin phase-00-planning-complete
```

---

## Step 7: Ready for Discovery

### Phase 1: Discovery Prep

- [ ] Team confirmed and available
- [ ] Stakeholders identified
- [ ] Discovery meeting scheduled
- [ ] `01-templates/data-input/` materials reviewed and ready to reference
- [ ] `01-templates/data-output/01-discovery/` ready for completion

### Update Macro Plan

- [ ] Mark Phase 0 as complete (100%) in `01-templates/data-output/00-documentation-planning/macro-plan.md`
- [ ] Set Phase 1 status to "In Progress"
- [ ] Create Phase 1 kickoff meeting

### Start Phase 1

```bash
cd 01-templates/data-output/01-discovery/
# Begin filling in README.md and creating discovery documents
```

---

## Data Structure Setup

### 01-templates/data-input/ Organization

- [ ] Create subfolders in `01-templates/data-input/`:
  - [ ] `external-specs/` — External documentation
  - [ ] `user-research/` — User interviews, surveys
  - [ ] `competitor-analysis/` — Market research
  - [ ] `previous-projects/` — Reference projects
  - [ ] `standards/` — Industry standards
- [ ] Add README to each subfolder explaining its purpose
- [ ] Add materials from external sources

### 01-templates/data-output/ Customization

For your project, in `01-templates/data-output/`:
- [ ] Customize phase names (if different from 12-phase model)
- [ ] Remove phases not applicable to your project
- [ ] Add project-specific phases
- [ ] Simplify phase READMEs (remove sections that don't apply)

### Add Custom Sections

- [ ] Compliance & Legal phase (if regulated industry)
- [ ] Training & Documentation phase (for complex products)
- [ ] Customer Success phase (for B2B SaaS)
- [ ] Other: _________________________________

### Adjust File Structure

- [ ] Rename phases (if using different naming)
- [ ] Move files (if different organization preferred)
- [ ] Create sub-phases (if needed for larger scope)
- [ ] Document changes to template

---

## Documentation Platform (Optional)

If publishing documentation externally:

- [ ] Choose platform: MkDocs, GitHub Pages, Docusaurus, GitBook, etc.
- [ ] Set up automatic builds from this repository
- [ ] Configure URL and access
- [ ] Set up preview/staging environment

**Example** (MkDocs):
```bash
pip install mkdocs
mkdocs new project-docs
# Copy markdown files to docs/
mkdocs serve  # Test locally
mkdocs gh-deploy  # Deploy to GitHub Pages
```

---

## Continuous Documentation Setup (Optional)

### Automation

- [ ] Set up pre-commit hooks for markdown validation
- [ ] Configure CI/CD to check docs (no broken links, valid markdown)
- [ ] Set up spell check in CI
- [ ] Create documentation audit task (monthly)

### Monitoring

- [ ] Set up metrics on docs usage (if using analytics platform)
- [ ] Create survey for documentation feedback
- [ ] Schedule quarterly doc review with team

---

## Final Checklist

Before starting Phase 1 (Discovery):

- [ ] Project information documented
- [ ] `01-templates/data-output/00-documentation-planning/` customized with your project info
- [ ] `01-templates/data-input/` organized with external materials
- [ ] Team assigned to phases
- [ ] Dates and timeline set
- [ ] Navigation conventions established
- [ ] Git repository configured
- [ ] Team onboarded and trained
- [ ] Phase 0 marked complete in `01-templates/data-output/`
- [ ] Discovery meeting scheduled
- [ ] All customizations in `01-templates/data-output/` committed to Git
- [ ] Template files in `00-guides-and-instructions/` remain as reference (don't modify)

---

## Quick Reference: What to Update Where

| Item | File | Status |
|------|------|--------|
| Project name | README.md | [ ] |
| Team names | 01-templates/00-documentation-planning/macro-plan.md | [ ] |
| Timeline | 01-templates/00-documentation-planning/sdlc-framework.md | [ ] |
| Approval process | 01-templates/00-documentation-planning/navigation-conventions.md | [ ] |
| Domain specifics | 01-templates/01-discovery/README.md | [ ] |

---

## Support Resources

**If you get stuck**:
1. Check: `00-guides-and-instructions/FAQ.md`
2. Review: `00-guides-and-instructions/EXAMPLE-IMPLEMENTATION.md`
3. Reference: `01-templates/00-documentation-planning/navigation-conventions.md`

**For AI assistance**:
1. Use: `00-guides-and-instructions/AI-WORKFLOW-GUIDE.md`
2. Use: `00-guides-and-instructions/SKILLS-AND-PLUGINS-GUIDE.md`

---

## Timeline Estimate

| Step | Time | Status |
|------|------|--------|
| 1. Project Info | 30 min | [ ] |
| 2. Framework | 1-2 hrs | [ ] |
| 3. Discovery Prep | 1-2 hrs | [ ] |
| 4. Repo Setup | 30 min | [ ] |
| 5. Team Training | 1-2 hrs | [ ] |
| 6. Phase 0 | 2-3 hrs | [ ] |
| 7. Ready Check | 30 min | [ ] |
| **Total** | **6-10 hrs** | [ ] |

**Typical schedule**: 1-2 days of focused work

---

## Next: Phase 1 Discovery

Once this checklist is complete:

1. Open: `01-templates/01-discovery/README.md`
2. Start: `01-templates/01-discovery/TEMPLATE-context-motivation.md`
3. Invite: Stakeholders for kickoff
4. Document: Vision, problem, scope

---

**Checklist Last Updated**: [DATE]  
**Completed by**: [NAME]  
**Date Completed**: [DATE]

---

🎉 **Congratulations!** Your documentation framework is now ready for your project.

Start with Phase 1: Discovery. Good luck!
