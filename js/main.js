const inputText = document.querySelector("#input-text");

inputText.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		addTodo();
	}
});

/* Memuat todos ketika web selesai dimuat*/
window.addEventListener("load", function () {
	const savedTodos = localStorage.getItem("todos");
	let todos = [];

	if (savedTodos) {
		todos = JSON.parse(savedTodos);
	}

	todos.forEach((todo) => {
		createTodoElement(todo.text, todo.completed);
	});
});

/* Menambahkan todo */
function addTodo(event) {
	const todoText = inputText.value.trim();

	if (todoText != "") {
		createTodoElement(todoText, false);

		const savedTodos = localStorage.getItem("todos");
		let todos = [];

		if (savedTodos) {
			todos = JSON.parse(savedTodos);
		}

		todos.push({ text: todoText, completed: false });
		localStorage.setItem("todos", JSON.stringify(todos));

		inputText.value = "";
	}
}

/* menchecked todo */
function completedTodo(event) {
	const todoItem = event.target.parentNode;
	const todoText = event.target;
	todoItem.classList.toggle("todo-list__item--completed");

	const savedTodos = localStorage.getItem("todos");
	let todos = [];

	if (savedTodos) {
		todos = JSON.parse(savedTodos);
	}

	todos.map((todo) => {
		if (todo.text == todoText.innerText) {
			return todo.completed
				? (todo.completed = false)
				: (todo.completed = true);
		}
	});

	localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(event) {
	const todoItem = event.target.parentNode;
	const todoText = todoItem.querySelector("#todo-text");

	const savedTodos = localStorage.getItem("todos");
	let todos = [];

	if (savedTodos) {
		todos = JSON.parse(savedTodos);
	}

	todos = todos.filter((todo) => {
		return todo.text != todoText.innerText;
	});

	localStorage.setItem("todos", JSON.stringify(todos));

	todoItem.remove();
}

/* Membuat element todo */
function createTodoElement(todoText, completed) {
	const todo = document.querySelector("#todo-list");

	const todoItem = `
		<li class="todo-list__item ${completed ? "todo-list__item--completed" : ""}">
			<span class="todo-list__item__text" id="todo-text" onclick="completedTodo(event)">
				${todoText}
			</span>
			<button class="todo-list__item__delete" id="delete-button" onclick="deleteTodo(event)">X</button>
		</li>`;

	todo.insertAdjacentHTML("afterbegin", todoItem);
}
