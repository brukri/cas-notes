import NotesStorage from './NotesStorage';
import ManageNotesHandlebars from '../templates/manage-notes.handlebars';
import CreateNoteHandlebars from '../templates/create-note.handlebars';
import {
    ManageNotesModel,
    NotesLogic,
    NotesModel,
    SORT_BY_DUE_DATE,
    SORT_BY_FINISH_DATE,
    SORT_BY_PRIORITY
} from "./NotesModel";
import NotesUtils from "./NotesUtils";

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
            case 'input-show-finished':
                this.handleShowFinished(event.target);
        }

    }

    handleShowFinished(targetElement) {
        const isShowFinishedChecked = targetElement.checked;
        this.manageNotesModel.showFinished = isShowFinishedChecked;
        this.refreshManageNotesView();
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
        const notes = NotesStorage.loadAllNotes();
        let filteredNotes;

        if (!this.manageNotesModel.showFinished) {
            filteredNotes = NotesLogic.filterUnFinishedNotes(notes);
        } else {
            filteredNotes = notes;
        }
        const sortedNotes = NotesLogic.sort(filteredNotes, this.manageNotesModel.sortBy);
        const transformedSortedNotes = NotesLogic.transformPriority(sortedNotes);
        this.manageNotesModel.entries = transformedSortedNotes;

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
            NotesStorage.createNote(NotesModel.createNew(title, description, priorityNumber, dueDate, finishDate));

        }
    }
}

export default NotesController;