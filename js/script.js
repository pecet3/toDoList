{
    const removeTask = (taskIndex) => {
            tasks.splice(taskIndex, 1);
            render();
        };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

        const tasks = [
            {
                content: "uczyć się",
                done: false,
            },
            {
                content: "odpocząć",
                done: true,
            },

        ];

        const render = () => {
            let htmlString = "";

            for (const task of tasks) {
                htmlString += ` 
            <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
                ${task.content}
                <button class = "js-remove">usuń</button>
                <button class = "js-done">zrobione?</button>
            </li>    
            `;
            }

            document.querySelector(".js-tasks").innerHTML = htmlString;

            const removeButtons = document.querySelectorAll(".js-remove");
            removeButtons.forEach((removeButton, index) => {
                removeButton.addEventListener("click", () => {
                    removeTask(index);
                });
            });

            const toggleDoneButtons = document.querySelectorAll(".js-done");
            
            toggleDoneButtons.forEach((toggleDoneButton, index) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskDone(index);
                });
            });


        };
        const onFormSubmit = (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
        }

        const addNewTask = (newTaskContent) => {
            tasks.push({
                content: newTaskContent,
                done: false,
            });
            render();
        }

        const init = () => {
            render();
            const form = document.querySelector(".js-form");


            form.addEventListener("submit", onFormSubmit);
        }

        init();

    }