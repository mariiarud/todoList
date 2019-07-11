var tasks = new Map();
var isEditMod = false;
const TASKS_URL = "http://localhost:3000/tasks"

function createNewTask(){
    taskText = document.getElementById("newTask").value;
    if(taskText!=""){
        let newTask = createTask(taskText);
        tasks.set(newTask.id, newTask);
        createTaskInTable(newTask);
        clearInputFild();
        addNewElement(TASKS_URL, newTask);

        saveChanges();
    }
    return false;
}

function createTask(taskText){
    let newTask = new Task(generateId(), taskText, currentTaskListId);
    return newTask;
}

function updateTaskTable(){
    document.getElementById("listName").innerHTML = taskLists.get(currentTaskListId).name;
    let table = document.getElementById("tasksTable");
    clearTable(table);
    var tasks = getCurrentTasks();
    tasks.forEach(function(task) {
        createTaskInTable(task);
    });
}

function createTaskInTable(task){
    let table = document.getElementById("tasksTable");
    var tr = table.insertRow();
    tr.id = "taskTr"+task.id;
    var td = tr.insertCell();
    td.appendChild(createTaskDivElement(task));
}

function getCurrentTasks(){
    var currentTaskList = new Map();
    tasks.forEach(function(task){
        if(task.parentId == currentTaskListId)
            currentTaskList.set(task.id, task);
    });
    return currentTaskList;
}

function createTaskDivElement(task){
    var mainDiv = document.createElement("div");
    mainDiv.className = "taskDiv";

    var taskElementDiv = document.createElement("div");
    taskElementDiv.className = "taskElementDiv";

    var taskCompletedCheck = document.createElement("input");
    taskCompletedCheck.className = "taskCompletedCheck";
    taskCompletedCheck.type = "checkbox";
    taskCompletedCheck.checked = task.isCompleted;
    taskCompletedCheck.addEventListener("click", function(){ checkTask(task.id); });
    
    let textTaskDiv = document.createElement("div");
    textTaskDiv.className = "taskTextDiv";
    textTaskDiv.innerHTML = task.taskText;
    textTaskDiv.id = "textTaskDiv"+task.id;
    textTaskDiv.addEventListener("click", function() { startEditTask(task.id);} );

    var delateTaskDiv = document.createElement("div");
    delateTaskDiv.className = "taskControlButton";
    delateTaskDiv.style.backgroundImage = "url('../images/icon_x_mark.svg')"; 
    delateTaskDiv.addEventListener("click", function(){ delateTask(task.id); });

    var inputTaskDiv = document.createElement("div");
    inputTaskDiv.className = "inputTaskDiv";
    inputTaskDiv.id = "inputTaskDiv"+task.id;

    var taskForm = document.createElement("form");
    taskForm.addEventListener("submit", function() {editTask(task.id);});

    var taskEditInput = document.createElement("input");
    taskEditInput.type = "text";
    taskEditInput.value = task.taskText;
    taskEditInput.className = 'inputFild';
    taskEditInput.id="taskEditInput"+task.id;
    taskEditInput.addEventListener("keyup", function() {cancelEditing(event, task.id);});

    taskForm.appendChild(taskEditInput);

    inputTaskDiv.appendChild(taskForm);
    taskElementDiv.appendChild(taskCompletedCheck);

    mainDiv.appendChild(taskElementDiv);
    mainDiv.appendChild(textTaskDiv);
    mainDiv.appendChild(inputTaskDiv);
    mainDiv.appendChild(delateTaskDiv);
    return mainDiv;
}

function clearInputFild(){
    document.getElementById("newTask").value = "";
    document.getElementById("newList").value = "";
}

function clearTable(table){
    table.innerHTML = "";
}

function checkTask(id){
    if(tasks.get(id).isCompleted){
        tasks.get(id).isCompleted = false;
    }
    else {
        tasks.get(id).isCompleted = true;
    }
    saveChanges();
}

function delateTask(id){
    let trId = "taskTr"+id;
    let tr = document.getElementById(trId);
    tr.parentNode.removeChild(tr);

    tasks.delete(id);
    saveChanges();
}

function rewriteTasks(id){
    var newTasks = new Map();
    tasks.forEach(function(task){
        if(task.parentId!=id)
            newTasks.set(task.id, task);
    });
    return newTasks;
}

function startEditTask(id){
    let inputTaskDivId = "inputTaskDiv"+id;
    let textTaskDivId = "textTaskDiv"+id;
    let editInputFildId = "taskEditInput"+id;

    let inputTaskDiv = document.getElementById(inputTaskDivId);
    let textTaskDiv = document.getElementById(textTaskDivId);
    let editInputFild = document.getElementById(editInputFildId);

    if(!isEditMod){
        inputTaskDiv.style.display = "block";
        editInputFild.focus();
        textTaskDiv.style.display = "none";
    }
    else{
        inputTaskDiv.style.display = "none";
        textTaskDiv.style.display = "block";
    }

    isEditMod =!isEditMod;
}

function editTask(id){
    let editInputFildId = "taskEditInput"+id;
    let inputTaskDivId = "inputTaskDiv"+id;

    taskText = document.getElementById(editInputFildId).value;
    document.getElementById(inputTaskDivId).innerHTML = taskText;

    let apdatedTask = tasks.get(id);
    apdatedTask.taskText = taskText;
    tasks.set(id, apdatedTask);

    saveChanges();
    return false;
}

function cancelEditing(event, id){
    if (event.keyCode === 27) {
        let inputTaskDivId = "inputTaskDiv"+id;
        let textTaskDivId = "textTaskDiv"+id;
        document.getElementById(inputTaskDivId).style.display = "none";;
        document.getElementById(textTaskDivId).style.display = "block";
    }
}

function generateId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }
