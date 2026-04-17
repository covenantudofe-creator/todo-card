// =======================
// ELEMENTS
// =======================
const card = document.querySelector('[data-testid="test-todo-card"]');

const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const title = document.querySelector('[data-testid="test-todo-title"]');
const description = document.querySelector('[data-testid="test-todo-description"]');
const priority = document.querySelector('[data-testid="test-todo-priority"]');

const dueDate = document.getElementById("dueDate");
const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
const overdue = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

const editTitle = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescription = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPriority = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const editDueDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');

const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');
const collapsible = document.querySelector('[data-testid="test-todo-collapsible-section"]');

let due = new Date("2026-04-16T00:00:00");
let interval;

// =======================
// STATE BACKUP (IMPORTANT FOR CANCEL)
// =======================
let backupState = {};

// =======================
// DELETE
// =======================
deleteBtn.addEventListener("click", () => {
  card.remove();
});

// =======================
// OPEN EDIT MODE
// =======================
editBtn.addEventListener("click", () => {
  editForm.hidden = false;

  // SAVE CURRENT STATE (FOR CANCEL RESTORE)
  backupState = {
    title: title.textContent,
    description: description.textContent,
    priority: priority.textContent.trim(),
    due: new Date(due),
    status: status.textContent,
    statusControl: statusControl.value,
    checkbox: checkbox.checked
  };

  // FILL FORM
  editTitle.value = backupState.title;
  editDescription.value = backupState.description;
  editPriority.value = backupState.priority;
  editDueDate.value = backupState.due.toISOString().split("T")[0];
});

// =======================
// CANCEL (RESTORES PREVIOUS STATE)
// =======================
cancelBtn.addEventListener("click", () => {
  title.textContent = backupState.title;
  description.textContent = backupState.description;
  priority.textContent = backupState.priority;

  due = backupState.due;
  dueDate.textContent = "Due " + backupState.due.toISOString().split("T")[0];

  setStatus(backupState.status, false);

  editForm.hidden = true;
});

// =======================
// SAVE
// =======================
saveBtn.addEventListener("click", () => {
  if (!editTitle.value.trim()) {
    alert("Title cannot be empty");
    return;
  }

  title.textContent = editTitle.value.trim();
  description.textContent = editDescription.value.trim();
  priority.textContent = editPriority.value;

  if (editDueDate.value) {
    due = new Date(editDueDate.value);
    dueDate.textContent = "Due " + editDueDate.value;
  }

  editForm.hidden = true;
});

// =======================
// STATUS SYNC FUNCTION (CENTRAL LOGIC)
// =======================
function setStatus(value, fromCheckbox = false) {
  status.textContent = value;
  statusControl.value = value;

  if (!fromCheckbox) {
    checkbox.checked = value === "Done";
  }

  if (value === "Done") {
    title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
    stopTimer();
  } else {
    title.style.textDecoration = "none";
    title.style.opacity = "1";
    startTimer();
  }
}

// =======================
// CHECKBOX CONTROL
// =======================
checkbox.addEventListener("change", () => {
  setStatus(checkbox.checked ? "Done" : "Pending");
});

// =======================
// STATUS DROPDOWN CONTROL
// =======================
statusControl.addEventListener("change", () => {
  setStatus(statusControl.value);
});

// =======================
// EXPAND / COLLAPSE
// =======================
expandBtn.addEventListener("click", () => {
  const expanded = expandBtn.getAttribute("aria-expanded") === "true";

  expandBtn.setAttribute("aria-expanded", !expanded);
  collapsible.style.display = expanded ? "none" : "block";
});

// =======================
// TIME LOGIC
// =======================
function updateTime() {
  const now = new Date();
  const diff = due - now;

  if (status.textContent === "Done") {
    timeRemaining.textContent = "Completed";
    overdue.textContent = "";
    return;
  }

  if (diff < 0) {
    timeRemaining.textContent = "";
    overdue.textContent = "Overdue";
    overdue.style.color = "red";
    return;
  }

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  timeRemaining.textContent =
    days > 0
      ? `Due in ${days} day(s)`
      : hrs > 0
      ? `Due in ${hrs} hour(s)`
      : `Due in ${mins} minute(s)`;
}

// =======================
// TIMER CONTROL (STOP/START CLEANLY)
// =======================
function startTimer() {
  if (interval) return;
  interval = setInterval(updateTime, 60000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

// INIT
startTimer();
updateTime();