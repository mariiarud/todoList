function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    })
    .then(response => response.json()); // парсит JSON ответ в Javascript объект
}

function addNewElement(url, element){
    postData(url, {element})
    .then(data => console.log(JSON.stringify(data))) // JSON-строка полученная после вызова `response.json()`
    .catch(error => console.error(error));
}

function deleteElement(url, element){
    // postData('http://localhost:3000/tasks', {task})
    // .then(data => console.log(JSON.stringify(data))) // JSON-строка полученная после вызова `response.json()`
    // .catch(error => console.error(error));
}



///////////////////////////////////////////////////////////////////////////////

function saveChanges(){
    localStorage.myLists = JSON.stringify(Array.from(taskLists.entries()));
    localStorage.myTasks = JSON.stringify(Array.from(tasks.entries()));

    // var lists = Array.from(taskLists);
    // console.log(lists);
    // postData('http://localhost:3000/lists', {lists})
    // .then(data => console.log(JSON.stringify(data))) // JSON-строка полученная после вызова `response.json()`
    // .catch(error => console.error(error));
}

function loadTasks(){
    taskLists = new Map(JSON.parse(localStorage.myLists));
    tasks = new Map(JSON.parse(localStorage.myTasks));

    if(taskLists.size > 0){
        currentTaskListId = taskLists.values().next().value.id;
        updateListTable();
        updateTaskTable();
    }
}