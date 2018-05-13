import './styles/styles.css';
import CreateNoteTemplate from './templates/create-note.tpl.html';
import CreateNotesController from './js/CreateNotesController';

const createNotesController = new CreateNotesController();
// Bind createNotesController to the global scope
window.createNotesController = createNotesController;

const root = document.createElement("div");
root.innerHTML = `${CreateNoteTemplate}`;
document.body.appendChild(root)