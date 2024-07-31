 let previousTask = "";
        let taskID = 0;

        const validateTaskInputs = (taskName) => {
            if (taskName === "") {
                let errorElement = document.getElementById("error");
                if (!errorElement) {
                    errorElement = document.createElement("div");
                    errorElement.id = "error";
                    document.body.insertBefore(errorElement, document.querySelector("table"));
                }
                errorElement.innerText = "Input a task";
                return true;
            }
            return false;
        }

        const addTaskToList = (taskName, taskDate, taskTime) => {
            if (previousTask === taskName) return;
            console.log(previousTask, taskName);
            if (previousTask === "") {
                previousTask = taskName;
            }

            let taskRow = document.createElement("tr");
            taskRow.id = taskID++;
            let taskIDCell = document.createElement("td");
            taskIDCell.innerText = taskRow.id;
            let taskNameCell = document.createElement("td");
            taskNameCell.innerText = taskName;
            taskNameCell.onclick = () => editCell(taskNameCell);

            let taskDateCell = document.createElement("td");
            if (taskDate && taskTime) {
                taskDateCell.innerText = `${taskDate} ${taskTime}`;
            } else if (taskDate) {
                taskDateCell.innerText = taskDate;
            } else if (taskTime) {
                taskDateCell.innerText = taskTime;
            } else {
                taskDateCell.innerText = "No date/time specified";
            }
            taskDateCell.onclick = () => editCell(taskDateCell);

            let deleteButtonCell = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "✖"; // Çarpı simgesi
            deleteButton.className = "delete-btn";
            deleteButton.onclick = () => {
                taskRow.remove();
            };

            let editButtonCell = document.createElement("td");
            let editButton = document.createElement("button");
            editButton.innerText = "✎"; // Düzenleme simgesi
            editButton.className = "edit-btn";
            editButton.onclick = () => editRow(taskRow, taskNameCell, taskDateCell);

            deleteButtonCell.appendChild(deleteButton);
            editButtonCell.appendChild(editButton);
            taskRow.append(taskIDCell, taskNameCell, taskDateCell, deleteButtonCell, editButtonCell);
            document.querySelector("#taskList tbody").append(taskRow);
            console.log(taskRow);
        }

        const editCell = (cell) => {
            const originalText = cell.innerText;
            cell.innerHTML = `<input type='text' class='edit-input' value='${originalText}' />`;
            const input = cell.querySelector("input");
            input.focus();
            input.onblur = () => {
                cell.innerText = input.value;
            }
        }

        const editRow = (row, nameCell, dateCell) => {
            const originalName = nameCell.innerText;
            const originalDate = dateCell.innerText;
            nameCell.innerHTML = `<input type='text' class='edit-input' value='${originalName}' />`;
            dateCell.innerHTML = `<input type='text' class='edit-input' value='${originalDate}' />`;

            const nameInput = nameCell.querySelector("input");
            const dateInput = dateCell.querySelector("input");

            nameInput.focus();

            nameInput.onblur = () => {
                nameCell.innerText = nameInput.value;
            }

            dateInput.onblur = () => {
                dateCell.innerText = dateInput.value;
            }
        }

        const handleButtonClick = () => {
            let taskName = document.getElementById("taskName").value || "";
            let taskDate = document.getElementById("taskDate").value || "";
            let taskTime = document.getElementById("taskTime").value || "";

            let hasError = validateTaskInputs(taskName);
            console.log(hasError);
            if (!hasError) {
                addTaskToList(taskName, taskDate, taskTime);
            }
        }

        // Sayfa yüklendiğinde örnek görev ekleme
        window.onload = () => {
            addTaskToList("Complete project report", "2024-07-30", "09:00");
            addTaskToList("Buy groceries", "2024-07-25", "17:00");
            addTaskToList("Schedule meeting with team", "2024-07-28", "14:00");
            addTaskToList("Call the client", "2024-07-26", "10:30");
        }