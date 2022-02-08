const handleRemoveButtonClick = (e, todoItemElement) => {
  // console.log('Item remove click', todoItemElement);
  const todoListElement = getTodoListElement();
  if (todoListElement && todoItemElement) {
    const confirmMessage = "You're going to remove a todo. Thiet hk?";
    if (window.confirm(confirmMessage)) {
      todoListElement.removeChild(todoItemElement);
    }
  }
};

const setTodoFormValue = (todo) => {
  // Find and set title
  const todoForm = document.querySelector('#todoForm');
  if (todoForm) {
    // Set form attribute: data-todo-id to indicate edit mode
    todoForm.setAttribute('data-todo-id', todo.id);

    const formControlNameList = ['title'];
    for (const controlName of formControlNameList) {
      const control = todoForm.querySelector(`[name=${controlName}]`);
      control.value = todo[controlName];
    }

    // Update button
    const submitButton = todoForm.querySelector('button[type=submit]');
    if (submitButton) {
      submitButton.classList.remove('btn-primary');
      submitButton.classList.add('btn-success');
      submitButton.innerText = 'Update to list';
    }
  }
};

const handleEditButtonClick = (e, todo) => {
  console.log('Edit button click', todo);
  // Set form value: current todo
  setTodoFormValue(todo);

  // Handle form submit: update to an existing li
};

const buildTodoItem = (todo) => {
  const todoItemTemplate = document.querySelector('#todoItemTemplate');
  const todoItemFragment = todoItemTemplate.content.cloneNode(true);
  // console.log(todoItemFragment);

  const todoItemElement = todoItemFragment.querySelector('li');
  // console.log(todoItemElement);
  if (todoItemElement) {
    todoItemElement.setAttribute('data-todo-id', todo.id.toString());
  }

  // Find and set title
  const todoTitleElement = todoItemElement.querySelector('#todoItemTitle');
  if (todoTitleElement) {
    todoTitleElement.innerText = todo.title;

    // Prevent duplicate id
    todoTitleElement.removeAttribute('id');
  }

  // Find and add event click for button remove
  const removeButton = todoItemElement.querySelector('#todoItemRemove');
  if (removeButton) {
    removeButton.addEventListener('click', (e) =>
      handleRemoveButtonClick(e, todoItemElement)
    );
    removeButton.removeAttribute('id');
  }

  // Find and add event click for button edit
  const editButton = todoItemElement.querySelector('#todoItemEdit');
  if (editButton) {
    editButton.addEventListener('click', (e) => handleEditButtonClick(e, todo));
    editButton.removeAttribute('id');
  }

  return todoItemElement;
};

const getTodoListElement = () => document.querySelector('ul#todoList');

const renderTodoList = (todoList) => {
  const todoListElement = getTodoListElement();
  if (todoListElement) {
    for (const todo of todoList) {
      const todoItemElement = buildTodoItem(todo);
      todoListElement.appendChild(todoItemElement);
    }
  }
};

const todoList = [
  {
    id: 1,
    title: 'Learn JS NEW',
  },
  {
    id: 2,
    title: 'Code JS NEW',
  },
];
renderTodoList(todoList);

// Handle todo form submit
/**
 * {
 *    title: 'hello',
 *    email: 'abc@abc.com',
 * }
 */
const getTodoFormValue = () => {
  const formValue = {};

  const todoForm = document.querySelector('#todoForm');
  if (todoForm) {
    const formControlNameList = ['title'];
    for (const controlName of formControlNameList) {
      const control = todoForm.querySelector(`[name=${controlName}]`);
      formValue[controlName] = control.value;
    }
  }
  console.log(formValue);

  return formValue;
};

const randomNumber = (min, max) => {
  const randomNumber = Math.trunc(Math.random() * (max - min));

  return randomNumber + min;
};

const resetTodoForm = () => {
  const todoForm = document.querySelector('#todoForm');
  todoForm.reset();
  todoForm.removeAttribute('data-todo-id');

  // Update button
  const submitButton = todoForm.querySelector('button[type=submit]');
  if (submitButton) {
    submitButton.classList.remove('btn-success');
    submitButton.classList.add('btn-primary');
    submitButton.innerText = 'Add to list';
  }
};

const handleTodoFormSubmit = (e) => {
  console.log('Todo form submit');
  e.preventDefault();

  const todoForm = document.querySelector('#todoForm');
  if (todoForm) {
    // Determine whether add or edit mode
    const mode = todoForm.hasAttribute('data-todo-id') ? 'edit' : 'add';

    const formValue = getTodoFormValue();
    switch (mode) {
      case 'edit': {
        const todoId = todoForm.getAttribute('data-todo-id');
        const todoListElement = getTodoListElement();
        const todoItemElement = todoListElement.querySelector(
          `li[data-todo-id="${todoId}"]`
        );
        const newTodo = {
          id: todoId,
          ...formValue,
        };
        const newTodoItemElement = buildTodoItem(newTodo);
        todoListElement.replaceChild(newTodoItemElement, todoItemElement);
        break;
      }
      case 'add': {
        // Get current form value
        // Random todo id --> todo object
        // Build todo item element (li)
        // Add li to ul
        const randomId = randomNumber(10000, 100000);
        const newTodo = {
          id: randomId,
          ...formValue,
        };
        const todoItemElement = buildTodoItem(newTodo);
        const todoListElement = getTodoListElement();
        if (todoListElement && todoItemElement) {
          todoListElement.appendChild(todoItemElement);
        }
        break;
      }
      default:
    }
  }

  // Reset form
  resetTodoForm();
  // todoForm.reset();
};

const todoForm = document.querySelector('#todoForm');
if (todoForm) {
  todoForm.addEventListener('submit', handleTodoFormSubmit);
}
