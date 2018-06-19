import Datastore from 'nedb-promise';

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    static copyIds(notes) {
        return notes.map((note) => {
            note.id = note._id;
            return note;
        });
    }

    async add(note) {
        return await this.db.insert(note);
    }

    async update(note) {
        return await this.db.update({_id: note.id}, note);
    }

    async getAll() {
        const notes = await this.db.find({});
        return NotesStore.copyIds(notes);
    }
}

export const notesStore = new NotesStore();
