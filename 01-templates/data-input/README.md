# Data Input

This directory contains external documentation, previous specifications, and reference materials used as input for this project's documentation.

## Purpose

- **External Research**: Market research, competitor analysis, industry standards
- **Legacy Documentation**: Previous project specifications, old architecture docs
- **Reference Materials**: Similar projects, best practices, standards documentation
- **User Research**: Interviews, surveys, feedback from users or stakeholders
- **Raw Data**: Requirements from stakeholders, specifications from clients

## Organization

```
01-templates/data-input/
├── external-specs/              # External documentation
├── user-research/               # User interviews, feedback, surveys
├── competitor-analysis/         # Market and competitor research
├── previous-projects/           # Reference from similar projects
├── standards/                   # Industry standards and best practices
└── raw-materials/               # Unstructured input for processing
```

## Workflow

1. **Collect**: Place all external materials here
2. **Reference**: Use to inform documentations in `../01-templates/data-output/`
3. **Extract**: Pull key insights for each phase
4. **Link**: Document what inputs informed which outputs
5. **Archive**: Keep as reference for future decisions

## Guidelines

- **Don't modify original materials**: Keep inputs as-is for reference
- **Add context**: Each folder should have a README explaining its source
- **Date materials**: Note when materials were created/collected
- **Link to outputs**: Note which `01-templates/data-output/` documents use this input
- **Version control**: Commit all materials to track changes

## Example Entry

```
## Folder: user-research-2024-Q1

**Source**: Customer interviews, survey responses
**Date Collected**: January - March 2024
**Sample Size**: 15 interviews, 200 survey responses
**Key Insights**:
- Users struggle with task assignment workflows
- Performance is critical for remote teams

**Used In**:
- 01-discovery/actors-and-personas.md
- 02-requirements/functional-requirements.md (FR-005)
```

---

**Last Updated**: [DATE]  
**Manager**: [NAME]
