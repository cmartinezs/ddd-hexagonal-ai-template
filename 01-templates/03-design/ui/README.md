# UI/UX Design — Templates

You are an AI agent documenting user interface and experience design decisions. This folder contains templates for design systems, UX decisions, and screen inventories that guide both visual design and user interaction patterns.

**What This Is**: Templates for UI/UX design documentation (design system, UX decisions, screen inventory)  
**How to Use**: Use design system for visual language consistency, UX decisions for interaction rationale, and screen inventory to map user navigation  
**Why It Matters**: Explicit design documentation ensures UI consistency, guides development, and enables user research validation  
**When to Use**: During Phase 3 (Design), when documenting user-facing interfaces and interactions  
**Owner**: UX/Design Lead + Engineer

---

## Documents

| Document | Purpose | File |
|----------|---------|------|
| **Design System** | Visual principles, component language, interaction patterns | [TEMPLATE-design-system.md](./TEMPLATE-design-system.md) |
| **UX Decisions** | Design decisions with alternatives and justification | [TEMPLATE-ux-decisions.md](./TEMPLATE-ux-decisions.md) |
| **Screen Inventory** | Screens by portal, navigation flow, and purpose | [TEMPLATE-screen-inventory.md](./TEMPLATE-screen-inventory.md) |

---

## When to Use These Templates

Use UI/UX templates when your product has a user interface:

- **Design System**: Define visual language (colors, typography, spacing, components)
- **UX Decisions**: Document why certain interactions were designed that way
- **Screen Inventory**: Map all screens and how users navigate between them

---

## Design → Requirements Connection

Every screen must trace to a functional requirement:

| Requirement | Screen |
|--------------|--------|
| FR-001: User Registration | Registration Screen → SF-001 |
| FR-010: Login | Login Screen → SF-010 |

---

## Templates

### TEMPLATE-design-system.md

Defines the visual language of the product:

- Color palette (brand, semantic, neutral)
- Typography (headings, body, captions)
- Spacing system (grid, margins, padding)
- Component library (buttons, inputs, cards, etc.)
- Interaction patterns (hover, focus, loading states)

### TEMPLATE-ux-decisions.md

Documents design decisions with alternatives considered:

- Decision: What was decided
- Alternatives: What was considered
- Justification: Why this was chosen
- Trade-offs: What was sacrificed

### TEMPLATE-screen-inventory.md

Maps all screens in the product:

- Screen name and purpose
- Which requirement it satisfies
- Navigation (how to get there)
- Key elements on screen
- User actions possible

---

## Phase Discipline Rules

✅ **Before moving to Data Model, verify**:

1. ✅ Every requirement has a screen (or explicit "no UI")
2. ✅ Design system is documented if multiple screens
3. ✅ No technology in design docs (that's development)
4. ✅ UX decisions have justification (not just preference)

---

[← Back to Design Index](../README.md)