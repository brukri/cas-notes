import NotesStorage from './NotesStorage';
import NoteEntry from '../templates/note-entry.tpl.html';

class ManageNotesController {
    addNoteEntriesToDom() {
        const notes = NotesStorage.loadAllNotes();
        const noteEntriesDiv = document.getElementById('note-entries');
        let noteEntriesHtml = '';

        notes.forEach((entry) => {
            noteEntriesHtml += this.generateNoteEntry(entry);
        });

        noteEntriesDiv.innerHTML = noteEntriesHtml;
    }

    generateNoteEntry(entry) {
        let noteEntry = `${NoteEntry}`;
        return noteEntry.replace('{{id}}', entry.id)
            .replace('{{title}}', entry.title)
            .replace('{{description}}', entry.description)
            .replace('{{priority}}', entry.priority)
            .replace('{{dueDate}}', entry.dueDate)
            .replace('{{finished}}', entry.finished ? true : false);
    }


}

export default ManageNotesController;