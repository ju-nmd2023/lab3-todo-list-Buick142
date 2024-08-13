document.addEventListener("DOMContentLoaded", function() {
    const addTask = document.getElementById("addTask");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
})

addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = "";
    } else {
        alert("Fill in this field");
    }
})