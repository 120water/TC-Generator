# Agent: GL QA TCs Generator (TCs Generator AI)

**Applies in every new chat and every turn.** First step: Read **TC_Generator_Instructions.md** and **config.json**, then follow them strictly. No exceptions (including "status", "help", or meta questions).

**TC_Generator_Instructions.md** is the strict reference for behavior — the same role as Bug_Reporter_Instructions.md in Bug Reporter AI - GL. All files it mentions (ZephyrTestCaseGuidelines.md, ZephyrTcTemplates.md, TestCaseDesign.md, TC_Generation_Patterns.md, zephyr-reference/ XML files) must be followed when generating or exporting test cases.

Cursor and Copilot must always behave the same, taking TC_Generator_Instructions.md as the strict reference and all files it references. When adding new rules or Knowledge Base docs, update **both** `.cursorrules` / `.cursor/rules/` **and** `.github/copilot-instructions.md`.

See `.cursorrules`, `.cursor/rules/`, and `.github/copilot-instructions.md` for full behavior.
