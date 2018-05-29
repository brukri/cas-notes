import NotesStorage from './NotesStorage';
import ManageNotesModel from './ManageNotesModel';
import ManageNotesHandlebars from '../templates/manage-notes.handlebars';
import CreateNoteHandlebars from '../templates/create-note.handlebars';
import NotesModel from "./NotesModel";
import NotesUtils from "./NotesUtils";

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_FINISH_DATE = 'finishDate';
const SORT_BY_PRIORITY = 'priority';

class NotesController {
    constructor(contentDiv) {
        this.manageNotesModel = ManageNotesModel.createDefault();
        this.contentDiv = contentDiv;
    }

    init() {
        this.contentDiv.addEventListener("submit", this.handleFormSubmit.bind(this));
        this.contentDiv.addEventListener("click", this.handleClick.bind(this));
        this.manageNotesModel.sortBy = SORT_BY_FINISH_DATE;

    }

    handleFormSubmit(event) {
        const noteId = event.target.getAttribute('note-id');
        this.createOrUpdateNote(noteId);
        this.showManageNotesView();
    }

    handleClick(event) {
        const elementId = event.target.id;

        switch (elementId) {
            case 'radio-sort-by-finish-date':
                this.manageNotesModel.sortBy = SORT_BY_FINISH_DATE;
                this.refreshManageNotesView();
                break;
            case 'radio-sort-by-due-date':
                this.manageNotesModel.sortBy = SORT_BY_DUE_DATE;
                this.refreshManageNotesView();
                break;
            case 'radio-sort-by-priority':
                this.manageNotesModel.sortBy = SORT_BY_PRIORITY;
                this.refreshManageNotesView();
                break;
            case 'input-set-finished':
                this.handleSetFinishedClicked(event.target);
                break;
        }

    }

    handleSetFinishedClicked(targetElement) {
        const noteId = parseInt(targetElement.getAttribute('note-id'));
        this.setFinishDate(noteId);
    }

    setFinishDate(noteId) {
        const note = NotesStorage.loadNote(noteId);
        note.finishDate = new Date().toISOString();
        note.finished = true;
        NotesStorage.updateNote(note);
        this.refreshManageNotesView();
    }

    sort(notes) {
        switch (this.manageNotesModel.sortBy) {
            case SORT_BY_FINISH_DATE:
                return this.sortByFinishDate(notes);
            case SORT_BY_DUE_DATE:
                return this.sortByDueDate(notes);
            case SORT_BY_PRIORITY:
                return this.sortByPriority(notes);
        }
        return notes;
    }

    sortByFinishDate(notes) {
        return notes.sort((entry1, entry2) => {
            return new Date(entry2.finishDate) - new Date(entry1.finishDate);
        });
    }

    sortByDueDate(notes) {
        return notes.sort((entry1, entry2) => {
            return new Date(entry2.dueDate) - new Date(entry1.dueDate);
        });
    }

    sortByPriority(notes) {
        return notes.sort((entry1, entry2) => {
            return entry2.priorityNumber - entry1.priorityNumber;
        });
    }

    refreshManageNotesView() {
        this.enrichMangeNotesModelWithEntries();
        this.contentDiv.innerHTML = ManageNotesHandlebars(
            this.manageNotesModel
        );
    }

    showManageNotesView() {
        this.refreshManageNotesView();
    }

    showCreateNoteView(noteEntry) {
        this.contentDiv.innerHTML = CreateNoteHandlebars(
            noteEntry
        );
    }

    enrichMangeNotesModelWithEntries() {
        const sortedNotes = this.sort(NotesStorage.loadAllNotes());
        const transformedSortedNotes = this.transformPriority(sortedNotes);
        this.manageNotesModel.entries = transformedSortedNotes;

    }

    transformPriority(notes) {
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

    editNote(id) {
        const note = NotesStorage.loadNote(parseInt(id));
        this.showCreateNoteView(note);
    }

    createOrUpdateNote(id) {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const finishDate = document.getElementById('input-finish-date').value;
        const priorityNumber = parseInt(NotesUtils.getSelectedRadioValue('radio-priority'));

        if (!!id) {
            NotesStorage.updateNote(NotesModel.createUpdated(parseInt(id), title, description, priorityNumber, dueDate, finishDate));
        } else {
            NotesStorage.saveNote(NotesModel.createNew(title, description, priorityNumber, dueDate, finishDate));

        }
    }
}

export default NotesController;