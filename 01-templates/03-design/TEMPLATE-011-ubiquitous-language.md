[← Index](./README.md) | [< Previous](./TEMPLATE-008-system-flows.md) | [Next >](./TEMPLATE-012-domain-events.md)

---

# Ubiquitous Language Template

**What This Is**: The shared vocabulary between business and engineering. Not a technical glossary or database dictionary — it's the language that business experts and engineers both use. When this language changes, the model changes.

**How to Use**: Define terms by context. The same term can have different meanings in different bounded contexts — that's intentional and healthy.

**Why It Matters**: Without shared language, teams translate between "business speak" and "tech jargon," creating miscommunication. Ubiquitous language prevents this and creates traceability from code to concepts.

**When to Use**: Using DDD approach. For complex domains with multiple teams or concepts.

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

Each term includes:

- **Definition**: What it means in this context
- **Context**: Which bounded context it applies to (if multiple, indicated)
- **Not to be confused with**: Clarifications about similar terms or the same term in another context

**Terms marked with ⚠️ are risk terms**: Words used colloquially with ambiguous meaning that have a precise, unique meaning in this system.

---

## Cross-Context Terms

Terms that apply across all contexts as design constraints, not as specific context concepts.

| Term | Definition |
|------|------------|
| **[Term]** | [Definition - applies everywhere as constraint] |
| **[Term]** | [Definition - applies everywhere as constraint] |

---

## Terms by Context

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

These terms appear in multiple contexts with different meanings. This establishes canonical meaning in each.

| Term | In Context A | In Context B | In Context C |
|------|-------------|-------------|-------------|
| **User** | [Meaning in A] | [Meaning in B] | [Meaning in C] |
| **Account** | [Meaning in A] | [Meaning in B] | [Meaning in C] |
| **Role** | [Meaning in A] | [Meaning in B] | — |
| **Session** | [Meaning in A] | — | — |

---

## Domain Verbs

Domain verbs are actions the system performs or actors execute. Naming them precisely is part of the language.

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