import './styles/styles.css';
import CreateNotesController from './js/CreateNotesController';
import ManageNotesController from './js/ManageNotesController';
import CreateNoteHandlebars from './templates/create-note.handlebars';
import ManageNotesHandlebars from './templates/manage-notes.handlebars';
import ManageNotesModel from './js/ManageNotesModel';

require('handlebars');
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
    showManageNotesView(ManageNotesModel.createDefault());
}

function showManageNotesView(config) {
    contentDiv.innerHTML = ManageNotesHandlebars(
        config
    );
    manageNotesController.addNoteEntriesToDom();
}

function showCreateNoteView(noteEntry) {
    contentDiv.innerHTML = CreateNoteHandlebars(
        noteEntry
    );
}