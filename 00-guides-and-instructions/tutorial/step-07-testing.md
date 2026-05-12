[← Tutorial README](./README.md) | [< Previous](./step-06-development.md) | [Next >](./step-08-deployment.md)

---

# Step 07: Testing

**What This Is**: Defining how the system will be tested — the testing pyramid, coverage targets, tools, and quality gates. Testing strategy ensures code reliability before deployment.

**How to Use**: Define the test strategy (pyramid levels and targets), then create test plans and test cases per functional requirement.

**Why It Matters**: Clear testing strategy prevents under-testing, flaky tests, and shipped bugs. It sets explicit quality expectations that every developer can follow.

**When to Use**: Parallel with or immediately after Development specs (Phase 6). Before Deployment (Phase 8).

**Owner**: QA Lead / Tech Lead.

---

## Contents

1. [Goal](#1-goal)
2. [Prerequisites](#2-prerequisites)
3. [Instructions](#3-instructions)
4. [AI Prompt](#4-ai-prompt)
5. [Done Check](#5-done-check)
6. [Next Step](#6-next-step)

---

## 1. Goal

Produce the Testing package for your project:

- `test-strategy.md` — testing pyramid, coverage targets, tools, quality gates
- `test-plan.md` — test cases per functional requirement
- `unit-tests.md` — patterns and conventions for unit tests
- `integration-tests.md` — patterns for integration tests

---

## 2. Prerequisites

- [ ] Phase 6 (Development) specs are defined — architecture and APIs are documented
- [ ] Phase 2 (Requirements) is complete — all functional requirements are available
- [ ] You have read [`INSTRUCTIONS-FOR-AI.md`](../../INSTRUCTIONS-FOR-AI.md) section "PHASES 8–12"
- [ ] You have access to `01-templates/07-testing/`

---

## 3. Instructions

1. **Exercise — Testing Pyramid Definition**
   - Define the test distribution for your project

   | Level | Proportion | What to Test | Tools |
   |-------|------------|--------------|-------|
   | Unit | 60% | Domain logic, business rules, value objects | [your unit framework] |
   | Integration | 30% | Repository implementations, API adapters, domain services | [your integration framework] |
   | E2E/Smoke | 10% | Critical user flows, happy paths | [your e2e framework] |

   - Set coverage targets: e.g., 80% line coverage for unit tests
   - Define quality gates: what must pass before merging

2. **Generate `test-strategy.md`**
   - Testing pyramid with proportions and rationale
   - Coverage targets per level (line, branch, mutation)
   - Tools and frameworks selected
   - Quality gates: CI must pass before merge
   - Test data management strategy

3. **Generate `unit-tests.md`**
   - Patterns: Arrange-Act-Assert, Given-When-Then
   - Naming conventions: `ClassName.method_should_X_when_Y`
   - What to test (domain logic, invariants) vs. what to skip (trivial getters)
   - Mocking strategy: mock external adapters, not domain logic

4. **Generate `integration-tests.md`**
   - Real database, real dependencies
   - Test repository implementations against the actual schema
   - Test API adapters end-to-end

5. **Generate `test-plan.md`**
   - One test case per functional requirement (from Phase 2)
   - Per case: preconditions, steps, expected result, priority
   - Trace each test case to its corresponding FR
   - Mark MVP tests as mandatory; Phase 2 tests as follow-up

> **Technology-specific**: This phase names testing tools and frameworks. Match the stack defined in Phase 6.

---

## 4. AI Prompt

> Copy the prompt below, replace placeholders with your tech stack, and use it to generate the Testing documents.

```
# Context
[Phase 6 technology stack: frameworks and tools]
[Phase 2 functional requirements: list of FRs]
[Phase 3 bounded contexts]
Project: [your project name]

# Task
Generate:
- "01-templates/07-testing/test-strategy.md" — pyramid, targets, tools, quality gates
- "01-templates/07-testing/unit-tests.md" — patterns and conventions
- "01-templates/07-testing/integration-tests.md" — patterns for integration tests
- "01-templates/07-testing/test-plan.md" — test cases per FR

# Test Strategy Requirements
- Testing pyramid with proportions (60% unit, 30% integration, 10% e2e)
- Coverage targets: e.g., 80% line coverage for unit tests
- Tools: [your testing frameworks and libraries]
- Quality gates: CI must pass before merge

# Test Plan Requirements
- One test case per FR (from Phase 2)
- Per case: preconditions, steps, expected result, priority (P0/P1/P2)
- MVP tests marked as mandatory
- Trace each test case to its FR ID

# Validation
- [ ] Does each FR have at least one test case?
- [ ] Are MVP requirements covered by P0 tests?
- [ ] Does the pyramid distribution make sense for the team size?
- [ ] Are quality gates explicit (what must pass before merge)?
```

---

## 5. Done Check

- [ ] `test-strategy.md` defines the pyramid with proportions and tools
- [ ] Coverage targets are quantified (e.g., 80% line coverage)
- [ ] `unit-tests.md` has naming conventions and patterns defined
- [ ] `integration-tests.md` covers repository and adapter testing
- [ ] `test-plan.md` has at least one test case per FR
- [ ] MVP requirements are covered by P0 tests
- [ ] Quality gates are defined for CI (what must pass before merge)
- [ ] Each test case traces to an FR from Phase 2
- [ ] QA Lead has reviewed and signed off

---

## 6. Next Step

Proceed to [Step 08: Deployment](./step-08-deployment.md) — define the CI/CD pipeline, environments, and release procedures. Connect versioning to the roadmap from Phase 5.

[← Tutorial README](./README.md) | [< Previous](./step-06-development.md) | [Next >](./step-08-deployment.md)