class NotesStorage {

    static createNote(note) {
        return fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then((res => res.json()));
    }

    static updateNote(note) {
        return fetch('http://localhost:3000/notes/' + note.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then((res => res.json()));
    }

    static loadAllNotes() {
        return fetch('http://localhost:3000/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res => res.json()));
    }

    static loadNote(id) {
        return fetch('http://localhost:3000/notes/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res => res.json()));
    }
}

export default NotesStorage;