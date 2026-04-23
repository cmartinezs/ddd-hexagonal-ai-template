# Contributing to DDD + Hexagonal Documentation Template

Thank you for your interest in making this template better! This project thrives on community feedback, real-world usage, and continuous refinement.

---

## 🤝 Ways to Contribute

### 1. Report Issues
Found a broken template, unclear instruction, or missing section?

- **Check existing issues** first to avoid duplicates.
- **Use the issue template** when available.
- Provide:
  - What you expected vs. what happened
  - Steps to reproduce (if applicable)
  - Suggested fix or improvement

### 2. Propose Enhancements
Have an idea for a new section, better prompt, or additional phase?

- Open a **Feature Request** issue first to discuss.
- Explain the use case and who benefits.
- If accepted, follow the Pull Request process below.

### 3. Fix Bugs or Improve Docs
Small fixes are always welcome!

- Typos, broken links, or unclear wording.
- Better examples in `EXAMPLE-IMPLEMENTATION.md`.
- Translations (see below).

### 4. Share Your Experience
Used this template for a real product? We'd love to hear about it!

- Share in **Discussions**.
- Provide anonymized excerpts (with permission).

---

## 📝 Pull Request Process

1. **Fork** the repository.
2. **Create a branch** from `main`:
   ```bash
   git checkout -b fix/short-description
   # or
   git checkout -b feat/short-description
   ```
3. **Make your changes**:
   - Follow the existing markdown style.
   - Keep language in English throughout (templates, guides, and documentation).
   - Update `AGENTS.md` if your change affects AI workflow or conventions.
4. **Test your changes**:
   - Verify all markdown links work.
   - If modifying a template, test it with an AI assistant.
5. **Commit** with a clear message:
   ```
   fix: clarify actor template instructions
   feat: add monitoring dashboard template
   docs: improve setup checklist wording
   ```
6. **Open a Pull Request**:
   - Describe what changed and why.
   - Reference any related issues.
   - Ensure CI checks pass (if enabled).

---

## 🎯 Quality Guidelines

### Template Changes
- **Agnostic-first**: Phases 1-5 must remain technology-agnostic.
- **Complete**: Every new template must include:
  - Purpose statement
  - Structure/outline
  - Validation checklist
  - Navigation links (previous/next/index)
- **Consistent**: Follow the existing `TEMPLATE-*.md` format.

### Instruction Changes
- **Actionable**: Every instruction must lead to a concrete output.
- **AI-friendly**: Prompts should be copy-paste ready.
- **Validated**: If you change a prompt, test it with at least one LLM.

---

## 🌍 Translations

We welcome translations of guides and templates!

- Create a folder named `translations/<language-code>/` (e.g., `translations/es/`).
- Translate the README and core guides first.
- Maintain the same folder structure as the original.
- Note: Official maintenance will be in English; translations are community-supported.

---

## ❓ Questions?

- Open a **Discussion** for general questions.
- Open an **Issue** for bugs or concrete proposals.
- Check `FAQ.md` and `AGENTS.md` first.

---

**Thank you for helping teams document better products!**
