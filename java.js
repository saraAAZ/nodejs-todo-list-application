const readline = require('readline');

// Task object prototype
function Task(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
}

// Array to store tasks
const tasks = [];

// Function to add a new task
function addNewTask() {
    const interface = readline.createInterface({input: process.stdin, output: process.stdout});

    interface.question('Enter task description: ', (description) => {
        interface.question('Enter task due date: ', (dueDate) => {
            interface.question('Enter task priority: ', (priority) => {
                const newTask = new Task(description, dueDate, priority);
                tasks.push(newTask);
                console.log('Task added successfully.');
                interface.close();
                displayMenu();
            });
        });
    });
}

// Function to list all tasks
function listAllTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log('Tasks:');
        tasks.forEach((task, index) => {
            console.log(`${
                index + 1
            }. ${
                task.description
            } [${
                task.dueDate
            }, ${
                task.priority
            }] - ${
                task.completed ? 'Completed' : 'Incomplete'
            }`);
        });
    } displayMenu();
}

// Function to list completed tasks
function listCompletedTasks() {
    const completedTasks = tasks.filter((task) => task.completed);
    if (completedTasks.length === 0) {
        console.log('No completed tasks found.');
    } else {
        console.log('Completed Tasks:');
        completedTasks.forEach((task, index) => {
            console.log(`${
                index + 1
            }. ${
                task.description
            } [${
                task.dueDate
            }, ${
                task.priority
            }]`);
        });
    } displayMenu();
}

// Function to mark a task as completed
function markTaskAsDone() {
    const interface = readline.createInterface({input: process.stdin, output: process.stdout});

    interface.question('Enter the task number to mark as completed: ', (taskNumber) => {
        const index = parseInt(taskNumber) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = true;
            console.log('Task marked as completed.');
        } else {
            console.log('Invalid task number.');
        } interface.close();
        displayMenu();
    });
}

// Function to delete a task
function deleteTask() {
    const interface = readline.createInterface({input: process.stdin, output: process.stdout});

    interface.question('Enter the task number to delete: ', (taskNumber) => {
        const index = parseInt(taskNumber) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            console.log('Task deleted successfully.');
        } else {
            console.log('Invalid task number.');
        } interface.close();
        displayMenu();
    });
}

// Function to sort tasks by due date
function sortTasksByDueDate() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    console.log('Tasks sorted by due date.');
    displayMenu();
}

// Function to sort tasks by priority
function sortTasksByPriority() {
    tasks.sort((a, b) => a.priority - b.priority);
    console.log('Tasks sorted by priority.');
    displayMenu();
}

// Function to clear all tasks
function clearAllTasks() {
    tasks.length = 0;
    console.log('All tasks cleared.');
    displayMenu();
}

// Function to display the menu
function displayMenu() {
    console.log(`
***************************
Welcome to JS TODO-APP
***************************

Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark a task as done
5) Delete a task
6) Sort tasks by due date
7) Sort tasks by priority
8) Clear all tasks
9) Quit
***************************
`);

    const interface = readline.createInterface({input: process.stdin, output: process.stdout});

    interface.question("What's your choice? ", (choice) => {
        switch (choice) {
            case '1': addNewTask();
                break;
            case '2': listAllTasks();
                break;
            case '3': listCompletedTasks();
                break;
            case '4': markTaskAsDone();
                break;
            case '5': deleteTask();
                break;
            case '6': sortTasksByDueDate();
                break;
            case '7': sortTasksByPriority();
                break;
            case '8': clearAllTasks();
                break;
            case '9':
                console.log('Goodbye!');
                interface.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                displayMenu();
                break;
        }
    });
}

// Start the application
displayMenu();
