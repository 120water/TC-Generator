# TC Generation Patterns – Good Practices

This document defines **generic lineamientos** (guidelines) for designing test cases that are **well-structured**, **non-duplicative**, and **high-value**. Apply these principles to any User Story; the agent must read and apply them when generating TCs.

**Goal:** Reduce duplication, consolidate coverage, and maximize value within the 16-TC-per-US limit. Use **zephyr-reference/** XML exports as real-world examples for naming, step structure, and consolidation. **Default is one TC:** generate **exactly one `functional_test` TC per User Story** that covers everything in scope, unless one of the exceptions in §1 below makes a split strictly necessary. **No minimum per label:** add static_text_test and ui_design_test only when the US/AC require them.

---

## 1. Default: one TC per User Story (split only when strictly necessary)

- **Default behavior:** Produce **one `functional_test` TC** per User Story that consolidates every in-scope Acceptance Criterion into a single flow (e.g. precondition/flag setup → primary interaction → secondary interaction → resulting state, each as its own step). This should be the outcome for **most** User Stories.
- **Split into more than one TC only when strictly necessary** — i.e. only when at least one of these applies:
  1. The US/AC explicitly calls for **static text or empty-state verification** substantial enough to deserve its own `static_text_test` (see §2).
  2. The US/AC explicitly calls for **responsive/UI design verification** across breakpoints, deserving its own `ui_design_test` (see §3).
  3. The US defines **clearly distinct views, entry points, or roles** that must be verified independently for parity.
  4. The consolidated flow would **exceed ~7–8 steps or the 15-minute estimated-time cap** — split by logical sub-flow (never by minor variant) into the minimum number of TCs needed to stay within limits.
- **A label mismatch alone is not automatically "strictly necessary."** A US can touch more than one label's territory (e.g. a visual reskin story that also asks "confirm button X still works/is clickable after the restyle"). If the secondary concern is a **minor, incidental regression/continuity check** riding along on a primarily different story, **fold it in as an extra step** of the single TC rather than spinning up a second TC — pick whichever single label matches the story's **primary** intent (e.g. `ui_design_test` for a reskin story) and let the incidental check be one more step under that label. Only give the secondary concern its own TC when it is **substantial in its own right** (e.g. a whole new interaction flow, not "still opens after the CSS change").
- **Avoid** splitting the same behavior into many TCs that only change one condition (e.g. one TC per "disabled when field A empty", "disabled when field B empty", "enabled when both filled"). If one flow can demonstrate all cases, use **one TC** with multiple steps.
- **Rule of thumb:** If several TCs share the same setup and only differ by one input or one assertion, merge them into one TC with a full flow. If you are generating more than one TC, be able to name which specific exception above justifies each additional TC — and confirm the exception isn't just an incidental label mismatch covered by the rule above.

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

- [ ] **Default to one TC:** Unless a §1 exception applies, output is **exactly one `functional_test` TC** for the whole User Story.
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

- **One TC by default:** The target outcome is **exactly one well-structured `functional_test` TC per User Story** that covers the AC end-to-end without duplication. Only produce additional TCs when a §1 exception genuinely applies (required static_text_test/ui_design_test coverage, distinct views/roles requiring parity, or a step-count/time-cap split).
- When in doubt, **merge** related checks into one TC and **remove** TCs that do not add new behavior or risk.

---

*This document is the strict reference for **TC design patterns**. The agent must read and apply it together with ZephyrTestCaseGuidelines.md and TC_Generator_Instructions.md.*
