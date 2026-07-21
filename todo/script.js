const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function addTask() {

    const text = input.value.trim();

    if (text === "") {
        alert("やることを入力してください");
        return;
    }

    const li = document.createElement("li");

  li.innerHTML = `
    <span class="task">${text}</span>
    <button class="delete">削除</button>
`;
    const task = li.querySelector(".task");

task.addEventListener("click", function(){

    task.classList.toggle("completed");

});

    li.querySelector(".delete").addEventListener("click", function () {
        li.remove();
    });

    list.appendChild(li);

    input.value = "";
    input.focus();
}
input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});
