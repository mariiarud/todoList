class Task{
    constructor(id, taskText) {
        this.id = id;
        this.taskText = taskText;
        this.isCompleted = false;
    }
}
var tasks = new Map();
var isEditMod = false;

function createNewTask(){
    taskText = document.getElementById("newTask").value;
    if(taskText!=""){
        let newTask = createTask(taskText);
        tasks.set(newTask.id, newTask);
        updateTable();
        clearInputFild();
    }
}

function createTask(taskText){
    let newTask = new Task(generateId(), taskText);
    return newTask;
}

function updateTable(){
    saveChanges();
    let table = document.getElementById("tasksTable");
    clearTable(table);
    tasks.forEach(function(task) {
        var tr = table.insertRow();
        var td = tr.insertCell();
        tr.addEventListener("mouseover", function(){ displayControlBox(task.id); }); 
        tr.addEventListener("mouseout", function(){ hideControlBox(task.id); }); 
        td.appendChild(createTaskDivElement(task.id, task.taskText));
        td.id = "task_box"+task.id;
        if(task.isCompleted)
            td.style = "border: 1px solid #49ff24; ";
    });
}

function createTaskDivElement(id, taskText){
    let mainDiv = document.createElement("div");
    mainDiv.className = "taskDiv";
    // mainDiv.innerHTML = taskText;
    let taskControlBox = document.createElement("div");
    taskControlBox.className = "taskControlBox";
    taskControlBox.id = "control_box"+id;

    let checkTaskDiv = document.createElement("div");
    checkTaskDiv.className = "taskControlButton";
    checkTaskDiv.style.backgroundImage = "url('../images/icon_check_mark.svg')"; 
    checkTaskDiv.addEventListener("click", function(){ cheskTask(id); });

    let editTaskDiv = document.createElement("div");
    editTaskDiv.className = "taskControlButton";
    editTaskDiv.style.backgroundImage = "url('../images/icon_edit.svg')"; 
    editTaskDiv.addEventListener("click", function(){ startEditTask(id); });

    let delateTaskDiv = document.createElement("div");
    delateTaskDiv.className = "taskControlButton";
    delateTaskDiv.style.backgroundImage = "url('../images/icon_x_mark.svg')"; 
    delateTaskDiv.addEventListener("click", function(){ delateTask(id); });

    taskControlBox.appendChild(checkTaskDiv);
    taskControlBox.appendChild(editTaskDiv);
    taskControlBox.appendChild(delateTaskDiv);

    let textTaskDiv = document.createElement("div");
    textTaskDiv.className = "taskTextDiv";
    textTaskDiv.innerHTML = taskText;
    textTaskDiv.id = "textTaskDiv"+id;

    let editTaskTextDiv = document.createElement("div");
    editTaskTextDiv.className = "inputTaskDiv";
    editTaskTextDiv.id = "editTaskTextDiv"+id;

    let editInputFildId = "edit_input"+id;
    editTaskTextDiv.innerHTML = '<textarea id="'+editInputFildId+'" class="inputFildTask">'+taskText+'</textarea>';

    let confirmEdit = document.createElement("div");
    confirmEdit.className = "editButton";
    confirmEdit.style.backgroundImage = "url('../images/icon_check_mark.svg')"; 
    confirmEdit.addEventListener("click", function(){ editTask(id); });

    editTaskTextDiv.appendChild(confirmEdit);

    mainDiv.appendChild(taskControlBox);
    mainDiv.appendChild(textTaskDiv);
    mainDiv.appendChild(editTaskTextDiv);
    return mainDiv;
}

function clearInputFild(){
    document.getElementById("newTask").value = "";
}

function clearTable(table){
    table.innerHTML = "";
}

function displayControlBox(id){
    let tskId = "control_box"+id;
    document.getElementById(tskId).style.visibility = "visible";
}

function hideControlBox(id){
    let tskId = "control_box"+id;
    document.getElementById(tskId).style.visibility = "hidden";
}

function cheskTask(id){
    let tskId = "task_box"+id;
    if(tasks.get(id).isCompleted){
        document.getElementById(tskId).style = "border: 1px solid #acacac; ";
        tasks.get(id).isCompleted = false;
    }
    else {
        document.getElementById(tskId).style = "border: 1px solid #49ff24; ";
        tasks.get(id).isCompleted = true;
    }
    saveChanges();
}

function delateTask(id){
    tasks.delete(id);
    updateTable();
}

function startEditTask(id){
    let inputTaskDivId = "editTaskTextDiv"+id;
    let textTaskDivId = "textTaskDiv"+id;
    let inputTaskDiv = document.getElementById(inputTaskDivId);
    let textTaskDiv = document.getElementById(textTaskDivId);
    if(!isEditMod){
        inputTaskDiv.style.display = "block";
        textTaskDiv.style.display = "none";
    }
    else{
        inputTaskDiv.style.display = "none";
        textTaskDiv.style.display = "block";
    }
    isEditMod =!isEditMod;
}

function editTask(id){
    let editInputFildId = "edit_input"+id;
    taskText = document.getElementById(editInputFildId).value;
    let apdatedTask = tasks.get(id);
    apdatedTask.taskText = taskText;
    tasks.set(id, apdatedTask);
    startEditTask(id);
    updateTable();
}

function saveChanges(){
    localStorage.myTasks = JSON.stringify(Array.from(tasks.entries()));
}

function loadTasks(){
    tasks = new Map(JSON.parse(localStorage.myTasks));
    updateTable();
}

function generateId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }