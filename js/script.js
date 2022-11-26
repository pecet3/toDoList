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
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),

        ];
        render();
    };

    let tasks = [];
    let hideDoneTasks = false;

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="list__element ${hideDoneTasks ? "list__element--hidden": ""} ">
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
        tasks = [
            ...tasks,
            { content: newTaskContent, }
        ];
        render();
    };
    const renderButtons = () => {
        let renderButtonsHtml = "";
        let isAnyDone = tasks.some(({ done }) => done);
        let isAllDone = tasks.every(({ done }) => done);

        if (tasks.length !== 0) {
            renderButtonsHtml = `
        <button class = "js-hideDoneTasksButton container__hideButton"
        ${isAnyDone ? "" : "disabled"}>
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} 
        Ukończone</button>
        <button class = "js-doneAllButton container__doneAllButton"
        ${isAllDone ? "disabled" : ""}>
        Ukończ Wszystkie</button>`
        };

        document.querySelector(".js-renderButtons").innerHTML = renderButtonsHtml;

    };

    const bindEventsDoneAllButton = () => {
        const markAsDoneAllTasksButton = document.querySelector(".js-doneAllButton");

        if (markAsDoneAllTasksButton) {
            markAsDoneAllTasksButton.addEventListener("click", markAllTasksAsDone);
        };

    };

    const markAllTasksAsDone = () => {
        tasks = [...tasks.map(task => ({...task, done:true,}))];
        render();
    };

    const bindEventsHideDoneTasksButton = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        console.log(hideDoneTasks);
        render();
    };

    const render = () => {
        renderButtons();
        renderTasks();
        bindEventsRemove();
        bindEventsToggle();
        bindEventsDoneAllButton();
        bindEventsHideDoneTasksButton();
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