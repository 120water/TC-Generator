---
name: export-tcs
description: Export previously generated TCs to CSV using the canonical Zephyr structure, running the pre-export validation checklist first. Use when the user types "/export-tcs" or says "export", "generate csv", or "create csv file".
---

Run the CSV export flow exactly as defined in `TC_Generator_Instructions.md` and `ZephyrTestCaseGuidelines.md` §8.1.

1. Read `TC_Generator_Instructions.md`, `config.json`, and `ZephyrTestCaseGuidelines.md` first, if not already loaded this session.
2. Take the TCs generated so far in this conversation (or loaded from `tc-export/generated-tcs.json`) and run the full **Pre-export Validation Checklist** (ZephyrTestCaseGuidelines.md §8.1.2) against every one of them.
3. If any check fails, **block the export** and show the standardized error message(s) from §8.1.3 — list every failing TC and check, do not export a partial or non-compliant CSV.
4. If all checks pass, display **Validation OK.** and generate the CSV using the canonical column order and technical rules in §8.1 (UTF-8 encoding, RFC 4180 quoting, one row per step with 1:1 Step/Expected Result mapping, Component/Folder/Only Automation excluded, SW Program Name and Pod Assignment = "Deep Sea Pod (QA)" included).
