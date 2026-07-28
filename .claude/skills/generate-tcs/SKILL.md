---
name: generate-tcs
description: Generate Zephyr-compliant test cases (Details, Test Script, Traceability, Generated TCs list) for a User Story following the TCs Generator knowledge base. Use when the user types "/generate-tcs" or "Generate TCs for this US", or pastes a User Story with Application, SW Program Name, Title, Description, and Acceptance Criteria and wants test cases created.
---

Delegate this to the **`tc-generator`** subagent (via the Task tool) instead of generating inline — it owns the full knowledge-base read (ZephyrTestCaseGuidelines, ZephyrTcTemplates, TestCaseDesign, TC_Generation_Patterns, zephyr-reference XMLs) in its own isolated context, so the main conversation doesn't accumulate it.

1. If the user's input is a Jira ticket URL or key instead of the manual template (Method B in `TC_Generator_Instructions.md` → "User Story Input Methods"): fetch the issue with the Atlassian tools, then build the equivalent User Story input — **Application** ← the ticket's `config.json` → `jira.application_field` ("120 Product") field, **SW Program Name** ← `jira.sw_program_name_field` ("120 SW Program Name") field, **Title** ← summary, **Description**/**Acceptance Criteria** ← the issue description. Include the ticket key in what you pass to the subagent so it lands in Traceability → ISSUES. If the ticket can't be fetched, tell the user and ask them to use Method A instead.
2. Pass the resulting User Story input (as given by the user, or as built from the Jira ticket in step 1) to the `tc-generator` subagent as-is.
3. If `Application Name` or `SW Program Name` is still missing (not in the template, and not resolvable from the Jira ticket's custom fields), ask the user for it before invoking the subagent — don't make the subagent do that round trip.
4. When the subagent returns, relay its output back to the user **unchanged**: N) Details → Test Script → Traceability for each TC, the Generated TCs list, the Validation OK / blocked message, and the closing export prompt.
