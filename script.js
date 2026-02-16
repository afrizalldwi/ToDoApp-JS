const form = document.getElementById("form-todo");
const todo = document.getElementById("input-todo");
// const data = document.getElementById("data-todoapp");
const render = document.getElementById("render");

let dataTodo = JSON.parse(localStorage.getItem("dataTodo")) || [];

const saveData = () => {
  localStorage.setItem("dataTodo", JSON.stringify(dataTodo));
};

form.addEventListener("submit", (e) => {
  //   e.preventDefault();

  const todoValue = todo.value.trim();

  if (todoValue === "") {
    alert("ToDo tidak boleh kosong!!");
    todo.focus();
    return;
  }

  const todoData = {
    todo: todoValue,
  };

  dataTodo.push(todoData);
  saveData();
  renderTampilan();
  todo.value = "";
});

const ambilData = () => {
  const dataString = localStorage.getItem("dataTodo");

  return JSON.parse(dataString) || [];
};

const renderTampilan = () => {
  let data = ambilData();

  render.innerHTML = "";

  data.forEach((list) => {
    const div = document.createElement("div");

    div.innerHTML = `
            <div
          class="bg-white mt-8 rounded-sm max-w-xs p-6"
        >${list.todo}</div>
        `;

    render.appendChild(div);
  });
};

renderTampilan();
