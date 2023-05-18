//finding elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todoForm");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const message = document.querySelector("#message");

//show message
const showMessage = (text,status) =>{
    message.textContent = text;
    message.classList.add(`bg-${status}`);
    setTimeout(() => {
        message.textContent = "";
        message.classList.remove(`bg-${status}`)    
    }, 500);
}

//create todo
const createTodo = (todoId,todoValue) =>{
    const todoElement = document.createElement("li");
    todoElement.classList.add("liStyle")
    todoElement.id = todoId;
    
    todoElement.innerHTML = `
        <span> ${todoValue} </span>
        <span > <button class="btn"  id="deleteButton"> <i class="fa-solid fa-trash"></i> </button> </span>
    `;
    todoLists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);
}

//delete todo;
const deleteTodo = (event) =>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted","danger");

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId != selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

//getTodosFromLocalStorage
const getTodosFromLocalStorage = () =>{
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}
//adding todo
const addTodo = (event) =>{
    event.preventDefault();
    const todoValue = todoInput.value;
    
    //unique id
    const todoId = Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("todo is added","success");

    //adding todo to local storage
    const todos = getTodosFromLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));

    todoInput.value = "";
}

//load todo
const loadTodo = () =>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todoValue));
}

//adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded",loadTodo);






