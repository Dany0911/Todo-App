// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const errorMessage = document.getElementById('error-message');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');
const allButton = document.getElementById('all-button');
const activeButton = document.getElementById('active-button');
const completedButton = document.getElementById('completed-button');

// Initialize tasks array
let tasks;

// Check if tasks exist in local storage, if exist retrieve it otherwise create new array
if (localStorage.getItem('tasks')) {
tasks = JSON.parse(localStorage.getItem('tasks'));
} else {
tasks = [];
}

// Add event listener to add button
addButton.addEventListener('click', addTask);

// Add event listener to task list
taskList.addEventListener('click', handleTaskListClick);

// Add event listener to filter buttons
allButton.addEventListener('click', showAllTasks);
activeButton.addEventListener('click', showActiveTasks);
completedButton.addEventListener('click', showCompletedTasks);

// Function to add a task
function addTask() {
const task = taskInput.value.trim();

// Check for blank or incorrect content
if (task === '') {
showError('Task cannot be blank');
return;
}

// Add task to tasks array
tasks.push({ name: task, completed: false });

// Save tasks array to local storage
localStorage.setItem('tasks', JSON.stringify(tasks));

// Clear input field
taskInput.value = '';

// Render tasks
renderTasks();
}

// Function to handle task list click events
function handleTaskListClick(event) {
const target = event.target;

// Check if delete button is clicked
if (target.classList.contains('delete-button')) {
const index = parseInt(target.dataset.index);
// Remove task from tasks array
tasks.splice(index, 1);

// Save tasks array to local storage
localStorage.setItem('tasks', JSON.stringify(tasks));

// Render tasks
renderTasks();
}
// Check if checkbox is clicked
if (target.classList.contains('checkbox')) {
  const index = parseInt(target.dataset.index);
  // Toggle completed status of task
tasks[index].completed = !tasks[index].completed;

// Save tasks array to local storage
localStorage.setItem('tasks', JSON.stringify(tasks));

// Render tasks
renderTasks();
}
}

// Function to show all tasks
function showAllTasks() {
  renderTasks();
}

// Function to show active tasks
function showActiveTasks() {
  const activeTasks = tasks.filter(task => !task.completed);
  renderTasks(activeTasks);
}

// Function to show completed tasks
function showCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  renderTasks(completedTasks);
}

// Function to render tasks
function renderTasks(filteredTasks = tasks) {
  // Clear task list
  taskList.innerHTML = '';
 
  // Render tasks, go through the task list with a for each loophole
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
      <span class="task-name ${task.completed ? 'completed' : ''}">${task.name}</span>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
 
  // Update counter
  const openTasks = tasks.filter(task => !task.completed).length;
  counter.textContent = `Open tasks: ${openTasks}`;
 
  // Hide/show elements based on tasks
  if (tasks.length === 0) {
    counter.style.display = 'none';
    filterContainer.style.display = 'none';
  } else {
    counter.style.display = 'block';
    filterContainer.style.display = 'block';
  }
}

// Function to show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
 
  // Highlight input field
  taskInput.classList.add('error');
 
  // Clear error message and highlighting after 3 seconds
  setTimeout(() => {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    taskInput.classList.remove('error');
  }, 3000);
}