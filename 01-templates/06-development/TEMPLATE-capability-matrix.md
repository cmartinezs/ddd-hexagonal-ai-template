[← Index](./README.md)

---

# Capability Matrix

## Purpose

Matrix to track system capabilities organized by Bounded Context.

> **Note**: This is a template. Fill in your own capabilities per context.

---

## Template Structure

```markdown
| Capability | Status | RF | UC | Horizon | Effort | Proposal | Description |
|------------|--------|---|----|--------|--------|----------|-------------|
| **[Context]: [Name]** | 🔲 | RF-X | UC-X | QX | Xh | — | [What it does] |
```

### Status Values

| Status | Meaning |
|--------|---------|
| ✅ Complete | Fully implemented |
| 🟡 Partial | Partially implemented |
| 🔲 Pending | Not yet implemented |

### Horizon Values

| Horizon | Timeline |
|---------|----------|
| Q1 | Short-term (0-3 months) |
| Q2 | Medium-term (3-6 months) |
| Q3 | Long-term (6-9 months) |
| Q4+ | Future (9+ months) |

---

## Examples

### Example: E-Commerce Context

| Capability | Status | RF | UC | Horizon | Effort | Proposal | Description |
|------------|--------|---|----|--------|--------|----------|-------------|-------------|
| **E1: Product Catalog** | ✅ | RF-E1 | UC-E1 | Q1 | 16h | — | Browse/search products |
| **E2: Shopping Cart** | ✅ | RF-E2 | UC-E2 | Q1 | 12h | — | Add/remove items |
| **E3: Checkout** | 🟡 | RF-E3 | UC-E3 | Q1 | 20h | P-001 | Payment integration (partial) |
| **E4: Order History** | 🔲 | RF-E4 | UC-E4 | Q2 | 8h | — | View past orders |
| **E5: Wishlist** | 🔲 | RF-E5 | UC-E5 | Q2 | 6h | — | Save items for later |
| **E6: Product Reviews** | 🔲 | RF-E6 | UC-E6 | Q3 | 10h | — | User reviews/ratings |
| **E7: Inventory Alerts** | 🔲 | RF-E7 | UC-E7 | Q3 | 8h | — | Low stock notifications |

### Example: User Management Context

| Capability | Status | RF | UC | Horizon | Effort | Proposal | Description |
|------------|--------|---|----|--------|--------|----------|-------------|-------------|
| **U1: Registration** | ✅ | RF-U1 | UC-U1 | Q1 | 6h | — | User sign-up flow |
| **U2: Login** | ✅ | RF-U2 | UC-U2 | Q1 | 8h | — | Email/password auth |
| **U3: Profile** | ✅ | RF-U3 | UC-U3 | Q1 | 4h | — | View/edit profile |
| **U4: Password Reset** | 🟡 | RF-U4 | UC-U4 | Q1 | 6h | P-002 | Email verification pending |
| **U5: Sessions** | 🔲 | RF-U5 | UC-U5 | Q2 | 8h | — | Manage active sessions |
| **U6: OAuth Login** | 🔲 | RF-U6 | UC-U6 | Q3 | 12h | — | Google/GitHub login |

---

## Template:Context Name

| Capability | Status | RF | UC | Horizon | Effort | Proposal | Description |
|------------|--------|---|----|--------|--------|----------|-------------|
| **C1:** | 🔲 | | | | | | |

---

## Fill This Template

1. **Define your Bounded Contexts**
   - What are the main domains in your system?

2. **List capabilities per context**
   - What can the system do in each context?

3. **Map to requirements (RF)**
   - Which requirement does this capability fulfill?

4. **Assign use case (UC)**
   - Which use case uses this capability?

5. **Set horizon**
   - When is this planned?

6. **Estimate effort**
   - How many hours?

---

## Coverage Summary (to fill after completing)

### By Status

| Status | Qty | % |
|--------|------|---|
| ✅ Complete | | |
| 🟡 Partial | | |
| 🔲 Pending | | |
| **TOTAL** | | |

### By Horizon

| Horizon | Qty | Effort |
|---------|-----|--------|
| Q1 | | |
| Q2 | | |
| Q3 | | |
| Q4+ | | |

---

## Dependencies (to document)

```
[Context A]
       ↓
[Context B]
       ↓
[Context C]
```

---

[← Index](./README.md)