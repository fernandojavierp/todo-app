document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Cargar tareas desde el almacenamiento local
    loadTasks();

    // Manejar envío del formulario
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = todoInput.value.trim();
        if (task) {
            addTask(task);
            todoInput.value = '';
            saveTasks();
        }
    });

    // Añadir una nueva tarea
    function addTask(task, completed = false) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <input type="checkbox" class="complete-checkbox" ${completed ? 'checked' : ''}>
            <span class="text ${completed ? 'completed' : ''}">${task}</span>
            <button class="edit-button">✏️</button>
            <button class="delete-button">❌</button>
        `;
        todoList.appendChild(li);

        // Eliminar tarea al hacer clic en el botón
        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        // Marcar tarea como completada
        li.querySelector('.complete-checkbox').addEventListener('change', (event) => {
            if (event.target.checked) {
                li.querySelector('span').classList.add('completed');
            } else {
                li.querySelector('span').classList.remove('completed');
            }
            saveTasks();
        });

        // Editar tarea
        li.querySelector('.edit-button').addEventListener('click', () => {
            const newTask = prompt('Edit task:', li.querySelector('span').textContent);
            if (newTask !== null) {
                li.querySelector('span').textContent = newTask;
                saveTasks();
            }
        });
    }

    // Guardar tareas en el almacenamiento local
    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('.todo-item').forEach(li => {
            tasks.push({
                task: li.querySelector('span').textContent,
                completed: li.querySelector('.complete-checkbox').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Cargar tareas desde el almacenamiento local
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.task, task.completed));
    }
});
