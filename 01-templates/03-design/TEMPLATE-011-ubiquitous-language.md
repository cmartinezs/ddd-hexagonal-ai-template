[← Index](./README.md) | [< Previous](./TEMPLATE-008-system-flows.md) | [Next >](./TEMPLATE-012-domain-events.md)

---

# Ubiquitous Language Template

Use this template to document the shared vocabulary between business experts and the engineering team. This is not a technical glossary or database dictionary — it is the language that both sides use when talking about the domain. When a term in this document changes, the model changes. When a term is used inconsistently across the team, this document corrects it.

Apply this template when using DDD on complex domains with multiple teams or context boundaries. Define terms by bounded context — the same word may mean different things in different contexts, and that is intentional.

**Owner**: Domain Expert + Architect

---

## Contents

- [How to Read This Document](#how-to-read-this-document)
- [Cross-Context Terms](#cross-context-terms)
- [Terms by Context](#terms-by-context)
- [Ambiguities Resolved](#ambiguities-resolved)
- [Domain Verbs](#domain-verbs)
- [Completion Checklist](#completion-checklist)

---

## How to Read This Document

Before filling in any section, understand the conventions used throughout. Applying them consistently ensures that terms are unambiguous and that future readers (both human and AI agents) interpret the vocabulary correctly.

Each term entry includes:

- **Definition**: What it means in this context
- **Context**: Which bounded context it applies to (if multiple, indicated)
- **Not to be confused with**: Clarifications about similar terms or the same term in another context

**Terms marked with ⚠️ are risk terms**: Words used colloquially with ambiguous meaning that have a precise, unique meaning in this system. Pay special attention to these when reviewing or consuming this document.

---

## Cross-Context Terms

Identify and define terms that apply as constraints or concepts across all bounded contexts — not specific to any one context. These are typically architectural invariants or shared identifiers.

| Term | Definition |
|------|------------|
| **[Term]** | [Definition - applies everywhere as constraint] |
| **[Term]** | [Definition - applies everywhere as constraint] |

---

## Terms by Context

For each bounded context identified in the strategic design, list the terms that have specific meanings within that context. Begin each subsection with a one-sentence description of what the context manages, so that readers understand the frame of reference before interpreting the terms.

### Context Name: [Context 1]

The [Context 1] context manages [what it does].

| Term | Definition |
|------|------------|
| **[Concept 1]** ⚠️ | [Precise definition] |
| **[Concept 2]** | [Definition] |
| **[Concept 3]** | [Definition] |

**[Not to be confused with]**: In [Other Context], [Term] means [different thing].

### Context Name: [Context 2]

The [Context 2] context manages [what it does].

| Term | Definition |
|------|------------|
| **[Concept 1]** | [Definition] |
| **[Concept 2]** ⚠️ | [Definition with nuance] |

---

## Ambiguities Resolved

List every term that appears in more than one context with different meanings. This table is the authoritative reference for resolving naming conflicts during design reviews, development, and code review. Every entry here corresponds to a deliberate modeling decision.

| Term | In Context A | In Context B | In Context C |
|------|-------------|-------------|-------------|
| **User** | [Meaning in A] | [Meaning in B] | [Meaning in C] |
| **Account** | [Meaning in A] | [Meaning in B] | [Meaning in C] |
| **Role** | [Meaning in A] | [Meaning in B] | — |
| **Session** | [Meaning in A] | — | — |

---

## Domain Verbs

**What are domain verbs?** Domain verbs are the specific actions and operations that matter to your business. They are not generic ("handle", "process", "manage", "update") but precise to your domain ("authenticate", "reserve inventory", "settle payment", "suspend account"). Every domain verb becomes part of your ubiquitous language—shared between domain experts and engineers.

**How to identify them**: Scan your system flows (SF-XXX documents) and domain events. Every action or state transition should have a precise verb. If you find yourself writing "the system processes the order," stop—what specifically? Does it validate? Reserve? Confirm? Each of those is a different domain verb.

Identify the actions that actors and the system perform within the domain. Naming them precisely is part of the ubiquitous language — vague verbs ("handle", "process", "manage") are not acceptable here. Use specific, domain-meaningful terms.

| Verb | Who Performs | Description |
|------|-------------|-------------|
| **Authenticate** | [Actor] | [What happens] |
| **Authorize** | [Actor] | [What happens] |
| **Create** | [Actor] | [What happens] |
| **Update** | [Actor] | [What happens] |
| **Delete** | [Actor] | [What happens] |
| **Validate** | System | [What happens] |
| **Emit** | System | [What happens] |
| **Publish** | System | [What happens] |

---

## Completion Checklist

Before closing this document, verify that all sections are complete and that no term is left undefined or ambiguous.

### Deliverables

- [ ] Cross-context terms defined (apply everywhere)
- [ ] Terms by bounded context documented
- [ ] Ambiguities resolved (same term, different contexts)
- [ ] Domain verbs defined
- [ ] Examples provided for each term
- [ ] Risk terms (⚠️) clarified

### Sign-Off

- [ ] **Prepared by**: [Domain Expert], [Date]
- [ ] **Reviewed by**: [Architect], [Date]
- [ ] **Approved by**: [Tech Lead], [Date]

---

[← Index](./README.md) | [< Previous](./TEMPLATE-008-system-flows.md) | [Next >](./TEMPLATE-012-domain-events.md)
