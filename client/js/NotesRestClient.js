const CONTENT_TYPE_JSON_HEADER = {
    'Content-Type': 'application/json'
};

class NotesRestClient {

    createNote(note) {
        return this._fetch('/notes', 'POST', CONTENT_TYPE_JSON_HEADER, JSON.stringify(note));
    }

    updateNote(note) {
        return this._fetch(`/notes/${note.id}`, 'POST', CONTENT_TYPE_JSON_HEADER, JSON.stringify(note));
    }

    loadAllNotes() {
        return this._fetch('/notes', 'GET');
    }

    loadNote(id) {
        return this._fetch(`/notes/${id}`, 'GET');
    }

    _fetch(url, method, headers, body) {
        const requestObj = {
            method: method
        };

        if (headers) {
            requestObj.headers = headers;
        }

        if (body) {
            requestObj.body = body;
        }

        return fetch(url, requestObj).then((res => res.json()));
    }
}

export default NotesRestClient;