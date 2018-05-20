class NotesStorage {

    static saveNote(note) {
        const notes = this.loadAllNotes();
        note.id = notes.length;
        notes.push(note);
        this._save(notes);
    }

    static loadAllNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    static _save(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

export default NotesStorage;