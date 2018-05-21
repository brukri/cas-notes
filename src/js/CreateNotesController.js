import NotesModel from './NotesModel';
import NotesStorage from './NotesStorage';
import NotesUtils from './NotesUtils';

class CreateNotesController {

    createOrUpdateNote(id) {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const priority = parseInt(NotesUtils.getSelectedRadioValue('radio-priority'));

        if (id !== undefined) {
            NotesStorage.updateNote(new NotesModel(id, title, description, priority, dueDate, false));
        } else {
            NotesStorage.saveNote(new NotesModel(undefined, title, description, priority, dueDate, false));

        }

    }

}

export default CreateNotesController;