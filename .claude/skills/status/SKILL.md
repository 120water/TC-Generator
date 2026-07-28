---
name: status
description: Check the TCs Generator status — confirms mode (Strict/Draft), knowledge base availability, and shows the full User Story input format. Use when the user types "/status" or "Status", or asks whether the TCs Generator is ready, what mode it's in, or what format to use for a User Story.
---

Run the **Status** command exactly as defined in `TC_Generator_Instructions.md`.

1. Read `TC_Generator_Instructions.md` and `config.json` first (mandatory first action, per `CLAUDE.md`), if not already done this session.
2. Respond following the **"Status Command – Expected Response"** section of `TC_Generator_Instructions.md` exactly: 🟢 Mode, 📋 Ready/Input (both input options), 📝 full Input format guide showing **Method A** (template, with opening/closing markers, not abbreviated) and **Method B** (Jira ticket URL/key, with the "120 Product" / "120 SW Program Name" field mapping), ⌨️ Commands.
3. Do not improvise the format — use the example response in that section as the template for tone and structure.
