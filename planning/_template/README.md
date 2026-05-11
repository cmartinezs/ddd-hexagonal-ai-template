# 📐 Planning Templates

> [← planning/README.md](../README.md)

Templates for creating new plannings. Copy this entire `_template/` directory to `planning/NNN-name/` when starting a new planning.

---

## Files in this directory

| File | Purpose |
|------|---------|
| [`00-initial.md`](00-initial.md) | INITIAL phase — general intent and context |
| [`01-expansion.md`](01-expansion.md) | EXPANSION phase — scopes and dependencies |
| [`02-deepening/scope-NN-name.md`](02-deepening/scope-NN-name.md) | DEEPENING phase — one file per scope |
| [`TRACEABILITY.md`](TRACEABILITY.md) | Term traceability matrix for this planning |
| [`pdr-NNN-title.md`](pdr-NNN-title.md) | Project Decision Record template |

---

## Usage

```bash
# 1. Copy the template to a new planning directory
cp -r planning/_template/ planning/001-name-of-planning/

# 2. Fill 00-initial.md with intent
# 3. When ready: fill 01-expansion.md and move to active/
# 4. Create scope files in 02-deepening/ for each scope
```

---

> [← planning/README.md](../README.md)
