document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    addBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "X";

            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(li);
            });

            li.appendChild(deleteBtn);

            taskList.appendChild(li);

            taskInput.value = "";
        } else {
            alert("Fill in this field");
        }
    })
})