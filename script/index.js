//Variáveis - Seleção de elemtos
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const editInput = document.querySelector("#edit_input");
const cancelEditBtn = document.querySelector("#cancel_edit_button");
const settings = document.querySelector(".settings");
const eraseBtn = document.querySelector(".erase_btn");
const selectFilter = document.querySelector("#todo_filter");
const searchInput = document.querySelector("#todo_search");

let originalValue = "";

//Funções
const saveTodo = (text) => {
	const todo = document.createElement("div");
	todo.classList.add("todo");
	todo.innerHTML = `
		<p>${text}</p>
		<div class="todo_buttons">
			<button class="todo_btn finish_task">
				<img src="./img/check.svg" alt="" />
			</button>
			<button class="todo_btn edit_task">
				<img src="./img/edit.svg" alt="" />
			</button>
			<button class="todo_btn delete_task">
				<img src="./img/cancel.svg" alt="" />
			</button>
		</div>`;
	todoList.append(todo);
	todoInput.value = "";
	todoInput.focus();
};

const toggleForms = () => {
	editForm.classList.toggle("active");
	todoForm.classList.toggle("hide");
	settings.classList.toggle("hide");
};

const updateTodo = (text) => {
	const todos = document.querySelectorAll(".todo");
	todos.forEach((todo) => {
		let todoTitle = todo.querySelector("p");
		if (todoTitle.innerHTML === originalValue) {
			todoTitle.innerHTML = text;
		}
	});
};

const getSearchTodos = (search) => {
	const todos = document.querySelectorAll(".todo");
	todos.forEach((todo) => {
		let todoTitle = todo.querySelector("p").innerHTML.toLowerCase();
		const normalizeSearch = search.toLowerCase();
		todo.style.display = "flex";

		if (!todoTitle.includes(normalizeSearch)) {
			todo.style.display = "none";
		}
	});
};

const filterTodos = (filterValue) => {
	const todos = document.querySelectorAll(".todo");
	switch (filterValue) {
		case "all":
			todos.forEach((todo) => {
				todo.style.display = "flex";
			});
			break;
		case "done":
			todos.forEach((todo) => {
				todo.classList.contains("done")
					? (todo.style.display = "flex")
					: (todo.style.display = "none");
			});
			break;
		case "todo":
			todos.forEach((todo) => {
				!todo.classList.contains("done")
					? (todo.style.display = "flex")
					: (todo.style.display = "none");
			});
			break;
		default:
			break;
	}
};

//Eventos
todoForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const inputValue = todoInput.value;
	if (inputValue) {
		saveTodo(inputValue);
	}
});
cancelEditBtn.addEventListener("click", (e) => {
	e.preventDefault();
	toggleForms();
});
editForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const editInputValue = editInput.value;
	if (editInputValue) {
		updateTodo(editInputValue);
	}
	toggleForms();
});

document.addEventListener("click", (e) => {
	const targetEl = e.target;
	const parentEl = targetEl.closest("div.todo");
	let todoTitle;
	if (parentEl && parentEl.querySelector("p")) {
		todoTitle = parentEl.querySelector("p").innerHTML;
		console.log(todoTitle);
	}

	if (targetEl.classList.contains("finish_task")) {
		parentEl.classList.toggle("done");
	}
	if (targetEl.classList.contains("delete_task")) {
		parentEl.classList.add("close");
		setTimeout(() => {
			parentEl.remove();
		}, 1000);
	}
	if (targetEl.classList.contains("edit_task")) {
		toggleForms();
		editInput.value = todoTitle;
		originalValue = todoTitle;
	}
});
searchInput.addEventListener("keyup", (e) => {
	const search = e.target.value;
	getSearchTodos(search);
});
eraseBtn.addEventListener("click", (e) => {
	e.preventDefault();
	searchInput.value = "";
	getSearchTodos(searchInput.value);
});
selectFilter.addEventListener("change", (e) => {
	const filterValue = e.target.value;
	filterTodos(filterValue);
});
