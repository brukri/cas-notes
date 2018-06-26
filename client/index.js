import NotesController from './js/NotesController';

require('handlebars');

const contentDiv = document.getElementById('content');
const notesController = new NotesController(contentDiv);

notesController.init();