# Zephyr reference (test cases)

This folder holds **Zephyr export XML files** that the AI uses as reference when generating new test cases for a User Story.

- **Purpose:** Real Zephyr conventions (names, folders, labels, steps, expected results). The generator reads these files to align new TCs with your existing repertoire.
- **Usage:** Add one or more `.xml` files exported from Zephyr Scale / Jira. **Each client places their own export(s) here locally.**
- **Important:** XML files in this folder **are not committed to the repo** (they are in `.gitignore`) because they contain sensitive client data. When you clone or share the repo, this folder will not contain any XML; each team or client must add their own Zephyr export(s) after cloning.

The AI reads **all `.xml` files** in this folder when generating test cases.
