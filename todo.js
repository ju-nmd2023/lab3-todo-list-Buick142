document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    loadTasks();

    // Add task on button click
    addBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            /* const li = document.createElement("li"); */
            const taskId = Date.now();
            addTask(taskId, taskText, false);
            saveTaskToStorage(taskId, taskText, false);
            taskInput.value = "";
        } else {
            alert("Cannot add empty list item");
        }
    })

    // Add task to UI
    function addTask(id, taskText, isDone) {
        const li = document.createElement("li");
        li.textContent = taskText;
        li.setAttribute("data-id", id);

        // Create a container for buttons (provided by ChatGPT)
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = "inline-block";
        buttonContainer.style.marginLeft = "10px";

        // Create "Mark As Done" Button
        const doneBtn = document.createElement('button');
        doneBtn.textContent = "✓";
        doneBtn.style.marginRight = "10px";
        doneBtn.style.backgroundColor = "#ccc";
        doneBtn.style.border = "none";
        doneBtn.style.borderRadius = "4px";
        doneBtn.style.cursor = "pointer";

        doneBtn.addEventListener("click", function () {
            li.classList.toggle("done");
            const doneStatus = li.classList.contains("done");
            styleDoneButton(doneBtn, doneStatus);
            updateTaskStatusInStorage(id, taskText, doneStatus);
            if (li.classList.contains("done")) {
                doneBtn.style.backgroundColor = "green";
                doneBtn.style.color = "white";
            } else {
                doneBtn.style.backgroundColor = "#ccc";
                doneBtn.style.color = "black";
            }
        });

        // Create "Delete" Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "✖";
        deleteBtn.style.marginRight = "10px";
        deleteBtn.style.backgroundColor = "#ccc";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "4px";
        deleteBtn.style.cursor = "pointer";

        deleteBtn.addEventListener('mouseover', function() {
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.style.color = "white";
        });

        deleteBtn.addEventListener('mouseout', function() {
            deleteBtn.style.backgroundColor = "#ccc";
            deleteBtn.style.color = "black";
        });

        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            deleteTaskFromStorage(id);
        });

        buttonContainer.appendChild(doneBtn);
        buttonContainer.appendChild(deleteBtn);

        li.textContent = taskText;
        li.appendChild(buttonContainer);

        if (isDone) {
            li.classList.add("done");
            styleDoneButton(doneBtn, true);
        }

        taskList.appendChild(li);

        taskInput.value = "";
    }

    function styleDoneButton(button, isDone) {
        if (isDone) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        } else {
            button.style.backgroundColor = "#ccc";
            button.style.color = "black";
        }
    }

    // Save task to localStorage
    function saveTaskToStorage(id, taskText, isDone) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ id, text: taskText, done: isDone });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Delete task from localStorage
    function deleteTaskFromStorage(id) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Update done status in localStorage
    function updateTaskStatusInStorage(id, isDone) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            if (task.id === id) {
                task.done = isDone;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.id, task.text, task.done);
        });
    }
    
})