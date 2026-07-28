# Test Case Design

**Status:** READY  
**Date:** May 22, 2025

Test Cases are the main pillars of our testing process. Through them, QA testers map out the execution of a test. This includes Story Ticket Test Cases, Sanity Test Cases, positive and negative scenarios, etc.

**Example (Story Ticket Test Case):**  
- **NP-T66 (1.0)** — *Verify that Questionnaire types are displayed and their descriptions can be changed*

> **Scope note:** This document is trimmed to the two tabs the TCs Generator agent actually uses to produce test cases — **Details** and **Test Script**. The full Zephyr Test Case record also has Execution, Traceability, Attachments, Comments, and History tabs, plus a review/approval, versioning, and automation-ticket workflow. Those are QA process steps handled directly in Zephyr (not by the agent), so they're intentionally left out here to keep this reference focused and cheaper to read on every generation.

## Table of Contents

1. [Test Case Information](#1-test-case-information)  
   1.1. [Details Tab](#11-details-tab)  
   1.2. [Test Script Tab](#12-test-script-tab)

---

## 1. Test Case Information

Test Case information relevant to generation covers 2 of the record's tabs:

- Details  
- Test Script  

### 1.1. Details Tab

This tab contains general information about the Test Case.

#### 1.1.1. Name

This field contains the Test Case title. This field should essentially:

- Reference the functionality  
- Reference the UI elements that functionality applies to  
- Reference the specific user/security group that can use the functionality (if applicable)

This title should be clear and concise (short and easily understandable).

**Good example:** Verify that the admin can view Questionnaire templates  
**Bad example:** Verify Using forgot password functionality, User to input user ID than present them with security question which they answered initially and required to answer to reset the password

#### 1.1.2. Objective

This field contains the coverage for the Test Case.

- It can be left empty on most cases (e.g. if the Test Case is already referencing a Story Ticket on the tab)

#### 1.1.3. Precondition

These are the setup steps required to get to the point where the test can begin.

- If the Precondition contains more than 7–8 steps, then the whole Precondition must be moved into a new Test Case **and** that same Test Case should be linked into the Precondition section.

Commonly used Preconditions:

- Test user permissions/accesses (e.g. “User is logged in as an admin.”)  
- Whether the test user already subscribed to a change or received a notification about a task  
- Specific Program type record states required to test  

#### 1.1.4. Details > Status

The Test Case can be set to one of three states:

- **Draft** — The initial state after creating a Test Case (and before it gets reviewed/approved). You should select this state when creating/updating any Test Case.  
- **Deprecated** — The state chosen when retiring a Test Case that is no longer valid.  
- **Approved** — The Test Case will be moved to this state after being reviewed and approved.  

#### 1.1.5. Details > Priority

The Test Case can be set to one of three priorities:

- **Normal** — You should select this priority when creating/updating any Test Case.  
- **High**  
- **Low**  

#### 1.1.6. Details > Component

This field contains the solution that the Test Case pertains to.

- It can be left empty, but you should try to fill it with the relevant solution, if applicable.

#### 1.1.7. Details > Owner

This field displays the name of the creator for the Test Case.

#### 1.1.8. Details > Estimated Time

This field displays the estimated time for completing the Test Case.

- This field should be left empty when creating the Test Case.  
- It will be filled out by the QA that reviews/approves the test case.

#### 1.1.9. Details > Folder

Test Cases should be grouped by folder as decided by the team.

- Usually folders are organized by solution/component.

#### 1.1.10. Details > Labels

Test Cases can be assigned specific labels for reference purposes.

Automatable test cases should always have at least one of the following labels (preferably one per Test Case):

- `functional_test`  
- `static_text_test`  
- `ui_design_test`  

#### 1.1.11. More Information > Created in Version

This field contains the software version where the Test Case was created.

#### 1.1.12. More Information > Automation Possible

This is a **Yes/No** field.

- This field defines whether the Test Case can be automated or not.

#### 1.1.13. More Information > Automation

This is a **Yes/No** field.

- This field defines whether the Test Case has been automated or not.  
- When first creating/updating a Test Case, this field will be set to **No**.  
- An Automation ticket needs to be opened for any applicable Test Case.

#### 1.1.14. More Information > Only Automation

This checkbox pertains to whether the Test Case is for automation only.

- As a Manual QA, this checkbox should be ignored.

### 1.2. Test Script Tab

This tab contains the specific instructions for executing the Test Case.

#### 1.2.1. Step

The instructions necessary to be taken by the user (e.g. click on **Settings**).

- Instructions should be short and to the point.  
- Instructions should be discreet (pertain to a single task at a time). If you have a very complex task, consider dividing it into multiple separate steps.  
- This field should have a simple synergy with the **Expected Result**: user performs **Step** → user sees **Expected Result** happening.

#### 1.2.2. Test Data

Any specific credentials/passwords/information that needs to be inserted as part of the step.

- This field should usually be left blank, unless absolutely necessary.

#### 1.2.3. Expected Result

The behavior that the user is expected to see after following the instructions laid out on the **Step** field.

- This description should be simple and straightforward.

---

*(Execution, Traceability, Attachments, Comments, and History tabs, plus the review/approval, versioning, and automation-ticket workflow, are out of scope for this document — see the Scope note above.)*
