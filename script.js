const card = document.querySelector('[data-testid="test-todo-card"]');

const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const title = document.querySelector('[data-testid="test-todo-title"]');

const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');


// ✅ TOGGLE COMPLETE STATUS
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    status.textContent = "Done";
    status.style.color = "green";
    title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
  } else {
    status.textContent = "Pending";
    status.style.color = "#000";
    title.style.textDecoration = "none";
    title.style.opacity = "1";
  }
});


// ✏️ EDIT TASK TITLE
editBtn.addEventListener("click", () => {
  const newTitle = prompt("Edit task title:", title.textContent);

  if (newTitle && newTitle.trim() !== "") {
    title.textContent = newTitle.trim();
  }
});


// 🗑 DELETE ENTIRE CARD (FIXED)
deleteBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (confirmDelete) {
    card.remove();
  }
});