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

saveTasks();
});

    li.querySelector(".delete").addEventListener("click", function () {
       li.remove();

saveTasks();
    });

 list.appendChild(li);

saveTasks();

input.value = "";
input.focus();
}
input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        addTask();

        function saveTasks(){

    localStorage.setItem("tasks", list.innerHTML);

}

    }

});
window.addEventListener("load", function(){

    const saved = localStorage.getItem("tasks");

    if(saved){

        list.innerHTML = saved;

    }

});
