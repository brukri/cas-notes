class NotesStorage {
    static addNote(note) {
        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

export default NotesStorage;