let tasks = [];

// LOAD
window.onload = function () {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
  displayTasks(tasks);
};

// ADD
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskTime = document.getElementById("taskTime");

  const text = taskInput.value.trim();
  const time = taskTime.value;

  if (text === "") {
    alert("Enter task!");
    return;
  }

  tasks.push({
    text: text,
    time: time,
    completed: false
  });

  taskInput.value = "";
  taskTime.value = "";

  saveAndDisplay();
}

// DISPLAY (FIXED)
function displayTasks(list) {
  const ul = document.getElementById("taskList");

  // ✅ IMPORTANT: CLEAR LIST FIRST
  ul.innerHTML = "";

  list.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text + (task.time ? ` (${task.time})` : "");

    if (task.completed) {
      span.classList.add("completed");
    }

    // COMPLETE
    const completeBtn = document.createElement("button");
    completeBtn.innerText = task.completed ? "Undo" : "Complete";

    completeBtn.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      saveAndDisplay();
    };

    // EDIT
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.onclick = function () {
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        tasks[index].text = newText;
        saveAndDisplay();
      }
    };

    // DELETE (FIXED)
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function () {
      tasks.splice(index, 1); // remove correct item
      saveAndDisplay();
    };

    const div = document.createElement("div");
    div.appendChild(completeBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(div);

    ul.appendChild(li);
  });
}

// SAVE
function saveAndDisplay() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
}

// FILTER
function filterTasks(type) {
  if (type === "all") {
    displayTasks(tasks);
  } else if (type === "completed") {
    displayTasks(tasks.filter(t => t.completed));
  } else if (type === "pending") {
    displayTasks(tasks.filter(t => !t.completed));
  }
}