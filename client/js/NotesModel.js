import NotesRestClient from './NotesRestClient';
import moment from 'moment';
import 'moment/locale/de-ch';

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_FINISH_DATE = 'finishDate';
const SORT_BY_PRIORITY = 'priority';

class NotesLogic {
    constructor() {
        this.manageNotesModel = ManageNotesModel.createDefault();
        this.modelUpdateCallback = undefined;
        this.notesRestClient = new NotesRestClient();
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

    updateSortBy(sortBy) {
        this.manageNotesModel.sortBy = sortBy;
        this.updateModels();
    }

    updateShowFinished(showFinished) {
        this.manageNotesModel.showFinished = showFinished;
        this.updateModels();
    }

    createOrUpdateNote(id, title, description, priorityNumber, dueDate, finishDate) {
        if (!!id) {
            this.notesRestClient.updateNote(NotesModel.createUpdated(id, title, description, priorityNumber, dueDate, finishDate)).then(() => {
                this.updateModels();
            });
        } else {
            this.notesRestClient.createNote(NotesModel.createNew(title, description, priorityNumber, dueDate, finishDate)).then(() => {
                this.updateModels();
            });
        }
    }

    setFinishDate(noteId) {
        this.notesRestClient.loadNote(noteId).then(note => {
            note.finishDate = moment().format('YYYY-MM-DD');
            note.finished = true;
            this.notesRestClient.updateNote(note).then(this.updateModels());
        });
    }

    updateModels() {
        this.notesRestClient.loadAllNotes().then(notes => {
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

    static convertDate(notes) {
        notes.forEach((note) => {
            note.dueDate = moment(note.dueDate).format('DD.MM.YYYY');
        });
    }

    static filterUnFinishedNotes(notes) {
        return notes.filter((entry) => {
            return !entry.finished;
        });
    }

    init(modelUpdateCallback) {
        this.modelUpdateCallback = modelUpdateCallback;
        this.updateModels();
        moment.locale('de-ch');
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
            if (entry1.finishDate === undefined && entry2.finishDate === undefined) {
                return 0;
            } else if (entry1.finishDate === undefined) {
                return 1;
            } else if (entry2.finishDate === undefined) {
                return -1;
            }

            return new Date(entry1.finishDate) - new Date(entry2.finishDate);
        });
    }

    static _sortByDueDate(notes) {
        return notes.sort((entry1, entry2) => {
            return new Date(entry1.dueDate) - new Date(entry2.dueDate);
        });
    }

    static _sortByPriority(notes) {
        return notes.sort((entry1, entry2) => {
            return entry2.priorityNumber - entry1.priorityNumber;
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