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
    .then(response => response.json());
}

function putDataById(url = '', id = '' , data = {}) {
    return fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json()); 
}

function getTasks(url){
    getData(url)
    .then((data) => {
        data.forEach(function(task){
            console.log(task);
            tasks.set(task.id, task);
        });
    })
    .catch(error => console.error(error));
}

function getLists(url){
    getData(url)
    .then((data) => {
        data.forEach(function(list){
            console.log(list);
            taskLists.set(list.id, list);
        });

        if(taskLists.size > 0){
            selectFirstList();
        }
    })
    .catch(error => console.error(error));
}

function addNewElement(url, element){
    postData(url, element)
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

function deleteElementById(url, id){
    deleteDataById(url, id)
    .then(data => console.log("Delete element by Id: "+id))
    .catch(error => console.error(error));
}

function putElement(url, element){
    putDataById(url, element.id, element)
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

// ///////////////////////////////////////////////////////////////////////////////

// function saveChanges(){
//     localStorage.myLists = JSON.stringify(Array.from(taskLists.entries()));
//     localStorage.myTasks = JSON.stringify(Array.from(tasks.entries()));
// }

function loadTasks(){
    getTasks(TASKS_URL);
    getLists(LISTS_URL);
}