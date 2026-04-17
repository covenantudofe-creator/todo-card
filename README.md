# Project Overview
This project is an upgrade of the Stage 0 Todo Card into a more interactive, stateful, and accessible component. It simulates a real-world task management card with editing, status control, time tracking, and expand/collapse behavior.

The focus is on **semantic HTML, accessibility, JavaScript state management, and clean UI behavior**.

---

## Features Implemented

###  1. Edit Mode (Stateful Editing)
- Users can edit:
  - Title
  - Description
  - Priority
  - Due date
- Edit form includes:
  - Save button
  - Cancel button
- Cancel restores previous values instead of applying changes

---

###  2. Status Management
- Status options:
  - Pending
  - In Progress
  - Done
- Status is synchronized across:
  - Checkbox toggle
  - Status dropdown
  - Status display text

When marked as **Done**:
- Title is struck through
- Card becomes visually muted
- Time tracking stops

---

###  3. Dynamic Time Handling
- Displays time remaining until due date:
  - Minutes
  - Hours
  - Days
- Automatically updates every 60 seconds
- If overdue, shows a red “Overdue” indicator
- If task is completed, displays “Completed”

---

###  4. Expand / Collapse Behavior
- Description section can be expanded or collapsed
- Uses accessible attributes:
  - `aria-expanded`
  - `aria-controls`
- Improves readability for long content

---

###  5. Priority Indicator
- Priority levels:
  - Low
  - Medium
  - High
- Visual changes based on priority using color coding
- Dynamically updated when edited

---

## Accessibility Features
- Proper semantic HTML structure (`article`, `label`, `time`, `button`)
- All form inputs have associated labels
- Expand button includes:
  - `aria-expanded`
  - `aria-controls`
- Time updates use `aria-live="polite"`
- Fully keyboard navigable (Tab-friendly flow)

---

##📱 Responsiveness
- Fully responsive layout
- Works across:
  - Mobile (320px)
  - Tablet (768px)
  - Desktop (1024px+)
- Prevents overflow and layout breaking on small screens

---

##  Design Decisions
- Used **vanilla JavaScript only** (no frameworks) for performance and clarity
- Centralized status logic using a single function (`setStatus`) to avoid state inconsistency
- Implemented state backup system for reliable Cancel behavior
- Kept UI minimal and focused on usability over decoration

---

##  Known Limitations
- Only supports a single todo card (as required by the task)
- No backend or persistent storage (data resets on refresh)
- Time updates depend on browser session (no server sync)

---

 ##Deployment
- Live URL: https://covenantudofe-creator.github.io/todo-card/
- GitHub Repository: https://github.com/covenantudofe-creator/todo-card


##  How to Run Locally
1. Clone the repository:
```bash
git clone https://github.com/covenantudofe-creator/todo-card.git
