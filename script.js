const dueDate = new Date("2026-04-16");
const now = new Date();

const timeRemaining = document.getElementById("timeRemaining");

const diff = dueDate - now;

if (diff > 0) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  timeRemaining.textContent = `Due in ${days} day(s)`;
} else {
  const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
  timeRemaining.textContent = `Overdue by ${hours} hour(s)`;
}

// Checkbox toggle
const checkbox = document.getElementById("checkbox");
const status = document.getElementById("status");

checkbox.addEventListener("change", () => {
  status.textContent = checkbox.checked ? "Done" : "Pending";
});