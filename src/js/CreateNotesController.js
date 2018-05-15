import NotesModel from './NotesModel';
import NotesStorage from './NotesStorage';
import NotesUtils from './NotesUtils';

class CreateNotesController {

    addNote() {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const priority = NotesUtils.getSelectedRadioValue('radio-priority');

        NotesStorage.saveNote(new NotesModel(title, description, priority, dueDate, false));
    }

}

export default CreateNotesController;