---
description: Generate Zephyr-compliant test cases for a User Story
argument-hint: [Application, SW Program Name, optional View/Page path, Title, Description, Acceptance Criteria]
---

Run the **Generate TCs for this US** command exactly as defined in `TC_Generator_Instructions.md`.

1. Read `TC_Generator_Instructions.md` and `config.json` first (mandatory first action, per `CLAUDE.md`), if not already done this session.
2. Treat the text below as the User Story input (Application Name, SW Program Name, optional View/Page path, Title, Description, Acceptance Criteria). If **Application Name** or **SW Program Name** is missing, ask the user for it before generating — do not assume defaults.
3. Read and apply, in order: `ZephyrTestCaseGuidelines.md`, `ZephyrTcTemplates.md`, `TestCaseDesign.md`, `TC_Generation_Patterns.md`, and all `.xml` files in `zephyr-reference/`.
4. Follow the Standard Workflow, TC naming rule, Output Requirements (Details → Test Script → Traceability, then Generated TCs list), Quality Rules, Coverage Rules, and CSV Export Safeguards exactly as defined in `TC_Generator_Instructions.md`.
5. After generating and validating, write the TCs to `tc-export/generated-tcs.json` and open `tc-export/tc-export.html`, then end with the export prompt — exactly as the Output Requirements section specifies.

User Story input:
$ARGUMENTS
