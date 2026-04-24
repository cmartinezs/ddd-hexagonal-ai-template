[← UI Index](./README.md)

---

# Design System Template

**What This Is**: The visual language of the product — colors, typography, spacing, components, and interaction patterns.

**How to Use**: Use as reference when creating screens. Design system ensures consistency across all screens.

**When to Use**: Products with user interface. For APIs or backend-only, skip this template.

**Owner**: UX Designer

---

## Sections

### Color Palette

**What to include**: Define 5–8 core colors that cover brand identity, semantic states, and neutral hierarchy.
- **Brand colors** (2): Your distinctive primary (main actions, links) and secondary (supporting elements)
- **Semantic colors** (3): Success (positive feedback), warning (caution states), error (user errors)
- **Neutral colors** (2–3): Text, borders, backgrounds for contrast and hierarchy

| Color | Usage | Hex |
|-------|-------|-----|
| Brand Primary | Main actions, links | #000000 |
| Brand Secondary | Supporting elements | #000000 |
| Success | Positive feedback | #000000 |
| Warning | Caution states | #000000 |
| Error | Error states | #000000 |
| Neutral | Text, borders | #000000 |

### Typography

**What to include**: Define 4–6 text styles for headings, body copy, and metadata. Each style includes font family, size, weight, and line-height for consistent visual hierarchy.

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | [Font] | 24px | Bold |
| H2 | [Font] | 20px | Bold |
| Body | [Font] | 16px | Regular |
| Caption | [Font] | 12px | Regular |

### Spacing System

**What to include**: Define a consistent base unit (commonly 4px or 8px) and document standard margin and padding values. Consistency here prevents chaotic whitespace and makes layouts more predictable.

- Base unit: 4px or 8px grid
- Margins: [standard sizes]
- Padding: [standard sizes]

### Component Library

**What to include**: Define the interactive elements users will interact with. For each component (Button, Input, Card, etc.), document its states (default, hover, active, disabled, loading, error) so developers build consistency.

| Component | States | Usage |
|-----------|--------|-------|
| **Button** | default, hover, active, disabled, loading | Primary actions |
| **Input** | default, focus, error, disabled | Data entry |
| **Select** | default, open, disabled | Single choice |
| **Card** | default, hover | Content containers |
| **Modal** | open, closed | Focused tasks |

### Interaction Patterns

**What to include**: Document how users interact with the system across common scenarios. These patterns ensure the experience feels consistent and predictable—users know what to expect when they hover, focus, or wait for data.

- Hover: Visual feedback on interactive elements
- Focus: Visible focus indicator for accessibility
- Loading: Loading states for async operations
- Empty: How to display when no data

---

## Completion Checklist

- [ ] Colors defined with usage
- [ ] Typography defined
- [ ] Spacing system documented
- [ ] Components documented with states
- [ ] Interaction patterns defined

---

[← UI Index](./README.md)