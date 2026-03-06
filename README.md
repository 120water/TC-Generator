# TCs Generator AI (GL QA TCs Generator)

AI-powered test case generator for Zephyr Scale / Jira following the corporate standard. **Cursor and Copilot behave the same:** they always use **TC_Generator_Instructions.md** as the strict reference (same as Bug Reporter with Bug_Reporter_Instructions.md).

**Works with:** Cursor AI | GitHub Copilot

---

## Agent strict reference

**TC_Generator_Instructions.md** defines how the agent must behave on every interaction: commands (Status, Generate TCs for this US), modes (Strict/Draft), standard workflow, validation, output format, and CSV rules. All files mentioned there (ZephyrTestCaseGuidelines, ZephyrTcTemplates, TestCaseDesign, zephyr-reference/ XML files, config.json) must be followed when generating or exporting.

---

## Knowledge base (files used by the AI)

| File | Purpose |
|------|---------|
| **TC_Generator_Instructions.md** | **Strict reference:** commands, workflow, modes, validation, output, CSV safeguards (like Instructions.txt / Custom GPT) |
| **ZephyrTestCaseGuidelines.md** | Corporate standard: fields, labels, estimated time, steps, coverage, "Generated TCs" list, CSV structure |
| **ZephyrTcTemplates.md** | Master templates for the 3 types: ui_design_test, static_text_test, functional_test |
| **TestCaseDesign.md** | Official test case design: Details tab, Test Script, Traceability |
| **zephyr-reference/** (XML files) | Folder for Zephyr export XML(s); each client can add their repertoire; AI uses them as reference (names, folders, labels, steps) |
| **config.json** | Project key, version, labels, time cap, CSV rules |

---

## Quick start

### 1. Configure the project

Edit `config.json`: `project_key`, `created_in_version`, `estimated_time_cap` (00:15), `labels`, etc.

### 2. Generate test cases

**Type `Status` in the Cursor or Copilot chat.**

The agent will ask for User Story/scope, acceptance criteria (optional), folder, and preconditions. It will generate TCs with:

- **N) Details** (NAME, OBJECTIVE, PRECONDITIONS, STATUS, PRIORITY, COMPONENT, ESTIMATED RUN TIME, FOLDER, LABELS, etc.)
- **Test Script** (atomic steps: Action → Expected Result)
- **Traceability** (ISSUES, COVERAGE, WEB LINKS)
- **Generated TCs list** (numbered list of titles only; N matches each TC)

---

## Main rules (summary)

- **Labels:** exactly one per TC: `functional_test` | `static_text_test` | `ui_design_test`
- **Status:** Draft. **Priority:** Normal.
- **Estimated run time:** hh:mm, between 00:01 and 00:15.
- **Component and Folder:** required in Zephyr; **must be empty in CSV** (internal rule).
- **Steps:** atomic; one Expected Result per step (1:1).
- **Coverage:** up to 16 TCs per User Story; minimum 1 static_text_test and 1 ui_design_test per view; rest functional_test.

---

## Export CSV

If you ask for "export", "generate csv", or "create csv file", the AI will use the canonical structure from ZephyrTestCaseGuidelines §8 (fixed column order, UTF-8, one row per step, no Component/Folder/Only Automation). Before generating it runs the validation checklist; if anything fails, it shows the standard message and does not export.

---

## Project structure

| File / folder | Purpose |
|---------------|---------|
| `config.json` | Project and Zephyr configuration |
| `TC_Generator_Instructions.md` | Main agent instructions |
| `ZephyrTestCaseGuidelines.md` | Corporate standard |
| `ZephyrTcTemplates.md` | Templates for the 3 TC types |
| `TestCaseDesign.md` | Test case design (Details, Test Script, Traceability) |
| `zephyr-reference/` | Folder for Zephyr export XML(s); add your own TCs here for AI reference |
| `.cursorrules` | Rules for Cursor AI |
| `.github/copilot-instructions.md` | Instructions for GitHub Copilot |
| `.cursor/rules/` | “Read instructions first” rule |

---

## Compatibility

| Tool | Configuration |
|------|----------------|
| **Cursor AI** | `.cursorrules` + `.cursor/rules/` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |

Both use the same knowledge base and the same output format.

---

<p align="center">
  <strong>Type <code>Status</code> to start</strong>
</p>
