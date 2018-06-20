import Datastore from 'nedb-promise';

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './server/data/notes.db', autoload: true});
    }

    static enrichIds(notes) {
        return notes.map(NotesStore.enrichId);
    }

    static enrichId(note) {
        note.id = note._id;
        return note;
    }

    async add(note) {
        const insertedNote = await this.db.insert(note);
        return NotesStore.enrichId(insertedNote);
    }

    async update(note) {
        return await this.db.update({_id: note.id}, note);
    }

    async getAll() {
        const notes = await this.db.find({});
        return NotesStore.enrichIds(notes);
    }

    async get(id) {
        const note = await this.db.findOne({_id: id});
        return NotesStore.enrichId(note);
    }
}

export const notesStore = new NotesStore();
