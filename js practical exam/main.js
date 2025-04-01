let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

window.addEventListener("load", displayTasks);

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (editIndex === -1) {
        addTask();
    } else {
        editExistingTask();
    }
});

document.getElementById("priorityFilter").addEventListener("change", filterTasksByPriority);
document.getElementById("searchInput").addEventListener("input", searchTasks);

document.getElementById("cancelButton").addEventListener("click", clearForm);

function addTask() {
    let title = document.getElementById("taskTitle").value.trim();
    let description = document.getElementById("taskDescription").value.trim();
    let dueDate = document.getElementById("taskDueDate").value;
    let priority = document.getElementById("taskPriority").value;

    let task = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    clearForm();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.innerHTML = `<strong>${task.title}</strong><br>
                              ${task.description}<br>
                              Due: ${task.dueDate}<br>
                              Priority: ${task.priority}`;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editTask(task.id);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteTask(task.id);
        };

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function editTask(taskId) {
    let task = tasks.find(t => t.id === taskId);

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDueDate").value = task.dueDate;
    document.getElementById("taskPriority").value = task.priority;

    editIndex = tasks.findIndex(t => t.id === taskId);
}

function editExistingTask() {
    let title = document.getElementById("taskTitle").value.trim();
    let description = document.getElementById("taskDescription").value.trim();
    let dueDate = document.getElementById("taskDueDate").value;
    let priority = document.getElementById("taskPriority").value;

    tasks[editIndex] = {
        id: tasks[editIndex].id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    clearForm();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filterTasksByPriority() {
    let priorityFilter = document.getElementById("priorityFilter").value;
    let filteredTasks;

    if (priorityFilter === "all") {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter(task => task.priority === priorityFilter);
    }

    displayFilteredTasks(filteredTasks);
}

function searchTasks() {
    let searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
    let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery));
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.innerHTML = `<strong>${task.title}</strong><br>
                              ${task.description}<br>
                              Due: ${task.dueDate}<br>
                              Priority: ${task.priority}`;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editTask(task.id);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteTask(task.id);
        };

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function clearForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDueDate").value = "";
    document.getElementById("taskPriority").value = "low"; 

    editIndex = -1; 
}
