const form = document.getElementById("add-task-form");
const titleField = document.getElementById("task-title-field");
const contentField = document.getElementById("task-content-field");
const dueField = document.getElementById("task-due-field");
const listBox = document.getElementById("all-task-info");

function createTask(title, content, due) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const titleEl = document.createElement("strong");
  titleEl.textContent = title;

  const contentEl = document.createElement("p");
  contentEl.textContent = content;

  const dueEl = document.createElement("div");
  dueEl.classList.add("meta");
  dueEl.textContent = "Due: " + due;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    taskDiv.remove();
  });

  taskDiv.appendChild(titleEl);
  taskDiv.appendChild(contentEl);
  taskDiv.appendChild(dueEl);
  taskDiv.appendChild(delBtn);

  listBox.appendChild(taskDiv);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleField.value.trim();
  const content = contentField.value.trim();
  const due = dueField.value;

  if (!title || !content || !due) {
    alert("Please fill out all fields!");
    return;
  }
  if (content.length > 30) {
    alert("Task Content must be 30 characters or less!");
    return;
  }

  createTask(title, content, due);
  form.reset();
});

createTask("Sample Task", "Finish reading chapter 3", "2025-10-05");