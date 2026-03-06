# 📑 Zephyr Test Case Templates (English)

This document contains complete **master templates** for the three types of test cases required in Zephyr: ui_design_test, static_text_test, and functional_test. They follow the real Zephyr format (**Details, Test Script, Traceability**).

## 🔹 UI Design Test – Example

### Details

- **NAME**: User Groups – UI responsiveness of “Add users to the group” modal across breakpoints
- **OBJECTIVE**: Validate that the “Add users” modal displays correctly across all breakpoints, ensuring columns, search bar, and selection controls remain usable.
- **PRECONDITIONS**: Admin user is authenticated and can access **User management → Groups → Create new group**.
- **STATUS**: Draft
- **PRIORITY**: Normal
- **COMPONENT**: User Groups
- **ESTIMATED RUN TIME**: 00:08
- **FOLDER**: /Settings/User management/User Groups
- **LABELS**: ui_design_test
- **CREATED IN VERSION**: 26.1.0.0
- **AUTOMATION POSSIBLE**: Yes
- **AUTOMATED**: No
- **ONLY AUTOMATION**: No

### Test Script

**Step 1**  
Action: Open “Add users to the group” modal at **XL viewport (1920px)** → Expected Result: Modal is centered; all columns (Checkboxes, First name, Last name, Email) are visible; “Select All/None” option visible; no horizontal scroll.  
Test Data: None

**Step 2**  
Action: Resize viewport to **L (1280px)** → Expected Result: Modal is centered; all columns visible; “Select All/None” option visible; no horizontal scroll.  
Test Data: None

**Step 3**  
Action: Resize viewport to **M (1024px)** → Expected Result: Table condenses, font size remains readable, action buttons pinned bottom-right (per design), no overlap of modal header/footer.  
Test Data: None

**Step 4**  
Action: Resize viewport to **S (768px)** → Expected Result: Modal adapts to full width, vertical scroll enabled if needed, table columns stack correctly, all controls remain accessible.  
Test Data: None

*Number of steps = number of viewport sizes in scope. If only two sizes are required (e.g. XL and S), use two steps; if all four are in scope, use four steps. Canonical sizes: XL=1920, L=1280, M=1024, S=768.*

### Traceability

- **ISSUES**: NP-3104 (Creating new user groups)
- **COVERAGE**: User Story – Add users modal responsiveness
- **WEB LINKS**: Figma design link for Add Users modal

## 🔹 Static Text Test – Example

### Details

- **NAME**: User Groups – Static text validation in “Add users to the group” modal
- **OBJECTIVE**: Validate that all static texts, labels, placeholders, and button captions in the modal match the design specifications.
- **PRECONDITIONS**: Admin user is authenticated and can access **User management → Groups → Create new group**.
- **STATUS**: Draft
- **PRIORITY**: Normal
- **COMPONENT**: User Groups
- **ESTIMATED RUN TIME**: 00:08
- **FOLDER**: /Settings/User management/User Groups
- **LABELS**: static_text_test
- **CREATED IN VERSION**: 26.1.0.0
- **AUTOMATION POSSIBLE**: No
- **AUTOMATED**: No
- **ONLY AUTOMATION**: No

### Test Script

**Step 1**  
Action: Open “Add users to the group” modal → Expected Result: Modal title displays “Add users to the group”.  
Test Data: None

**Step 2**  
Action: Verify column headers → Expected Result: Headers display “First name”, “Last name”, “Email”.  
Test Data: None

**Step 3**  
Action: Verify button texts → Expected Result: Buttons display “Cancel” and “Add users”.  
Test Data: None

**Step 4**  
Action: Verify search field placeholder → Expected Result: Placeholder text displays “Search by name or email”.  
Test Data: None

### Traceability

- **ISSUES**: NP-3104 (Creating new user groups)
- **COVERAGE**: User Story – Add users modal texts
- **WEB LINKS**: Figma design for Add Users modal

## 🔹 Functional Test – Example

### Details

- **NAME**: User Groups – Add and remove users in “Add users to the group” modal
- **OBJECTIVE**: Validate that users can be successfully added and removed from a group using the modal.
- **PRECONDITIONS**: Admin user is authenticated and can access **User management → Groups → Create new group**.
- **STATUS**: Draft
- **PRIORITY**: Normal
- **COMPONENT**: User Groups
- **ESTIMATED RUN TIME**: 00:10
- **FOLDER**: /Settings/User management/User Groups
- **LABELS**: functional_test
- **CREATED IN VERSION**: 26.1.0.0
- **AUTOMATION POSSIBLE**: Yes
- **AUTOMATED**: No
- **ONLY AUTOMATION**: No

### Test Script

**Step 1**  
Action: Open “Add users to the group” modal → Expected Result: Modal loads with a list of available users.  
Test Data: None

**Step 2**  
Action: Select two users and click “Add users” → Expected Result: Users are added to the group and appear in the group members list.  
Test Data: User A, User B

**Step 3**  
Action: Remove one user from the group members list → Expected Result: User is removed from the group and no longer appears in the list.  
Test Data: User A

**Step 4**  
Action: Attempt to add the same user twice → Expected Result: Duplicate entry is not allowed, user is added only once.  
Test Data: User B

### Traceability

- **ISSUES**: NP-3104 (Creating new user groups)
- **COVERAGE**: User Story – Add/remove users in modal
- **WEB LINKS**: Figma design for Add Users modal

✅ These templates serve as ready-to-use examples that complement the **Zephyr Tc Guidelines** and Knowledge documents. They should be used as quick reference when generating new test cases.