function taskComponent(task){


    function createTaskDivElement(){
        var mainDiv = document.createElement("div");
        mainDiv.className = "task_main_div";
    
        var taskElementDiv = document.createElement("div");
        taskElementDiv.className = "task_element_div";
    
        var taskCompletedCheck = document.createElement("input");
        taskCompletedCheck.className = "task_completed_checkbox";
        taskCompletedCheck.type = "checkbox";
        taskCompletedCheck.checked = task.isCompleted;
        // taskCompletedCheck.addEventListener("click", function(){ checkTask(task.id); });
        
        let textTaskDiv = document.createElement("div");
        textTaskDiv.className = "task_text_div";
        textTaskDiv.innerHTML = getFormatedTaskText(task);
        textTaskDiv.id = "textTaskDiv"+task.id;
        // textTaskDiv.addEventListener("click", function() { startEditTask(task.id);} );
    
        var delateTaskDiv = document.createElement("div");
        delateTaskDiv.className = "task_delate_button";
        // delateTaskDiv.addEventListener("click", function(){ delateTask(task.id); });
    
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
        taskElementDiv.appendChild(taskCompletedCheck);
    
        mainDiv.appendChild(taskElementDiv);
        mainDiv.appendChild(textTaskDiv);
        mainDiv.appendChild(inputTaskDiv);
        mainDiv.appendChild(delateTaskDiv);
        return mainDiv;
    }
}