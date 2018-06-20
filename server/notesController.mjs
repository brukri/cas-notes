import {notesStore} from './notesStore'

export class NotesController {

    async getNotes(req, res) {
        res.json((await notesStore.getAll()));
    };

    async getNote(req, res) {
        res.json((await notesStore.get(req.params.id)));
    };

    async addNote(req, res) {
        res.json(await notesStore.add(req.body));
    };

    async updateNote(req, res) {
        res.json(await notesStore.update(req.body));
    };
}

export const notesController = new NotesController();