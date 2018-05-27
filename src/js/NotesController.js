import NotesStorage from './NotesStorage';
import ManageNotesModel from './ManageNotesModel';
import ManageNotesHandlebars from '../templates/manage-notes.handlebars';
import CreateNoteHandlebars from '../templates/create-note.handlebars';
import NotesModel from "./NotesModel";
import NotesUtils from "./NotesUtils";

class NotesController {
    constructor(contentDiv) {
        this.manageNotesModel = ManageNotesModel.createDefault();
        this.contentDiv = contentDiv;
    }

    init() {
        this.contentDiv.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        const noteId = event.target.getAttribute('note-id');
        this.createOrUpdateNote(noteId);
        this.showManageNotesView();
    }

    showManageNotesView() {
        this.enrichMangeNotesModelWithEntries();
        this.contentDiv.innerHTML = ManageNotesHandlebars(
            this.manageNotesModel
        );
    }

    showCreateNoteView(noteEntry) {
        this.contentDiv.innerHTML = CreateNoteHandlebars(
            noteEntry
        );
    }

    enrichMangeNotesModelWithEntries() {
        this.manageNotesModel.entries = NotesStorage.loadAllNotes();
    }

    editNote(id) {
        const note = NotesStorage.loadNote(parseInt(id));
        this.showCreateNoteView(note);
    }

    createOrUpdateNote(id) {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const priority = parseInt(NotesUtils.getSelectedRadioValue('radio-priority'));

        if (!!id) {
            NotesStorage.updateNote(new NotesModel(parseInt(id), title, description, priority, dueDate, false));
        } else {
            NotesStorage.saveNote(new NotesModel(undefined, title, description, priority, dueDate, false));

        }
    }
}

export default NotesController;