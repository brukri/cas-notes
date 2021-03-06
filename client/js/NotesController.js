import NotesRestClient from './NotesRestClient';
import ManageNotesHandlebars from '../templates/manage-notes.handlebars';
import CreateNoteHandlebars from '../templates/create-note.handlebars';
import {NotesLogic, SORT_BY_DUE_DATE, SORT_BY_FINISH_DATE, SORT_BY_PRIORITY} from "./NotesModel";
import NotesUtils from "./NotesUtils";

class NotesController {
    constructor(contentDiv) {
        this.contentDiv = contentDiv;
        this.notesLogic = new NotesLogic();
        this.notesRestClient = new NotesRestClient();
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
            case 'radio-style-main' :
                this.switchStyle('styles/main-styles.css');
                break;
            case 'radio-style-alternative':
                this.switchStyle('styles/alternative-styles.css');
                break;
            case 'input-set-finished':
            case 'label-set-finished':
                this.handleSetFinishedClicked(event.target);
                break;
            case 'input-show-finished':
                this.handleShowFinished(event.target);
                break;
            case 'button-cancel-create-note':
                this.notesLogic.updateModels();
                break;
            case 'button-show-create-note-view':
                this.showCreateNoteView();
                break;
            case 'button-edit-note':
                const noteId = event.target.getAttribute('note-id');
                this.editNote(noteId);
        }

    }

    handleShowFinished(targetElement) {
        const isShowFinishedChecked = targetElement.checked;
        this.notesLogic.updateShowFinished(isShowFinishedChecked);
    }

    handleSetFinishedClicked(targetElement) {
        const noteId = targetElement.getAttribute('note-id');
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
        this.notesRestClient.loadNote(id).then(note => {
            this.showCreateNoteView(note);
        });
    }

    createOrUpdateNote(id) {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const finishDate = document.getElementById('input-finish-date').value;
        const priorityNumber = parseInt(NotesUtils.getSelectedRadioValue('radio-priority'));

        this.notesLogic.createOrUpdateNote(id.trim(), title.trim(), description.trim(), priorityNumber, dueDate, finishDate);
    }

    switchStyle(cssFile) {
        const element = document.getElementById('link-stylesheet');
        element.setAttribute('href', cssFile);
    }
}

export default NotesController;