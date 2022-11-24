{
    const bindEventsRemove = () => {

        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

    };

    const bindEventsToggle = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const removeTask = (taskIndex) => {
        tasks =[
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks=[
            ...tasks.slice(0,taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),

        ];
        // tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    let tasks = [];
    let hiddeDoneButtons = false;

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="list__element">
                <button class = "js-done button list__button list__button--toggleDone">
                ${task.done ? "✔" : ""}
                </button>
                <p 
                class="list__content ${task.done ? "list__content--done" : ""}">
                ${task.content}
                </p>
                <button class = "js-remove button list__button list__button--remove">
                🗑
                </button>
            </li>    
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    const resetInputField = (inputContent) => {
        inputContent.value = "";
    };

    const focusOnInputField = (inputContent) => {
        inputContent.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks=[
            ...tasks,
            {content: newTaskContent,}
        ];
        render();
    };
 
    const render = () => {
        renderTasks();
        bindEventsRemove();
        bindEventsToggle();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const inputContent = document.querySelector(".js-newTask");
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            resetInputField(inputContent);
        }
        focusOnInputField(inputContent);
    };


    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

   
    init();

}