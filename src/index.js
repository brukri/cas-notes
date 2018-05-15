import './styles/styles.css';
import CreateNoteTemplate from './templates/create-note.tpl.html';
import ManageNotesTemplate from './templates/manage-notes.tpl.html';
import NoteEntry from './templates/note-entry.tpl.html';
import CreateNotesController from './js/CreateNotesController';
import ManageNotesController from './js/ManageNotesController';

const createNotesController = new CreateNotesController();
const manageNotesController = new ManageNotesController();
// Bind createNotesController to the global scope
window.createNotesController = createNotesController;
window.manageNotesController = manageNotesController;
window.showManageNotesView = showManageNotesView;
window.showCreateNoteView = showCreateNoteView;

const contentDiv = document.getElementById('content');

init();

function init() {
    showManageNotesView();
}

function showManageNotesView() {
    contentDiv.innerHTML = `${ManageNotesTemplate}`;
    addNoteEntries();
}

function addNoteEntries() {
    const noteEntriesDiv = document.getElementById('note-entries');
    noteEntriesDiv.innerHTML = `${NoteEntry}`;

}

function showCreateNoteView() {
    contentDiv.innerHTML = `${CreateNoteTemplate}`;
}