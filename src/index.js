import './styles/styles.css';
import NotesController from './js/NotesController';

require('handlebars');
const contentDiv = document.getElementById('content');
const notesController = new NotesController(contentDiv);

// Bind notesController to the global scope
window.notesController = notesController;

init();

function init() {
    notesController.init();
    notesController.showManageNotesView();
}