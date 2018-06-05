const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_FINISH_DATE = 'finishDate';
const SORT_BY_PRIORITY = 'priority';

class NotesLogic {
    static transformPriority(notes) {
        return notes.map((entry) => {
            switch (entry.priorityNumber) {
                case 1:
                    entry.priority = 'Very Low';
                    break;
                case 2:
                    entry.priority = 'Low';
                    break;
                case 3:
                    entry.priority = 'Medium';
                    break;
                case 4:
                    entry.priority = 'High';
                    break;
                case 5:
                    entry.priority = 'Very High';
                    break;
            }
            return entry;
        });
    }

    static sort(notes, sortBy) {
        switch (sortBy) {
            case SORT_BY_FINISH_DATE:
                return this._sortByFinishDate(notes);
            case SORT_BY_DUE_DATE:
                return this._sortByDueDate(notes);
            case SORT_BY_PRIORITY:
                return this._sortByPriority(notes);
        }
        return notes;
    }

    static _sortByFinishDate(notes) {
        return notes.sort((entry1, entry2) => {
            return new Date(entry2.finishDate) - new Date(entry1.finishDate);
        });
    }

    static _sortByDueDate(notes) {
        return notes.sort((entry1, entry2) => {
            return new Date(entry2.dueDate) - new Date(entry1.dueDate);
        });
    }

    static _sortByPriority(notes) {
        return notes.sort((entry1, entry2) => {
            return entry2.priorityNumber - entry1.priorityNumber;
        });
    }

    static filterUnFinishedNotes(notes) {
        return notes.filter((entry) => {
            return !entry.finished;
        });
    }
}

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

class ManageNotesModel {
    constructor(sortBy, showFinished) {
        this.sortBy = sortBy;
        this.showFinished = showFinished;
    }

    static createDefault() {
        return new ManageNotesModel(SORT_BY_FINISH_DATE, true);
    }
}


export {NotesModel, ManageNotesModel, NotesLogic, SORT_BY_DUE_DATE, SORT_BY_FINISH_DATE, SORT_BY_PRIORITY};