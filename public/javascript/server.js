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
    .then(res => res.json());
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



///////////////////////////////////////////////////////////////////////////////

function saveChanges(){
    localStorage.myLists = JSON.stringify(Array.from(taskLists.entries()));
    localStorage.myTasks = JSON.stringify(Array.from(tasks.entries()));
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