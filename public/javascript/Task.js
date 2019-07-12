class Task{
    constructor(id, text, parentId) {
        this.id = id;
        this.parentId = parentId
        this.text = text;
        this.isCompleted = false;
    }
}