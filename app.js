const addButton = document.querySelector('#push');
const inputBox = document.querySelector('#newtask input');
const taskList = document.querySelector('#tasks');
const deleteButton = document.querySelectorAll('.delete');
const task = document.querySelectorAll('.taskname');

let LIST;
let id = 0;
let data = localStorage.getItem("TODO");
console.log(data);

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(item => {
        addTodo(item.todo, item.id, item.completed);
    });
}

function addTodo(todo, id, completed) {
    taskList.innerHTML +=
        `<div class="task" id="${id}">
            <span id="taskname" class="${completed}">${todo}</span>
            <button class="delete">X</button>
        </div>`;
}

document.addEventListener('keyup', function (event) {
    if (event.code == "Enter") {
        if (!inputBox.value.length == 0) {
            addTodo(inputBox.value, id, "");
            LIST.push({
                todo: inputBox.value,
                id: id,
                completed: ""
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
            console.log(localStorage.getItem("TODO"));

            inputBox.value = '';
        }
    }
});

addButton.addEventListener('click', function () {
    if (!inputBox.value.length == 0) {
        addTodo(inputBox.value, id, "");
        LIST.push({
            todo: inputBox.value,
            id: id,
            completed: ""
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;

        inputBox.value = '';
    }
});

taskList.addEventListener('click', function (event) {
    if (event.target.id == 'taskname') {
        event.target.classList.toggle('completed');
        LIST.forEach(item => {
            if (item.id == event.target.parentNode.id) {
                console.log(item);
                item.completed = item.completed == 'completed' ? '' : 'completed';
            }
        });
        console.log(LIST);
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    if (event.target.className == 'delete') {
        event.target.parentNode.remove();
        LIST.forEach(item => {
            if (item.id == event.target.parentNode.id) {
                var idx = LIST.indexOf(LIST.find((i)=>i['id']==event.target.parentNode.id));
                idx > -1 ? LIST.splice(idx, 1) : '';
            }
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
});