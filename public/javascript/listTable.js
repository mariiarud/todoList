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
        clearInputField();
        addNewElement(LISTS_URL, newTaskList);
        changeList(newTaskList.id);
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
    tr.className = "list_table_tr";
    tr.id = "listTr"+list.id;
    tr.addEventListener("mouseover", function(){ displayControlButton(list.id); }); 
    tr.addEventListener("mouseout", function(){ hideControlButton(list.id); }); 
    td.id = "listTd"+list.id;
    td.appendChild(createTaskListDivElement(list));
    td.addEventListener("click", function(){ changeList(list.id)}); 
}

function createTaskListDivElement(list){
    let listElementBox = document.createElement("div");
    listElementBox.className = "list_main_div";

    let listNameDiv = document.createElement("div");
    listNameDiv.className = "list_name_div";
    listNameDiv.innerHTML = list.name;

    let delateListDiv = document.createElement("div");
    delateListDiv.className = "delate_list_button";
    delateListDiv.addEventListener("click", function(event){ delateList(list.id); event.stopPropagation();});
    delateListDiv.id = "delateListDiv"+list.id;

    listElementBox.appendChild(listNameDiv);
    listElementBox.appendChild(delateListDiv);
    return listElementBox;
}

function changeList(id){
    taskLists.forEach(function(list){
        let trId = "listTr"+list.id;
        if(list.id!=id)
            document.getElementById(trId).style = "background-color: #fff;";
    });
    currentTaskListId = id; 
    selectCurrentList();
    updateTaskTable()
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
    deleteElementById(LISTS_URL, id);
    taskLists.delete(id);

    let trId = "listTr"+id;
    let tr = document.getElementById(trId);
    tr.parentNode.removeChild(tr);

    if(taskLists.size>0){
        currentTaskListId = taskLists.values().next().value.id;
        tasks = rewriteTasks(id);
        updateTaskTable();
        changeList(currentTaskListId);
    }
    // saveChanges();
}

function selectFirstList(){
    currentTaskListId = taskLists.values().next().value.id;
    updateListTable();
    updateTaskTable();
    selectCurrentList()
}

function selectCurrentList(){
    let trId = "listTr"+currentTaskListId;
    document.getElementById(trId).style = "background-color: #a3f5f8;";
}