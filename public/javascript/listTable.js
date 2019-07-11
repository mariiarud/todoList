var taskLists = new Map();
var currentTaskListId = "";
const LISTS_URL = "http://localhost:3000/lists"

function createNewTaskList(){
    listName = document.getElementById("newList").value;
    if(listName!=""){
        let newTaskList = createTaskList(listName);
        taskLists.set(newTaskList.id, newTaskList);
        currentTaskListId = newTaskList.id;
        createListInTable(newTaskList);
        updateTaskTable();
        clearInputFild();
        addNewElement(LISTS_URL, newTaskList);

        saveChanges();
    }
    return false;
}

function createTaskList(listName){
    let newTaskList = new TaskList(generateId(), listName);
    return newTaskList;
}

function updateListTable(){
    let table = document.getElementById("listTable");
    clearTable(table);
    taskLists.forEach(function(list) {
        createListInTable(list)
    });
}

function createListInTable(list){
    let table = document.getElementById("listTable");
    var tr = table.insertRow();
    var td = tr.insertCell();
    tr.className = "listTr";
    tr.id = "listTr"+list.id;
    tr.addEventListener("mouseover", function(){ displayControlButton(list.id); }); 
    tr.addEventListener("mouseout", function(){ hideControlButton(list.id); }); 
    td.appendChild(createTaskListDivElement(list));
}

function createTaskListDivElement(list){
    let taskControlBox = document.createElement("div");
    taskControlBox.className = "listControlBox";

    let listNameDiv = document.createElement("div");
    listNameDiv.className = "taskTextDiv";
    listNameDiv.innerHTML = list.name;
    listNameDiv.addEventListener("click", function(){ currentTaskListId = list.id; updateTaskTable()}); 

    let delateListDiv = document.createElement("div");
    delateListDiv.className = "listControlButton";
    delateListDiv.style.backgroundImage = "url('../images/icon_x_mark.svg')"; 
    delateListDiv.addEventListener("click", function(){ delateList(list.id); });
    delateListDiv.id = "delateListDiv"+list.id;

    taskControlBox.appendChild(delateListDiv);
    taskControlBox.appendChild(listNameDiv);
    return taskControlBox;
}

function displayControlButton(id){
    let tskId = "delateListDiv"+id;
    document.getElementById(tskId).style.visibility = "visible";
}

function hideControlButton(id){
    let tskId = "delateListDiv"+id;
    document.getElementById(tskId).style.visibility = "hidden";
}

function delateList(id){
    taskLists.delete(id);

    let trId = "listTr"+id;
    let tr = document.getElementById(trId);
    tr.parentNode.removeChild(tr);

    if(taskLists.size>0){
        currentTaskListId = taskLists.values().next().value.id;
        tasks = rewriteTasks(id);
        updateTaskTable();
    }
    saveChanges();
}