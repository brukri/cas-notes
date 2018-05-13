import NotesModel from './NotesModel';
import NotesStorage from './NotesStorage';

class CreateNotesController {

    addNote() {
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const dueDate = document.getElementById('input-due-date').value;
        const urgency = this.getSelectedUrgencyValue();

        NotesStorage.addNote(new NotesModel(title, description, urgency, dueDate));
    }

    getSelectedUrgencyValue() {
        const radioUrgencyElements = document.getElementsByName('radio-urgency');

        for (const element of radioUrgencyElements) {
            if (element.checked) {
                return element.value;
            }
            return undefined;
        }
    }
}

export default CreateNotesController;