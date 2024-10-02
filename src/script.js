document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    
    // Create a new task object
    const task = {
        title: title,
        description: description,
        priority: priority,
        completed: false
    };
    
    // Add the task to the list
    addTask(task);
    
    // Clear the form
    this.reset();
});

function addTask(task) {
    const taskList = document.getElementById('taskList');
    
    // Create list item for the task
    const li = document.createElement('li');
    li.classList.add(getPriorityClass(task.priority));

    // Add task content
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">
            <strong>${task.title}</strong> - ${task.description}
        </span>
        <div>
            <button class="complete" onclick="toggleComplete(this)">Complete</button>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'High':
            return 'priority-high';
        case 'Medium':
            return 'priority-medium';
        case 'Low':
            return 'priority-low';
    }
}

function toggleComplete(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.querySelector('span').classList.toggle('completed');
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const title = prompt('Edit Task Title', taskItem.querySelector('strong').innerText);
    const description = prompt('Edit Task Description', taskItem.querySelector('span').innerText.split(' - ')[1]);

    if (title && description) {
        taskItem.querySelector('strong').innerText = title;
        taskItem.querySelector('span').innerHTML = `<strong>${title}</strong> - ${description}`;
    }
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}
