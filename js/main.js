
// Task List project
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all EventListeners
loadEventListeners();

// Load all EventListeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task Event
  form.addEventListener('submit', addTask);

  // Remove task
  taskList.addEventListener('click', removeTask);

  // Clear all tasks
  clearBtn.addEventListener('click', clearAlltasks);

  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from localStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // Crate li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create textNode and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// addTask function
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add task');
  }

  // Crate li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create textNode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in localStorage
  storeTasksInLocalStorage(taskInput.value);


  // Clear input
  taskInput.value = '';

  e.preventDefault();
};

// Store task in localStorage
function storeTasksInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  // Add to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    console.log(e.target);
    e.target.parentElement.parentElement.remove();
    // Remove from localStorage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
};

// Remove from localStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAlltasks() {
  // taskList.innerHTML = '';

  // Faster delete way https://jsperf.com/innerhtml-vs-removechild/47
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear all tasks from localStorage
  clearAllTasksFromLocalStorage();
};

// Clear all ls tasks
function clearAllTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else  {
      task.style.display = 'none';
    }
  });
}




