function getData(url = '') {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json()); 
}

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json()); 
}

function deleteDataById(url = '', id = '') {
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => console.log(response));
}


function patchDataById(url = '', id = '' , data = {}) {
    return fetch(`${url}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json()); 
}

function getTasksByListId(url = '', id = 0){
    return fetch(`${url}?parentId=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json());
}

function getLists(url){
    getData(url)
    .then((data) => {
        data.forEach(function(list){
            console.log(list);
            taskLists.set(list.id, list);
        });

        if(taskLists.size > 0){
            currentTaskListId = taskLists.values().next().value.id;
            updateListTable();
            getTasks();
        }
    })
    .catch(error => console.error(error));
}

function getTasks(){
    tasks = new Map();
    getTasksByListId(TASKS_URL, currentTaskListId)
    .then((data) => {
        data.forEach(function(task){
            console.log(task);
            tasks.set(task.id, task);
        });
        selectList();
    })
    .catch(error => console.error(error));
}

// function addNewElement(url, element){
//     postData(url, element)
//     .then(data => console.log(JSON.stringify(data)))
//     .catch(error => console.error(error));
// }

// function testAddNewElement(url, element){
//     console.log(JSON.stringify(element));
//     return postData(url, element);
// }

function deleteElementById(url, id){
    deleteDataById(url, id)
    .then(console.log("Delete element by Id: "+id))
    .catch(error => console.error(error));
}

function patchElement(url, element){
    patchDataById(url, element.id, element)
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

function loadTasks(){
    
    taskLists = new Map();

    getLists(LISTS_URL);
}

// function testFeath(element){
//     console.log(JSON.stringify(element));
//     fetch(
//         'http://localhost:8080/lists',
//         { 
//           method: 'POST', 
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(element)
//         }
//       ).then(result => result.json().then(console.log));
// }