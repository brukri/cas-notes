import NotesStorage from "./NotesStorage";
import moment from 'moment';
import 'moment/locale/de-ch';

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_FINISH_DATE = 'finishDate';
const SORT_BY_PRIORITY = 'priority';

class NotesLogic {
    constructor() {
        this.manageNotesModel = ManageNotesModel.createDefault();
        this.modelUpdateCallback = undefined;
    }

    static convertDate(notes) {
        notes.forEach((note) => {
            note.dueDate = moment(note.dueDate).format('DD.MM.YYYY');
        });
    }

    updateSortBy(sortBy) {
        this.manageNotesModel.sortBy = sortBy;
        this.updateModels();
    }

    updateShowFinished(showFinished) {
        this.manageNotesModel.showFinished = showFinished;
        this.updateModels();
    }

    static transformPriority(notes) {
        notes.forEach((entry) => {
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
        });
    }

    createOrUpdateNote(id, title, description, priorityNumber, dueDate, finishDate) {
        if (!!id) {
            NotesStorage.updateNote(NotesModel.createUpdated(id, title, description, priorityNumber, dueDate, finishDate)).then(() => {
                this.updateModels();
            });
        } else {
            NotesStorage.createNote(NotesModel.createNew(title, description, priorityNumber, dueDate, finishDate)).then(() => {
                this.updateModels();
            });
        }
    }

    init(modelUpdateCallback) {
        this.modelUpdateCallback = modelUpdateCallback;
        this.updateModels();
        moment.locale('de-ch');
    }

    setFinishDate(noteId) {
        const note = NotesStorage.loadNote(noteId);
        note.finishDate = moment().format('YYYY-MM-DD');
        note.finished = true;
        NotesStorage.updateNote(note);
        this.updateModels();
    }

    updateModels() {
        NotesStorage.loadAllNotes().then(notes => {
            if (!this.manageNotesModel.showFinished) {
                notes = NotesLogic.filterUnFinishedNotes(notes);
            }

            const sortedNotes = NotesLogic.sort(notes, this.manageNotesModel.sortBy);
            NotesLogic.transformPriority(sortedNotes);
            NotesLogic.convertDate(sortedNotes);
            this.manageNotesModel.entries = sortedNotes;
            this.modelUpdateCallback(this.manageNotesModel);
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