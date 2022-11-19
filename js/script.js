{
    const bindEvents = () => {

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
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="list__element">
                <button class = "js-done button list__button list__button--toggleDone">
                ${task.done ? "✔" : ""}
                </button>
                <p 
                class="list__content ${task.done ? "list__content--toggleDone\"" : "\""}>
                ${task.content}
                </p>
                <button class = "js-remove button list__button list__button--remove">
                🗑
                </button>
            </li>    
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();


    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
        const inputContent = document.querySelector(".js-newTask");
        resetInputField(inputContent);
        focusOnInputField(inputContent);
    };

    const resetInputField = (inputContent) => {
        inputContent.value = "";
    };

    const focusOnInputField = (inputContent) => {
        inputContent.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

   
    init();

}