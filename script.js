const form = document.getElementById("form-todo");
const todo = document.getElementById("input-todo");
// const data = document.getElementById("data-todoapp");
const render = document.getElementById("render");

let currentPage = 1;
const todoPerPage = 3;

let dataTodo = JSON.parse(localStorage.getItem("dataTodo")) || [];

const saveData = () => {
  localStorage.setItem("dataTodo", JSON.stringify(dataTodo));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

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

  const start = (currentPage - 1) * todoPerPage;
  const end = start + todoPerPage;
  const paginatedData = data.slice(start, end);

  paginatedData.forEach((list, index) => {
    const realIndex = start + index;

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="bg-gray-300 mt-8 rounded-sm max-w-full p-6 flex justify-between items-start gap-4">
          <p class="break-words flex-1">
            ${list.todo}
          </p>
          <div class="flex flex-col gap-2 min-w-[80px]">
            <button onclick="editTodo(${realIndex})" class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 duration-300 text-white px-4 py-2 rounded-sm cursor-pointer">Edit</button>
            <button onclick="deleteTodo(${realIndex})" class="bg-red-600 hover:bg-red-700 active:bg-red-800 duration-300 text-white px-4 py-2 rounded-sm cursor-pointer">Delete</button>
          </div>
        </div>
        `;

    render.appendChild(div);
  });

  renderPagination(data.length);
};

const renderPagination = (totalData) => {
  const totalPage = Math.ceil(totalData / todoPerPage);

  const oldPagination = document.getElementById("pagination");
  if (oldPagination) oldPagination.remove();

  const paginationDiv = document.createElement("div");
  paginationDiv.id = "pagination";
  paginationDiv.className = "flex justify-center gap-2 mt-6 flex-wrap";

  for (let i = 1; i <= totalPage; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    btn.className = `
      px-3 py-1 rounded-md text-sm cursor-pointer
      ${i === currentPage ? "bg-blue-900 hover:bg-blue-950 text-white duration-300" : "bg-gray-300 hover:bg-gray-400 active:bg-gray-500 duration-300"}
    `;

    btn.onclick = () => {
      currentPage = i;
      renderTampilan();
    };

    paginationDiv.appendChild(btn);
  }

  render.appendChild(paginationDiv);
};

const deleteTodo = (index) => {
  dataTodo.splice(index, 1);
  saveData();
  renderTampilan();
};

const editTodo = (index) => {
  const newValue = prompt("Edit todo:", dataTodo[index].todo);

  if (newValue === null || newValue === "") return;

  dataTodo[index].todo = newValue.trim();
  saveData();
  renderTampilan();
};

renderTampilan();
