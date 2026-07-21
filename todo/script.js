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
        <span>${text}</span>
        <button class="delete">削除</button>
    `;

    li.querySelector(".delete").addEventListener("click", function () {
        li.remove();
    });

    list.appendChild(li);

    input.value = "";
    input.focus();
}
