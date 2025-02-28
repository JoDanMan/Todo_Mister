// What these 3 lines do:
// They're just grabbing 3 important parts of the HTML webpage (like pointing at them and saying "I'll use these later!"):

// todoForm = The <form> where you type new todos
// (Example: <form>... in HTML)

// todoInput = The text box <input> where you type your todo
// (Example: <input id="todo-input">)

// todoListUL = The <ul> (unordered list) that holds all todos
// (Example: <ul id="todo-list">)

// Why this matters for a todo list:
// These are the "control panel" elements you'll need to:
// Detect when the user submits a new todo (todoForm)
// Read what they typed (todoInput.value)
// Add the new todo to the list (todoListUL.appendChild())
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

////////////////////////////////////////////////
// let allTodos = getTodos();
// getTodos() is a function (probably defined elsewhere in the code) that loads saved todos from storage (like localStorage in the browser).
// allTodos is now an array holding all your todos.
// (Example: ["Buy milk", "Walk the dog"])

// updateTodoList();
// This is another function that updates the HTML list (the <ul>) to show all the todos stored in allTodos.
// (It probably loops through allTodos and creates <li> elements for each todo.)

// Why this matters:
// allTodos is your "source of truth"—the actual data.
// updateTodoList() makes sure the UI matches the data (what you see on the screen).
let allTodos = getTodos();
updateTodoList();

//////////////////////////////////////////////

// todoForm.addEventListener("submit", ...)
// Listens for when you submit the form (like pressing Enter or a "Add" button).

// e.preventDefault()
// Stops the page from reloading (the default behavior when a form is submitted).
// Without this, your todo list would disappear every time you add a new todo!

// addTodo()
// Calls a function (defined elsewhere) to add the new todo to the list.

// Why this matters:
// This is the "Add" button's brain! It ensures:
// The form doesn’t reload the page.
// Your todo is actually added to the list.
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

/////////////////////////////////////////////////
// What addTodo() does:
// This function adds a new todo to your list. Here's the step-by-step:

// const todoText = todoInput.value.trim();
// Grabs the text you typed into the input box and removes extra spaces at the start/end.
// Example: If you type " Buy milk ", it becomes "Buy milk".

// if (todoText.length > 0)
// Checks if you actually typed something (not just spaces).
// Example: "Buy milk" passes, but "" (empty) or " " (spaces) get ignored.

// Creates a todo object:
// javascript
// Copy
// { text: todoText, completed: false }
// Stores the todo text and marks it as "not completed" by default.
// Example: { text: "Walk the dog", completed: false }

// allTodos.push(todoObject)
// Adds the new todo to the allTodos array (your list of todos).
// Example: allTodos now has [{text: "Walk the dog", ...}, ...]

// updateTodoList()
// Updates the HTML to show the new todo on the screen.

// saveTodos()
// Saves the updated list to storage (like localStorage), so it doesn’t vanish when you refresh.

// todoInput.value = ""
// Clears the input box so you can type a new todo.
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// What updateTodoList() does:
// This function refreshes the entire todo list on the screen. Here's the breakdown:

// todoListUL.innerHTML = "";
// Clears the entire list (like wiping a whiteboard clean).
// Why? So we can rebuild the list from scratch every time something changes (prevents duplicates).

// allTodos.forEach((todo, todoIndex) => { ... })
// Loops through every todo in your allTodos array.

// For each todo, it:
// Creates an HTML element for the todo (using createTodoItem()).
// Adds it to the list (todoListUL.append()).

// Why this matters:
// This is how your todos stay visible on the screen!
// Every time you add, delete, or toggle a todo, updateTodoList() re-renders the whole list to match allTodos.
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// What createTodoItem() does:
// This function creates the HTML for a single todo item (like a "Buy milk" entry). Here's the play-by-play:
// Creates a unique ID (todoId) using the index
// (Example: "todo-0" for the first todo)

// Builds the HTML structure for a todo item:
// A checkbox (hidden by default, replaced by a custom SVG checkmark)
// The todo text (like "Walk the dog")
// A delete button (trash icon)

// Connects functionality:
// Delete button ➡️ Calls deleteTodoItem(todoIndex) when clicked
// Checkbox ➡️ Updates todo.completed status and saves to storage

// Key Features Explained:
//id="${todoId}"
//Links the checkbox to its labels (clicking text/SVG toggles the checkbox)

//delete-button
//Clicking this will delete the todo (handled by deleteTodoItem function)

//checkbox.checked
//Shows if the todo is completed (gray line-through style likely in CSS)

//Why This Matters:
//This is the template for every todo item you see! It combines:
//Visual design (HTML/SVG)
//User interaction (checkboxes, delete buttons)
//Data connection (updates allTodos array)
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `          
  <input type="checkbox" id="${todoId}">
          <label for="${todoId}" class="custom-checkbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `;
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//What deleteTodoItem() does:
// This function removes a todo from your list. Here's the breakdown:

// allTodos = allTodos.filter((_, i) => i !== todoIndex)
// Creates a new array with all todos except the one at todoIndex.
// Example: If todoIndex is 2, it removes the third todo (arrays start at 0).

// saveTodos()
// Saves the updated list to storage (so the deletion is permanent).

// updateTodoList()
// Refreshes the HTML list to show the todos without the deleted item.

// Why This Matters:
// This is the "Delete" button's logic! It ensures:
// The todo is removed from data (allTodos).
// The UI and storage stay in sync.
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// What saveTodos() does:
// This function saves your todo list to the browser's storage (so it doesn't disappear when you refresh or close the page). Here's how:
// JSON.stringify(allTodos)
// Converts your allTodos array into a string (like turning a JavaScript object into text).
// Example: [{text: "Buy milk", completed: false}] ➡️ "[{\"text\":\"Buy milk\",\"completed\":false}]"

// localStorage.setItem("todos", todosJson)
// Saves the string to the browser's storage under the key "todos".
// Where? In Chrome, you can see this in DevTools > Application > Local Storage.

// Why this matters:
// This is how your todos stay permanent! Without this, your list would reset every time you reload the page.
function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// What getTodos() does:
// This function loads your saved todos from the browser's storage (if any exist). Here's the step-by-step:

// localStorage.getItem("todos")
// Tries to fetch the saved todos from storage.
// If nothing is saved yet, this returns null.

// || "[]"
// Acts as a safety net. If there’s no saved data (null), it defaults to "[]" (an empty array in JSON format).
// Why? So JSON.parse doesn’t crash when trying to parse null.

// JSON.parse(todos)
// Converts the JSON string back into a JavaScript array of todo objects.
// Example: "[{\"text\":\"Buy milk\"}]" ➡️ [{text: "Buy milk", completed: false}].
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
