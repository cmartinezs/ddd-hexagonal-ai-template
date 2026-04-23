[← Index](./README.md) | [< Previous](./TEMPLATE-042-lessons-learned.md)

---

# Documentation Maintenance

Guide for treating documentation as a living system, with updates tied to code changes, regular audits, and team accountability.

## Contents

1. [Living System vs Static](#living-system-vs-static)
2. [Update Triggers](#update-triggers)
3. [Feedback Loops](#feedback-loops)
4. [Quality Metrics](#quality-metrics)
5. [Process: Adding New Docs](#process-adding-new-docs)
6. [Process: Updating Docs](#process-updating-docs)
7. [Anti-Patterns](#anti-patterns)

---

## Living System vs Static

### Comparison

| Approach | Description | Outcome |
|----------|-------------|---------|
| **Static** | Write once, reference forever | Docs become stale |
| **Living** | Updated when code changes, tested regularly | Docs stay current |

### Living System Principles

- **Docs updated when code changes**: Same PR/commit as code
- **Docs tested**: Broken links checked, examples runnable
- **Team accountability**: Owner per document
- **Regular audits**: Quarterly reviews

### Ownership Model

Every document has:

| Field | Description |
|-------|-------------|
| **Owner** | Who maintains it |
| **Last Updated** | When last reviewed |
| **Next Review** | When to audit |

---

## Update Triggers

### When to Update Docs

| Change Type | Docs to Update | Timing |
|-------------|----------------|--------|
| New API endpoint added | API endpoints doc | Same commit |
| Breaking API change | API endpoints, versioning | Before merge |
| New validation rule | Validation strategy | Same PR |
| Security vulnerability fixed | Security guide | Security PR |
| New testing pattern | Test plans | Same commit |
| New deployment procedure | Runbooks | Before rollout |
| New error code | API error reference | Same PR |
| Component pattern discovered | Component patterns | Next cycle |

### PR Review Checklist

```
[ ] Code changes reflected in docs?
    - New API? → API docs updated
    - New validation? → Validation doc updated
    - Breaking change? → Versioning marked deprecated
[ ] Examples in docs still work?
[ ] Cross-references still valid?
[ ] README.md index updated if new doc created?
```

---

## Feedback Loops

### Quarterly Documentation Audit

**Every quarter:**

1. **Broken Links Scan** (30 min)
   - Automated in CI/CD on every push

2. **Example Code Validation** (1 hour)
   - Run curl examples from API docs
   - Verify code snippets compile
   - Check screenshots current

3. **Owner Review** (30 min per doc)
   - Owner reads their doc
   - Updates "Last Updated" date
   - Flags changes needed

4. **Team Retro** (1 hour)
   - "What docs helped this quarter?"
   - "What docs were outdated?"
   - "What new docs are needed?"

### Continuous Feedback

**Channel**: Slack, Teams, or similar

When someone:
- Finds broken example → Post in feedback channel
- Notices outdated section → Add comment in doc
- Suggests improvement → Create issue with `documentation` label

---

## Quality Metrics

### Health Checks

| Metric | Target | Tool | Frequency |
|--------|--------|------|-----------|
| **Broken Links** | 0 | linkchecker | CI/CD (every push) |
| **Examples Working** | 100% | manual test | Quarterly |
| **Last Updated < 3 months** | 95% | script | Quarterly |
| **Cross-references Valid** | 100% | grep | Quarterly |

### Dashboards

Create metrics dashboard:

```
Docs Health Panel:
  - Total docs: XX
  - Updated this month: X (XX%)
  - Broken links: 0
  - Examples failing: 0
  - Owners without review: X
```

---

## Process: Adding New Docs

### 1. Identify Need

```
"Team needs to understand how to implement X"
→ Create documentation PR
```

### 2. Create Document

```markdown
# Document Title

**Phase:** XX-name | **Audience:** Who reads | **Status:** Draft | **Version:** 1.0

---

## Contents

1. [Section]

---

## Section

Content here.

---

**Last Updated:** YYYY-Q1 | **Owner:** [Name] | **License:** Project Docs
```

### 3. Cross-Reference

- Add link to parent README.md index
- Link to related docs
- Update macro-plan.md if new doc

### 4. Commit

```bash
git add docs/new-doc.md
git commit -m "docs(phase): Add new-topic doc

- new-doc.md (X KB): Description
  Purpose: What problem does this solve.

Relates to [other docs], extends [feature area]."
```

### 5. Announce

Post in team channel with link and 1-liner.

---

## Process: Updating Docs

### Small Update (typo, clarification)

1. Edit directly in file
2. Commit: `docs(phase): Fix typo in doc-name.md`

### Medium Update (section rewrite, new example)

1. Check if other docs reference this section
2. Update cross-references if needed
3. Commit: `docs(phase): Update section in doc-name.md`

### Major Update (new structure, deprecation)

1. Discuss in team channel or meeting
2. Update related docs first
3. Update README.md index if structure changed
4. Commit: `docs(phase): Refactor doc-name.md for clarity`

---

## Anti-Patterns

### Documentation Debt

```
"We'll document it later"
→ Later never comes → Docs become stale → Team stops reading
```

**Fix**: Docs updated same commit/PR as code change.

### Silos (Doc-per-team)

```
Backend docs separate from Frontend docs
→ Cross-team features undocumented → Integration fails
```

**Fix**: All docs in single repo, organized by SDLC phase.

### Theory vs Practice

```
"Design pattern: Factory" (abstract)
→ No code example → Team doesn't know how to apply
```

**Fix**: Every pattern includes 3-5 real examples + anti-patterns.

### Dead Links

```
"See details in ../path/to/doc.md"
→ Doc renamed/moved → Link broken → Team frustrated
```

**Fix**: CI/CD scan for broken links, reference by title in text.

---

## Completion Checklist

### Deliverables
- [ ] Owner assigned per document
- [ ] Update triggers documented
- [ ] Audit cadence defined
- [ ] Quality metrics configured
- [ ] Anti-patterns documented

### Sign-Off
- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Tech Lead, Date]
- [ ] Approved by: [Architecture Lead, Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-042-lessons-learned.md)