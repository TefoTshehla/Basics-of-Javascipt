let todoList;

try{
  const storedList = localStorage.getItem('todoList');

  if(storedList){
    todoList = JSON.parse(storedList);
  } else{
    todoList = [{name:'make dinner', dueDate: '2025-05-22'},
      {name: 'wash dishes', dueDate: '2025-05-22'}];
  }
} catch(error){
  console.error('could not parse list from localstorage:', error);
  todoList = [{name:'make dinner', dueDate: '2025-05-22'},
      {name: 'wash dishes', dueDate: '2025-05-22'}];
}

renderTodoList();

function renderTodoList(){
    let todoListHtml = '';
    //Generating the html 
    //loop through an array
    for(let i=0; i<todoList.length; i++){
        const todo = todoList[i];
        //delete button
        const html = `
        <div class="todo-item">
        <div>${todo.name}</div> 
        <div>${todo.dueDate}</div>
        <button class="butt-grid" onclick="
        todoList.splice(${i}, 1);
        saveTostorage();
        renderTodoList();
        ">
        Delete
        </button>
        </div>
        `;
        todoListHtml +=html;
    }
    //console.log(todoListHtml);
document.querySelector('.js-todo-list').innerHTML = todoListHtml;
}

const inputField = document.querySelector('.js-name-input');
inputField.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    event.preventDefault(); //prevent the default action
    addTodo(); //call the function
  }
});

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const dateInput = document.querySelector('.date-style');
  
  const name = inputElement.value;
  const dueDate = dateInput.value;
  //before pushing check validation
  if(name.trim() !==''){
    todoList.push({
      name: name,
      dueDate: dueDate
    });
  }
  
  console.log(todoList);
  //clear the input field
  inputElement.value = '';
  dateInput.value = '';

  saveTostorage();
  renderTodoList();
}

function saveTostorage(){
  localStorage.setItem('todoList', JSON.stringify(todoList));
}