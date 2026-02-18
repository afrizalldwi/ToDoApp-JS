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
    showErrorMessage("Tidak boleh kosong!");
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
        <div class="bg-slate-700 text-gray-100 border border-slate-600 shadow-[0_8px_20px_rgba(0,0,0,0.35)] rounded-md mt-8 max-w-full p-6 flex justify-between items-start gap-4">
          <div class="flex-1">
            <p id="text-${realIndex}" class="break-words">
              ${list.todo}
            </p>

            <input 
              id="input-edit-${realIndex}"
              type="text"
              value="${list.todo}"
              class="hidden w-full mt-2 bg-slate-800 border border-slate-500 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex flex-col gap-2 min-w-[90px]">

            <button 
              onclick="editTodo(${realIndex})"
              id="btn-edit-${realIndex}"
              class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 border-3 rounded-md border-black px-4 py-2 cursor-pointer shadow-[6px_6px_rgba(0,0,0,0.4)] transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Edit
            </button>

            <button 
              onclick="saveEdit(${realIndex})"
              id="btn-save-${realIndex}"
              class="hidden bg-green-500 hover:bg-green-600 border-3 rounded-md border-black px-4 py-2 cursor-pointer shadow-[6px_6px_rgba(0,0,0,0.4)] transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Save
            </button>

            <button 
              onclick="deleteTodo(${realIndex})"
              class="bg-red-500 hover:bg-red-600 active:bg-red-700 border-3 rounded-md border-black px-4 py-2 cursor-pointer shadow-[6px_6px_rgba(0,0,0,0.4)] transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Delete
            </button>

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
      px-3 py-1 text-sm cursor-pointer rounded-md border-3 border-black shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
      ${i === currentPage ? "bg-blue-500 hover:bg-blue-600 text-gray-100" : "bg-gray-300 hover:bg-gray-400 active:bg-gray-500"}
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
  document.getElementById(`text-${index}`).classList.add("hidden");
  document.getElementById(`input-edit-${index}`).classList.remove("hidden");

  document.getElementById(`btn-edit-${index}`).classList.add("hidden");
  document.getElementById(`btn-save-${index}`).classList.remove("hidden");
};

const saveEdit = (index) => {
  const input = document.getElementById(`input-edit-${index}`);
  const newValue = input.value.trim();

  if (newValue === "") {
    showErrorMessage("Tidak boleh kosong!");
    return;
  }

  dataTodo[index].todo = newValue;
  saveData();
  renderTampilan();
};

const showErrorMessage = (message) => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
};

renderTampilan();
