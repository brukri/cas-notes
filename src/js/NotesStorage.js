class NotesStorage {

    static saveNote(note) {
        const notes = this.loadAllNotes();
        note.id = notes.length;
        notes.push(note);
        this._save(notes);
    }

    static updateNote(note) {
        let allNotes = this.loadAllNotes();
        allNotes[note.id] = note;
        this._save(allNotes);
    }

    static loadAllNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    static loadNote(id) {
        return this.loadAllNotes().find(entry => entry.id === id);
    }

    static _save(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

export default NotesStorage;