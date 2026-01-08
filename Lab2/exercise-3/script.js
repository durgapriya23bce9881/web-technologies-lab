let taskCount = 0;

// Allow dropping
function allowDrop(event) {
    event.preventDefault();
}

// Drag task
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Drop task
function drop(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text");
    let task = document.getElementById(taskId);

    // Prevent drop on another task
    if (event.target.classList.contains("task")) {
        return;
    }

    event.target.appendChild(task);

    // If task moved to completed column
    if (event.target.id === "completed") {
        task.classList.add("completed-task");
        document.getElementById("message").innerText =
            "Task Completed Successfully!!";
    } else {
        task.classList.remove("completed-task");
        document.getElementById("message").innerText = "";
    }
}

// Add task
function addTask() {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter task name");
        return;
    }

    taskCount++;

    let task = document.createElement("div");
    task.className = "task";
    task.id = "task" + taskCount;
    task.draggable = true;
    task.ondragstart = drag;

    let date = new Date().toLocaleDateString();

    task.innerHTML = taskName + "<br><small>" + date + "</small>";

    document.getElementById("todo").appendChild(task);
    input.value = "";
}
