import NotesStorage from './NotesStorage';
import ManageNotesHandlebars from '../templates/manage-notes.handlebars';
import CreateNoteHandlebars from '../templates/create-note.handlebars';
import {NotesLogic, SORT_BY_DUE_DATE, SORT_BY_FINISH_DATE, SORT_BY_PRIORITY} from "./NotesModel";
import NotesUtils from "./NotesUtils";

class NotesController {
    constructor(contentDiv) {
        this.contentDiv = contentDiv;
        this.notesLogic = new NotesLogic();
    }

    init() {
        this.contentDiv.addEventListener("submit", this.handleFormSubmit.bind(this));
        this.contentDiv.addEventListener("click", this.handleClick.bind(this));
        this.notesLogic.init(this.refreshManageNotesView.bind(this));
    }

    handleFormSubmit(event) {
        const noteId = event.target.getAttribute('note-id');
        this.createOrUpdateNote(noteId);
    }

    handleClick(event) {
        const elementId = event.target.id;

        switch (elementId) {
            case 'radio-sort-by-finish-date':
                this.notesLogic.updateSortBy(SORT_BY_FINISH_DATE);
                break;
            case 'radio-sort-by-due-date':
                this.notesLogic.updateSortBy(SORT_BY_DUE_DATE);
                break;
            case 'radio-sort-by-priority':
                this.notesLogic.updateSortBy(SORT_BY_PRIORITY);
                break;
            case 'input-set-finished':
                this.handleSetFinishedClicked(event.target);
                break;
            case 'input-show-finished':
                this.handleShowFinished(event.target);
                break;
            case 'button-cancel-create-note':
                this.notesLogic.updateModels();
                break;
        }

    }

    handleShowFinished(targetElement) {
        const isShowFinishedChecked = targetElement.checked;
        this.notesLogic.updateShowFinished(isShowFinishedChecked);
    }

    handleSetFinishedClicked(targetElement) {
        const noteId = parseInt(targetElement.getAttribute('note-id'));
        this.notesLogic.setFinishDate(noteId);
    }

    refreshManageNotesView(manageNotesModel) {
        this.contentDiv.innerHTML = ManageNotesHandlebars(
            manageNotesModel
        );
    }

    showCreateNoteView(noteEntry) {
        this.contentDiv.innerHTML = CreateNoteHandlebars(
            noteEntry
        );
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

        this.notesLogic.createOrUpdateNote(id, title, description, priorityNumber, dueDate, finishDate);
    }
}

export default NotesController;