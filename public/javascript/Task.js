class Task{
    constructor(id, taskText, parentId) {
        this.id = id;
        this.parentId = parentId
        this.taskText = taskText;
        this.isCompleted = false;
    }
}