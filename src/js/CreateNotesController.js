import NotesModel from './NotesModel';
import NotesStorage from './NotesStorage';
import NotesUtils from './NotesUtils';

class CreateNotesController {

    addNote() {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const urgency = NotesUtils.getSelectedRadioValue('radio-urgency');

        NotesStorage.addNote(new NotesModel(title, description, urgency, dueDate, false));
    }

}

export default CreateNotesController;