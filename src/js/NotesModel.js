class NotesModel {
    constructor(id, title, description, priorityNumber, dueDate, finishDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priorityNumber = priorityNumber;
        this.dueDate = dueDate;
        this.finishDate = finishDate;
    }

    static createNew(title, description, priorityNumber, dueDate, finishDate) {
        return new NotesModel(undefined, title, description, priorityNumber, dueDate, finishDate);
    }

    static createUpdated(id, title, description, priorityNumber, dueDate, finishDate) {
        return new NotesModel(id, title, description, priorityNumber, dueDate, finishDate);
    }

    isFinished() {
        return this.finishDate !== undefined;
    }

}

export default NotesModel;