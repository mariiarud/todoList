var tasks = new Map();
const TASKS_URL = "http://localhost:8080/tasks";

function createNewTask(){
    taskText = document.getElementById("newTask").value;
    if(!isFieldEmpty(taskText)){
        let newTask = createTask(taskText);
        postData(TASKS_URL, newTask)
            .then(data => addNewTask(data))
            .catch(error => console.error(error));
        clearInputField();
    }
    return false;
}

function addNewTask(newTask){
    console.log(newTask);
    tasks.set(newTask.id, newTask);
    createTaskInTable(newTask);
}

function createTask(taskText){
    let newTask = new Task(currentTaskListId, taskText);
    return newTask;
}

function updateTaskTable(){
    document.getElementById("listName").innerHTML = taskLists.get(currentTaskListId).name;
    let table = document.getElementById("tasksTable");
    clearTable(table);
    // var tasks = getCurrentTasks();
    tasks.forEach(function(task) {
        createTaskInTable(task);
    });
}

function createTaskInTable(task){
    let table = document.getElementById("tasksTable");
    var tr = table.insertRow();
    tr.id = "taskTr"+task.id;
    var td = tr.insertCell();
    td.className = "task_table_td";
    td.appendChild(createTaskDivElement(task));
}

// function getCurrentTasks(){
//     var currentTaskList = new Map();
//     tasks.forEach(function(task){
//         if(task.parentId == currentTaskListId)
//             currentTaskList.set(task.id, task);
//     });
//     return currentTaskList;
// }

function createTaskDivElement(task){
    var mainDiv = document.createElement("div");
    mainDiv.className = "task_main_div";

    var taskElementDiv = document.createElement("div");
    taskElementDiv.className = "task_element_div";

    var taskCompletedCheck = document.createElement("input");
    taskCompletedCheck.className = "task_completed_checkbox";
    taskCompletedCheck.type = "checkbox";
    taskCompletedCheck.checked = task.completed;
    taskCompletedCheck.addEventListener("click", function(){ checkTask(task.id); });
    
// {/* <span class="checkmark"></span> */}
    var spanChackMark = document.createElement("span");
    spanChackMark.className = "checkmark";

    let textTaskDiv = document.createElement("div");
    textTaskDiv.className = "task_text_div";
    textTaskDiv.innerHTML = getFormatedTaskText(task);
    textTaskDiv.id = "textTaskDiv"+task.id;
    textTaskDiv.addEventListener("click", function() { startEditTask(task.id);} );

    var label = document.createElement("label");
    label.className = "container";

    var delateTaskDiv = document.createElement("div");
    delateTaskDiv.className = "task_delate_button";
    delateTaskDiv.addEventListener("click", function(){ delateTask(task.id); });

    var inputTaskDiv = document.createElement("div");
    inputTaskDiv.className = "task_editing_form_div";
    inputTaskDiv.id = "inputTaskDiv"+task.id;

    var taskForm = document.createElement("form");
    taskForm.onsubmit = function() {return editTask(task.id);};

    var taskEditInput = document.createElement("input");
    taskEditInput.type = "text";
    taskEditInput.value = task.text;
    taskEditInput.className = 'input_fild';
    taskEditInput.id="taskEditInput"+task.id;
    taskEditInput.addEventListener("keyup", function() {cancelEditing(event, task.id, task.text);});

    taskForm.appendChild(taskEditInput);

    inputTaskDiv.appendChild(taskForm);
    label.appendChild(taskCompletedCheck);
    label.appendChild(spanChackMark);
    
    taskElementDiv.appendChild(label);

    mainDiv.appendChild(taskElementDiv);
    mainDiv.appendChild(textTaskDiv);
    mainDiv.appendChild(inputTaskDiv);
    mainDiv.appendChild(delateTaskDiv);
    return mainDiv;
}

function getFormatedTaskText(task){
    if(task.completed)
        return "<del style='color:#808080;'>"+task.text+"</del>";
    else
        return task.text;    
}

function clearInputField(){
    document.getElementById("newTask").value = "";
    document.getElementById("newList").value = "";
}

function clearTable(table){
    table.innerHTML = "";
}

function checkTask(id){


    let textTaskDivId = "textTaskDiv"+id;
    if(tasks.get(id).completed){
        tasks.get(id).completed = false;
    }
    else {
        tasks.get(id).completed = true;
    }
    document.getElementById(textTaskDivId).innerHTML = getFormatedTaskText(tasks.get(id));

    patchElement(TASKS_URL, tasks.get(id));

}

function delateTask(id){
    deleteElementById(TASKS_URL, id);
    let trId = "taskTr"+id;
    let tr = document.getElementById(trId);
    tr.parentNode.removeChild(tr);
    tasks.delete(id);
}

function rewriteTasks(id){
    var newTasks = new Map();
    tasks.forEach(function(task){
        if(task.parentId!=id)
            newTasks.set(task.id, task);
        else
            deleteElementById(TASKS_URL, task.id);
    });
    return newTasks;
}

function startEditTask(id){
    tasks.forEach(function(task){
        if(task.id!=id && task.parentId==currentTaskListId)
            hideInput(task.id);
    });
    showInput(id); 
}

function editTask(id){
    let editInputFildId = "taskEditInput"+id;
    let textTaskDivId = "textTaskDiv"+id;

    taskText = document.getElementById(editInputFildId).value;
    if(!isFieldEmpty(taskText)){
        hideInput(id);
        let apdatedTask = tasks.get(id);
        apdatedTask.text = taskText;
        tasks.set(id, apdatedTask);
        document.getElementById(textTaskDivId).innerHTML = getFormatedTaskText(tasks.get(id));
        patchElement(TASKS_URL, apdatedTask);
    }
    else{
        document.getElementById(editInputFildId).value = tasks.get(id).text;
    }
    hideInput(id);
    return false;
}

function cancelEditing(event, id, text){
    if (event.keyCode === 27) {
        let editInputFildId = "taskEditInput"+id;
        document.getElementById(editInputFildId).value = text;
        hideInput(id);
    }
}

function showInput(id){
    let inputTaskDivId = "inputTaskDiv"+id;
    let textTaskDivId = "textTaskDiv"+id;
    let editInputFildId = "taskEditInput"+id;

    document.getElementById(inputTaskDivId).style.display = "block";
    document.getElementById(editInputFildId).focus();
    document.getElementById(textTaskDivId).style.display = "none";
} 

function hideInput(id){
    let inputTaskDivId = "inputTaskDiv"+id;
    let textTaskDivId = "textTaskDiv"+id;

    document.getElementById(inputTaskDivId).style.display = "none";
    document.getElementById(textTaskDivId).style.display = "block";
}

