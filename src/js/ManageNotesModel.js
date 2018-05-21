class ManageNotesModel {
    constructor(sortBy, showFinished) {
        this.sortBy = sortBy;
        this.showFinished = showFinished;
    }

    static createDefault() {
        return new ManageNotesModel('finishDate', true);
    }
}

export default ManageNotesModel;