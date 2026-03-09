# TC Generation Patterns – Good Practices

This document defines **generic lineamientos** (guidelines) for designing test cases that are **well-structured**, **non-duplicative**, and **high-value**. Apply these principles to any User Story; the agent must read and apply them when generating TCs.

**Goal:** Reduce duplication, consolidate coverage, and maximize value within the 16-TC-per-US limit. Use **zephyr-reference/** XML exports as real-world examples for naming, step structure, and consolidation. **No minimum per label:** generate only the TCs the US and AC justify (e.g. a single functional_test can be enough); add static_text_test and ui_design_test only when the US/AC require them.

---

## 1. One TC per behavior theme

- **Prefer** one test case per **behavior theme** or **user flow**: cover all relevant states or variants in a single TC with a clear sequence of steps.
- **Avoid** splitting the same behavior into many TCs that only change one condition (e.g. one TC per “disabled when field A empty”, “disabled when field B empty”, “enabled when both filled”). If one flow can demonstrate all cases, use **one TC** with multiple steps.
- **Rule of thumb:** If several TCs share the same setup and only differ by one input or one assertion, consider merging them into one TC with a full flow.

---

## 2. Combine related static and empty-state checks

- **Prefer** one **static_text_test** that covers **all related static content** in a single flow: list/grid empty state, form/page title, labels, placeholders, section titles, and empty-state messages that belong to the same view or user story.
- **Avoid** separate TCs for “navigate to page”, “empty state on list”, “labels on form”, “empty state in section” when they can be **one continuous flow** (one TC with several steps). Navigation and empty states are usually **steps** of another TC, not standalone TCs.
- **Exception:** Use separate TCs only when the US has clearly distinct views or entry points that justify separate coverage.

---

## 3. UI design: cover responsiveness when it matters

- When the UI is **responsive** (layout or visibility changes by viewport), **prefer** one **ui_design_test** that includes **viewport breakpoints** and explicit layout/visibility expectations per breakpoint.
- **Canonical viewport sizes** (use these consistently): **XL** = 1920px, **L** = 1280px, **M** = 1024px, **S** = 768px.
- **One step per viewport size in scope:** Create **exactly one step** for each viewport size that the user or Acceptance Criteria require. If only two sizes are in scope (e.g. XL and S), write **two steps**, each with action (e.g. *Set viewport to XL (1920px)*) and expected result for that size. If all four sizes are in scope, write **four steps**. Do not combine multiple viewports in a single step.
- **Avoid** a generic “verify layout” with one or two steps when the design specifies different behavior at different sizes. The number of steps must match the number of viewport sizes in scope.
- When the UI is **not** responsive or breakpoints are out of scope, keep the ui_design_test focused on structure and placement without inventing breakpoints.

---

## 4. Group similar validations in one TC

- When the AC specifies **the same type of rule for several elements** (e.g. max length, required, format) and the test flow is the same, **prefer** one TC that verifies all of them in sequence.
- **Avoid** one TC per element when the steps and intent are the same; merging reduces duplication and maintenance.
- **Exception:** Use separate TCs when the flows, risks, or systems under test differ clearly.

---

## 5. No redundant TCs

- Do **not** add TCs that only repeat what another TC already proves. For example: if one TC already validates “primary action disabled until required fields are complete” by cycling through empty and filled states, do **not** add extra TCs that only assert “field X is required” or “field Y is required.”
- Before adding a new TC, ask: **Does this add new behavior or new risk, or does it only restate an existing TC?**

---

## 6. Preconditions: specific and useful

- Preconditions should include **role** (or permission), **navigation path** (where the test starts), and **data/state** when it affects the outcome (e.g. “no data”, “at least one record”).
- **Avoid** vague preconditions (e.g. “User is logged in”) when the US implies a specific role or path; use the exact terms from the US or AC.

---

## 7. Steps and expected results: clear and exact

- **Steps:** Use imperative language. Emphasize UI control names and labels (e.g. bold or quotes) so they match the application.
- **Expected results:** Quote exact messages and labels when verifying text; state the observable outcome clearly (e.g. button enabled/disabled, message shown, redirect).
- **Test Data:** Use concrete, realistic values where they help reproducibility; avoid placeholders like “any text” when a specific value is needed to prove the rule.

---

## 8. Success / main flow: one TC, clear steps

- The main **positive flow** (e.g. submit with valid data → feedback → navigation) should be **one functional_test** with a clear sequence: fill required data, submit, verify feedback, verify navigation (and list/context if in scope).
- **Avoid** merging several distinct AC items into a single vague step; keep one step per main action or verification when the AC lists them separately.
- Add only steps that are in scope for the US; note out-of-scope validations in the step or traceability instead of creating extra TCs.

---

## 9. Naming when generated from a User Story

- When the User Story **Title** is provided, every generated test case **Name** must use it as the base.
- **One TC:** NAME = US Title (exactly).
- **Two or more TCs:** NAME = US Title + " – " + a **2–3 word description** that distinguishes that TC (e.g. *Create group – Static texts*, *Create group – UI responsiveness*, *Create group – Add and remove users*). Keep the US title identical; only the suffix (2–3 words) differs per TC.

---

## 10. Checklist before generating (generic)

- [ ] **Naming:** If US Title is provided: one TC → NAME = US Title; multiple TCs → NAME = US Title + " – " + 2–3 word description.
- [ ] **Consolidation:** Same behavior or same type of check covered in **one TC** where a single flow makes sense; no over-splitting by minor variant.
- [ ] **Static/empty state:** Related static texts and empty states for the same view/US in **one static_text_test**; navigation and empty state as steps where needed, not as standalone TCs.
- [ ] **UI design:** If the UI is responsive, **ui_design_test** uses canonical viewport sizes (XL=1920, L=1280, M=1024, S=768) and **one step per viewport size in scope**; otherwise focused on structure and placement.
- [ ] **Similar validations:** Same kind of rule for several elements covered in **one TC** when the flow is the same.
- [ ] **No redundancy:** No TCs that only restate what another TC already proves (e.g. “required” when the enable/disable flow already proves it).
- [ ] **Preconditions:** Role, path, and relevant data/state included.
- [ ] **Wording:** Steps imperative; expected results with exact UI text where applicable; Test Data concrete when it matters.

---

## 11. Target outcome

- **Fewer, higher-value TCs:** Prefer a smaller set of well-structured TCs that cover the AC without duplication. Typical form/create or CRUD flows can often be covered with a modest number of TCs (e.g. 5–10 per US) when consolidation rules are applied.
- When in doubt, **merge** related checks into one TC and **remove** TCs that do not add new behavior or risk.

---

*This document is the strict reference for **TC design patterns**. The agent must read and apply it together with ZephyrTestCaseGuidelines.md and TC_Generator_Instructions.md.*
